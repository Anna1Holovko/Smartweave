import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { ScrollToTop } from '@/app/components/ScrollToTop';
import { PageIntro } from '@/app/components/PageIntro';
import { QuickAutomationCta } from '@/app/components/QuickAutomationCta';
import { Button } from '@/app/components/ui/Button';
import { SITE_URL } from '@/lib/site';
import { SECTION_CLASS, CONTAINER_CLASS, INTRO_MB_CLASS } from '@/lib/layout';

const title = 'AI w marketingu i sprzedaży';
const description =
  'AI w marketingu i sprzedaży: agenci AI, chatboty, automatyzacja leadów i CRM. SmartWeave łączy to z brandingiem i stronami www.';

export const metadata: Metadata = {
  title: `${title} | SmartWeave`,
  description,
  openGraph: {
    title: `${title} | SmartWeave`,
    description,
    url: `${SITE_URL}/ai-w-marketingu-i-sprzedazy`,
  },
  alternates: { canonical: `${SITE_URL}/ai-w-marketingu-i-sprzedazy` },
};

export default function AiMarketingSprzedazPage() {
  return (
    <>
      <Header />
      <main id="main-content" role="main" className="min-h-screen subpage-main">
        <section className={SECTION_CLASS}>
          <div className="absolute inset-0 bg-[var(--bg)]" />

          <div className={CONTAINER_CLASS}>
            <PageIntro
              backHref="/uslugi"
              backLabel="Wszystkie usługi"
              badge="Marketing i sprzedaż"
              badgeVariant="accent"
              title={title}
              description="Szybszy odzew, leady w CRM i mniej ręcznej pracy - bez utraty spójności marki."
              className={INTRO_MB_CLASS}
            />

            <div className="max-w-[80ch] space-y-8 text-zinc-400 leading-relaxed">
              <div>
                <h2 className="text-xl font-bold text-[#e4e4e7] mb-3">Gdzie AI realnie pomaga</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <Link href="/uslugi/agenci-ai" className="text-[#d8f17b] hover:underline">
                      Agenci AI
                    </Link>
                    : pierwsza odpowiedź, kwalifikacja, FAQ, wsparcie handlowca.
                  </li>
                  <li>
                    <Link href="/uslugi/chatboty" className="text-[#d8f17b] hover:underline">
                      Chatboty
                    </Link>
                    : stała dostępność, zbieranie danych, eskalacja do człowieka.
                  </li>
                  <li>
                    <Link href="/uslugi/automatyzacja" className="text-[#d8f17b] hover:underline">
                      Automatyzacja procesów
                    </Link>
                    : formularz → CRM → zadanie → mail; raporty z wielu narzędzi.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#e4e4e7] mb-3">Branding nie jest „osobnym tematem”</h2>
                <p>
                  Ton i zasady marki muszą być spójne w reklamie, na stronie i w odpowiedziach bota. Dlatego często prowadzimy{' '}
                  <Link href="/uslugi/branding" className="text-[#d8f17b] hover:underline">
                    identyfikację wizualną i branding
                  </Link>
                  , a{' '}
                  <Link href="/uslugi/strony" className="text-[#d8f17b] hover:underline">
                    stronę www
                  </Link>{' '}
                  traktujemy jako centrum konwersji.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#e4e4e7] mb-3">AI w biznesie - szerszy kontekst</h2>
                <p>
                  Jeśli szukasz przeglądu automatyzacji i sztucznej inteligencji w całej firmie (nie tylko marketing), zobacz{' '}
                  <Link href="/automatyzacja-ai-dla-firm" className="text-[#d8f17b] hover:underline font-medium">
                    Automatyzacja procesów dla firm
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="flex justify-center mt-12">
              <Link href="/#contact">
                <Button variant="primary">Opowiedz nam o leadach i kanałach</Button>
              </Link>
            </div>
          </div>
        </section>

        <QuickAutomationCta topic="marketing-sprzedaz" />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
