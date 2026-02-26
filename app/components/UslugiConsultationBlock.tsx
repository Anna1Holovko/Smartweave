import Link from 'next/link';
import { Button } from '@/app/components/ui/Button';
import { CALENDLY_URL } from '@/lib/site';

type Props = {
  title: string;
  description: string;
};

export function UslugiConsultationBlock({ title, description }: Props) {
  return (
    <section aria-labelledby="uslugi-consultation-heading" className="relative py-10 sm:py-16 md:py-20 lg:py-24 xl:py-28 px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-purple-950/30 to-slate-950" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[1000px] sm:h-[1000px] bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[250px] h-[250px] sm:w-[600px] sm:h-[600px] bg-blue-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl 2xl:max-w-8xl 3xl:max-w-9xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6">
            <h2 id="uslugi-consultation-heading" className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
              <span className="cta-gradient-animated bg-clip-text text-transparent">{title}</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed">{description}</p>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-xl p-8 shadow-2xl">
              <div className="absolute inset-0 cta-gradient-animated opacity-[0.08] pointer-events-none" />
              <div className="relative flex flex-wrap items-center justify-center sm:justify-end gap-4">
                <Link href="/#contact">
                  <Button variant="primary">Napisz do nas</Button>
                </Link>
                {CALENDLY_URL && (
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm sm:text-base transition-all h-12 min-h-12 px-6 sm:px-8 bg-transparent border-2 border-slate-700 text-white hover:border-purple-500/50 hover:bg-slate-800/30"
                  >
                    Umów spotkanie
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
