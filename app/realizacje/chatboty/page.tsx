import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { ScrollToTop } from '../../components/ScrollToTop';
import { PageIntro } from '../../components/PageIntro';
import { SITE_URL, CALENDLY_URL } from '@/lib/site';
import { SECTION_CLASS, CONTAINER_CLASS, INTRO_MB_CLASS } from '@/lib/layout';

export const metadata: Metadata = {
  title: 'Realizacje — Chatboty',
  description:
    'Case studies: chatboty i asystenci AI na stronie oraz w procesach — SmartWeave',
  openGraph: {
    title: 'Chatboty | SmartWeave',
    description: 'Realizacje z zakresu chatbotów konwersacyjnych i asystentów AI dla firm',
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
              badge="Case Studies"
              badgeVariant="accent"
              title="Chatboty"
              description="Asystenci konwersacyjni i chatboty oparte o modele językowe — na stronie WWW i w obiegu pracy"
              className={INTRO_MB_CLASS}
            />

            <article className="p-6 sm:p-8 lg:p-10">
              <p className="text-zinc-400 leading-relaxed max-w-3xl">
                Projektujemy i wdrażamy chatboty, które odpowiadają na pytania klientów, kwalifikują leady i odciążają zespół od
                powtarzalnych zapytań — z kontekstem marki i integracją z Twoimi narzędziami. Szczegółowe case studies
                uzupełnimy wkrótce; tymczasem chętnie opowiemy o możliwościach na rozmowie.
              </p>
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
