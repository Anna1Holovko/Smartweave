'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, LayoutTemplate, Sparkles, Gauge } from 'lucide-react';
import { BrandMarkIcon } from '@/app/components/BrandMarkIcon';

type Props = {
  title: string;
  description: string;
};

const spring = { type: 'spring' as const, damping: 28, stiffness: 220 };

export function StronyServicePremiumIntro({ title, description }: Props) {
  const reduceMotion = useReducedMotion();

  const titleWords = title.split(/\s+/);

  return (
    <div className="relative mb-10 sm:mb-12 lg:mb-16 overflow-visible">
      <div className="strony-premium-ambient pointer-events-none" aria-hidden />
      <div className="strony-premium-grid pointer-events-none" aria-hidden />

      <div className="relative z-10">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mb-6 sm:mb-8 lg:mb-10"
      >
        <Link
          href="/uslugi"
          className="inline-flex items-center justify-center gap-2 text-zinc-400 hover:text-[#d8f17b] transition-colors min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 sm:justify-start group"
        >
          <ArrowLeft className="w-4 h-4 flex-shrink-0 transition-transform group-hover:-translate-x-0.5" />
          <span>Wszystkie usługi</span>
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(260px,440px)] gap-10 lg:gap-14 xl:gap-16 items-center">
        <div className="text-center lg:text-left">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.05 }}
            className="inline-flex items-center justify-center gap-2 mb-4 sm:mb-5 text-[#d8f17b] text-xs sm:text-sm font-medium uppercase tracking-wider"
          >
            <BrandMarkIcon />
            <span className="relative">
              Oferta
              <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d8f17b]/60 to-transparent strony-badge-underline" />
            </span>
          </motion.div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold px-2 lg:px-0 pb-[0.15em] break-words leading-[1.12] tracking-tight">
            {titleWords.map((word, i) => {
              const w = word.toLowerCase();
              const isAccent = w === 'stron' || w === 'www';
              return (
                <motion.span
                  key={`${word}-${i}`}
                  initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...spring, delay: 0.08 + i * 0.06 }}
                  className={`inline-block mr-[0.25em] last:mr-0 ${isAccent ? 'text-[#d8f17b]' : 'text-[#e4e4e7]'}`}
                >
                  {word}
                </motion.span>
              );
            })}
          </h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.35 }}
            className="mt-5 sm:mt-6 text-base sm:text-lg text-zinc-400 max-w-[52ch] leading-relaxed"
          >
            {description}
          </motion.p>

          <motion.ul
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: reduceMotion ? 0 : 0.1, delayChildren: reduceMotion ? 0 : 0.45 },
              },
            }}
            className="mt-8 flex flex-wrap justify-center lg:justify-start gap-3"
          >
            {[
              { icon: LayoutTemplate, label: 'UX / UI pod konwersję' },
              { icon: Sparkles, label: 'SEO i widoczność w AI' },
              { icon: Gauge, label: 'Wydajność i skalowalność' },
            ].map(({ icon: Icon, label }) => (
              <motion.li
                key={label}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0, transition: spring },
                }}
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-4 py-2 text-xs sm:text-sm text-zinc-300 backdrop-blur-sm"
              >
                <Icon className="w-4 h-4 text-[#d8f17b]" strokeWidth={2} aria-hidden />
                {label}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <StronyBrowserMockup reduceMotion={!!reduceMotion} />
      </div>
      </div>
    </div>
  );
}

function StronyBrowserMockup({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.div
      className="relative mx-auto w-full max-w-[440px] lg:max-w-none [perspective:1200px]"
      initial={reduceMotion ? false : { opacity: 0, rotateY: -10, x: 28 }}
      animate={{ opacity: 1, rotateY: 0, x: 0 }}
      transition={{ type: 'spring', damping: 26, stiffness: 180, delay: 0.15 }}
    >
      <div className="strony-mockup-aura absolute -inset-8 rounded-[2rem] blur-3xl opacity-70 pointer-events-none" aria-hidden />
      <motion.div
        className="relative rounded-2xl border border-white/10 strony-mockup-surface bg-gradient-to-b from-zinc-800/40 via-[#121212] to-[#0a0a0a] shadow-[0_24px_80px_-12px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,255,255,0.06)] overflow-hidden"
        animate={reduceMotion ? {} : { y: [0, -6, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.08] bg-black/30">
          <div className="flex gap-1.5" aria-hidden>
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/90" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/90" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]/90" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="h-7 max-w-[min(100%,220px)] w-full rounded-md bg-black/40 border border-white/[0.08] flex items-center px-3 text-[10px] sm:text-xs text-zinc-400 truncate">
              smartweave.pl · Twój projekt
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-4">
          <div className="flex gap-3">
            <motion.div
              className="h-24 w-[32%] rounded-lg bg-gradient-to-br from-[#d8f17b]/15 to-white/[0.04] border border-white/[0.08]"
              animate={reduceMotion ? {} : { opacity: [0.75, 1, 0.75] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <div className="flex-1 space-y-2.5">
              <motion.div
                className="h-2.5 rounded-full bg-zinc-700/80 strony-shimmer max-w-[88%]"
                animate={reduceMotion ? {} : { opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3.2, repeat: Infinity, delay: 0.2 }}
              />
              <motion.div
                className="h-2.5 rounded-full bg-zinc-700/50 strony-shimmer max-w-[72%]"
                animate={reduceMotion ? {} : { opacity: [0.5, 0.95, 0.5] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
              />
              <motion.div
                className="h-2.5 rounded-full bg-zinc-700/40 strony-shimmer max-w-[56%]"
                animate={reduceMotion ? {} : { opacity: [0.45, 0.9, 0.45] }}
                transition={{ duration: 3.8, repeat: Infinity, delay: 0.8 }}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="h-16 rounded-lg border border-white/[0.07] bg-white/[0.03]"
                initial={false}
                animate={reduceMotion ? {} : { y: [0, -3, 0] }}
                transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
              />
            ))}
          </div>

          <motion.div
            className="h-10 rounded-lg bg-[#d8f17b]/12 border border-[#d8f17b]/25 flex items-center justify-center text-xs font-semibold text-[#d8f17b]/90"
            animate={reduceMotion ? {} : { scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Zapytanie ofertowe
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
