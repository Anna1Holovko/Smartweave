import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { BLOG_POSTS } from '@/lib/blog';
import { SITE_URL } from '@/lib/site';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Wiedza o AI i automatyzacji dla firm. Artykuły o wdrażaniu automatyzacji, narzędziach, procesach biznesowych i designie – SmartWeave.',
  openGraph: {
    title: 'Blog | SmartWeave – AI i automatyzacja',
    description: 'Zdobądź wiedzę na temat AI i automatyzacji. Praktyczne artykuły dla firm.',
    url: `${SITE_URL}/blog`,
  },
};

export default function BlogPage() {
  return (
    <>
      <Header />
      <main id="main-content" role="main" className="min-h-screen">
        <section className="relative py-10 sm:py-16 md:py-20 lg:py-24 xl:py-28 px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 3xl:px-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] lg:w-[700px] lg:h-[700px] 2xl:w-[800px] 2xl:h-[800px] bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] bg-cyan-500/10 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-7xl 2xl:max-w-8xl 3xl:max-w-9xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-purple-400 transition-colors mb-6 sm:mb-8 lg:mb-12 min-h-[44px] min-w-[44px] items-center justify-center sm:min-h-0 sm:min-w-0 sm:justify-start"
            >
              <ArrowLeft className="w-4 h-4 flex-shrink-0" />
              <span>Strona główna</span>
            </Link>

            <div className="text-center mb-10 sm:mb-12 lg:mb-16">
              <span className="inline-block mb-3 sm:mb-4 px-3 py-1.5 sm:px-4 sm:py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-300 text-xs sm:text-sm font-medium uppercase tracking-wider">
                Blog
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white mb-3 sm:mb-4 lg:mb-6 px-2 sm:px-4">
                Zdobądź wiedzę na temat AI i automatyzacji!
              </h1>
              <p className="text-base sm:text-xl text-slate-400 max-w-[80ch] mx-auto px-2">
                Praktyczne artykuły o automatyzacji, narzędziach i procesach — dla firm, które chcą się rozwijać.
              </p>
            </div>

            <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
              {BLOG_POSTS.map((post, index) => (
                <article
                  key={post.slug}
                  className="group relative flex flex-col rounded-2xl border border-slate-700/50 bg-slate-900/40 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-purple-500/50 hover:shadow-[0_0_40px_rgba(147,51,234,0.2)]"
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
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </article>
              ))}
            </div>

            <div className="mt-10 sm:mt-12 lg:mt-16 text-center">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 sm:px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm sm:text-base font-semibold hover:opacity-90 transition-opacity"
              >
                Skontaktuj się z nami
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
