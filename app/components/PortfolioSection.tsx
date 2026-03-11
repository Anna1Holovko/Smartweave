'use client';

import { motion } from 'motion/react';
import { ExternalLink, ArrowRight, ArrowLeft } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PORTFOLIO_ITEMS } from '@/lib/portfolio';

export function PortfolioSection() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToMore = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ left: scrollPosition + containerRef.current.scrollWidth / 2, behavior: 'smooth' });
    }
  };
  const scrollToLess = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ left: scrollPosition - containerRef.current.scrollWidth / 2, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const ref = containerRef.current;
    if (!ref) return;
    const handleScroll = () => {
      setScrollPosition(ref.scrollLeft);
      setMaxScroll(ref.scrollWidth - ref.clientWidth);
    };
    ref.addEventListener('scroll', handleScroll);
    setMaxScroll(ref.scrollWidth - ref.clientWidth);
    return () => ref.removeEventListener('scroll', handleScroll);
  }, []);

  const itemWidth = containerRef.current ? containerRef.current.scrollWidth / PORTFOLIO_ITEMS.length : 0;
  const visibleStartIndex = Math.floor(scrollPosition / itemWidth) || 0;
  const hiddenItemsLeft = visibleStartIndex;
  const hiddenItemsRight = Math.max(0, PORTFOLIO_ITEMS.length - visibleStartIndex - 3);

  return (
    <section id="portfolio" aria-labelledby="portfolio-heading" className="relative py-10 sm:py-16 md:py-20 lg:py-24 xl:py-28 px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 overflow-visible">
      <div className="absolute inset-0 bg-[var(--bg-graphite)]" />

      <div className="relative z-10 max-w-7xl 2xl:max-w-8xl 3xl:max-w-9xl mx-auto">
        <div className="text-center mb-12 sm:mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="inline-block mb-4 px-3 py-1.5 sm:px-4 sm:py-2 bg-[#d8f17b]/10 border border-[#d8f17b]/30 rounded-full">
            <span className="text-[#d8f17b] text-xs sm:text-sm font-medium uppercase tracking-wider">Realizacje</span>
          </motion.div>
          <motion.h2 id="portfolio-heading" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#e4e4e7] mb-4 sm:mb-6 px-4">
            <span className="text-[#d8f17b]">Zobacz, jak wspieramy rozwój innych firm</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="text-base sm:text-xl text-zinc-400 max-w-[80ch] mx-auto px-2 mb-6">
            Każdy projekt to wyjątkowa historia. Strony i automatyzacje, które realnie wspierają firmy
          </motion.p>
        </div>

        <div className="relative py-8">
          <div ref={containerRef} className="flex gap-4 sm:gap-8 overflow-x-auto scroll-smooth pb-4 scrollbar-hide py-4 px-4 sm:px-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {PORTFOLIO_ITEMS.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative flex-shrink-0 w-[85vw] sm:w-[calc(50%-1rem)] lg:w-[calc((100%-4rem)/3)] min-w-[280px] sm:min-w-[320px]"
              >
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="block h-full" title={`Zobacz realizację: ${item.title}`}>
                  <div className="glass-card hover-lift relative overflow-hidden rounded-2xl flex flex-col h-full">
                    <div className="relative flex-1 min-h-[200px] sm:min-h-[240px] p-3 sm:p-4">
                      <div className="relative w-full h-full min-h-[180px] sm:min-h-[220px] rounded-lg overflow-hidden bg-white/5 border border-white/10 shadow-inner">
                        <Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width: 640px) 85vw, 50vw" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-graphite)]/60 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[var(--bg-graphite)]/40">
                          <ExternalLink className="w-8 h-8 text-[#d8f17b]" />
                        </div>
                      </div>
                    </div>
                    <div className="relative bg-[var(--bg-graphite-elevated)] border-t border-white/10 px-4 sm:px-5 py-4 sm:py-5 flex flex-col">
                      <span className="text-zinc-400 text-sm font-normal mb-1">{item.category}</span>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#e4e4e7] group-hover:text-[#d8f17b] transition-colors pr-10">{item.title}</h3>
                      <div className="absolute right-4 bottom-4 flex items-center justify-center w-9 h-9 rounded-lg border border-white/15 bg-white/5 text-[#e4e4e7] group-hover:border-[#d8f17b]/50 group-hover:text-[#d8f17b] transition-colors">
                        <ExternalLink className="w-4 h-4" aria-hidden />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#d8f17b] group-hover:w-full transition-all duration-500" />
                  </div>
                </a>
              </motion.div>
            ))}
          </div>

          {hiddenItemsRight > 0 && (
            <motion.button
              type="button"
              onClick={scrollToMore}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.1 }}
              className="group/arrow absolute right-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center gap-3 h-12 min-h-12 px-4 bg-[#d8f17b]/10 border border-[#d8f17b]/30 rounded-full backdrop-blur-xl transition-all duration-300 hover:border-[#d8f17b]/50 hover:shadow-[0_0_30px_rgba(216,241,123,0.2)]"
            >
              <span className="text-[#d8f17b] font-semibold text-sm">+{hiddenItemsRight}</span>
              <ArrowRight className="w-6 h-6 text-[#d8f17b]" />
            </motion.button>
          )}
          {hiddenItemsLeft > 0 && (
            <motion.button
              type="button"
              onClick={scrollToLess}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.1 }}
              className="group/arrow absolute left-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center gap-3 h-12 min-h-12 px-4 bg-[#d8f17b]/10 border border-[#d8f17b]/30 rounded-full backdrop-blur-xl transition-all duration-300 hover:border-[#d8f17b]/50 hover:shadow-[0_0_30px_rgba(216,241,123,0.2)]"
            >
              <ArrowLeft className="w-6 h-6 text-[#d8f17b]" />
              <span className="text-[#d8f17b] font-semibold text-sm">+{hiddenItemsLeft}</span>
            </motion.button>
          )}
        </div>

        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="flex justify-center mt-8 sm:mt-12">
          <Link
            href="/realizacje"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#d8f17b]/40 bg-[#d8f17b]/10 text-[#d8f17b] font-medium hover:bg-[#d8f17b]/20 hover:border-[#d8f17b]/60 transition-colors"
          >
            Zobacz wszystkie realizacje
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
