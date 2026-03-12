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
      { title: 'Strona nie buduje zaufania ani nie prowadzi do kontaktu', description: 'Strona internetowa, która nie buduje zaufania ani nie prowadzi do kontaktu, to stracony potencjał. Klienci szukają konkretów: co oferujesz, dla kogo i dlaczego warto z Tobą współpracować. Brak przejrzystej oferty i intuicyjnej ścieżki kontaktu powoduje utratę leadów i zainteresowania na rzecz konkurencji.' },
      { title: 'Słaba widoczność w wyszukiwarkach', description: 'Trudno Cię znaleźć w Google - konkurencja wyprzedza, a leady trafiają do innych.' },
      { title: 'Strona nie przynosi zapytań ani sprzedaży', description: 'Odwiedziny są, ale nikt nie pisze ani nie dzwoni - brak jasnego wezwania do działania.' },
      { title: 'Chaos przy aktualizacjach i treściach', description: 'Zależność od zewnętrznego informatyka przy każdej zmianie lub brak czasu na rozwój strony.' },
    ],
    approach: 'Projektowanie stron www w SmartWeave traktujemy jako tworzenie narzędzia wspierającego cele biznesowe i wizerunkowe, a nie tylko wizytówki online. Każdy projekt rozpoczynamy od analizy potrzeb firmy i jej klientów, aby strona skutecznie przyciągała uwagę, budowała zaufanie i wspierała działania marketingowe oraz sprzedażowe. Nasze rozwiązania są dopasowane do charakteru działalności klienta - od stron informacyjnych po serwisy generujące kontakty i zapytania ofertowe. Projektujemy je z myślą o przejrzystej strukturze, intuicyjnej nawigacji, responsywności i optymalizacji pod SEO oraz wyszukiwarki AI, tak aby działały dla Twojej firmy 24/7, wspierając rozwój i profesjonalny wizerunek marki.',
    benefits: 'Więcej zapytań i leadów - dzięki stronie zaprojektowanej pod konwersję i pozyskiwanie kontaktów. Widoczność w Google i wyszukiwarkach AI - długoterminowy ruch organiczny bez konieczności płatnych kampanii. Profesjonalny wizerunek od pierwszego kontaktu - budowanie zaufania klientów i partnerów biznesowych. Oszczędność czasu - wszystkie informacje w jednej, spójnej bazie zamiast rozproszonych materiałów.',
    process: 'Rozpoczynamy od analizy potrzeb i celów (grupa docelowa, cele strony, strategia). Następnie tworzymy projekt i strukturę (układ, ścieżki, UX/UI pod konwersję), wdrażamy i optymalizujemy pod SEO oraz wyszukiwarki AI, a na koniec uruchamiamy stronę w produkcji z dokumentacją i oferujemy wsparcie techniczne oraz rozwój w miarę potrzeb firmy.',
  },
  branding: {
    problems: [
      { title: 'Niespójny wizerunek marki', description: 'Logo, kolory i materiały różnią się w zależności od kanału - klienci nie mają jednego, rozpoznawalnego obrazu firmy.' },
      { title: 'Brak profesjonalnego logo i identyfikacji', description: 'Amatorski lub przypadkowy wygląd obniża zaufanie i utrudnia zapamiętanie marki.' },
      { title: 'Trudności z przygotowaniem materiałów na czas', description: 'Każda ulotka, post czy prezentacja wymaga od nowa szukania plików i dopasowywania stylu.' },
      { title: 'Potrzeba odświeżenia wizerunku', description: 'Marka się rozwija, a identyfikacja wizualna nadal wygląda jak sprzed lat.' },
    ],
    approach: 'Budujemy spójny system identyfikacji wizualnej: od logo i kolorystyki po szablony i materiały. Wszystko dopasowujemy do Twojej branży, wartości i grupy docelowej, tak aby marka była rozpoznawalna i profesjonalna w każdym miejscu.',
    benefits: 'Spójna identyfikacja wzmacnia zaufanie i rozpoznawalność. Oszczędzasz czas na codziennych materiałach dzięki gotowym szablonom i jasnym wytycznym w brandbooku.',
    process: 'Zaczynamy od rozmowy o marce, konkurencji i odbiorcach. Następnie proponujemy koncepcję (logo, kolory, typografia), po akceptacji rozwijamy system i dostarczamy materiały oraz wytyczne do dalszego korzystania.',
  },
  automatyzacja: {
    problems: [
      { title: 'Godziny na powtarzalnych zadaniach', description: 'Ręczne przenoszenie danych, wysyłanie tych samych maili i uzupełnianie formularzy zabiera czas zespołowi.' },
      { title: 'Chaos w danych i przeoczone leady', description: 'Informacje rozproszone w wielu systemach - trudno nadążyć i nic nie umyka.' },
      { title: 'Brak czasu na analizy i raporty', description: 'Dane są, ale nikt nie ma czasu je zbierać i przedstawiać w przejrzysty sposób.' },
      { title: 'Presja na obsługę klienta 24/7', description: 'Oczekiwania szybkiej odpowiedzi rosną - trudno obsłużyć wszystko ręcznie bez nadgodzin.' },
    ],
    approach: 'Analizujemy Twoje procesy i wybieramy te, które można bezpiecznie zautomatyzować. Wdrażamy workflow, integracje i - tam gdzie to ma sens - asystentów AI, tak aby zespół mógł skupić się na tym, co wymaga wiedzy i kontaktu z klientem.',
    benefits: 'Mniej błędów, szybsze reakcje i oszczędność czasu. Zespół zajmuje się rozwojem i klientami zamiast powtarzalnymi zadaniami, a firma lepiej skaluje się bez proporcjonalnego wzrostu zatrudnienia.',
    process: 'Rozpoczynamy od mapowania procesów i ustalenia priorytetów. Następnie projektujemy i wdrażamy pierwszy scenariusz (np. synchronizacja danych, raporty, chatbot). Po testach rozwijamy kolejne automatyzacje i uczymy zespół korzystania z narzędzi.',
  },
  'agenci-ai': {
    problems: [
      { title: 'Rutynowe zapytania i ręczna kwalifikacja leadów', description: 'Zespół traci czas na powtarzalne odpowiedzi i wstępną analizę - tam, gdzie można wspomóc ludzi „rozumieniem” treści, wchodzą agenci AI.' },
      { title: 'Analiza dokumentów i ekstrakcja danych', description: 'Ręczne przetwarzanie dokumentów zabiera godziny i generuje ryzyko błędów.' },
      { title: 'Presja na szybką reakcję 24/7', description: 'Klienci oczekują natychmiastowej odpowiedzi - trudno obsłużyć wszystko bez wsparcia AI.' },
      { title: 'Chęć skalowania obsługi bez wzrostu zatrudnienia', description: 'Potrzeba obsłużyć więcej zapytań i leadów bez proporcjonalnego zwiększania zespołu.' },
    ],
    approach: 'Agenci AI to systemy oparte na modelach językowych i automatyzacji: odpowiadają na pytania, klasyfikują dokumenty, wspierają sprzedaż i obsługę klienta. Nie zastępują ludzi - odciążają od powtarzalnych zadań i błędów, dając czas na rozwój i budowanie relacji. Wdrażamy rozwiązania dopasowane do Twoich procesów i danych.',
    benefits: 'Szybsza reakcja na zapytania klientów - pierwsza odpowiedź lub kwalifikacja bez oczekiwania. Oszczędność czasu na analizie dokumentów i ekstrakcji danych. Lepsze wykorzystanie leadów dzięki automatycznej kwalifikacji i przekierowaniu. Skalowalność obsługi bez proporcjonalnego wzrostu zatrudnienia.',
    process: 'Określamy zakres i procesy, w których AI przyniesie największą wartość. Projektujemy scenariusze, bazy wiedzy i integracje z CRM, mailem lub innymi systemami. Budujemy agenta, testujemy na rzeczywistych przypadkach i dopracowujemy odpowiedzi oraz wyjątki. Uruchamiamy na produkcji, monitorujemy jakość i rozszerzamy zakres w miarę potrzeb.',
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
