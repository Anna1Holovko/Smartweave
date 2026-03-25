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

const title = 'Automatyzacja AI dla firm';
const description =
  'Automatyzacja procesów biznesowych z wykorzystaniem AI: workflowy, integracje, agenci AI. SmartWeave łączy to z brandingiem i stronami www dla firm w całej Polsce.';

export const metadata: Metadata = {
  title: `${title} | SmartWeave`,
  description,
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
              badge="Automatyzacja AI"
              badgeVariant="accent"
              title={title}
              description="Łączymy identyfikację wizualną z nowoczesnymi systemami: workflowy (Make, n8n), integracje API oraz agenci AI tam, gdzie potrzebny jest język naturalny i decyzje w czasie rzeczywistym."
              className={INTRO_MB_CLASS}
            />

            <div className="max-w-[80ch] mx-auto space-y-6 text-zinc-400 leading-relaxed">
              <h2 className="text-xl font-bold text-[#e4e4e7]">Co rozumiemy przez „automatyzację AI”?</h2>
              <p>
                <strong className="text-zinc-300">Automatyzacja procesów biznesowych</strong> to przewidywalne scenariusze: dane
                płyną między systemami, powiadomienia wysyłają się same, raporty składają się bez ręcznego kopiowania.{' '}
                <strong className="text-zinc-300">Warstwa AI</strong> dołączamy tam, gdzie trzeba rozumieć tekst, kwalifikować
                zapytanie, wyciągnąć pola z dokumentu lub odpowiedzieć na FAQ — zawsze w granicach, które ustalicie z zespołem (
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
                Dzięki temu{' '}
                <Link href="/uslugi/branding" className="text-[#d8f17b] hover:underline">
                  branding
                </Link>{' '}
                i komunikacja nie rozjadają się z technologią — procesy i treści trzymają jeden standard marki.
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
                  — pełny opis workflowów i integracji
                </li>
                <li>
                  <Link href="/ai-w-marketingu-i-sprzedazy" className="text-[#d8f17b] hover:underline">
                    AI w marketingu i sprzedaży
                  </Link>{' '}
                  — leady, treści, obsługa zapytań
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

        <QuickAutomationCta />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
