'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { Button } from './ui/Button';
import { CALENDLY_URL } from '@/lib/site';

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
  return (
    <section
      aria-label="SmartWeave – automatyzacja procesów AI, agenci AI, projektowanie stron www dla firm B2B"
      className="relative min-h-[100dvh] min-h-screen flex items-center justify-center overflow-hidden px-4 pt-20 pb-16 sm:px-6 sm:pt-28 sm:pb-24 lg:pt-24 lg:pb-20 lg:px-8 xl:pt-20 xl:pb-16 xl:px-10 2xl:px-12 3xl:px-16"
    >
      <div className="absolute inset-0 bg-[#0b0a18]" />
      <div className="absolute left-1/2 top-1/2 w-[1000px] h-[1000px] -translate-x-1/2 -translate-y-1/2 bg-purple-600/20 rounded-full blur-[180px]" />
      <div className="absolute inset-0" style={gridStyle} />

      <div className="relative z-10 text-center max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto">
        <p className="inline-flex items-center mb-6 sm:mb-8 px-4 py-2 rounded-full border border-purple-500/40 bg-purple-950/50 backdrop-blur-sm text-sm text-purple-200 uppercase tracking-wider">
          AI & Automatyzacja
        </p>

        <h1
          className="text-white font-bold tracking-tight leading-[1.1] px-2"
          style={{ fontSize: 'clamp(2rem, 5.5vw, 4rem)' }}
        >
          AI i automatyzacja jako przewaga strategiczna, nie gadżet.
        </h1>

        <p className="text-slate-400 text-base sm:text-xl mx-auto mt-6 mb-8 max-w-[72ch] leading-relaxed px-2">
          Architektura automatyzacji, wdrożenia AI i strony internetowe generujące leady. Mierzalne efekty: oszczędność czasu, redukcja kosztów, więcej kwalifikowanych leadów B2B.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link href="/#contact">
            <Button variant="primary" className="sm:w-auto">
              Konsultacja strategiczna
            </Button>
          </Link>
          {CALENDLY_URL && (
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm sm:text-base transition-all h-12 min-h-12 px-6 sm:px-8 bg-transparent border-2 border-slate-700 text-white hover:border-purple-500/50 hover:bg-slate-800/30"
            >
              Audyt operacyjny / rozmowa discovery
            </a>
          )}
        </div>

        <div className="mt-14 sm:mt-16 pt-8 border-t border-slate-700/50 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 text-sm text-slate-500">
          <span>Architektura automatyzacji i wdrożenia AI</span>
          <span className="hidden sm:inline">·</span>
          <span>Strony pod leada B2B</span>
          <span className="hidden sm:inline">·</span>
          <span>Długofalowe partnerstwo strategiczne</span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-7 h-11 rounded-full border border-purple-400/60 flex items-start justify-center p-1"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-2 rounded-full bg-purple-300"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
