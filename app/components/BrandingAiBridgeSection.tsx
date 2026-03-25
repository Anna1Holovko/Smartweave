import Link from 'next/link';

/**
 * SEO + positioning: keeps full branding narrative while adding an explicit AI layer (hybrid model).
 */
export function BrandingAiBridgeSection() {
  return (
    <section
      aria-labelledby="branding-ai-bridge-heading"
      className="mt-12 sm:mt-16 lg:mt-20 rounded-2xl border border-white/10 bg-[var(--bg-graphite-card)] p-6 sm:p-8 md:p-10"
      style={{ backdropFilter: 'blur(16px)' }}
    >
      <h2 id="branding-ai-bridge-heading" className="text-xl sm:text-2xl font-bold text-[#e4e4e7] mb-6">
        Branding i AI - jeden ekosystem, nie dwa światy
      </h2>
      <div className="space-y-8 text-zinc-400 leading-relaxed max-w-[80ch]">
        <div>
          <h3 className="text-lg font-semibold text-[#e4e4e7] mb-2">Jak AI zmienia identyfikację wizualną</h3>
          <p>
            Generowanie wariantów grafik, spójnych opisów produktów czy szkiców kampanii przyspiesza pracę - pod warunkiem, że
            macie{' '}
            <strong className="text-zinc-300 font-semibold">jasny system wizualny i słownik marki</strong>. Identyfikacja
            wizualna i brandbook to „kompas”, dzięki któremu treści i materiały tworzone z udziałem AI pozostają rozpoznawalne i
            zgodne z wartościami firmy.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#e4e4e7] mb-2">Automatyzacja procesów marketingowych</h3>
          <p>
            Lead z formularza w CRM, powiadomienie do zespołu, przypomnienie o follow-upie, zestawienie z wielu kanałów - to
            procesy, które da się zbudować jako workflow (Make, n8n, integracje API) i połączyć z{' '}
            <Link href="/uslugi/agenci-ai" className="text-[#d8f17b] hover:underline font-medium">
              agentami AI
            </Link>
            , gdzie potrzebna jest interpretacja języka naturalnego. Oszczędzacie czas, redukujecie koszty operacyjne i
            skalujecie kampanie bez proporcjonalnego wzrostu ręcznej pracy.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#e4e4e7] mb-2">Jak połączyć branding z AI w firmie</h3>
          <p className="mb-4">
            Zaczynamy od spójnego wizerunku (logo, kolory, typografia, zasady komunikacji), potem przenosimy te zasady na stronę,
            szablony i narzędzia. Na tej bazie projektujemy{' '}
            <Link href="/uslugi/automatyzacja" className="text-[#d8f17b] hover:underline font-medium">
              automatyzację procesów biznesowych
            </Link>{' '}
            oraz - tam, gdzie to ma sens - rozwiązania AI, które wspierają sprzedaż i obsługę, zamiast je rozjeżdżać stylistycznie.
          </p>
          <p className="text-sm text-zinc-500">
            Powiązane:{' '}
            <Link href="/automatyzacja-ai-dla-firm" className="text-[#d8f17b]/90 hover:underline">
              Automatyzacja procesów dla firm
            </Link>
            {' · '}
            <Link href="/ai-w-marketingu-i-sprzedazy" className="text-[#d8f17b]/90 hover:underline">
              AI w marketingu i sprzedaży
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
