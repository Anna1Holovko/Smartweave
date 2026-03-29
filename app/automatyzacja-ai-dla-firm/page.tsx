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

const title = 'Automatyzacja procesów dla firm';
const description =
  'Automatyzacja procesów biznesowych z wykorzystaniem AI: workflowy, integracje, agenci AI. SmartWeave łączy to z brandingiem i stronami www dla firm w całej Polsce.';

const keywords = [
  'automatyzacja procesów',
  'automatyzacja procesów biznesowych',
  'automatyzacja procesów dla firm',
  'agenci AI',
  'automatyzacja AI',
];

export const metadata: Metadata = {
  title: `${title} | SmartWeave`,
  description,
  keywords,
  openGraph: {
    title: `${title} | SmartWeave`,
    description,
    url: `${SITE_URL}/automatyzacja-ai-dla-firm`,
  },
  alternates: { canonical: `${SITE_URL}/automatyzacja-ai-dla-firm` },
};

export default function AutomatyzacjaAiDlaFirmPage() {
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
              badge="Automatyzacja procesów"
              badgeVariant="accent"
              title={title}
              description="Workflowy, integracje i agenci AI. Branding i strona www jako wsparcie spójności."
              className={INTRO_MB_CLASS}
            />

            <div className="max-w-[80ch] space-y-6 text-zinc-400 leading-relaxed">
              <h2 className="text-xl font-bold text-[#e4e4e7]">Co rozumiemy przez „automatyzację AI”?</h2>
              <p>
                <strong className="text-zinc-300">Automatyzacja</strong> przenosi powtarzalne kroki do workflowów i integracji.{' '}
                <strong className="text-zinc-300">AI</strong> dokładamy tam, gdzie trzeba rozumieć tekst lub dokumenty (
                <Link href="/uslugi/agenci-ai" className="text-[#d8f17b] hover:underline">
                  agenci AI
                </Link>
                ,{' '}
                <Link href="/uslugi/chatboty" className="text-[#d8f17b] hover:underline">
                  chatboty
                </Link>
                ).
              </p>
              <p>
                Dzięki temu komunikacja pozostaje spójna z{' '}
                <Link href="/uslugi/branding" className="text-[#d8f17b] hover:underline">
                  brandingiem
                </Link>
                .
              </p>

              <h2 className="text-xl font-bold text-[#e4e4e7] pt-4">Dla kogo?</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>firmy B2B i usługowe, które tracą czas na przepisywanie danych i ręczne follow-upy;</li>
                <li>zespoły sprzedaży i marketingu, które chcą skalować obsługę zapytań bez kolejnych etatów;</li>
                <li>właściciele marek, które chcą spójnego wizerunku i jednocześnie szybkiego „zaplecza” operacyjnego.</li>
              </ul>

              <h2 className="text-xl font-bold text-[#e4e4e7] pt-4">Powiązane usługi</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <Link href="/uslugi/automatyzacja" className="text-[#d8f17b] hover:underline">
                    Automatyzacja procesów biznesowych
                  </Link>{' '}
                  - pełny opis workflowów i integracji
                </li>
                <li>
                  <Link href="/ai-w-marketingu-i-sprzedazy" className="text-[#d8f17b] hover:underline">
                    AI w marketingu i sprzedaży
                  </Link>{' '}
                  - leady, treści, obsługa zapytań
                </li>
              </ul>
            </div>

            <div className="flex justify-center mt-12">
              <Link href="/#contact">
                <Button variant="primary">Porozmawiajmy o procesach</Button>
              </Link>
            </div>
          </div>
        </section>

        <QuickAutomationCta topic="automatyzacja" />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
