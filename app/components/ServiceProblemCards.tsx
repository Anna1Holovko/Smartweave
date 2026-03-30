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
import { SECTION_H2_CLASS } from '@/lib/layout';

type ProblemCard = { title: string; description: string };

const ICONS_BY_SLUG: Record<ServiceSlug, LucideIcon[]> = {
  automatyzacja: [Copy, MessageSquare, FileText, Clock, AlertCircle, Sparkles],
  'agenci-ai': [Bot, MessageSquare, FileText, Clock, AlertCircle, TrendingUp],
  strony: [Globe, Search, MousePointer, FileEdit, Layout, Sparkles],
  branding: [Palette, Image, FileText, Type, RefreshCw, Sparkles],
  chatboty: [MessageSquare, Bot, Clock, Users, FileText, Sparkles],
  'aplikacje-webowe': [AppWindow, Layout, Globe],
};

function renderHeadingWithAccent(heading: string, accentPhrase: string | null | undefined) {
  if (accentPhrase == null || accentPhrase === '' || !heading.includes(accentPhrase)) {
    return heading;
  }
  const i = heading.indexOf(accentPhrase);
  return (
    <>
      {heading.slice(0, i)}
      <span className="text-[#d8f17b]">{accentPhrase}</span>
      {heading.slice(i + accentPhrase.length)}
    </>
  );
}

function ServiceProblemCard({
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
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      <div
        className="glass-card hover-lift relative h-full p-6 sm:p-8 rounded-2xl overflow-hidden"
        style={{ background: 'var(--bg-graphite-card)', backdropFilter: 'blur(16px)' }}
      >
        <div className="relative flex items-center gap-4 mb-6">
          <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-[#d8f17b]/15 border border-[#d8f17b]/20 flex items-center justify-center">
            <Icon className="w-7 h-7 text-[#d8f17b]" strokeWidth={1.75} aria-hidden />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-[#e4e4e7] leading-snug">{title}</h3>
        </div>
        <p className="relative text-zinc-400 text-sm sm:text-base leading-relaxed">{description}</p>
        <div className="absolute bottom-0 left-0 right-0 h-0.5 w-0 bg-[#d8f17b] group-hover:w-full transition-all duration-500 rounded-b-2xl" />
      </div>
    </motion.div>
  );
}

export function ServiceProblemCards({
  problems,
  slug,
  heading = 'Z jakimi problemami mierzą się nasi Partnerzy Biznesowi?',
  headingId = 'service-problems-heading',
  headingAccent,
}: {
  problems: ProblemCard[];
  slug: ServiceSlug;
  heading?: string;
  headingId?: string;
  /** Fragment `heading` podświetlony na limonkowo; `null` wyłącza akcent. Domyślnie „nasi Partnerzy Biznesowi?”. */
  headingAccent?: string | null;
}) {
  const accentPhrase = headingAccent === undefined ? 'nasi Partnerzy Biznesowi?' : headingAccent;
  const icons = ICONS_BY_SLUG[slug] ?? ICONS_BY_SLUG.strony;
  const items = problems.slice(0, 6).map((p, i) => ({ ...p, icon: icons[i] ?? Sparkles }));

  return (
    <section className="relative w-full py-10 sm:py-14 md:py-16 overflow-hidden" aria-labelledby={headingId}>
      <div className="relative z-10 w-full">
        <div className="text-left mb-12 sm:mb-14 md:mb-16">
          <motion.h2
            id={headingId}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`${SECTION_H2_CLASS} max-w-[90ch] leading-tight`}
          >
            {renderHeadingWithAccent(heading, accentPhrase)}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {items.map((item, index) => (
            <ServiceProblemCard
              key={index}
              title={item.title}
              description={item.description}
              Icon={item.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
