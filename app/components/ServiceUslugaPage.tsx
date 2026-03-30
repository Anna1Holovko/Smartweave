'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { BrandMarkIcon } from '@/app/components/BrandMarkIcon';
import { ServiceProblemCards } from '@/app/components/ServiceProblemCards';
import { ServiceSolutionBlock } from '@/app/components/ServiceSolutionBlock';
import { ServiceFeaturesList } from '@/app/components/ServiceFeaturesList';
import { ServiceBenefitsList } from '@/app/components/ServiceBenefitsList';
import { ServiceRealizacjeGrid } from '@/app/components/ServiceRealizacjeGrid';
import { HybridServiceCrossLinks } from '@/app/components/HybridServiceCrossLinks';
import { CollaborationProcessSection } from '@/app/components/CollaborationProcessSection';
import { AutomationWorkflowSection } from '@/app/components/AutomationWorkflowSection';
import { PORTFOLIO_ITEMS } from '@/lib/portfolio';
import type { ServiceSlug } from '@/lib/services';
import { SECTION_H2_CLASS } from '@/lib/layout';

type ProcessItem = { step: number; title: string; description: string };

export type RealizacjeConfig =
  | { mode: 'portfolio'; title?: string }
  | {
      mode: 'link';
      title: string;
      description: string;
      href: string;
      linkLabel: string;
    }
  | { mode: 'none' };

export type ServiceUslugaPageProps = {
  slug: ServiceSlug;
  title: string;
  description: string;
  problemHeading: string;
  problems: { title: string; description: string }[];
  solution: string;
  features: readonly string[];
  benefits: readonly string[];
  process: readonly ProcessItem[];
  /** Domyślnie „Co wdrażamy”; dla automatyzacji dłuższy nagłówek */
  featuresHeading?: string;
  realizacje: RealizacjeConfig;
  /** Sekcja przed linkami powiązanymi (np. branding → AI) */
  beforeCrossLinks?: ReactNode;
  /** Czy pokazać HybridServiceCrossLinks na końcu */
  showHybridCrossLinks: boolean;
};

export function ServiceUslugaPage({
  slug,
  title,
  description,
  problemHeading,
  problems,
  solution,
  features,
  benefits,
  process,
  featuresHeading,
  realizacje,
  beforeCrossLinks,
  showHybridCrossLinks,
}: ServiceUslugaPageProps) {
  const finalFeaturesHeading =
    featuresHeading ?? (slug === 'automatyzacja' ? 'Co możemy zautomatyzować w Twojej firmie' : 'Co wdrażamy');

  return (
    <div className="usluga-service">
      <header className="relative pb-14 sm:pb-20 md:pb-24">
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

        <div className="w-full flex flex-col items-stretch text-center">
          <p className="flex items-center justify-center gap-2 self-center text-[#d8f17b]/90 text-xs sm:text-sm font-medium uppercase tracking-[0.2em] mb-6">
            <BrandMarkIcon />
            Oferta
          </p>
          <h1 className="text-gradient-accent w-full text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.12] tracking-tight">
            {title}
          </h1>
          <p className="mt-6 sm:mt-8 w-full text-base sm:text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed">
            {description}
          </p>
        </div>
      </header>

      <ServiceProblemCards problems={problems} slug={slug} heading={problemHeading} />

      <section className="surface-panel py-16 sm:py-20 md:py-24 px-5 sm:px-8 md:px-12 lg:px-14">
        <h2 className={`${SECTION_H2_CLASS} mb-8 sm:mb-10 border-l-2 border-[var(--accent)] pl-4 sm:pl-5`}>
          Nasze podejście do rozwiązania
        </h2>
        <ServiceSolutionBlock solution={solution} />
      </section>

      {slug === 'automatyzacja' && (
        <section className="py-12 sm:py-16 md:py-20" aria-label="Przykład automatyzacji procesów">
          <AutomationWorkflowSection embedded />
        </section>
      )}
      <section className="py-16 sm:py-20 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 xl:gap-24">
        <div>
          <h2 className={`${SECTION_H2_CLASS} mb-8`}>{finalFeaturesHeading}</h2>
          <ServiceFeaturesList features={features} />
        </div>
        <div>
          <h2 className={`${SECTION_H2_CLASS} mb-8`}>Korzyści dla Twojej firmy</h2>
          <ServiceBenefitsList benefits={benefits} />
        </div>
      </section>

      <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-x-hidden">
        <CollaborationProcessSection process={process} className="!pt-12 sm:!pt-16 md:!pt-20" />
      </div>

      {realizacje.mode === 'portfolio' && (
        <section className="py-16 sm:py-20 md:py-24">
          <h2 className={`${SECTION_H2_CLASS} mb-8 sm:mb-10`}>
            {realizacje.title ?? 'Realizacje na stronach internetowych'}
          </h2>
          <ServiceRealizacjeGrid items={PORTFOLIO_ITEMS} />
        </section>
      )}

      {realizacje.mode === 'link' && (
        <section className="py-16 sm:py-20 md:py-24">
          <h2 className={`${SECTION_H2_CLASS} mb-4`}>{realizacje.title}</h2>
          <p className="text-[var(--text-secondary)] max-w-[80ch] mb-6">{realizacje.description}</p>
          <Link
            href={realizacje.href}
            className="inline-flex items-center gap-2 text-[#d8f17b] font-semibold hover:underline min-h-[44px]"
          >
            {realizacje.linkLabel}
            <span aria-hidden> →</span>
          </Link>
        </section>
      )}

      <div className="pt-8 sm:pt-12 space-y-12 sm:space-y-16">
        {beforeCrossLinks}
        {showHybridCrossLinks && <HybridServiceCrossLinks slug={slug} />}
      </div>
    </div>
  );
}
