'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import type { PORTFOLIO_ITEMS } from '@/lib/portfolio';

type PortfolioItem = (typeof PORTFOLIO_ITEMS)[number];

export function ServiceRealizacjeGrid({ items }: { items: readonly PortfolioItem[] }) {
  return (
    <>
      <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {items.map((item, index) => (
          <motion.article
            key={index}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -6 }}
            className="group relative flex flex-col rounded-2xl glass-card hover-lift overflow-hidden"
            style={{ background: 'var(--bg-graphite-card)', backdropFilter: 'blur(16px)' }}
          >
            <a
              href={item.link}
              target={item.link.startsWith('http') ? '_blank' : undefined}
              rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="flex flex-col h-full"
              title={`Zobacz realizację: ${item.title}`}
            >
              <div className="relative flex-1 min-h-[200px] p-3 sm:p-4">
                <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden bg-white/5 border border-white/10 shadow-inner">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 479px) 100vw, (max-width: 1023px) 50vw, 33.33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/60 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[var(--bg)]/40">
                    <ExternalLink className="w-8 h-8 text-[#d8f17b]" />
                  </div>
                </div>
              </div>
              <div className="relative bg-[var(--bg-2)] border-t border-white/10 px-4 sm:px-5 py-4 sm:py-5 flex flex-col">
                <span className="text-zinc-400 text-sm font-normal mb-1">{item.category}</span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#e4e4e7] group-hover:text-[#d8f17b] transition-colors pr-10">
                  {item.title}
                </h3>
                <div className="absolute right-4 bottom-4 flex items-center justify-center w-9 h-9 rounded-lg border border-white/15 bg-white/5 text-[#e4e4e7] group-hover:border-[#d8f17b]/50 group-hover:text-[#d8f17b] transition-colors">
                  <ExternalLink className="w-4 h-4" aria-hidden />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#d8f17b] group-hover:w-full transition-all duration-500" />
            </a>
          </motion.article>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-8 sm:mt-10 text-center"
      >
        <Link
          href="/realizacje"
          className="inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm sm:text-base transition-all h-12 min-h-12 px-6 sm:px-8 cta-gradient-animated"
        >
          Zobacz wszystkie realizacje
        </Link>
      </motion.div>
    </>
  );
}
