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
      'Procesy operacyjne i administracyjne – powtarzalne zadania, przepisywanie danych, zatwierdzanie dokumentów.',
      'Integracje systemów CRM, ERP i innych narzędzi firmowych – automatyczne przenoszenie i synchronizacja danych między systemami.',
      'Raportowanie i analiza danych – generowanie zestawień, KPI, monitorowanie wyników w czasie rzeczywistym.',
      'Powiadomienia i alerty – przypomnienia, powiadomienia o leadach, zleceniach czy ważnych terminach.',
      'Cyfrowe obiegi dokumentów i workflow – automatyczne akceptacje, obiegi faktur, wniosków, zgód.',
      'Procesy sprzedażowe i obsługa klienta – automatyczne follow-upy, przypomnienia, potwierdzenia i przekierowania zadań.',
      'Marketing i kampanie online – wysyłka maili, powiadomień, segmentacja klientów, lead nurturing.',
      'Dedykowane procesy specyficzne dla Twojej firmy – wszystko, co powtarzalne i czasochłonne, można przepisać na system.',
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
