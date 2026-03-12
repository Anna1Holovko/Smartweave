import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { ScrollToTop } from '../../components/ScrollToTop';
import { PageIntro } from '../../components/PageIntro';
import { SITE_URL } from '@/lib/site';
import { SECTION_CLASS, CONTAINER_CLASS, INTRO_MB_CLASS } from '@/lib/layout';
import { Construction } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Realizacje — Automatyzacja procesów',
  description:
    'Realizacje z zakresu automatyzacji procesów biznesowych — strona w przygotowaniu.',
  openGraph: {
    title: 'Realizacje — Automatyzacja procesów | SmartWeave',
    description: 'Strona w trakcie tworzenia.',
    url: `${SITE_URL}/realizacje/automatyzacja`,
  },
};

export default function RealizacjeAutomatyzacjaPage() {
  return (
    <>
      <Header />
      <main id="main-content" role="main" className="min-h-screen subpage-main">
        <section className={SECTION_CLASS}>
          <div className="absolute inset-0 bg-[var(--bg)]" />

          <div className={CONTAINER_CLASS}>
            <PageIntro
              backHref="/realizacje"
              backLabel="Realizacje"
              badge="Realizacje"
              badgeVariant="accent"
              title="Automatyzacja procesów"
              description="Zobacz realizacje z zakresu automatyzacji"
              className={INTRO_MB_CLASS}
            />

            <div
              className="flex flex-col items-center justify-center py-16 sm:py-24 rounded-2xl glass-card"
              style={{ background: 'var(--bg-graphite-card)', backdropFilter: 'blur(16px)' }}
            >
              <Construction className="w-16 h-16 sm:w-20 sm:h-20 text-[#d8f17b] mb-6" aria-hidden />
              <h2 className="text-xl sm:text-2xl font-bold text-[#e4e4e7] mb-3 text-center">
                Strona w trakcie tworzenia
              </h2>
              <p className="text-zinc-400 text-center max-w-md mb-8">
                Pracujemy nad tą sekcją. Wkrótce znajdziesz tu realizacje z zakresu automatyzacji procesów biznesowych.
              </p>
              <Link
                href="/realizacje"
                className="inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm sm:text-base border border-white/15 bg-white/5 text-[#e4e4e7] hover:border-[#d8f17b]/50 hover:text-[#d8f17b] transition-all h-12 min-h-12 px-6 sm:px-8"
              >
                Wróć do realizacji
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
