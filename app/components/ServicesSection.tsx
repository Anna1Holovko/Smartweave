'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { Globe, Workflow, Palette, ArrowRight, Check } from 'lucide-react';
import { SERVICES, USLUGI_DISPLAY_ORDER, type ServiceItem } from '@/lib/services';

/** Home: first 3 from dropdown order - Automatyzacja i agenci AI, Strony, Branding */
const HOME_SERVICES_ORDER = USLUGI_DISPLAY_ORDER.slice(0, 3);
const SERVICE_ICONS: Record<string, typeof Globe> = {
  strony: Globe,
  branding: Palette,
  automatyzacja: Workflow,
};

export function ServicesSection() {
  return (
    <section id="services" aria-labelledby="services-heading" className="relative py-10 sm:py-16 md:py-20 lg:py-24 xl:py-28 px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 overflow-hidden">
      <div className="absolute inset-0 bg-[var(--bg-graphite)]" />

      <div className="relative z-10 max-w-7xl 2xl:max-w-8xl 3xl:max-w-9xl mx-auto">
        <div className="text-center mb-12 sm:mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="inline-block mb-4 px-3 py-1.5 sm:px-4 sm:py-2 bg-[#d8f17b]/10 border border-[#d8f17b]/30 rounded-full">
            <span className="text-[#d8f17b] text-xs sm:text-sm font-medium uppercase tracking-wider">Nasze usługi</span>
          </motion.div>
          <motion.h2 id="services-heading" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#e4e4e7] mb-4 sm:mb-6 px-4">
            Jak możemy <span className="text-[#d8f17b]">Ci pomóc?</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="text-base sm:text-xl text-zinc-400 max-w-[80ch] mx-auto px-2">
            Strony, branding i automatyzacja z AI. Ty na klientach i rozwoju – my dostarczamy narzędzia i wdrożenia
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 items-stretch">
          {HOME_SERVICES_ORDER.map((slug) => SERVICES.find((s) => s.slug === slug)).filter((x): x is ServiceItem => Boolean(x)).map((service, index) => {
            const s = service;
            const Icon = SERVICE_ICONS[s.slug] ?? Globe;
            const displayTitle =
              s.slug === 'strony'
                ? 'Strony internetowe'
                : s.slug === 'automatyzacja'
                  ? 'Automatyzacja procesów biznesowych'
                  : s.title;
            const points = (s as ServiceItem).cardPoints ?? [];
            return (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative group flex"
              >
                <div className="glass-card hover-lift relative flex flex-col w-full h-full min-h-0 p-8 rounded-2xl overflow-hidden">
                  <div className="flex items-center gap-4 mb-4 flex-shrink-0 min-h-14">
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-[#d8f17b]/15 border border-[#d8f17b]/20 flex items-center justify-center">
                      <Icon className="w-7 h-7 text-[#d8f17b]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#e4e4e7] flex-1 min-w-0">{displayTitle}</h3>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-4 flex-shrink-0">{(s as ServiceItem).cardDescription ?? (s as ServiceItem).description}</p>
                  {points.length > 0 && (
                    <ul className="space-y-2 mb-6 flex-shrink-0" aria-hidden>
                      {points.map((point, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-zinc-400">
                          <Check className="w-4 h-4 text-[#d8f17b] mt-0.5 flex-shrink-0" aria-hidden />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <Link
                    href={`/uslugi/${s.slug}`}
                    className="inline-flex items-center justify-center gap-2 mt-auto w-full sm:w-auto rounded-full font-semibold text-sm px-5 py-2.5 border border-[#d8f17b]/40 bg-[#d8f17b]/10 text-[#d8f17b] hover:bg-[#d8f17b]/20 hover:border-[#d8f17b]/60 transition-colors"
                  >
                    Czytaj więcej
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 w-0 bg-[#d8f17b] group-hover:w-full transition-all duration-500 rounded-b-2xl" />
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="flex justify-center">
          <Link
            href="/uslugi"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#d8f17b]/40 bg-[#d8f17b]/10 text-[#d8f17b] font-medium hover:bg-[#d8f17b]/20 hover:border-[#d8f17b]/60 transition-colors"
          >
            Zobacz pełną ofertę usług
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
