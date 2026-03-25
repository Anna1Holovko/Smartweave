import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from '@/lib/site';

export type SeoLandingId =
  | 'automatyzacja-ai-dla-firm'
  | 'automatyzacja-procesow-biznesowych'
  | 'ai-w-marketingu-i-sprzedazy'
  | 'automatyzacja-ai-wroclaw'
  | 'automatyzacja-procesow-warszawa'
  | 'ai-dla-firm-krakow';

export type SeoLandingBlock = { heading: string; paragraphs: string[] };

export type SeoLandingDefinition = {
  id: SeoLandingId;
  path: string;
  metadata: Metadata;
  h1: string;
  lead: string;
  blocks: SeoLandingBlock[];
};

const base = (title: string, description: string, path: string): Metadata => ({
  title,
  description,
  alternates: { canonical: `${SITE_URL}${path}` },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}${path}`,
    siteName: SITE_NAME,
    locale: 'pl_PL',
    type: 'website',
  },
});

export const SEO_LANDINGS: Record<SeoLandingId, SeoLandingDefinition> = {
  'automatyzacja-ai-dla-firm': {
    id: 'automatyzacja-ai-dla-firm',
    path: '/automatyzacja-ai-dla-firm',
    metadata: base(
      'Automatyzacja AI dla firm — wdrożenia SmartWeave',
      'Automatyzacja AI dla firm: workflowy, integracje i agenci AI. Oszczędność czasu, mniej błędów, skalowanie bez etatów. SmartWeave łączy branding z systemami.',
      '/automatyzacja-ai-dla-firm',
    ),
    h1: 'Automatyzacja AI dla firm',
    lead:
      'Łączymy identyfikację wizualną i doświadczenie projektowe z wdrożeniami AI oraz automatyzacją procesów. Dla właścicieli firm i zespołów operacyjnych oznacza to jedno: powtarzalna praca idzie do systemu, a ludzie skupiają się na relacjach, sprzedaży i rozwoju.',
    blocks: [
      {
        heading: 'Co rozumiemy przez automatyzację AI?',
        paragraphs: [
          'Chodzi o zestaw narzędzi i procesów, w których sztuczna inteligencja wspiera lub przejmuje etapy wymagające języka naturalnego, klasyfikacji danych lub szybkiej reakcji — od pierwszej odpowiedzi klientowi po wyciąganie informacji z dokumentów. Równolegle stosujemy klasyczne automatyzacje (Make, n8n, API), gdzie reguły i integracje muszą być przewidywalne i audytowalne.',
          'Dzięki temu możesz zacząć od jednego, mierzalnego procesu — np. formularz → CRM z kwalifikacją — i rozszerzać zakres, gdy widzisz efekt w czasie i kosztach.',
        ],
      },
      {
        heading: 'Dlaczego warto robić to z partnerem, który zna też branding?',
        paragraphs: [
          'Komunikacja z klientem (strona, maile, chatbot) musi brzmieć jak Twoja marka. Automatyzacja AI bez spójnego tonu i design systemu generuje tarcie: technicznie działa, biznesowo osłabia zaufanie. W SmartWeave projektujemy ścieżki tak, by automatyzacja wspierała wizerunek, a nie go rozjeżdżała.',
        ],
      },
    ],
  },
  'automatyzacja-procesow-biznesowych': {
    id: 'automatyzacja-procesow-biznesowych',
    path: '/automatyzacja-procesow-biznesowych',
    metadata: base(
      'Automatyzacja procesów biznesowych — integracje i workflowy',
      'Automatyzacja procesów biznesowych: synchronizacja systemów, raporty, powiadomienia. Mniej ręcznej pracy, mniej błędów. SmartWeave — od analizy do wdrożenia.',
      '/automatyzacja-procesow-biznesowych',
    ),
    h1: 'Automatyzacja procesów biznesowych',
    lead:
      'Powtarzalne kroki — przenoszenie danych między arkuszami, CRM a pocztą, ręczne przypomnienia i raporty — kosztują czas i prowadzą do pomyłek. Projektujemy i wdrażamy automatyzację procesów biznesowych tak, by przepływ informacji był ciągły, a zespół widział efekt od pierwszego wdrożonego scenariusza.',
    blocks: [
      {
        heading: 'Typowe obszary automatyzacji',
        paragraphs: [
          'Formularze i leady, obiegi zatwierdzeń, faktury i powiadomienia, raporty zbiorcze z wielu źródeł, synchronizacja zamówień z narzędziami sprzedażowymi — to przykłady procesów, które dobrze się skalują, gdy opiszesz je raz, a potem powtarza system.',
          'W razie potrzeby łączymy ten fundament z warstwą AI — np. wstępna kwalifikacja treści zgłoszenia czy ekstrakcja pól z załączników — zawsze w granicach, które ustalasz z zespołem.',
        ],
      },
      {
        heading: 'Jak zacząć',
        paragraphs: [
          'Krótka rozmowa o tym, co dziś zajmuje najwięcej czasu, wystarczy, by wskazać pierwszy proces do automatyzacji. Proponujemy zakres, narzędzia i harmonogram; po uruchomieniu mierzysz czas i błędy, a my pomagamy rozszerzać automatyzację dalej.',
        ],
      },
    ],
  },
  'ai-w-marketingu-i-sprzedazy': {
    id: 'ai-w-marketingu-i-sprzedazy',
    path: '/ai-w-marketingu-i-sprzedazy',
    metadata: base(
      'AI w marketingu i sprzedaży — agenci, chatboty, leady',
      'AI w marketingu i sprzedaży: szybsza pierwsza odpowiedź, kwalifikacja leadów, chatboty i agenci AI zintegrowani z CRM. SmartWeave.',
      '/ai-w-marketingu-i-sprzedazy',
    ),
    h1: 'AI w marketingu i sprzedaży',
    lead:
      'Marketing i sprzedaż to miejsca, gdzie opóźnienie w odpowiedzi albo ręczne przekazywanie leadów bezpośrednio kosztuje konwersję. Agenci AI i inteligentne chatboty — spięte z Twoją ofertą i CRM — skracają czas reakcji i porządkują dane, które i tak musiałyby trafić do handlowców.',
    blocks: [
      {
        heading: 'Co można wdrożyć praktycznie',
        paragraphs: [
          'Pierwsza odpowiedź na stronie lub w mailu, baza FAQ zsynchronizowana z materiałami sprzedażowymi, scenariusze zbierania informacji przed rozmową z handlowcem, przekazywanie „gotowego” leadu do CRM — to elementy, które realnie odciążają zespół i podnoszą przepustowość bez zatrudniania kolejnych osób na pierwszą linię.',
          'Warstwa wizualna i komunikacji (tone of voice) powinna być spójna z identyfikacją marki — dlatego przy tych wdrożeniach korzystamy z tego samego doświadczenia, co przy projektach brandingowych i stronach www.',
        ],
      },
      {
        heading: 'Powiązane usługi',
        paragraphs: [
          'Szczegóły techniczne i przykłady znajdziesz na stronach: agenci AI, chatboty oraz automatyzacja procesów. Możemy też połączyć kilka elementów w jeden przepływ — od pierwszego kontaktu klienta po zapis w systemie.',
        ],
      },
    ],
  },
  'automatyzacja-ai-wroclaw': {
    id: 'automatyzacja-ai-wroclaw',
    path: '/automatyzacja-ai-wroclaw',
    metadata: base(
      'Automatyzacja AI Wrocław — wdrożenia dla firm | SmartWeave',
      'Automatyzacja AI we Wrocławiu i online: procesy, integracje, agenci AI. Oszczędność czasu dla firm z Dolnego Śląska. Konsultacja zdalnie lub lokalnie.',
      '/automatyzacja-ai-wroclaw',
    ),
    h1: 'Automatyzacja AI Wrocław',
    lead:
      'Obsługujemy firmy z Wrocławia i całej Polski — większość wdrożeń prowadzimy zdalnie, z pełnym onboardingiem i dokumentacją. Jeśli szukasz partnera od automatyzacji AI we Wrocławiu lub okolicach, zaczynamy od krótkiej analizy procesów i jednego pilotażowego scenariusza.',
    blocks: [
      {
        heading: 'Dlaczego lokalne słowo kluczowe ma sens przy B2B',
        paragraphs: [
          'Wiele firm wciąż wpisuje w wyszukiwarkę miasto, żeby znaleźć wykonawcę „w zasięgu”. Dla nas ważniejsza jest jednak zdolność do pracy na Twoich systemach i języku biznesu — stąd oferta jest ta sama co w całej Polsce, a spotkania możliwe tam, gdzie ma to sens operacyjny.',
        ],
      },
    ],
  },
  'automatyzacja-procesow-warszawa': {
    id: 'automatyzacja-procesow-warszawa',
    path: '/automatyzacja-procesow-warszawa',
    metadata: base(
      'Automatyzacja procesów Warszawa — firmy i zespoły | SmartWeave',
      'Automatyzacja procesów biznesowych w Warszawie i zdalnie. Workflowy, integracje CRM, raporty. SmartWeave — branding + automatyzacja.',
      '/automatyzacja-procesow-warszawa',
    ),
    h1: 'Automatyzacja procesów Warszawa',
    lead:
      'Zespoły w Warszawie i centrali często mają największy wolumen powtarzalnych operacji — stąd największy zwrot z automatyzacji procesów biznesowych. Pomagamy zmapować przepływy, wybrać narzędzia i wdrożyć pierwszy proces, potem skalować na kolejne działy.',
    blocks: [
      {
        heading: 'Co oferujemy firmom ze stolicy i okolic',
        paragraphs: [
          'Integracje między narzędziami, automatyczne powiadomienia i raporty, scenariusze sprzedażowe i operacyjne — zawsze z naciskiem na mierzalny efekt. Pracujemy zdalnie z pełną transparentnością postępu; konsultacje możemy dopasować do Twojego trybu pracy.',
        ],
      },
    ],
  },
  'ai-dla-firm-krakow': {
    id: 'ai-dla-firm-krakow',
    path: '/ai-dla-firm-krakow',
    metadata: base(
      'AI dla firm Kraków — agenci, automatyzacja, strony | SmartWeave',
      'AI dla firm w Krakowie i online: agenci AI, chatboty, automatyzacja procesów, strony www. SmartWeave łączy design z wdrożeniami AI.',
      '/ai-dla-firm-krakow',
    ),
    h1: 'AI dla firm Kraków',
    lead:
      'Kraków to silny ośrodek biznesu i technologii — firmy stąd często łączą rozwój produktu z potrzebą porządnej komunikacji wizualnej i automatyzacji zaplecza. Dostarczamy AI dla firm (agenci, automatyzacja, integracje) oraz spójny branding i strony, żeby całość działała jak jeden system.',
    blocks: [
      {
        heading: 'Jak zacząć współpracę',
        paragraphs: [
          'Napisz lub umów krótką rozmowę — w 15–30 minut jesteśmy w stanie wskazać obszary, w których AI i automatyzacja najszybciej zwrócą się w czasie zespołu. Następnie proponujemy konkretny pierwszy krok wdrożeniowy.',
        ],
      },
    ],
  },
};

export const SEO_LANDING_IDS = Object.keys(SEO_LANDINGS) as SeoLandingId[];

export function getSeoLanding(id: SeoLandingId): SeoLandingDefinition {
  return SEO_LANDINGS[id];
}
