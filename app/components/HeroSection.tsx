'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';

const phrases = [
  'odzyskać czas',
  'uprościć pracę',
  'zredukować chaos',
  'uniknąć błędów',
  'zyskać spokój',
  'rozwiązać problemy',
  'zyskać efektywność',
];

// Lighter premium grid
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

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-24 pb-20 sm:pt-28 sm:pb-24 lg:pt-24 lg:pb-20 xl:pt-20 xl:pb-16">
      {/* Base background */}
      <div className="absolute inset-0 bg-[#0b0a18]" />

      {/* Glow */}
      <div className="absolute left-1/2 top-1/2 w-[1000px] h-[1000px] -translate-x-1/2 -translate-y-1/2 bg-purple-600/20 rounded-full blur-[180px]" />

      {/* Lighter Grid */}
      <div className="absolute inset-0" style={gridStyle} />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl xl:max-w-5xl mx-auto">
        {/* Badge – Design & UTOMATYZACJA as core offer */}
        <p className="inline-flex items-center mb-8 px-4 py-2 rounded-full border border-purple-500/40 bg-purple-950/50 backdrop-blur-sm text-sm text-purple-200" aria-hidden="true">
          Design & Automatyzacja
        </p>

        {/* Single H1 for SEO: Design and Automatyzacja */}
        <h1 className="text-white font-bold tracking-tight leading-[1.1] text-center" style={{ fontSize: 'var(--text-display)' }}>
          Pomożemy Ci{' '}
          <span className="block my-2 sm:inline sm:my-0" style={{ fontSize: 'clamp(2.2rem, 6.5vw, 7.5rem)' }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
                transition={{ duration: 0.4 }}
                className="inline-block whitespace-nowrap font-bold text-transparent bg-clip-text leading-[1.2]"
                style={{ backgroundImage: 'linear-gradient(to right, #60A5FA, #A78BFA, #F472B6)' }}
                aria-live="polite"
              >
                {phrases[index]}
              </motion.span>
            </AnimatePresence>
          </span>{' '}
          w codziennej pracy
        </h1>

        {/* Description – Design + Automatyzacja */}
        <p
          className="text-slate-400 mx-auto mt-6 mb-10 max-w-2xl leading-relaxed"
          style={{ fontSize: 'var(--text-lead)' }}
        >
Automatyzujemy to, co powtarzalne. Ty weryfikujesz rezultaty. Tworzymy strony internetowe gotowe na AI, abyś mógł skupić się na tym, co naprawdę ważne.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="primary"
            className="sm:w-auto group"
            onClick={() => scrollTo('#contact')}
          >
            Porozmawiajmy
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>

          <Button
            variant="secondary"
            className="sm:w-auto"
            onClick={() => scrollTo('#portfolio')}
          >
            Zobacz Case Studies
          </Button>
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
