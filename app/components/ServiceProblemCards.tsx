'use client';

import { motion } from 'motion/react';
import {
  Copy,
  MessageSquare,
  FileText,
  Clock,
  AlertCircle,
  Sparkles,
  Globe,
  Search,
  MousePointer,
  FileEdit,
  Layout,
  Palette,
  Image,
  Type,
  RefreshCw,
  Users,
  Bot,
  TrendingUp,
  AppWindow,
  type LucideIcon,
} from 'lucide-react';
import { BrandMarkIcon } from '@/app/components/BrandMarkIcon';
import type { ServiceSlug } from '@/lib/services';

type ProblemCard = { title: string; description: string };

const ICONS_BY_SLUG: Record<ServiceSlug, LucideIcon[]> = {
  automatyzacja: [Copy, MessageSquare, FileText, Clock, AlertCircle, Sparkles],
  'agenci-ai': [Bot, MessageSquare, FileText, Clock, AlertCircle, TrendingUp],
  strony: [Globe, Search, MousePointer, FileEdit, Layout, Sparkles],
  branding: [Palette, Image, FileText, Type, RefreshCw, Sparkles],
  chatboty: [MessageSquare, Bot, Clock, Users, FileText, Sparkles],
  'aplikacje-webowe': [AppWindow, Layout, Globe],
};

/** Jak na stronie głównej (PainPointsSection): badge, duży tytuł dwukolorowy, lead. */
const HOME_PROBLEMS_COPY = {
  badge: 'Partnerzy biznesowi',
  titleLead: 'Z jakimi problemami',
  titleAccent: 'mierzą się nasi Partnerzy Biznesowi?',
  intro:
    'Te same sygnały widzimy u firm B2B — dobrze zaprojektowana strona i ścieżka kontaktu pomagają je rozwiązać.',
} as const;

function ProblemGlassCard({
  title,
  description,
  Icon,
  index,
}: {
  title: string;
  description: string;
  Icon: LucideIcon;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      <div
        className="glass-card hover-lift relative h-full p-8 rounded-2xl overflow-hidden"
        style={{ background: 'var(--bg-graphite-card)', backdropFilter: 'blur(16px)' }}
      >
        <div className="relative flex items-center gap-4 mb-6">
          <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-[#d8f17b]/15 border border-[#d8f17b]/20 flex items-center justify-center">
            <Icon className="w-7 h-7 text-[#d8f17b]" aria-hidden />
          </div>
          <h3 className="text-xl font-bold text-[#e4e4e7]">{title}</h3>
        </div>
        <p className="relative text-zinc-400 leading-relaxed">{description}</p>
        <div
          className="absolute bottom-0 left-0 right-0 h-0.5 w-0 bg-[#d8f17b] group-hover:w-full transition-all duration-500 rounded-b-2xl"
          aria-hidden
        />
      </div>
    </motion.div>
  );
}

export function ServiceProblemCards({
  problems,
  slug,
  heading = 'Z jakimi problemami mierzą się nasi Partnerzy Biznesowi?',
  headingId = 'service-problems-heading',
  /** `home` — jak PainPointsSection na stronie głównej (graphite, badge, karty glass). `editorial` — lista wierszy jak wcześniej. */
  variant = 'editorial',
}: {
  problems: ProblemCard[];
  slug: ServiceSlug;
  heading?: string;
  headingId?: string;
  variant?: 'editorial' | 'home';
}) {
  const icons = ICONS_BY_SLUG[slug] ?? ICONS_BY_SLUG.strony;
  const items = problems.slice(0, 6).map((p, i) => ({ ...p, icon: icons[i] ?? Sparkles }));

  if (variant === 'home') {
    return (
      <section
        aria-labelledby={headingId}
        className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-x-hidden py-10 sm:py-16 md:py-20 lg:py-24 xl:py-28 px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12"
      >
        <div className="absolute inset-0 bg-[var(--bg-graphite)]" />
        <div className="relative z-10 max-w-7xl 2xl:max-w-8xl 3xl:max-w-9xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center justify-center gap-2 mb-4 text-[#d8f17b] text-xs sm:text-sm font-medium uppercase tracking-wider"
            >
              <BrandMarkIcon />
              {HOME_PROBLEMS_COPY.badge}
            </motion.div>
            <motion.h2
              id={headingId}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#e4e4e7] mb-4 sm:mb-6 px-4"
            >
              <span className="text-[#e4e4e7]">{HOME_PROBLEMS_COPY.titleLead}</span>{' '}
              <span className="text-[#d8f17b]">{HOME_PROBLEMS_COPY.titleAccent}</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-xl text-zinc-400 max-w-[80ch] mx-auto"
            >
              {HOME_PROBLEMS_COPY.intro}
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {items.map((item, index) => (
              <ProblemGlassCard
                key={index}
                index={index}
                title={item.title}
                description={item.description}
                Icon={item.icon}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-20 md:py-24" aria-labelledby={headingId}>
      <h2
        id={headingId}
        className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500 mb-10 sm:mb-14 max-w-2xl"
      >
        {heading}
      </h2>
      <ul className="divide-y divide-white/[0.08] border-t border-white/[0.08]">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start"
            >
              <div className="md:col-span-1 flex md:flex-col items-center md:items-start gap-3 text-zinc-600 text-xs font-mono tabular-nums tracking-wider">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-[#d8f17b]">
                  <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </span>
                <span className="hidden md:inline text-[10px]">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <div className="md:col-span-4">
                <h3 className="text-lg sm:text-xl font-semibold text-[#e4e4e7] leading-snug">{item.title}</h3>
              </div>
              <p className="md:col-span-7 text-zinc-400 text-sm sm:text-base leading-relaxed">{item.description}</p>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}
