import { FileText, Receipt, ShoppingBag } from 'lucide-react';

const items = [
  { icon: FileText, label: 'Publikacja PDF', hint: 'do użytku w firmie' },
  { icon: Receipt, label: 'Cena brutto', hint: 'widoczna w koszyku' },
  { icon: ShoppingBag, label: 'Koszyk w menu', hint: 'ikonka torby u góry' },
] as const;

export function EbookPurchaseInfo() {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto mb-10 sm:mb-14"
      role="list"
      aria-label="Informacje o zakupie"
    >
      {items.map(({ icon: Icon, label, hint }) => (
        <div
          key={label}
          role="listitem"
          className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 sm:py-4"
          style={{ background: 'var(--bg-graphite-card)', backdropFilter: 'blur(12px)' }}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#d8f17b]/12 border border-[#d8f17b]/20">
            <Icon className="h-5 w-5 text-[#d8f17b]" aria-hidden />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#e4e4e7] leading-tight">{label}</p>
            <p className="text-xs text-zinc-500 mt-0.5 leading-snug">{hint}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
