'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { Globe, Workflow, Palette, Check, ArrowUpRight } from 'lucide-react';
import { SERVICES, USLUGI_DISPLAY_ORDER } from '@/lib/services';
const SERVICE_ICONS: Record<(typeof USLUGI_DISPLAY_ORDER)[number], typeof Globe> = {
  automatyzacja: Workflow,
  strony: Globe,
  branding: Palette,
};

export function UslugiServiceCards() {
  const orderedServices = USLUGI_DISPLAY_ORDER.map((slug) => SERVICES.find((s) => s.slug === slug)).filter(Boolean) as (typeof SERVICES)[number][];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 items-stretch">
      {orderedServices.map((service, index) => {
        const Icon = SERVICE_ICONS[service.slug as keyof typeof SERVICE_ICONS] ?? Globe;
        return (
          <motion.div
            key={service.slug}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="relative group flex"
          >
            <Link
              href={`/uslugi/${service.slug}`}
              className="relative flex flex-col w-full h-full min-h-0 p-8 glass-card hover-lift rounded-2xl overflow-hidden"
              style={{ background: 'var(--bg-graphite-card)', backdropFilter: 'blur(16px)' }}
            >
              <div className="flex items-center gap-4 mb-6 flex-shrink-0 min-h-14">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-[#d8f17b]/15 border border-[#d8f17b]/20 flex items-center justify-center">
                  <Icon className="w-7 h-7 text-[#d8f17b]" />
                </div>
                <h2 className="text-xl font-bold text-[#e4e4e7] flex-1 min-w-0">{service.title}</h2>
                <div className="flex-shrink-0 w-9 h-9 rounded-lg border border-white/15 bg-white/5 flex items-center justify-center text-zinc-400 group-hover:text-[#d8f17b] group-hover:border-[#d8f17b]/50 transition-colors" aria-hidden>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
              <p className="text-zinc-400 leading-relaxed flex-shrink-0">{service.description}</p>
              <ul className="space-y-3 mt-6 flex-1 min-h-0">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-zinc-400">
                    <Check className="w-4 h-4 text-[#d8f17b] mt-0.5 flex-shrink-0" aria-hidden />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 w-0 bg-[#d8f17b] group-hover:w-full transition-all duration-500 rounded-b-2xl" />
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
