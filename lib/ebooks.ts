/**
 * E-books available for purchase. buyUrl can be Calendly, payment link, or /#contact for contact form.
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
  /** URL for "Kup" button - e.g. Calendly, Stripe, or /#contact */
  buyUrl: string;
  /** Optional direct download URL for the EPUB file. When set and not protected, the main CTA becomes "Pobierz e-book". */
  downloadUrl?: string;
  /** When true, download is served via API and requires password (EBOOK_DOWNLOAD_PASSWORD). */
  protected?: boolean;
};

export const EBOOKS: Ebook[] = [
  {
    id: 'firma-w-erze-ai',
    title: 'Firma w Erze AI',
    description: 'SmartWeave – jak budować firmę w erze sztucznej inteligencji. Praktyczne podejście do wdrożeń i strategii',
    modalDescription: `Żyjemy w przełomowym momencie. AI nie jest już przewagą – staje się warunkiem przetrwania na rynku. Pytanie nie brzmi „czy wdrożyć AI", ale „od czego zacząć".

Firma w Erze AI to 77-stronicowy przewodnik stworzony z myślą o polskich przedsiębiorcach, menedżerach i liderach MŚP, którzy chcą przeprowadzić swoją organizację przez cyfrową transformację – krok po kroku, bez chaosu.

W e-booku znajdziesz:

Test gotowości AI i diagnozę barier w Twojej firmie
Strategię i roadmapę AI dopasowaną do MŚP
Automatyzację procesów w Make.com – gotowe schematy do skopiowania
Agenta AI opartego na GPT-4o do obsługi e-maili
AI w marketingu, sprzedaży, HR i finansach
Etykę AI i wymagania europejskiego AI Act
12-tygodniowy plan wdrożenia z checklistami, KPIs i kalkulatorem ROI

Oszczędź 5–8 godzin tygodniowo już po pierwszym weekendzie wdrożenia.`,
    price: '89 zł',
    image: '/assets/ebook-firma-w-erze-ai.png',
    gradient: 'from-indigo-500 to-violet-600',
    buyUrl: '/#contact',
    protected: true,
  },
];
