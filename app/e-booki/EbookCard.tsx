'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { BookOpen, X, Info } from 'lucide-react';
import type { Ebook } from '@/lib/ebooks';
import { EbookCheckoutButton } from './EbookCheckoutButton';

type Props = { book: Ebook };

export function EbookCard({ book }: Props) {
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (!dialogOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDialogOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [dialogOpen]);

  return (
    <>
      <article
        role="button"
        tabIndex={0}
        onClick={() => setDialogOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setDialogOpen(true);
          }
        }}
        className="group relative flex flex-col rounded-2xl glass-card hover-lift overflow-hidden cursor-pointer"
        style={{ background: 'var(--bg-graphite-card)', backdropFilter: 'blur(16px)' }}
        aria-label={`Szczegóły: ${book.title}`}
      >
        <div className="relative flex-1 min-h-[200px] p-3 sm:p-4">
          <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden bg-white/5 border border-white/10 shadow-inner">
            {book.image ? (
              <Image
                src={book.image}
                alt={book.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 479px) 100vw, (max-width: 1023px) 50vw, 33.33vw"
              />
            ) : (
              <div
                className={`absolute inset-0 bg-gradient-to-br ${book.gradient} flex items-center justify-center`}
              >
                <BookOpen className="w-16 h-16 text-white/80" aria-hidden />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/60 via-transparent to-transparent" />
          </div>
        </div>
        <div className="relative bg-[var(--bg-2)] border-t border-white/10 px-4 sm:px-5 py-4 sm:py-5 flex flex-col flex-1">
          <div className="flex items-baseline justify-between gap-3 mb-2">
            <h2 className="text-xl sm:text-2xl font-bold text-[#e4e4e7] group-hover:text-[#d8f17b] transition-colors min-w-0">
              {book.title}
            </h2>
            <span className="text-xl sm:text-2xl font-bold text-[#e4e4e7] flex-shrink-0">{book.price}</span>
          </div>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed flex-1 mb-4 line-clamp-2">
            {book.description}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setDialogOpen(true);
              }}
              className="inline-flex items-center justify-center gap-2 font-medium text-sm sm:text-base text-[#d8f17b] hover:underline focus:outline-none focus:underline h-11 min-h-[44px] px-0"
            >
              <Info className="w-4 h-4 shrink-0" aria-hidden />
              <span>Szczegóły</span>
            </button>
            <div onClick={(e) => e.stopPropagation()}>
              <EbookCheckoutButton book={book} />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#d8f17b] group-hover:w-full transition-all duration-500" />
      </article>

      {dialogOpen && (
        <div
          className="fixed left-0 right-0 bottom-0 z-[60] flex min-h-0 flex-col justify-center sm:items-center sm:p-4 bg-black/70 backdrop-blur-[2px]"
          style={{
            top: 'calc(var(--top-banner-height, 0px) + 5.5rem)',
            paddingTop: 'max(1rem, env(safe-area-inset-top))',
            paddingBottom: 'max(calc(var(--top-banner-height, 0px) + 6.5rem), env(safe-area-inset-bottom))',
            paddingLeft: 'max(0px, env(safe-area-inset-left))',
            paddingRight: 'max(0px, env(safe-area-inset-right))',
          }}
          aria-modal="true"
          role="dialog"
          aria-labelledby="ebook-dialog-title"
          aria-describedby="ebook-dialog-description"
          onClick={() => setDialogOpen(false)}
        >
          <div
            className="relative flex min-h-0 w-full max-w-3xl flex-1 flex-col overflow-hidden rounded-none p-6 sm:p-8 sm:mx-auto sm:my-auto sm:h-[min(92dvh,90vh)] sm:max-h-[min(92dvh,90vh)] sm:flex-none sm:rounded-2xl glass-card shadow-xl"
            style={{ background: 'var(--bg-graphite-card)', backdropFilter: 'blur(16px)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setDialogOpen(false)}
              className="absolute top-6 right-6 sm:top-8 sm:right-8 z-20 flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-xl text-zinc-400 hover:text-[#d8f17b] hover:bg-white/5"
              aria-label="Zamknij"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain [scrollbar-gutter:stable] touch-pan-y">
              <h2 id="ebook-dialog-title" className="text-lg sm:text-2xl font-bold text-[#e4e4e7] mb-1 pr-14 sm:pr-12">
                {book.title}
              </h2>
              <p className="text-zinc-500 text-sm mb-3 sm:mb-4">{book.price}</p>
              <p
                id="ebook-dialog-description"
                className="text-zinc-300 text-sm sm:text-base leading-relaxed whitespace-pre-wrap break-words"
              >
                {book.modalDescription ?? book.description}
              </p>
            </div>

            <div
              className="flex-shrink-0 border-t border-white/10 pt-4 mt-4 sm:pt-5 sm:mt-5"
              onClick={(e) => e.stopPropagation()}
            >
              <EbookCheckoutButton book={book} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
