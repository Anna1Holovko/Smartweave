import type { ServiceSlug } from './services';

export type UslugiPageContent = {
  problems: { title: string; description: string }[];
  approach: string;
  benefits: string;
  process: string;
};

/** Per-service content for "Z jakimi problemami...", "Nasze podejście", "Korzyści", "Proces współpracy" */
export const USLUGI_PAGE_CONTENT: Record<ServiceSlug, UslugiPageContent> = {
  strony: {
    problems: [
      { title: 'Strona nie buduje zaufania ani nie prowadzi do kontaktu', description: 'Strona internetowa, która nie buduje zaufania ani nie prowadzi do kontaktu, to stracony potencjał. Klienci szukają konkretów: co oferujesz, dla kogo i dlaczego warto z Tobą współpracować.' },
      { title: 'Słaba widoczność w wyszukiwarkach', description: 'Trudno Cię znaleźć w Google – konkurencja wyprzedza, a leady trafiają do innych. Brak optymalizacji pod SEO i wyszukiwarki AI.' },
      { title: 'Strona nie przynosi zapytań ani sprzedaży', description: 'Odwiedziny są, ale nikt nie pisze ani nie dzwoni – brak jasnego wezwania do działania i ścieżki do kontaktu.' },
      { title: 'Chaos przy aktualizacjach i treściach', description: 'Zależność od zewnętrznego informatyka przy każdej zmianie lub brak czasu na rozwój strony i treści.' },
      { title: 'Nieużyteczny lub przestarzały wygląd', description: 'Strona wygląda na starą lub amatorską – klienci oceniają firmę po pierwszym wrażeniu i wybierają konkurencję.' },
      { title: 'Brak spójności z kanałami i materiałami', description: 'Strona nie łączy się z ofertą, social media ani materiałami – rozproszony, niespójny wizerunek.' },
    ],
    approach: 'Projektowanie stron www w SmartWeave traktujemy jako tworzenie narzędzia wspierającego cele biznesowe i wizerunkowe, a nie tylko wizytówki online. Każdy projekt rozpoczynamy od analizy potrzeb firmy i jej klientów, aby strona skutecznie przyciągała uwagę, budowała zaufanie i wspierała działania marketingowe oraz sprzedażowe. Nasze rozwiązania są dopasowane do charakteru działalności klienta - od stron informacyjnych po serwisy generujące kontakty i zapytania ofertowe. Projektujemy je z myślą o przejrzystej strukturze, intuicyjnej nawigacji, responsywności i optymalizacji pod SEO oraz wyszukiwarki AI, tak aby działały dla Twojej firmy 24/7, wspierając rozwój i profesjonalny wizerunek marki.',
    benefits: 'Więcej zapytań i leadów - dzięki stronie zaprojektowanej pod konwersję i pozyskiwanie kontaktów. Widoczność w Google i wyszukiwarkach AI - długoterminowy ruch organiczny bez konieczności płatnych kampanii. Profesjonalny wizerunek od pierwszego kontaktu - budowanie zaufania klientów i partnerów biznesowych. Oszczędność czasu - wszystkie informacje w jednej, spójnej bazie zamiast rozproszonych materiałów.',
    process: 'Rozpoczynamy od analizy potrzeb i celów (grupa docelowa, cele strony, strategia). Następnie tworzymy projekt i strukturę (układ, ścieżki, UX/UI pod konwersję), wdrażamy i optymalizujemy pod SEO oraz wyszukiwarki AI, a na koniec uruchamiamy stronę w produkcji z dokumentacją i oferujemy wsparcie techniczne oraz rozwój w miarę potrzeb firmy.',
  },
  branding: {
    problems: [
      { title: 'Niespójny wizerunek marki', description: 'Logo, kolory i materiały różnią się w zależności od kanału – klienci nie mają jednego, rozpoznawalnego obrazu firmy.' },
      { title: 'Brak profesjonalnego logo i identyfikacji', description: 'Amatorski lub przypadkowy wygląd obniża zaufanie i utrudnia zapamiętanie marki.' },
      { title: 'Trudności z przygotowaniem materiałów na czas', description: 'Każda ulotka, post czy prezentacja wymaga od nowa szukania plików i dopasowywania stylu.' },
      { title: 'Potrzeba odświeżenia wizerunku', description: 'Marka się rozwija, a identyfikacja wizualna nadal wygląda jak sprzed lat.' },
      { title: 'Rozproszone wytyczne i brak brandbooka', description: 'Nikt nie ma w jednym miejscu zasad używania logo, kolorów i tonu komunikacji.' },
      { title: 'Słabe pierwsze wrażenie w B2B', description: 'Partnerzy i duzi klienci oceniają wiarygodność także po spójnym, profesjonalnym wizerunku.' },
    ],
    approach: 'Budujemy spójny system identyfikacji wizualnej: od logo i kolorystyki po szablony i materiały. Wszystko dopasowujemy do Twojej branży, wartości i grupy docelowej, tak aby marka była rozpoznawalna i profesjonalna w każdym miejscu.',
    benefits: 'Spójna identyfikacja wzmacnia zaufanie i rozpoznawalność. Oszczędzasz czas na codziennych materiałach dzięki gotowym szablonom i jasnym wytycznym w brandbooku.',
    process: 'Zaczynamy od rozmowy o marce, konkurencji i odbiorcach. Następnie proponujemy koncepcję (logo, kolory, typografia), po akceptacji rozwijamy system i dostarczamy materiały oraz wytyczne do dalszego korzystania.',
  },
  automatyzacja: {
    problems: [
      { title: 'Zbyt dużo pracy ręcznej', description: 'Ręczne przenoszenie danych między systemami zabiera godziny. Workflowy i integracje synchronizują dane automatycznie – bez przepisywania.' },
      { title: 'Tracisz wiadomości i leady', description: 'Ważne wiadomości i leady trafiają automatycznie do CRM, tabel i zadań. Workflow uruchamia się przy nowym wpisie – zero przeoczeń.' },
      { title: 'Chaos w danych i dokumentach', description: 'Dane w wielu miejscach, brak jednej prawdy. Automatyzacja zbiera i porządkuje przepływ – wszystko w jednym systemie.' },
      { title: 'Wszystko trwa za długo', description: 'Procesy ciągną się, bo każdy krok wymaga ręcznej akcji. Automatyzacja wykonuje powtarzalne kroki w tle – odzyskujesz czas.' },
      { title: 'Zbyt dużo stresu i błędów', description: 'Ręczne przepisywanie rodzi pomyłki. Workflowy i integracje eliminują podwójne wpisy i rozjazdy danych.' },
      { title: 'Brak czasu na klientów i rozwój', description: 'Zespół tonie w operacyjce. Automatyzacja procesów oddaje im czas na sprzedaż i relacje.' },
    ],
    approach: 'Automatyzujemy procesy biznesowe przez workflowy i integracje między systemami (Make, n8n, API). Nie wdrażamy AI – projektujemy konkretne scenariusze: dane z formularza do CRM, zamówienie do powiadomienia, raport z wielu źródeł. Zespół przestaje przepisywać i śledzić każdy krok; procesy biegną w tle.',
    benefits: 'Oszczędność czasu i mniej błędów – workflowy wykonują powtarzalne kroki. Szybsza reakcja – automatyczne potwierdzenia i przypomnienia. Firma skaluje się bez proporcjonalnego wzrostu zatrudnienia.',
    process: 'Mapujemy procesy i ustalamy, co zautomatyzować. Projektujemy workflowy i integracje (Make, n8n), wdrażamy pierwszy scenariusz (np. formularz → CRM, raport, powiadomienia). Po testach rozwijamy kolejne procesy i przekazujemy wiedzę zespołowi.',
  },
  'agenci-ai': {
    problems: [
      { title: 'Opóźniona pierwsza odpowiedź', description: 'Zapytania wchodzą mailem i z formularzy – zespół nie nadąża, leady czekają. Agenci AI dają odzew w minutę, więc nie tracisz szans.' },
      { title: 'Ręczna segregacja leadów', description: 'Każde zapytanie ktoś musi przeczytać, ocenić i przekazać. Agenci AI kwalifikują leady według Twoich kryteriów i przekazują gotowe kontakty do handlowców.' },
      { title: 'Chaos dokumentów i danych', description: 'Umowy, faktury i ankiety – dane trzeba wyciągać i przenosić. Agenci AI przetwarzają dokumenty i uzupełniają CRM lub arkusze automatycznie.' },
      { title: 'Powtarzalne odpowiedzi na te same pytania', description: 'FAQ i standardowe zapytania zajmują godziny. Agenci AI odpowiadają na bazie Twojej wiedzy; zespół skupia się na relacjach i sprzedaży.' },
      { title: 'Chcesz skalować obsługę bez etatów', description: 'Więcej zapytań i leadów bez zatrudniania. Agenci AI obsługują pierwszy kontakt i przygotowują dane 24/7.' },
      { title: 'Brak czasu na to, co naprawdę ważne', description: 'Zespół tonie w operacyjce zamiast w rozwoju i klientach. Agenci AI odciążają od rutynowych zadań i oddają czas na strategię i relacje.' },
    ],
    approach: 'Agenci AI to programy oparte na sztucznej inteligencji: rozumieją język naturalny i Twoją wiedzę o firmie, prowadzą rozmowę z klientem, odpowiadają na zapytania, kwalifikują leady i przetwarzają dokumenty. Działają na stronie (chatbot), w mailu lub w innym kanale i łączą się z CRM oraz Twoimi narzędziami. W SmartWeave budujemy agenty AI pod konkretny proces – z jasnym zakresem i mierzalnym efektem – tak, żeby odciążyć zespół, a nie zastępować ludzi.',
    benefits: 'Dzięki agentom AI: szybsza pierwsza odpowiedź – klient dostaje odzew w minutę; więcej czasu dla zespołu – agenci AI obsługują powtarzalne zapytania i wpisywanie danych; lepszy przepływ leadów – automatyczna kwalifikacja i przypisanie do handlowców; większa przepustowość – agenci AI działają 24/7 bez dodatkowych etatów.',
    process: 'Ustalamy cel agenta AI: pierwsza odpowiedź, kwalifikacja leadów, FAQ czy analiza dokumentów – oraz granice, gdzie wchodzi człowiek. Projektujemy scenariusze, bazę wiedzy i integracje z Twoimi systemami. Budujemy i testujemy agenta AI na prawdziwych przypadkach, dopracowujemy zasady przekazywania spraw do zespołu. Uruchamiamy na produkcji, monitorujemy jakość i w miarę potrzeb rozszerzamy zakres agenta AI.',
  },
};

