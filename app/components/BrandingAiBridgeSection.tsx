import Link from 'next/link';
import { SECTION_H2_CLASS } from '@/lib/layout';

/**
 * Branding ↔ AI: jeden ekosystem (strona usługi branding).
 */
export function BrandingAiBridgeSection() {
  return (
    <section
      aria-labelledby="branding-ai-bridge-heading"
      className="mt-12 sm:mt-16 lg:mt-20 rounded-2xl border border-[var(--border-subtle)] bg-gradient-to-br from-white/[0.05] via-transparent to-[var(--accent-muted)] p-6 sm:p-8 md:p-10 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.55)]"
      style={{
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      <h2
        id="branding-ai-bridge-heading"
        className={`${SECTION_H2_CLASS} mb-8 tracking-tight`}
      >
        Branding i AI - jeden ekosystem, nie dwa światy
      </h2>
      <div className="space-y-10 text-[var(--text-secondary)] leading-relaxed max-w-[80ch]">
        <div>
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">Jak AI zmienia identyfikację wizualną</h3>
          <p>
            Generowanie wariantów grafik, spójnych opisów produktów czy szkiców kampanii przyspiesza pracę - pod warunkiem, że
            macie jasny system wizualny i słownik marki. Identyfikacja wizualna i brandbook to „kompas”, dzięki któremu treści i
            materiały tworzone z udziałem AI pozostają rozpoznawalne i zgodne z wartościami firmy.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">Automatyzacja procesów marketingowych</h3>
          <p>
            Lead z formularza w CRM, powiadomienie do zespołu, przypomnienie o follow-upie, zestawienie z wielu kanałów - to
            procesy, które da się zbudować jako workflow (Make, n8n, integracje API) i połączyć z agentami AI, gdzie potrzebna
            jest interpretacja języka naturalnego. Oszczędzacie czas, redukujecie koszty operacyjne i skalujecie kampanie bez
            proporcjonalnego wzrostu ręcznej pracy.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">Jak połączyć branding z AI w firmie</h3>
          <p>
            Zaczynamy od spójnego wizerunku (logo, kolory, typografia, zasady komunikacji), potem przenosimy te zasady na stronę,
            szablony i narzędzia. Na tej bazie projektujemy automatyzację procesów biznesowych oraz - tam, gdzie to ma sens -
            rozwiązania AI, które wspierają sprzedaż i obsługę, zamiast je rozjeżdżać stylistycznie.
          </p>
        </div>
      </div>
      <p className="mt-10 pt-8 border-t border-[var(--border-subtle)] text-sm text-[var(--text-secondary)]">
        <span className="text-[var(--text-primary)] font-medium">Powiązane:</span>{' '}
        <Link href="/automatyzacja-ai-dla-firm" className="text-[var(--accent)] hover:underline underline-offset-2">
          Automatyzacja procesów dla firm
        </Link>
        {' · '}
        <Link href="/ai-w-marketingu-i-sprzedazy" className="text-[var(--accent)] hover:underline underline-offset-2">
          AI w marketingu i sprzedaży
        </Link>
      </p>
    </section>
  );
}
