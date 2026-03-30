'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { BrandMarkIcon } from './BrandMarkIcon';

type PageIntroProps = {
  backHref: string;
  backLabel: string;
  badge: string;
  badgeVariant?: 'cyan' | 'blue' | 'purple' | 'accent';
  title: React.ReactNode;
  description?: string;
  className?: string;
};

const badgeStyles = {
  cyan: 'text-cyan-300',
  blue: 'text-blue-300',
  purple: 'text-purple-300',
  accent: 'text-[#d8f17b]',
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
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-[#d8f17b] transition-colors min-h-[44px] min-w-[44px] items-center justify-center sm:min-h-0 sm:min-w-0 sm:justify-start"
        >
          <ArrowLeft className="w-4 h-4 flex-shrink-0" />
          <span>{backLabel}</span>
        </Link>
      </motion.div>
      <div className="w-full flex flex-col items-stretch text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`self-center inline-flex items-center justify-center gap-2 mb-3 sm:mb-4 text-xs sm:text-sm font-medium uppercase tracking-wider ${badgeStyles[badgeVariant]}`}
        >
          <BrandMarkIcon />
          {badge}
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-[#e4e4e7] mb-3 sm:mb-4 lg:mb-6 px-2 sm:px-4 break-words"
        >
          {title}
        </motion.h1>
        {description ? (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full text-base sm:text-xl text-zinc-400"
          >
            {description}
          </motion.p>
        ) : null}
      </div>
    </div>
  );
}
