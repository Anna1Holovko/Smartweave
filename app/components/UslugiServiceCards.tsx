'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { Globe, Workflow, Palette, Bot, Check, ArrowUpRight } from 'lucide-react';
import { SERVICES } from '@/lib/services';

const SERVICE_ICONS = [Globe, Palette, Workflow, Bot] as const;

export function UslugiServiceCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16 items-stretch">
      {SERVICES.map((service, index) => {
        const Icon = SERVICE_ICONS[index];
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
              className="relative flex flex-col w-full h-full min-h-0 p-8 bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl transition-all duration-300 group-hover:border-purple-500/50 group-hover:shadow-[0_0_40px_rgba(147,51,234,0.2)] overflow-hidden"
            >
              <div className="flex items-center gap-4 mb-6 flex-shrink-0 min-h-14">
                <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} p-0.5`}>
                  <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                </div>
                <h2 className="text-xl font-bold text-white flex-1 min-w-0">{service.title}</h2>
                <div className="flex-shrink-0 w-9 h-9 rounded-lg border border-slate-600/50 bg-slate-800/80 flex items-center justify-center text-slate-400 group-hover:text-purple-400 group-hover:border-purple-500/50 transition-colors" aria-hidden>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
              <p className="text-slate-400 leading-relaxed flex-shrink-0">{service.description}</p>
              <ul className="space-y-3 mt-6 flex-1 min-h-0">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-400">
                    <Check className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" aria-hidden />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className={`absolute bottom-0 left-0 right-0 h-1 w-0 bg-gradient-to-r ${service.gradient} group-hover:w-full transition-all duration-500 rounded-b-2xl`} />
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
