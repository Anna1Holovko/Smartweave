'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';

const gradientColors = {
  from: '#60A5FA',
  via: '#A78BFA',
  to: '#F472B6',
};

const textPhrases = [
  'odzyskać czas',
  'uprościć pracę',
  'zredukować chaos',
  'uniknąć błędów',
  'zyskać spokój',
  'rozwiązać problemy',
  'zyskać efektywność',
];

export function HeroSection() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [textHeight, setTextHeight] = useState(0);

  const measureRef = useRef<HTMLSpanElement | null>(null);

  // Rotate phrases
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % textPhrases.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Measure text height (on change + resize)
  useLayoutEffect(() => {
    const measure = () => {
      if (!measureRef.current) return;
      const rect = measureRef.current.getBoundingClientRect();
      setTextHeight(rect.height);
    };

    measure();
    window.addEventListener('resize', measure);

    return () => window.removeEventListener('resize', measure);
  }, [currentTextIndex]);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-x-hidden pt-24 sm:pt-28 pb-20 sm:pb-24 px-4 sm:px-8">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0f0a1a] sm:bg-[#0c0820]" />

      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `
            linear-gradient(rgba(148, 163, 184, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-purple-600/15 rounded-full blur-[140px]" />

      <div className="relative z-10 w-full max-w-4xl mx-auto text-center px-4 sm:px-6">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-purple-950/60 border border-purple-500/40 backdrop-blur-sm"
        >
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-white text-sm font-medium tracking-wider">
            Design & Automatyzacja
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-bold leading-tight"
        >
          <span className="text-white block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            Pomożemy Ci
          </span>

          {/* Animated line */}
          <motion.div
            className="relative flex items-center justify-center my-1 overflow-visible"
            animate={{ height: textHeight }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {/* Hidden measurer */}
            <span
              ref={measureRef}
              className="invisible absolute whitespace-nowrap font-bold leading-[1.15]"
              style={{
                fontSize: 'clamp(1.125rem, 4.5vw + 1rem, 6rem)',
                paddingBottom: '0.08em',
              }}
            >
              {textPhrases[currentTextIndex]}
            </span>

            <AnimatePresence mode="wait">
              <motion.span
                key={currentTextIndex}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className="absolute whitespace-nowrap font-bold leading-[1.15] pb-[0.08em] bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(to right, ${gradientColors.from}, ${gradientColors.via}, ${gradientColors.to})`,
                  fontSize: 'clamp(1.125rem, 4.5vw + 1rem, 6rem)',
                  paddingLeft: '0.05em',
                  paddingRight: '0.05em',
                }}
              >
                {textPhrases[currentTextIndex]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          <span className="text-white block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            w codziennej pracy
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mt-8 mb-10"
        >
          Zostawiamy maszynom to, co powtarzalne. Ty decydujesz i sprawdzasz.
          Strony i automatyzacje po to, żebyś mógł skupić się na tym{' '}
          <span className="whitespace-nowrap">co naprawdę ważne.</span>
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            variant="primary"
            fullWidth
            className="sm:w-auto group"
            onClick={() => scrollTo('#contact')}
          >
            Porozmawiajmy
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>

          <Button
            variant="secondary"
            fullWidth
            className="sm:w-auto"
            onClick={() => scrollTo('#portfolio')}
          >
            Zobacz Case Studies
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
