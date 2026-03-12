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
    'Kup e-booki SmartWeave - publikacje dla firm: lead magnet, edukacja, budowanie autorytetu',
  openGraph: {
    title: 'E-booki | SmartWeave',
    description: 'Profesjonalne e-booki dla firm - lead magnet, edukacja, budowanie autorytetu',
    url: `${SITE_URL}/e-booki`,
  },
};

export default function EbookiPage() {
  return (
    <>
      <Header />
      <main id="main-content" role="main" className="min-h-screen subpage-main">
        <section className={SECTION_CLASS}>
          <div className="absolute inset-0 bg-[var(--bg)]" />

          <div className={CONTAINER_CLASS}>
            <PageIntro
              backHref="/"
              backLabel="Strona główna"
              badge="E-booki"
              badgeVariant="accent"
              title="E-booki dla firm"
              description="Profesjonalne publikacje cyfrowe - lead magnet, edukacja, budowanie autorytetu"
              className={INTRO_MB_CLASS}
            />

            <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {EBOOKS.map((book) => (
                <article
                  key={book.id}
                  className="group relative flex flex-col rounded-2xl glass-card hover-lift overflow-hidden"
                  style={{ background: 'var(--bg-graphite-card)', backdropFilter: 'blur(16px)' }}
                >
                  <div className="relative flex-1 min-h-[200px] p-3 sm:p-4">
                    <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden bg-white/5 border border-white/10 shadow-inner">
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
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/60 via-transparent to-transparent" />
                    </div>
                  </div>
                  <div className="relative bg-[var(--bg-2)] border-t border-white/10 px-4 sm:px-5 py-4 sm:py-5 flex flex-col flex-1">
                    <div className="flex items-baseline justify-between gap-3 mb-2">
                      <h2 className="text-xl sm:text-2xl font-bold text-[#e4e4e7] group-hover:text-[#d8f17b] transition-colors min-w-0">
                        {book.title}
                      </h2>
                      <span className="text-xl sm:text-2xl font-bold text-[#e4e4e7] flex-shrink-0">{book.price}</span>
                    </div>
                    <p className="text-zinc-400 text-sm sm:text-base leading-relaxed flex-1 mb-4">
                      {book.description}
                    </p>
                    <EbookDownloadButton book={book} />
                  </div>
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#d8f17b] group-hover:w-full transition-all duration-500" />
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
