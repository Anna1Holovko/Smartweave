/**
 * Treści sekcji na stronach usług: problem, rozwiązanie, korzyści, proces, dlaczego SmartWeave.
 * Struktura: nagłówek (w page) → problem → rozwiązanie → co wdrażamy (features) → korzyści → proces 1-4 → dlaczego SmartWeave → CTA.
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
      'Projektowanie stron www w SmartWeave traktujemy jako tworzenie narzędzia wspierającego cele biznesowe i wizerunkowe, a nie tylko wizytówki online. Każdy projekt rozpoczynamy od analizy potrzeb firmy i jej klientów, aby strona skutecznie przyciągała uwagę, budowała zaufanie i wspierała działania marketingowe oraz sprzedażowe.\n\nNasze rozwiązania są dopasowane do charakteru działalności klienta - od stron informacyjnych po serwisy generujące kontakty i zapytania ofertowe. Projektujemy je z myślą o przejrzystej strukturze, intuicyjnej nawigacji, responsywności i optymalizacji pod SEO oraz wyszukiwarki AI, tak aby działały dla Twojej firmy 24/7, wspierając rozwój i profesjonalny wizerunek marki.',
    benefits: [
      'Więcej zapytań i leadów - dzięki stronie zaprojektowanej pod konwersję i pozyskiwanie kontaktów.',
      'Widoczność w Google i wyszukiwarkach AI - długoterminowy ruch organiczny bez konieczności płatnych kampanii.',
      'Profesjonalny wizerunek od pierwszego kontaktu - budowanie zaufania klientów i partnerów biznesowych.',
      'Oszczędność czasu - wszystkie informacje w jednej, spójnej bazie zamiast rozproszonych materiałów.',
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
      'SmartWeave łączy projektowanie profesjonalnych stron www z automatyzacją procesów i widocznością w wyszukiwarkach AI. Nie oferujemy „stron na szablonie" - każda strona jest projektowana pod Twoją ofertę, grupę docelową i cele biznesowe.\n\nOferujemy pełny proces: od analizy, przez projekt, wdrożenie, aż po integrację z systemami automatyzacji leadów. Efekt to strona, która generuje kontakty, buduje wizerunek i wspiera rozwój firmy w długim terminie.',
  },

  branding: {
    problemHeading: 'Z jakimi problemami mierzą się nasi Partnerzy Biznesowi?',
    problem:
      'Rozproszony wizerunek - różne kolory, fonty i ton komunikacji w materiałach firmy - osłabia rozpoznawalność i zaufanie. Klienci i partnerzy oceniają firmę również po tym, jak się prezentuje. Brak spójnej identyfikacji utrudnia budowanie pozycji rynkowej i może skutkować wyborem konkurencji zamiast Twojej firmy.',
    solution:
      'Identyfikacja wizualna i branding to system obejmujący logo, kolorystykę, typografię oraz zasady spójnego stosowania w wszystkich materiałach firmy. Spójny wizerunek wzmacnia rozpoznawalność i sygnalizuje profesjonalizm - zarówno na stronie internetowej, w social media, w mailach, jak i w materiałach drukowanych.',
    benefits: [
      'Szybsze rozpoznanie marki - klient od razu identyfikuje Twoją firmę.',
      'Większa skłonność do współpracy i poleceń - spójny, profesjonalny wizerunek wzmacnia zaufanie.',
      'Lepsze pierwsze wrażenie w kontaktach B2B - oraz w rozmowach z większymi partnerami.',
      'Oszczędność czasu - jeden zestaw zasad zamiast improwizacji przy każdym materiale.',
    ],
    process: [
      {
        step: 1,
        title: 'Brief i kierunek wizualny',
        description: 'Określamy charakter marki, grupę docelową i oczekiwania. Wybieramy kierunek: odświeżenie istniejącego logo czy budowa identyfikacji od zera.',
      },
      {
        step: 2,
        title: 'Projekt identyfikacji',
        description: 'Tworzymy lub dopracowujemy logo, kolorystykę i typografię. Opracowujemy zasady użycia i przykładowe zastosowania w różnych kanałach - stronie, social media i dokumentach.',
      },
      {
        step: 3,
        title: 'Brandbook i materiały',
        description: 'Przekazujemy zestaw wytycznych (brandbook) oraz - w zależności od zakresu - szablony lub kluczowe materiały, aby cała komunikacja trzymała spójny standard.',
      },
      {
        step: 4,
        title: 'Wdrożenie i spójność',
        description: 'Pomagamy wdrożyć nowy wizerunek na stronie i w kluczowych kanałach. Zostajesz z jasnymi zasadami, które zapewnią spójność marki na kolejne lata.',
      },
    ],
    whySmartWeave:
      'SmartWeave łączy branding z projektowaniem stron i automatyzacją procesów. Nie oferujemy „ładnych obrazków” - tworzymy konkretny system wizualny dopasowany do rozwoju firmy. Od logo i kolorów, przez stronę internetową, po materiały marketingowe - wszystko działa spójnie, budując rozpoznawalność i zaufanie klientów.',
  },

  automatyzacja: {
    problemHeading: 'Z jakimi problemami mierzą się nasi Partnerzy Biznesowi?',
    problem:
      'Powtarzalne zadania pochłaniają cenne godziny pracy. Ręczne kopiowanie danych, wysyłanie tych samych wiadomości e-mail czy przygotowywanie raportów to ukryty koszt, który można zamienić na czas przeznaczony na obsługę klientów i rozwój firmy. Brak automatyzacji to nie tylko strata czasu, ale także większe ryzyko błędów oraz wolniejsza reakcja na nowe leady i zlecenia.',
    solution:
      'Automatyzujemy procesy biznesowe oraz wdrażamy rozwiązania AI, które przejmują powtarzalne i czasochłonne zadania. Workflowy, integracje i inteligentne powiadomienia zastępują ręczną pracę, zapewniając płynny i przewidywalny przebieg działań.\n\nDzięki temu zespół może skupić się na tym, co naprawdę wymaga wiedzy, doświadczenia i budowania relacji, podczas gdy rutynowe czynności realizowane są według jasno zdefiniowanych scenariuszy.\n\nEfekt? Oszczędność czasu, mniej błędów oraz możliwość obsługi większego wolumenu zleceń bez konieczności proporcjonalnego zwiększania zatrudnienia.',
    benefits: [
      'Oszczędność czasu - powtarzalne zadania wykonuje system, a nie pracownicy.',
      'Mniej błędów - automatyzacja eliminuje pomyłki przy przepisywaniu, synchronizacji i raportowaniu.',
      'Szybsza reakcja - leady i zlecenia obsługiwane są natychmiast dzięki automatycznym potwierdzeniom, przypomnieniom i przekierowaniom.',
      'Skalowalność - możesz obsłużyć większy wolumen pracy bez proporcjonalnego wzrostu kosztów operacyjnych.',
    ],
    process: [
      {
        step: 1,
        title: 'Analiza procesów',
        description: 'Przeprowadzamy szczegółową analizę wybranych procesów biznesowych: identyfikujemy kolejność działań, używane systemy oraz powtarzalne i czasochłonne zadania, które można zautomatyzować.',
      },
      {
        step: 2,
        title: 'Projekt rozwiązania',
        description: 'Na podstawie analizy opracowujemy scenariusze automatyzacji, dobieramy odpowiednie narzędzia (Make, n8n, dedykowane integracje) i definiujemy sposób ich integracji z istniejącymi systemami firmy.',
      },
      {
        step: 3,
        title: 'Wdrożenie i testy',
        description: 'Tworzymy workflowy, integrujemy systemy i testujemy rozwiązania na rzeczywistych danych. Dostosowujemy obsługę wyjątków i przekazujemy pełną dokumentację oraz wiedzę zespołowi, aby zapewnić płynne użytkowanie systemu.',
      },
      {
        step: 4,
        title: 'Uruchomienie i rozwój',
        description: 'Wdrażamy rozwiązanie w środowisku produkcyjnym, monitorujemy jego efektywność i stopniowo rozszerzamy automatyzację na kolejne procesy w firmie w miarę potrzeb.',
      },
    ],
    whySmartWeave:
      'SmartWeave to partner w pełnym procesie automatyzacji - nie sprzedajemy jedynie produktu, lecz projektujemy i wdrażamy rozwiązania dopasowane do specyfiki Twojej firmy. Rozpoczynamy od jednego, mierzalnego kroku, aby efekty - oszczędność czasu i redukcja błędów - były widoczne już na wczesnym etapie. Dla małych i średnich przedsiębiorstw to bezpieczna i kontrolowana ścieżka do skalowania procesów bez ryzyka chaosu.',
  },

  'agenci-ai': {
    problemHeading: 'Z jakimi problemami mierzą się nasi Partnerzy Biznesowi?',
    problem:
      'Agenci AI to programy oparte na sztucznej inteligencji, które rozumieją język naturalny i wykonują zadania w Twoim imieniu: rozmawiają z klientem, odpowiadają na zapytania, kwalifikują leady i przetwarzają dokumenty. Bez agentów AI zespół sam radzi sobie z każdym mailem i formularzem – pierwszy odzew się opóźnia, leady czekają, a dane z umów i faktur trzeba ręcznie wpisywać do CRM. Agenci AI biorą na siebie właśnie to: natychmiastowy kontakt, wstępną kwalifikację i przygotowanie informacji. Ludzie zajmują się tylko tym, co wymaga decyzji lub prawdziwej rozmowy.',
    solution:
      'W SmartWeave budujemy agenty AI pod Twoją firmę. Agent AI rozumie pytania w języku naturalnym i Twoją bazę wiedzy – ofertę, FAQ, procedury – oraz działa tam, gdzie go wdrożysz: na stronie (chatbot), w e-mailu lub w innym kanale. Łączymy go z CRM, formularzami i narzędziami, których już używasz. Agenci AI nie zastępują zespołu: odciążają go z powtarzalnej pracy, skracają czas reakcji i ograniczają błędy. Handlowcy i obsługa mogą skupić się na sprzedaży i relacjach. Każdy agent ma jeden, jasny zakres – np. pierwsza odpowiedź, kwalifikacja leadów albo analiza dokumentów – i mierzalny efekt w codziennej pracy.',
    benefits: [
      'Szybsza pierwsza odpowiedź – agent AI reaguje w minutę; klient i lead nie czekają w kolejce.',
      'Więcej czasu dla zespołu – agenci AI obsługują powtarzalne zapytania i wpisywanie danych; ludzie zajmują się wiedzą i relacjami.',
      'Lepszy przepływ leadów – agenci AI kwalifikują i przypisują kontakty do handlowców; pracujesz na gotowych leadach.',
      'Większa przepustowość – agenci AI działają 24/7; obsługa zapytań i dokumentów rośnie bez nowych etatów.',
    ],
    process: [
      {
        step: 1,
        title: 'Cel i zakres agenta AI',
        description: 'Ustalamy, co ma robić agent AI: pierwsza odpowiedź na stronie, kwalifikacja leadów, FAQ w mailu czy wyciąganie danych z dokumentów. Określamy granice: gdzie kończy się agent, gdzie wchodzi człowiek i jakie dane trafiają do CRM, arkuszy lub zadań.',
      },
      {
        step: 2,
        title: 'Projekt agenta AI i integracje',
        description: 'Projektujemy scenariusze rozmowy lub przetwarzania dokumentów, budujemy bazę wiedzy agenta (ofertę, FAQ, procedury) i łączymy go z CRM, pocztą i innymi narzędziami. Dopasowujemy ton i zakres tak, żeby agent AI wiarygodnie reprezentował Twoją firmę w wybranych kanałach.',
      },
      {
        step: 3,
        title: 'Budowa i testy agenta AI',
        description: 'Wdrażamy agenta AI w środowisku testowym i sprawdzamy go na prawdziwych zapytaniach i dokumentach. Dopracowujemy odpowiedzi oraz zasady przekazywania spraw do zespołu i przekazujemy instrukcję: kiedy agent oddaje kontakt człowiekowi i jak z nim współpracować.',
      },
      {
        step: 4,
        title: 'Uruchomienie i rozwój agenta AI',
        description: 'Włączamy agenta AI w produkcji, monitorujemy jakość odpowiedzi i przepływ leadów. W miarę potrzeb rozszerzamy zakres – nowe typy zapytań, kanały lub dokumenty – tak, żeby agenci AI dalej odciążali zespół i dawali wymierne rezultaty.',
      },
    ],
    whySmartWeave:
      'W SmartWeave agenci AI to narzędzie biznesowe, nie eksperyment. Zaczynamy od jednego, dobrze określonego zadania – np. pierwsza odpowiedź na stronie albo kwalifikacja leadów – mierzymy efekt i dopiero potem poszerzamy zakres. Łączymy doświadczenie z automatyzacji z wdrożeniami opartymi na modelach językowych, więc każdy agent AI jest zaprojektowany tak, żeby realnie odciążyć zespół i działać przewidywalnie na co dzień.',
  },
};
