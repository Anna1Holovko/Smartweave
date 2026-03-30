/**
 * Shared layout classes for all pages (home sections and subpages).
 */
export const SECTION_CLASS =
  'relative py-10 sm:py-16 md:py-20 lg:py-24 xl:py-28 px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 overflow-hidden';

export const CONTAINER_CLASS =
  'relative z-10 max-w-7xl 2xl:max-w-8xl 3xl:max-w-9xl mx-auto';

export const INTRO_MB_CLASS = 'mb-12 sm:mb-20';

/** Nagłówki sekcji (home, blog, landingi) — większy akcent wizualny */
export const SECTION_H2_CLASS =
  'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] leading-tight tracking-tight';

/** Nagłówki h2 na /uslugi i w komponentach stron usług — mniejsze niż SECTION_H2 */
export const USLUGI_H2_CLASS =
  'text-xl sm:text-2xl md:text-3xl font-bold text-[var(--text-primary)] leading-tight tracking-tight';

/** Nagłówek paska QuickAutomationCta („Rozwiążmy Twoje codzienne problemy”) — mniejszy od sekcji */
export const QUICK_AUTOMATION_CTA_H2_CLASS =
  'text-lg sm:text-xl md:text-2xl font-bold text-[var(--text-primary)] leading-snug tracking-tight';
