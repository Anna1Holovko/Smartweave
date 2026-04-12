/**
 * Push cover **URLs from this repo** (see lib/blog-cover-urls.ts) into Notion as **external** page covers,
 * pointing at your deployed site (`{SITE_URL}/assets/blog/...`). Images must already be live on that origin.
 *
 * After that, edit covers in Notion (upload / replace) — the website uses Notion’s `cover` from the API first,
 * then falls back to the same paths in code if a page has no cover.
 *
 * Usage:
 *   npm run sync:notion-covers -- --dry-run --from-code          # preview full import
 *   npm run sync:notion-covers -- --from-code                    # one-time: all rows ← site URLs
 *   npm run sync:notion-covers -- --fill-empty                   # only pages with no cover yet
 *   npm run sync:notion-covers -- --overwrite-site               # same as --from-code (alias)
 *
 * Env: NOTION_API_KEY, NOTION_BLOG_DATABASE_ID, optional NOTION_BLOG_DATA_SOURCE_ID, NOTION_PROP_SLUG,
 * optional COVER_SITE_URL (staging / preview origin).
 */

import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { Client, isFullPage } from '@notionhq/client';
import type { PageObjectResponse } from '@notionhq/client';
import { blogCoverAbsoluteUrl } from '../lib/blog-cover-urls';
import { SITE_URL } from '../lib/site';
import { slugFromPage } from '../lib/notion-articles';

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

/** True if the page has any cover (Notion upload, external link, etc.). */
function coverPresentOnPage(page: PageObjectResponse): boolean {
  return page.cover != null;
}

async function confirmCoverAbsent(notion: Client, row: PageObjectResponse): Promise<boolean> {
  if (coverPresentOnPage(row)) return false;
  const full = await notion.pages.retrieve({ page_id: row.id });
  if (!isFullPage(full)) return true;
  return !coverPresentOnPage(full);
}

async function main() {
  const dryRun = process.argv.includes('--dry-run');
  const fromCode = process.argv.includes('--from-code');
  const overwriteSite = process.argv.includes('--overwrite-site') || fromCode;
  const fillEmpty = process.argv.includes('--fill-empty') || overwriteSite;

  if (!dryRun && !fillEmpty && !overwriteSite) {
    console.log(`No action. Typical first run (import covers from code → Notion):
  --from-code        Set every row’s page cover to the matching URL on ${SITE_URL} (same as --overwrite-site).
  --fill-empty       Only rows with no cover (keeps existing Notion uploads/links).
  --dry-run          Add before any flag to print actions only.
`);
    process.exit(0);
  }

  const token = process.env.NOTION_API_KEY || process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_BLOG_DATABASE_ID;
  if (!token || !databaseId) {
    console.error('Missing NOTION_API_KEY or NOTION_BLOG_DATABASE_ID (.env.local)');
    process.exit(1);
  }

  const slugProp = process.env.NOTION_PROP_SLUG || 'Slug';
  const siteBase = (process.env.COVER_SITE_URL || SITE_URL).replace(/\/$/, '');

  const notion = new Client({ auth: token });
  const dataSourceId = await resolveDataSourceId(notion);
  if (!dataSourceId) process.exit(1);

  const rows = await allBlogPages(notion, dataSourceId);
  let updated = 0;
  let skipped = 0;
  let errors = 0;

  for (const row of rows) {
    const slug = slugFromPage(row, slugProp).trim();
    if (!slug) {
      console.warn(`Skip (no slug): ${row.id}`);
      skipped++;
      continue;
    }

    const url = blogCoverAbsoluteUrl(slug, siteBase);

    if (!overwriteSite) {
      if (coverPresentOnPage(row)) {
        console.log(`Keep Notion cover: ${slug}`);
        skipped++;
        continue;
      }
      const reallyEmpty = await confirmCoverAbsent(notion, row);
      if (!reallyEmpty) {
        console.log(`Keep Notion cover (from retrieve): ${slug}`);
        skipped++;
        continue;
      }
    } else {
      const existingExternal = row.cover?.type === 'external' ? row.cover.external.url : null;
      if (existingExternal === url && row.cover?.type === 'external') {
        console.log(`Unchanged (already site URL): ${slug}`);
        skipped++;
        continue;
      }
    }

    if (dryRun) {
      console.log(`[dry-run] ${slug} → ${url}${overwriteSite ? ' (from-code/overwrite)' : ''}`);
      updated++;
      continue;
    }

    try {
      await notion.pages.update({
        page_id: row.id,
        cover: {
          type: 'external',
          external: { url },
        },
      });
      console.log(`Cover set: ${slug}`);
      updated++;
    } catch (e) {
      errors++;
      console.error(`Failed ${slug}:`, e instanceof Error ? e.message : e);
    }
  }

  console.log(`Done. ${dryRun ? 'Would update' : 'Updated'} ${updated}, skipped ${skipped}, errors ${errors}.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
