'use client';

import { motion } from 'motion/react';

type MotionFadeInProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  /**
   * `inView` — animate when scrolled into view (can fail on some mobile browsers with overflow/containment).
   * `mount` — animate on mount (reliable for hero/media above the fold).
   */
  variant?: 'inView' | 'mount';
};

export function MotionFadeIn({ children, delay = 0, className = '', variant = 'inView' }: MotionFadeInProps) {
  const transition = { duration: 0.6, delay };
  const initial = { opacity: 0, y: 20 };

  if (variant === 'mount') {
    return (
      <motion.div
        initial={initial}
        animate={{ opacity: 1, y: 0 }}
        transition={transition}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05, margin: '0px 0px -10% 0px' }}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}
