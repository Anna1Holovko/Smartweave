'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const gradientColors = { from: '#60A5FA', via: '#A78BFA', to: '#F472B6' };
const textPhrases = [
  'zyskać spokój',
  'zaoszczędzić czas',
  'zwiększyć wydajność',
  'zautomatyzować procesy',
  'skupić się na biznesie',
  'rozwijać się szybciej',
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
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 sm:mb-8 leading-[1.1] px-4"
        >
          <span className="text-white block">Pomożemy Ci</span>
          <div className="relative h-[1.2em] block">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentTextIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-clip-text text-transparent absolute left-0 right-0"
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
          className="text-base sm:text-lg md:text-xl text-slate-400 mb-10 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4"
        >
          Automatyzujemy to, co powtarzalne. Ty weryfikujesz rezultaty.
          <br />
          Tworzymy strony internetowe gotowe na AI, abyś mógł skupić się na tym, co naprawdę ważne
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
