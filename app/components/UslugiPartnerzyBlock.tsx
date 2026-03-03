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
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[800px] sm:h-[800px] bg-purple-500/10 rounded-full blur-3xl" />
      <div className={CONTAINER_CLASS}>
        {/* Z jakimi problemami mierzą się nasi Partnerzy Biznesowi? */}
        <MotionFadeIn delay={0} className="mb-12 sm:mb-16">
          <h2 id="partnerzy-problemy-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8 text-center">
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
                className="group relative p-6 sm:p-8 rounded-2xl border border-slate-700/50 bg-slate-900/40 backdrop-blur-xl transition-all duration-300 hover:border-purple-500/50 hover:shadow-[0_0_40px_rgba(147,51,234,0.15)] overflow-hidden"
              >
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed">{item.description}</p>
                <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${gradient} group-hover:w-full transition-all duration-500 rounded-b-2xl`} aria-hidden />
              </motion.div>
            ))}
          </div>
        </MotionFadeIn>

        {/* Nasze podejście do rozwiązania */}
        <MotionFadeIn delay={0.1} className="mb-12 sm:mb-16">
          <div className="relative p-6 sm:p-8 md:p-10 rounded-2xl border border-slate-700/50 bg-slate-900/40 backdrop-blur-xl">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Nasze podejście do rozwiązania</h3>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed">{content.approach}</p>
          </div>
        </MotionFadeIn>

        {/* Korzyści dla Twojej firmy */}
        <MotionFadeIn delay={0.15} className="mb-12 sm:mb-16">
          <div className="relative p-6 sm:p-8 md:p-10 rounded-2xl border border-slate-700/50 bg-slate-900/40 backdrop-blur-xl">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Korzyści dla Twojej firmy</h3>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed">{content.benefits}</p>
          </div>
        </MotionFadeIn>

        {/* Jak wygląda proces współpracy */}
        <MotionFadeIn delay={0.2}>
          <div className="relative p-6 sm:p-8 md:p-10 rounded-2xl border border-slate-700/50 bg-slate-900/40 backdrop-blur-xl">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Jak wygląda proces współpracy</h3>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed">{content.process}</p>
          </div>
        </MotionFadeIn>
      </div>
    </section>
  );
}
