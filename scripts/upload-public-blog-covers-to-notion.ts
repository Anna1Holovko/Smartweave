/**
 * Upload each post’s cover image **from disk** (`public/assets/blog/`, same rules as lib/blog-cover-urls.ts)
 * into Notion via the File Upload API, then set the page **cover** as a Notion-hosted file.
 *
 * **Free Notion workspaces** allow ~5 MiB per file. Larger PNGs/JPEGs are **recompressed** with `sharp`
 * (resize + JPEG) to fit under your bot’s `max_file_upload_size_in_bytes` from `users.me`, unless
 * you set `NOTION_MAX_UPLOAD_BYTES` or pass `--no-compress` (then oversize files fail fast).
 *
 * Requires Notion API version with file uploads (`notionVersion: 2026-03-11`).
 *
 * Usage:
 *   npm run upload:notion-covers -- --dry-run
 *   npm run upload:notion-covers
 *   npm run upload:notion-covers -- --replace
 *
 * Env: NOTION_API_KEY, NOTION_BLOG_DATABASE_ID, optional NOTION_BLOG_DATA_SOURCE_ID, NOTION_PROP_SLUG,
 * optional NOTION_MAX_UPLOAD_BYTES (override size limit in bytes for compression target).
 */

import { existsSync, readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { Client, isFullPage } from '@notionhq/client';
import type { PageObjectResponse } from '@notionhq/client';
import { blogCoverFilenameForSlug } from '../lib/blog-cover-urls';
import { slugFromPage } from '../lib/notion-articles';

const NOTION_API_VERSION = '2026-03-11';
/** Default when users.me does not return limits (matches free-tier docs). */
const DEFAULT_MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

function loadEnvLocal() {
  try {
    const raw = readFileSync(join(root, '.env.local'), 'utf8');
    for (const line of raw.split('\n')) {
      const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
      if (!m) continue;
      const key = m[1];
      let val = m[2].trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = val;
    }
  } catch {
    /* no .env.local */
  }
}

loadEnvLocal();

function contentTypeForFilename(name: string): string {
  const lower = name.toLowerCase();
  if (lower.endsWith('.png')) return 'image/png';
  if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) return 'image/jpeg';
  if (lower.endsWith('.webp')) return 'image/webp';
  if (lower.endsWith('.gif')) return 'image/gif';
  return 'application/octet-stream';
}

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

async function resolveMaxUploadBytes(notion: Client): Promise<number> {
  const fromEnv = process.env.NOTION_MAX_UPLOAD_BYTES?.trim();
  if (fromEnv && /^\d+$/.test(fromEnv)) {
    return Math.max(1024, parseInt(fromEnv, 10));
  }
  try {
    const me = await notion.users.me({});
    if (me.type === 'bot' && me.bot && typeof me.bot === 'object' && 'workspace_limits' in me.bot) {
      const n = (me.bot as { workspace_limits: { max_file_upload_size_in_bytes: number } }).workspace_limits
        .max_file_upload_size_in_bytes;
      if (typeof n === 'number' && n > 0) return n;
    }
  } catch {
    /* fall through */
  }
  return DEFAULT_MAX_UPLOAD_BYTES;
}

/**
 * Free-tier Notion caps uploads at ~5 MiB. Shrink covers with sharp (JPEG) until they fit.
 */
async function prepareBufferUnderLimit(
  raw: Buffer,
  filename: string,
  maxBytes: number,
  noCompress: boolean,
): Promise<{ buffer: Buffer; filename: string; compressed: boolean }> {
  if (raw.length <= maxBytes) {
    return { buffer: raw, filename, compressed: false };
  }
  if (noCompress) {
    throw new Error(
      `File is ${(raw.length / 1024 / 1024).toFixed(2)} MiB; Notion limit is ${(maxBytes / 1024 / 1024).toFixed(2)} MiB. Remove --no-compress to auto-shrink, or resize the file.`,
    );
  }

  const sharpMod = await import('sharp');
  const sharp = sharpMod.default;
  const baseName = filename.replace(/\.[^.]+$/i, '');
  const steps: { width: number; quality: number }[] = [
    { width: 1920, quality: 85 },
    { width: 1600, quality: 80 },
    { width: 1280, quality: 75 },
    { width: 1024, quality: 72 },
    { width: 800, quality: 68 },
    { width: 640, quality: 65 },
  ];

  for (const step of steps) {
    const out = await sharp(raw)
      .rotate()
      .resize({ width: step.width, height: step.width, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: step.quality, mozjpeg: true, chromaSubsampling: '4:2:0' })
      .toBuffer();
    const outName = `${baseName}-upload.jpg`;
    if (out.length <= maxBytes) {
      return { buffer: out, filename: outName, compressed: true };
    }
  }

  throw new Error(
    `Could not compress under ${(maxBytes / 1024 / 1024).toFixed(2)} MiB (Notion workspace limit). Use a smaller source image.`,
  );
}

