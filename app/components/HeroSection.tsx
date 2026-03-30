'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from './ui/Button';
import { BrandMarkIcon } from './BrandMarkIcon';
import { CALENDLY_URL } from '@/lib/site';

const phrases = [
  'odzyskać czas',
  'uprościć procesy',
  'zredukować chaos',
  'uniknąć błędów',
  'zyskać spokój',
  'rozwiązać problemy',
  'zyskać efektywność',
];

const gridStyle = {
  backgroundImage:
    'linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)',
  backgroundSize: '48px 48px',
  maskImage:
    'linear-gradient(to right, transparent 0%, black 28%, black 72%, transparent 100%)',
  WebkitMaskImage:
    'linear-gradient(to right, transparent 0%, black 28%, black 72%, transparent 100%)',
};

export function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      aria-label="SmartWeave - Automatyzacja procesów, AI, systemy cyfrowe i branding"
      className="relative min-h-[100dvh] min-h-screen flex items-center justify-center overflow-hidden px-4 pt-20 pb-16 sm:px-6 sm:pt-28 sm:pb-24 lg:pt-24 lg:pb-20 lg:px-8 xl:pt-20 xl:pb-16 xl:px-10 2xl:px-12 3xl:px-16"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--bg-graphite)]" />

      {/* Ambient glows */}
      <div
        className="absolute left-1/2 top-[42%] w-[min(120vw,920px)] h-[min(120vw,920px)] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px] opacity-[0.45]"
        style={{ background: 'radial-gradient(circle, rgba(216,241,123,0.2) 0%, transparent 68%)' }}
      />
      <div
        className="absolute right-0 top-1/4 w-[min(80vw,520px)] h-[min(80vw,520px)] translate-x-1/4 blur-[120px] opacity-30 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)' }}
      />

      {/* Grid */}
      <div className="absolute inset-0" style={gridStyle} />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl xl:max-w-5xl 2xl:max-w-6xl flex flex-col items-center text-center">
        {/* Headline */}
        <h1
          className="text-[var(--text-primary)] font-bold tracking-tight leading-[1.08]"
          style={{ fontSize: 'var(--text-display)' }}
        >
          Pomożemy Ci{' '}
          <span
            className="inline-block my-2 pb-1"
            style={{ fontSize: 'clamp(2.2rem, 6.5vw, 7.5rem)' }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
                transition={{ duration: 0.4 }}
                className="inline-block whitespace-nowrap font-bold text-gradient-accent leading-[1.35] pb-0.5"
                aria-live="polite"
              >
                {phrases[index]}
              </motion.span>
            </AnimatePresence>
          </span>{' '}
          <span className="whitespace-nowrap">
            w codziennej pracy
          </span>
        </h1>

        {/* Description */}
        <p className="text-[var(--text-secondary)] text-base sm:text-xl mt-6 max-w-[80ch] leading-relaxed w-full">
          Automatyzujemy to, co powtarzalne - Ty weryfikujesz rezultaty. Tworzymy strony internetowe gotowe na AI, abyś mógł skupić się na tym, co naprawdę ważne.
        </p>
        <p className="text-zinc-500 text-sm sm:text-base mt-3 mb-10" aria-hidden="true">
          Automatyzacja procesów · Agenci AI · Systemy cyfrowe · Branding · Strony www
        </p>

        <div className="flex flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 w-full mx-auto">
          {CALENDLY_URL ? (
            <>
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" className="whitespace-nowrap">
                  Umów krótką rozmowę
                </Button>
              </a>
              <Link href="/#contact">
                <Button variant="secondary" className="whitespace-nowrap">
                  Napisz do nas
                </Button>
              </Link>
            </>
          ) : (
            <Link href="/#contact">
              <Button variant="primary" className="whitespace-nowrap">
                Umów krótką rozmowę
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-7 h-11 rounded-full border border-[#d8f17b]/50 flex items-start justify-center p-1"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-2 rounded-full bg-[#d8f17b]"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
