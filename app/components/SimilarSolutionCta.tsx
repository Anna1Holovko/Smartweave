import Link from 'next/link';
import { CALENDLY_URL } from '@/lib/site';
import { SIMILAR_SOLUTION_CTA_SECTION_CLASS } from '@/lib/layout';

type Props = {
  /** Unique id for aria-labelledby (per page) */
  headingId: string;
};

/**
 * Bottom CTA used on realizacje subpages — symmetric padding top/bottom, consistent across routes.
 */
export function SimilarSolutionCta({ headingId }: Props) {
  return (
    <section aria-labelledby={headingId} className={SIMILAR_SOLUTION_CTA_SECTION_CLASS}>
      <div className="absolute inset-0 bg-[var(--bg-graphite)]" aria-hidden />
      <div className="relative z-10 mx-auto max-w-7xl text-center">
        <div className="flex flex-col items-center gap-6 sm:gap-8">
          <h2 id={headingId} className="text-2xl sm:text-3xl font-bold text-[#e4e4e7]">
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
      </div>
    </section>
  );
}
