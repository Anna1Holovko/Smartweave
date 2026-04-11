/**
 * Metadata for legacy code-based blog posts (used by migrate-blog-to-notion script).
 * Dates and SEO fields match the former lib/blog.ts where applicable.
 */
export type BlogStaticMeta = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  metaDescription: string;
};

export const BLOG_STATIC_META: BlogStaticMeta[] = [
  {
    slug: 'agenci-ai-w-firmie-od-eksperymentu-do-procesow',
    title: 'Agenci AI w firmie – od eksperymentu do sprawdzonych procesów',
    date: '2026-04-11',
    metaDescription:
      'Od pilota do procesu: agenci AI w firmie. Jak wybrać zadanie, zadbać o dane i połączyć AI z automatyzacją – bez zbędnego ryzyka',
  },
  {
    slug: 'marketing-internetowy-seo-era-wyszukiwarek-ai',
    title: 'Marketing internetowy i SEO w erze wyszukiwarek AI – jak zmienia się widoczność w internecie',
    date: '2026-03-03',
    metaDescription:
      'Sztuczna inteligencja zmienia wyszukiwanie. Sprawdź jak dostosować SEO i marketing do wyszukiwarek AI',
  },
  {
    slug: 'firma-zwolnila-4000-pracownikow-przez-ai',
    title: 'Firma zwolniła 4000 pracowników przez AI – nowa rzeczywistość rynku pracy',
    date: '2026-03-02',
    metaDescription:
      'Automatyzacja i AI zmieniają rynek pracy. Firma zwalnia 4000 pracowników po wdrożeniu AI',
  },
  {
    slug: 'projektowanie-stron-www-gotowe-na-ai',
    title: 'Projektowanie stron www dla firm - gotowe na AI i leady',
    date: '2026-02-10',
    metaDescription:
      'Strona www, która generuje leady i jest widoczna w wyszukiwarkach AI. Projektowanie pod B2B i konwersję',
  },
  {
    slug: 'identyfikacja-wizualna-branding-rozpoznawalnosc-zaufanie',
    title: 'Identyfikacja wizualna i branding - rozpoznawalność i zaufanie',
    date: '2026-02-08',
    metaDescription:
      'Spójny branding buduje zaufanie i przewagę. Dlaczego warto i od czego zacząć - dla ambitnych firm',
  },
  {
    slug: 'automatyzacja-procesow-agenci-ai-odzyskaj-czas',
    title: 'Automatyzacja procesów i agenci AI - odzyskaj czas',
    date: '2026-02-05',
    metaDescription:
      'Procesy i agenci AI zamiast godzin ręcznej pracy. Jak wdrożyć automatyzację i odzyskać czas na rozwój',
  },
  {
    slug: 'design-na-ai-strona-branding-wyszukiwarki-ai',
    title: 'Design na AI: strona i branding pod wyszukiwarki AI',
    date: '2026-02-01',
    metaDescription:
      'Jak przygotować stronę i branding pod ChatGPT i Perplexity. Widoczność w erze wyszukiwarek AI',
  },
  {
    slug: 'czy-firma-potrzebuje-automatyzacji',
    title: 'Automatyzacja w firmie: 7 sygnałów, że to właściwy moment',
    date: '2026-01-15',
    metaDescription:
      'Czy Twoja firma jest gotowa na automatyzację? 7 sygnałów, że warto wdrożyć procesy i odzyskać czas',
  },
  {
    slug: 'make-vs-n8n-2026',
    title: 'Make vs n8n 2026: które narzędzie do automatyzacji wybrać?',
    date: '2026-01-10',
    metaDescription:
      'Porównanie Make i n8n: koszty, hosting i integracje. Kiedy Make, kiedy n8n - przewodnik dla firm',
  },
  {
    slug: 'jak-mapowac-procesy-biznesowe',
    title: 'Jak mapować procesy biznesowe przed automatyzacją i AI',
    date: '2026-01-08',
    metaDescription:
      'Mapowanie procesów biznesowych przed wdrożeniem automatyzacji i AI: kroki, dobre praktyki i unikanie błędów',
  },
  {
    slug: 'automatyzacja-procesow-biznesowych',
    title: 'Automatyzacja procesów biznesowych - wdrożenie krok po kroku',
    date: '2025-12-20',
    metaDescription:
      'Czym jest BPA, jakie daje korzyści i od czego zacząć. Przewodnik po automatyzacji dla firm',
  },
  {
    slug: 'design-i-automatyzacja-dla-sme',
    title: 'Design i automatyzacja dla małych firm - od czego zacząć',
    date: '2025-12-17',
    metaDescription:
      'Strona, branding i pierwsze automatyzacje bez nadwyrężania budżetu. Kroki dla SME od SmartWeave',
  },
  {
    slug: 'seo-i-ai-wyszukiwarki',
    title: 'SEO a wyszukiwarki AI: strona gotowa na 2026 rok',
    date: '2025-12-16',
    metaDescription:
      'Jak przygotować stronę pod ChatGPT, Perplexity i Google AI. Treść i dane strukturalne - wskazówki',
  },
];
