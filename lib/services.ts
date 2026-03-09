/**
 * Services data shared by ServicesSection (home) and /uslugi page.
 */
export const SERVICES = [
  {
    number: '01',
    slug: 'strony',
    title: 'Projektowanie stron www dla firm',
    cardDescription: 'Nowoczesne strony pod leady B2B i budowanie zaufania.',
    cardPoints: [
      'Projektowanie stron www - strony pod leady B2B, wizerunek i konwersja.',
      'SEO i GEO (AI Search) - widoczność w wyszukiwarkach i systemach AI.',
      'Integracje i wsparcie - formularze, analityka, utrzymanie po wdrożeniu.',
    ],
    description:
      'Projektowanie stron www dla firm - nowoczesne, szybkie strony pod leada B2B. Tworzymy strony, które pomagają klientom Cię znaleźć, budują zaufanie i wspierają sprzedaż oraz rozwój marki.',
    features: [
      'Projektowanie stron www - od stron generujących kontakty i leady B2B, po strony informacyjne i wizerunkowe, które budują zaufanie, prezentują ofertę i wspierają rozwój marki.',
      'Projektowanie UX/UI nastawione na konwersję - intuicyjna nawigacja, czytelna struktura i atrakcyjny interfejs zwiększają zaangażowanie użytkowników.',
      'Optymalizacja SEO i GEO (AI Search Optimization) - poprawa widoczności w wyszukiwarkach internetowych oraz systemach AI, aby klienci łatwo odnajdywali Twoją firmę.',
      'Integracje z systemami zewnętrznymi i narzędziami Google - automatyzacja procesów, formularze kontaktowe, analityka i raportowanie danych.',
      'Wydajność, bezpieczeństwo i optymalizacja techniczna - szybkie, stabilne i bezpieczne strony, które działają niezawodnie.',
      'Opieka techniczna, rozwój i utrzymanie strony - wsparcie po wdrożeniu, aktualizacje i rozwój funkcjonalności zgodnie z potrzebami firmy.',
    ],
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    number: '02',
    slug: 'branding',
    title: 'Identyfikacja wizualna i branding',
    cardDescription: 'Spójna identyfikacja wizualna i profesjonalny wizerunek marki.',
    cardPoints: [
      'Logo i identyfikacja wizualna - unikalny znak i spójny system graficzny.',
      'Kolorystyka i typografia - dopasowanie do charakteru firmy i komunikacji.',
      'Materiały i szablony - ulotki, prezentacje, social media, brandbook.',
    ],
    description:
      'Budujemy spójny i profesjonalny wizerunek marki - na stronie, w reklamach i w komunikacji. Tworzymy identyfikację wizualną, która zwiększa rozpoznawalność, wzmacnia pozycję rynkową i buduje zaufanie klientów.',
    features: [
      'Projekt logo i systemu identyfikacji wizualnej - stworzenie unikalnego znaku i spójnego systemu graficznego dla marki.',
      'Opracowanie kolorystyki i typografii marki - dopasowanie palety barw i kroju pisma do charakteru firmy i jej komunikacji.',
      'Tworzenie key visuali i języka wizualnego - elementy graficzne, ilustracje i styl wizualny wykorzystywane w komunikacji marketingowej.',
      'Projekt materiałów marketingowych i sprzedażowych - ulotki, prezentacje, broszury i inne materiały wspierające sprzedaż.',
      'Szablony do social media i komunikacji online - spójne wizualnie posty, grafiki i elementy komunikacji cyfrowej.',
      'Brandbook i księga identyfikacji wizualnej - dokumentacja zasad stosowania logo, kolorów, typografii i elementów wizualnych.',
      'Rebranding i strategiczne odświeżenie marki - modernizacja wizerunku, dostosowanie go do nowych celów biznesowych lub zmieniającego się rynku.',
    ],
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    number: '03',
    slug: 'automatyzacja',
    title: 'Automatyzacja procesów biznesowych z wykorzystaniem AI',
    cardDescription: 'Automatyzacja procesów i agenci AI – mniej pracy ręcznej, więcej czasu na biznes.',
    cardPoints: [
      'Procesy operacyjne i administracyjne - powtarzalne zadania, przepisywanie danych, zatwierdzanie dokumentów.',
      'Integracje systemów CRM, ERP i innych - automatyczne przenoszenie i synchronizacja danych.',
      'Raportowanie i analiza danych - zestawienia, KPI, monitorowanie wyników w czasie rzeczywistym.',
    ],
    description:
      'Automatyzacja procesów AI - wdrażamy inteligentne systemy, które automatyzują powtarzalne procesy i usprawniają pracę zespołu. Redukujemy koszty i pozwalamy skupić się na rozwoju firmy.',
    features: [
      'Procesy operacyjne i administracyjne - powtarzalne zadania, przepisywanie danych, zatwierdzanie dokumentów.',
      'Integracje systemów CRM, ERP i innych narzędzi firmowych - automatyczne przenoszenie i synchronizacja danych między systemami.',
      'Raportowanie i analiza danych - generowanie zestawień, KPI, monitorowanie wyników w czasie rzeczywistym.',
      'Powiadomienia i alerty - przypomnienia, powiadomienia o leadach, zleceniach czy ważnych terminach.',
      'Cyfrowe obiegi dokumentów i workflow - automatyczne akceptacje, obiegi faktur, wniosków, zgód.',
      'Procesy sprzedażowe i obsługa klienta - automatyczne follow-upy, przypomnienia, potwierdzenia i przekierowania zadań.',
      'Marketing i kampanie online - wysyłka maili, powiadomień, segmentacja klientów, lead nurturing.',
      'Dedykowane procesy specyficzne dla Twojej firmy - wszystko, co powtarzalne i czasochłonne, można przepisać na system.',
    ],
    gradient: 'from-purple-500 to-pink-500',
  },
] as const;

export type ServiceItem = (typeof SERVICES)[number];

export const SERVICE_SLUGS = ['strony', 'branding', 'automatyzacja'] as const;
export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

/** Order used in Header dropdown and /uslugi. Home section uses first 3. */
export const USLUGI_DISPLAY_ORDER = ['automatyzacja', 'strony', 'branding'] as const;

export function getServiceBySlug(slug: string): (typeof SERVICES)[number] | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
