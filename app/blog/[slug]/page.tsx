import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { ScrollToTop } from '../../components/ScrollToTop';
import { MotionFadeIn } from '../../components/MotionFadeIn';
import { getPostBySlug as getUnifiedPostBySlug, getUnifiedPostCoverUrl, getAllSlugs } from '@/lib/blog-adapter';
import { SITE_URL } from '@/lib/site';
import { CONTAINER_CLASS } from '@/lib/layout';
import { QuickAutomationCta } from '@/app/components/QuickAutomationCta';
import { ArrowLeft } from 'lucide-react';
/** ISR: article HTML from Notion (~60s). Sync with lib/notion-articles cache. */
export const revalidate = 60;

/** Slugs not in this list (e.g. new Notion posts after deploy) still render — default dynamicParams. */
export const dynamicParams = true;

type Props = { params: Promise<{ slug: string }> };

/** Pre-renders known slugs at build; new Published pages work on next request after revalidate. */
export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getUnifiedPostBySlug(slug);
  if (!post) return { title: 'Nie znaleziono' };
  const coverUrl = getUnifiedPostCoverUrl(post);
  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;
  const title = post.metaTitle ?? post.title;
  const description = post.metaDescription ?? post.excerpt;
  return {
    title,
    description,
    keywords: post.keywords?.join(', '),
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: [{ url: coverUrl, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [coverUrl],
    },
  };
}

const articleBodyClass =
  'article-body prose prose-invert max-w-none text-zinc-400 [&_h2]:text-xl [&_h2]:sm:text-2xl [&_h2]:font-bold [&_h2]:text-[#e4e4e7] [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:sm:text-xl [&_h3]:font-bold [&_h3]:text-zinc-200 [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:leading-relaxed [&_p]:mb-4 [&_a]:text-[#d8f17b] [&_a]:hover:underline [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1 [&_ul]:my-4';

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getUnifiedPostBySlug(slug);
  if (!post) notFound();

  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;
  const description = post.metaDescription || post.excerpt;

  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    datePublished: post.date,
    description,
    url: canonicalUrl,
    image: getUnifiedPostCoverUrl(post),
    author: { '@type': 'Organization', name: 'SmartWeave' },
    publisher: {
      '@type': 'Organization',
      name: 'SmartWeave',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/assets/smartweave-logo.png` },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }} />
      <Header />
      <main id="main-content" role="main" className="min-h-screen subpage-main">
        <article className="relative py-10 sm:py-16 md:py-20 lg:py-24 xl:py-28 px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 overflow-hidden">
          <div className="absolute inset-0 bg-[var(--bg)]" />
          <div className={CONTAINER_CLASS}>
            <div className="w-full flex justify-center">
              <div className="w-full max-w-3xl">
                <MotionFadeIn>
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 min-h-[44px] items-center text-zinc-400 hover:text-[#d8f17b] transition-colors mb-6 sm:mb-8 lg:mb-12"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Wróć do bloga
                  </Link>
                </MotionFadeIn>
                <MotionFadeIn delay={0.1}>
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-white/5 border border-white/10 mb-8">
                    <Image
                      src={post.image}
                      alt=""
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 768px) 100vw, 48rem"
                    />
                  </div>
                  <header>
                    <time dateTime={post.date} className="text-zinc-500 text-sm mb-2 block">
                      Dodano: {post.date}
                    </time>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-[#e4e4e7] mb-4">
                      {post.title}
                    </h1>
                    <p className="text-base sm:text-xl text-zinc-400 leading-relaxed mb-8 max-w-[80ch]">
                      {post.excerpt}
                    </p>
                  </header>
                </MotionFadeIn>
                {post.content ? (
                  <div className={articleBodyClass} dangerouslySetInnerHTML={{ __html: post.content }} />
                ) : (
                  <p className="text-zinc-500">Treść artykułu jest pusta. Uzupełnij treść strony w Notion.</p>
                )}
              </div>
            </div>
          </div>
        </article>
        <QuickAutomationCta />
        <div className="gradient-philosophy-to-footer">
          <Footer />
        </div>
      </main>
      <ScrollToTop />
    </>
  );
}
