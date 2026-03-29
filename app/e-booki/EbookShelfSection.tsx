'use client';

import { useState } from 'react';
import Image from 'next/image';
import { BookOpen } from 'lucide-react';
import type { Ebook } from '@/lib/ebooks';
import { addEbookToCart, requestOpenCartDrawer } from '@/lib/cart';
import { EbookDetailModal } from './EbookDetailModal';

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

type TileProps = {
  book: Ebook;
  featured?: boolean;
  imagePriority?: boolean;
  onOpenDetails: () => void;
  onAddToCart: () => void;
};

function ShelfTile({ book, featured, imagePriority, onOpenDetails, onAddToCart }: TileProps) {
  return (
    <div className="relative flex flex-col items-center">
      <div
        className="group relative w-full max-w-[240px] mx-auto aspect-square cursor-pointer rounded-xl overflow-hidden bg-transparent shadow-[0_20px_50px_rgba(0,0,0,0.45),0_4px_16px_rgba(0,0,0,0.25)] ring-1 ring-white/12"
        role="button"
        tabIndex={0}
        onClick={onOpenDetails}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onOpenDetails();
          }
        }}
        aria-label={`${book.title} - otwórz szczegóły`}
      >
        {featured && (
          <div className="absolute left-3 top-3 z-20 flex h-16 w-16 items-center justify-center rounded-full border border-black/15 bg-[#d8f17b] text-[0.55rem] font-bold uppercase leading-tight text-zinc-900 shadow-lg shadow-black/25">
            <span className="px-1.5 text-center">Nowa pozycja</span>
          </div>
        )}

        {book.image ? (
          <Image
            src={book.image}
            alt={book.title}
            fill
            priority={imagePriority}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 639px) 45vw, 200px"
          />
        ) : (
          <div
            className={`absolute inset-0 bg-gradient-to-br ${book.gradient} flex items-center justify-center`}
          >
            <BookOpen className="w-14 h-14 text-white/85" aria-hidden />
          </div>
        )}

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-90 transition-opacity duration-300 group-hover:from-black/65 max-sm:from-black/60"
          aria-hidden
        />

        <div className="absolute inset-x-0 bottom-0 z-10 flex flex-wrap items-center justify-center gap-2 bg-gradient-to-t from-black/75 via-black/40 to-transparent p-3 pt-10 sm:p-4 sm:pt-12">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}
            className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-zinc-900 shadow-md transition hover:bg-zinc-50 sm:text-sm"
          >
            Do koszyka
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails();
            }}
            className="rounded-full border border-white/40 bg-white/15 px-4 py-2 text-xs font-semibold text-white shadow-md backdrop-blur-md transition hover:bg-white/25 sm:text-sm"
          >
            Szczegóły
          </button>
        </div>
      </div>
    </div>
  );
}

function ShelfRow({ books, shelfIndex }: { books: Ebook[]; shelfIndex: number }) {
  const [detailBookId, setDetailBookId] = useState<string | null>(null);
  const detailBook = detailBookId ? books.find((b) => b.id === detailBookId) : undefined;

  const single = books.length === 1;
  const gridClass = single
    ? 'grid grid-cols-1 justify-items-center'
    : 'grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 lg:gap-10';

  return (
    <div className="mb-14 sm:mb-20 last:mb-0">
      <div className={`${gridClass} px-1 sm:px-2`}>
        {books.map((book, i) => (
          <ShelfTile
            key={book.id}
            book={book}
            featured={shelfIndex === 0 && i === 0}
            imagePriority={shelfIndex === 0 && i === 0}
            onOpenDetails={() => setDetailBookId(book.id)}
            onAddToCart={() => {
              addEbookToCart(book.id);
              requestOpenCartDrawer();
            }}
          />
        ))}
      </div>

      <div className="relative mx-1 mt-8 sm:mx-4" aria-hidden>
        <div className="h-3.5 rounded-sm bg-[#d8f17b] shadow-[0_14px_32px_rgba(0,0,0,0.5),0_6px_16px_rgba(216,241,123,0.12)] ring-1 ring-black/25 sm:h-4" />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2 rounded-b-sm bg-gradient-to-b from-black/20 to-transparent"
          aria-hidden
        />
      </div>

      <div
        className={`${gridClass} mt-10 border-t border-white/10 pt-8 gap-y-8`}
        role="list"
        aria-label="Spis publikacji"
      >
        {books.map((book) => (
          <div
            key={`${book.id}-idx`}
            className="flex flex-col items-center text-center sm:items-start sm:text-left gap-3"
            role="listitem"
          >
            <div>
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.14em] text-zinc-500 sm:text-xs">
                {book.editionLabel ?? 'SmartWeave'}
              </p>
              <p className="mt-1.5 text-sm font-semibold leading-snug text-[#e4e4e7] sm:text-base">{book.title}</p>
              <p className="mt-1 text-xs text-zinc-400">{book.price}</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <button
                type="button"
                onClick={() => {
                  addEbookToCart(book.id);
                  requestOpenCartDrawer();
                }}
                className="rounded-full bg-[#d8f17b] px-4 py-2 text-xs font-semibold text-zinc-900 shadow-md transition hover:bg-[#c5e066] sm:text-sm"
              >
                Do koszyka
              </button>
              <button
                type="button"
                onClick={() => setDetailBookId(book.id)}
                className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold text-[#e4e4e7] transition hover:border-[#d8f17b]/50 hover:bg-white/10 sm:text-sm"
              >
                Szczegóły
              </button>
            </div>
          </div>
        ))}
      </div>

      {detailBook && (
        <EbookDetailModal
          book={detailBook}
          open={Boolean(detailBook)}
          onClose={() => setDetailBookId(null)}
        />
      )}
    </div>
  );
}

type Props = {
  books: Ebook[];
};

export function EbookShelfSection({ books }: Props) {
  const rows = chunk(books, 4);

  return (
    <div className="relative mt-6 sm:mt-10">
      <div className="relative mx-auto max-w-5xl px-0 py-2 sm:py-4">
        {rows.map((row, idx) => (
          <ShelfRow key={idx} books={row} shelfIndex={idx} />
        ))}
      </div>
    </div>
  );
}
