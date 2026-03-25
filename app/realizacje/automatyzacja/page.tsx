import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { ScrollToTop } from '../../components/ScrollToTop';
import { PageIntro } from '../../components/PageIntro';
import { SITE_URL } from '@/lib/site';
import { SECTION_CLASS, CONTAINER_CLASS, INTRO_MB_CLASS } from '@/lib/layout';
import { SimilarSolutionCta } from '../../components/SimilarSolutionCta';
import { CaseStudyWorkflowFlow } from '../../components/CaseStudyWorkflowFlow';
import { ArchitectureFlow } from '../../components/ArchitectureFlow';
import { OpenAIIcon } from '../../components/OpenAIIcon';
import { QuickAutomationCta } from '@/app/components/QuickAutomationCta';

export const metadata: Metadata = {
  title: 'Realizacje - Automatyzacja procesów',
  description:
    'Case study: Asystent Obsługi Leadów AI - automatyzacja kwalifikacji leadów i workflow sprzedaży z wykorzystaniem AI. Make, Airtable, HubSpot, OpenAI.',
  openGraph: {
    title: 'Asystent Obsługi Leadów AI - Automatyzacja procesów | SmartWeave',
    description: 'Automatyzacja kwalifikacji leadów i workflow sprzedaży z wykorzystaniem AI.',
    url: `${SITE_URL}/realizacje/automatyzacja`,
  },
};

