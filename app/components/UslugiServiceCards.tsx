'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { Globe, Workflow, Palette, Bot, Check, ArrowRight, MessageCircle, AppWindow } from 'lucide-react';
import { SERVICES, USLUGI_DISPLAY_ORDER } from '@/lib/services';
const SERVICE_ICONS: Record<(typeof USLUGI_DISPLAY_ORDER)[number], typeof Globe> = {
  automatyzacja: Workflow,
  'agenci-ai': Bot,
  strony: Globe,
  branding: Palette,
  chatboty: MessageCircle,
  'aplikacje-webowe': AppWindow,
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
              <div className="flex flex-row items-start gap-4 mb-4">
                <div className="sw-icon-tile flex-shrink-0 w-14 h-14 flex items-center justify-center">
                  <Icon className="w-7 h-7 text-[var(--accent)]" aria-hidden />
                </div>
                <h2 className="text-xl font-bold text-[#e4e4e7] flex-1 min-w-0 leading-snug">{service.title}</h2>
              </div>
              <p className="text-zinc-400 leading-relaxed flex-shrink-0">{service.description}</p>
              <ul className="space-y-3 mt-6 mb-6 flex-1 min-h-0">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-zinc-400">
                    <Check className="w-4 h-4 text-[#d8f17b] mt-0.5 flex-shrink-0" aria-hidden />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <span className="inline-flex items-center justify-center gap-2 mt-auto w-full rounded-full font-semibold text-sm px-5 py-2.5 border border-[#d8f17b]/40 bg-[#d8f17b]/10 text-[#d8f17b] group-hover:bg-[#d8f17b]/20 group-hover:border-[#d8f17b]/60 transition-colors">
                Czytaj więcej
                <ArrowRight className="w-4 h-4" aria-hidden />
              </span>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 w-0 bg-[#d8f17b] group-hover:w-full transition-all duration-500 rounded-b-2xl" />
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
