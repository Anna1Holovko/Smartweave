import type { Metadata } from 'next';
import Link from 'next/link';
import { Construction } from 'lucide-react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { ScrollToTop } from '../../components/ScrollToTop';
import { PageIntro } from '../../components/PageIntro';
import { SITE_URL, CALENDLY_URL } from '@/lib/site';
import { SECTION_CLASS, CONTAINER_CLASS, INTRO_MB_CLASS } from '@/lib/layout';

export const metadata: Metadata = {
  title: 'Realizacje — Chatboty',
  description:
    'Case studies: chatboty i asystenci AI — strona w przygotowaniu. SmartWeave',
  openGraph: {
    title: 'Chatboty | SmartWeave',
    description: 'Realizacje chatbotów w przygotowaniu — wkrótce case studies',
    url: `${SITE_URL}/realizacje/chatboty`,
  },
};

export default function RealizacjeChatbotyPage() {
  return (
    <>
      <Header />
      <main id="main-content" role="main" className="min-h-screen subpage-main">
        <section className={SECTION_CLASS}>
          <div className="absolute inset-0 bg-[var(--bg-graphite)]" aria-hidden />
          <div className={CONTAINER_CLASS}>
            <PageIntro
              backHref="/"
              backLabel="Strona główna"
              badge="W przygotowaniu"
              badgeVariant="accent"
              title="Chatboty"
              description="Ta strona jest w trakcie opracowania. Wkrótce opublikujemy tutaj case studies z wdrożeń chatbotów i asystentów AI."
              className={INTRO_MB_CLASS}
            />

            <article className="p-6 sm:p-8 lg:p-10">
              <div
                className="max-w-3xl mx-auto rounded-2xl border border-[#d8f17b]/25 bg-[#d8f17b]/5 px-6 py-8 sm:px-8 sm:py-10 text-center"
                role="status"
                aria-live="polite"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[#d8f17b]/15 border border-[#d8f17b]/30 text-[#d8f17b] mb-5 mx-auto">
                  <Construction className="w-7 h-7" aria-hidden />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#e4e4e7] mb-3">
                  W trakcie przygotowania
                </h2>
                <p className="text-zinc-400 leading-relaxed">
                  Zbieramy i redagujemy case studies z chatbotów. Tymczasem zobacz{' '}
                  <Link href="/uslugi/chatboty" className="text-[#d8f17b] font-medium hover:underline">
                    opis usługi — chatboty
                  </Link>
                  ,{' '}
                  <Link href="/realizacje" className="text-[#d8f17b] font-medium hover:underline">
                    pozostałe realizacje
                  </Link>{' '}
                  lub napisz do nas — opowiemy o projektach na żywo.
                </p>
              </div>
            </article>
          </div>
        </section>

        <div className="gradient-philosophy-to-footer">
          <section aria-labelledby="realizacje-chatboty-cta-heading" className="relative py-10 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="absolute inset-0 bg-[var(--bg-graphite)]" aria-hidden />
            <div className="relative z-10 max-w-7xl mx-auto text-center">
              <h2 id="realizacje-chatboty-cta-heading" className="text-2xl sm:text-3xl font-bold text-[#e4e4e7] mb-6">
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
