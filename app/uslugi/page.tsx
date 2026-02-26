import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ScrollToTop } from '../components/ScrollToTop';
import { PageIntro } from '../components/PageIntro';
import { SERVICES } from '@/lib/services';
import { SITE_URL, CALENDLY_URL } from '@/lib/site';
import { SECTION_CLASS, CONTAINER_CLASS, INTRO_MB_CLASS } from '@/lib/layout';
import { Globe, Workflow, Palette, Check, ArrowUpRight } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const metadata: Metadata = {
  title: 'Usługi – strony WWW, branding i automatyzacja | SmartWeave',
  description:
    'Pełna oferta SmartWeave: projektowanie stron internetowych, identyfikacja wizualna i branding, automatyzacja procesów i agenci AI. Dla małych i średnich firm.',
  openGraph: {
    title: 'Usługi | SmartWeave – strony WWW, design i automatyzacja',
    description: 'Strony internetowe, branding i automatyzacja procesów dla firm.',
    url: `${SITE_URL}/uslugi`,
  },
};

const SERVICE_ICONS = [Globe, Palette, Workflow] as const;

export default function UslugiPage() {
  return (
    <>
      <Header />
      <main id="main-content" role="main" className="min-h-screen">
        <section className={SECTION_CLASS}>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950/30 to-slate-950" />
          <div className="absolute top-0 left-1/4 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-purple-500/10 rounded-full blur-3xl" />

          <div className={CONTAINER_CLASS}>
            <PageIntro
              backHref="/"
              backLabel="Strona główna"
              badge="Oferta"
              badgeVariant="blue"
              title={
                <>
                  Pełna oferta <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">usług</span>
                </>
              }
              description="Strony, branding i automatyzacja — wszystko, czego potrzebuje Twoja firma w internecie."
              className={INTRO_MB_CLASS}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 items-stretch">
              {SERVICES.map((service, index) => {
                const Icon = SERVICE_ICONS[index];
                return (
                  <Link
                    key={index}
                    href={`/uslugi/${service.slug}`}
                    className="group relative flex flex-col w-full min-h-0 p-8 bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/50 hover:shadow-[0_0_40px_rgba(147,51,234,0.2)] overflow-hidden"
                  >
                    <div className="flex items-center gap-4 mb-6 flex-shrink-0 min-h-14">
                      <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} p-0.5`}>
                        <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center">
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                      </div>
                      <h2 className="text-xl font-bold text-white flex-1 min-w-0">{service.title}</h2>
                      <div className="flex-shrink-0 w-9 h-9 rounded-lg border border-slate-600/50 bg-slate-800/80 flex items-center justify-center text-slate-400 group-hover:text-purple-400 group-hover:border-purple-500/50 transition-colors" aria-hidden>
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                    <p className="text-slate-400 leading-relaxed flex-shrink-0">{service.description}</p>
                    <ul className="space-y-3 mt-6 flex-1 min-h-0">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-slate-400">
                          <Check className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" aria-hidden />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className={`absolute bottom-0 left-0 right-0 h-1 w-0 bg-gradient-to-r ${service.gradient} group-hover:w-full transition-all duration-500 rounded-b-2xl`} />
                  </Link>
                );
              })}
            </div>

            <div className="relative overflow-hidden rounded-2xl p-8 md:p-12 text-center border border-slate-700/50 bg-slate-900/40 backdrop-blur-xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Nie jesteś pewien, które rozwiązanie jest dla Ciebie?</h2>
              <p className="text-base sm:text-xl text-slate-400 mb-8 max-w-[80ch] mx-auto px-2">
                Umów bezpłatną konsultację — porozmawiamy o wyzwaniach i zaproponujemy rozwiązanie.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
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
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
