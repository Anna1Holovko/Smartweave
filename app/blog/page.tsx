import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';
import { ScrollToTop } from '../components/ScrollToTop';
import { PageIntro } from '../components/PageIntro';
import { BLOG_POSTS } from '@/lib/blog';
import { SITE_URL } from '@/lib/site';
import { SECTION_CLASS, CONTAINER_CLASS, INTRO_MB_CLASS } from '@/lib/layout';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Wiedza o AI i automatyzacji dla firm. Artykuły o wdrażaniu automatyzacji, narzędziach, procesach biznesowych i designie - SmartWeave.',
  openGraph: {
    title: 'Blog | SmartWeave - AI i automatyzacja',
    description: 'Zdobądź wiedzę na temat AI i automatyzacji. Praktyczne artykuły dla firm.',
    url: `${SITE_URL}/blog`,
  },
};

export default function BlogPage() {
  return (
    <>
      <Header />
      <main id="main-content" role="main" className="min-h-screen">
        <section className={SECTION_CLASS}>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] lg:w-[700px] lg:h-[700px] 2xl:w-[800px] 2xl:h-[800px] bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] bg-cyan-500/10 rounded-full blur-3xl" />

          <div className={CONTAINER_CLASS}>
            <PageIntro
              backHref="/"
              backLabel="Strona główna"
              badge="Blog"
              badgeVariant="purple"
              title="Zdobądź wiedzę na temat AI i automatyzacji!"
              description="Praktyczne artykuły o automatyzacji, narzędziach i procesach - dla firm, które chcą się rozwijać"
              className={INTRO_MB_CLASS}
            />

            <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {BLOG_POSTS.map((post, index) => (
                <article
                  key={post.slug}
                  className="group relative flex flex-col rounded-2xl border border-slate-700/50 bg-slate-900/40 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/50 hover:shadow-[0_0_40px_rgba(147,51,234,0.2)]"
                >
                  <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-800">
                      <Image
                        src={post.image}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 479px) 100vw, (max-width: 1023px) 50vw, (max-width: 1535px) 33.33vw, (max-width: 1919px) 25vw, 20vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                    </div>
                    <div className="flex flex-col flex-1 p-4 sm:p-5 lg:p-6">
                      <h2 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-1.5 sm:mb-2 group-hover:text-purple-300 transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-slate-400 text-xs sm:text-sm lg:text-base leading-relaxed line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>
                      <span className="text-slate-500 text-xs mt-2 sm:mt-3">{post.date}</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 w-0 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-500" />
                  </Link>
                </article>
              ))}
            </div>

            <div className="mt-10 sm:mt-12 lg:mt-16 text-center">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm sm:text-base transition-all h-12 min-h-12 px-6 sm:px-8 text-white cta-gradient-animated hover:scale-105 hover:shadow-[0_0_28px_rgba(167,139,250,0.4)]"
              >
                Skontaktuj się z nami
              </Link>
            </div>
          </div>
        </section>
        <div className="gradient-philosophy-to-footer">
          <CTASection />
          <Footer />
        </div>
      </main>
      <ScrollToTop />
    </>
  );
}
