import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ScrollToTop } from '../components/ScrollToTop';
import { PageIntro } from '../components/PageIntro';
import { getAllPosts } from '@/lib/blog-adapter';
import { QuickAutomationCta } from '../components/QuickAutomationCta';
import { SITE_URL } from '@/lib/site';
import { SECTION_CLASS, CONTAINER_CLASS, INTRO_MB_CLASS } from '@/lib/layout';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Wiedza o AI i automatyzacji dla firm. Artykuły o wdrażaniu, narzędziach i procesach - SmartWeave',
  openGraph: {
    title: 'Blog | SmartWeave - AI i automatyzacja',
    description: 'Zdobądź wiedzę na temat AI i automatyzacji. Praktyczne artykuły dla firm',
    url: `${SITE_URL}/blog`,
  },
};

export default async function BlogPage() {
  // Merges code posts + Airtable (published), sorted by publish_date DESC. Falls back to code-only if Airtable fails.
  const posts = await getAllPosts();

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
              badge="Blog"
              badgeVariant="accent"
              title="Zdobądź wiedzę na temat AI i automatyzacji!"
              description="Praktyczne artykuły o automatyzacji, narzędziach i procesach - dla rozwijających się firm"
              className={INTRO_MB_CLASS}
            />

            <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="group relative flex flex-col rounded-2xl glass-card hover-lift overflow-hidden"
                  style={{ background: 'var(--bg-graphite-card)', backdropFilter: 'blur(16px)' }}
                >
                  <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-white/5">
                      <Image
                        src={post.image}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 479px) 100vw, (max-width: 1023px) 50vw, (max-width: 1535px) 33.33vw, (max-width: 1919px) 25vw, 20vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/60 via-transparent to-transparent" />
                    </div>
                    <div className="flex flex-col flex-1 p-4 sm:p-5 lg:p-6">
                      <h2 className="text-base sm:text-lg lg:text-xl font-bold text-[#e4e4e7] mb-1.5 sm:mb-2 group-hover:text-[#d8f17b] transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-zinc-400 text-xs sm:text-sm lg:text-base leading-relaxed line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>
                      <span className="text-zinc-500 text-xs mt-2 sm:mt-3">Dodano: {post.date}</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 w-0 bg-[#d8f17b] group-hover:w-full transition-all duration-500" />
                  </Link>
                </article>
              ))}
            </div>

            <div className="mt-10 sm:mt-12 lg:mt-16 text-center">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm sm:text-base transition-all h-12 min-h-12 px-6 sm:px-8 cta-gradient-animated"
              >
                Skontaktuj się z nami
              </Link>
            </div>
          </div>
        </section>
        <QuickAutomationCta topic="blog" />
        <div className="gradient-philosophy-to-footer">
          <Footer />
        </div>
      </main>
      <ScrollToTop />
    </>
  );
}
