/**
 * Services data shared by ServicesSection (home) and /uslugi page.
 */
export const SERVICES = [
  {
    number: '01',
    slug: 'strony',
    title: 'Projektowanie i wdrażanie stron internetowych',
    description:
      'Projektowanie stron www dla firm — nowoczesne, szybkie strony pod leada B2B. Tworzymy strony, które pomagają klientom Cię znaleźć, budują zaufanie i wspierają sprzedaż oraz rozwój marki.',
    features: [
      'Projektowanie stron www dla firm i stron pod leada B2B',
      'Tworzenie stron usługowych i korporacyjnych',
      'Projektowanie UX/UI nastawione na konwersję',
      'Optymalizacja SEO i GEO (AI Search Optimization)',
      'Integracje z systemami zewnętrznymi i narzędziami Google',
      'Wydajność, bezpieczeństwo i optymalizacja techniczna',
      'Opieka techniczna, rozwój i utrzymanie strony',
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
      'Projekt logo i systemu identyfikacji wizualnej',
      'Opracowanie kolorystyki i typografii marki',
      'Tworzenie key visuali i języka wizualnego',
      'Projekt materiałów marketingowych i sprzedażowych',
      'Szablony do social media i komunikacji online',
      'Brandbook i księga identyfikacji wizualnej',
      'Rebranding i strategiczne odświeżenie marki',
    ],
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    number: '03',
    slug: 'automatyzacja',
    title: 'Automatyzacja procesów biznesowych i agenci AI',
    description:
      'Wdrażamy inteligentne systemy, które automatyzują powtarzalne procesy i usprawniają codzienną pracę zespołu. Tworzymy także asystentów AI do obsługi zapytań, analizy dokumentów i wsparcia sprzedaży. Redukujemy koszty operacyjne i pozwalamy skupić się na kluczowych obszarach rozwoju firmy.',
    features: [
      'Automatyzacja procesów operacyjnych i administracyjnych',
      'Integracje systemów CRM, ERP i narzędzi firmowych',
      'Automatyczne raportowanie i analiza danych',
      'Systemy powiadomień i inteligentne alerty',
      'Cyfrowe obiegi dokumentów i workflow',
      'Optymalizacja procesów sprzedażowych i obsługi klienta',
      'Projektowanie dedykowanych systemów automatyzacji',
      'Asystenci AI do obsługi klienta 24/7',
      'Chatboty i voiceboty sprzedażowe',
      'Automatyczna analiza dokumentów i ekstrakcja danych',
      'Agenci AI wspierający sprzedaż i generowanie ofert',
      'AI do obsługi e-maili i zarządzania komunikacją',
      'Wewnętrzni asystenci AI dla zespołów i działów',
      'Dedykowane workflow i systemy decyzyjne oparte na AI',
    ],
    gradient: 'from-purple-500 to-pink-500',
  },
] as const;

export const SERVICE_SLUGS = ['strony', 'branding', 'automatyzacja'] as const;
export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

/** Order used in Header dropdown and /uslugi. Home section uses first 3. */
export const USLUGI_DISPLAY_ORDER = ['automatyzacja', 'strony', 'branding'] as const;

export function getServiceBySlug(slug: string): (typeof SERVICES)[number] | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
