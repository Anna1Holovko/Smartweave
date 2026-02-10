'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const gradientColors = { from: '#60A5FA', via: '#A78BFA', to: '#F472B6' };
const textPhrases = [
  'spokój',
  'oszczędność czasu',
  'wydajność',
  'automatyzację',
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 px-4 sm:px-6">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950/30 to-slate-950" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[1000px] sm:h-[1000px] bg-purple-600/20 rounded-full blur-[120px]" />
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-8 sm:mb-10 px-3 py-1.5 sm:px-4 sm:py-2 bg-purple-500/10 border border-purple-500/30 rounded-full backdrop-blur-sm"
        >
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
          <span className="text-purple-300 text-xs sm:text-sm font-medium uppercase tracking-wider">
            Design & Automatyzacja
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-5 sm:mb-6 md:mb-8 leading-tight px-2 sm:px-4"
        >
          <span className="text-white block">Pomożemy Ci</span>
          <div className="relative min-h-[2.3em] sm:min-h-[1.2em] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentTextIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
                className="bg-clip-text text-transparent absolute inset-0 flex items-center justify-center text-center px-1"
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

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-400 mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed px-3 sm:px-4"
        >
          <span className="hidden sm:inline">Automatyzujemy to, co powtarzalne. Ty weryfikujesz rezultaty.</span>
          <span className="sm:hidden">Automatyzujemy powtarzalne. Ty weryfikujesz.</span>
          <br className="hidden sm:block" />
          <span className="hidden sm:inline">Strony gotowe na AI — skupiasz się na tym, co ważne.</span>
          <span className="sm:hidden">Strony na AI. Skup się na biznesie.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4"
        >
          <button
            type="button"
            onClick={() => scrollTo('#contact')}
            className="group relative px-8 sm:px-10 py-3.5 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold text-sm sm:text-base hover:scale-105 hover:shadow-[0_0_40px_rgba(147,51,234,0.6)] transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            Porozmawiajmy
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            type="button"
            onClick={() => scrollTo('#portfolio')}
            className="group px-8 sm:px-10 py-3.5 sm:py-4 bg-transparent backdrop-blur-sm border-2 border-slate-700 rounded-full text-white font-semibold text-sm sm:text-base hover:border-purple-500/50 hover:bg-slate-800/30 transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            Zobacz Case Studies
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
          className="w-6 h-10 border-2 border-slate-600 rounded-full flex items-start justify-center p-2"
        >
          <motion.div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
