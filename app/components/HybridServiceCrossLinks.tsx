import Link from 'next/link';
import type { ServiceSlug } from '@/lib/services';

type Props = { slug: ServiceSlug };

/**
 * Internal linking: branding ↔ AI / automation ecosystem per service page.
 */
export function HybridServiceCrossLinks({ slug }: Props) {
  if (slug === 'strony') {
    return (
      <section
        aria-labelledby="hybrid-cross-strony-heading"
        className="mt-12 sm:mt-16 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
      >
        <h2 id="hybrid-cross-strony-heading" className="text-lg sm:text-xl font-bold text-[#e4e4e7] mb-3">
          Strona, branding i AI - spójny ekosystem
        </h2>
        <p className="text-zinc-400 leading-relaxed max-w-[80ch]">
          Strona www to często pierwszy kontakt z marką - warto, żeby wygląd i komunikat były zgodne z{' '}
          <Link href="/uslugi/branding" className="text-[#d8f17b] hover:underline font-medium">
            identyfikacją wizualną
          </Link>
          . Jednocześnie formularze, leady i integracje działają lepiej, gdy za nimi stoi{' '}
          <Link href="/uslugi/automatyzacja" className="text-[#d8f17b] hover:underline font-medium">
            automatyzacja procesów
          </Link>{' '}
          i - tam, gdzie to potrzebne -{' '}
          <Link href="/uslugi/agenci-ai" className="text-[#d8f17b] hover:underline font-medium">
            agenci AI
          </Link>
          , którzy odciążają zespół od powtarzalnych odpowiedzi.
        </p>
      </section>
    );
  }

  if (slug === 'chatboty' || slug === 'aplikacje-webowe') {
    return (
      <section
        aria-labelledby="hybrid-cross-chat-heading"
        className="mt-12 sm:mt-16 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
      >
        <h2 id="hybrid-cross-chat-heading" className="text-lg sm:text-xl font-bold text-[#e4e4e7] mb-3">
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
        <h2 id="hybrid-cross-auto-heading" className="text-lg sm:text-xl font-bold text-[#e4e4e7] mb-3">
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
