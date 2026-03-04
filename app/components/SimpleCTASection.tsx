'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { CALENDLY_URL } from '@/lib/site';

export function SimpleCTASection() {
  return (
    <section id="contact" aria-labelledby="simple-cta-heading" className="relative py-10 sm:py-16 md:py-20 lg:py-24 xl:py-28 px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-purple-950/30 to-slate-950" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[1000px] sm:h-[1000px] bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[250px] h-[250px] sm:w-[600px] sm:h-[600px] bg-blue-500/10 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-3xl mx-auto text-center"
      >
        <h2 id="simple-cta-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 px-2">
          Nie jesteś pewien, które rozwiązanie jest dla Ciebie?
        </h2>
        <p className="text-base sm:text-xl text-slate-400 mb-8 px-2">
          Umów bezpłatną konsultację - porozmawiamy o wyzwaniach i zaproponujemy rozwiązanie
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm sm:text-base transition-all h-12 min-h-12 px-6 sm:px-8 text-white cta-gradient-animated hover:scale-105 hover:shadow-[0_0_28px_rgba(167,139,250,0.4)]"
          >
            Napisz do nas
          </Link>
          {CALENDLY_URL && (
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm sm:text-base transition-all h-12 min-h-12 px-6 sm:px-8 bg-transparent border-2 border-slate-700 text-white hover:border-purple-500/50 hover:bg-slate-800/30"
            >
              Umów spotkanie
            </a>
          )}
        </div>
      </motion.div>
    </section>
  );
}
