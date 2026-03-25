import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from '@/lib/site';

export type SeoLandingId =
  | 'automatyzacja-ai-dla-firm'
  | 'automatyzacja-procesow-biznesowych'
  | 'ai-w-marketingu-i-sprzedazy'
  | 'automatyzacja-ai-wroclaw'
  | 'automatyzacja-procesow-warszawa'
  | 'ai-dla-firm-krakow';

export type SeoLandingBlock = { heading: string; paragraphs: string[] };

export type SeoLandingDefinition = {
  id: SeoLandingId;
  path: string;
  metadata: Metadata;
  h1: string;
  lead: string;
  blocks: SeoLandingBlock[];
};

const base = (title: string, description: string, path: string): Metadata => ({
  title,
  description,
  alternates: { canonical: `${SITE_URL}${path}` },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}${path}`,
    siteName: SITE_NAME,
    locale: 'pl_PL',
    type: 'website',
  },
});

export const SEO_LANDINGS: Record<SeoLandingId, SeoLandingDefinition> = {
  'automatyzacja-ai-dla-firm': {
    id: 'automatyzacja-ai-dla-firm',
    path: '/automatyzacja-ai-dla-firm',
    metadata: base(
      'Automatyzacja procesów dla firm - wdrożenia SmartWeave',
      'Automatyzacja procesów dla firm: workflowy, integracje i agenci AI. Oszczędność czasu, mniej błędów, skalowanie bez etatów. SmartWeave łączy branding z systemami.',
      '/automatyzacja-ai-dla-firm',
    ),
    h1: 'Automatyzacja procesów dla firm',
    lead:
      'Workflowy, integracje i agenci AI. Branding i strona www jako wsparcie spójności i konwersji.',
    blocks: [
      {
        heading: 'Co rozumiemy przez automatyzację AI?',
        paragraphs: [
          'Automatyzacja przenosi powtarzalne kroki do workflowów i integracji. AI dokładamy tam, gdzie trzeba rozumieć tekst lub dokumenty.',
          'Zaczynamy od jednego procesu (pilot) i rozwijamy kolejne scenariusze.',
        ],
      },
      {
        heading: 'Dlaczego warto robić to z partnerem, który zna też branding?',
        paragraphs: [
          'Bo komunikacja (strona, maile, chatbot) ma brzmieć jak Twoja marka. Spójne zasady skracają czas pracy i zwiększają zaufanie.',
        ],
      },
    ],
  },
  'automatyzacja-procesow-biznesowych': {
    id: 'automatyzacja-procesow-biznesowych',
    path: '/automatyzacja-procesow-biznesowych',
    metadata: base(
      'Automatyzacja procesów biznesowych - integracje i workflowy',
      'Automatyzacja procesów biznesowych: synchronizacja systemów, raporty, powiadomienia. Mniej ręcznej pracy, mniej błędów. SmartWeave - od analizy do wdrożenia.',
      '/automatyzacja-procesow-biznesowych',
    ),
    h1: 'Automatyzacja procesów biznesowych',
    lead:
      'Powtarzalne kroki kosztują czas i generują błędy. Zamieniamy je w workflowy i integracje, które działają w tle.',
    blocks: [
      {
        heading: 'Typowe obszary automatyzacji',
        paragraphs: [
          'Leady i CRM, obiegi, faktury, powiadomienia, raporty i synchronizacja danych.',
          'AI dokładamy tam, gdzie potrzebny jest tekst/dokumenty (np. kwalifikacja, ekstrakcja pól).',
        ],
      },
      {
        heading: 'Jak zacząć',
        paragraphs: [
          'Wybieramy jeden proces do pilota. Potem rozwijamy kolejne scenariusze.',
        ],
      },
    ],
  },
  'ai-w-marketingu-i-sprzedazy': {
    id: 'ai-w-marketingu-i-sprzedazy',
    path: '/ai-w-marketingu-i-sprzedazy',
    metadata: base(
      'AI w marketingu i sprzedaży - agenci, chatboty, leady',
      'AI w marketingu i sprzedaży: szybsza pierwsza odpowiedź, kwalifikacja leadów, chatboty i agenci AI zintegrowani z CRM. SmartWeave.',
      '/ai-w-marketingu-i-sprzedazy',
    ),
    h1: 'AI w marketingu i sprzedaży',
    lead:
      'Szybszy odzew, leady w CRM i mniej ręcznej pracy. Agenci AI i chatboty działają 24/7.',
    blocks: [
      {
        heading: 'Co można wdrożyć praktycznie',
        paragraphs: [
          'Pierwsza odpowiedź, FAQ, kwalifikacja i przekazanie leada do CRM.',
          'Branding trzyma spójny ton i komunikację.',
        ],
      },
      {
        heading: 'Powiązane usługi',
        paragraphs: [
          'Zobacz też: agenci AI, chatboty i automatyzacja procesów.',
        ],
      },
    ],
  },
  'automatyzacja-ai-wroclaw': {
    id: 'automatyzacja-ai-wroclaw',
    path: '/automatyzacja-ai-wroclaw',
    metadata: base(
      'Automatyzacja procesów Wrocław - wdrożenia dla firm | SmartWeave',
      'Automatyzacja procesów we Wrocławiu i online: procesy, integracje, agenci AI. Oszczędność czasu dla firm z Dolnego Śląska. Konsultacja zdalnie lub lokalnie.',
      '/automatyzacja-ai-wroclaw',
    ),
    h1: 'Automatyzacja procesów Wrocław',
    lead:
      'Wrocław i cała Polska (zdalnie). Zaczynamy od krótkiej analizy i pilota.',
    blocks: [
      {
        heading: 'Dlaczego lokalne słowo kluczowe ma sens przy B2B',
        paragraphs: [
          'Część firm szuka wykonawcy „w zasięgu”. My wdrażamy głównie zdalnie - liczy się proces i systemy.',
        ],
      },
    ],
  },
  'automatyzacja-procesow-warszawa': {
    id: 'automatyzacja-procesow-warszawa',
    path: '/automatyzacja-procesow-warszawa',
    metadata: base(
      'Automatyzacja procesów Warszawa - firmy i zespoły | SmartWeave',
      'Automatyzacja procesów biznesowych w Warszawie i zdalnie. Workflowy, integracje CRM, raporty. SmartWeave - branding + automatyzacja.',
      '/automatyzacja-procesow-warszawa',
    ),
    h1: 'Automatyzacja procesów Warszawa',
    lead:
      'Warszawa i okolice: automatyzujemy powtarzalne procesy. Start od pilota, potem skalowanie.',
    blocks: [
      {
        heading: 'Co oferujemy firmom ze stolicy i okolic',
        paragraphs: [
          'Workflowy, integracje, powiadomienia i raporty - z naciskiem na mierzalny efekt.',
        ],
      },
    ],
  },
  'ai-dla-firm-krakow': {
    id: 'ai-dla-firm-krakow',
    path: '/ai-dla-firm-krakow',
    metadata: base(
      'AI dla firm Kraków - agenci, automatyzacja, strony | SmartWeave',
      'AI dla firm w Krakowie i online: agenci AI, chatboty, automatyzacja procesów, strony www. SmartWeave łączy design z wdrożeniami AI.',
      '/ai-dla-firm-krakow',
    ),
    h1: 'AI dla firm Kraków',
    lead:
      'Kraków i cała Polska: agenci AI, automatyzacja i integracje. Branding i strona www jako wsparcie.',
    blocks: [
      {
        heading: 'Jak zacząć współpracę',
        paragraphs: [
          'Napisz lub umów krótką rozmowę. Wskażemy pierwszy proces do pilota.',
        ],
      },
    ],
  },
};

export const SEO_LANDING_IDS = Object.keys(SEO_LANDINGS) as SeoLandingId[];

export function getSeoLanding(id: SeoLandingId): SeoLandingDefinition {
  return SEO_LANDINGS[id];
}
