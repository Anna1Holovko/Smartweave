import type { Metadata } from 'next';
import Image from 'next/image';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ScrollToTop } from '../components/ScrollToTop';
import { PageIntro } from '../components/PageIntro';
import { EBOOKS } from '@/lib/ebooks';
import { SITE_URL } from '@/lib/site';
import { SECTION_CLASS, CONTAINER_CLASS, INTRO_MB_CLASS } from '@/lib/layout';
import { BookOpen } from 'lucide-react';
import { EbookDownloadButton } from './EbookDownloadButton';

export const metadata: Metadata = {
  title: 'E-booki - SmartWeave',
  description:
    'Kup e-booki SmartWeave - publikacje dla firm: lead magnet, edukacja, budowanie autorytetu. Profesjonalne e-booki w spójności z Twoją marką.',
  openGraph: {
    title: 'E-booki | SmartWeave',
    description: 'Profesjonalne e-booki dla firm - lead magnet, edukacja, budowanie autorytetu.',
    url: `${SITE_URL}/e-booki`,
  },
};

export default function EbookiPage() {
  return (
    <>
      <Header />
      <main id="main-content" role="main" className="min-h-screen subpage-main">
        <section className={SECTION_CLASS}>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] lg:w-[700px] lg:h-[700px] 2xl:w-[800px] 2xl:h-[800px] bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-orange-500/10 rounded-full blur-3xl" />

          <div className={CONTAINER_CLASS}>
            <PageIntro
              backHref="/"
              backLabel="Strona główna"
              badge="E-booki"
              badgeVariant="blue"
              title="E-booki dla firm"
              description="Profesjonalne publikacje cyfrowe - lead magnet, edukacja, budowanie autorytetu. Kup e-book i wykorzystaj go w swojej strategii."
              className={INTRO_MB_CLASS}
            />

            <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {EBOOKS.map((book) => (
                <article
                  key={book.id}
                  className="group relative flex flex-col rounded-2xl border border-slate-700/50 bg-slate-900/40 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/50 hover:shadow-[0_0_40px_rgba(147,51,234,0.2)]"
                >
                  <div className="relative flex-1 min-h-[200px] p-3 sm:p-4">
                    <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden bg-slate-800 border border-white/10 shadow-inner">
                      {book.image ? (
                        <Image
                          src={book.image}
                          alt={book.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 479px) 100vw, (max-width: 1023px) 50vw, 33.33vw"
                        />
                      ) : (
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${book.gradient} flex items-center justify-center`}
                        >
                          <BookOpen className="w-16 h-16 text-white/80" aria-hidden />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                    </div>
                  </div>
                  <div className="relative bg-slate-900 border-t border-slate-700/50 px-4 sm:px-5 py-4 sm:py-5 flex flex-col flex-1">
                    <span className="text-slate-400 text-sm font-normal mb-1">{book.price}</span>
                    <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-purple-300 transition-colors mb-2">
                      {book.title}
                    </h2>
                    <p className="text-slate-400 text-sm sm:text-base leading-relaxed flex-1 mb-4">
                      {book.description}
                    </p>
                    <EbookDownloadButton book={book} />
                  </div>
                  <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${book.gradient} group-hover:w-full transition-all duration-500`} />
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
