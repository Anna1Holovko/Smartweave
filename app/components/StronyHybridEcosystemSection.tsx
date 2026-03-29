'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Globe, Palette, Workflow } from 'lucide-react';
import { BrandMarkIcon } from '@/app/components/BrandMarkIcon';

const pillars = [
  {
    icon: Globe,
    label: 'Strona www',
    hint: 'Pierwszy kontakt z marką',
    href: '/uslugi/strony',
  },
  {
    icon: Palette,
    label: 'Branding',
    hint: 'Wygląd i komunikat',
    href: '/uslugi/branding',
  },
  {
    icon: Workflow,
    label: 'Automatyzacja i AI',
    hint: 'Leady, formularze, odzew',
    href: '/automatyzacja-ai-dla-firm',
  },
] as const;

export function StronyHybridEcosystemSection() {
  return (
    <section
      aria-labelledby="hybrid-cross-strony-heading"
      className="relative mt-12 sm:mt-16 overflow-hidden rounded-2xl border border-white/[0.1]"
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-white/[0.07] via-[var(--bg-graphite-card)] to-[#d8f17b]/[0.06]"
        style={{ backdropFilter: 'blur(16px)' }}
      />
      <div className="absolute inset-0 bg-[var(--bg-graphite)]/40" aria-hidden />

      <div className="relative z-10 px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12">
        <div className="mb-8 md:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 text-[#d8f17b] text-xs font-medium uppercase tracking-wider mb-4"
          >
            <BrandMarkIcon />
            Ekosystem
          </motion.div>
          <motion.h2
            id="hybrid-cross-strony-heading"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#e4e4e7] max-w-3xl"
          >
            Strona, branding i AI{' '}
            <span className="text-[#d8f17b]">— spójny ekosystem</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 md:mb-10">
          {pillars.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.08 + index * 0.06 }}
              >
                <Link
                  href={item.href}
                  className="group flex h-full flex-col rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 sm:p-5 transition-all hover:border-[#d8f17b]/35 hover:bg-white/[0.05]"
                >
                  <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#d8f17b]/20 bg-[#d8f17b]/10 text-[#d8f17b] transition-colors group-hover:border-[#d8f17b]/40">
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <span className="font-semibold text-[#e4e4e7] group-hover:text-white">{item.label}</span>
                  <span className="mt-1 text-sm text-zinc-500 group-hover:text-zinc-400">{item.hint}</span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="relative border-l-2 border-[#d8f17b]/50 pl-5 sm:pl-6"
        >
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-[85ch]">
            Strona www to często pierwszy kontakt z marką — warto, żeby wygląd i komunikat były zgodne z{' '}
            <Link href="/uslugi/branding" className="text-[#d8f17b] hover:underline font-medium">
              identyfikacją wizualną
            </Link>
            . Jednocześnie formularze, leady i integracje działają lepiej, gdy za nimi stoi{' '}
            <Link href="/uslugi/automatyzacja" className="text-[#d8f17b] hover:underline font-medium">
              automatyzacja procesów
            </Link>{' '}
            i — tam, gdzie to potrzebne —{' '}
            <Link href="/uslugi/agenci-ai" className="text-[#d8f17b] hover:underline font-medium">
              agenci AI
            </Link>
            , którzy odciążają zespół od powtarzalnych odpowiedzi.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
