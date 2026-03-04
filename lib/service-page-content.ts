/**
 * Treści sekcji na stronach usług: problem, rozwiązanie, korzyści, proces, dlaczego SmartWeave.
 * Struktura: nagłówek (w page) → problem → rozwiązanie → co wdrażamy (features) → korzyści → proces 1–4 → dlaczego SmartWeave → CTA.
 */

export type ServicePageContent = {
  /** Optional heading for problem section (e.g. "Z jakimi problemami mierzą się nasi Partnerzy Biznesowi?") */
  problemHeading?: string;
  problem: string;
  solution: string;
  benefits: string[];
  process: { step: number; title: string; description: string }[];
  whySmartWeave: string;
};

export const SERVICE_PAGE_CONTENT: Record<string, ServicePageContent> = {
  strony: {
    problemHeading: 'Z jakimi problemami mierzą się nasi Partnerzy Biznesowi?',
    problem:
      'Strona internetowa, która nie buduje zaufania ani nie prowadzi do kontaktu, to stracony potencjał. Klienci szukają konkretów: co oferujesz, dla kogo i dlaczego warto z Tobą współpracować. Brak przejrzystej oferty i intuicyjnej ścieżki kontaktu powoduje utratę leadów i zainteresowania na rzecz konkurencji.',
    solution:
      'Projektowanie stron www w SmartWeave traktujemy jako tworzenie narzędzia wspierającego cele biznesowe i wizerunkowe, a nie tylko wizytówki online. Każdy projekt rozpoczynamy od analizy potrzeb firmy i jej klientów, aby strona skutecznie przyciągała uwagę, budowała zaufanie i wspierała działania marketingowe oraz sprzedażowe.\n\nNasze rozwiązania są dopasowane do charakteru działalności klienta – od stron informacyjnych po serwisy generujące kontakty i zapytania ofertowe. Projektujemy je z myślą o przejrzystej strukturze, intuicyjnej nawigacji, responsywności i optymalizacji pod SEO oraz wyszukiwarki AI, tak aby działały dla Twojej firmy 24/7, wspierając rozwój i profesjonalny wizerunek marki.',
    benefits: [
      'Więcej zapytań i leadów – dzięki stronie zaprojektowanej pod konwersję i pozyskiwanie kontaktów.',
      'Widoczność w Google i wyszukiwarkach AI – długoterminowy ruch organiczny bez konieczności płatnych kampanii.',
      'Profesjonalny wizerunek od pierwszego kontaktu – budowanie zaufania klientów i partnerów biznesowych.',
      'Oszczędność czasu – wszystkie informacje w jednej, spójnej bazie zamiast rozproszonych materiałów.',
    ],
    process: [
      {
        step: 1,
        title: 'Analiza potrzeb i celów',
        description: 'Określamy grupę docelową, cele strony (np. kontakt, zapytanie ofertowe) oraz sposób, w jaki strona ma wspierać Twoją strategię sprzedaży i wizerunku.',
      },
      {
        step: 2,
        title: 'Projekt i struktura',
        description: 'Tworzymy koncepcję strony: układ, ścieżki użytkownika, sekcje informacyjne i wezwania do działania. Projekt UX/UI nastawiamy na czytelność i maksymalną konwersję.',
      },
      {
        step: 3,
        title: 'Wdrożenie i optymalizacja',
        description: 'Kodujemy stronę, integrujemy formularze, analitykę oraz systemy CRM (jeśli są potrzebne), a następnie optymalizujemy pod SEO i wyszukiwarki AI. Strona jest gotowa do publikacji i działa sprawnie na wszystkich urządzeniach.',
      },
      {
        step: 4,
        title: 'Uruchomienie i rozwój',
        description: 'Wdrażamy stronę w środowisku produkcyjnym, przekazujemy pełną dokumentację i oferujemy wsparcie techniczne oraz rozwój funkcjonalności w miarę potrzeb firmy.',
      },
    ],
    whySmartWeave:
      'SmartWeave łączy projektowanie stron www dla firm z automatyzacją i widocznością w AI. Nie „stronka na szablonie” - strona zaprojektowana pod Twoją ofertę, strony pod leada B2B i długoterminową widoczność. Od analizy po wdrożenie i ewentualne połączenie z automatyzacją leadów.',
  },

  branding: {
    problem:
      'Rozproszony wizerunek - inne kolory, fonty i ton w różnych miejscach - osłabia rozpoznawalność i zaufanie. Klienci i partnerzy oceniają firmę także po tym, jak się prezentuje. Brak spójnej identyfikacji utrudnia budowanie pozycji i wybór Ciebie zamiast konkurencji.',
    solution:
      'Identyfikacja wizualna i branding to system: logo, kolorystyka, typografia i zasady użycia we wszystkich materiałach. Spójny wizerunek buduje rozpoznawalność i sygnalizuje profesjonalizm - na stronie, w social media, w mailach i w druku.',
    benefits: [
      'Szybsze rozpoznanie marki - klient wie od razu, że to Ty.',
      'Wyższa skłonność do współpracy i poleceń przy profesjonalnym, spójnym wizerunku.',
      'Lepsze pierwsze wrażenie w kontaktach B2B i przy rozmowach z większymi partnerami.',
      'Oszczędność czasu: jeden zestaw zasad zamiast improwizacji przy każdym materiale.',
    ],
    process: [
      {
        step: 1,
        title: 'Brief i kierunek wizualny',
        description: 'Określamy charakter marki, grupę docelową i oczekiwania. Na tej podstawie wybieramy kierunek: odświeżenie istniejącego logo czy budowa identyfikacji od zera.',
      },
      {
        step: 2,
        title: 'Projekt identyfikacji',
        description: 'Tworzymy lub dopracowujemy logo, kolorystykę i typografię. Opracowujemy zasady użycia i przykładowe zastosowania (strona, social, dokumenty).',
      },
      {
        step: 3,
        title: 'Brandbook i materiały',
        description: 'Przekazujemy zestaw wytycznych (brandbook) oraz - w zależności od zakresu - szablony lub kluczowe materiały, żeby cała komunikacja trzymała jeden standard.',
      },
      {
        step: 4,
        title: 'Wdrożenie i spójność',
        description: 'Pomagamy wdrożyć nowy wizerunek na stronie i w kluczowych kanałach. Zostajesz z jasnymi zasadami na kolejne lata.',
      },
    ],
    whySmartWeave:
      'SmartWeave łączy branding z projektowaniem stron i automatyzacją. Nie „ładne obrazki” - konkretny system wizualny pod rozwój firmy. Od logo i kolorów po stronę i materiały, które budują rozpoznawalność i zaufanie.',
  },

  automatyzacja: {
    problem:
      'Godziny zjadane przez powtarzalne zadania - kopiowanie danych, wysyłanie tych samych maili, ręczne raporty - to koszt, który można zamienić na czas na klientów i rozwój. Brak automatyzacji oznacza też większe ryzyko błędów i wolniejszą reakcję na leady oraz zlecenia.',
    solution:
      'Automatyzacja procesów AI i procesów biznesowych przenosi powtarzalne kroki na systemy: workflowy, integracje i powiadomienia działają zamiast ręcznej pracy. Zespół skupia się na tym, co wymaga wiedzy i relacji; rutyna idzie przez zdefiniowane scenariusze. Efekt: oszczędność czasu, mniej błędów i możliwość obsłużenia większego wolumenu bez proporcjonalnego wzrostu zatrudnienia.',
    benefits: [
      'Oszczędność czasu - powtarzalne zadania wykonuje system, nie ludzie.',
      'Mniej błędów przy przepisywaniu, synchronizacji i raportowaniu.',
      'Szybsza reakcja na leady i zlecenia (potwierdzenia, przypomnienia, przekierowania).',
      'Skalowalność: większy wolumen bez lawinowego wzrostu kosztów operacyjnych.',
    ],
    process: [
      {
        step: 1,
        title: 'Analiza procesów',
        description: 'Wspólnie mapujemy wybrane procesy: kto co robi, w jakiej kolejności i w jakich systemach. Szukamy wąskich gardeł i powtarzalnych zadań do automatyzacji.',
      },
      {
        step: 2,
        title: 'Projekt rozwiązania',
        description: 'Proponujemy scenariusze: które kroki zautomatyzować, jakie narzędzia (Make, n8n, dedykowane integracje) i jak połączyć je z Twoimi systemami.',
      },
      {
        step: 3,
        title: 'Wdrożenie i testy',
        description: 'Budujemy workflowy, integrujemy systemy i testujemy na rzeczywistych przypadkach. Dopracowujemy wyjątki i przekazujemy wiedzę zespołowi.',
      },
      {
        step: 4,
        title: 'Uruchomienie i rozwój',
        description: 'Wdrażamy na stałe, monitorujemy działanie i rozszerzamy automatyzację na kolejne procesy w miarę potrzeb.',
      },
    ],
    whySmartWeave:
      'SmartWeave działa jako partner wdrożeń: nie sprzedajemy wyłącznie licencji, tylko projektujemy i wdrażamy automatyzację pod Twoje procesy. Zaczynamy od jednego, mierzalnego kroku - tak, żeby efekt (oszczędność czasu, mniej błędów) był widoczny szybko. Dla SME to bezpieczna ścieżka do skalowania bez chaosu.',
  },

  'agenci-ai': {
    problem:
      'Rutynowe zapytania, powtarzalna analiza dokumentów i ręczna kwalifikacja leadów pochłaniają czas zespołu. Tam, gdzie można wspomóc ludzi „rozumieniem” treści i szybką odpowiedzią, wchodzą agenci AI - asystenci, którzy wykonują zdefiniowane zadania 24/7 i przekazują sprawy ludziom tam, gdzie potrzebna jest decyzja lub relacja.',
    solution:
      'Agenci AI to systemy oparte na modelach językowych i automatyzacji: odpowiadają na pytania, klasyfikują dokumenty, wspierają sprzedaż i obsługę klienta. Nie zastępują ludzi - odciążają od powtarzalnych zadań i błędów, dając czas na rozwój i budowanie relacji. Wdrażamy rozwiązania dopasowane do Twoich procesów i danych.',
    benefits: [
      'Szybsza reakcja na zapytania klientów - pierwsza odpowiedź lub kwalifikacja bez oczekiwania.',
      'Oszczędność czasu na analizie dokumentów i ekstrakcji danych.',
      'Lepsze wykorzystanie leadów dzięki automatycznej kwalifikacji i przekierowaniu.',
      'Skalowalność obsługi bez proporcjonalnego wzrostu zatrudnienia.',
    ],
    process: [
      {
        step: 1,
        title: 'Określenie zakresu i procesów',
        description: 'Wybieramy procesy, w których AI przyniesie największą wartość: obsługa zapytań, analiza dokumentów, kwalifikacja leadów. Określamy granice: co robi agent, co zostaje po stronie człowieka.',
      },
      {
        step: 2,
        title: 'Projekt agenta i integracje',
        description: 'Projektujemy scenariusze, bazy wiedzy i integracje z CRM, mailem lub innymi systemami. Dopasowujemy model i narzędzia do Twoich danych i wymogów.',
      },
      {
        step: 3,
        title: 'Budowa, testy i uczenie',
        description: 'Budujemy agenta, testujemy na rzeczywistych przypadkach i dopracowujemy odpowiedzi oraz wyjątki. Przekazujemy zespołowi zasady współpracy z systemem.',
      },
      {
        step: 4,
        title: 'Wdrożenie i rozwój',
        description: 'Uruchamiamy na produkcji, monitorujemy jakość i rozszerzamy zakres w miarę potrzeb - np. nowe typy zapytań lub kolejne procesy.',
      },
    ],
    whySmartWeave:
      'SmartWeave łączy automatyzację procesów z wdrożeniami agentów AI. Nie „magia AI” - konkretne use case’y pod Twoje procesy, z mierzalnym efektem od pierwszego wdrożenia. Od kwalifikacji leadów po analizę dokumentów: projektujemy, budujemy i wdrażamy tak, żeby AI realnie odciążało zespół.',
  },
};
