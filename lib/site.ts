/**
 * Single source of truth for site URL and config used by sitemap, robots, metadata.
 * Google Search oriented: title/description lengths tuned for search snippets.
 */
export const SITE_URL = 'https://smartweave.pl';
export const SITE_NAME = 'SmartWeave';

/** Absolute URL for logo (required for Organization/rich results in Google) */
export const SITE_LOGO_URL = `${SITE_URL}/assets/smartweave-logo.png`;

/**
 * Meta title for default page. Google typically shows ~50-60 chars; keep under 60 for full display.
 */
export const META_TITLE =
  'SmartWeave | Automatyzacja procesów biznesowych, agenci AI, strony www';

/**
 * Meta description. Google shows ~155-158 chars; keep in 150-158 for full snippet.
 * Lead with target queries: automatyzacja procesów, agenci AI (GSC / organic).
 */
export const META_DESCRIPTION =
  'Automatyzacja procesów biznesowych i agenci AI dla firm: workflowy, integracje, CRM. Strony www, branding, e-booki o AI. SmartWeave — cała Polska.';

/** Open Graph / Twitter title (can be same or variant) */
export const OG_TITLE =
  'SmartWeave | Automatyzacja procesów, agenci AI, branding i systemy dla firm';

/** Open Graph / Twitter description */
export const OG_DESCRIPTION =
  'Automatyzacja procesów biznesowych, agenci AI, strony www i e-booki. Mniej rutyny, szybsze leady, spójna marka — wdrożenia dla firm.';

/** Kolejność usług wszędzie: marketing, SEO, meta, OG, stopka, bio. */
export const SERVICES_ORDER_LABEL =
  'Automatyzacja procesów • Agenci AI • Strony www • Branding • Chatboty • Aplikacje webowe';

/** Calendly booking URL. Override with NEXT_PUBLIC_CALENDLY_URL in env. */
export const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL ?? 'https://calendly.com/hello-smartweave/30min';

/** CTA pod ofertą (/uslugi/…, /agenci-ai) — bez nazwy pojedynczej usługi w treści. */
export const USLUGI_QUICK_CTA_TITLE = 'Rozwiążmy Twoje codzienne problemy';
export const USLUGI_QUICK_CTA_DESCRIPTION =
  'Opowiedz w kilku zdaniach, nad czym pracujesz lub co chcesz usprawnić. W około 30 minut wskażemy realny pierwszy krok i dopasujemy wdrożenie do Twojej sytuacji.';

/** Routes included in the sitemap (path only, no leading slash for root) */
export const SITEMAP_ROUTES = [
  { path: '', priority: 1, changeFrequency: 'weekly' as const },
  { path: 'uslugi', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: 'uslugi/strony', priority: 0.85, changeFrequency: 'weekly' as const },
  { path: 'uslugi/branding', priority: 0.85, changeFrequency: 'weekly' as const },
  { path: 'uslugi/automatyzacja', priority: 0.85, changeFrequency: 'weekly' as const },
  { path: 'uslugi/agenci-ai', priority: 0.85, changeFrequency: 'weekly' as const },
  { path: 'uslugi/chatboty', priority: 0.85, changeFrequency: 'weekly' as const },
  { path: 'uslugi/aplikacje-webowe', priority: 0.85, changeFrequency: 'weekly' as const },
  { path: 'automatyzacja-ai-dla-firm', priority: 0.88, changeFrequency: 'weekly' as const },
  { path: 'automatyzacja-ai/wroclaw', priority: 0.82, changeFrequency: 'monthly' as const },
  { path: 'automatyzacja-ai/warszawa', priority: 0.82, changeFrequency: 'monthly' as const },
  { path: 'automatyzacja-ai/krakow', priority: 0.82, changeFrequency: 'monthly' as const },
  { path: 'ai-w-marketingu-i-sprzedazy', priority: 0.86, changeFrequency: 'weekly' as const },
  { path: 'realizacje', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: 'realizacje/chatboty', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: 'realizacje/aplikacje-webowe', priority: 0.85, changeFrequency: 'monthly' as const },
  {
    path: 'realizacje/chatboty-i-aplikacje-webowe',
    priority: 0.75,
    changeFrequency: 'monthly' as const,
  },
  { path: 'e-booki', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: 'blog', priority: 0.9, changeFrequency: 'weekly' as const },
] as const;
