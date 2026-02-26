import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ScrollToTop } from '../components/ScrollToTop';
import { PhilosophySection } from '../components/PhilosophySection';
import { CTASection } from '../components/CTASection';
import { PageIntro } from '../components/PageIntro';
import { UslugiServiceCards } from '../components/UslugiServiceCards';
import { MotionFadeIn } from '../components/MotionFadeIn';
import { SITE_URL, CALENDLY_URL } from '@/lib/site';
import { SECTION_CLASS, CONTAINER_CLASS, INTRO_MB_CLASS } from '@/lib/layout';
import { Button } from '../components/ui/Button';

export const metadata: Metadata = {
  title: 'Usługi – strony WWW, branding i automatyzacja | SmartWeave',
  description:
    'Pełna oferta SmartWeave: projektowanie stron internetowych, identyfikacja wizualna i branding, automatyzacja procesów i agenci AI. Dla małych i średnich firm.',
  openGraph: {
    title: 'Usługi | SmartWeave – strony WWW, design i automatyzacja',
    description: 'Strony internetowe, branding i automatyzacja procesów dla firm.',
    url: `${SITE_URL}/uslugi`,
  },
};

export default function UslugiPage() {
  return (
    <>
      <Header />
      <main id="main-content" role="main">
        <section className={SECTION_CLASS}>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950/30 to-slate-950" />
          <div className="absolute top-0 left-1/4 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-purple-500/10 rounded-full blur-3xl" />

          <div className={CONTAINER_CLASS}>
            <PageIntro
              backHref="/"
              backLabel="Strona główna"
              badge="Oferta"
              badgeVariant="blue"
              title={
                <>
                  Pełna oferta <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">usług</span>
                </>
              }
              description="Strony, branding i automatyzacja — wszystko, czego potrzebuje Twoja firma w internecie."
              className={INTRO_MB_CLASS}
            />

            <UslugiServiceCards />

            <MotionFadeIn delay={0.2}>
            <div className="relative overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-xl p-8 md:p-12 text-center shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 pointer-events-none" />
              <h2 className="relative text-2xl sm:text-3xl font-bold text-white mb-4">Nie jesteś pewien, które rozwiązanie jest dla Ciebie?</h2>
              <p className="relative text-base sm:text-xl text-slate-400 mb-8 max-w-[80ch] mx-auto px-2">
                Umów bezpłatną konsultację — porozmawiamy o wyzwaniach i zaproponujemy rozwiązanie.
              </p>
              <div className="relative flex flex-wrap items-center justify-center gap-4">
                <Link href="/#contact">
                  <Button variant="primary">Napisz do nas</Button>
                </Link>
                {CALENDLY_URL && (
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm sm:text-base transition-all h-12 min-h-12 px-6 sm:px-8 bg-transparent border-2 border-slate-700 text-white hover:border-purple-500/50 hover:bg-slate-800/30"
                  >
                    Umów spotkanie
                  </a>
                )}
              </div>
            </div>
            </MotionFadeIn>
          </div>
        </section>

        <div className="gradient-philosophy-to-footer">
          <PhilosophySection />
          <CTASection />
          <Footer />
        </div>
      </main>
      <ScrollToTop />
    </>
  );
}
