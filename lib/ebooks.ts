/**
 * E-books shown on the site (catalog for koszyk / checkout).
 * Pliki PDF/EPUB nie są udostępniane przez front — brak URL-i do pobrania w kliencie.
 * Realizacja zamówienia: kontakt / płatność poza stroną (np. buyUrl → #contact).
 */
export type Ebook = {
  id: string;
  title: string;
  description: string;
  /** Optional longer text shown in the details modal. If omitted, description is used. */
  modalDescription?: string;
  price: string;
  /** Optional cover image path (e.g. /assets/ebook-xyz.png). If empty, a gradient placeholder is shown. */
  image?: string;
  gradient: string;
  /** Optional link after checkout (e.g. /#contact). Not used for direct file download. */
  buyUrl: string;
};

export const EBOOKS: Ebook[] = [
  {
    id: 'firma-w-erze-ai',
    title: 'AI w firmie',
    description:
      'Jak wdrożyć sztuczną inteligencję w biznesie krok po kroku: strategia, automatyzacja, dobór narzędzi i sensowne ROI — bez akademickiej teorii.',
    modalDescription: `AI w firmie — jak skutecznie wdrożyć sztuczną inteligencję w biznesie

Kompletny przewodnik dla organizacji, które chcą wejść w AI bez chaosu i „pilotów bez końca”. Dla właścicieli firm, zarządu i managerów, którzy szukają konkretów, a nie slajdów z konferencji.

W skrócie:
• ponad 80 stron praktycznej treści
• 12 rozdziałów ułożonych jak plan działania
• zestawienie 50+ narzędzi AI przydatnych w pracy firmowej
• przykłady i ramy myślenia aktualne na 2026 rok


DLACZEGO TO WAŻNE TERAZ

Sztuczna inteligencja w biznesie przyspiesza: od obsługi klienta po analizę danych. Firmy, które świadomie wybiorą obszary i tempo wdrożeń, zyskują czas i jakość decyzji — te, które czekają „aż się wyklaruje rynek”, zostają w tyle za konkurencją i własnymi procesami.

Najczęstszy błąd? Start od narzędzia z reklamy zamiast od procesu. Ten ebook odwraca kolejność: najpierw rozumiesz, gdzie jesteś, potem wybierasz miejsce na pierwszy sensowny krok.


CO DOSTAJESZ W ŚRODKU

Zamiast ogólników — ścieżka od diagnozy do pierwszych efektów:

Strategia AI w skali firmy
Model dojrzałości, priorytety (wartość vs nakład), roadmapa i jak mówić o AI w zespole, żeby nie wywołać oporu.

Automatyzacja procesów
Jak wyszukać procesy, które naprawdę warto odciążyć, jak liczyć prostą opłacalność i unikać projektów „na pokaz”.

AI w marketingu i sprzedaży
Personalizacja, treści, obsługa zapytań i leadów — bez przekraczania granic marki i danych osobowych.

Narzędzia AI dla firm
Jak dobierać stack pod realne zadania (nie pod logo na stronę), na co zwracać uwagę przy umowach i dostępie do danych.

Plan działania na 12 tygodni
Szablon kolejnych kroków: od proof of concept do skalowania tego, co się sprawdziło.


DLA KOGO

• właściciele i zarząd MŚP oraz większych firm
• CEO, dyrektorzy i managerowie liniowi
• osoby odpowiedzialne za operacje, marketing lub transformację cyfrową
• zespoły planujące uporządkowane wejście w AI, a nie jednorazowy eksperyment


BARIERY, KTÓRE ROZBIJAMY NA CZĘŚCI

Brak jasnego obrazu „co to właściwie znaczy AI u nas” — pokazujemy, jak to nazwać i ograniczyć zakres.

Budżet i czas — jak zacząć małym pilotem z mierzalnym wynikiem, zamiast wielomiesięcznego „big bagna”.

Bezpieczeństwo i dane — minimum dobrych praktyk, żeby nie wpaść w pułapkę wycieków i niezgodnego z RODO przetwarzania.

Jakość danych — dlaczego bez porządku w wejściu nawet najlepszy model da słaby efekt.


5 KROKÓW SKUTECZNEJ ŚCIEŻKI AI

1. Mapa procesów i decyzji — gdzie dziś ginie czas i pieniądz.
2. Priorytetyzacja — maksymalna wartość przy akceptowalnym wysiłku.
3. Proof of concept — jeden wąski use case, jasne KPI.
4. Skalowanie — powielenie tego, co się sprawdziło; ucinanie tego, co nie.
5. Iteracja — regularny przegląd, aktualizacja polityk i narzędzi.


EFEKTY, NA KTÓRE CELUJEMY

Krótszy czas realizacji powtarzalnych zadań, mniej błędów „ręcznych”, szybsze reakcje na rynek i klienta oraz spójniejsza komunikacja wewnątrz firmy — pod warunkiem, że idziesz według planu z ebooka, a nie według listy haseł z LinkedIna.


FAQ

Jak wdrożyć AI w firmie?
Zacznij od procesu, nie od narzędzia: wybierz jeden obszar z mierzalnym efektem, zrób krótki pilot, oceń wynik i dopiero wtedy planuj szerszy zakres.

Ile kosztuje wdrożenie AI?
Zależy od skali — wiele sensownych pilotów mieści się w budżecie narzędziowym i czasu zespołu (rząd tysięcy złotych miesięcznie na start bywa realny), o ile nie budujesz od razu całego działu R&D.

Czy AI „zabierze” pracę zespołowi?
W praktyce najczęściej zabiera najnudniejsze fragmenty pracy; ludzie zostają przy decyzjach, relacjach i jakości. Ebook podkreśla tę granicę, żeby uniknąć lęku i oporu.

Od czego zacząć w poniedziałek?
Od listy 3–5 powtarzalnych czynności tygodnia i wyboru jednej do pilota z jasnym kryterium sukcesu — dokładnie ten mechanizm rozwijasz w kolejnych rozdziałach.`,
    price: '89 zł',
    image: '/assets/ebook-firma-w-erze-ai.png',
    gradient: 'from-indigo-500 to-violet-600',
    buyUrl: '/#contact',
  },
];
