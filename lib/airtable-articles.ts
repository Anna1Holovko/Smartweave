/**
 * Airtable CMS for blog articles.
 *
 * Required env:
 *   AIRTABLE_BLOG_BASE_ID - Base ID (default: app9YUgvYfBCLgsjq)
 *   AIRTABLE_BLOG_TABLE_ID - Table ID (default: tblZaKZwgmco4vAns)
 *   AIRTABLE_BLOG_API_KEY or AIRTABLE_API_KEY - API token
 *
 * Only records with status = "published" are returned.
 * Uses Next.js unstable_cache for caching.
 */

import { unstable_cache } from 'next/cache';

type AirtableRecord = {
  id: string;
  fields: {
    title?: string;
    slug?: string;
    content?: string;
    meta_description?: string;
    status?: string;
    publish_date?: string;
  };
};

export type AirtableArticle = {
  id: string;
  title: string;
  slug: string;
  content: string;
  contentHtml: string;
  meta_description: string;
  publish_date: string;
};

/** Cache revalidate time in seconds */
export const AIRTABLE_CACHE_SECONDS = 30;

function getConfig(): { token: string; baseId: string; tableId: string } | null {
  const token = process.env.AIRTABLE_BLOG_API_KEY || process.env.AIRTABLE_API_KEY || process.env.AIRTABLE_ACCESS_TOKEN;
  const baseId = process.env.AIRTABLE_BLOG_BASE_ID || 'app9YUgvYfBCLgsjq';
  const tableId = process.env.AIRTABLE_BLOG_TABLE_ID || 'tblZaKZwgmco4vAns';
  if (!token) return null;
  return { token, baseId, tableId };
}

export function isAirtableBlogConfigured(): boolean {
  return getConfig() !== null;
}

/** Convert markdown to HTML */
function markdownToHtml(markdown: string): string {
  if (!markdown) return '';

  let html = markdown
    // Escape HTML first
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // Headers
    .replace(/^### (.+)$/gm, '<h3 class="text-lg sm:text-xl font-bold text-zinc-200 mt-6 mb-3">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl sm:text-2xl font-bold text-[#e4e4e7] mt-10 mb-4">$1</h2>')
    .replace(/^# (.+)$/gm, '<h2 class="text-xl sm:text-2xl font-bold text-[#e4e4e7] mt-10 mb-4">$1</h2>')
    // Bold and italic
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[#d8f17b] underline underline-offset-2" target="_blank" rel="noopener noreferrer">$1</a>')
    // Unordered lists
    .replace(/^- (.+)$/gm, '<li class="my-1">$1</li>')
    // Paragraphs (lines that aren't already wrapped)
    .split('\n\n')
    .map(block => {
      block = block.trim();
      if (!block) return '';
      if (block.startsWith('<h') || block.startsWith('<li')) return block;
      if (block.includes('<li')) {
        return `<ul class="list-disc pl-6 space-y-1 my-4 text-zinc-400">${block}</ul>`;
      }
      return `<p class="text-zinc-400 leading-relaxed mb-4">${block}</p>`;
    })
    .join('\n');

  return html;
}

/** Fetch articles directly from Airtable API */
async function fetchAirtableArticlesFromApi(): Promise<AirtableArticle[]> {
  const config = getConfig();
  if (!config) {
    console.warn('[Airtable articles] Missing AIRTABLE_BLOG_API_KEY');
    return [];
  }

  const url = `https://api.airtable.com/v0/${config.baseId}/${config.tableId}`;

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${config.token}`,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('[Airtable articles]', res.status, text.slice(0, 300));
      throw new Error(`Airtable API error: ${res.status}`);
    }

    const data = await res.json() as { records?: AirtableRecord[] };
    const records = data.records ?? [];

    const articles: AirtableArticle[] = records
      .filter((r) => r.fields?.status === 'published' && r.fields?.slug && r.fields?.title)
      .map((r) => {
        const content = String(r.fields.content ?? '');
        return {
          id: r.id,
          title: String(r.fields.title ?? ''),
          slug: String(r.fields.slug ?? '').trim(),
          content,
          contentHtml: markdownToHtml(content),
          meta_description: String(r.fields.meta_description ?? '').trim(),
          publish_date: formatPublishDate(r.fields.publish_date),
        };
      });

    // Sort by date descending
    articles.sort((a, b) => (b.publish_date < a.publish_date ? -1 : b.publish_date > a.publish_date ? 1 : 0));

    return articles;
  } catch (err) {
    console.error('[Airtable articles]', err);
    throw err;
  }
}

const getAirtableArticlesCached = unstable_cache(
  fetchAirtableArticlesFromApi,
  ['airtable-blog-articles'],
  {
    revalidate: AIRTABLE_CACHE_SECONDS,
    tags: ['airtable-blog'],
  },
);

/**
 * Fetch all published articles from Airtable. Uses Next.js cache.
 */
export async function getAirtableArticles(): Promise<AirtableArticle[]> {
  try {
    return await getAirtableArticlesCached();
  } catch (e) {
    console.error('[Airtable articles] getAirtableArticles', e);
    return [];
  }
}

function formatPublishDate(value: string | undefined): string {
  if (!value) return new Date().toISOString().slice(0, 10);
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return new Date().toISOString().slice(0, 10);
  return d.toISOString().slice(0, 10);
}

/** First 200 characters of content for list excerpt. */
export function excerptFromContent(content: string, maxLength = 200): string {
  const plain = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (plain.length <= maxLength) return plain;
  return plain.slice(0, maxLength).trim() + '…';
}
