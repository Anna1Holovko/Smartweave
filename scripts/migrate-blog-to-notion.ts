/**
 * One-time: upload legacy lib/blog-content.ts articles into your Notion blog database.
 *
 * Prerequisites:
 *   - NOTION_API_KEY (or NOTION_TOKEN) and NOTION_BLOG_DATABASE_ID in .env.local
 *   - Integration connected to the database (Connections in Notion UI)
 *   - Database columns: Title (title), Slug (rich text), Status (select = Published), Publish date (date), Meta description (rich text) — names overridable via NOTION_PROP_* (same as lib/notion-articles.ts)
 *
 * Usage (from repo root):
 *   npx tsx scripts/migrate-blog-to-notion.ts
 *
 * Skips slugs that already exist in the database (same Slug value).
 */

import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { Client, collectPaginatedAPI, isFullPage } from '@notionhq/client';
import type { BlockObjectRequest } from '@notionhq/client';
import { BLOG_CONTENT, type ContentBlock } from '../lib/blog-content';
import { BLOG_STATIC_META } from '../lib/blog-static-meta';

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

function rt(content: string, bold = false) {
  return [
    {
      type: 'text' as const,
      text: { content },
      ...(bold ? { annotations: { bold: true as const } } : {}),
    },
  ];
}

function linkRt(label: string, url: string) {
  return [{ type: 'text' as const, text: { content: label, link: { url } } }];
}

function contentToNotionBlocks(blocks: ContentBlock[]): BlockObjectRequest[] {
  const out: BlockObjectRequest[] = [];
  for (const block of blocks) {
    switch (block.t) {
      case 'h2':
        out.push({
          type: 'heading_2',
          heading_2: { rich_text: rt(block.c as string) },
        });
        break;
      case 'h3':
        out.push({
          type: 'heading_3',
          heading_3: { rich_text: rt(block.c as string) },
        });
        break;
      case 'p':
        out.push({
          type: 'paragraph',
          paragraph: { rich_text: rt(block.c as string) },
        });
        break;
      case 'ul':
        for (const item of (block as { t: 'ul'; c: string[] }).c) {
          out.push({
            type: 'bulleted_list_item',
            bulleted_list_item: { rich_text: rt(item) },
          });
        }
        break;
      case 'faq': {
        out.push({
          type: 'heading_2',
          heading_2: { rich_text: rt('Najczęściej zadawane pytania') },
        });
        for (const { q, a } of (block as { t: 'faq'; c: { q: string; a: string }[] }).c) {
          out.push({
            type: 'paragraph',
            paragraph: { rich_text: rt(q, true) },
          });
          out.push({
            type: 'paragraph',
            paragraph: { rich_text: rt(a) },
          });
        }
        break;
      }
      case 'cta':
        out.push({
          type: 'paragraph',
          paragraph: { rich_text: rt((block as { t: 'cta'; c: { text: string } }).c.text) },
        });
        break;
      case 'sources':
        out.push({
          type: 'heading_2',
          heading_2: { rich_text: rt('Źródła') },
        });
        for (const src of (block as { t: 'sources'; c: { label: string; url: string }[] }).c) {
          out.push({
            type: 'bulleted_list_item',
            bulleted_list_item: { rich_text: linkRt(src.label, src.url) },
          });
        }
        break;
      default:
        break;
    }
  }
  return out;
}

const CHUNK = 100;

