import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ScrollToTop } from '../components/ScrollToTop';
import { PageIntro } from '../components/PageIntro';
import { PORTFOLIO_ITEMS } from '@/lib/portfolio';
import { SITE_URL } from '@/lib/site';
import { SECTION_CLASS, CONTAINER_CLASS, INTRO_MB_CLASS } from '@/lib/layout';
import { ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Realizacje',
  description:
    'Zobacz realizacje SmartWeave: strony WWW, design i projekty dla firm',
  openGraph: {
    title: 'Realizacje | SmartWeave - strony WWW i design',
    description: 'Portfolio projektów: strony internetowe, branding i design dla firm',
    url: `${SITE_URL}/realizacje`,
  },
};

export default function RealizacjePage() {
  return (
    <>
      <Header />
      <main id="main-content" role="main" className="min-h-screen subpage-main">
        <section className={SECTION_CLASS}>
          <div className="absolute inset-0 bg-[var(--bg)]" />

          <div className={CONTAINER_CLASS}>
            <PageIntro
              backHref="/"
              backLabel="Strona główna"
              badge="Realizacje"
              badgeVariant="accent"
              title="Zobacz, jak wspieramy rozwój firm"
              description="Każdy projekt to wyjątkowa historia. Strony i automatyzacje, które realnie wspierają firmy"
              className={INTRO_MB_CLASS}
            />

            <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {PORTFOLIO_ITEMS.map((item, index) => (
                <article
                  key={index}
                  className="group relative flex flex-col rounded-2xl glass-card hover-lift overflow-hidden"
                  style={{ background: 'var(--bg-graphite-card)', backdropFilter: 'blur(16px)' }}
                >
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
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
                          sizes="(max-width: 479px) 100vw, (max-width: 1023px) 50vw, (max-width: 1535px) 33.33vw, (max-width: 1919px) 25vw, 20vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/60 via-transparent to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[var(--bg)]/40">
                          <ExternalLink className="w-8 h-8 text-[#d8f17b]" />
                        </div>
                      </div>
                    </div>
                    <div className="relative bg-[var(--bg-2)] border-t border-white/10 px-4 sm:px-5 py-4 sm:py-5 flex flex-col">
                      <span className="text-zinc-400 text-sm font-normal mb-1">{item.category}</span>
                      <h2 className="text-xl sm:text-2xl font-bold text-[#e4e4e7] group-hover:text-[#d8f17b] transition-colors pr-10">
                        {item.title}
                      </h2>
                      <div className="absolute right-4 bottom-4 flex items-center justify-center w-9 h-9 rounded-lg border border-white/15 bg-white/5 text-[#e4e4e7] group-hover:border-[#d8f17b]/50 group-hover:text-[#d8f17b] transition-colors">
                        <ExternalLink className="w-4 h-4" aria-hidden />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#d8f17b] group-hover:w-full transition-all duration-500" />
                  </a>
                </article>
              ))}
            </div>

            <div className="mt-10 sm:mt-12 lg:mt-16 text-center">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm sm:text-base transition-all h-12 min-h-12 px-6 sm:px-8 cta-gradient-animated"
              >
                Porozmawiajmy o Twoim projekcie
              </Link>
            </div>
          </div>
        </section>
        <div className="gradient-philosophy-to-footer">
          <Footer />
        </div>
      </main>
      <ScrollToTop />
    </>
  );
}
