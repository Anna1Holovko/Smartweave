import Link from 'next/link';
import { Button } from '@/app/components/ui/Button';

type Props = {
  /** e.g. on subpages — scroll to #contact on home */
  contactHref?: string;
};

/**
 * Conversion strip: time savings, cost reduction, scale — ties to AI/automation without replacing main CTAs.
 */
export function QuickAutomationCta({ contactHref = '/#contact' }: Props) {
  return (
    <section
      aria-labelledby="quick-automation-cta-heading"
      className="relative py-10 sm:py-14 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[var(--bg-graphite)]" />
      <div className="relative z-10 max-w-4xl mx-auto text-center rounded-2xl border border-[#d8f17b]/25 bg-[#d8f17b]/5 px-6 py-8 sm:px-10 sm:py-10">
        <h2 id="quick-automation-cta-heading" className="text-xl sm:text-2xl md:text-3xl font-bold text-[#e4e4e7] mb-3">
          Zobacz, co możesz zautomatyzować w 15 minut
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base max-w-[65ch] mx-auto mb-6 leading-relaxed">
          W 15 minut wskażemy powtarzalne kroki w mailach, formularzach, CRM i raportach. Od{' '}
          <Link href="/uslugi/automatyzacja" className="text-[#d8f17b] hover:underline font-medium">
            automatyzacji procesów
          </Link>{' '}
          po{' '}
          <Link href="/uslugi/agenci-ai" className="text-[#d8f17b] hover:underline font-medium">
            agentów AI
          </Link>
          .
        </p>
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-zinc-500 mb-8">
          <li>oszczędność czasu zespołu</li>
          <li>mniej błędów przy przepisywaniu danych</li>
          <li>większa przepustowość bez nowych etatów</li>
        </ul>
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3">
          <Link href={contactHref}>
            <Button variant="primary">Umów krótką diagnozę</Button>
          </Link>
          <Link
            href="/automatyzacja-ai-dla-firm"
            className="inline-flex items-center justify-center text-sm font-semibold text-[#d8f17b] hover:underline min-h-[44px] px-2"
          >
            Automatyzacja AI dla firm — przegląd oferty
          </Link>
        </div>
      </div>
    </section>
  );
}
