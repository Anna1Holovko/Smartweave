import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ScrollToTop } from '../components/ScrollToTop';
import { PageIntro } from '../components/PageIntro';
import { getAllPosts, isNotionBlogEnvConfigured } from '@/lib/blog-adapter';
import { QuickAutomationCta } from '../components/QuickAutomationCta';
import { SITE_URL } from '@/lib/site';
import { SECTION_CLASS, CONTAINER_CLASS, INTRO_MB_CLASS } from '@/lib/layout';
/** ISR: blog listing. Align with NOTION_CACHE_SECONDS (default 30). */
export const revalidate = 30;

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
  const posts = await getAllPosts();
  const notionEnvOk = isNotionBlogEnvConfigured();

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

            {posts.length === 0 ? (
              <p className="text-center text-zinc-500 max-w-xl mx-auto leading-relaxed">
                {!notionEnvOk ? (
                  <>
                    Ten widok nie ma dostępu do Airtable: ustaw na hostingu (np. Vercel → Settings →
                    Environment Variables) zmienną{' '}
                    <code className="text-zinc-400">AIRTABLE_BLOG_API_KEY</code> — i włącz ją
                    także dla środowiska <strong className="text-zinc-400">Preview</strong> (nie
                    tylko Production). Po zapisaniu odczekaj minutę lub wdróż ponownie.
                  </>
                ) : (
                  <>Nie ma jeszcze opublikowanych artykułów.</>
                )}
              </p>
            ) : (
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
            )}
          </div>
        </section>
        <QuickAutomationCta />
        <div className="gradient-philosophy-to-footer">
          <Footer />
        </div>
      </main>
      <ScrollToTop />
    </>
  );
}
