import { SITE_URL } from '@/lib/site';

/**
 * Blog articles for the Blog section (home), /blog listing, and /blog/[slug] article page.
 * Cover image: use one AI-generated image per article, related to the content. The same
 * image is used on the home section, blog listing, and article page (and in OG/social).
 * Place files in public/assets/blog/ as {slug}-cover.jpg (or .png).
 */
const BLOG_COVER_DIR = '/assets/blog';

export const BLOG_POSTS = [
  {
    slug: 'czy-firma-potrzebuje-automatyzacji',
    title: 'Czy Twoja firma potrzebuje automatyzacji? 7 sygnałów, że to właściwy moment',
    excerpt: 'Czy to dobry moment na wdrożenie automatyzacji w firmie? Czy gra jest warta świeczki, czy lepiej poczekać? Sprawdź 7 sygnałów.',
    image: `${BLOG_COVER_DIR}/czy-firma-potrzebuje-automatyzacji-cover.png`,
    date: '2025-01-15',
  },
  {
    slug: 'make-vs-n8n-2026',
    title: 'Make vs n8n: Które narzędzie do automatyzacji wybrać w 2026 roku?',
    excerpt: 'Wybór między platformami Make a n8n to obecnie jeden z najważniejszych dylematów, przed którymi stają zespoły wdrażające automatyzację.',
    image: `${BLOG_COVER_DIR}/make-vs-n8n-2026-cover.png`,
    date: '2025-01-10',
  },
  {
    slug: 'automatyzacja-procesow-biznesowych',
    title: 'Automatyzacja procesów biznesowych: czym jest i jak zacząć ją wdrażać w firmie?',
    excerpt: 'Automatyzacja procesów biznesowych to oddanie technologii powtarzalnych zadań. Jak zacząć i na co zwrócić uwagę – w skrócie.',
    image: `${BLOG_COVER_DIR}/automatyzacja-procesow-biznesowych-cover.png`,
    date: '2024-12-20',
  },
  {
    slug: 'design-i-automatyzacja-dla-sme',
    title: 'Design i automatyzacja dla małych firm: od czego zacząć?',
    excerpt: 'Mała firma też może korzystać z dobrego designu i automatyzacji. Podpowiadamy, od jakich kroków zacząć bez nadwyrężania budżetu.',
    image: `${BLOG_COVER_DIR}/design-i-automatyzacja-dla-sme-cover.png`,
    date: '2024-12-10',
  },
  {
    slug: 'seo-i-ai-wyszukiwarki',
    title: 'SEO a wyszukiwarki AI: jak przygotować stronę na 2026 rok',
    excerpt: 'Wyszukiwarki oparte na AI zmieniają zasady gry. Co zrobić, żeby Twoja strona była widoczna w ChatGPT, Perplexity i kolejnych narzędziach?',
    image: `${BLOG_COVER_DIR}/seo-i-ai-wyszukiwarki-cover.png`,
    date: '2024-12-01',
  },
  {
    slug: 'projektowanie-stron-www-gotowe-na-ai',
    title: 'Projektowanie i wdrażanie stron www – gotowe na AI',
    excerpt: 'Strona www w 2026 roku powinna być przygotowana na wyszukiwarki AI i asystentów. Jak projektować i wdrażać strony, które są gotowe na AI?',
    image: `${BLOG_COVER_DIR}/projektowanie-stron-www-gotowe-na-ai-cover.png`,
    date: '2025-02-10',
  },
  {
    slug: 'identyfikacja-wizualna-branding-rozpoznawalnosc-zaufanie',
    title: 'Identyfikacja wizualna i branding – rozpoznawalność i zaufanie',
    excerpt: 'Spójna identyfikacja wizualna i branding budują rozpoznawalność oraz zaufanie klientów. Dlaczego to ważne i od czego zacząć?',
    image: `${BLOG_COVER_DIR}/identyfikacja-wizualna-branding-cover.png`,
    date: '2025-02-08',
  },
  {
    slug: 'automatyzacja-procesow-agenci-ai-odzyskaj-czas',
    title: 'Automatyzacja procesów i agenci AI – odzyskaj czas',
    excerpt: 'Automatyzacja procesów i agenci AI pozwalają odzyskać godziny na to, co naprawdę ważne. Jak zacząć i na co zwrócić uwagę?',
    image: `${BLOG_COVER_DIR}/automatyzacja-agenci-ai-odzyskaj-czas-cover.png`,
    date: '2025-02-05',
  },
  {
    slug: 'design-na-ai-strona-branding-wyszukiwarki-ai',
    title: 'Design na AI: jak przygotować stronę i branding pod wyszukiwarki AI',
    excerpt: 'Wyszukiwarki AI i asystenci cytują treści i wybierają źródła. Jak przygotować stronę i branding, żeby być widocznym w erze AI?',
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
