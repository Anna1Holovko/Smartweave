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
    id: 'firma-w-erze-ai',
    title: 'Firma w Erze AI',
    description: 'SmartWeave – jak budować firmę w erze sztucznej inteligencji. Praktyczne podejście do wdrożeń i strategii',
    price: '89 zł',
    image: '/smartweave-v2/assets/ebook-firma-w-erze-ai.png',
    gradient: 'from-indigo-500 to-violet-600',
    buyUrl: '/#contact',
    protected: true,
  },
];
