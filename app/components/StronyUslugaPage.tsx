'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Globe,
  Search,
  MousePointer,
  FileEdit,
  Layout,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { BrandMarkIcon } from '@/app/components/BrandMarkIcon';
import { ServiceSolutionBlock } from '@/app/components/ServiceSolutionBlock';
import { ServiceFeaturesList } from '@/app/components/ServiceFeaturesList';
import { ServiceBenefitsList } from '@/app/components/ServiceBenefitsList';
import { ServiceRealizacjeGrid } from '@/app/components/ServiceRealizacjeGrid';
import { HybridServiceCrossLinks } from '@/app/components/HybridServiceCrossLinks';
import { PORTFOLIO_ITEMS } from '@/lib/portfolio';

const PROBLEM_ICONS: LucideIcon[] = [Globe, Search, MousePointer, FileEdit, Layout, Sparkles];

type ProcessItem = { step: number; title: string; description: string };

export type StronyUslugaPageProps = {
  title: string;
  description: string;
  problemHeading: string;
  problems: { title: string; description: string }[];
  solution: string;
  features: readonly string[];
  benefits: readonly string[];
  process: readonly ProcessItem[];
};

export function StronyUslugaPage({
  title,
  description,
  problemHeading,
  problems,
  solution,
  features,
  benefits,
  process,
}: StronyUslugaPageProps) {
  const items = problems.slice(0, 6).map((p, i) => ({
    ...p,
    icon: PROBLEM_ICONS[i] ?? Sparkles,
  }));

  return (
    <div className="strony-usluga">
      {/* Hero — editorial strip, no mockup */}
      <header className="relative pb-14 sm:pb-20 md:pb-24 border-b border-white/[0.07]">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <Link
            href="/uslugi"
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-[#d8f17b] transition-colors mb-10 sm:mb-12 text-sm tracking-wide"
          >
            <ArrowLeft className="w-4 h-4 flex-shrink-0" aria-hidden />
            Wszystkie usługi
          </Link>
        </motion.div>

        <div className="max-w-4xl">
          <p className="flex items-center gap-2 text-[#d8f17b]/90 text-xs sm:text-sm font-medium uppercase tracking-[0.2em] mb-6">
            <BrandMarkIcon />
            Oferta
          </p>
          <h1 className="text-[#d8f17b] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.12] tracking-tight">
            {title}
          </h1>
          <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-zinc-400 leading-relaxed max-w-3xl">
            {description}
          </p>
        </div>
      </header>

      {/* Problems — full-width rows, not a 3-col card grid */}
      <section className="py-16 sm:py-20 md:py-24" aria-labelledby="strony-problems-heading">
        <h2
          id="strony-problems-heading"
          className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500 mb-10 sm:mb-14 max-w-2xl"
        >
          {problemHeading}
        </h2>
        <ul className="divide-y divide-white/[0.08] border-t border-white/[0.08]">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start"
              >
                <div className="md:col-span-1 flex md:flex-col items-center md:items-start gap-3 text-zinc-600 text-xs font-mono tabular-nums tracking-wider">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-[#d8f17b]">
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <span className="hidden md:inline text-[10px]">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <div className="md:col-span-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-[#e4e4e7] leading-snug">{item.title}</h3>
                </div>
                <p className="md:col-span-7 text-zinc-400 text-sm sm:text-base leading-relaxed">{item.description}</p>
              </motion.li>
            );
          })}
        </ul>
      </section>

      {/* Solution — inset panel */}
      <section className="py-16 sm:py-20 md:py-24 rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.02] to-transparent px-5 sm:px-8 md:px-12 lg:px-14">
        <h2 className="text-xl sm:text-2xl font-bold text-[#e4e4e7] mb-8 sm:mb-10 border-l-2 border-[#d8f17b] pl-4 sm:pl-5">
          Nasze podejście do rozwiązania
        </h2>
        <ServiceSolutionBlock solution={solution} />
      </section>

      {/* Features + benefits — side-by-side */}
      <section className="py-16 sm:py-20 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 xl:gap-24">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-[#e4e4e7] mb-8 pb-3 border-b border-white/10">
            Co wdrażamy
          </h2>
          <ServiceFeaturesList features={features} />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-[#e4e4e7] mb-8 pb-3 border-b border-white/10">
            Korzyści dla Twojej firmy
          </h2>
          <ServiceBenefitsList benefits={benefits} />
        </div>
      </section>

      {/* Process — vertical timeline */}
      <section className="py-16 sm:py-20 md:py-24 border-t border-white/[0.07]" aria-labelledby="strony-process-heading">
        <h2 id="strony-process-heading" className="text-xl sm:text-2xl font-bold text-[#e4e4e7] mb-10 sm:mb-14">
          Jak wygląda proces współpracy
        </h2>
        <ol className="relative ml-2 sm:ml-3 border-l border-[#d8f17b]/25 pl-8 sm:pl-10 space-y-12 sm:space-y-14">
          {process.map((item) => (
            <motion.li
              key={item.step}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              <span
                className="absolute -left-[41px] sm:-left-[45px] top-0 flex h-7 w-7 items-center justify-center rounded-full border border-[#d8f17b]/35 bg-[var(--bg)] text-xs font-bold text-[#d8f17b] tabular-nums"
                aria-hidden
              >
                {item.step}
              </span>
              <h3 className="text-lg font-semibold text-[#e4e4e7]">{item.title}</h3>
              <p className="mt-2 text-zinc-400 text-sm sm:text-base leading-relaxed max-w-2xl">{item.description}</p>
            </motion.li>
          ))}
        </ol>
      </section>

      {/* Realizacje */}
      <section className="py-16 sm:py-20 md:py-24 border-t border-white/[0.07]">
        <h2 className="text-xl sm:text-2xl font-bold text-[#e4e4e7] mb-8 sm:mb-10">
          Realizacje na stronach internetowych
        </h2>
        <ServiceRealizacjeGrid items={PORTFOLIO_ITEMS} />
      </section>

      <div className="pt-8 sm:pt-12">
        <HybridServiceCrossLinks slug="strony" />
      </div>
    </div>
  );
}
