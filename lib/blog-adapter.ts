/**
 * Blog: articles load only from Notion (lib/notion-articles.ts).
 * Configure NOTION_API_KEY + NOTION_BLOG_DATABASE_ID (or NOTION_BLOG_DATA_SOURCE_ID).
 */

import { SITE_URL } from '@/lib/site';
import {
  getNotionArticles,
  isNotionPagePublishedForBlog,
  type NotionArticle,
} from '@/lib/notion-articles';
import { excerptFromContent } from '@/lib/airtable-articles';

/** Fallback cover when Notion has no per-page cover (add Files/URL in Notion later). */
export const DEFAULT_BLOG_COVER = '/assets/blog/automatyzacja-agenci-ai-odzyskaj-czas-cover.png';

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

function notionToUnified(a: NotionArticle): UnifiedPost {
  return {
    source: 'notion',
    slug: a.slug,
    title: a.title,
    excerpt: excerptFromContent(a.content),
    date: a.publish_date,
    image: DEFAULT_BLOG_COVER,
    metaDescription: a.meta_description || undefined,
    content: a.content,
  };
}

export async function getAllPosts(): Promise<UnifiedPost[]> {
  const notion = await getNotionArticles();
  const merged = notion.map(notionToUnified);
  merged.sort((a, b) => (b.date < a.date ? -1 : b.date > a.date ? 1 : 0));
  return merged;
}

export async function getPostBySlug(slug: string): Promise<UnifiedPost | undefined> {
  const notion = await getNotionArticles();
  const row = notion.find((a) => a.slug === slug);
  if (!row) return undefined;
  const stillPublished = await isNotionPagePublishedForBlog(row.id);
  if (!stillPublished) return undefined;
  return notionToUnified(row);
}

export function getUnifiedPostCoverUrl(post: UnifiedPost): string {
  return `${SITE_URL}${post.image}`;
}

export async function getAllSlugs(): Promise<string[]> {
  const notion = await getNotionArticles();
  return notion.map((a) => a.slug);
}
