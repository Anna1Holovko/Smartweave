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

// Measure animated text height (responsive-safe)
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

return ( <section className="relative min-h-screen flex items-center justify-center overflow-x-hidden pt-24 sm:pt-28 pb-20 sm:pb-24 px-4 sm:px-8">
{/* Background base */} <div className="absolute inset-0 bg-[#0f0a1a] sm:bg-[#0c0820]" />


  {/* More visible purple grid */}
  <div
    className="absolute inset-0"
    style={{
      backgroundImage: '
        linear-gradient(rgba(168, 85, 247, 0.08) 1px, transparent 1px),
        linear-gradient(90deg, rgba(168, 85, 247, 0.08) 1px, transparent 1px)
      ',
      backgroundSize: '64px 64px',
      maskImage: 'radial-gradient(circle at center, black 40%, transparent 90%)',
      WebkitMaskImage:
        'radial-gradient(circle at center, black 40%, transparent 90%)',
    }}
  />

  {/* Glow effects */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-purple-600/15 rounded-full blur-[140px]" />
  <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl" />
  <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl" />

  <div className="relative z-10 w-full max-w-4xl mx-auto text-center px-4 sm:px-6">
    {/* Badge */}
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

      {/* Animated line with auto height */}
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

    {/* Subheading */}
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="text-slate-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mt-8 sm:mt-10 mb-10 sm:mb-12"
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
        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
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

  {/* Scroll indicator */}
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1, duration: 0.6 }}
    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
  >
    <motion.div
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      className="w-7 h-11 rounded-full border border-purple-400/50 flex items-start justify-center p-1 backdrop-blur-sm bg-white/5"
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="w-1.5 h-2 rounded-full bg-purple-300"
      />
    </motion.div>
  </motion.div>
</section>

);
}
