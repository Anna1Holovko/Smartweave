import Link from 'next/link';
import { Button } from '@/app/components/ui/Button';
import { CALENDLY_URL, USLUGI_QUICK_CTA_DESCRIPTION, USLUGI_QUICK_CTA_TITLE } from '@/lib/site';

type Props = {
  /** e.g. on subpages - scroll to #contact on home */
  contactHref?: string;
  title?: string;
  description?: React.ReactNode;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  secondaryOutlined?: boolean;
  secondaryButtonHref?: string;
  secondaryButtonLabel?: string;
  tertiaryHref?: string;
  tertiaryLabel?: string;
};

/**
 * Conversion strip — domyślnie ten sam nagłówek i opis na całej stronie (lib/site).
 */
export function QuickAutomationCta({
  contactHref = '/#contact',
  title,
  description,
  primaryLabel = 'Umów krótką rozmowę',
  secondaryHref,
  secondaryLabel,
  secondaryOutlined = false,
  secondaryButtonHref,
  secondaryButtonLabel,
  tertiaryHref,
  tertiaryLabel,
}: Props) {
  const finalTitle = title ?? USLUGI_QUICK_CTA_TITLE;
  const finalDescription = description ?? USLUGI_QUICK_CTA_DESCRIPTION;
  const finalSecondaryHref = secondaryHref ?? '/automatyzacja-ai-dla-firm';
  const finalSecondaryLabel = secondaryLabel ?? 'Automatyzacja procesów dla firm';
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
      <div className="relative z-10 w-full flex justify-center">
        <div className="w-full max-w-4xl text-center rounded-2xl border border-[#d8f17b]/25 bg-[#d8f17b]/5 px-6 py-8 sm:px-10 sm:py-10 flex flex-col items-center">
          <h2 id="quick-automation-cta-heading" className="text-xl sm:text-2xl md:text-3xl font-bold text-[#e4e4e7] mb-3">
            {finalTitle}
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-[65ch] mb-8 leading-relaxed">
            {finalDescription}
          </p>
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
              className={
                secondaryOutlined
                  ? 'inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm sm:text-base transition-all h-12 min-h-12 px-6 sm:px-8 whitespace-nowrap bg-transparent border-2 border-white/15 text-[#e4e4e7] hover:border-[#d8f17b]/50 hover:bg-white/5'
                  : 'inline-flex items-center justify-center text-sm font-semibold text-[#d8f17b] hover:underline min-h-[44px] px-2'
              }
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
      </div>
    </section>
  );
}
