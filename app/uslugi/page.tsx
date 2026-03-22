import type { Metadata } from 'next';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SimpleCTASection } from '../components/SimpleCTASection';
import { ScrollToTop } from '../components/ScrollToTop';
import { PageIntro } from '../components/PageIntro';
import { UslugiServiceCards } from '../components/UslugiServiceCards';
import { SITE_URL } from '@/lib/site';
import { SECTION_CLASS, CONTAINER_CLASS, INTRO_MB_CLASS } from '@/lib/layout';

export const metadata: Metadata = {
  title: 'Usługi - Automatyzacja, agenci AI, strony, chatboty, aplikacje webowe',
  description:
    'Automatyzacja procesów, agenci AI, strony internetowe, branding, chatboty i aplikacje webowe. Pełna oferta dla firm',
  openGraph: {
    title: 'Usługi - Automatyzacja, agenci AI, strony, chatboty, aplikacje webowe',
    description: 'Automatyzacja, agenci AI, strony, branding, chatboty i aplikacje webowe',
    url: `${SITE_URL}/uslugi`,
  },
};

export default function UslugiPage() {
  return (
    <>
      <Header />
      <main id="main-content" role="main" className="subpage-main">
        <section className={SECTION_CLASS}>
          <div className="absolute inset-0 bg-[var(--bg)]" />

          <div className={CONTAINER_CLASS}>
            <PageIntro
              backHref="/"
              backLabel="Strona główna"
              badge="Oferta"
              badgeVariant="accent"
              title={
                <>
                  Pełna oferta <span className="text-[#d8f17b]">usług</span>
                </>
              }
              description="Automatyzacja, agenci AI, strony, branding, chatboty i aplikacje webowe. Wszystko, czego potrzebuje Twoja firma"
              className={INTRO_MB_CLASS}
            />

            <UslugiServiceCards />
          </div>
        </section>

        <div className="gradient-philosophy-to-footer">
          <SimpleCTASection />
          <Footer />
        </div>
      </main>
      <ScrollToTop />
    </>
  );
}