async function resolveDataSourceId(notion: Client): Promise<string | null> {
  const direct = process.env.NOTION_BLOG_DATA_SOURCE_ID;
  if (direct) return direct;

  const databaseId = process.env.NOTION_BLOG_DATABASE_ID;
  if (!databaseId) return null;

  const db = await notion.databases.retrieve({ database_id: databaseId });
  if (db.object !== 'database' || !('data_sources' in db) || !db.data_sources?.length) {
    console.error('Database has no data_sources; set NOTION_BLOG_DATA_SOURCE_ID');
    return null;
  }
  return db.data_sources[0].id;
}

async function allBlogPages(notion: Client, dataSourceId: string): Promise<PageObjectResponse[]> {
  const out: PageObjectResponse[] = [];
  let cursor: string | undefined;
  do {
    const res = await notion.dataSources.query({
      data_source_id: dataSourceId,
      result_type: 'page',
      page_size: 100,
      start_cursor: cursor,
    });
    for (const row of res.results) {
      if (isFullPage(row)) out.push(row);
    }
    cursor = res.has_more && res.next_cursor ? res.next_cursor : undefined;
  } while (cursor);
  return out;
}

function coverPresentOnPage(page: PageObjectResponse): boolean {
  return page.cover != null;
}

async function uploadAndSetCover(
  notion: Client,
  pageId: string,
  filePath: string,
  filename: string,
  maxUploadBytes: number,
  noCompress: boolean,
  slug: string,
): Promise<void> {
  const raw = readFileSync(filePath);
  const prepared = await prepareBufferUnderLimit(raw, filename, maxUploadBytes, noCompress);
  if (prepared.compressed) {
    console.log(
      `  (compressed ${slug}: ${(raw.length / 1024 / 1024).toFixed(2)} → ${(prepared.buffer.length / 1024 / 1024).toFixed(2)} MiB)`,
    );
  }

  const content_type = contentTypeForFilename(prepared.filename);
  /** Node’s FormData requires a Blob; `Uint8Array` satisfies strict `BlobPart` typing vs `Buffer`. */
  const blob = new Blob([new Uint8Array(prepared.buffer)], { type: content_type });

  const created = await notion.fileUploads.create({
    mode: 'single_part',
    filename: prepared.filename,
    content_type,
  });

  const uploadId = created.id;
  if (!uploadId) throw new Error('fileUploads.create returned no id');

  const sent = await notion.fileUploads.send({
    file_upload_id: uploadId,
    file: {
      filename: prepared.filename,
      data: blob,
    },
  });

  if (sent.status !== 'uploaded') {
    throw new Error(`File send did not complete (status=${sent.status})`);
  }

  await notion.pages.update({
    page_id: pageId,
    cover: {
      type: 'file_upload',
      file_upload: { id: uploadId },
    },
  });
}

async function main() {
  const dryRun = process.argv.includes('--dry-run');
  const replace = process.argv.includes('--replace');
  const noCompress = process.argv.includes('--no-compress');

  const token = process.env.NOTION_API_KEY || process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_BLOG_DATABASE_ID;
  if (!token || !databaseId) {
    console.error('Missing NOTION_API_KEY or NOTION_BLOG_DATABASE_ID (.env.local)');
    process.exit(1);
  }

  const slugProp = process.env.NOTION_PROP_SLUG || 'Slug';

  const notion = new Client({ auth: token, notionVersion: NOTION_API_VERSION });
  const dataSourceId = await resolveDataSourceId(notion);
  if (!dataSourceId) process.exit(1);

  const maxUploadBytes = await resolveMaxUploadBytes(notion);
  console.log(
    `Max upload size: ${(maxUploadBytes / 1024 / 1024).toFixed(2)} MiB${noCompress ? ' (--no-compress: no auto-shrink)' : ''}`,
  );

  const rows = await allBlogPages(notion, dataSourceId);
  let ok = 0;
  let skipped = 0;
  let missingFile = 0;
  let errors = 0;

  for (const row of rows) {
    const slug = slugFromPage(row, slugProp).trim();
    if (!slug) {
      console.warn(`Skip (no slug): ${row.id}`);
      skipped++;
      continue;
    }

    if (!replace && coverPresentOnPage(row)) {
      console.log(`Skip (already has cover): ${slug}`);
      skipped++;
      continue;
    }

    const filename = blogCoverFilenameForSlug(slug);
    const filePath = join(root, 'public', 'assets', 'blog', filename);

    if (!existsSync(filePath)) {
      console.warn(`No local file: ${filename} (${slug})`);
      missingFile++;
      continue;
    }

    if (dryRun) {
      console.log(`[dry-run] ${slug} ← ${filePath}`);
      ok++;
      continue;
    }

    try {
      await uploadAndSetCover(notion, row.id, filePath, filename, maxUploadBytes, noCompress, slug);
      console.log(`Uploaded cover: ${slug}`);
      ok++;
      await delay(450);
    } catch (e) {
      errors++;
      console.error(`Failed ${slug}:`, e instanceof Error ? e.message : e);
    }
  }

  console.log(
    `Done. ${dryRun ? 'Would upload' : 'Uploaded'} ${ok}, skipped ${skipped}, missing file ${missingFile}, errors ${errors}.`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
