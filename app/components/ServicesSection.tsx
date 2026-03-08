'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { Globe, Workflow, Palette, ArrowRight, ArrowUpRight } from 'lucide-react';
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
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950/30 to-slate-950" />
      <div className="absolute top-0 left-1/4 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl 2xl:max-w-8xl 3xl:max-w-9xl mx-auto">
        <div className="text-center mb-12 sm:mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="inline-block mb-4 px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-500/10 border border-blue-500/30 rounded-full">
            <span className="text-blue-300 text-xs sm:text-sm font-medium uppercase tracking-wider">Nasze usługi</span>
          </motion.div>
          <motion.h2 id="services-heading" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6 px-4">
            Jak możemy <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Ci pomóc?</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="text-base sm:text-xl text-slate-400 max-w-[80ch] mx-auto px-2">
            Strony internetowe, branding i automatyzacja z AI. Ty skupiasz się na klientach i rozwoju firmy – my dostarczamy narzędzia i wdrożenia.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 items-stretch">
          {HOME_SERVICES_ORDER.map((slug) => SERVICES.find((s) => s.slug === slug)).filter((x): x is ServiceItem => Boolean(x)).map((service, index) => {
            const s = service;
            const Icon = SERVICE_ICONS[s.slug] ?? Globe;
            const displayTitle = s.slug === 'strony' ? 'Strony internetowe' : s.title;
            return (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative group flex"
              >
                <Link
                  href={`/uslugi/${s.slug}`}
                  className="relative flex flex-col w-full h-full min-h-0 p-8 bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl transition-all duration-300 group-hover:border-purple-500/50 group-hover:shadow-[0_0_40px_rgba(147,51,234,0.2)] overflow-hidden"
                >
                  <div className="flex items-center gap-4 mb-6 flex-shrink-0 min-h-14">
                    <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${s.gradient} p-0.5`}>
                      <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white flex-1 min-w-0">{displayTitle}</h3>
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg border border-slate-600/50 bg-slate-800/80 flex items-center justify-center text-slate-400 group-hover:text-purple-400 group-hover:border-purple-500/50 transition-colors" aria-hidden>
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-slate-400 leading-relaxed flex-shrink-0">{(s as ServiceItem).cardDescription ?? (s as ServiceItem).description}</p>
                  <div className={`absolute bottom-0 left-0 right-0 h-1 w-0 bg-gradient-to-r ${s.gradient} group-hover:w-full transition-all duration-500 rounded-b-2xl`} />
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="flex justify-center">
          <Link
            href="/uslugi"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-blue-500/50 bg-blue-500/10 text-blue-300 font-medium hover:bg-blue-500/20 hover:border-blue-400/60 transition-colors"
          >
            Zobacz pełną ofertę usług
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
