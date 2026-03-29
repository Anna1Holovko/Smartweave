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

export function ServiceProblemCards({
  problems,
  slug,
  heading = 'Z jakimi problemami mierzą się nasi Partnerzy Biznesowi?',
  headingId = 'service-problems-heading',
  listWithoutDividers = false,
}: {
  problems: ProblemCard[];
  slug: ServiceSlug;
  heading?: string;
  /** Domyślnie `service-problems-heading`; nadpisz, gdy sekcja nadrzędna ma `aria-labelledby`. */
  headingId?: string;
  /** Bez poziomych linii między kartami (np. strona stron www). */
  listWithoutDividers?: boolean;
}) {
  const icons = ICONS_BY_SLUG[slug] ?? ICONS_BY_SLUG.strony;
  const items = problems.slice(0, 6).map((p, i) => ({ ...p, icon: icons[i] ?? Sparkles }));

  return (
    <section className="py-16 sm:py-20 md:py-24" aria-labelledby={headingId}>
      <h2
        id={headingId}
        className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500 mb-10 sm:mb-14 max-w-2xl"
      >
        {heading}
      </h2>
      <ul
        className={
          listWithoutDividers ? '' : 'divide-y divide-white/[0.08] border-t border-white/[0.08]'
        }
      >
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
