'use client';

import { MotionFadeIn } from './MotionFadeIn';
import { ServiceProblemCards } from './ServiceProblemCards';
import type { UslugiPageContent } from '@/lib/uslugi-page-content';
import type { ServiceSlug } from '@/lib/services';
import { SECTION_CLASS, CONTAINER_CLASS } from '@/lib/layout';

type Props = {
  content: UslugiPageContent;
  /** Ikony dopasowane do usługi (jak na /uslugi/strony www). */
  slug?: ServiceSlug;
};

export function UslugiPartnerzyBlock({ content, slug = 'strony' }: Props) {
  return (
    <section aria-labelledby="partnerzy-problemy-heading" className={SECTION_CLASS}>
      <div className="absolute inset-0 bg-[var(--bg)]" />
      <div className={CONTAINER_CLASS}>
        <MotionFadeIn delay={0} className="mb-12 sm:mb-16">
          <ServiceProblemCards
            problems={content.problems}
            slug={slug}
            headingId="partnerzy-problemy-heading"
          />
        </MotionFadeIn>

        <MotionFadeIn delay={0.1} className="mb-12 sm:mb-16">
          <div className="glass-card relative p-6 sm:p-8 md:p-10 rounded-2xl" style={{ background: 'var(--bg-graphite-card)', backdropFilter: 'blur(16px)' }}>
            <h3 className="text-xl sm:text-2xl font-bold text-[#e4e4e7] mb-4">Nasze podejście do rozwiązania</h3>
            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">{content.approach}</p>
          </div>
        </MotionFadeIn>

        <MotionFadeIn delay={0.15} className="mb-12 sm:mb-16">
          <div className="glass-card relative p-6 sm:p-8 md:p-10 rounded-2xl" style={{ background: 'var(--bg-graphite-card)', backdropFilter: 'blur(16px)' }}>
            <h3 className="text-xl sm:text-2xl font-bold text-[#e4e4e7] mb-4">Korzyści dla Twojej firmy</h3>
            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">{content.benefits}</p>
          </div>
        </MotionFadeIn>

        <MotionFadeIn delay={0.2}>
          <div className="glass-card relative p-6 sm:p-8 md:p-10 rounded-2xl" style={{ background: 'var(--bg-graphite-card)', backdropFilter: 'blur(16px)' }}>
            <h3 className="text-xl sm:text-2xl font-bold text-[#e4e4e7] mb-4">Jak wygląda proces współpracy</h3>
            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">{content.process}</p>
          </div>
        </MotionFadeIn>
      </div>
    </section>
  );
}
