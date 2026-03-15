import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { ScrollToTop } from '../../components/ScrollToTop';
import { PageIntro } from '../../components/PageIntro';
import { SITE_URL, CALENDLY_URL } from '@/lib/site';
import { SECTION_CLASS, CONTAINER_CLASS, INTRO_MB_CLASS } from '@/lib/layout';
import { CaseStudyWorkflowFlow } from '../../components/CaseStudyWorkflowFlow';

export const metadata: Metadata = {
  title: 'Realizacje — Automatyzacja procesów',
  description:
    'Case study: AI Lead Engine — automatyzacja kwalifikacji leadów i workflow sprzedaży z wykorzystaniem AI. Make, Airtable, HubSpot, OpenAI.',
  openGraph: {
    title: 'AI Lead Engine — Automatyzacja procesów | SmartWeave',
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
          <div className="absolute inset-0 bg-[var(--bg)]" />

          <div className={CONTAINER_CLASS}>
            <PageIntro
              backHref="/realizacje"
              backLabel="Case Studies"
              badge="Case Studies"
              badgeVariant="accent"
              title="Automatyzacja procesów"
              description="Zobacz realizacje z zakresu automatyzacji"
              className={INTRO_MB_CLASS}
            />

            <article
              className="rounded-2xl glass-card overflow-hidden"
              style={{ background: 'var(--bg-graphite-card)', backdropFilter: 'blur(16px)' }}
            >
              <div className="p-6 sm:p-8 lg:p-10 space-y-10 sm:space-y-12">
                {/* Hero / example image */}
                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-white/5 border border-white/10">
                  <Image
                    src="/assets/realizacje/ai-lead-engine.png"
                    alt="AI Lead Engine — schemat lub dashboard automatyzacji kwalifikacji leadów"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 80vw"
                    priority
                  />
                </div>

                <header>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#e4e4e7] mb-2">
                    AI Lead Engine
                  </h1>
                  <p className="text-lg sm:text-xl text-zinc-400">
                    Automatyzacja kwalifikacji leadów i workflow sprzedaży z wykorzystaniem AI
                  </p>
                </header>

                {/* Key metrics – style from reference (dark grid + accent numbers) */}
                <section
                  className="relative rounded-xl overflow-hidden border border-white/10"
                  style={{
                    background: 'var(--bg-2)',
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                >
                  <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 divide-x divide-white/10">
                    <div className="py-6 sm:py-8 px-4 sm:px-6 text-center">
                      <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#d8f17b] mb-1">4–6h</div>
                      <div className="text-sm text-zinc-400">oszczędność tygodniowo</div>
                    </div>
                    <div className="py-6 sm:py-8 px-4 sm:px-6 text-center">
                      <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#d8f17b] mb-1">~5 min</div>
                      <div className="text-sm text-zinc-400">czas konfiguracji GPT</div>
                    </div>
                    <div className="py-6 sm:py-8 px-4 sm:px-6 text-center">
                      <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#d8f17b] mb-1">90%</div>
                      <div className="text-sm text-zinc-400">skuteczność klasyfikacji</div>
                    </div>
                    <div className="py-6 sm:py-8 px-4 sm:px-6 text-center">
                      <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#d8f17b] mb-1">2 kroki</div>
                      <div className="text-sm text-zinc-400">zatwierdzenia człowieka</div>
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

                <hr className="border-white/10" />

                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#e4e4e7] mb-4">Cel projektu</h2>
                  <p className="text-zinc-400 leading-relaxed mb-4">
                    Celem projektu było zaprojektowanie <em>systemu automatycznej kwalifikacji leadów</em>, który:
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

                <hr className="border-white/10" />

                <section>
                  <div className="text-center mb-10 sm:mb-12">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#e4e4e7] mb-2">
                      Wdrożone rozwiązanie
                    </h2>
                    <p className="text-zinc-400 leading-relaxed max-w-[80ch] mx-auto">
                      W ramach projektu powstał <em>AI Lead Engine</em> – zautomatyzowany workflow sprzedażowy oparty o automatyzacje i modele językowe. Proces działa w pełni automatycznie i składa się z kilku etapów.
                    </p>
                  </div>
                  <CaseStudyWorkflowFlow />
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#e4e4e7] mb-4">Dashboard monitorujący proces</h2>
                  <p className="text-zinc-400 leading-relaxed mb-4">
                    Aby umożliwić bieżące monitorowanie procesu sprzedaży, przygotowany został również <em>dashboard operacyjny</em>. Dashboard umożliwia analizę m.in.:
                  </p>
                  <ul className="list-disc list-inside text-zinc-400 space-y-1 mb-4">
                    <li>liczby nowych leadów,</li>
                    <li>jakości leadów (lead scoring),</li>
                    <li>czasu reakcji zespołu sprzedaży,</li>
                    <li>liczby kontaktów przetworzonych automatycznie.</li>
                  </ul>
                  <p className="text-zinc-400 leading-relaxed">
                    Dzięki temu zespół zarządzający ma pełną widoczność procesu oraz może szybciej identyfikować wąskie gardła w sprzedaży.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#e4e4e7] mb-4">Architektura rozwiązania</h2>
                  <p className="text-zinc-400 leading-relaxed mb-4">
                    Uproszczona architektura systemu:
                  </p>
                  <pre className="p-4 sm:p-6 rounded-xl bg-white/5 border border-white/10 text-zinc-300 text-sm sm:text-base whitespace-pre-wrap font-sans overflow-x-auto">
{`Nowy lead
↓
Airtable (baza leadów)
↓
Automatyzacja workflow
↓
Analiza AI (lead scoring)
↓
Sprawdzenie duplikatów (NIP)
↓
Aktualizacja / utworzenie kontaktu
↓
HubSpot CRM (kontakt + zadanie sprzedażowe)
↓
Generowanie podsumowania i skryptu rozmowy
↓
Dashboard monitorujący proces`}
                  </pre>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#e4e4e7] mb-4">Efekty wdrożenia</h2>
                  <p className="text-zinc-400 leading-relaxed mb-6">
                    Wdrożenie systemu automatyzacji przyniosło kilka kluczowych korzyści operacyjnych.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div
                      className="rounded-xl p-5 sm:p-6 border border-white/10 hover-lift"
                      style={{ background: 'var(--bg-graphite-card)', backdropFilter: 'blur(16px)' }}
                    >
                      <h3 className="text-lg font-semibold text-[#e4e4e7] mb-2">Skrócenie czasu kwalifikacji leadów</h3>
                      <p className="text-zinc-400 text-sm leading-relaxed">
                        Proces, który wcześniej wymagał ręcznej analizy przez handlowca, został skrócony do kilku sekund automatycznego przetwarzania.
                      </p>
                    </div>
                    <div
                      className="rounded-xl p-5 sm:p-6 border border-white/10 hover-lift"
                      style={{ background: 'var(--bg-graphite-card)', backdropFilter: 'blur(16px)' }}
                    >
                      <h3 className="text-lg font-semibold text-[#e4e4e7] mb-2">Oszczędność czasu zespołu sprzedaży</h3>
                      <p className="text-zinc-400 text-sm leading-relaxed">
                        Automatyzacja pozwoliła ograniczyć pracę administracyjną handlowców o około <em>4–6 godzin tygodniowo</em>.
                      </p>
                    </div>
                    <div
                      className="rounded-xl p-5 sm:p-6 border border-white/10 hover-lift"
                      style={{ background: 'var(--bg-graphite-card)', backdropFilter: 'blur(16px)' }}
                    >
                      <h3 className="text-lg font-semibold text-[#e4e4e7] mb-2">Szybsza reakcja na zapytania klientów</h3>
                      <p className="text-zinc-400 text-sm leading-relaxed">
                        Nowe leady są natychmiast analizowane i przekazywane do zespołu sprzedaży wraz z kontekstem rozmowy.
                      </p>
                    </div>
                    <div
                      className="rounded-xl p-5 sm:p-6 border border-white/10 hover-lift"
                      style={{ background: 'var(--bg-graphite-card)', backdropFilter: 'blur(16px)' }}
                    >
                      <h3 className="text-lg font-semibold text-[#e4e4e7] mb-2">Lepsza jakość rozmów sprzedażowych</h3>
                      <p className="text-zinc-400 text-sm leading-relaxed">
                        Handlowcy otrzymują przygotowane wcześniej informacje o kliencie oraz sugestię sposobu prowadzenia rozmowy.
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#e4e4e7] mb-4">Jak uzasadnić ROI w case study</h2>
                  <p className="text-zinc-400 leading-relaxed mb-4">
                    Możesz pokazać prostą kalkulację:
                  </p>
                  <p className="text-zinc-400 leading-relaxed mb-2 font-medium text-[#e4e4e7]">Założenia:</p>
                  <ul className="list-disc list-inside text-zinc-400 space-y-1 mb-4">
                    <li>50 leadów tygodniowo</li>
                    <li>10 min pracy handlowca na lead</li>
                  </ul>
                  <p className="text-zinc-400 leading-relaxed mb-2 font-medium text-[#e4e4e7]">Oszczędność:</p>
                  <ul className="list-disc list-inside text-zinc-400 space-y-1 mb-2">
                    <li>50 leadów × 10 min = 500 min = 8,3 h tygodniowo</li>
                    <li>Czyli: ~33 h miesięcznie</li>
                  </ul>
                  <p className="text-zinc-400 leading-relaxed mb-2 font-medium text-[#e4e4e7]">Przy koszcie handlowca: 80 zł / h</p>
                  <p className="text-zinc-400 leading-relaxed mb-4">
                    Oszczędność: <strong className="text-[#d8f17b]">2640 zł miesięcznie</strong>
                  </p>
                  <p className="text-zinc-400 leading-relaxed">
                    ➡ Zwrot z inwestycji w 3–4 miesiące
                  </p>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#e4e4e7] mb-4">Technologie</h2>
                  <p className="text-zinc-400 leading-relaxed mb-4">
                    W projekcie wykorzystano:
                  </p>
                  <ul className="list-disc list-inside text-zinc-400 space-y-1">
                    <li>Make – automatyzacja procesów i workflow</li>
                    <li>Airtable – baza danych leadów i kontaktów</li>
                    <li>HubSpot CRM – zarządzanie kontaktami i procesem sprzedaży</li>
                    <li>OpenAI – analiza zapytań i generowanie treści</li>
                    <li>dashboard analityczny do monitorowania procesu sprzedaży</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#e4e4e7] mb-4">Podsumowanie</h2>
                  <p className="text-zinc-400 leading-relaxed mb-4">
                    Projekt pokazuje, jak połączenie automatyzacji procesów z modelami AI może znacząco usprawnić operacje sprzedażowe. Dzięki wdrożeniu AI Lead Engine firma uzyskała:
                  </p>
                  <ul className="list-disc list-inside text-zinc-400 space-y-1 mb-4">
                    <li>szybszą obsługę zapytań,</li>
                    <li>lepszą organizację danych w CRM,</li>
                    <li>większą efektywność pracy zespołu sprzedaży.</li>
                  </ul>
                  <p className="text-zinc-400 leading-relaxed">
                    Automatyzacja pozwala handlowcom skupić się na tym, co najważniejsze – <em>rozmowie z klientem i zamykaniu sprzedaży</em>.
                  </p>
                </section>
              </div>
            </article>
          </div>
        </section>

        <section aria-labelledby="realizacje-cta-heading" className="relative py-10 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-[var(--bg)]" />
          <div className="relative z-10 max-w-7xl mx-auto text-center">
            <h2 id="realizacje-cta-heading" className="text-2xl sm:text-3xl font-bold text-[#e4e4e7] mb-6">
              Chcesz podobne rozwiązanie?
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm sm:text-base transition-all h-12 min-h-12 px-6 sm:px-8 cta-gradient-animated"
              >
                Napisz do nas
              </Link>
              {CALENDLY_URL && (
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm sm:text-base transition-all h-12 min-h-12 px-6 sm:px-8 bg-transparent border-2 border-white/15 text-[#e4e4e7] hover:border-[#d8f17b]/50 hover:bg-white/5"
                >
                  Umów spotkanie
                </a>
              )}
            </div>
          </div>
        </section>

        <div className="gradient-philosophy-to-footer">
          <Footer />
        </div>
      </main>
      <ScrollToTop />
    </>
  );
}
