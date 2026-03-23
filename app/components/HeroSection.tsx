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
    'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
  backgroundSize: '64px 64px',
  maskImage:
    'linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%)',
  WebkitMaskImage:
    'linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%)',
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
      aria-label="SmartWeave - Design i automatyzacja"
      className="relative min-h-[100dvh] min-h-screen flex items-center justify-center overflow-hidden px-4 pt-20 pb-16 sm:px-6 sm:pt-28 sm:pb-24 lg:pt-24 lg:pb-20 lg:px-8 xl:pt-20 xl:pb-16 xl:px-10 2xl:px-12 3xl:px-16"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--bg-graphite)]" />

      {/* Glow */}
      <div className="absolute left-1/2 top-1/2 w-[1000px] h-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[180px] opacity-30" style={{ background: 'var(--accent-glow)' }} />

      {/* Grid */}
      <div className="absolute inset-0" style={gridStyle} />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto">
        {/* Badge */}
        <p className="inline-flex items-center justify-center gap-2 mb-8 text-sm font-medium text-[#d8f17b]">
          <BrandMarkIcon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
          Design & Automatyzacja
        </p>

        {/* Headline */}
        <h1
          className="text-[#e4e4e7] font-bold tracking-tight leading-[1.1]"
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
                className="inline-block whitespace-nowrap font-bold text-[#d8f17b] leading-[1.35] pb-0.5"
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
        <p className="text-zinc-400 text-base sm:text-xl mx-auto mt-6 max-w-[80ch] leading-relaxed px-2">
          Automatyzujemy to, co powtarzalne - Ty weryfikujesz rezultaty. Tworzymy strony internetowe gotowe na AI, abyś mógł skupić się na tym, co naprawdę ważne
        </p>
        <p className="text-zinc-500 text-sm sm:text-base mx-auto mt-3 mb-10 px-2" aria-hidden="true">
          Automatyzacja procesów biznesowych • Agenci AI • Strony internetowe
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link href="/#contact">
            <Button variant="primary" className="sm:w-auto">
              Napisz do nas
            </Button>
          </Link>
          {CALENDLY_URL && (
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm sm:text-base transition-all h-12 min-h-12 px-6 sm:px-8 bg-transparent border-2 border-white/15 text-[#e4e4e7] hover:border-[#d8f17b]/50 hover:bg-white/5"
            >
              Umów spotkanie
            </a>
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
