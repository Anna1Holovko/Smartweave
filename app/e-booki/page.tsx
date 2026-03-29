import type { Metadata } from 'next';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ScrollToTop } from '../components/ScrollToTop';
import { PageIntro } from '../components/PageIntro';
import { EBOOKS } from '@/lib/ebooks';
import { QuickAutomationCta } from '../components/QuickAutomationCta';
import { SITE_URL } from '@/lib/site';
import { SECTION_CLASS, CONTAINER_CLASS, INTRO_MB_CLASS } from '@/lib/layout';
import { EbookShelfSection } from './EbookShelfSection';

const title = 'E-booki o AI i automatyzacji';
const description =
  'E-booki dla firm: AI, automatyzacja procesów biznesowych, plan wdrożenia. SmartWeave — publikacje PDF, koszyk i kontakt w sprawie szczegółów.';

const keywords = [
  'e-booki',
  'e-booki o AI',
  'automatyzacja procesów',
  'agenci AI',
  'AI dla firm',
];

export const metadata: Metadata = {
  title: `${title} | SmartWeave`,
  description,
  keywords,
  openGraph: {
    title: `${title} | SmartWeave`,
    description,
    url: `${SITE_URL}/e-booki`,
  },
  alternates: { canonical: `${SITE_URL}/e-booki` },
};

export default function EbookiPage() {
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
              badge="E-booki"
              badgeVariant="accent"
              title="E-booki dla firm"
              description="Praktyczne przewodniki PDF: wdrożenie AI i automatyzacji bez chaosu. Dodaj do koszyka, potwierdzamy szczegóły w kontakcie."
              className={INTRO_MB_CLASS}
            />

            <EbookShelfSection books={EBOOKS} />
          </div>
        </section>
        <QuickAutomationCta />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