/** Generic content for main /uslugi listing (no single service context) */
export const USLUGI_LISTING_CONTENT: UslugiPageContent = {
  problems: [
    { title: 'Brak czasu na to, co naprawdę ważne', description: 'Codzienne, powtarzalne zadania zabierają czas zespołowi i zarządzaniu.' },
    { title: 'Niespójny lub słabo widoczny wizerunek', description: 'Marka nie jest rozpoznawalna lub strona nie przyciąga klientów.' },
    { title: 'Chaos w procesach i danych', description: 'Informacje w wielu miejscach, trudno nadążyć i nic nie umyka.' },
    { title: 'Potrzeba wsparcia w rozwoju firmy', description: 'Chęć profesjonalizacji bez zatrudniania całego działu IT lub marketingu.' },
  ],
  approach: 'Słuchamy Twoich celów i ograniczeń, a następnie proponujemy konkretne kroki: od strony i identyfikacji wizualnej po automatyzację procesów i asystentów AI. Dopasowujemy zakres i tempo do Twojej firmy.',
  benefits: 'Oszczędność czasu, większa widoczność i spójny wizerunek. Zyskujesz narzędzia, które wspierają sprzedaż i rozwój bez niepotrzebnego obciążania zespołu.',
  process: 'Zaczynamy od bezpłatnej konsultacji - rozmawiamy o wyzwaniach i celach. Następnie proponujemy rozwiązanie (jedna usługa lub pakiet) i ustalamy harmonogram wdrożenia. Po wdrożeniu oferujemy wsparcie i rozwój na bieżąco.',
};
