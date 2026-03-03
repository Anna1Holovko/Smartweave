import { SITE_URL } from '@/lib/site';

/**
 * Blog articles for the Blog section (home), /blog listing, and /blog/[slug] article page.
 * Cover image: use one AI-generated image per article, related to the content. The same
 * image is used on the home section, blog listing, and article page (and in OG/social).
 * Place files in public/assets/blog/ as {slug}-cover.jpg (or .png).
 */
const BLOG_COVER_DIR = '/assets/blog';

/** SEO: meta title max 60 znaków, meta description max 160 znaków. */
export const BLOG_POSTS = [
  {
    slug: 'czy-firma-potrzebuje-automatyzacji',
    title: 'Automatyzacja w firmie: 7 sygnałów, że to właściwy moment',
    excerpt: 'Czy Twoja firma jest gotowa na automatyzację? 7 sygnałów, które pokazują, że warto wdrożyć procesy i odzyskać czas. Dla SME i startupów.',
    image: `${BLOG_COVER_DIR}/czy-firma-potrzebuje-automatyzacji-cover.png`,
    date: '2025-01-15',
  },
  {
    slug: 'make-vs-n8n-2026',
    title: 'Make vs n8n 2026: które narzędzie do automatyzacji wybrać?',
    excerpt: 'Porównanie Make i n8n pod kątem kosztów, hostingu i integracji. Kiedy wybrać Make, kiedy n8n – praktyczny przewodnik dla firm.',
    image: `${BLOG_COVER_DIR}/make-vs-n8n-2026-cover.png`,
    date: '2025-01-10',
  },
  {
    slug: 'automatyzacja-procesow-biznesowych',
    title: 'Automatyzacja procesów biznesowych – wdrożenie krok po kroku',
    excerpt: 'Czym jest BPA, jakie daje korzyści i od czego zacząć. Praktyczny przewodnik po automatyzacji procesów dla małych i średnich firm.',
    image: `${BLOG_COVER_DIR}/automatyzacja-procesow-biznesowych-cover.png`,
    date: '2024-12-20',
  },
  {
    slug: 'design-i-automatyzacja-dla-sme',
    title: 'Design i automatyzacja dla małych firm – od czego zacząć',
    excerpt: 'Strona, branding i pierwsze automatyzacje bez nadwyrężania budżetu. Konkretne kroki dla SME i startupów od SmartWeave.',
    image: `${BLOG_COVER_DIR}/design-i-automatyzacja-dla-sme-cover.png`,
    date: '2024-12-10',
  },
  {
    slug: 'seo-i-ai-wyszukiwarki',
    title: 'SEO a wyszukiwarki AI: strona gotowa na 2026 rok',
    excerpt: 'Jak przygotować stronę pod ChatGPT, Perplexity i Google AI. Treść, dane strukturalne i wiarygodność – praktyczne wskazówki.',
    image: `${BLOG_COVER_DIR}/seo-i-ai-wyszukiwarki-cover.png`,
    date: '2024-12-01',
  },
  {
    slug: 'projektowanie-stron-www-gotowe-na-ai',
    title: 'Projektowanie stron www dla firm – gotowe na AI i leady',
    excerpt: 'Strona www, która generuje leady i jest widoczna w wyszukiwarkach AI. Projektowanie i wdrażanie pod B2B i konwersję.',
    image: `${BLOG_COVER_DIR}/projektowanie-stron-www-gotowe-na-ai-cover.png`,
    date: '2025-02-10',
  },
  {
    slug: 'identyfikacja-wizualna-branding-rozpoznawalnosc-zaufanie',
    title: 'Identyfikacja wizualna i branding – rozpoznawalność i zaufanie',
    excerpt: 'Spójny branding buduje zaufanie klientów i przewagę konkurencyjną. Dlaczego warto i od czego zacząć – dla ambitnych firm.',
    image: `${BLOG_COVER_DIR}/identyfikacja-wizualna-branding-cover.png`,
    date: '2025-02-08',
  },
  {
    slug: 'automatyzacja-procesow-agenci-ai-odzyskaj-czas',
    title: 'Automatyzacja procesów i agenci AI – odzyskaj czas',
    excerpt: 'Procesy i agenci AI zamiast godzin ręcznej pracy. Jak wdrożyć automatyzację i agenci AI, żeby skupić się na rozwoju firmy.',
    image: `${BLOG_COVER_DIR}/automatyzacja-agenci-ai-odzyskaj-czas-cover.png`,
    date: '2025-02-05',
  },
  {
    slug: 'design-na-ai-strona-branding-wyszukiwarki-ai',
    title: 'Design na AI: strona i branding pod wyszukiwarki AI',
    excerpt: 'Jak przygotować stronę i branding, żeby być cytowanym w ChatGPT i Perplexity. Widoczność w erze wyszukiwarek AI – praktycznie.',
    image: `${BLOG_COVER_DIR}/design-na-ai-wyszukiwarki-cover.png`,
    date: '2025-02-01',
  },
] as const;

export type BlogPost = (typeof BLOG_POSTS)[number];

/** Canonical cover URL for a post (same image on home, /blog, article page, and OG). */
export function getBlogCoverUrl(post: BlogPost): string {
  return `${SITE_URL}${post.image}`;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
