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

export const metadata: Metadata = {
  title: 'E-booki - SmartWeave',
  description:
    'Kup e-booki SmartWeave - publikacje dla firm: lead magnet, edukacja, budowanie autorytetu',
  openGraph: {
    title: 'E-booki | SmartWeave',
    description: 'Profesjonalne e-booki dla firm - lead magnet, edukacja, budowanie autorytetu',
    url: `${SITE_URL}/e-booki`,
  },
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
              description="Profesjonalne publikacje cyfrowe - lead magnet, edukacja, budowanie autorytetu"
              className={INTRO_MB_CLASS}
            />

            <EbookShelfSection books={EBOOKS} />
          </div>
        </section>
        <QuickAutomationCta topic="ebooki" />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
