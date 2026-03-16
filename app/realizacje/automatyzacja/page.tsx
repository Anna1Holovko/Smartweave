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
import { ArchitectureFlow } from '../../components/ArchitectureFlow';
import { OpenAIIcon } from '../../components/OpenAIIcon';

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
          <div className="absolute inset-0 bg-[var(--bg-graphite)]" aria-hidden />
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

            <article>
              <div className="p-6 sm:p-8 lg:p-10 space-y-10 sm:space-y-12">
                {/* Hero — schemat automatyzacji leadów */}
                <div className="relative w-full rounded-xl overflow-x-auto overflow-y-hidden border border-white/10 bg-white/5 py-6" aria-label="Automatyzacja leadów: Nowy lead → Airtable → OpenAI → Airtable → JSON → HubSpot CRM → Dashboard">
                  <div className="w-[1111.58px] h-32 relative mx-auto min-h-[128px] flex-shrink-0 scale-[0.6] sm:scale-75 md:scale-90 lg:scale-100 origin-center">
                    <div className="w-20 h-20 left-[415.36px] top-[95.97px] absolute origin-top-left rotate-[178.37deg] bg-slate-400 rounded-full" />
                    <div className="w-10 h-10 left-[352.33px] top-[35px] absolute bg-slate-400 overflow-hidden">
                      <div className="w-10 h-10 left-[0.02px] top-[0.02px] absolute bg-slate-400" />
                      <div className="w-3.5 h-5 left-[10.81px] top-[4.97px] absolute bg-white" />
                      <div className="w-3.5 h-5 left-[28.42px] top-[4.52px] absolute origin-top-left rotate-[60deg] bg-white" />
                      <div className="w-3.5 h-5 left-[37.61px] top-[19.55px] absolute origin-top-left rotate-[120deg] bg-white" />
                      <div className="w-3.5 h-5 left-[29.19px] top-[35.03px] absolute origin-top-left rotate-180 bg-white" />
                      <div className="w-3.5 h-5 left-[11.58px] top-[35.48px] absolute origin-top-left rotate-[-120deg] bg-white" />
                      <div className="w-3.5 h-5 left-[2.39px] top-[20.45px] absolute origin-top-left rotate-[-60deg] bg-white" />
                    </div>
                    <div className="left-[352px] top-[102px] absolute justify-start text-[#d8f17b] text-xs font-normal font-manrope">OpenAI</div>
                    <div className="w-20 h-20 left-[665.35px] top-0 absolute bg-violet-400 rounded-full" />
                    <div className="w-10 h-10 left-[687.65px] top-[22px] absolute bg-violet-400 overflow-hidden">
                      <div className="w-2 h-7 left-[5px] top-[5px] absolute outline outline-2 outline-offset-[-1px] outline-white" />
                      <div className="w-2 h-7 left-[26.67px] top-[5px] absolute outline outline-2 outline-offset-[-1px] outline-white" />
                    </div>
                    <div className="left-[692.35px] top-[88px] absolute justify-start text-[#d8f17b] text-xs font-normal font-manrope">JSON</div>
                    <div className="w-20 h-20 left-[836.58px] top-[3px] absolute bg-red-400 rounded-full" />
                    <div className="w-10 h-10 left-[858.21px] top-[25px] absolute bg-red-400 overflow-hidden">
                      <div className="w-10 h-10 left-[0.91px] top-0 absolute bg-white" />
                    </div>
                    <div className="w-32 left-[822.58px] top-[91px] absolute text-center justify-start text-[#d8f17b] text-xs font-normal">HubSpot CRM (kontakt + zadanie sprzedażowe)</div>
                    <div className="w-20 h-20 left-[1011.58px] top-[6px] absolute bg-red-400 rounded-full" />
                    <div className="w-10 h-10 left-[1033.58px] top-[28px] absolute bg-red-400 overflow-hidden">
                      <div className="w-10 h-10 left-[0.91px] top-0 absolute bg-white" />
                    </div>
                    <div className="w-28 left-[995.58px] top-[94px] absolute text-center justify-start text-[#d8f17b] text-xs font-normal">Dashboard monitorujący proces</div>
                    <div className="w-20 h-20 left-[164.35px] top-[15px] absolute bg-cyan-400 rounded-full" />
                    <div className="w-10 h-10 left-[186.84px] top-[36.64px] absolute overflow-hidden">
                      <div className="w-10 h-8 left-0 top-[3.28px] absolute bg-white" />
                    </div>
                    <div className="left-[165.35px] top-[103px] absolute text-center justify-start text-[#d8f17b] text-xs font-normal">Airtable<br />(baza leadów)</div>
                    <div className="w-20 h-20 left-[499px] top-[11px] absolute bg-cyan-400 rounded-full" />
                    <div className="w-10 h-10 left-[521.49px] top-[32.64px] absolute overflow-hidden">
                      <div className="w-10 h-8 left-0 top-[3.28px] absolute bg-white" />
                    </div>
                    <div className="w-24 left-[496px] top-[99px] absolute text-center justify-start text-[#d8f17b] text-xs font-normal">Airtable<br />(baza leadów)</div>
                    <div className="w-20 h-7 left-[248.35px] top-[40px] absolute opacity-60 bg-gradient-to-l from-cyan-400 to-slate-400" />
                    <div className="w-20 h-7 left-[415.36px] top-[42px] absolute opacity-60 bg-gradient-to-l from-slate-400 to-cyan-400" />
                    <div className="w-20 h-7 left-[84px] top-[41px] absolute opacity-60 bg-gradient-to-l from-blue-500 to-cyan-400" />
                    <div className="w-20 h-7 left-[585px] top-[39px] absolute opacity-60 bg-gradient-to-l from-cyan-400 to-violet-400" />
                    <div className="w-20 h-7 left-[925.58px] top-[31px] absolute opacity-60 bg-gradient-to-l from-red-400 to-red-400" />
                    <div className="w-20 h-7 left-[749.35px] top-[31px] absolute opacity-60 bg-gradient-to-l from-violet-400 to-red-400" />
                    <div className="w-20 h-20 left-0 top-[15px] absolute bg-blue-500 rounded-full" />
                    <div className="w-10 h-10 left-[22px] top-[37px] absolute overflow-hidden">
                      <div className="w-6 h-2.5 left-[8.33px] top-[25px] absolute outline outline-2 outline-offset-[-1px] outline-white" />
                      <div className="w-3.5 h-3.5 left-[13.33px] top-[5px] absolute outline outline-2 outline-offset-[-1px] outline-white" />
                    </div>
                    <div className="left-[14px] top-[103px] absolute text-center justify-start text-[#d8f17b] text-xs font-normal font-manrope">Nowy lead</div>
                  </div>
                </div>

                <header>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#e4e4e7] mb-2">
                    AI Lead Engine
                  </h1>
                  <p className="text-lg sm:text-xl text-zinc-400">
                    Automatyzacja kwalifikacji leadów i workflow sprzedaży z wykorzystaniem AI
                  </p>
                </header>

                {/* ROI metrics strip */}
                <section
                  className="relative rounded-xl overflow-hidden border border-white/10 bg-[var(--bg-2)]"
                >
                  <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 divide-x divide-white/10">
                    <div className="flex flex-col justify-between min-h-[100px] sm:min-h-[120px] py-5 sm:py-6 px-5 sm:px-6 text-left">
                      <div className="font-syne text-2xl sm:text-3xl font-semibold text-accent tracking-tight">8,3h</div>
                      <div className="font-manrope text-base text-zinc-400 leading-relaxed mt-3">Oszczędność tygodniowo</div>
                    </div>
                    <div className="flex flex-col justify-between min-h-[100px] sm:min-h-[120px] py-5 sm:py-6 px-5 sm:px-6 text-left">
                      <div className="font-syne text-2xl sm:text-3xl font-semibold text-accent tracking-tight"><span className="font-manrope">&#126;</span>33h</div>
                      <div className="font-manrope text-base text-zinc-400 leading-relaxed mt-3">Miesięcznie</div>
                    </div>
                    <div className="flex flex-col justify-between min-h-[100px] sm:min-h-[120px] py-5 sm:py-6 px-5 sm:px-6 text-left">
                      <div className="font-syne text-2xl sm:text-3xl font-semibold text-accent tracking-tight">2640 zł</div>
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
                      AI Lead Engine – zautomatyzowany workflow w 5 etapów. Automatyzacje + modele językowe.
                    </p>
                  </div>
                  <CaseStudyWorkflowFlow />
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#e4e4e7] mb-4">Dashboard monitorujący proces</h2>
                  <p className="text-zinc-400 leading-relaxed mb-4">
                    Aby umożliwić bieżące monitorowanie procesu sprzedaży, przygotowany został również dashboard operacyjny.
                  </p>
                  <p className="text-zinc-400 leading-relaxed mb-4">
                    Dashboard umożliwia analizę m.in.:
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
                  <div className="text-center mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#e4e4e7] mb-2">Architektura rozwiązania</h2>
                    <p className="text-zinc-400 leading-relaxed">
                      Uproszczona architektura systemu:
                    </p>
                  </div>
                  <ArchitectureFlow />
                </section>

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
                        Automatyzacja pozwoliła ograniczyć pracę administracyjną handlowców o około 4–6 godzin tygodniowo.
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
                      <h3 className="text-xl font-bold text-[#e4e4e7]">Dashboard analityczny</h3>
                      <p className="text-zinc-400 text-sm leading-relaxed">Monitorowanie procesu sprzedaży</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#e4e4e7] mb-4">Jak uzasadnić ROI w case study</h2>
                  <p className="text-[#e4e4e7] text-base sm:text-lg font-medium leading-relaxed mb-6">
                    Założenia: <span className="text-accent font-semibold">50 leadów tygodniowo</span>, <span className="text-accent font-semibold">10 min na lead</span>, <span className="text-accent font-semibold">80 zł/h</span> przy koszcie handlowca
                  </p>
                  <div className="relative rounded-xl overflow-hidden border border-white/10 bg-[var(--bg-2)]">
                    <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 divide-x divide-white/10">
                      <div className="flex flex-col justify-between min-h-[100px] sm:min-h-[120px] py-5 sm:py-6 px-5 sm:px-6 text-left">
                        <div className="font-syne text-2xl sm:text-3xl font-semibold text-accent tracking-tight">8,3h</div>
                        <div className="font-manrope text-base text-zinc-400 leading-relaxed mt-3">Oszczędność tygodniowo</div>
                      </div>
                      <div className="flex flex-col justify-between min-h-[100px] sm:min-h-[120px] py-5 sm:py-6 px-5 sm:px-6 text-left">
                        <div className="font-syne text-2xl sm:text-3xl font-semibold text-accent tracking-tight"><span className="font-manrope">&#126;</span>33h</div>
                        <div className="font-manrope text-base text-zinc-400 leading-relaxed mt-3">Miesięcznie</div>
                      </div>
                      <div className="flex flex-col justify-between min-h-[100px] sm:min-h-[120px] py-5 sm:py-6 px-5 sm:px-6 text-left">
                        <div className="font-syne text-2xl sm:text-3xl font-semibold text-accent tracking-tight">2640 zł</div>
                        <div className="font-manrope text-base text-zinc-400 leading-relaxed mt-3">Oszczędność miesięcznie</div>
                      </div>
                      <div className="flex flex-col justify-between min-h-[100px] sm:min-h-[120px] py-5 sm:py-6 px-5 sm:px-6 text-left">
                        <div className="font-syne text-2xl sm:text-3xl font-semibold text-accent tracking-tight">3–4 miesiące</div>
                        <div className="font-manrope text-base text-zinc-400 leading-relaxed mt-3">Do zwrotu z inwestycji</div>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#e4e4e7] mb-4">Podsumowanie</h2>
                  <p className="text-zinc-400 leading-relaxed mb-4">
                    Projekt pokazuje, jak połączenie automatyzacji procesów z modelami AI może znacząco usprawnić operacje sprzedażowe.
                  </p>
                  <p className="text-zinc-400 leading-relaxed mb-4">
                    Dzięki wdrożeniu AI Lead Engine firma uzyskała:
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

        <div className="gradient-philosophy-to-footer">
          <section aria-labelledby="realizacje-cta-heading" className="relative py-10 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="absolute inset-0 bg-[var(--bg-graphite)]" aria-hidden />
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
          <Footer />
        </div>
      </main>
      <ScrollToTop />
    </>
  );
}
