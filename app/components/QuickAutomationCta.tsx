import Link from 'next/link';
import { Button } from '@/app/components/ui/Button';
import { CALENDLY_URL, USLUGI_QUICK_CTA_DESCRIPTION, USLUGI_QUICK_CTA_TITLE } from '@/lib/site';
import { QUICK_AUTOMATION_CTA_H2_CLASS } from '@/lib/layout';

type Props = {
  /** Gdy brak Calendly — docelowy link pod głównym przyciskiem */
  contactHref?: string;
  title?: string;
  description?: React.ReactNode;
  primaryLabel?: string;
};

/**
 * Conversion strip — treść w `USLUGI_QUICK_CTA_*` (lib/site).
 * Calendly (Umów krótką rozmowę) + link do sekcji kontaktowej (Napisz do nas).
 */
export function QuickAutomationCta({
  contactHref = '/#contact',
  title,
  description,
  primaryLabel = 'Umów krótką rozmowę',
}: Props) {
  const finalTitle = title ?? USLUGI_QUICK_CTA_TITLE;
  const finalDescription = description ?? USLUGI_QUICK_CTA_DESCRIPTION;

  return (
    <section
      aria-labelledby="quick-automation-cta-heading"
      className="relative py-10 sm:py-14 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[var(--bg-graphite)]" />
      <div className="relative z-10 w-full flex justify-center">
        <div className="sw-cta-panel w-full max-w-4xl text-center px-6 py-8 sm:px-10 sm:py-10 flex flex-col items-center">
          <h2 id="quick-automation-cta-heading" className={`${QUICK_AUTOMATION_CTA_H2_CLASS} mb-3`}>
            {finalTitle}
          </h2>
          <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-[65ch] mx-auto text-center mb-8 leading-relaxed">
            {finalDescription}
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3">
            {CALENDLY_URL ? (
              <>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                  <Button variant="primary">{primaryLabel}</Button>
                </a>
                <Link href={contactHref}>
                  <Button variant="secondary">Napisz do nas</Button>
                </Link>
              </>
            ) : (
              <Link href={contactHref}>
                <Button variant="primary">{primaryLabel}</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
