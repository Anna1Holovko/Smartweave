'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { CALENDLY_URL } from '@/lib/site';

export function SimpleCTASection() {
  return (
    <section id="contact" aria-labelledby="simple-cta-heading" className="relative py-10 sm:py-16 md:py-20 lg:py-24 xl:py-28 px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 overflow-hidden">
      <div className="absolute inset-0 bg-[var(--bg)]" />

      <div className="relative z-10 w-full flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl flex flex-col items-center text-center"
      >
        <h2 id="simple-cta-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#e4e4e7] mb-4 px-2">
          Nie jesteś pewien, które rozwiązanie jest dla Ciebie?
        </h2>
        <p className="text-base sm:text-xl text-zinc-400 mb-8 px-2">
          Umów bezpłatną konsultację - porozmawiamy o wyzwaniach i zaproponujemy rozwiązanie
        </p>
        <div className="flex flex-col items-stretch sm:items-center gap-3 w-full max-w-sm">
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm sm:text-base transition-all h-12 min-h-12 px-6 sm:px-8 cta-gradient-animated w-full sm:w-auto"
          >
            Napisz do nas
          </Link>
          {CALENDLY_URL && (
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm sm:text-base transition-all h-12 min-h-12 px-6 sm:px-8 bg-transparent border-2 border-white/15 text-[#e4e4e7] hover:border-[#d8f17b]/50 hover:bg-white/5 w-full sm:w-auto"
            >
              Umów krótką diagnozę
            </a>
          )}
        </div>
      </motion.div>
      </div>
    </section>
  );
}
