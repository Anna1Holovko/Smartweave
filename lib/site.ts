/**
 * Single source of truth for site URL and config used by sitemap, robots, metadata.
 * Google Search oriented: title/description lengths tuned for search snippets.
 */
export const SITE_URL = 'https://smartweave.pl';
export const SITE_NAME = 'SmartWeave';

/** Absolute URL for logo (required for Organization/rich results in Google) */
export const SITE_LOGO_URL = `${SITE_URL}/assets/smartweave-logo.png`;

/**
 * Meta title for default page. Google typically shows ~50–60 chars; keep under 60 for full display.
 */
export const META_TITLE =
  'Design i automatyzacja dla firm | SmartWeave';

/**
 * Meta description. Google shows ~155–158 chars; keep in 150–158 for full snippet.
 */
export const META_DESCRIPTION =
  'SmartWeave: design i automatyzacja dla biznesu. Strony WWW, branding, automatyzacja procesów i agenci AI. SEO dla małych i średnich firm.';

/** Open Graph / Twitter title (can be same or variant) */
export const OG_TITLE = 'Design i automatyzacja dla firm – SmartWeave';

/** Open Graph / Twitter description */
export const OG_DESCRIPTION =
  'Projektujemy strony i wdrażamy automatyzację procesów. Design i automatyzacja dla małych i średnich firm.';

/** Routes included in the sitemap (path only, no leading slash for root) */
export const SITEMAP_ROUTES = [
  { path: '', priority: 1, changeFrequency: 'weekly' as const },
  { path: 'uslugi', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: 'uslugi/strony', priority: 0.85, changeFrequency: 'weekly' as const },
  { path: 'uslugi/branding', priority: 0.85, changeFrequency: 'weekly' as const },
  { path: 'uslugi/automatyzacja', priority: 0.85, changeFrequency: 'weekly' as const },
  { path: 'realizacje', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: 'blog', priority: 0.9, changeFrequency: 'weekly' as const },
] as const;
