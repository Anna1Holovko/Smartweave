'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

type PageIntroProps = {
  backHref: string;
  backLabel: string;
  badge: string;
  badgeVariant?: 'cyan' | 'blue' | 'purple';
  title: React.ReactNode;
  description: string;
  className?: string;
};

const badgeStyles = {
  cyan: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300',
  blue: 'bg-blue-500/10 border-blue-500/30 text-blue-300',
  purple: 'bg-purple-500/10 border-purple-500/30 text-purple-300',
};

export function PageIntro({
  backHref,
  backLabel,
  badge,
  badgeVariant = 'blue',
  title,
  description,
  className = '',
}: PageIntroProps) {
  return (
    <div className={className}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-6 sm:mb-8 lg:mb-12"
      >
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-slate-400 hover:text-purple-400 transition-colors min-h-[44px] min-w-[44px] items-center justify-center sm:min-h-0 sm:min-w-0 sm:justify-start"
        >
          <ArrowLeft className="w-4 h-4 flex-shrink-0" />
          <span>{backLabel}</span>
        </Link>
      </motion.div>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`inline-block mb-3 sm:mb-4 px-3 py-1.5 sm:px-4 sm:py-2 border rounded-full text-xs sm:text-sm font-medium uppercase tracking-wider ${badgeStyles[badgeVariant]}`}
        >
          {badge}
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white mb-3 sm:mb-4 lg:mb-6 px-2 sm:px-4"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base sm:text-xl text-slate-400 max-w-[80ch] mx-auto px-2"
        >
          {description}
        </motion.p>
      </div>
    </div>
  );
}
