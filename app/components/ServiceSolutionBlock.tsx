'use client';

import { motion } from 'motion/react';

export function ServiceSolutionBlock({ solution }: { solution: string }) {
  const paragraphs = solution.split(/\n\n+/);
  return (
    <div className="text-zinc-400 leading-relaxed max-w-[80ch] space-y-4">
      {paragraphs.map((paragraph, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: i * 0.08 }}
        >
          {paragraph}
        </motion.p>
      ))}
    </div>
  );
}
