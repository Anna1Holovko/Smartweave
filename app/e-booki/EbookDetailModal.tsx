'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import type { Ebook } from '@/lib/ebooks';
import { EbookCheckoutButton } from './EbookCheckoutButton';

type Props = {
  book: Ebook;
  open: boolean;
  onClose: () => void;
};

export function EbookDetailModal({ book, open, onClose }: Props) {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseRef.current();
    };
    document.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  if (!open) return null;

  return (
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
      onClick={onClose}
    >
      <div
        className="relative flex min-h-0 w-full max-w-3xl flex-1 flex-col overflow-hidden rounded-none p-6 sm:p-8 sm:mx-auto sm:my-auto sm:h-[min(92dvh,90vh)] sm:max-h-[min(92dvh,90vh)] sm:flex-none sm:rounded-2xl glass-card shadow-xl"
        style={{ background: 'var(--bg-graphite-card)', backdropFilter: 'blur(16px)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
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

        <div className="flex-shrink-0 border-t border-white/10 pt-4 mt-4 sm:pt-5 sm:mt-5" onClick={(e) => e.stopPropagation()}>
          <EbookCheckoutButton book={book} />
        </div>
      </div>
    </div>
  );
}
