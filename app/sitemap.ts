import { MetadataRoute } from 'next';
import { SITE_URL, SITEMAP_ROUTES } from '@/lib/site';
import { getAllPosts } from '@/lib/blog-adapter';

/**
 * Generates the XML sitemap for Google Search Console and other crawlers.
 * Includes code posts + Airtable articles (when API succeeds). Submit in GSC: https://smartweave.pl/sitemap.xml
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticUrls = SITEMAP_ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: path ? `${SITE_URL}/${path}` : SITE_URL,
    lastModified: now,
    changeFrequency,
    priority,
  }));
  const posts = await getAllPosts();
  const blogUrls = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));
  return [...staticUrls, ...blogUrls];
}
