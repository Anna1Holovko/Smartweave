import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { PORTFOLIO_ITEMS } from '@/lib/portfolio';
import { SITE_URL } from '@/lib/site';
import { ArrowLeft, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Realizacje',
  description:
    'Zobacz realizacje SmartWeave: strony WWW, design i projekty dla firm. Kepller, DentalMint, Orthomedica, Bagiety, Maison i inne.',
  openGraph: {
    title: 'Realizacje | SmartWeave – strony WWW i design',
    description: 'Portfolio projektów: strony internetowe, branding i design dla firm.',
    url: `${SITE_URL}/realizacje`,
  },
};

export default function RealizacjePage() {
  return (
    <>
      <Header />
      <main id="main-content" role="main" className="min-h-screen">
        <section className="relative py-10 sm:py-16 md:py-20 lg:py-24 xl:py-28 px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 3xl:px-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] lg:w-[700px] lg:h-[700px] 2xl:w-[800px] 2xl:h-[800px] bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-purple-500/10 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-7xl 2xl:max-w-8xl 3xl:max-w-9xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-purple-400 transition-colors mb-6 sm:mb-8 lg:mb-12 min-h-[44px] min-w-[44px] items-center justify-center sm:min-h-0 sm:min-w-0 sm:justify-start"
            >
              <ArrowLeft className="w-4 h-4 flex-shrink-0" />
              <span>Strona główna</span>
            </Link>

            <div className="text-center mb-10 sm:mb-12 lg:mb-16">
              <span className="inline-block mb-3 sm:mb-4 px-3 py-1.5 sm:px-4 sm:py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-300 text-xs sm:text-sm font-medium uppercase tracking-wider">
                Realizacje
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white mb-3 sm:mb-4 lg:mb-6 px-2 sm:px-4">
                Zobacz, jak wspieramy rozwój innych firm
              </h1>
              <p className="text-base sm:text-xl text-slate-400 max-w-[80ch] mx-auto px-2">
                Każdy projekt to wyjątkowa historia. Strony, branding i design — sprawdź realizacje.
              </p>
            </div>

            <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
              {PORTFOLIO_ITEMS.map((item, index) => (
                <article
                  key={index}
                  className="group relative flex flex-col rounded-2xl border border-slate-700/50 bg-slate-900/40 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-purple-500/50 hover:shadow-[0_0_40px_rgba(147,51,234,0.2)]"
                >
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col h-full"
                    title={`Zobacz realizację: ${item.title}`}
                  >
                    <div className="relative flex-1 min-h-[200px] p-3 sm:p-4">
                      <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden bg-slate-800 border border-white/10 shadow-inner">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 479px) 100vw, (max-width: 1023px) 50vw, (max-width: 1535px) 33.33vw, (max-width: 1919px) 25vw, 20vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-900/40">
                          <ExternalLink className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="relative bg-slate-900 border-t border-slate-700/50 px-4 sm:px-5 py-4 sm:py-5 flex flex-col">
                      <span className="text-slate-400 text-sm font-normal mb-1">{item.category}</span>
                      <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-purple-300 transition-colors pr-10">
                        {item.title}
                      </h2>
                      <div className="absolute right-4 bottom-4 flex items-center justify-center w-9 h-9 rounded-lg border border-slate-600 bg-slate-800/80 text-white group-hover:border-purple-500/50 transition-colors">
                        <ExternalLink className="w-4 h-4" aria-hidden />
                      </div>
                    </div>
                    <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${item.gradient} group-hover:w-full transition-all duration-500`} />
                  </a>
                </article>
              ))}
            </div>

            <div className="mt-10 sm:mt-12 lg:mt-16 text-center">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 sm:px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm sm:text-base font-semibold hover:opacity-90 transition-opacity"
              >
                Porozmawiajmy o Twoim projekcie
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
