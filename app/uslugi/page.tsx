import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SERVICES } from '@/lib/services';
import { SITE_URL } from '@/lib/site';
import { ArrowLeft, Globe, Workflow, Palette, Check } from 'lucide-react';
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
        <section className="relative py-10 sm:py-16 md:py-20 lg:py-24 xl:py-28 px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950/30 to-slate-950" />
          <div className="absolute top-0 left-1/4 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-purple-500/10 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-7xl 2xl:max-w-8xl 3xl:max-w-9xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-purple-400 transition-colors mb-6 sm:mb-8 lg:mb-12 min-h-[44px] min-w-[44px] items-center justify-center sm:min-h-0 sm:min-w-0 sm:justify-start"
            >
              <ArrowLeft className="w-4 h-4 flex-shrink-0" />
              <span>Strona główna</span>
            </Link>

            <div className="text-center mb-10 sm:mb-12 lg:mb-16">
              <span className="inline-block mb-3 sm:mb-4 px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-300 text-xs sm:text-sm font-medium uppercase tracking-wider">
                Oferta
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white mb-3 sm:mb-4 lg:mb-6 px-2 sm:px-4">
                Pełna oferta <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">usług</span>
              </h1>
              <p className="text-sm sm:text-base lg:text-xl text-slate-400 max-w-3xl mx-auto px-2">
                Strony, branding i automatyzacja — wszystko, czego potrzebuje Twoja firma w internecie.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 items-stretch">
              {SERVICES.map((service, index) => {
                const Icon = SERVICE_ICONS[index];
                return (
                  <article
                    key={index}
                    className="relative flex flex-col w-full min-h-0 p-8 bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl hover:border-purple-500/50 transition-all hover:shadow-[0_0_30px_rgba(147,51,234,0.2)] overflow-hidden"
                  >
                    <div className="flex items-center gap-4 mb-6 flex-shrink-0">
                      <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} p-0.5`}>
                        <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center">
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                      </div>
                      <h2 className="text-xl font-bold text-white">{service.title}</h2>
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
                    <div className={`flex-shrink-0 w-full h-1 bg-gradient-to-r ${service.gradient} rounded-b-2xl mt-6 opacity-60`} />
                  </article>
                );
              })}
            </div>

            <div className="relative overflow-hidden rounded-2xl p-8 md:p-12 text-center border border-slate-700/50 bg-slate-900/40 backdrop-blur-xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Nie jesteś pewien, które rozwiązanie jest dla Ciebie?</h2>
              <p className="text-lg sm:text-xl text-slate-400 mb-8 max-w-3xl mx-auto">
                Umów bezpłatną konsultację — porozmawiamy o wyzwaniach i zaproponujemy rozwiązanie.
              </p>
              <Link href="/#contact">
                <Button variant="primary">Umów konsultację</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
