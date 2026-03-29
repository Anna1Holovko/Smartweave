'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Button } from '@/app/components/ui/Button';
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
        {CALENDLY_URL ? (
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="primary" className="whitespace-nowrap">
              Umów krótką rozmowę
            </Button>
          </a>
        ) : (
          <Link href="/#contact">
            <Button variant="primary" className="whitespace-nowrap">
              Umów krótką rozmowę
            </Button>
          </Link>
        )}
      </motion.div>
      </div>
    </section>
  );
}
