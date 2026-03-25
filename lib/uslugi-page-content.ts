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
    approach:
      'Projektujemy strony jako narzędzie zaufania i leadów: prosta struktura, szybkie ładowanie, SEO/GEO i jasne CTA.',
    benefits: 'Więcej zapytań, lepsza widoczność i spójny wizerunek od pierwszego kontaktu.',
    process: 'Analiza → UX/UI → wdrożenie → SEO → start i wsparcie.',
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
    approach:
      'Tworzymy identyfikację: logo, kolory, typografia, zasady komunikacji i szablony. Marka jest spójna na stronie, w reklamach i w automatyzacjach.',
    benefits: 'Spójność, rozpoznawalność i szybsze tworzenie materiałów.',
    process: 'Warsztat → koncepcja → dopracowanie → brandbook i materiały.',
  },
  automatyzacja: {
    problems: [
      { title: 'Zbyt dużo pracy ręcznej', description: 'Przestań ręcznie przenosić dane między systemami. Automatycznie synchronizujemy i aktualizujemy dane – oszczędzasz godziny każdego dnia.' },
      { title: 'Tracisz wiadomości i leady', description: 'Wszystkie ważne wiadomości automatycznie trafiają we właściwe miejsca – do CRM, tabel i zadań. Zero przeoczeń.' },
      { title: 'Chaos dokumentów', description: 'Zbieramy wszystko w jeden uporządkowany system. Koniec z godzinami szukania – wszystko masz pod ręką w sekundy.' },
      { title: 'Wszystko trwa za długo', description: 'Gdy każdy proces się ciągnie, trudno myśleć o rozwoju. Automatyzujemy powtarzalne zadania, żebyś odzyskał czas.' },
      { title: 'Zbyt dużo stresu i błędów', description: 'Koniec z błędami i przeoczeniami. Automatyzacja dba o każdy szczegół, a Ty odzyskujesz spokój.' },
      { title: 'Brak czasu na klientów i rozwój', description: 'Zespół tonie w operacyjce zamiast skupiać się na sprzedaży i relacjach – automatyzacja oddaje im ten czas.' },
    ],
    approach:
      'Budujemy workflowy i integracje (Make, n8n, API). AI dokładamy tam, gdzie trzeba rozumieć tekst lub dokumenty.',
    benefits: 'Mniej ręcznej pracy, mniej błędów i szybsza reakcja.',
    process: 'Mapa procesu → pilot → wdrożenie → rozwój.',
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
    approach:
      'Agenci AI odpowiadają, kwalifikują leady i przetwarzają dokumenty. Działają na stronie, w mailu i wpięte w CRM.',
    benefits: 'Szybki odzew, mniej rutyny i lepszy przepływ leadów 24/7.',
    process: 'Cel → scenariusze → integracje → testy → start i optymalizacja.',
  },
  chatboty: {
    problems: [
      { title: 'Klienci piszą poza godzinami pracy', description: 'Zapytania spływają wieczorem i w weekendy – bez odpowiedzi szybko wybierają konkurencję. Chatbot daje pierwszy kontakt i zbiera lead 24/7.' },
      { title: 'Zespół odpowiada w kółko na to samo', description: 'FAQ i proste pytania zjadają czas handlowców i obsługi. Chatbot odpowiada na bazie Twojej wiedzy, ludzie zajmują się trudniejszymi sprawami.' },
      { title: 'Brak spójnych odpowiedzi w kanałach', description: 'Różne osoby piszą inaczej o ofercie. Chatbot trzyma się ustalonych treści i tonu marki.' },
      { title: 'Leady giną między czatem a CRM', description: 'Rozmowy zostają w widżecie zamiast w systemie. Wdrażamy chatbota z integracją – kontakt i notatka trafiają tam, gdzie pracuje sprzedaż.' },
      { title: 'Chcesz kwalifikacji przed rozmową', description: 'Handlowcy tracą czas na niepasujące zapytania. Chatbot może zebrać kluczowe informacje i przekazać „gotowy” lead.' },
      { title: 'Potrzebujesz czegoś lżejszego niż pełny agent AI', description: 'Szukasz skupionego rozwiązania: strona, FAQ, formularz i eskalacja do człowieka – bez rozbudowanej automatyzacji dokumentów.' },
    ],
    approach: 'Chatbot zbiera leady i odpowiada na FAQ. Integrujemy go z CRM i zasadami marki.',
    benefits: 'Szybsza odpowiedź, mniej powtórek i leady w CRM.',
    process: 'Cel → baza wiedzy → wdrożenie → testy → optymalizacja.',
  },
  'aplikacje-webowe': {
    problems: [
      { title: 'Excel i maile nie skalują procesu', description: 'Wzrost zamówień lub klientów rozrywa ręczne arkusze. Aplikacja webowa porządkuje dane i workflow w jednym miejscu.' },
      { title: 'Brak jednego miejsca dla zespołu i klientów', description: 'Informacje rozproszone między narzędziami. Potrzebujesz panelu z logowaniem, rolami i historią działań.' },
      { title: 'Gotowe SaaS-y nie pasują do procesu', description: 'Szablony wymuszają kompromisy. Dedykowana aplikacja webowa odzwierciedla Twój sposób pracy.' },
    ],
    approach: 'Budujemy aplikacje webowe pod proces: UX, dane, bezpieczeństwo i rozwój od MVP.',
    benefits: 'Jedno miejsce na dane i procesy. Mniej błędów i łatwiejsze skalowanie.',
    process: 'Discovery → MVP → wdrożenie → utrzymanie i rozwój.',
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
  approach:
    'Zaczynamy od procesu, potem wdrażamy automatyzację i AI. Branding i strona www są wsparciem spójności i konwersji.',
  benefits: 'Oszczędność czasu, mniej błędów i większa przewidywalność.',
  process: 'Konsultacja → pilot → wdrożenie → rozwój.',
};
