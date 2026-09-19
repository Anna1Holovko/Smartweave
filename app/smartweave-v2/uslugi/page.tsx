import type { Metadata } from 'next';
import { Header } from '../_components/Header';
import { Footer } from '../_components/Footer';
import { SimpleCTASection } from '../_components/SimpleCTASection';
import { ScrollToTop } from '../_components/ScrollToTop';
import { PageIntro } from '../_components/PageIntro';
import { UslugiServiceCards } from '../_components/UslugiServiceCards';
import { UslugiConsultationBlock } from '../_components/UslugiConsultationBlock';
import { SITE_URL } from '@/lib/site';
import { SECTION_CLASS, CONTAINER_CLASS, INTRO_MB_CLASS } from '@/lib/layout';
import { V2_BASE } from '../_lib/base-path';

export const metadata: Metadata = {
  title: 'Usługi - Automatyzacja procesów biznesowych, agenci AI, strony internetowe',
  description:
    'Automatyzacja procesów biznesowych, agenci AI i strony internetowe. Pełna oferta dla firm',
  openGraph: {
    title: 'Usługi - Automatyzacja procesów biznesowych, agenci AI, strony internetowe',
    description: 'Automatyzacja procesów biznesowych, agenci AI i strony internetowe',
    url: `${SITE_URL}${V2_BASE}/uslugi`,
  },
  robots: { index: false, follow: false },
};

export default function UslugiPage() {
  return (
    <>
      <Header />
      <main id="main-content" role="main" className="subpage-main">
        <section className={SECTION_CLASS}>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950/30 to-slate-950" />
          <div className="absolute top-0 left-1/4 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-purple-500/10 rounded-full blur-3xl" />

          <div className={CONTAINER_CLASS}>
            <PageIntro
              backHref={V2_BASE}
              backLabel="Strona główna"
              badge="Oferta"
              badgeVariant="blue"
              title={
                <>
                  Pełna oferta <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">usług</span>
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
