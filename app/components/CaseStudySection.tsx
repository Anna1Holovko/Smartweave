'use client';

import { motion } from 'motion/react';
import { AlertCircle, Lightbulb, Cpu, TrendingUp } from 'lucide-react';

const caseStudy = {
  challenge: 'Firma B2B z rosnącym wolumenem leadów i ręczną kwalifikacją. Czas reakcji wydłużał się, część zapytań ginęła w skrzynce.',
  strategy: 'Analiza obiegu leadów, projekt automatyzacji kwalifikacji i powiadomień oraz integracja z CRM i pocztą.',
  implementation: 'Wdrożenie workflowów: odbiór wiadomości, scoring, przypisanie do handlowca i powiadomienia. Szkolenie zespołu i uruchomienie w środowisku produkcyjnym.',
  result: {
    timeSaved: 'ok. 15 h / tydzień',
    costReduction: 'redukcja kosztów operacyjnych w obszarze obsługi leadów o ok. 40%',
    improvement: 'skrócenie czasu pierwszej reakcji o ok. 70%',
    revenueImpact: 'wzrost liczby przekwalifikowanych leadów o ok. 35% w pierwszym kwartale',
  },
};

const blocks = [
  { label: 'Wyzwanie', content: caseStudy.challenge, icon: AlertCircle },
  { label: 'Strategia', content: caseStudy.strategy, icon: Lightbulb },
  { label: 'Wdrożenie', content: caseStudy.implementation, icon: Cpu },
  {
    label: 'Rezultat',
    content: (
      <ul className="space-y-2 text-slate-400 text-sm sm:text-base">
        <li>· Oszczędność czasu: {caseStudy.result.timeSaved}</li>
        <li>· {caseStudy.result.costReduction}</li>
        <li>· {caseStudy.result.improvement}</li>
        <li>· {caseStudy.result.revenueImpact}</li>
      </ul>
    ),
    icon: TrendingUp,
  },
];

export function CaseStudySection() {
  return (
    <section id="case-study" aria-labelledby="case-study-heading" className="relative py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 sm:mb-20"
        >
          <p className="text-slate-500 text-xs sm:text-sm font-medium uppercase tracking-wider mb-3">Przykład wdrożenia</p>
          <h2 id="case-study-heading" className="text-2xl sm:text-4xl md:text-5xl font-bold text-white">
            Od wyzwania do rezultatu
          </h2>
        </motion.div>

        <div className="space-y-6">
          {blocks.map((block, index) => {
            const Icon = block.icon;
            return (
              <motion.article
                key={block.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-purple-400" />
                  </div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">{block.label}</h3>
                </div>
                <div className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {typeof block.content === 'string' ? block.content : block.content}
                </div>
              </motion.article>
            );
          })}
        </div>
        <p className="text-slate-500 text-xs mt-6 text-center">
          Przykład ilustracyjny. Faktyczne wyniki zależą od zakresu i kontekstu wdrożenia.
        </p>
      </div>
    </section>
  );
}
