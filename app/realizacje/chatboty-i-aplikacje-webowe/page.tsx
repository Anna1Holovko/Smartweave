import type { Metadata } from 'next';
import Link from 'next/link';
import { Construction } from 'lucide-react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { ScrollToTop } from '../../components/ScrollToTop';
import { PageIntro } from '../../components/PageIntro';
import { SITE_URL } from '@/lib/site';
import { SECTION_CLASS, CONTAINER_CLASS, INTRO_MB_CLASS } from '@/lib/layout';
import { SimilarSolutionCta } from '../../components/SimilarSolutionCta';
import { QuickAutomationCta } from '@/app/components/QuickAutomationCta';

export const metadata: Metadata = {
  title: 'Realizacje - Chatboty i aplikacje webowe',
  description:
    'Case studies: chatboty i aplikacje webowe dla firm - strona w przygotowaniu. SmartWeave',
  openGraph: {
    title: 'Chatboty i aplikacje webowe | SmartWeave',
    description: 'Realizacje w przygotowaniu - wkrótce case studies z chatbotów i aplikacji webowych',
    url: `${SITE_URL}/realizacje/chatboty-i-aplikacje-webowe`,
  },
};

export default function RealizacjeChatbotyIAplikacjeWebowePage() {
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
              title={
                <>
                  Chatboty i{' '}
                  <span className="text-[#d8f17b]">aplikacje webowe</span>
                </>
              }
              description="Ta strona jest w trakcie opracowania. Wkrótce opublikujemy tutaj case studies z wdrożeń chatbotów i aplikacji webowych."
              className={INTRO_MB_CLASS}
            />

            <article className="p-6 sm:p-8 lg:p-10">
              <div className="w-full flex justify-center">
              <div
                className="w-full max-w-3xl rounded-2xl border border-[#d8f17b]/25 bg-[#d8f17b]/5 px-6 py-8 sm:px-8 sm:py-10 text-center flex flex-col items-center"
                role="status"
                aria-live="polite"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[#d8f17b]/15 border border-[#d8f17b]/30 text-[#d8f17b] mb-5">
                  <Construction className="w-7 h-7" aria-hidden />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#e4e4e7] mb-3">
                  W trakcie przygotowania
                </h2>
                <p className="text-zinc-400 leading-relaxed">
                  Wszystkie trzy podstrony realizacji (chatboty, aplikacje webowe oraz ta łączona) są w przygotowaniu.
                  Tymczasem zobacz{' '}
                  <Link href="/uslugi/chatboty" className="text-[#d8f17b] font-medium hover:underline">
                    usługę - chatboty
                  </Link>
                  ,{' '}
                  <Link href="/uslugi/aplikacje-webowe" className="text-[#d8f17b] font-medium hover:underline">
                    usługę - aplikacje webowe
                  </Link>{' '}
                  lub{' '}
                  <Link href="/realizacje" className="text-[#d8f17b] font-medium hover:underline">
                    główną stronę realizacji
                  </Link>
                  . Napisz do nas - chętnie opowiemy o projektach na żywo.
                </p>
              </div>
              </div>
            </article>
          </div>
        </section>

        <QuickAutomationCta
          secondaryButtonHref="/automatyzacja-ai-dla-firm"
          secondaryButtonLabel="Automatyzacja procesów dla firm - przegląd oferty"
          secondaryHref="/uslugi"
          secondaryLabel="Więcej usług"
        />

        <div className="gradient-philosophy-to-footer">
          <SimilarSolutionCta headingId="realizacje-chatboty-web-cta-heading" />
          <Footer />
        </div>
      </main>
      <ScrollToTop />
    </>
  );
}
