/**
 * E-books available for purchase. buyUrl can be Calendly, payment link, or /#contact for contact form.
 */
export type Ebook = {
  id: string;
  title: string;
  description: string;
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
    id: 'jak-przygotowac-firme-na-ai-w-20',
    title: 'Jak przygotować firmę na AI w 20 krokach',
    description: 'Praktyczny przewodnik po wdrażaniu AI w firmie. Od strategii po pierwsze wdrożenia – konkretne kroki',
    price: 'Bezpłatny',
    gradient: 'from-violet-500 to-purple-600',
    buyUrl: '/#contact',
    protected: true,
  },
  {
    id: 'placeholder',
    title: 'E-book w przygotowaniu',
    description: 'Wkrótce w sprzedaży - e-booki dla firm: lead magnet, edukacja, budowanie autorytetu',
    price: '—',
    gradient: 'from-amber-500 to-orange-500',
    buyUrl: '/#contact',
  },
];
