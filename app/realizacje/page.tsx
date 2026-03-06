import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ScrollToTop } from '../components/ScrollToTop';
import { PageIntro } from '../components/PageIntro';
import { PORTFOLIO_ITEMS } from '@/lib/portfolio';
import { SITE_URL } from '@/lib/site';
import { SECTION_CLASS, CONTAINER_CLASS, INTRO_MB_CLASS } from '@/lib/layout';
import { ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Realizacje',
  description:
    'Zobacz realizacje SmartWeave: strony WWW, design i projekty dla firm. Kepller, DentalMint, Orthomedica, Bagiety, Maison i inne.',
  openGraph: {
    title: 'Realizacje | SmartWeave - strony WWW i design',
    description: 'Portfolio projektów: strony internetowe, branding i design dla firm.',
    url: `${SITE_URL}/realizacje`,
  },
};

export default function RealizacjePage() {
  return (
    <>
      <Header />
      <main id="main-content" role="main" className="min-h-screen">
        <section className={SECTION_CLASS}>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] lg:w-[700px] lg:h-[700px] 2xl:w-[800px] 2xl:h-[800px] bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-purple-500/10 rounded-full blur-3xl" />

          <div className={CONTAINER_CLASS}>
            <PageIntro
              backHref="/"
              backLabel="Strona główna"
              badge="Realizacje"
              badgeVariant="cyan"
              title="Zobacz, jak wspieramy rozwój innych firm"
              description="Każdy projekt to wyjątkowa historia. Strony, branding i design - sprawdź realizacje."
              className={INTRO_MB_CLASS}
            />

            <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {PORTFOLIO_ITEMS.map((item, index) => {
                const isInternal = item.link.startsWith('/');
                const wrapperClassName =
                  'group relative flex flex-col rounded-2xl border border-slate-700/50 bg-slate-900/40 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/50 hover:shadow-[0_0_40px_rgba(147,51,234,0.2)]';
                const content = (
                  <>
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
                  </>
                );
                return (
                  <article key={index} className={wrapperClassName}>
                    {isInternal ? (
                      <Link href={item.link} className="flex flex-col h-full" title={`Zobacz: ${item.title}`}>
                        {content}
                      </Link>
                    ) : (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col h-full"
                        title={`Zobacz realizację: ${item.title}`}
                      >
                        {content}
                      </a>
                    )}
                  </article>
                );
              })}
            </div>

            <div className="mt-10 sm:mt-12 lg:mt-16 text-center">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm sm:text-base transition-all h-12 min-h-12 px-6 sm:px-8 text-white cta-gradient-animated hover:scale-105 hover:shadow-[0_0_28px_rgba(167,139,250,0.4)]"
              >
                Porozmawiajmy o Twoim projekcie
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
