'use client';

import { motion } from 'motion/react';
import { Copy, MessageSquare, FileText, Clock, AlertCircle, Sparkles } from 'lucide-react';

const painPoints = [
  { icon: Copy, title: 'Zbyt dużo pracy ręcznej', description: 'Przestań ręcznie przenosić dane między systemami. Automatyzujemy synchronizację i aktualizację danych, dzięki czemu oszczędzasz godziny każdego dnia.', gradient: 'from-pink-500 to-purple-500' },
  { icon: MessageSquare, title: 'Tracisz wiadomości i informacje', description: 'Wszystkie ważne wiadomości automatycznie trafiają we właściwe miejsca — do CRM, tabel i zadań. Nigdy więcej nie przegapisz leada ani zlecenia.', gradient: 'from-blue-500 to-cyan-500' },
  { icon: FileText, title: 'Zbyt dużo dokumentów', description: 'Zbieramy wszystko w jeden uporządkowany system. Koniec z godzinami szukania — wszystko masz pod ręką w kilka sekund.', gradient: 'from-purple-500 to-indigo-500' },
  { icon: Clock, title: 'Wszystko trwa za długo', description: 'Gdy każdy proces ciągnie się w nieskończoność, trudno myśleć o rozwoju. Automatyzujemy powtarzalne zadania, żebyś odzyskał czas na to, co naprawdę ważne.', gradient: 'from-amber-500 to-orange-500' },
  { icon: AlertCircle, title: 'Zbyt dużo stresu', description: 'Koniec z błędami i przeoczeniami. Automatyzacja dba o każdy szczegół, a Ty możesz skupić się na tym, co naprawdę ważne i odzyskać spokój.', gradient: 'from-rose-500 to-red-500' },
  { icon: Sparkles, title: 'Potrzebujesz profesjonalnego wyglądu', description: 'Zaprojektujemy nowoczesną stronę, która buduje zaufanie i robi wrażenie.', gradient: 'from-emerald-500 to-teal-500' },
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
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative"
    >
      <div className="relative h-full p-8 bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden transition-all duration-300 group-hover:border-purple-500/50 group-hover:shadow-[0_0_40px_rgba(147,51,234,0.3)]">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative flex items-center gap-4 mb-6">
          <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${point.gradient} p-0.5`}>
            <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center">
              <Icon className="w-7 h-7 text-white" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-white">{point.title}</h3>
        </div>
        <p className="relative text-slate-400 leading-relaxed">{point.description}</p>
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${point.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl`} />
      </div>
    </motion.div>
  );
}

export function PainPointsSection() {
  return (
    <section id="problems" aria-labelledby="pain-points-heading" className="relative py-10 sm:py-16 md:py-20 lg:py-24 xl:py-28 px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[800px] sm:h-[800px] bg-red-500/10 rounded-full blur-3xl" />
      <div className="relative z-10 max-w-7xl 2xl:max-w-8xl 3xl:max-w-9xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="inline-block mb-4 px-3 py-1.5 sm:px-4 sm:py-2 bg-red-500/10 border border-red-500/30 rounded-full">
            <span className="text-red-300 text-xs sm:text-sm font-medium uppercase tracking-wider">Co czujesz?</span>
          </motion.div>
          <motion.h2 id="pain-points-heading" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6 px-4">
            Znamy to <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">uczucie...</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="text-base sm:text-xl text-slate-400 max-w-3xl mx-auto px-2">
            Te same zadania, chaos i stres. Samodzielnie trudno to uporządkować — pomożemy.
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
