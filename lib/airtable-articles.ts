/**
 * Airtable CMS for blog articles (separate base from contact form).
 *
 * Fetches from: GET https://api.airtable.com/v0/{BLOG_BASE_ID}/articles
 * Required env: AIRTABLE_BLOG_BASE_ID (blog base; contact form uses AIRTABLE_BASE_ID)
 * Token: AIRTABLE_BLOG_API_KEY or AIRTABLE_API_KEY / AIRTABLE_ACCESS_TOKEN (same key can access both bases)
 * Optional: AIRTABLE_ARTICLES_TABLE_ID - table name/ID (default: "articles")
 *
 * Only records with status = "published" are returned.
 * Results are cached in memory for 5 minutes.
 */

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

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
  meta_description: string;
  publish_date: string; // YYYY-MM-DD
};

let cache: { articles: AirtableArticle[]; expiresAt: number } | null = null;

function getConfig(): { token: string; baseId: string; tableId: string } | null {
  const token = process.env.AIRTABLE_BLOG_API_KEY || process.env.AIRTABLE_API_KEY || process.env.AIRTABLE_ACCESS_TOKEN;
  const baseId = process.env.AIRTABLE_BLOG_BASE_ID;
  const tableId = process.env.AIRTABLE_ARTICLES_TABLE_ID || process.env.AIRTABLE_ARTICLES_TABLE_NAME || 'articles';
  if (!token || !baseId) return null;
  return { token, baseId, tableId };
}

/**
 * Fetch all published articles from Airtable. Uses in-memory cache for 5 minutes.
 * On API failure: returns [] and logs; does not throw, so the site keeps working with code-only posts.
 */
export async function getAirtableArticles(): Promise<AirtableArticle[]> {
  if (cache && Date.now() < cache.expiresAt) {
    return cache.articles;
  }

  const config = getConfig();
  if (!config) {
    return [];
  }

  const url = `https://api.airtable.com/v0/${config.baseId}/${encodeURIComponent(config.tableId)}`;

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${config.token}`,
      },
      next: { revalidate: 0 }, // we handle cache ourselves for consistent TTL
    });

    const text = await res.text();
    if (!res.ok) {
      console.error('[Airtable articles]', res.status, text.slice(0, 300));
      return cache?.articles ?? [];
    }

    let data: { records?: AirtableRecord[] };
    try {
      data = JSON.parse(text) as { records?: AirtableRecord[] };
    } catch {
      console.error('[Airtable articles] Invalid JSON');
      return cache?.articles ?? [];
    }

    const records = data.records ?? [];
    const articles: AirtableArticle[] = records
      .filter((r) => r.fields?.status === 'published' && r.fields?.slug && r.fields?.title)
      .map((r) => ({
        id: r.id,
        title: String(r.fields.title ?? ''),
        slug: String(r.fields.slug ?? '').trim(),
        content: String(r.fields.content ?? ''),
        meta_description: String(r.fields.meta_description ?? '').trim(),
        publish_date: formatPublishDate(r.fields.publish_date),
      }));

    cache = { articles, expiresAt: Date.now() + CACHE_TTL_MS };
    return articles;
  } catch (err) {
    console.error('[Airtable articles]', err);
    return cache?.articles ?? [];
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
