'use client';

import { motion } from 'motion/react';

type MotionFadeInProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

export function MotionFadeIn({ children, delay = 0, className = '' }: MotionFadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
