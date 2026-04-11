/**
 * Notion CMS for blog articles (Notion database + page body as blocks).
 *
 * Required env:
 *   NOTION_API_KEY — Internal integration secret (or NOTION_TOKEN)
 *   NOTION_BLOG_DATABASE_ID — Database ID (from the database URL)
 *
 * Share the database with your integration: Notion → database → … → Connections → connect integration.
 *
 * Expected database properties (rename via env below if yours differ):
 *   - Title: default Notion title column (type: title)
 *   - Slug: rich text (or URL)
 *   - Status: select = "Published" (see NOTION_STATUS_PUBLISHED)
 *   - Publish date: date
 *   - Meta description: rich text (optional)
 *
 * Article body is the page content (blocks under each database row), rendered to HTML.
 *
 * Listing is cached with Next.js unstable_cache + route revalidate (default 60s). After edits in
 * Notion, changes appear within ~NOTION_CACHE_SECONDS, or immediately after POST /api/revalidate-blog
 * with NOTION_REVALIDATE_SECRET (no redeploy). Override NOTION_CACHE_SECONDS (minimum 30).
 *
 * Unpublishing: rows come only from Notion’s published filter (or client-side match). Optional
 * NOTION_LIVE_VERIFY_ARTICLE=1 re-checks each article page against Notion (can false-negative).
 */

