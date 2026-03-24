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
    title: 'Firma w erze AI',
    description:
      'SmartWeave: jak sensownie wdrożyć AI w firmie — strategia, automatyzacja, narzędzia, etyka i plan na 12 tygodni. Dla właścicieli i menedżerów MŚP.',
    modalDescription: `Firma w erze AI — praktyczny przewodnik SmartWeave

E-book dla polskich przedsiębiorców, właścicieli firm i osób z zarządu, które chcą wejść w sztuczną inteligencję i automatyzację bez chaosu: najpierw proces i priorytety, potem narzędzia — nie odwrotnie.

Co znajdziesz w środku:
• ponad 60 stron treści „pod wdrożenie” (bieżąca edycja: ok. 67 stron), bez akademickiego żargonu
• 14 rozdziałów ułożonych jak ścieżka działania
• test gotowości na AI + rozpisanie typowych barier w organizacji
• strategia i roadmapa AI dopasowana do MŚP
• automatyzacja w Make.com — gotowe schematy do wykorzystania
• przykład agenta AI (m.in. w obsłudze e-maili) z myślą o realnym workflow
• AI w marketingu, sprzedaży, HR i finansach — ramy, nie puste hasła
• etyka AI, dane, RODO oraz kontekst europejskiego AI Act
• plan na 12 tygodni z checklistami, wskaźnikami i kalkulacją ROI
• przegląd 50+ narzędzi AI przydatnych w codziennej pracy firmy (aktualne dane na 2025 r.)


Dlaczego to teraz ma sens

AI w firmie przyspiesza obsługę, treści i analizę — ale najwięcej tracą te organizacje, które kupują „kolejne narzędzie” bez mapy procesu. Ten ebook ustawia kolejność: diagnoza → pilot z KPI → skalowanie tego, co się sprawdza.

Dla kogo

• właściciele i zarząd MŚP
• CEO, dyrektorzy, menedżerowie liniowi
• osoby odpowiedzialne za operacje, marketing lub transformację cyfrową


Najczęstsze bariery — i jak je rozbijamy

Niejasny zakres („AI u nas”) — uczymy go nazwać i ograniczyć do pierwszego sensownego kroku.
Budżet i czas — start od małego pilota z mierzalnym efektem zamiast wielomiesięcznego projektu „na pokaz”.
Bezpieczeństwo i dane — dobre praktyki, żeby uniknąć wycieków i błędów przy RODO.
Jakość danych wejściowych — dlaczego bez porządku nawet najlepszy model da słaby wynik.


5 kroków wdrożenia (w skrócie)

1. Analiza procesów i decyzji — gdzie ginie czas i pieniądz.
2. Priorytetyzacja (wartość vs nakład wysiłku).
3. Proof of concept — jeden wąski use case, jasne KPI.
4. Skalowanie rozwiązań, które przeszły test.
5. Iteracja — przegląd, aktualizacja polityk i narzędzi.


Jakie efekty są realne

Krótszy czas na powtarzalne zadania, mniej błędów ręcznych, szybsza reakcja na klienta i spójniejsza komunikacja w zespole — pod warunkiem konsekwentnego wdrożenia planu z publikacji.


FAQ

Jak wdrożyć AI w firmie?
Od procesu i jednego pilota z mierzalnym celem — dokładnie ten schemat rozwijasz w kolejnych rozdziałach.

Ile to kosztuje?
Zależy od skali; wiele pilotów mieści się w kosztach narzędzi i czasu zespołu (rząd tysięcy zł miesięcznie na start bywa realny), bez od razu budowania całego zaplecza R&D.

Czy AI zastąpi zespół?
W praktyce odbiera najcięższe, powtarzalne fragmenty pracy; ludzie zostają przy decyzjach, relacjach i jakości — ten podział jest w ebooku wyraźnie zaznaczony.

Od czego zacząć w poniedziałek?
Wypisz 3–5 powtarzalnych czynności tygodnia i wybierz jedną pod pilota z jednym kryterium sukcesu — resztę domykasz planem 12-tygodniowym z książki.`,
    price: '89 zł',
    image: '/assets/ebook-firma-w-erze-ai.png',
    gradient: 'from-indigo-500 to-violet-600',
    buyUrl: '/#contact',
  },
];
