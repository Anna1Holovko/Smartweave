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
  Code2,
  Smartphone,
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
  'aplikacje-webowe': [AppWindow, Code2, Layout, Globe, Smartphone, Sparkles],
};

export function ServiceProblemCards({
  problems,
  slug,
  heading = 'Z jakimi problemami mierzą się nasi Partnerzy Biznesowi?',
}: {
  problems: ProblemCard[];
  slug: ServiceSlug;
  heading?: string;
}) {
  const icons = ICONS_BY_SLUG[slug] ?? ICONS_BY_SLUG.strony;
  const items = problems.slice(0, 6).map((p, i) => ({ ...p, icon: icons[i] ?? Sparkles }));

  return (
    <div className="mb-10 sm:mb-12 lg:mb-14">
      <h2 className="text-xl sm:text-2xl font-bold text-[#e4e4e7] mb-6 sm:mb-8">
        {heading}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div
                className="glass-card hover-lift relative h-full p-6 sm:p-8 rounded-2xl overflow-hidden"
                style={{ background: 'var(--bg-graphite-card)', backdropFilter: 'blur(16px)' }}
              >
                <div className="flex items-center gap-4 mb-4 sm:mb-5">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#d8f17b]/15 border border-[#d8f17b]/20 flex items-center justify-center">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#d8f17b]" aria-hidden />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#e4e4e7] leading-tight">
                    {item.title}
                  </h3>
                </div>
                <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                  {item.description}
                </p>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 w-0 bg-[#d8f17b] group-hover:w-full transition-all duration-500 rounded-b-2xl" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
