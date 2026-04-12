/**
 * Blog: articles load only from Notion (lib/notion-articles.ts).
 * Configure NOTION_API_KEY + NOTION_BLOG_DATABASE_ID (or NOTION_BLOG_DATA_SOURCE_ID).
 */

import { SITE_URL } from '@/lib/site';
import { blogCoverPublicPath } from '@/lib/blog-cover-urls';
import {
  getNotionArticles,
  isNotionPagePublishedForBlog,
  type NotionArticle,
} from '@/lib/notion-articles';
import { excerptFromContent } from '@/lib/airtable-articles';

/** Legacy default path (same file as `blogCoverPublicPath('automatyzacja-procesow-agenci-ai-odzyskaj-czas')`). */
export const DEFAULT_BLOG_COVER = blogCoverPublicPath('automatyzacja-procesow-agenci-ai-odzyskaj-czas');

export type UnifiedPost = {
  source: 'notion';
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  /** Rendered HTML from Notion page blocks */
  content?: string;
};

/**
 * Optional: N× pages.retrieve per list load — can false-negative; default off.
 */
function liveVerifyListEnabled(): boolean {
  return process.env.NOTION_LIVE_VERIFY_LIST === '1' || process.env.NOTION_LIVE_VERIFY_LIST === 'true';
}

function liveVerifyArticleEnabled(): boolean {
  return process.env.NOTION_LIVE_VERIFY_ARTICLE === '1' || process.env.NOTION_LIVE_VERIFY_ARTICLE === 'true';
}

/** Drop cards whose Status in Notion is no longer Published (only when NOTION_LIVE_VERIFY_LIST=1). */
async function filterStillPublishedOnNotion(rows: NotionArticle[]): Promise<NotionArticle[]> {
  if (rows.length === 0) return [];
  if (!liveVerifyListEnabled()) return rows;

  const flags = await Promise.all(
    rows.map((a) =>
      isNotionPagePublishedForBlog(a.id, {
        treatErrorsAsPublished: true,
        trustIfUnverifiable: true,
      }),
    ),
  );
  const out = rows.filter((_, i) => flags[i]);
  if (out.length === 0 && rows.length > 0) {
    console.warn(
      '[blog-adapter] Live list verify removed all posts (likely API/property mismatch). Keeping cached list. Disable with NOTION_LIVE_VERIFY_LIST=0.',
    );
    return rows;
  }
  return out;
}

/**
 * Default: **Notion page cover** (upload / link) when the API returns `cover_url`, else fallback to
 * paths from code (`lib/blog-cover-urls.ts` + `public/assets/blog/`). One-time: run
 * `npm run sync:notion-covers -- --from-code` to set covers in Notion from deployed assets; later
 * replace covers in Notion — the site will pick them up after revalidate.
 */
function forceCodeOnlyCover(): boolean {
  return process.env.BLOG_COVER_FROM_CODE_ONLY === '1' || process.env.BLOG_COVER_FROM_CODE_ONLY === 'true';
}

function notionToUnified(a: NotionArticle): UnifiedPost {
  const fromCode = blogCoverPublicPath(a.slug);
  const notionUrl = a.cover_url?.trim();
  const image =
    !forceCodeOnlyCover() && notionUrl && /^https?:\/\//i.test(notionUrl) ? notionUrl : fromCode;
  return {
    source: 'notion',
    slug: a.slug,
    title: a.title,
    excerpt: excerptFromContent(a.content),
    date: a.publish_date,
    image,
    metaDescription: a.meta_description || undefined,
    content: a.content,
  };
}

export async function getAllPosts(): Promise<UnifiedPost[]> {
  const notion = await getNotionArticles();
  const live = await filterStillPublishedOnNotion(notion);
  const merged = live.map(notionToUnified);
  merged.sort((a, b) => (b.date < a.date ? -1 : b.date > a.date ? 1 : 0));
  return merged;
}

export async function getPostBySlug(slug: string): Promise<UnifiedPost | undefined> {
  const notion = await getNotionArticles();
  const row = notion.find((a) => a.slug === slug);
  if (!row) return undefined;
  if (liveVerifyArticleEnabled()) {
    const stillPublished = await isNotionPagePublishedForBlog(row.id);
    if (!stillPublished) return undefined;
  }
  return notionToUnified(row);
}

export function getUnifiedPostCoverUrl(post: UnifiedPost): string {
  const img = post.image.trim();
  if (/^https?:\/\//i.test(img)) return img;
  return `${SITE_URL}${img.startsWith('/') ? img : `/${img}`}`;
}

export async function getAllSlugs(): Promise<string[]> {
  const notion = await getNotionArticles();
  const live = await filterStillPublishedOnNotion(notion);
  return live.map((a) => a.slug);
}
