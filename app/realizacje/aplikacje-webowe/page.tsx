import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { ScrollToTop } from '../../components/ScrollToTop';
import { PageIntro } from '../../components/PageIntro';
import { SITE_URL, CALENDLY_URL } from '@/lib/site';
import { SECTION_CLASS, CONTAINER_CLASS, INTRO_MB_CLASS } from '@/lib/layout';

export const metadata: Metadata = {
  title: 'Realizacje — Aplikacje webowe',
  description:
    'Case studies: aplikacje internetowe i narzędzia webowe dla firm — SmartWeave',
  openGraph: {
    title: 'Aplikacje webowe | SmartWeave',
    description: 'Realizacje z zakresu aplikacji webowych i paneli dla biznesu',
    url: `${SITE_URL}/realizacje/aplikacje-webowe`,
  },
};

export default function RealizacjeAplikacjeWebowePage() {
  return (
    <>
      <Header />
      <main id="main-content" role="main" className="min-h-screen subpage-main">
        <section className={SECTION_CLASS}>
          <div className="absolute inset-0 bg-[var(--bg-graphite)]" aria-hidden />
          <div className={CONTAINER_CLASS}>
            <PageIntro
              backHref="/realizacje"
              backLabel="Realizacje"
              badge="Case Studies"
              badgeVariant="accent"
              title="Aplikacje webowe"
              description="Dedykowane narzędzia w przeglądarce — panele, dashboardy i aplikacje wspierające procesy w firmie"
              className={INTRO_MB_CLASS}
            />

            <article className="p-6 sm:p-8 lg:p-10">
              <p className="text-zinc-400 leading-relaxed max-w-3xl">
                Tworzymy aplikacje webowe dopasowane do workflow: od prostych paneli po rozwiązania z logiką biznesową,
                integracjami i bezpiecznym dostępem. Koncentrujemy się na użyteczności, wydajności i spójności z Twoją
                identyfikacją. Case studies rozbudujemy wkrótce — zapraszamy do kontaktu, jeśli chcesz omówić konkretny
                pomysł.
              </p>
            </article>
          </div>
        </section>

        <div className="gradient-philosophy-to-footer">
          <section
            aria-labelledby="realizacje-aplikacje-cta-heading"
            className="relative py-10 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
          >
            <div className="absolute inset-0 bg-[var(--bg-graphite)]" aria-hidden />
            <div className="relative z-10 max-w-7xl mx-auto text-center">
              <h2 id="realizacje-aplikacje-cta-heading" className="text-2xl sm:text-3xl font-bold text-[#e4e4e7] mb-6">
                Chcesz podobne rozwiązanie?
              </h2>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm sm:text-base transition-all h-12 min-h-12 px-6 sm:px-8 cta-gradient-animated"
                >
                  Napisz do nas
                </Link>
                {CALENDLY_URL && (
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm sm:text-base transition-all h-12 min-h-12 px-6 sm:px-8 bg-transparent border-2 border-white/15 text-[#e4e4e7] hover:border-[#d8f17b]/50 hover:bg-white/5"
                  >
                    Umów spotkanie
                  </a>
                )}
              </div>
            </div>
          </section>
          <Footer />
        </div>
      </main>
      <ScrollToTop />
    </>
  );
}
