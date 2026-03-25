import Link from 'next/link';
import { Button } from '@/app/components/ui/Button';
import { CALENDLY_URL } from '@/lib/site';

type Props = {
  title: string;
  description: string;
  /** Centered layout (headline + text + buttons, no card). Use on service subpages. */
  variant?: 'centered' | 'split';
};

export function UslugiConsultationBlock({ title, description, variant = 'split' }: Props) {
  const isCentered = variant === 'centered';

  return (
    <section aria-labelledby="uslugi-consultation-heading" className="relative py-10 sm:py-16 md:py-20 lg:py-24 xl:py-28 px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 overflow-hidden">
      <div className="absolute inset-0 bg-[var(--bg)]" />

      <div className="relative z-10 max-w-7xl 2xl:max-w-8xl 3xl:max-w-9xl mx-auto">
        {isCentered ? (
          <div className="text-center max-w-[80ch] mx-auto">
            <h2 id="uslugi-consultation-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#e4e4e7] mb-4">
              {title}
            </h2>
            <p className="text-base sm:text-xl text-zinc-400 mb-8 px-2">
              {description}
            </p>
            <div className="flex flex-col items-stretch sm:items-center gap-3 max-w-sm mx-auto">
              <Link href="/#contact" className="w-full sm:w-auto">
                <Button variant="primary" className="w-full sm:w-auto">
                  Napisz do nas
                </Button>
              </Link>
              {CALENDLY_URL && (
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full font-semibold text-sm sm:text-base transition-all h-12 min-h-12 px-6 sm:px-8 bg-transparent border-2 border-white/15 text-[#e4e4e7] hover:border-[#d8f17b]/50 hover:bg-white/5"
                >
                  Umów krótką diagnozę
                </a>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-8 lg:gap-10 max-w-3xl mx-auto text-center">
            <div className="space-y-6">
              <h2 id="uslugi-consultation-heading" className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#d8f17b] leading-tight">
                {title}
              </h2>
              <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">{description}</p>
            </div>

            <div className="flex flex-col items-stretch sm:items-center gap-3 max-w-sm mx-auto w-full">
              <Link href="/#contact" className="w-full sm:w-auto">
                <Button variant="primary" className="w-full sm:w-auto">
                  Napisz do nas
                </Button>
              </Link>
              {CALENDLY_URL && (
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full font-semibold text-sm sm:text-base transition-all h-12 min-h-12 px-6 sm:px-8 bg-transparent border-2 border-white/15 text-[#e4e4e7] hover:border-[#d8f17b]/50 hover:bg-white/5"
                >
                  Umów krótką diagnozę
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
