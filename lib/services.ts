/**
 * Services data shared by ServicesSection (home) and /uslugi page.
 */
export const SERVICES = [
  {
    number: '01',
    slug: 'strony',
    title: 'Projektowanie stron www dla firm',
    cardDescription: 'Nowoczesne strony pod leady B2B i budowanie zaufania',
    cardPoints: [
      'Projektowanie stron www - strony pod leady B2B, wizerunek i konwersja',
      'SEO i GEO (AI Search) - widoczność w wyszukiwarkach i systemach AI',
      'Integracje i wsparcie - formularze, analityka, utrzymanie po wdrożeniu',
    ],
    description:
      'Nowoczesne strony pod leada B2B - pomagają klientom Cię znaleźć, budują zaufanie i wspierają sprzedaż',
    features: [
      'Strony pod leady B2B i wizerunkowe - budują zaufanie i wspierają rozwój marki',
      'UX/UI pod konwersję - intuicyjna nawigacja i atrakcyjny interfejs',
      'SEO i GEO - widoczność w wyszukiwarkach i systemach AI',
      'Integracje z Google i systemami - formularze, analityka, raportowanie',
      'Wydajność i bezpieczeństwo - szybkie, stabilne strony',
      'Wsparcie po wdrożeniu - aktualizacje i rozwój w miarę potrzeb',
    ],
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    number: '02',
    slug: 'branding',
    title: 'Identyfikacja wizualna i branding',
    cardDescription: 'Spójna identyfikacja wizualna i profesjonalny wizerunek marki',
    cardPoints: [
      'Logo i identyfikacja wizualna - unikalny znak i spójny system graficzny',
      'Kolorystyka i typografia - dopasowanie do charakteru firmy i komunikacji',
      'Materiały i szablony - ulotki, prezentacje, social media, brandbook',
    ],
    description:
      'Spójny wizerunek marki na stronie, w reklamach i w komunikacji. Wzmacniamy rozpoznawalność i zaufanie',
    features: [
      'Projekt logo i systemu identyfikacji wizualnej dla marki',
      'Kolorystyka i typografia dopasowana do firmy i komunikacji',
      'Key visuale i język wizualny w komunikacji marketingowej',
      'Materiały marketingowe i sprzedażowe - ulotki, prezentacje',
      'Szablony do social media i komunikacji online',
      'Brandbook i księga identyfikacji wizualnej',
      'Rebranding i odświeżenie wizerunku marki',
    ],
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    number: '03',
    slug: 'automatyzacja',
    title: 'Automatyzacja procesów biznesowych z wykorzystaniem AI',
    cardDescription: 'Automatyzacja procesów i agenci AI – mniej pracy ręcznej, więcej czasu na biznes',
    cardPoints: [
      'Procesy operacyjne i administracyjne - powtarzalne zadania i przepływ danych',
      'Integracje CRM, ERP - automatyczne przenoszenie i synchronizacja',
      'Raportowanie i analiza - zestawienia, KPI w czasie rzeczywistym',
    ],
    description:
      'Inteligentne systemy automatyzujące powtarzalne procesy. Redukujemy koszty i dajemy czas na rozwój firmy',
    features: [
      'Procesy operacyjne i administracyjne - powtarzalne zadania i przepływ danych',
      'Integracje CRM, ERP - przenoszenie i synchronizacja między systemami',
      'Raportowanie i analiza - zestawienia, KPI w czasie rzeczywistym',
      'Powiadomienia i alerty - leady, zlecenia, terminy',
      'Obiegi dokumentów i workflow - akceptacje, faktury, wnioski',
      'Procesy sprzedażowe i obsługa klienta - follow-upy, potwierdzenia',
      'Marketing i kampanie - maile, segmentacja, lead nurturing',
      'Dedykowane procesy - powtarzalne zadania przepisane na system',
    ],
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    number: '04',
    slug: 'agenci-ai',
    title: 'Agenci AI',
    cardDescription: 'Agenci AI rozmawiają z klientami, kwalifikują leady i przetwarzają dokumenty – natychmiastowy odzew, bez kolejki i nadgodzin',
    cardPoints: [
      'Pierwsza odpowiedź w minutę – agenci AI na stronie, w mailu lub w wybranym kanale',
      'Lead od razu w CRM – automatyczna kwalifikacja i przypisanie do handlowca',
      'Dane z dokumentów w systemie – umowy, faktury, formularze bez ręcznego przepisywania',
    ],
    description:
      'Agenci AI to systemy oparte na sztucznej inteligencji: rozumieją język naturalny i Twoją wiedzę o firmie, prowadzą rozmowę z klientem, odpowiadają na zapytania i przetwarzają dokumenty. Działają 24/7 – zespół zyskuje czas na sprzedaż i relacje.',
    features: [
      'Chatbot lub agent AI na stronie, w formularzu kontaktowym lub w integracji z mailem',
      'Automatyczna kwalifikacja leadów – scoring, tagi i routing do handlowca lub działu',
      'Odpowiedzi na często zadawane pytania – baza wiedzy z Twojej oferty i materiałów',
      'Ekstrakcja danych z dokumentów – kluczowe pola z umów, faktur i ankiet do CRM lub arkuszy',
      'Połączenie z CRM, pocztą i innymi narzędziami – jeden spójny przepływ pracy',
      'Dopasowanie do branży i tonu komunikacji – agenci AI reprezentują Twoją firmę',
    ],
    gradient: 'from-amber-500 to-orange-500',
  },
] as const;

export type ServiceItem = (typeof SERVICES)[number];

export const SERVICE_SLUGS = ['strony', 'branding', 'automatyzacja', 'agenci-ai'] as const;
export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

/** Order used in Header dropdown and /uslugi. Home section uses first 3. */
export const USLUGI_DISPLAY_ORDER = ['automatyzacja', 'agenci-ai', 'strony', 'branding'] as const;

export function getServiceBySlug(slug: string): (typeof SERVICES)[number] | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