export default function RealizacjeAutomatyzacjaPage() {
  return (
    <>
      <Header />
      <main id="main-content" role="main" className="min-h-screen subpage-main">
        <section className={SECTION_CLASS}>
          <div className="absolute inset-0 bg-[var(--bg-graphite)]" aria-hidden />
          <div className={CONTAINER_CLASS}>
            <PageIntro
              backHref="/"
              backLabel="Strona główna"
              badge="Case Studies"
              badgeVariant="accent"
              title="Automatyzacja procesów"
              description="Zobacz realizacje z zakresu automatyzacji"
              className={INTRO_MB_CLASS}
            />

            <article>
              <div className="p-6 sm:p-8 lg:p-10 space-y-10 sm:space-y-12">
                <header>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#e4e4e7] mb-2">
                    Asystent Obsługi Leadów AI
                  </h1>
                  <p className="text-lg sm:text-xl text-zinc-400">
                    Automatyzacja kwalifikacji leadów i workflow sprzedaży z wykorzystaniem AI
                  </p>
                  <p className="text-base text-zinc-500 mt-2">
                    Założenia: 50 leadów tygodniowo
                  </p>
                </header>

                {/* ROI metrics strip */}
                <section
                  className="relative rounded-xl overflow-hidden border border-white/10 bg-[var(--bg-2)]"
                >
                  <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 divide-x divide-white/10">
                    <div className="flex flex-col justify-between min-h-[100px] sm:min-h-[120px] py-5 sm:py-6 px-5 sm:px-6 text-left">
                      <div className="font-syne text-2xl sm:text-3xl font-semibold text-accent tracking-tight">8h</div>
                      <div className="font-manrope text-base text-zinc-400 leading-relaxed mt-3">Oszczędność tygodniowo</div>
                    </div>
                    <div className="flex flex-col justify-between min-h-[100px] sm:min-h-[120px] py-5 sm:py-6 px-5 sm:px-6 text-left">
                      <div className="font-syne text-2xl sm:text-3xl font-semibold text-accent tracking-tight">32h</div>
                      <div className="font-manrope text-base text-zinc-400 leading-relaxed mt-3">Miesięcznie</div>
                    </div>
                    <div className="flex flex-col justify-between min-h-[100px] sm:min-h-[120px] py-5 sm:py-6 px-5 sm:px-6 text-left">
                      <div className="font-syne text-2xl sm:text-3xl font-semibold text-accent tracking-tight">2600 zł</div>
                      <div className="font-manrope text-base text-zinc-400 leading-relaxed mt-3">Oszczędność miesięcznie</div>
                    </div>
                    <div className="flex flex-col justify-between min-h-[100px] sm:min-h-[120px] py-5 sm:py-6 px-5 sm:px-6 text-left">
                      <div className="font-syne text-2xl sm:text-3xl font-semibold text-accent tracking-tight">3–4 miesiące</div>
                      <div className="font-manrope text-base text-zinc-400 leading-relaxed mt-3">Do zwrotu z inwestycji</div>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#e4e4e7] mb-4">Kontekst biznesowy</h2>
                  <p className="text-zinc-400 leading-relaxed mb-4">
                    W wielu firmach B2B proces obsługi nowych zapytań sprzedażowych nadal wygląda podobnie: lead trafia do bazy danych lub CRM, a następnie handlowiec musi ręcznie sprawdzić dane firmy, ocenić potencjał sprzedażowy oraz przygotować się do rozmowy.
                  </p>
                  <p className="text-zinc-400 leading-relaxed mb-4">
                    U klienta, dla którego realizowany był projekt, proces ten był częściowo manualny i obejmował m.in.:
                  </p>
                  <ul className="list-disc list-inside text-zinc-400 space-y-2 mb-4">
                    <li>analizę wiadomości od potencjalnego klienta,</li>
                    <li>sprawdzanie czy firma istnieje już w bazie kontaktów,</li>
                    <li>ocenę potencjału sprzedażowego zapytania,</li>
                    <li>przygotowanie notatek do CRM,</li>
                    <li>stworzenie kontekstu do rozmowy dla konsultanta.</li>
                  </ul>
                  <p className="text-zinc-400 leading-relaxed">
                    W efekcie zespół sprzedaży poświęcał znaczną część czasu na czynności administracyjne zamiast na bezpośredni kontakt z klientem.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#e4e4e7] mb-4">Cel projektu</h2>
                  <p className="text-zinc-400 leading-relaxed mb-4">
                    Celem projektu było zaprojektowanie systemu automatycznej kwalifikacji leadów, który:
                  </p>
                  <ul className="list-disc list-inside text-zinc-400 space-y-2">
                    <li>analizuje nowe zapytania klientów przy użyciu AI,</li>
                    <li>ocenia potencjał sprzedażowy leada,</li>
                    <li>automatycznie sprawdza duplikaty w bazie kontaktów,</li>
                    <li>przygotowuje kontekst sprzedażowy dla handlowca,</li>
                    <li>generuje skrypt rozmowy dla zespołu call center,</li>
                    <li>tworzy zadania sprzedażowe w systemie CRM.</li>
                  </ul>
                  <p className="text-zinc-400 leading-relaxed mt-4">
                    Rozwiązanie miało skrócić czas reakcji na nowe zapytania oraz zwiększyć efektywność pracy zespołu sprzedaży.
                  </p>
                </section>

                <section>
                  <div className="text-center mb-10 sm:mb-12">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#e4e4e7] mb-2">
                      Wdrożone rozwiązanie
                    </h2>
                    <p className="text-zinc-400 leading-relaxed max-w-[80ch] mx-auto">
                      Asystent Obsługi Leadów AI – zautomatyzowany workflow w 6 etapów. Automatyzacje + modele językowe.
                    </p>
                  </div>
                  <CaseStudyWorkflowFlow />
                </section>

                {/* Dashboard monitorujący proces został przeniesiony jako krok 06 w sekcji "Wdrożone rozwiązanie" */}
                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#e4e4e7] mb-4">Efekty wdrożenia</h2>
                  <p className="text-zinc-400 leading-relaxed mb-6">
                    Wdrożenie systemu automatyzacji przyniosło kilka kluczowych korzyści operacyjnych.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    <div
                      className="rounded-xl p-5 sm:p-6 border border-white/10 hover-lift"
                      style={{ background: 'var(--bg-graphite-card)', backdropFilter: 'blur(16px)' }}
                    >
                      <h3 className="text-xl font-bold text-[#e4e4e7] mb-2">Skrócenie czasu kwalifikacji leadów</h3>
                      <p className="text-zinc-400 text-base leading-relaxed">
                        Proces, który wcześniej wymagał ręcznej analizy przez handlowca, został skrócony do kilku sekund automatycznego przetwarzania.
                      </p>
                    </div>
                    <div
                      className="rounded-xl p-5 sm:p-6 border border-white/10 hover-lift"
                      style={{ background: 'var(--bg-graphite-card)', backdropFilter: 'blur(16px)' }}
                    >
                      <h3 className="text-xl font-bold text-[#e4e4e7] mb-2">Oszczędność czasu zespołu sprzedaży</h3>
                      <p className="text-zinc-400 text-base leading-relaxed">
                        Automatyzacja pozwoliła ograniczyć pracę administracyjną handlowców o około 8 godzin tygodniowo.
                      </p>
                    </div>
                    <div
                      className="rounded-xl p-5 sm:p-6 border border-white/10 hover-lift"
                      style={{ background: 'var(--bg-graphite-card)', backdropFilter: 'blur(16px)' }}
                    >
                      <h3 className="text-xl font-bold text-[#e4e4e7] mb-2">Szybsza reakcja na zapytania klientów</h3>
                      <p className="text-zinc-400 text-base leading-relaxed">
                        Nowe leady są natychmiast analizowane i przekazywane do zespołu sprzedaży wraz z kontekstem rozmowy.
                      </p>
                    </div>
                    <div
                      className="rounded-xl p-5 sm:p-6 border border-white/10 hover-lift"
                      style={{ background: 'var(--bg-graphite-card)', backdropFilter: 'blur(16px)' }}
                    >
                      <h3 className="text-xl font-bold text-[#e4e4e7] mb-2">Lepsza jakość rozmów sprzedażowych</h3>
                      <p className="text-zinc-400 text-base leading-relaxed">
                        Handlowcy otrzymują przygotowane wcześniej informacje o kliencie oraz sugestię sposobu prowadzenia rozmowy.
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#e4e4e7] mb-2">Technologie</h2>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    Narzędzia użyte w projekcie
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6">
                    <div
                      className="rounded-xl p-5 sm:p-6 border border-white/10 hover-lift flex flex-col gap-3 min-w-0"
                      style={{ background: 'var(--bg-graphite-card)', backdropFilter: 'blur(16px)' }}
                    >
                      <div className="flex flex-row items-center gap-3 min-w-0">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                          <Image src="/assets/tools/make.png" alt="Make" width={32} height={32} className="object-contain p-0.5 opacity-90" />
                        </div>
                        <h3 className="text-xl font-bold text-[#e4e4e7]">Make</h3>
                      </div>
                      <p className="text-zinc-400 text-sm leading-relaxed min-w-0">Automatyzacja procesów i workflow</p>
                    </div>
                    <div
                      className="rounded-xl p-5 sm:p-6 border border-white/10 hover-lift flex flex-col gap-3 min-w-0"
                      style={{ background: 'var(--bg-graphite-card)', backdropFilter: 'blur(16px)' }}
                    >
                      <div className="flex flex-row items-center gap-3 min-w-0">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                          <Image src="/assets/tools/airtable.png" alt="Airtable" width={32} height={32} className="object-contain p-0.5 opacity-90" />
                        </div>
                        <h3 className="text-xl font-bold text-[#e4e4e7]">Airtable</h3>
                      </div>
                      <p className="text-zinc-400 text-sm leading-relaxed min-w-0">Baza leadów i kontaktów</p>
                    </div>
                    <div
                      className="rounded-xl p-5 sm:p-6 border border-white/10 hover-lift flex flex-col gap-3 min-w-0"
                      style={{ background: 'var(--bg-graphite-card)', backdropFilter: 'blur(16px)' }}
                    >
                      <div className="flex flex-row items-center gap-3 min-w-0">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                          <Image src="/assets/tools/hubspot.png" alt="HubSpot" width={32} height={32} className="object-contain p-0.5 opacity-90" />
                        </div>
                        <h3 className="text-xl font-bold text-[#e4e4e7]">HubSpot</h3>
                      </div>
                      <p className="text-zinc-400 text-sm leading-relaxed min-w-0">Zarządzanie kontaktami i procesem sprzedaży</p>
                    </div>
                    <div
                      className="rounded-xl p-5 sm:p-6 border border-white/10 hover-lift flex flex-col gap-3 min-w-0"
                      style={{ background: 'var(--bg-graphite-card)', backdropFilter: 'blur(16px)' }}
                    >
                      <div className="flex flex-row items-center gap-3 min-w-0">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#74AA9C]">
                          <OpenAIIcon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-[#e4e4e7]">OpenAI</h3>
                      </div>
                      <p className="text-zinc-400 text-sm leading-relaxed min-w-0">Analiza zapytań i treści</p>
                    </div>
                    <div
                      className="rounded-xl p-5 sm:p-6 border border-white/10 hover-lift flex flex-col gap-3 min-w-0"
                      style={{ background: 'var(--bg-graphite-card)', backdropFilter: 'blur(16px)' }}
                    >
                      <div className="flex flex-row items-center gap-3 min-w-0">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                          <Image src="/assets/tools/looker-studio.png" alt="Looker Studio" width={32} height={32} className="object-contain p-0.5 opacity-90" />
                        </div>
                        <h3 className="text-xl font-bold text-[#e4e4e7]">Looker Studio</h3>
                      </div>
                      <p className="text-zinc-400 text-sm leading-relaxed min-w-0">Monitorowanie procesu sprzedaży</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#e4e4e7] mb-4">Podsumowanie</h2>
                  <p className="text-zinc-400 leading-relaxed mb-4">
                    Projekt pokazuje, jak połączenie automatyzacji procesów z modelami AI może znacząco usprawnić operacje sprzedażowe.
                  </p>
                  <p className="text-zinc-400 leading-relaxed mb-4">
                    Dzięki wdrożeniu Asystent Obsługi Leadów AI firma uzyskała:
                  </p>
                  <ul className="list-disc list-inside text-zinc-400 space-y-1 mb-4">
                    <li>szybszą obsługę zapytań,</li>
                    <li>lepszą organizację danych w CRM,</li>
                    <li>większą efektywność pracy zespołu sprzedaży.</li>
                  </ul>
                  <p className="text-zinc-400 leading-relaxed">
                    Automatyzacja pozwala handlowcom skupić się na tym, co najważniejsze – rozmowie z klientem i zamykaniu sprzedaży.
                  </p>
                </section>
              </div>
            </article>
          </div>
        </section>

        <QuickAutomationCta
          topic="automatyzacja"
          title="Chcesz podobne rozwiązanie?"
          description="W 30 minut pokażemy, jak przenieść Twój proces do workflowu i gdzie ma sens dołożyć AI."
          secondaryButtonHref="/automatyzacja-ai-dla-firm"
          secondaryButtonLabel="Automatyzacja procesów dla firm - przegląd oferty"
          secondaryHref="/uslugi"
          secondaryLabel="Więcej usług"
        />

        <div className="gradient-philosophy-to-footer">
          <SimilarSolutionCta headingId="realizacje-cta-heading" />
          <Footer />
        </div>
      </main>
      <ScrollToTop />
    </>
  );
}
