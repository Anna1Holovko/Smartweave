'use client';

import { motion } from 'motion/react';

type ProcessItem = { step: number; title: string; description: string };

export function ServiceProcessSteps({ process }: { process: readonly ProcessItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {process.map((item, index) => (
        <motion.div
          key={item.step}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -4 }}
          className="group relative"
        >
          <div
            className="glass-card hover-lift relative h-full p-5 sm:p-6 rounded-xl overflow-hidden"
            style={{ background: 'var(--bg-graphite-card)', backdropFilter: 'blur(16px)' }}
          >
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#d8f17b]/20 text-[#d8f17b] text-sm font-bold mb-3">
              {item.step}
            </span>
            <h3 className="text-[#e4e4e7] font-semibold mb-2">{item.title}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">{item.description}</p>
            <div className="absolute bottom-0 left-0 right-0 h-0.5 w-0 bg-[#d8f17b] group-hover:w-full transition-all duration-500 rounded-b-xl" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
