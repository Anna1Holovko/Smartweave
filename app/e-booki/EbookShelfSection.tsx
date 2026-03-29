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
};

function ShelfTile({ book, featured }: TileProps) {
  const [detailOpen, setDetailOpen] = useState(false);

  return (
    <>
      <div className="relative flex flex-col items-center">
        <div
          className="group relative w-full max-w-[240px] mx-auto aspect-square cursor-pointer rounded-xl overflow-hidden bg-white shadow-[0_16px_48px_rgba(15,23,42,0.12),0_4px_12px_rgba(15,23,42,0.06)] ring-1 ring-black/[0.04]"
          role="button"
          tabIndex={0}
          onClick={() => setDetailOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setDetailOpen(true);
            }
          }}
          aria-label={`${book.title} - otwórz szczegóły`}
        >
          {featured && (
            <div className="absolute left-3 top-3 z-20 flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-white/90 text-[0.55rem] font-bold uppercase leading-tight text-zinc-800 shadow-md backdrop-blur-sm">
              <span className="px-1.5 text-center">Nowa pozycja</span>
            </div>
          )}

          {book.image ? (
            <Image
              src={book.image}
              alt=""
              fill
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

          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-90 transition-opacity duration-300 group-hover:from-black/65 max-sm:from-black/60" />

          <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-center gap-2 p-3 sm:inset-0 sm:items-center sm:justify-center sm:gap-3 sm:p-4 opacity-100 transition-all duration-300 sm:opacity-0 sm:group-hover:opacity-100">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                addEbookToCart(book.id);
                requestOpenCartDrawer();
              }}
              className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-zinc-900 shadow-md transition hover:bg-zinc-50 sm:text-sm"
            >
              Do koszyka
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setDetailOpen(true);
              }}
              className="rounded-full border border-white/40 bg-white/15 px-4 py-2 text-xs font-semibold text-white shadow-md backdrop-blur-md transition hover:bg-white/25 sm:text-sm"
            >
              Szczegóły
            </button>
          </div>
        </div>
      </div>

      <EbookDetailModal book={book} open={detailOpen} onClose={() => setDetailOpen(false)} />
    </>
  );
}

function ShelfRow({ books, shelfIndex }: { books: Ebook[]; shelfIndex: number }) {
  const single = books.length === 1;
  const gridClass = single
    ? 'grid grid-cols-1 justify-items-center'
    : 'grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 lg:gap-10';

  return (
    <div className="mb-14 sm:mb-20 last:mb-0">
      <div className={`${gridClass} px-1 sm:px-2`}>
        {books.map((book, i) => (
          <ShelfTile key={book.id} book={book} featured={shelfIndex === 0 && i === 0} />
        ))}
      </div>

      <div
        className="relative mx-1 mt-8 h-3.5 rounded-sm bg-white shadow-[0_12px_32px_rgba(15,23,42,0.14)] ring-1 ring-zinc-200/90 sm:mx-4 sm:h-4"
        aria-hidden
      />

      <div
        className={`${gridClass} mt-10 border-t border-zinc-300/70 pt-8`}
        role="list"
        aria-label="Spis publikacji"
      >
        {books.map((book) => (
          <div key={`${book.id}-idx`} className="text-center sm:text-left" role="listitem">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.14em] text-zinc-500 sm:text-xs">
              {book.editionLabel ?? 'SmartWeave'}
            </p>
            <p className="mt-1.5 text-sm font-semibold leading-snug text-zinc-900 sm:text-base">{book.title}</p>
            <p className="mt-1 text-xs text-zinc-600">{book.price}</p>
          </div>
        ))}
      </div>
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
      <div
        className="relative overflow-hidden rounded-[1.75rem] border border-zinc-200/80 bg-zinc-100 px-4 py-12 shadow-[0_24px_80px_rgba(0,0,0,0.2)] sm:px-8 sm:py-16 lg:px-12 lg:py-20"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(255,255,255,0.85), transparent), linear-gradient(180deg, #f4f4f5 0%, #e4e4e7 100%)',
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2240%22%20height=%2240%22%20viewBox=%220%200%2040%2040%22%3E%3Cg%20fill=%22%23000%22%20fill-opacity=%220.02%22%3E%3Cpath%20d=%22M0%2040h40v1H0zM0%200h1v40H0z%22/%3E%3C/g%3E%3C/svg%3E')]" />

        <div className="relative mx-auto max-w-5xl">
          <header className="mb-12 text-center sm:mb-16">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-zinc-500 sm:text-xs">
              Katalog cyfrowy
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl md:text-4xl">
              Półka z publikacjami
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-zinc-600 sm:text-base">
              Okładki jak albumy - wybierz pozycję, zobacz opis albo dodaj do koszyka.
            </p>
          </header>

          {rows.map((row, idx) => (
            <ShelfRow key={idx} books={row} shelfIndex={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}
