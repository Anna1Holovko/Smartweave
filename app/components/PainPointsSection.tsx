'use client';

import { motion } from 'motion/react';
import { Copy, MessageSquare, FileText, Clock, AlertCircle, Sparkles } from 'lucide-react';
import { BrandMarkIcon } from './BrandMarkIcon';
import { SECTION_H2_CLASS } from '@/lib/layout';

const painPoints = [
  {
    icon: Copy,
    title: 'Zbyt dużo pracy ręcznej',
    description:
      'Przestań ręcznie przenosić dane między systemami. Automatycznie synchronizujemy i aktualizujemy dane, dzięki czemu oszczędzasz godziny każdego dnia',
    gradient: 'from-pink-500 to-purple-500',
  },
  {
    icon: MessageSquare,
    title: 'Tracisz wiadomości i informacje',
    description:
      'Wszystkie ważne wiadomości automatycznie trafiają we właściwe miejsca - do CRM, tabel i zadań. Nigdy więcej nie przegapisz leada ani zlecenia',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: FileText,
    title: 'Zbyt dużo dokumentów',
    description:
      'Zbieramy wszystko w jeden uporządkowany system. Koniec z godzinami szukania - wszystko masz pod ręką w kilka sekund',
    gradient: 'from-purple-500 to-indigo-500',
  },
  {
    icon: Clock,
    title: 'Wszystko trwa za długo',
    description:
      'Gdy każdy proces ciągnie się w nieskończoność, trudno myśleć o rozwoju. Automatyzujemy powtarzalne zadania, żebyś odzyskał czas na to, co naprawdę ważne',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    icon: AlertCircle,
    title: 'Zbyt dużo stresu',
    description:
      'Koniec z błędami i przeoczeniami. Automatyzacja dba o każdy szczegół, a Ty możesz skupić się na tym, co naprawdę ważne i odzyskać spokój',
    gradient: 'from-rose-500 to-red-500',
  },
  {
    icon: Sparkles,
    title: 'Potrzebujesz profesjonalnego wyglądu',
    description: 'Zaprojektujemy nowoczesną stronę, która buduje zaufanie i robi wrażenie',
    gradient: 'from-emerald-500 to-teal-500',
  },
];

function PainPointCard({
  point,
  index,
}: {
  point: { icon: React.ComponentType<{ className?: string }>; title: string; description: string; gradient: string };
  index: number;
}) {
  const Icon = point.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      <div className="glass-card hover-lift relative h-full p-8 rounded-2xl overflow-hidden" style={{ background: 'var(--bg-graphite-card)', backdropFilter: 'blur(16px)' }}>
        <div className="relative flex items-center gap-4 mb-6">
          <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-[#d8f17b]/15 border border-[#d8f17b]/20 flex items-center justify-center">
            <Icon className="w-7 h-7 text-[#d8f17b]" />
          </div>
          <h3 className="text-xl font-bold text-[#e4e4e7]">{point.title}</h3>
        </div>
        <p className="relative text-zinc-400 leading-relaxed">{point.description}</p>
        <div className="absolute bottom-0 left-0 right-0 h-0.5 w-0 bg-[#d8f17b] group-hover:w-full transition-all duration-500 rounded-b-2xl" />
      </div>
    </motion.div>
  );
}

export function PainPointsSection() {
  return (
    <section id="problems" aria-labelledby="pain-points-heading" className="relative py-10 sm:py-16 md:py-20 lg:py-24 xl:py-28 px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 overflow-hidden">
      <div className="absolute inset-0 bg-[var(--bg-graphite)]" />
      <div className="relative z-10 max-w-7xl 2xl:max-w-8xl 3xl:max-w-9xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center gap-2 mb-4 text-[#d8f17b] text-xs sm:text-sm font-medium uppercase tracking-wider"
          >
            <BrandMarkIcon />
            Co czujesz?
          </motion.div>
          <motion.h2 id="pain-points-heading" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className={`${SECTION_H2_CLASS} mb-4 sm:mb-6 px-4`}>
            Znamy to <span className="text-[#d8f17b]">uczucie...</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-xl text-zinc-400 max-w-[80ch] mx-auto text-center leading-relaxed"
          >
            Te same zadania, chaos i stres. Samodzielnie trudno to uporządkować - pomożemy
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {painPoints.map((point, index) => (
            <PainPointCard key={index} point={point} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
