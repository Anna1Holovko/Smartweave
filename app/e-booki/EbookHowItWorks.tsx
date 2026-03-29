const steps = [
  { step: '1', title: 'Wybierz i dodaj', body: 'Kliknij „Do koszyka” na okładce lub w karcie obok.' },
  { step: '2', title: 'Sprawdź koszyk', body: 'Otwórz torbę w prawym górnym rogu - zobaczysz pozycje i sumę.' },
  { step: '3', title: 'Dokończ zamówienie', body: 'Potwierdzamy szczegóły i dostawę PDF - jak ustalimy w kontakcie.' },
] as const;

export function EbookHowItWorks() {
  return (
    <section
      className="max-w-4xl mx-auto mt-14 sm:mt-20 mb-4 sm:mb-6"
      aria-labelledby="ebook-how-heading"
    >
      <h2 id="ebook-how-heading" className="text-center text-lg sm:text-xl font-bold text-[#e4e4e7] mb-8">
        Jak kupujesz e-book
      </h2>
      <ol className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {steps.map(({ step, title, body }) => (
          <li
            key={step}
            className="relative rounded-2xl border border-white/10 px-5 py-6 pt-8 text-center md:text-left"
            style={{ background: 'var(--bg-graphite-card)', backdropFilter: 'blur(12px)' }}
          >
            <span
              className="absolute -top-3 left-1/2 md:left-5 -translate-x-1/2 md:translate-x-0 flex h-7 min-w-[1.75rem] px-2 items-center justify-center rounded-full bg-[#d8f17b] text-xs font-bold text-zinc-900"
              aria-hidden
            >
              {step}
            </span>
            <p className="text-sm font-semibold text-[#e4e4e7] mb-2">{title}</p>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">{body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
