'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
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

/** Calm ease-out — short, minimal */
const EASE = [0.16, 1, 0.3, 1] as const;

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
  const reduce = useReducedMotion();

  const fade = (delay = 0) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 6 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.45, ease: EASE, delay },
        };

  const inView = (delay = 0) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 8 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.48, ease: EASE, delay },
        };

  const items = problems.slice(0, 6).map((p, i) => ({
    ...p,
    icon: PROBLEM_ICONS[i] ?? Sparkles,
  }));

  return (
    <div className="strony-usluga text-[15px] sm:text-base">
      <header className="relative pb-16 sm:pb-20 md:pb-28">
        <motion.div {...fade(0)}>
          <Link
            href="/uslugi"
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors mb-12 sm:mb-16 text-[13px] tracking-wide"
          >
            <ArrowLeft className="w-3.5 h-3.5 flex-shrink-0 opacity-70" aria-hidden />
            Wszystkie usługi
          </Link>
        </motion.div>

        <div className="max-w-3xl">
          <motion.p {...fade(reduce ? 0 : 0.05)} className="flex items-center gap-2.5 text-zinc-500 text-[11px] sm:text-xs font-normal uppercase tracking-[0.22em] mb-8">
            <BrandMarkIcon />
            Oferta
          </motion.p>
          <motion.h1
            {...fade(reduce ? 0 : 0.1)}
            className="text-[#d8f17b] text-3xl sm:text-4xl md:text-[2.75rem] lg:text-5xl font-semibold leading-[1.15] tracking-[-0.02em]"
          >
            {title}
          </motion.h1>
          <motion.p {...fade(reduce ? 0 : 0.16)} className="mt-8 text-zinc-400 leading-[1.65] max-w-2xl font-normal">
            {description}
          </motion.p>
        </div>
        <div className="mt-16 sm:mt-20 h-px w-10 bg-white/[0.07]" aria-hidden />
      </header>

      <motion.section
        {...inView(0)}
        viewport={{ once: true, margin: '-10%', amount: 0.2 }}
        className="py-12 sm:py-16 md:py-20"
        aria-labelledby="strony-problems-heading"
      >
        <h2
          id="strony-problems-heading"
          className="text-[11px] sm:text-xs font-normal uppercase tracking-[0.2em] text-zinc-500 mb-12 sm:mb-16"
        >
          {problemHeading}
        </h2>
        <ul className="flex flex-col gap-12 sm:gap-14 md:gap-16">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.li
                key={index}
                initial={reduce ? false : { opacity: 0, y: 5 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ duration: 0.38, ease: EASE, delay: reduce ? 0 : index * 0.03 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 items-start"
              >
                <div className="md:col-span-1 flex items-start gap-4">
                  <span className="mt-0.5 text-[10px] text-zinc-600 tabular-nums w-6">{String(index + 1).padStart(2, '0')}</span>
                  <Icon className="h-4 w-4 text-zinc-500 shrink-0" strokeWidth={1.5} aria-hidden />
                </div>
                <div className="md:col-span-4">
                  <h3 className="text-base sm:text-lg font-medium text-zinc-200 leading-snug">{item.title}</h3>
                </div>
                <p className="md:col-span-7 text-zinc-500 text-sm sm:text-[15px] leading-relaxed font-normal">{item.description}</p>
              </motion.li>
            );
          })}
        </ul>
      </motion.section>

      <motion.section
        {...inView(0)}
        viewport={{ once: true, margin: '-10%', amount: 0.15 }}
        className="py-12 sm:py-16 md:py-20 border-t border-white/[0.05]"
      >
        <div className="pl-5 sm:pl-6 border-l border-white/[0.1]">
          <h2 className="text-base sm:text-lg font-medium text-zinc-200 mb-8 sm:mb-10 tracking-tight">Nasze podejście do rozwiązania</h2>
          <div className="text-zinc-500 [&_p]:font-normal">
            <ServiceSolutionBlock solution={solution} />
          </div>
        </div>
      </motion.section>

      <motion.section
        {...inView(0.04)}
        viewport={{ once: true, margin: '-10%', amount: 0.15 }}
        className="py-12 sm:py-16 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 xl:gap-32"
      >
        <div>
          <h2 className="text-base sm:text-lg font-medium text-zinc-200 mb-10 tracking-tight">Co wdrażamy</h2>
          <div className="opacity-[0.97] [&_svg]:opacity-80">
            <ServiceFeaturesList features={features} />
          </div>
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-medium text-zinc-200 mb-10 tracking-tight">Korzyści dla Twojej firmy</h2>
          <div className="opacity-[0.97] [&_svg]:opacity-80">
            <ServiceBenefitsList benefits={benefits} />
          </div>
        </div>
      </motion.section>

      <motion.section
        {...inView(0)}
        viewport={{ once: true, margin: '-10%', amount: 0.15 }}
        className="py-12 sm:py-16 md:py-20 border-t border-white/[0.05]"
        aria-labelledby="strony-process-heading"
      >
        <h2 id="strony-process-heading" className="text-base sm:text-lg font-medium text-zinc-200 mb-12 sm:mb-16 tracking-tight">
          Jak wygląda proces współpracy
        </h2>
        <ol className="flex flex-col gap-0">
          {process.map((item, i) => (
            <motion.li
              key={item.step}
              initial={reduce ? false : { opacity: 0, y: 4 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.38, ease: EASE, delay: reduce ? 0 : i * 0.04 }}
              className="flex gap-4 sm:gap-5 pb-10 sm:pb-12 last:pb-0"
            >
              <div className="flex flex-col items-center w-2 shrink-0">
                <span className="h-1.5 w-1.5 rounded-full bg-[#d8f17b]/35 mt-1.5" aria-hidden />
                {i < process.length - 1 ? <span className="w-px flex-1 min-h-[3rem] bg-gradient-to-b from-white/15 to-transparent mt-3" aria-hidden /> : null}
              </div>
              <div className="min-w-0 flex-1 -mt-0.5">
                <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-600 mb-2 tabular-nums">Krok {item.step}</p>
                <h3 className="text-base font-medium text-zinc-200">{item.title}</h3>
                <p className="mt-2 text-zinc-500 text-sm sm:text-[15px] leading-relaxed max-w-2xl font-normal">{item.description}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </motion.section>

      <motion.section
        {...inView(0)}
        viewport={{ once: true, margin: '-10%', amount: 0.12 }}
        className="py-12 sm:py-16 md:py-20 border-t border-white/[0.05]"
      >
        <h2 className="text-base sm:text-lg font-medium text-zinc-200 mb-10 sm:mb-12 tracking-tight">Realizacje na stronach internetowych</h2>
        <ServiceRealizacjeGrid items={PORTFOLIO_ITEMS} />
      </motion.section>

      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: EASE }}
        className="pt-6 sm:pt-10"
      >
        <HybridServiceCrossLinks slug="strony" />
      </motion.div>
    </div>
  );
}
