/**
 * Services data shared by ServicesSection (home) and /uslugi page.
 */
export const SERVICES = [
  {
    number: '01',
    slug: 'strony',
    title: 'Projektowanie i wdrażanie stron internetowych',
    description:
      'Strony www dla firm — nowoczesne, szybkie i skuteczne. Tworzymy strony, które pomagają klientom łatwo Cię znaleźć i budują zaufanie do Twojej marki od pierwszego kontaktu.',
    features: [
      'Tworzenie responsywnych stron dopasowanych do wszystkich urządzeń',
      'Strona zoptymalizowana pod SEO i GEO (wyszukiwarki oraz systemy AI)',
      'Projekt spójnej identyfikacji wizualnej marki',
      'Hosting oraz bieżące wsparcie techniczne',
      'Prowadzenie kampanii Google Ads',
      'Integracja z narzędziami Google (Search Console, GA4, Google Maps)',
      'Strona zaprojektowana pod skuteczną konwersję',
    ],
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    number: '02',
    slug: 'branding',
    title: 'Identyfikacja wizualna i branding',
    description:
      'Spójny wizerunek marki — na stronie, w reklamach i w komunikacji. Tworzymy identyfikację wizualną, która zwiększa rozpoznawalność marki i buduje zaufanie klientów.',
    features: [
      'Projekt logo i znaku graficznego',
      'Dobór kolorystyki i typografii marki',
      'Materiały graficzne i szablony do komunikacji',
      'Księga identyfikacji wizualnej',
    ],
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    number: '03',
    slug: 'automatyzacja',
    title: 'Automatyzacja procesów i agenci AI',
    description:
      'Procesy działają za Ciebie. Oszczędzasz czas i skupiasz się na tym, co ważne.',
    features: [
      'Automatyczne przetwarzanie danych i raportów',
      'Powiadomienia i alerty',
      'Integracje z narzędziami biznesowymi',
      'Agenci AI do zadań powtarzalnych',
    ],
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    number: '04',
    slug: 'agenci-ai',
    title: 'Agenci AI',
    description:
      'Inteligentni asystenci, którzy wykonują powtarzalne zadania: obsługa zapytań, analiza dokumentów, wsparcie w komunikacji z klientami. Wdrażamy rozwiązania oparte na modelach językowych i automatyzacji opartej na AI.',
    features: [
      'Asystenci AI do obsługi klienta i wewnętrznych zapytań',
      'Automatyczna analiza dokumentów i raportów',
      'Integracja z chatem, e-mailem i narzędziami zespołowymi',
      'Szyte na miarę przepływy (workflows) z użyciem AI',
    ],
    gradient: 'from-violet-500 to-fuchsia-500',
  },
] as const;

export const SERVICE_SLUGS = ['strony', 'branding', 'automatyzacja', 'agenci-ai'] as const;
export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export function getServiceBySlug(slug: string): (typeof SERVICES)[number] | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
