import type { Metadata } from 'next';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SimpleCTASection } from '../components/SimpleCTASection';
import { ScrollToTop } from '../components/ScrollToTop';
import { PageIntro } from '../components/PageIntro';
import { UslugiServiceCards } from '../components/UslugiServiceCards';
import { UslugiConsultationBlock } from '../components/UslugiConsultationBlock';
import { SITE_URL } from '@/lib/site';
import { SECTION_CLASS, CONTAINER_CLASS, INTRO_MB_CLASS } from '@/lib/layout';

export const metadata: Metadata = {
  title: 'Usługi - Automatyzacja procesów biznesowych, agenci AI, strony internetowe',
  description:
    'Automatyzacja procesów biznesowych, agenci AI i strony internetowe. Pełna oferta dla firm',
  openGraph: {
    title: 'Usługi - Automatyzacja procesów biznesowych, agenci AI, strony internetowe',
    description: 'Automatyzacja procesów biznesowych, agenci AI i strony internetowe',
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
              description="Automatyzacja procesów biznesowych, agenci AI i strony. Wszystko, czego potrzebuje Twoja firma"
              className={INTRO_MB_CLASS}
            />

            <UslugiServiceCards />
          </div>
        </section>

        <UslugiConsultationBlock
          variant="centered"
          title="Zainteresowała Cię ta usługa?"
          description="Umów bezpłatną konsultację - opowiemy o szczegółach i dopasujemy rozwiązanie"
        />

        <div className="gradient-philosophy-to-footer">
          <SimpleCTASection />
          <Footer />
        </div>
      </main>
      <ScrollToTop />
    </>
  );
}
