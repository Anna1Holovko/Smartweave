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
};

export const EBOOKS: Ebook[] = [
  {
    id: 'placeholder',
    title: 'E-book w przygotowaniu',
    description: 'Wkrótce w sprzedaży - profesjonalne e-booki dla firm: lead magnet, edukacja, budowanie autorytetu. Zapytaj o dostęp.',
    price: '—',
    gradient: 'from-amber-500 to-orange-500',
    buyUrl: '/#contact',
  },
];
