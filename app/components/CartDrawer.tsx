'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import {
  CART_UPDATE_EVENT,
  getCartLines,
  getCartSubtotalPln,
  incrementLine,
  decrementLine,
  removeLine,
} from '@/lib/cart';

const pln = new Intl.NumberFormat('pl-PL', {
  style: 'currency',
  currency: 'PLN',
  maximumFractionDigits: 0,
});

type Props = {
  open: boolean;
  onClose: () => void;
};

export function CartDrawer({ open, onClose }: Props) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const [, setBump] = useState(0);
  const forceUpdate = () => setBump((n) => n + 1);

  useEffect(() => {
    const onCart = () => forceUpdate();
    window.addEventListener(CART_UPDATE_EVENT, onCart);
    return () => window.removeEventListener(CART_UPDATE_EVENT, onCart);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  const lines = getCartLines();
  const subtotal = getCartSubtotalPln();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Zamknij koszyk"
            className="fixed inset-0 z-[200] bg-black/55 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Mobile: bottom sheet / Desktop: right drawer */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-drawer-title"
            className="fixed z-[201] top-0 right-0 bottom-0 left-0 sm:left-auto w-full sm:max-w-md flex flex-col sm:rounded-l-2xl border border-white/10 border-t-0 sm:border-t shadow-2xl overflow-hidden max-h-[100dvh]"
            style={{ background: 'var(--bg-2)' }}
            initial={{ x: '100%', opacity: 0.96 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0.96 }}
            transition={{ type: 'spring', damping: 30, stiffness: 340 }}
          >
            {/* Mobile top handle — swipe affordance (tap outside / Esc still primary) */}
            <div className="sm:hidden flex justify-center pt-2 pb-1" aria-hidden>
              <div className="w-10 h-1 rounded-full bg-white/20" />
            </div>

            <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-4 border-b border-white/10">
              <div className="min-w-0">
                <h2 id="cart-drawer-title" className="text-lg font-semibold text-[#e4e4e7] truncate">
                  Koszyk
                </h2>
                <p className="text-xs text-zinc-500 mt-0.5">E-booki — podsumowanie przed zakupem</p>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={onClose}
                className="shrink-0 p-2.5 rounded-xl text-zinc-400 hover:text-[#e4e4e7] hover:bg-white/5 transition-colors"
                aria-label="Zamknij"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-5 py-4 min-h-0">
              {lines.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-16 px-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#d8f17b]/10 border border-[#d8f17b]/20 flex items-center justify-center mb-4">
                    <ShoppingBag className="w-8 h-8 text-[#d8f17b]" aria-hidden />
                  </div>
                  <p className="text-[#e4e4e7] font-medium mb-1">Koszyk jest pusty</p>
                  <p className="text-sm text-zinc-500 mb-6 max-w-xs">
                    Dodaj e-booki na stronie E-booki — wrócimy tu z podsumowaniem i ceną.
                  </p>
                  <Link
                    href="/e-booki"
                    onClick={onClose}
                    className="inline-flex items-center justify-center rounded-full font-semibold text-sm h-11 px-6 cta-gradient-animated"
                  >
                    Przeglądaj e-booki
                  </Link>
                </div>
              ) : (
                <ul className="space-y-3">
                  {lines.map((line) => (
                    <li
                      key={line.id}
                      className="flex gap-3 p-3 rounded-xl border border-white/10 bg-white/[0.03]"
                    >
                      <div className="relative w-[72px] h-[92px] shrink-0 rounded-lg overflow-hidden bg-white/5 border border-white/10">
                        {line.image ? (
                          <Image src={line.image} alt="" fill className="object-cover" sizes="72px" />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-zinc-700 to-zinc-900" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col">
                        <p className="font-medium text-[#e4e4e7] text-sm leading-snug line-clamp-2">
                          {line.title}
                        </p>
                        <p className="text-xs text-zinc-500 mt-1">
                          Cena: <span className="text-zinc-400">{line.priceLabel}</span> za szt.
                        </p>
                        <div className="flex items-center justify-between gap-2 mt-auto pt-3">
                          <div className="inline-flex items-center rounded-full border border-white/15 bg-black/20 p-0.5">
                            <button
                              type="button"
                              className="w-9 h-9 rounded-full flex items-center justify-center text-zinc-300 hover:bg-white/10 hover:text-[#d8f17b] transition-colors disabled:opacity-40"
                              aria-label="Zmniejsz ilość"
                              disabled={line.quantity <= 1}
                              onClick={() => {
                                decrementLine(line.id);
                                forceUpdate();
                              }}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="min-w-[2rem] text-center text-sm font-semibold text-[#e4e4e7] tabular-nums">
                              {line.quantity}
                            </span>
                            <button
                              type="button"
                              className="w-9 h-9 rounded-full flex items-center justify-center text-zinc-300 hover:bg-white/10 hover:text-[#d8f17b] transition-colors"
                              aria-label="Zwiększ ilość"
                              onClick={() => {
                                incrementLine(line.id);
                                forceUpdate();
                              }}
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-xs text-zinc-500">Razem</p>
                            <p className="text-sm font-semibold text-[#d8f17b] tabular-nums">
                              {pln.format(line.lineTotalPln)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="self-start p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        aria-label={`Usuń ${line.title} z koszyka`}
                        onClick={() => {
                          removeLine(line.id);
                          forceUpdate();
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {lines.length > 0 && (
              <div className="border-t border-white/10 px-4 sm:px-5 py-4 space-y-3 bg-black/20">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-zinc-500">Suma</p>
                    <p className="text-2xl font-bold text-[#e4e4e7] tabular-nums">{pln.format(subtotal)}</p>
                    <p className="text-xs text-zinc-500 mt-1">Ceny brutto • e-booki cyfrowe</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Link
                    href="/e-booki"
                    onClick={onClose}
                    className="flex-1 inline-flex items-center justify-center rounded-full font-semibold text-sm h-11 px-4 border border-white/15 text-[#e4e4e7] hover:bg-white/5 transition-colors"
                  >
                    Kontynuuj zakupy
                  </Link>
                  <Link
                    href="/#contact"
                    onClick={onClose}
                    className="flex-1 inline-flex items-center justify-center rounded-full font-semibold text-sm h-11 px-4 cta-gradient-animated"
                  >
                    Zamów / kontakt
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
