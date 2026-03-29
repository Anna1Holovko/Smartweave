'use client';

import { motion, useReducedMotion } from 'motion/react';

type Props = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

/**
 * Spring-based reveal for /uslugi/strony — pairs with StronyServicePremiumIntro.
 */
export function StronyMotionSection({ children, delay = 0, className = '' }: Props) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-48px' }}
      transition={{
        type: 'spring',
        damping: 26,
        stiffness: 200,
        delay: reduce ? 0 : delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
