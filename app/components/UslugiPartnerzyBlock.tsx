'use client';

import { motion } from 'motion/react';
import { MotionFadeIn } from './MotionFadeIn';
import type { UslugiPageContent } from '@/lib/uslugi-page-content';
import { SECTION_CLASS, CONTAINER_CLASS } from '@/lib/layout';

type Props = {
  content: UslugiPageContent;
  /** Optional gradient for problem cards (e.g. from service) */
  gradient?: string;
};

export function UslugiPartnerzyBlock({ content, gradient = 'from-purple-500 to-pink-500' }: Props) {
  return (
    <section aria-labelledby="partnerzy-problemy-heading" className={SECTION_CLASS}>
      <div className="absolute inset-0 bg-[var(--bg)]" />
      <div className={CONTAINER_CLASS}>
        <MotionFadeIn delay={0} className="mb-12 sm:mb-16">
          <h2 id="partnerzy-problemy-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#e4e4e7] mb-6 sm:mb-8 text-center">
            Z jakimi problemami mierzą się nasi Partnerzy Biznesowi?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {content.problems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="glass-card hover-lift group relative p-6 sm:p-8 rounded-2xl overflow-hidden"
                style={{ background: 'var(--bg-graphite-card)', backdropFilter: 'blur(16px)' }}
              >
                <h3 className="text-lg font-semibold text-[#e4e4e7] mb-2">{item.title}</h3>
                <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">{item.description}</p>
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#d8f17b] group-hover:w-full transition-all duration-500 rounded-b-2xl" aria-hidden />
              </motion.div>
            ))}
          </div>
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
