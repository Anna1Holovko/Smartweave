'use client';

import { motion } from 'motion/react';
import { Search, Layout, Cpu, TrendingUp } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Analiza operacyjna',
    description: 'Mapowanie procesów, identyfikacja wąskich gardeł i obszarów o najwyższym ROI automatyzacji. Jedna, wspólna diagnoza przed projektem.',
  },
  {
    number: '02',
    icon: Layout,
    title: 'Projekt architektury automatyzacji',
    description: 'Propozycja architektury: które procesy automatyzować, w jakiej kolejności, z jakimi systemami. Bez implementacji na ślepo.',
  },
  {
    number: '03',
    icon: Cpu,
    title: 'Wdrożenie i integracja',
    description: 'Budowa workflowów, integracja z CRM, pocztą i narzędziami. Testy, przekazanie wiedzy i uruchomienie w środowisku docelowym.',
  },
  {
    number: '04',
    icon: TrendingUp,
    title: 'Skalowanie i optymalizacja',
    description: 'Monitorowanie efektów, dostrajanie wyjątków i rozszerzanie na kolejne procesy. Długofalowa współpraca przy rozwoju systemów.',
  },
];

export function MethodologySection() {
  return (
    <section id="jak-pracujemy" aria-labelledby="methodology-heading" className="relative py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] sm:w-[900px] sm:h-[900px] bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 sm:mb-20"
        >
          <p className="text-slate-500 text-xs sm:text-sm font-medium uppercase tracking-wider mb-3">Metodologia</p>
          <h2 id="methodology-heading" className="text-2xl sm:text-4xl md:text-5xl font-bold text-white">
            Jak pracujemy
          </h2>
          <p className="text-slate-400 mt-4 max-w-[60ch] mx-auto text-base sm:text-lg">
            Strukturyzowane podejście doradczo-wdrożeniowe, dopasowane do skali i modelu biznesowego.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-600 to-transparent" />
          <ul className="space-y-0">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.li
                  key={step.number}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-16 sm:pl-20 pb-12 sm:pb-16 last:pb-0"
                >
                  <div className="absolute left-0 top-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-slate-800/80 border border-slate-700/50 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <span className="text-slate-500 text-xs font-mono">{step.number}</span>
                  <h3 className="text-lg sm:text-xl font-bold text-white mt-1 mb-2">{step.title}</h3>
                  <p className="text-slate-400 text-sm sm:text-base leading-relaxed">{step.description}</p>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
