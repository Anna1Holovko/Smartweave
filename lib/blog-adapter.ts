/**
 * Blog: articles load from Airtable (lib/airtable-articles.ts).
 * Configure AIRTABLE_BLOG_API_KEY + AIRTABLE_BLOG_BASE_ID + AIRTABLE_BLOG_TABLE_ID.
 */

import { SITE_URL } from '@/lib/site';
import { blogCoverPublicPath } from '@/lib/blog-cover-urls';
import {
  getAirtableArticles,
  isAirtableBlogConfigured,
  excerptFromContent,
  type AirtableArticle,
} from '@/lib/airtable-articles';

/** Legacy default path */
export const DEFAULT_BLOG_COVER = blogCoverPublicPath('automatyzacja-procesow-agenci-ai-odzyskaj-czas');

export type UnifiedPost = {
  source: 'airtable';
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  /** Rendered HTML from markdown content */
  content?: string;
};

/**
 * Same-origin absolute URLs → path so `next/image` uses local files; remote URLs unchanged.
 */
function imageSrcForNext(src: string): string {
  const s = src.trim();
  if (!s) return DEFAULT_BLOG_COVER;
  if (s.startsWith('/')) return s;
  if (!/^https?:\/\//i.test(s)) return s.startsWith('/') ? s : `/${s}`;
  try {
    const origin = new URL(SITE_URL).origin;
    const u = new URL(s);
    if (u.origin === origin) {
      return `${u.pathname}${u.search}${u.hash}`;
    }
  } catch {
    /* keep remote URL */
  }
  return s;
}

function airtableToUnified(a: AirtableArticle): UnifiedPost {
  const fromCode = blogCoverPublicPath(a.slug);
  const image = imageSrcForNext(fromCode);
  return {
    source: 'airtable',
    slug: a.slug,
    title: a.title,
    excerpt: excerptFromContent(a.content),
    date: a.publish_date,
    image,
    metaDescription: a.meta_description || undefined,
    content: a.contentHtml,
  };
}

export async function getAllPosts(): Promise<UnifiedPost[]> {
  const articles = await getAirtableArticles();
  const merged = articles.map(airtableToUnified);
  merged.sort((a, b) => (b.date < a.date ? -1 : b.date > a.date ? 1 : 0));
  return merged;
}

export async function getPostBySlug(slug: string): Promise<UnifiedPost | undefined> {
  const articles = await getAirtableArticles();
  const row = articles.find((a) => a.slug === slug);
  if (!row) return undefined;
  return airtableToUnified(row);
}

export function getUnifiedPostCoverUrl(post: UnifiedPost): string {
  const img = post.image.trim();
  if (/^https?:\/\//i.test(img)) return img;
  return `${SITE_URL}${img.startsWith('/') ? img : `/${img}`}`;
}

export async function getAllSlugs(): Promise<string[]> {
  const articles = await getAirtableArticles();
  return articles.map((a) => a.slug);
}

/** Re-export for backwards compatibility */
export { isAirtableBlogConfigured as isNotionBlogEnvConfigured };
