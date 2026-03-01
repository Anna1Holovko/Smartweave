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
export const META_TITLE = 'Projektowanie stron www dla firm | Automatyzacja AI';

/**
 * Meta description. Google shows ~155–158 chars; keep in 150–158 for full snippet.
 */
export const META_DESCRIPTION =
  'Projektowanie stron www dla firm, automatyzacja procesów AI i strony pod leada B2B. Nowoczesne strony i automatyzacje dla biznesu. SmartWeave.';

/** Open Graph / Twitter title (can be same or variant) */
export const OG_TITLE = 'SmartWeave – projektowanie stron www dla firm, automatyzacja procesów AI';

/** Open Graph / Twitter description */
export const OG_DESCRIPTION =
  'Projektowanie stron www dla firm, automatyzacja procesów AI, strony pod leada B2B. Design i automatyzacja dla biznesu. SmartWeave.';

/** Calendly booking URL. Override with NEXT_PUBLIC_CALENDLY_URL in env. */
export const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL ?? 'https://calendly.com/hello-smartweave/30min';

/** Routes included in the sitemap (path only, no leading slash for root) */
export const SITEMAP_ROUTES = [
  { path: '', priority: 1, changeFrequency: 'weekly' as const },
  { path: 'uslugi', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: 'uslugi/strony', priority: 0.85, changeFrequency: 'weekly' as const },
  { path: 'uslugi/branding', priority: 0.85, changeFrequency: 'weekly' as const },
  { path: 'uslugi/automatyzacja', priority: 0.85, changeFrequency: 'weekly' as const },
  { path: 'uslugi/agenci-ai', priority: 0.85, changeFrequency: 'weekly' as const },
  { path: 'realizacje', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: 'blog', priority: 0.9, changeFrequency: 'weekly' as const },
] as const;
