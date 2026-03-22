'use client';

import { ShoppingCart } from 'lucide-react';
import type { Ebook } from '@/lib/ebooks';
import { addEbookToCart, requestOpenCartDrawer } from '@/lib/cart';

type Props = { book: Ebook };

/**
 * Jedyna akcja zakupowa na stronie: dodanie do koszyka (checkout).
 * Brak pobierania pliku z przeglądarki — plik nie jest serwowany przez publiczne API.
 */
export function EbookCheckoutButton({ book }: Props) {
  return (
    <button
      type="button"
      onClick={() => {
        addEbookToCart(book.id);
        requestOpenCartDrawer();
      }}
      className="inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-full font-semibold text-sm sm:text-base transition-all h-12 min-h-12 px-6 sm:px-8 cta-gradient-animated"
    >
      <ShoppingCart className="w-4 h-4" aria-hidden />
      Dodaj do koszyka
    </button>
  );
}
