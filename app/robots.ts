import { MetadataRoute } from 'next';

const BASE_URL = 'https://smartweave.pl';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: [] },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
