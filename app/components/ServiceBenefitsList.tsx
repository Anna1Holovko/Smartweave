'use client';

import { motion } from 'motion/react';
import { Check } from 'lucide-react';

export function ServiceBenefitsList({ benefits }: { benefits: readonly string[] }) {
  return (
    <ul className="space-y-3 text-zinc-400 max-w-[80ch]">
      {benefits.map((benefit, idx) => (
        <motion.li
          key={idx}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: idx * 0.06 }}
          className="flex items-start gap-3 text-sm sm:text-base"
        >
          <Check className="w-5 h-5 text-[#d8f17b] mt-0.5 flex-shrink-0" aria-hidden />
          <span>{benefit}</span>
        </motion.li>
      ))}
    </ul>
  );
}
