import Link from 'next/link';
import type { ServiceSlug } from '@/lib/services';
import { USLUGI_H2_CLASS } from '@/lib/layout';
import { StronyHybridEcosystemSection } from '@/app/components/StronyHybridEcosystemSection';

type Props = { slug: ServiceSlug };

/**
 * Internal linking: branding ↔ AI / automation ecosystem per service page.
 */
export function HybridServiceCrossLinks({ slug }: Props) {
  if (slug === 'strony') {
    return <StronyHybridEcosystemSection />;
  }

  if (slug === 'chatboty') {
    return (
      <section
        aria-labelledby="hybrid-cross-chat-heading"
        className="mt-12 sm:mt-16 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
      >
        <h2 id="hybrid-cross-chat-heading" className={`${USLUGI_H2_CLASS} mb-3`}>
          Jedna marka - strona, automatyzacja i AI
        </h2>
        <p className="text-zinc-400 leading-relaxed max-w-[80ch]">
          To rozwiązanie najlepiej współgra z{' '}
          <Link href="/uslugi/branding" className="text-[#d8f17b] hover:underline font-medium">
            brandingiem
          </Link>
          ,{' '}
          <Link href="/uslugi/strony" className="text-[#d8f17b] hover:underline font-medium">
            stroną www
          </Link>{' '}
          oraz{' '}
          <Link href="/uslugi/automatyzacja" className="text-[#d8f17b] hover:underline font-medium">
            automatyzacją procesów
          </Link>{' '}
          - tak, by dane i komunikacja płynęły spójnie, a zespół nie dublował pracy.
        </p>
      </section>
    );
  }

  if (slug === 'automatyzacja' || slug === 'agenci-ai') {
    return (
      <section
        aria-labelledby="hybrid-cross-auto-heading"
        className="mt-12 sm:mt-16 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
      >
        <h2 id="hybrid-cross-auto-heading" className={`${USLUGI_H2_CLASS} mb-3`}>
          Automatyzacja i AI pod Twoją markę
        </h2>
        <p className="text-zinc-400 leading-relaxed max-w-[80ch]">
          Procesy i boty mają brzmieć jak Wy: ton, zasady wizualne i obietnice marki wynikają z{' '}
          <Link href="/uslugi/branding" className="text-[#d8f17b] hover:underline font-medium">
            brandingui i identyfikacji wizualnej
          </Link>
          , a strona i kanały - z{' '}
          <Link href="/uslugi/strony" className="text-[#d8f17b] hover:underline font-medium">
            projektu strony www
          </Link>
          . Tak budujemy spójny obraz firmy, a nie „techniczny dodatek” obok marki.
        </p>
      </section>
    );
  }

  return null;
}
