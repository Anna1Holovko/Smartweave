'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';
import { useState, useEffect } from 'react';

const gradientColors = { from: '#60A5FA', via: '#A78BFA', to: '#F472B6' };
const textPhrases = [
  'więcej spokoju',
  'więcej czasu',
  'mniej stresu',
  'mniej pracy',
  'rozwój biznesu',
  'szybszy wzrost',
];

export function HeroSection() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % textPhrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 sm:pt-28 pb-20 sm:pb-24 px-4 sm:px-8">
      {/* Base: dark indigo / purple */}
      <div className="absolute inset-0 bg-[#0f0a1a] sm:bg-[#0c0820]" />
      {/* Subtle grid / mesh */}
      <div
        className="absolute inset-0 opacity-[0.4] sm:opacity-50"
        style={{
          backgroundImage: `
            linear-gradient(rgba(148, 163, 184, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />
      {/* Soft purple glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] sm:w-[1200px] sm:h-[1200px] bg-purple-600/15 rounded-full blur-[140px]" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-indigo-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
        {/* Pill badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-8 sm:mb-10 px-4 py-2 rounded-full bg-purple-950/60 border border-purple-500/40 backdrop-blur-sm"
        >
          <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
          <span className="text-white/95 text-sm font-medium tracking-wider">
            Design & Automatyzacja
          </span>
        </motion.div>

        {/* H1: three lines, gradient on middle */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight overflow-hidden"
        >
          <span className="text-white block">Pomożemy Ci</span>
          <div className="relative h-[1.25em] flex items-center justify-center overflow-hidden my-0.5">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentTextIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
                className="bg-clip-text text-transparent absolute whitespace-nowrap"
                style={{
                  backgroundImage: `linear-gradient(to right, ${gradientColors.from}, ${gradientColors.via}, ${gradientColors.to})`,
                }}
              >
                {textPhrases[currentTextIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="text-white block">w codziennej pracy</span>
        </motion.h1>

        {/* Subheading: full text, generous spacing */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mt-8 sm:mt-10 mb-10 sm:mb-12"
        >
          Automatyzujemy powtarzalne. Ty weryfikujesz. Strony na AI — skupiasz się na tym, co ważne.
        </motion.p>

        {/* CTA buttons: horizontal, gap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button variant="primary" fullWidth className="sm:w-auto group" onClick={() => scrollTo('#contact')}>
            Porozmawiajmy
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="secondary" fullWidth className="sm:w-auto" onClick={() => scrollTo('#portfolio')}>
            Zobacz Case Studies
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator: minimal vertical pill */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
          className="w-6 h-10 rounded-full border border-slate-500/60 flex items-start justify-center pt-2"
        >
          <div className="w-1 h-1.5 rounded-full bg-slate-500/80" />
        </motion.div>
      </motion.div>
    </section>
  );
}