async function appendBlocks(notion: Client, pageId: string, blocks: BlockObjectRequest[]) {
  for (let i = 0; i < blocks.length; i += CHUNK) {
    const chunk = blocks.slice(i, i + CHUNK);
    await notion.blocks.children.append({
      block_id: pageId,
      children: chunk as Parameters<typeof notion.blocks.children.append>[0]['children'],
    });
  }
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

function findTitleProperty(props: Record<string, { type?: string }> | undefined): string | null {
  if (!props) return null;
  for (const [name, cfg] of Object.entries(props)) {
    if (cfg?.type === 'title') return name;
  }
  return null;
}

async function resolveTitlePropertyName(
  notion: Client,
  databaseId: string,
  dataSourceId: string,
): Promise<string> {
  const explicit = process.env.NOTION_PROP_TITLE?.trim();
  if (explicit) return explicit;

  const db = await notion.databases.retrieve({ database_id: databaseId });
  if (db.object === 'database' && 'properties' in db && db.properties) {
    const t = findTitleProperty(db.properties as Record<string, { type?: string }>);
    if (t) return t;
  }

  const ds = await notion.dataSources.retrieve({ data_source_id: dataSourceId });
  if (ds.object === 'data_source' && 'properties' in ds && ds.properties) {
    const t = findTitleProperty(ds.properties as Record<string, { type?: string }>);
    if (t) return t;
  }

  throw new Error(
    'Could not find a title column. Set NOTION_PROP_TITLE in .env.local to the exact Notion property name (e.g. Tytuł).',
  );
}

async function existingSlugs(notion: Client, dataSourceId: string, slugProp: string): Promise<Set<string>> {
  const slugs = new Set<string>();
  let cursor: string | undefined;
  do {
    const res = await notion.dataSources.query({
      data_source_id: dataSourceId,
      result_type: 'page',
      page_size: 100,
      start_cursor: cursor,
    });
    for (const row of res.results) {
      if (!isFullPage(row)) continue;
      const p = row.properties[slugProp];
      if (p?.type === 'rich_text') {
        const s = p.rich_text.map((x) => x.plain_text).join('').trim();
        if (s) slugs.add(s);
      }
    }
    cursor = res.has_more && res.next_cursor ? res.next_cursor : undefined;
  } while (cursor);
  return slugs;
}

async function main() {
  const token = process.env.NOTION_API_KEY || process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_BLOG_DATABASE_ID;
  if (!token || !databaseId) {
    console.error('Missing NOTION_API_KEY or NOTION_BLOG_DATABASE_ID (.env.local)');
    process.exit(1);
  }

  const slugProp = process.env.NOTION_PROP_SLUG || 'Slug';
  const statusProp = process.env.NOTION_PROP_STATUS || 'Status';
  const published = process.env.NOTION_STATUS_PUBLISHED || 'Published';
  const dateProp = process.env.NOTION_PROP_DATE || 'Publish date';
  const metaProp = process.env.NOTION_PROP_META || 'Meta description';

  const notion = new Client({ auth: token });
  const dataSourceId = await resolveDataSourceId(notion);
  if (!dataSourceId) process.exit(1);

  const titleName = await resolveTitlePropertyName(notion, databaseId, dataSourceId);

  const have = await existingSlugs(notion, dataSourceId, slugProp);
  const sorted = [...BLOG_STATIC_META].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

  let created = 0;
  let skipped = 0;

  for (const meta of sorted) {
    const body = BLOG_CONTENT[meta.slug];
    if (!body?.length) {
      console.warn(`No BLOG_CONTENT for ${meta.slug}, skipping`);
      skipped++;
      continue;
    }
    if (have.has(meta.slug)) {
      console.log(`Skip (exists): ${meta.slug}`);
      skipped++;
      continue;
    }

    const blocks = contentToNotionBlocks(body);
    const first = blocks.slice(0, CHUNK);
    const rest = blocks.slice(CHUNK);

    const properties: Record<string, unknown> = {
      [titleName]: {
        title: [{ type: 'text', text: { content: meta.title } }],
      },
      [slugProp]: {
        rich_text: [{ type: 'text', text: { content: meta.slug } }],
      },
      [statusProp]: {
        select: { name: published },
      },
      [dateProp]: {
        date: { start: meta.date },
      },
      [metaProp]: {
        rich_text: [{ type: 'text', text: { content: meta.metaDescription } }],
      },
    };

    const page = await notion.pages.create({
      parent: { type: 'database_id', database_id: databaseId },
      properties: properties as Parameters<typeof notion.pages.create>[0]['properties'],
      ...(first.length
        ? { children: first as Parameters<typeof notion.pages.create>[0]['children'] }
        : {}),
    });

    if (page.object === 'page' && 'id' in page && rest.length) {
      await appendBlocks(notion, page.id, rest);
    }

    console.log(`Created: ${meta.slug}`);
    created++;
    have.add(meta.slug);
  }

  console.log(`Done. Created ${created}, skipped ${skipped}.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
