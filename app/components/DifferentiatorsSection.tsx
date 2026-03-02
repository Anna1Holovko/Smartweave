'use client';

import { motion } from 'motion/react';
import { Target, BarChart3, Layers, Handshake } from 'lucide-react';

const differentiators = [
  {
    icon: Target,
    title: 'Podejście strategiczne, nie narzędziowe',
    description: 'Zaczynamy od celów biznesowych i ograniczeń operacyjnych. Wybór technologii wynika z architektury, nie na odwrót.',
  },
  {
    icon: BarChart3,
    title: 'Koncentracja na ROI',
    description: 'Priorytetyzujemy obszary o największym wpływie na czas i koszty. Efekty mierzalne od pierwszego wdrożenia.',
  },
  {
    icon: Layers,
    title: 'Architektura dopasowana do modelu biznesowego',
    description: 'Projektujemy systemy pod Twój sposób działania i skalę — bez zbędnej złożoności i bez ograniczania przyszłego rozwoju.',
  },
  {
    icon: Handshake,
    title: 'Długofalowa współpraca i rozwój systemów',
    description: 'Traktujemy wdrożenia jako początek relacji. Optymalizacja, nowe use case’y i wsparcie przy zmianach w organizacji.',
  },
];

export function DifferentiatorsSection() {
  return (
    <section id="dlaczego-smartweave" aria-labelledby="differentiators-heading" className="relative py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 overflow-hidden">
      <div className="absolute inset-0 bg-slate-950" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-blue-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 sm:mb-20"
        >
          <h2 id="differentiators-heading" className="text-2xl sm:text-4xl md:text-5xl font-bold text-white">
            Dlaczego SmartWeave
          </h2>
          <p className="text-slate-400 mt-4 max-w-[56ch] mx-auto text-base sm:text-lg">
            Podejście biznesowe, mierzalne efekty, architektura pod Twój model — nie typowa agencja.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
          {differentiators.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8"
              >
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed">{item.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
