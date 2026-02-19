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
        <section className="relative py-12 sm:py-20 px-4 sm:px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] sm:w-[700px] sm:h-[700px] bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-7xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-purple-400 transition-colors mb-8 sm:mb-12"
            >
              <ArrowLeft className="w-4 h-4" />
              Strona główna
            </Link>

            <div className="text-center mb-12 sm:mb-16">
              <span className="inline-block mb-4 px-3 py-1.5 sm:px-4 sm:py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-300 text-xs sm:text-sm font-medium uppercase tracking-wider">
                Realizacje
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
                Zobacz, jak wspieramy rozwój innych firm
              </h1>
              <p className="text-base sm:text-xl text-slate-400 max-w-3xl mx-auto">
                Każdy projekt to wyjątkowa historia. Strony internetowe, branding i design – sprawdź nasze realizacje.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
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
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-800">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span
                          className={`px-3 py-1 bg-gradient-to-r ${item.gradient} rounded-full text-white text-xs font-semibold`}
                        >
                          {item.category}
                        </span>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-purple-900/30">
                        <ExternalLink className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div className="flex flex-col flex-1 p-5 sm:p-6">
                      <h2 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors line-clamp-2">
                        {item.title}
                      </h2>
                      <p className="text-slate-400 text-sm sm:text-base leading-relaxed line-clamp-3 flex-1">
                        {item.description}
                      </p>
                    </div>
                    <div
                      className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    />
                  </a>
                </article>
              ))}
            </div>

            <div className="mt-12 sm:mt-16 text-center">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:opacity-90 transition-opacity"
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
