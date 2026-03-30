import type { Metadata } from 'next';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ScrollToTop } from '../components/ScrollToTop';
import { getServiceBySlug } from '@/lib/services';
import type { ServiceSlug } from '@/lib/services';
import { SERVICE_PAGE_CONTENT } from '@/lib/service-page-content';
import { USLUGI_PAGE_CONTENT } from '@/lib/uslugi-page-content';
import { SITE_URL } from '@/lib/site';
import { SECTION_CLASS, CONTAINER_CLASS } from '@/lib/layout';
import { QuickAutomationCta } from '@/app/components/QuickAutomationCta';
import { ServiceUslugaPage } from '@/app/components/ServiceUslugaPage';

const SLUG: ServiceSlug = 'agenci-ai';

export const metadata: Metadata = {
  title: 'Agenci AI - SmartWeave',
  description:
    'Agenci AI: programy oparte na sztucznej inteligencji – chatbot, kwalifikacja leadów, przetwarzanie dokumentów. Odzew w minutę, 24/7.',
  openGraph: {
    title: 'Agenci AI | SmartWeave',
    description: 'Budujemy agenty AI pod Twoją firmę: rozmowa z klientem, kwalifikacja leadów, baza wiedzy, integracja z CRM.',
    url: `${SITE_URL}/agenci-ai`,
  },
};

export default function AgenciAiPage() {
  const service = getServiceBySlug(SLUG);
  const pageContent = SERVICE_PAGE_CONTENT[SLUG];

  if (!service || !pageContent) return null;

  return (
    <>
      <Header />
      <main id="main-content" role="main" className="subpage-main">
        <section className={SECTION_CLASS}>
          <div className="absolute inset-0 bg-[var(--bg)]" />

          <div className={CONTAINER_CLASS}>
            <ServiceUslugaPage
              slug={SLUG}
              title={service.title}
              description={service.description}
              problemHeading={
                pageContent.problemHeading ?? 'Z jakimi problemami mierzą się nasi Partnerzy Biznesowi?'
              }
              problems={USLUGI_PAGE_CONTENT[SLUG].problems}
              solution={pageContent.solution}
              features={service.features}
              benefits={pageContent.benefits}
              process={pageContent.process}
              realizacje={{ mode: 'none' }}
              showHybridCrossLinks
            />
          </div>
        </section>

        <QuickAutomationCta />

        <div className="gradient-philosophy-to-footer">
          <Footer />
        </div>
      </main>
      <ScrollToTop />
    </>
  );
}
