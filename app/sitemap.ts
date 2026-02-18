import { MetadataRoute } from 'next';
import { SITE_URL, SITEMAP_ROUTES } from '@/lib/site';

/**
 * Generates the XML sitemap for Google Search Console and other crawlers.
 * Submit this URL in GSC: https://smartweave.pl/sitemap.xml
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return SITEMAP_ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: path ? `${SITE_URL}/${path}` : SITE_URL,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
