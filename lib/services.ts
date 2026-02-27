/**
 * Services data shared by ServicesSection (home) and /uslugi page.
 */
export const SERVICES = [
  {
    number: '01',
    slug: 'strony',
    title: 'Strony internetowe',
    description:
      'Tworzymy nowoczesne, szybkie i skuteczne strony internetowe dla firm. Projektujemy rozwiązania, które pomagają klientom łatwo Cię znaleźć, budują zaufanie od pierwszego kontaktu i realnie wspierają sprzedaż oraz rozwój marki.',
    features: [
      'Responsywne strony dopasowane do wszystkich urządzeń',
      'Optymalizacja pod SEO i GEO (wyszukiwarki oraz systemy AI)',
      'Integracje z narzędziami Google (GA4, Search Console, Maps)',
      'Strony projektowane pod konwersję i wyniki biznesowe',
    ],
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    number: '02',
    slug: 'branding',
    title: 'Identyfikacja wizualna i branding',
    description:
      'Budujemy spójny i profesjonalny wizerunek marki — na stronie, w reklamach i w komunikacji. Tworzymy identyfikację wizualną, która zwiększa rozpoznawalność, wzmacnia pozycję rynkową i buduje długoterminowe zaufanie klientów.',
    features: [
      'Projekt logo i unikalnego znaku graficznego',
      'Dobór kolorystyki, typografii i systemu wizualnego',
      'Materiały graficzne i szablony komunikacyjne',
      'Kompleksowa księga identyfikacji wizualnej',
    ],
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    number: '03',
    slug: 'automatyzacja',
    title: 'Automatyzacja procesów i agenci AI',
    description:
      'Wdrażamy inteligentne systemy, które automatyzują powtarzalne procesy i usprawniają codzienną pracę zespołu. Redukujemy koszty operacyjne i pozwalamy skupić się na kluczowych obszarach rozwoju firmy.',
    features: [
      'Automatyczne przetwarzanie danych i raportowanie',
      'Powiadomienia, alerty i monitorowanie procesów',
      'Integracje z narzędziami biznesowymi i CRM',
      'Agenci AI do realizacji powtarzalnych zadań',
    ],
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    number: '04',
    slug: 'agenci-ai',
    title: 'Agenci AI',
    description:
      'Tworzymy inteligentnych asystentów, którzy przejmują rutynowe obowiązki — od obsługi zapytań po analizę dokumentów. Wdrażamy rozwiązania oparte na modelach językowych i automatyzacji dopasowanej do specyfiki firmy.',
    features: [
      'Asystenci AI do obsługi klientów i zapytań wewnętrznych',
      'Automatyczna analiza dokumentów i raportów',
      'Integracja z czatem, e-mailem i narzędziami zespołowymi',
      'Dedykowane workflow (przepływy pracy) oparte na AI',
    ],
    gradient: 'from-violet-500 to-fuchsia-500',
  },
] as const;

export const SERVICE_SLUGS = ['strony', 'branding', 'automatyzacja', 'agenci-ai'] as const;
export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

/** Order used in Header dropdown and on /uslugi. Home section uses this minus agenci-ai. */
export const USLUGI_DISPLAY_ORDER = ['automatyzacja', 'agenci-ai', 'strony', 'branding'] as const;

export function getServiceBySlug(slug: string): (typeof SERVICES)[number] | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
