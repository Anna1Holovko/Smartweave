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
      { title: 'Brak profesjonalnej wizytówki w sieci', description: 'Firma bez strony lub z przestarzałą stroną traci zaufanie i szanse na nowych klientów.' },
      { title: 'Słaba widoczność w wyszukiwarkach', description: 'Trudno Cię znaleźć w Google - konkurencja wyprzedza, a leady trafiają do innych.' },
      { title: 'Strona nie przynosi zapytań ani sprzedaży', description: 'Odwiedziny są, ale nikt nie pisze ani nie dzwoni - brak jasnego wezwania do działania.' },
      { title: 'Chaos przy aktualizacjach i treściach', description: 'Zależność od zewnętrznego informatyka przy każdej zmianie lub brak czasu na rozwój strony.' },
    ],
    approach: 'Projektujemy strony, które ładują się szybko, są czytelne na każdym urządzeniu i nastawione na konwersję. Zaczynamy od Twoich celów i grupy docelowej, potem dobieramy strukturę, treści i technologię - tak, aby strona realnie wspierała sprzedaż i budowała zaufanie.',
    benefits: 'Nowoczesna, szybka strona zwiększa widoczność w wyszukiwarkach i w oczach klientów. Oszczędzasz czas dzięki prostym aktualizacjom i zyskujesz narzędzie, które przez lata wspiera rozwój firmy.',
    process: 'Rozpoczynamy od krótkiej rozmowy o Twoich celach i grupie docelowej. Następnie proponujemy strukturę i wygląd, po akceptacji wdrażamy stronę i przekazujemy ją z instrukcją. Oferujemy także opiekę techniczną i rozwój na bieżąco.',
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