import { unstable_cache } from 'next/cache';
import {
  Client,
  collectPaginatedAPI,
  isFullBlock,
  isFullPage,
} from '@notionhq/client';
import type {
  BlockObjectResponse,
  BulletedListItemBlockObjectResponse,
  NumberedListItemBlockObjectResponse,
  PageObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client';
/**
 * Seconds (Next `unstable_cache`). Default 60 matches `export const revalidate = 60` on blog routes.
 * If you change one, align the other (NOTION_CACHE_SECONDS).
 */
export const NOTION_LIST_REVALIDATE_SECONDS = Math.max(
  30,
  Number(process.env.NOTION_CACHE_SECONDS ?? 60) || 60,
);

export type NotionArticle = {
  id: string;
  title: string;
  slug: string;
  content: string;
  meta_description: string;
  publish_date: string;
};

function getToken(): string | undefined {
  return process.env.NOTION_API_KEY || process.env.NOTION_TOKEN;
}

/**
 * Used for empty-state copy. Preview deployments (e.g. Vercel) only see env vars that are enabled
 * for Preview — if NOTION_* exist only for Production, the blog list is empty without a code bug.
 */
export function isNotionBlogEnvConfigured(): boolean {
  if (!getToken()) return false;
  if (getDataSourceId()) return true;
  if (getDatabaseId()) return true;
  return false;
}

function getDatabaseId(): string | undefined {
  return process.env.NOTION_BLOG_DATABASE_ID;
}

/** Prefer NOTION_BLOG_DATA_SOURCE_ID; otherwise resolved from database retrieve (SDK v5). */
function getDataSourceId(): string | undefined {
  return process.env.NOTION_BLOG_DATA_SOURCE_ID;
}

function propNames() {
  return {
    slug: process.env.NOTION_PROP_SLUG || 'Slug',
    status: process.env.NOTION_PROP_STATUS || 'Status',
    published: (process.env.NOTION_STATUS_PUBLISHED || 'Published').trim(),
    date: process.env.NOTION_PROP_DATE || 'Publish date',
    meta: process.env.NOTION_PROP_META || 'Meta description',
  };
}

/** Notion API filter for “published” rows — depends on whether Status is Select, native Status, or Checkbox. */
type PublishedRowFilter =
  | { property: string; type: 'select'; select: { equals: string } }
  | { property: string; type: 'status'; status: { equals: string } }
  | { property: string; type: 'checkbox'; checkbox: { equals: boolean } };

async function resolvePublishedRowFilter(
  notion: Client,
  dataSourceId: string,
  names: ReturnType<typeof propNames>,
): Promise<PublishedRowFilter> {
  /** Prefer the real column type from Notion so NOTION_STATUS_KIND cannot contradict the DB (avoids API 400). */
  let schemaType: 'select' | 'status' | 'checkbox' | undefined;
  try {
    const ds = await notion.dataSources.retrieve({ data_source_id: dataSourceId });
    if (ds.object === 'data_source' && 'properties' in ds && ds.properties) {
      const cfg = (ds.properties as Record<string, { type?: string }>)[names.status];
      if (cfg?.type === 'status' || cfg?.type === 'select' || cfg?.type === 'checkbox') {
        schemaType = cfg.type;
      }
    }
  } catch {
    /* fall through to env / default */
  }

  if (schemaType === 'status') {
    return { property: names.status, type: 'status', status: { equals: names.published } };
  }
  if (schemaType === 'checkbox') {
    return { property: names.status, type: 'checkbox', checkbox: { equals: true } };
  }
  if (schemaType === 'select') {
    return { property: names.status, type: 'select', select: { equals: names.published } };
  }

  const env = process.env.NOTION_STATUS_KIND?.toLowerCase().trim();
  if (env === 'select') {
    return { property: names.status, type: 'select', select: { equals: names.published } };
  }
  if (env === 'status') {
    return { property: names.status, type: 'status', status: { equals: names.published } };
  }
  if (env === 'checkbox') {
    return { property: names.status, type: 'checkbox', checkbox: { equals: true } };
  }

  return { property: names.status, type: 'select', select: { equals: names.published } };
}

function alternatePublishedFilter(
  current: PublishedRowFilter,
  names: ReturnType<typeof propNames>,
): PublishedRowFilter | null {
  if (current.type === 'select') {
    return { property: names.status, type: 'status', status: { equals: names.published } };
  }
  if (current.type === 'status') {
    return { property: names.status, type: 'select', select: { equals: names.published } };
  }
  return null;
}

/** Read Status / Select / Checkbox on a page (API filter can fail; this matches Notion UI). */
function pageMatchesPublishedLabel(page: PageObjectResponse, names: ReturnType<typeof propNames>): boolean {
  const want = names.published.trim().toLowerCase();
  const p = page.properties[names.status];
  if (!p) return false;
  if (p.type === 'select') return (p.select?.name ?? '').trim().toLowerCase() === want;
  if (p.type === 'status') return (p.status?.name ?? '').trim().toLowerCase() === want;
  if (p.type === 'checkbox') return p.checkbox === true;
  return false;
}

/**
 * Client-side “is this row published?” — if Status property is missing from the payload, keep the row
 * so we do not drop every card when Notion omits properties (same idea as former lenient second pass).
 */
function pageMatchesPublishedLabelLenient(
  page: PageObjectResponse,
  names: ReturnType<typeof propNames>,
): boolean {
  if (!page.properties[names.status]) return true;
  return pageMatchesPublishedLabel(page, names);
}

function slugifyFromTitle(title: string): string {
  const s = title
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 96);
  return s || 'wpis';
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeAttr(s: string): string {
  return escapeHtml(s).replace(/'/g, '&#39;');
}

function richTextToHtml(fragments: RichTextItemResponse[]): string {
  if (!fragments?.length) return '';
  return fragments
    .map((f) => {
      let t = escapeHtml(f.plain_text);
      if (f.annotations.code) t = `<code class="rounded bg-white/10 px-1 py-0.5 text-sm">${t}</code>`;
      if (f.annotations.bold) t = `<strong>${t}</strong>`;
      if (f.annotations.italic) t = `<em>${t}</em>`;
      if (f.annotations.strikethrough) t = `<s>${t}</s>`;
      if (f.annotations.underline) t = `<u>${t}</u>`;
      if (f.href) t = `<a href="${escapeAttr(f.href)}" class="text-[#d8f17b] underline underline-offset-2" target="_blank" rel="noopener noreferrer">${t}</a>`;
      return t;
    })
    .join('');
}

/** Read plain text from a Notion page property (title / rich_text / formula string). */
function textFromPageProperty(page: PageObjectResponse, propName: string): string {
  const p = page.properties[propName];
  if (!p) return '';
  if (p.type === 'title') return p.title.map((x) => x.plain_text).join('');
  if (p.type === 'rich_text') return p.rich_text.map((x) => x.plain_text).join('');
  if (p.type === 'formula') {
    if (p.formula.type === 'string') return p.formula.string ?? '';
    if (p.formula.type === 'number' && p.formula.number != null) return String(p.formula.number);
  }
  return '';
}

function titleFromPage(page: PageObjectResponse): string {
  const explicit = process.env.NOTION_PROP_TITLE?.trim();
  if (explicit) {
    const t = textFromPageProperty(page, explicit).trim();
    if (t) return t;
  }
  for (const key of Object.keys(page.properties)) {
    const p = page.properties[key];
    if (p.type === 'title' && p.title?.length) {
      return p.title.map((x) => x.plain_text).join('');
    }
  }
  for (const key of Object.keys(page.properties)) {
    const p = page.properties[key];
    if (p.type === 'title') {
      return p.title.map((x) => x.plain_text).join('');
    }
  }
  return '';
}

/** Last path segment if user pasted a URL or `/blog/foo` into the Slug field. */
function normalizeSlug(raw: string): string {
  let s = raw.trim();
  if (!s) return '';
  try {
    if (s.includes('%')) s = decodeURIComponent(s);
  } catch {
    /* ignore */
  }
  s = s.replace(/^\/+|\/+$/g, '');
  if (s.includes('/')) {
    const seg = s.split('/').filter(Boolean).pop() ?? s;
    s = seg.trim();
  }
  return s;
}

function slugFromPage(page: PageObjectResponse, slugProp: string): string {
  const p = page.properties[slugProp];
  if (!p) return '';
  let raw = '';
  if (p.type === 'rich_text') raw = p.rich_text.map((x) => x.plain_text).join('').trim();
  else if (p.type === 'url' && p.url) {
    try {
      const u = new URL(p.url);
      const last = u.pathname.split('/').filter(Boolean).pop();
      raw = (last || '').trim();
    } catch {
      raw = p.url.trim();
    }
  } else if (p.type === 'formula' && p.formula.type === 'string') raw = (p.formula.string || '').trim();
  return normalizeSlug(raw);
}

function metaFromPage(page: PageObjectResponse, metaProp: string): string {
  const p = page.properties[metaProp];
  if (!p || p.type !== 'rich_text') return '';
  return p.rich_text.map((x) => x.plain_text).join('').trim();
}

function dateFromPage(page: PageObjectResponse, dateProp: string): string {
  const p = page.properties[dateProp];
  if (!p || p.type !== 'date' || !p.date?.start) {
    return new Date().toISOString().slice(0, 10);
  }
  const d = new Date(p.date.start);
  if (Number.isNaN(d.getTime())) return new Date().toISOString().slice(0, 10);
  return d.toISOString().slice(0, 10);
}

async function renderBlocks(notion: Client, blocks: BlockObjectResponse[]): Promise<string> {
  const out: string[] = [];
  let i = 0;
  while (i < blocks.length) {
    const b = blocks[i];
    if (b.type === 'bulleted_list_item') {
      const items: string[] = [];
      while (i < blocks.length && blocks[i].type === 'bulleted_list_item') {
        items.push(await renderBulletedItem(notion, blocks[i] as BulletedListItemBlockObjectResponse));
        i++;
      }
      out.push(
        `<ul class="list-disc pl-6 space-y-1 my-4 text-zinc-400">${items.join('')}</ul>`,
      );
      continue;
    }
    if (b.type === 'numbered_list_item') {
      const items: string[] = [];
      while (i < blocks.length && blocks[i].type === 'numbered_list_item') {
        items.push(await renderNumberedItem(notion, blocks[i] as NumberedListItemBlockObjectResponse));
        i++;
      }
      out.push(
        `<ol class="list-decimal pl-6 space-y-1 my-4 text-zinc-400">${items.join('')}</ol>`,
      );
      continue;
    }
    out.push(await renderSingleBlock(notion, b));
    i++;
  }
  return out.join('\n');
}

async function renderBulletedItem(
  notion: Client,
  block: BulletedListItemBlockObjectResponse,
): Promise<string> {
  const text = richTextToHtml(block.bulleted_list_item.rich_text);
  let nested = '';
  if (block.has_children) {
    const children = await collectPaginatedAPI(notion.blocks.children.list, {
      block_id: block.id,
    });
    const full = children.filter(isFullBlock) as BlockObjectResponse[];
    nested = await renderBlocks(notion, full);
  }
  return `<li class="my-1">${text}${nested ? `<div class="mt-2">${nested}</div>` : ''}</li>`;
}

async function renderNumberedItem(
  notion: Client,
  block: NumberedListItemBlockObjectResponse,
): Promise<string> {
  const text = richTextToHtml(block.numbered_list_item.rich_text);
  let nested = '';
  if (block.has_children) {
    const children = await collectPaginatedAPI(notion.blocks.children.list, {
      block_id: block.id,
    });
    const full = children.filter(isFullBlock) as BlockObjectResponse[];
    nested = await renderBlocks(notion, full);
  }
  return `<li class="my-1">${text}${nested ? `<div class="mt-2">${nested}</div>` : ''}</li>`;
}

async function renderSingleBlock(notion: Client, block: BlockObjectResponse): Promise<string> {
  if (block.has_children && block.type !== 'bulleted_list_item' && block.type !== 'numbered_list_item') {
    const children = await collectPaginatedAPI(notion.blocks.children.list, {
      block_id: block.id,
    });
    const full = children.filter(isFullBlock) as BlockObjectResponse[];
    const inner = await renderBlocks(notion, full);
    if (block.type === 'toggle') {
      const summary = richTextToHtml(block.toggle.rich_text);
      return `<details class="my-4 border border-white/10 rounded-lg p-4"><summary class="cursor-pointer text-[#e4e4e7] font-medium">${summary || 'Więcej'}</summary><div class="mt-3">${inner}</div></details>`;
    }
    if (block.type === 'callout') {
      const icon = block.callout.icon?.type === 'emoji' ? block.callout.icon.emoji : '';
      const text = richTextToHtml(block.callout.rich_text);
      return `<div class="my-4 flex gap-3 rounded-xl border border-white/10 bg-white/5 p-4"><span class="select-none">${icon}</span><div class="min-w-0 flex-1">${text}${inner ? `<div class="mt-3">${inner}</div>` : ''}</div></div>`;
    }
    if (block.type === 'column_list') {
      return `<div class="my-4 grid gap-4 md:grid-cols-2">${inner}</div>`;
    }
    if (block.type === 'column') {
      return `<div class="min-w-0">${inner}</div>`;
    }
    if (block.type === 'synced_block') {
      return inner;
    }
    if (block.type === 'table') {
      return `<div class="my-4 overflow-x-auto"><table class="w-full border-collapse text-sm text-zinc-400"><tbody>${inner}</tbody></table></div>`;
    }
  }

  switch (block.type) {
    case 'paragraph': {
      const t = richTextToHtml(block.paragraph.rich_text);
      return t ? `<p class="text-zinc-400 leading-relaxed mb-4">${t}</p>` : '';
    }
    case 'heading_1':
      return `<h2 class="text-xl sm:text-2xl font-bold text-[#e4e4e7] mt-10 mb-4">${richTextToHtml(block.heading_1.rich_text)}</h2>`;
    case 'heading_2':
      return `<h2 class="text-xl sm:text-2xl font-bold text-[#e4e4e7] mt-10 mb-4">${richTextToHtml(block.heading_2.rich_text)}</h2>`;
    case 'heading_3':
      return `<h3 class="text-lg sm:text-xl font-bold text-zinc-200 mt-6 mb-3">${richTextToHtml(block.heading_3.rich_text)}</h3>`;
    case 'quote':
      return `<blockquote class="border-l-4 border-[#d8f17b]/50 pl-4 my-6 text-zinc-300 italic">${richTextToHtml(block.quote.rich_text)}</blockquote>`;
    case 'divider':
      return '<hr class="my-8 border-white/10" />';
    case 'code': {
      const code = block.code.rich_text.map((x) => x.plain_text).join('');
      const lang = block.code.language || '';
      return `<pre class="my-4 overflow-x-auto rounded-xl bg-black/40 border border-white/10 p-4 text-sm text-zinc-200"><code class="language-${escapeAttr(lang)}">${escapeHtml(code)}</code></pre>`;
    }
    case 'image': {
      const img = block.image;
      const url =
        img.type === 'external' ? img.external.url : img.type === 'file' ? img.file.url : '';
      if (!url) return '';
      const caption = img.caption?.length ? richTextToHtml(img.caption) : '';
      return `<figure class="my-6"><img src="${escapeAttr(url)}" alt="" class="rounded-xl border border-white/10 w-full max-h-[480px] object-contain bg-black/20" loading="lazy" />${caption ? `<figcaption class="mt-2 text-sm text-zinc-500">${caption}</figcaption>` : ''}</figure>`;
    }
    case 'bookmark': {
      const u = block.bookmark.url;
      const cap = block.bookmark.caption?.length ? richTextToHtml(block.bookmark.caption) : '';
      return `<div class="my-4 rounded-xl border border-white/10 p-4"><a href="${escapeAttr(u)}" class="text-[#d8f17b] underline break-all" target="_blank" rel="noopener noreferrer">${escapeHtml(u)}</a>${cap ? `<div class="mt-2 text-sm text-zinc-400">${cap}</div>` : ''}</div>`;
    }
    case 'video':
    case 'embed': {
      const url =
        block.type === 'video'
          ? block.video.type === 'external'
            ? block.video.external.url
            : block.video.type === 'file'
              ? block.video.file.url
              : ''
          : block.embed.url;
      if (!url) return '';
      return `<div class="my-4 aspect-video w-full overflow-hidden rounded-xl border border-white/10"><iframe src="${escapeAttr(url)}" class="h-full w-full" title="Embedded content" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></div>`;
    }
    case 'to_do': {
      const checked = block.to_do.checked;
      const t = richTextToHtml(block.to_do.rich_text);
      return `<div class="my-2 flex items-start gap-2 text-zinc-400"><span aria-hidden>${checked ? '☑' : '☐'}</span><span>${t}</span></div>`;
    }
    case 'toggle': {
      const summary = richTextToHtml(block.toggle.rich_text);
      return `<details class="my-4 border border-white/10 rounded-lg p-4"><summary class="cursor-pointer text-[#e4e4e7] font-medium">${summary || 'Więcej'}</summary></details>`;
    }
    case 'table_row': {
      const cells = block.table_row.cells.map((cell) => richTextToHtml(cell));
      return `<tr>${cells.map((c) => `<td class="border border-white/10 px-3 py-2 align-top">${c}</td>`).join('')}</tr>`;
    }
    case 'bulleted_list_item':
    case 'numbered_list_item':
      return '';
    default:
      return '';
  }
}

async function pageBlocksToHtml(notion: Client, pageId: string): Promise<string> {
  const children = await collectPaginatedAPI(notion.blocks.children.list, {
    block_id: pageId,
  });
  const full = children.filter(isFullBlock) as BlockObjectResponse[];
  return renderBlocks(notion, full);
}

async function resolveDataSourceId(notion: Client): Promise<string | null> {
  const direct = getDataSourceId();
  if (direct) return direct;

  const databaseId = getDatabaseId();
  if (!databaseId) return null;

  const db = await notion.databases.retrieve({ database_id: databaseId });
  if (db.object !== 'database' || !('data_sources' in db) || !db.data_sources?.length) {
    console.error('[Notion articles] Database has no data_sources; set NOTION_BLOG_DATA_SOURCE_ID');
    return null;
  }
  return db.data_sources[0].id;
}

/**
 * dataSources.query may return PartialPageObjectResponse (id only). isFullPage() requires `url`,
 * so without hydration the blog list was empty. Retrieve full page when needed.
 */
function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

async function hydrateQueryPageRow(
  notion: Client,
  row: PageObjectResponse | { object: 'page'; id: string },
): Promise<PageObjectResponse | null> {
  if (isFullPage(row)) return row;
  if (row.object !== 'page' || !('id' in row) || typeof row.id !== 'string') return null;
  const max = 3;
  for (let attempt = 1; attempt <= max; attempt++) {
    try {
      const full = await notion.pages.retrieve({ page_id: row.id });
      return isFullPage(full) ? full : null;
    } catch (e) {
      if (attempt === max) {
        console.warn('[Notion articles] Nie udało się pobrać pełnej strony (partial z query)', row.id, e);
        return null;
      }
      await delay(400 * attempt);
    }
  }
  return null;
}

async function queryDataSourcePages(
  notion: Client,
  dataSourceId: string,
  names: ReturnType<typeof propNames>,
  filter: PublishedRowFilter | undefined,
  withSort: boolean,
): Promise<PageObjectResponse[]> {
  const pages: PageObjectResponse[] = [];
  let cursor: string | undefined;
  do {
    const res = await notion.dataSources.query({
      data_source_id: dataSourceId,
      result_type: 'page',
      ...(filter ? { filter } : {}),
      ...(withSort ? { sorts: [{ property: names.date, direction: 'descending' as const }] } : {}),
      start_cursor: cursor,
      page_size: 100,
    });
    for (const row of res.results) {
      if (row.object !== 'page') continue;
      const full = await hydrateQueryPageRow(notion, row as PageObjectResponse);
      if (full) pages.push(full);
    }
    cursor = res.has_more && res.next_cursor ? res.next_cursor : undefined;
  } while (cursor);
  return pages;
}

async function queryAllPublishedPages(
  notion: Client,
  dataSourceId: string,
  names: ReturnType<typeof propNames>,
  filter: PublishedRowFilter,
): Promise<PageObjectResponse[]> {
  try {
    return await queryDataSourcePages(notion, dataSourceId, names, filter, true);
  } catch (err) {
    console.warn(
      '[Notion articles] Query with date sort failed (check NOTION_PROP_DATE). Retrying without sort.',
      err,
    );
    try {
      return await queryDataSourcePages(notion, dataSourceId, names, filter, false);
    } catch (err2) {
      console.error('[Notion articles] Query failed', err2);
      return [];
    }
  }
}

/** When API-side filter returns nothing (wrong type / option name), load all rows and filter by Status in JS. */
async function queryPublishedClientSide(
  notion: Client,
  dataSourceId: string,
  names: ReturnType<typeof propNames>,
): Promise<PageObjectResponse[]> {
  try {
    let all = await queryDataSourcePages(notion, dataSourceId, names, undefined, true);
    if (all.length === 0) {
      all = await queryDataSourcePages(notion, dataSourceId, names, undefined, false);
    }
    const filtered = all.filter((p) => pageMatchesPublishedLabelLenient(p, names));
    if (filtered.length && all.length > filtered.length) {
      console.warn(
        `[Notion articles] Client-side filter: ${filtered.length}/${all.length} rows match Status="${names.published}".`,
      );
    }
    if (filtered.length === 0 && all.length > 0) {
      const samples = all.slice(0, 8).map((p) => {
        const sp = p.properties[names.status];
        if (!sp) return '(brak kolumny)';
        if (sp.type === 'select') return sp.select?.name ?? '(pusto)';
        if (sp.type === 'status') return sp.status?.name ?? '(pusto)';
        if (sp.type === 'checkbox') return String(sp.checkbox);
        return sp.type;
      });
      console.warn(
        `[Notion articles] Żaden wiersz nie ma Status="${names.published}". Przykładowe wartości w kolumnie "${names.status}":`,
        samples,
      );
    }
    return filtered;
  } catch (e) {
    console.error('[Notion articles] Client-side published filter failed', e);
    return [];
  }
}

/**
 * Single fetch pass. Throws on hard API errors so unstable_cache does not store an empty list
 * after a transient failure (which was hiding all articles until cache expiry).
 */
async function fetchNotionArticlesFromApiOnce(): Promise<NotionArticle[]> {
  const token = getToken();
  if (!token) {
    return [];
  }

  const notion = new Client({ auth: token });
  const names = propNames();

  const dataSourceId = await resolveDataSourceId(notion);
  if (!dataSourceId) {
    return [];
  }

  let filter = await resolvePublishedRowFilter(notion, dataSourceId, names);
  let rows = await queryAllPublishedPages(notion, dataSourceId, names, filter);

  if (rows.length === 0 && !process.env.NOTION_STATUS_KIND) {
    const alt = alternatePublishedFilter(filter, names);
    if (alt) {
      const tryRows = await queryAllPublishedPages(notion, dataSourceId, names, alt);
      if (tryRows.length > 0) {
        console.warn(
          '[Notion articles] No rows with default Status filter; alternate type worked. Set NOTION_STATUS_KIND=status or select in .env.local.',
        );
        rows = tryRows;
      }
    }
  }

  if (rows.length === 0) {
    rows = await queryPublishedClientSide(notion, dataSourceId, names);
  }

  if (rows.length === 0) {
    console.warn(
      `[Notion articles] 0 published pages. Check: integration connected to DB, Status="${names.published}" matches a row, title column filled, NOTION_PROP_* column names, NOTION_STATUS_KIND if needed.`,
    );
  }

  const articles: NotionArticle[] = [];
  const usedSlugs = new Set<string>();

  const uniqueSlug = (base: string): string => {
    let s = base || 'wpis';
    let n = 2;
    while (usedSlugs.has(s)) {
      s = `${base}-${n}`;
      n += 1;
    }
    usedSlugs.add(s);
    return s;
  };

  for (const row of rows) {
    try {
      const title = titleFromPage(row).trim();
      const slugField = slugFromPage(row, names.slug).trim();
      const slug = uniqueSlug(slugField || slugifyFromTitle(title));
      if (!title) {
        console.warn(
          `[Notion articles] Pominięto wiersz (pusty tytuł). Uzupełnij kolumnę „Name” / tytuł lub ustaw NOTION_PROP_TITLE na właściwą nazwę pola w bazie. id=${row.id}`,
        );
        continue;
      }

      const html = await pageBlocksToHtml(notion, row.id);
      const meta = metaFromPage(row, names.meta);
      const publish_date = dateFromPage(row, names.date);

      articles.push({
        id: row.id,
        title,
        slug,
        content: html,
        meta_description: meta,
        publish_date,
      });
    } catch (rowErr) {
      console.error(`[Notion articles] Pominięto wiersz ${row.id} (błąd treści/strony)`, rowErr);
    }
  }

  return articles;
}

async function fetchNotionArticlesFromApi(): Promise<NotionArticle[]> {
  if (!getToken()) return [];

  try {
    let articles = await fetchNotionArticlesFromApiOnce();
    if (
      articles.length === 0 &&
      getDatabaseId() &&
      process.env.NOTION_RETRY_EMPTY_FETCH !== '0' &&
      process.env.NOTION_RETRY_EMPTY_FETCH !== 'false'
    ) {
      console.warn(
        '[Notion articles] 0 wpisów — ponawiam po 2,5 s (Notion czasem zwraca pusty wynik tuż po zmianie statusu).',
      );
      await delay(2500);
      const retry = await fetchNotionArticlesFromApiOnce();
      if (retry.length > 0) {
        return retry;
      }
    }
    return articles;
  } catch (err) {
    console.error('[Notion articles] Błąd pobierania (nie zapisujemy pustej listy w cache)', err);
    throw err instanceof Error ? err : new Error(String(err));
  }
}

const getNotionArticlesCached = unstable_cache(
  fetchNotionArticlesFromApi,
  ['notion-blog-articles', 'v7-retry-and-throw'],
  {
    revalidate: NOTION_LIST_REVALIDATE_SECONDS,
    tags: ['notion-blog'],
  },
);

/**
 * Published rows from Notion (Status = Published). Cached ~NOTION_LIST_REVALIDATE_SECONDS.
 * Set NOTION_SKIP_CACHE=1 to bypass cache while debugging.
 */
export async function getNotionArticles(): Promise<NotionArticle[]> {
  try {
    if (process.env.NOTION_SKIP_CACHE === '1' || process.env.NOTION_SKIP_CACHE === 'true') {
      return await fetchNotionArticlesFromApi();
    }
    return await getNotionArticlesCached();
  } catch (e) {
    console.error('[Notion articles] getNotionArticles', e);
    return [];
  }
}

/**
 * Uncached read of current page properties — confirms the row still matches “published” rules.
 * Used for single-article routes so unpublishing removes the URL without waiting for list cache.
 *
 * @param treatErrorsAsPublished — if true, API/network errors keep the previous assumption (show card).
 *   Use for list views so a Notion outage does not blank the whole blog.
 * @param trustIfUnverifiable — if true, non-full page response keeps the card (list-only safety).
 */
export async function isNotionPagePublishedForBlog(
  pageId: string,
  opts?: { treatErrorsAsPublished?: boolean; trustIfUnverifiable?: boolean },
): Promise<boolean> {
  const token = getToken();
  if (!token) return opts?.treatErrorsAsPublished === true ? true : false;
  const notion = new Client({ auth: token });
  const names = propNames();
  try {
    const res = await notion.pages.retrieve({ page_id: pageId });
    if (!isFullPage(res)) {
      return opts?.trustIfUnverifiable === true || opts?.treatErrorsAsPublished === true;
    }
    const st = res.properties[names.status];
    if (!st) {
      return true;
    }
    return pageMatchesPublishedLabel(res, names);
  } catch {
    return opts?.treatErrorsAsPublished === true;
  }
}
