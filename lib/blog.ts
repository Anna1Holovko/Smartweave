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
] as const;

export type BlogPost = (typeof BLOG_POSTS)[number];

/** Canonical cover URL for a post (same image on home, /blog, article page, and OG). */
export function getBlogCoverUrl(post: BlogPost): string {
  return `${SITE_URL}${post.image}`;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
