import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Header } from '../../_components/Header';
import { Footer } from '../../_components/Footer';
import { SimpleCTASection } from '../../_components/SimpleCTASection';
import { ScrollToTop } from '../../_components/ScrollToTop';
import { MotionFadeIn } from '../../_components/MotionFadeIn';
import { BLOG_POSTS, getBlogCoverUrl, getPostBySlug } from '../../_lib/blog';
import { BLOG_CONTENT, type ContentBlock } from '../../_lib/blog-content';
import { SITE_URL, CALENDLY_URL } from '@/lib/site';
import { CONTAINER_CLASS } from '@/lib/layout';
import { Button } from '../../_components/ui/Button';
import { ArrowLeft } from 'lucide-react';
import { V2_BASE } from '../../_lib/base-path';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Nie znaleziono' };
  const coverUrl = getBlogCoverUrl(post);
  const canonicalUrl = `${SITE_URL}${V2_BASE}/blog/${post.slug}`;
  const title = 'metaTitle' in post && post.metaTitle ? post.metaTitle : post.title;
  const description = 'metaDescription' in post && post.metaDescription ? post.metaDescription : post.excerpt;
  const keywords = 'keywords' in post && Array.isArray(post.keywords) ? post.keywords : undefined;
  return {
    title,
    description,
    keywords: keywords?.join(', '),
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
    robots: { index: false, follow: false },
  };
}

function ArticleBody({ slug }: { slug: string }) {
  const blocks = BLOG_CONTENT[slug];
  if (!blocks?.length) return null;
  return (
    <div className="article-body">
      {blocks.map((block, i) => {
        if (block.t === 'h2') return <h2 key={i} id={(block.c as string).slice(0, 40).replace(/\s+/g, '-').toLowerCase()} className="text-xl sm:text-2xl font-bold text-white mt-10 mb-4">{block.c as string}</h2>;
        if (block.t === 'h3') return <h3 key={i} className="text-lg sm:text-xl font-bold text-slate-200 mt-6 mb-3">{block.c as string}</h3>;
        if (block.t === 'p') return <p key={i} className="text-slate-400 leading-relaxed mb-4">{block.c as string}</p>;
        if (block.t === 'ul') return <ul key={i} className="list-disc pl-6 space-y-1 my-4 text-slate-400">{(block as { t: 'ul'; c: string[] }).c.map((item, j) => <li key={j} className="my-1">{item}</li>)}</ul>;
        if (block.t === 'faq') {
          const faq = (block as { t: 'faq'; c: { q: string; a: string }[] }).c;
          return (
            <section key={i} className="mt-10 mb-8" aria-labelledby="faq-heading">
              <h2 id="faq-heading" className="text-xl sm:text-2xl font-bold text-white mb-6">Najczęściej zadawane pytania</h2>
              <dl className="space-y-4">
                {faq.map((item, j) => (
                  <div key={j} className="border-b border-slate-700/50 pb-4">
                    <dt className="text-white font-semibold mb-2">{item.q}</dt>
                    <dd className="text-slate-400 leading-relaxed">{item.a}</dd>
                  </div>
                ))}
              </dl>
            </section>
          );
        }
        if (block.t === 'cta') {
          const cta = (block as { t: 'cta'; c: { text: string; href: string; label: string } }).c;
          return (
            <div key={i} className="mt-10 mb-8">
              <p className="text-slate-400 leading-relaxed mb-6">{cta.text}</p>
              <div className="flex flex-wrap items-center gap-4">
                <Link href={`${V2_BASE}/#contact`}>
                  <Button variant="primary">Napisz do nas</Button>
                </Link>
                {CALENDLY_URL && (
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm sm:text-base transition-all h-12 min-h-12 px-6 sm:px-8 bg-transparent border-2 border-slate-700 text-white hover:border-purple-500/50 hover:bg-slate-800/30"
                  >
                    Umów spotkanie
                  </a>
                )}
              </div>
            </div>
          );
        }
        if (block.t === 'sources') {
          const sources = (block as { t: 'sources'; c: { label: string; url: string }[] }).c;
          return (
            <section key={i} className="mt-10 mb-8" aria-labelledby="sources-heading">
              <h2 id="sources-heading" className="text-xl sm:text-2xl font-bold text-white mb-4">Źródła</h2>
              <ul className="list-none space-y-2 text-slate-400">
                {sources.map((src, j) => (
                  <li key={j}>
                    <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-purple-200 underline underline-offset-2 break-all">
                      {src.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          );
        }
        return null;
      })}
    </div>
  );
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: getBlogCoverUrl(post),
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'SmartWeave' },
    publisher: { '@type': 'Organization', name: 'SmartWeave', logo: { '@type': 'ImageObject', url: `${SITE_URL}${V2_BASE}/assets/smartweave-logo.png` } },
  };

  const blocks: ContentBlock[] = BLOG_CONTENT[slug] ?? [];
  const faqBlock = blocks.find((b): b is ContentBlock & { t: 'faq'; c: { q: string; a: string }[] } => b.t === 'faq');
  const faqJsonLd = faqBlock?.c?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqBlock.c.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      }
    : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}
      <Header />
      <main id="main-content" role="main" className="min-h-screen">
        <article className="relative py-10 sm:py-16 md:py-20 lg:py-24 xl:py-28 px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-cyan-500/10 rounded-full blur-3xl" />
          <div className={CONTAINER_CLASS}>
            <div className="max-w-3xl mx-auto">
              <MotionFadeIn>
                <Link
                  href={`${V2_BASE}/blog`}
                  className="inline-flex items-center gap-2 min-h-[44px] items-center text-slate-400 hover:text-purple-400 transition-colors mb-6 sm:mb-8 lg:mb-12"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Wróć do bloga
                </Link>
              </MotionFadeIn>
              <MotionFadeIn delay={0.1}>
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-800 mb-8">
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
                  <time dateTime={post.date} className="text-slate-500 text-sm mb-2 block">Dodano: {post.date}</time>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white mb-4">
                    {post.title}
                  </h1>
                  <p className="text-base sm:text-xl text-slate-400 leading-relaxed mb-8 max-w-[80ch]">
                    {post.excerpt}
                  </p>
                </header>
              </MotionFadeIn>
              <ArticleBody slug={slug} />
            </div>
          </div>
        </article>
        <div className="v2-gradient-philosophy-to-footer">
          <SimpleCTASection />
          <Footer />
        </div>
      </main>
      <ScrollToTop />
    </>
  );
}
