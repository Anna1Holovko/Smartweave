'use client';

import { motion } from 'motion/react';

export function PhilosophySection() {
  return (
    <section id="philosophy" aria-labelledby="philosophy-heading" className="relative py-10 sm:py-16 md:py-20 lg:py-24 xl:py-28 px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 overflow-hidden">
      <div className="relative z-10 max-w-7xl 2xl:max-w-8xl 3xl:max-w-9xl mx-auto">
        <div className="text-center mb-12 sm:mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="inline-block mb-4 px-3 py-1.5 sm:px-4 sm:py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full">
            <span className="text-indigo-300 text-xs sm:text-sm font-medium uppercase tracking-wider">Nasza filozofia</span>
          </motion.div>
          <motion.h2 id="philosophy-heading" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6 px-4">
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Proste. Przejrzyste. Skuteczne.</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-base sm:text-xl text-slate-400 max-w-3xl mx-auto px-2">
            Proste, przejrzyste rozwiązania. Dostosowujemy narzędzia do Twoich potrzeb i wymiernych efektów.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
