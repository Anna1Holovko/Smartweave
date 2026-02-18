/**
 * Single source of truth for site URL and config used by sitemap, robots, metadata.
 * Google Search Console and sitemap submission rely on this base URL.
 */
export const SITE_URL = 'https://smartweave.pl';
export const SITE_NAME = 'SmartWeave';

/** Routes included in the sitemap (path only, no leading slash for root) */
export const SITEMAP_ROUTES = [
  { path: '', priority: 1, changeFrequency: 'weekly' as const },
  // Add future routes here, e.g.:
  // { path: 'o-nas', priority: 0.8, changeFrequency: 'monthly' },
] as const;
