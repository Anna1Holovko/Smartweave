'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/blog';
import { BrandMarkIcon } from './BrandMarkIcon';

export function BlogSection() {
  const featuredPosts = BLOG_POSTS.slice(0, 3);

  return (
    <section id="blog" aria-labelledby="blog-heading" className="relative py-10 sm:py-16 md:py-20 lg:py-24 xl:py-28 px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 overflow-hidden">
      <div className="absolute inset-0 bg-[var(--bg-graphite)]" />

      <div className="relative z-10 max-w-7xl 2xl:max-w-8xl 3xl:max-w-9xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center gap-2 mb-3 sm:mb-4 text-[#d8f17b] text-xs sm:text-sm font-medium uppercase tracking-wider"
          >
            <BrandMarkIcon />
            Blog
          </motion.div>
          <motion.h2
            id="blog-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-[#e4e4e7] mb-3 sm:mb-4 lg:mb-6 px-2 sm:px-4"
          >
            Zdobądź wiedzę na temat{' '}
            <span className="text-[#d8f17b]">
              AI i automatyzacji!
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-xl text-zinc-400 max-w-[80ch]"
          >
            Praktyczne artykuły o wdrażaniu automatyzacji, narzędziach i procesach biznesowych
          </motion.p>
        </div>

        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {featuredPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative flex flex-col rounded-2xl glass-card hover-lift overflow-hidden"
              style={{ background: 'var(--bg-graphite-card)', backdropFilter: 'blur(16px)' }}
            >
              <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-white/5">
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 479px) 100vw, (max-width: 1023px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-graphite)]/60 via-transparent to-transparent" />
                </div>
                <div className="flex flex-col flex-1 p-4 sm:p-5 lg:p-6">
                  <h3 className="text-base sm:text-lg font-bold text-[#e4e4e7] mb-1.5 sm:mb-2 group-hover:text-[#d8f17b] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 w-0 bg-[#d8f17b] group-hover:w-full transition-all duration-500" />
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex justify-center mt-10 sm:mt-12 lg:mt-14"
        >
          <Link
            href="/blog"
            className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 sm:px-5 py-2.5 rounded-full border border-[#d8f17b]/40 bg-[#d8f17b]/10 text-[#d8f17b] text-sm sm:text-base font-medium hover:bg-[#d8f17b]/20 hover:border-[#d8f17b]/60 transition-colors"
          >
            Zobacz wszystkie artykuły
            <ArrowRight className="w-4 h-4 flex-shrink-0" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
