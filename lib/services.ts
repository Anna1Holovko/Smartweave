/**
 * Services data shared by ServicesSection (home) and /uslugi page.
 */
export const SERVICES = [
  {
    number: '01',
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
] as const;
