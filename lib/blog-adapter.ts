/**
 * Blog adapter: merges code-defined posts (lib/blog.ts) with Airtable articles.
 *
 * - /blog list: shows both, sorted by publish_date DESC.
 * - /blog/:slug: resolves slug from Airtable first, then code. Existing posts unchanged.
 * - If Airtable API fails, only code posts are returned (no crash).
 */

import { SITE_URL } from '@/lib/site';
import { BLOG_POSTS, getPostBySlug as getCodePostBySlug, type BlogPost } from '@/lib/blog';
import { getAirtableArticles, excerptFromContent, type AirtableArticle } from '@/lib/airtable-articles';

// Airtable posts have no cover; use first code post image so no 404.
const DEFAULT_COVER = BLOG_POSTS[0]?.image ?? '/assets/blog/placeholder-cover.png';

/** Unified post for list and article. source discriminates code vs Airtable. */
export type UnifiedPost = {
  source: 'code' | 'airtable';
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  /** Only set for Airtable (long-text HTML/markdown). Code posts use BLOG_CONTENT. */
  content?: string;
};

function codePostToUnified(p: BlogPost): UnifiedPost {
  return {
    source: 'code',
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    date: p.date,
    image: p.image,
    metaTitle: 'metaTitle' in p ? p.metaTitle : undefined,
    metaDescription: 'metaDescription' in p ? p.metaDescription : undefined,
    keywords: 'keywords' in p && Array.isArray(p.keywords) ? p.keywords : undefined,
  };
}

function airtableToUnified(a: AirtableArticle): UnifiedPost {
  return {
    source: 'airtable',
    slug: a.slug,
    title: a.title,
    excerpt: excerptFromContent(a.content),
    date: a.publish_date,
    image: DEFAULT_COVER,
    metaDescription: a.meta_description || undefined,
    content: a.content,
  };
}

/**
 * All posts for the blog list: Airtable (published) + code posts, sorted by date DESC.
 * On Airtable failure returns only code posts.
 */
export async function getAllPosts(): Promise<UnifiedPost[]> {
  const airtable = await getAirtableArticles();
  const code = BLOG_POSTS.map(codePostToUnified);
  const fromAirtable = airtable.map(airtableToUnified);
  const merged = [...fromAirtable, ...code];
  merged.sort((a, b) => (b.date < a.date ? -1 : b.date > a.date ? 1 : 0));
  return merged;
}

/**
 * Get a single post by slug. Checks Airtable first, then code. Returns undefined if not found.
 */
export async function getPostBySlug(slug: string): Promise<UnifiedPost | undefined> {
  const airtable = await getAirtableArticles();
  const fromAirtable = airtable.find((a) => a.slug === slug);
  if (fromAirtable) return airtableToUnified(fromAirtable);
  const codePost = getCodePostBySlug(slug);
  if (codePost) return codePostToUnified(codePost);
  return undefined;
}

/** Canonical cover URL for a unified post (list, article, OG). */
export function getUnifiedPostCoverUrl(post: UnifiedPost): string {
  return `${SITE_URL}${post.image}`;
}

/** All slugs for static params / sitemap. Code slugs + Airtable slugs (when API succeeds). */
export async function getAllSlugs(): Promise<string[]> {
  const airtable = await getAirtableArticles();
  const codeSlugs = BLOG_POSTS.map((p) => p.slug);
  const airtableSlugs = airtable.map((a) => a.slug);
  return [...new Set([...airtableSlugs, ...codeSlugs])];
}
