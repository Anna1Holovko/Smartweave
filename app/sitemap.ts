import { MetadataRoute } from 'next';
import { SITE_URL, SITEMAP_ROUTES } from '@/lib/site';
import { BLOG_POSTS } from '@/lib/blog';

/**
 * Generates the XML sitemap for Google Search Console and other crawlers.
 * Submit this URL in GSC: https://smartweave.pl/sitemap.xml
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticUrls = SITEMAP_ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: path ? `${SITE_URL}/${path}` : SITE_URL,
    lastModified: now,
    changeFrequency,
    priority,
  }));
  const blogUrls = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));
  return [...staticUrls, ...blogUrls];
}
