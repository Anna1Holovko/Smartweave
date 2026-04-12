import { revalidatePath, revalidateTag } from 'next/cache';
import { getAllSlugs } from '@/lib/blog-adapter';

/**
 * Invalidates Notion `unstable_cache` (tag `notion-blog`) and full route cache for:
 * - `/` (home blog strip), `/blog` (listing), every `/blog/[slug]` (posts), `/sitemap.xml`.
 *
 * Important: `revalidatePath('/blog')` alone does **not** invalidate dynamic `/blog/[slug]` in the
 * App Router — those pages keep serving stale HTML until per-slug paths or a layout revalidation.
 */
export async function revalidateBlogCache(): Promise<{ ok: true; revalidated: string[] }> {
  const revalidated: string[] = ['tag:notion-blog'];

  revalidateTag('notion-blog');

  // Blog subtree (listing + every post). `/blog` page-only would not cover `/blog/[slug]`.
  revalidatePath('/blog', 'layout');
  revalidated.push('/blog:layout');
  // Home embeds featured posts — `page` only (avoid revalidating the whole site via `/` layout).
  revalidatePath('/', 'page');
  revalidated.push('/');

  revalidatePath('/sitemap.xml');
  revalidated.push('/sitemap.xml');

  // After tag invalidation, slugs resolve from a fresh Notion fetch (not stale list cache).
  try {
    const slugs = await getAllSlugs();
    for (const slug of slugs) {
      const path = `/blog/${encodeURIComponent(slug)}`;
      revalidatePath(path);
      revalidated.push(path);
    }
  } catch {
    /* getAllSlugs failed — layout revalidation above still helps listing + home */
  }

  return { ok: true, revalidated };
}
