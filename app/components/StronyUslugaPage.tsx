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
      {/* Hero — centered Oferta, title, lead */}
      <header className="relative pb-14 sm:pb-20 md:pb-24 border-b border-white/[0.07] text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="flex justify-center"
        >
          <Link
            href="/uslugi"
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-[#d8f17b] transition-colors mb-10 sm:mb-12 text-sm tracking-wide"
          >
            <ArrowLeft className="w-4 h-4 flex-shrink-0" aria-hidden />
            Wszystkie usługi
          </Link>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <p className="flex items-center justify-center gap-2 text-[#d8f17b]/90 text-xs sm:text-sm font-medium uppercase tracking-[0.2em] mb-6">
            <BrandMarkIcon />
            Oferta
          </p>
          <h1 className="text-[#d8f17b] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.12] tracking-tight px-2">
            {title}
          </h1>
          <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-zinc-400 leading-relaxed max-w-3xl mx-auto">
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

      {/* Process — path: center spine + alternating steps (desktop); vertical path (mobile) */}
      <section className="py-16 sm:py-20 md:py-24 border-t border-white/[0.07]" aria-labelledby="strony-process-heading">
        <h2
          id="strony-process-heading"
          className="text-xl sm:text-2xl font-bold text-[#e4e4e7] mb-12 sm:mb-16 text-center max-w-3xl mx-auto px-2"
        >
          Jak wygląda proces współpracy
        </h2>

        <div className="relative mx-auto max-w-5xl px-2 sm:px-4">
          {/* Mobile: vertical dashed path */}
          <div
            className="absolute left-[22px] top-3 bottom-3 w-px border-l border-dashed border-[#d8f17b]/35 md:hidden"
            aria-hidden
          />
          {/* Desktop: center spine */}
          <div
            className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 md:block bg-gradient-to-b from-[#d8f17b]/45 via-[#d8f17b]/20 to-[#d8f17b]/40"
            aria-hidden
          />

          <ol className="relative space-y-10 md:space-y-0">
            {process.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.li
                  key={item.step}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  className="relative md:flex md:min-h-[100px] md:items-center md:justify-center md:py-8"
                >
                  {/* Mobile layout */}
                  <div className="flex gap-5 pl-1 md:hidden">
                    <span
                      className="relative z-10 mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d8f17b]/40 bg-[var(--bg)] text-xs font-bold text-[#d8f17b]"
                      aria-hidden
                    >
                      {item.step}
                    </span>
                    <div className="min-w-0 pb-2 text-left">
                      <h3 className="text-lg font-semibold text-[#e4e4e7]">{item.title}</h3>
                      <p className="mt-2 text-zinc-400 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>

                  {/* Desktop: path — węzeł na środkowym torze, treść na przemian lewo / prawo */}
                  <div className="hidden w-full md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-6 lg:gap-10">
                    <div className={`min-w-0 ${isLeft ? 'md:pr-6 md:text-right' : ''}`}>
                      {isLeft ? (
                        <>
                          <p className="text-xs font-semibold uppercase tracking-wider text-[#d8f17b]/85">Krok {item.step}</p>
                          <h3 className="mt-1 text-lg font-semibold text-[#e4e4e7]">{item.title}</h3>
                          <p className="mt-2 text-zinc-400 text-sm leading-relaxed lg:text-base">{item.description}</p>
                        </>
                      ) : null}
                    </div>

                    <div className="relative z-10 flex justify-center md:w-14">
                      <span
                        className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#d8f17b]/45 bg-[var(--bg)] text-sm font-bold text-[#d8f17b] shadow-[0_0_24px_rgba(216,241,123,0.12)]"
                        aria-hidden
                      >
                        {item.step}
                      </span>
                    </div>

                    <div className={`min-w-0 ${!isLeft ? 'md:pl-6 md:text-left' : ''}`}>
                      {!isLeft ? (
                        <>
                          <p className="text-xs font-semibold uppercase tracking-wider text-[#d8f17b]/85">Krok {item.step}</p>
                          <h3 className="mt-1 text-lg font-semibold text-[#e4e4e7]">{item.title}</h3>
                          <p className="mt-2 text-zinc-400 text-sm leading-relaxed lg:text-base">{item.description}</p>
                        </>
                      ) : null}
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
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
