import Link from 'next/link';
import { Button } from '@/app/components/ui/Button';
import { CALENDLY_URL } from '@/lib/site';

type Topic =
  | 'default'
  | 'automatyzacja'
  | 'agenci-ai'
  | 'chatboty'
  | 'strony'
  | 'branding'
  | 'marketing-sprzedaz'
  | 'aplikacje-webowe'
  | 'realizacje'
  | 'blog'
  | 'ebooki';

type Props = {
  /** e.g. on subpages - scroll to #contact on home */
  contactHref?: string;
  topic?: Topic;
  title?: string;
  description?: React.ReactNode;
  bullets?: string[];
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  secondaryButtonHref?: string;
  secondaryButtonLabel?: string;
  tertiaryHref?: string;
  tertiaryLabel?: string;
};

/**
 * Conversion strip: time savings, cost reduction, scale - ties to AI/automation without replacing main CTAs.
 */
export function QuickAutomationCta({
  contactHref = '/#contact',
  topic = 'default',
  title,
  description,
  bullets,
  primaryLabel = 'Umów krótką rozmowę',
  secondaryHref,
  secondaryLabel,
  secondaryButtonHref,
  secondaryButtonLabel,
  tertiaryHref,
  tertiaryLabel,
}: Props) {
  const defaults: Record<Topic, { title: string; description: React.ReactNode; bullets: string[] }> = {
    default: {
      title: 'Zobacz, co możesz zautomatyzować w 30 minut',
      description: (
        <>
          W 30 minut wskażemy powtarzalne kroki w mailach, formularzach, CRM i raportach. Od{' '}
          <Link href="/uslugi/automatyzacja" className="text-[#d8f17b] hover:underline font-medium">
            automatyzacji procesów
          </Link>{' '}
          po{' '}
          <Link href="/uslugi/agenci-ai" className="text-[#d8f17b] hover:underline font-medium">
            agentów AI
          </Link>
          .
        </>
      ),
      bullets: ['oszczędność czasu zespołu', 'mniej błędów przy przepisywaniu danych', 'większa przepustowość bez nowych etatów'],
    },
    automatyzacja: {
      title: 'Zobacz, co możesz zautomatyzować w 30 minut',
      description: (
        <>
          Bierzemy jeden proces i pokazujemy, jak przenieść go do workflowu (Make/n8n/API) - bez ręcznego przepisywania danych.
        </>
      ),
      bullets: ['mniej ręcznej pracy', 'mniej błędów', 'szybszy przepływ informacji'],
    },
    'agenci-ai': {
      title: 'Zobacz, gdzie agent AI zdejmie rutynę',
      description: (
        <>
          W 30 minut wskażemy miejsca na pierwszy odzew, kwalifikację lub pracę na dokumentach - i gdzie potrzebna jest integracja z
          CRM.
        </>
      ),
      bullets: ['szybsza pierwsza odpowiedź', 'leady w CRM', 'mniej powtórek dla zespołu'],
    },
    chatboty: {
      title: 'Zobacz, jak chatbot zbierze leady w 30 minut',
      description: (
        <>
          Podpowiemy, jak domknąć FAQ, zbieranie danych i przekazanie do człowieka - i jak to spiąć z CRM.
        </>
      ),
      bullets: ['dostępność 24/7', 'mniej powtarzalnych pytań', 'leady w systemie'],
    },
    strony: {
      title: 'Zobacz, co strona może automatyzować',
      description: (
        <>
          W 30 minut pokażemy, jak strona może zbierać leady i odpalać procesy w tle (CRM, follow-upy, raporty) - gotowe na AI.
        </>
      ),
      bullets: ['więcej leadów', 'szybszy follow-up', 'mniej ręcznych kroków'],
    },
    branding: {
      title: 'Zobacz, co możesz zautomatyzować bez psucia marki',
      description: (
        <>
          Podpowiemy, gdzie automatyzacja i AI oszczędzą czas, a komunikacja nadal będzie spójna z identyfikacją i tone of voice.
        </>
      ),
      bullets: ['spójna komunikacja', 'mniej chaosu w materiałach', 'więcej czasu zespołu'],
    },
    'marketing-sprzedaz': {
      title: 'Zobacz, gdzie AI podniesie konwersję',
      description: (
        <>
          W 30 minut wskażemy powtarzalne kroki w leadach i CRM: od pierwszej odpowiedzi po routing do handlowca.
        </>
      ),
      bullets: ['szybszy odzew', 'leady uporządkowane w CRM', 'mniej ręcznego follow-upu'],
    },
    'aplikacje-webowe': {
      title: 'Zobacz, co da się zamknąć w systemie',
      description: (
        <>
          W 30 minut wskażemy, co warto zautomatyzować workflowem, a co lepiej ubrać w prostą aplikację/panel.
        </>
      ),
      bullets: ['jedno miejsce na proces', 'mniej błędów', 'skalowanie bez chaosu'],
    },
    realizacje: {
      title: 'Zobacz, co możesz zautomatyzować w 30 minut',
      description: (
        <>
          Podaj przykład z Twojej firmy - podpowiemy pierwszy proces do pilota i kolejne kroki wdrożenia.
        </>
      ),
      bullets: ['szybki start (pilot)', 'mierzalny efekt', 'rozwój krok po kroku'],
    },
    blog: {
      title: 'Zobacz, co możesz zautomatyzować w 30 minut',
      description: (
        <>
          Jeśli chcesz przełożyć wiedzę z artykułu na działający proces - wskażemy pierwszy scenariusz do wdrożenia.
        </>
      ),
      bullets: ['konkret zamiast teorii', 'pierwszy proces do pilota', 'szybkie ROI w czasie zespołu'],
    },
    ebooki: {
      title: 'Zobacz, co możesz zautomatyzować w 30 minut',
      description: (
        <>
          Wskażemy procesy, które najszybciej oddadzą czas zespołowi - i jak je spiąć z narzędziami, których już używacie.
        </>
      ),
      bullets: ['oszczędność czasu', 'mniej błędów', 'skalowanie bez etatów'],
    },
  };

  const copy = defaults[topic];
  const finalTitle = title ?? copy.title;
  const finalDescription = description ?? copy.description;
  const finalBullets = bullets ?? copy.bullets;
  const finalSecondaryHref = secondaryHref ?? '/automatyzacja-ai-dla-firm';
  const finalSecondaryLabel = secondaryLabel ?? 'Automatyzacja procesów dla firm - przegląd oferty';
  const finalTertiaryHref = tertiaryHref;
  const finalTertiaryLabel = tertiaryLabel;
  const finalSecondaryButtonHref = secondaryButtonHref;
  const finalSecondaryButtonLabel = secondaryButtonLabel;

  return (
    <section
      aria-labelledby="quick-automation-cta-heading"
      className="relative py-10 sm:py-14 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[var(--bg-graphite)]" />
      <div className="relative z-10 max-w-4xl mx-auto text-center rounded-2xl border border-[#d8f17b]/25 bg-[#d8f17b]/5 px-6 py-8 sm:px-10 sm:py-10">
        <h2 id="quick-automation-cta-heading" className="text-xl sm:text-2xl md:text-3xl font-bold text-[#e4e4e7] mb-3">
          {finalTitle}
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base max-w-[65ch] mx-auto mb-6 leading-relaxed">
          {finalDescription}
        </p>
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-zinc-500 mb-8">
          {finalBullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3">
          {CALENDLY_URL ? (
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="primary">{primaryLabel}</Button>
            </a>
          ) : (
            <Link href={contactHref}>
              <Button variant="primary">{primaryLabel}</Button>
            </Link>
          )}
          {finalSecondaryButtonHref && finalSecondaryButtonLabel && (
            <Link
              href={finalSecondaryButtonHref}
              className="inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm sm:text-base transition-all h-12 min-h-12 px-6 sm:px-8 whitespace-nowrap bg-transparent border-2 border-white/15 text-[#e4e4e7] hover:border-[#d8f17b]/50 hover:bg-white/5"
            >
              {finalSecondaryButtonLabel}
            </Link>
          )}
          <Link
            href={finalSecondaryHref}
            className="inline-flex items-center justify-center text-sm font-semibold text-[#d8f17b] hover:underline min-h-[44px] px-2"
          >
            {finalSecondaryLabel}
          </Link>
          {finalTertiaryHref && finalTertiaryLabel && (
            <Link
              href={finalTertiaryHref}
              className="inline-flex items-center justify-center text-sm font-semibold text-[#d8f17b] hover:underline min-h-[44px] px-2"
            >
              {finalTertiaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
