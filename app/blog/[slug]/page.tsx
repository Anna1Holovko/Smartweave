import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { SimpleCTASection } from '../../components/SimpleCTASection';
import { ScrollToTop } from '../../components/ScrollToTop';
import { MotionFadeIn } from '../../components/MotionFadeIn';
import { getPostBySlug as getUnifiedPostBySlug, getUnifiedPostCoverUrl, getAllSlugs } from '@/lib/blog-adapter';
import { BLOG_CONTENT, type ContentBlock } from '@/lib/blog-content';
import { SITE_URL, CALENDLY_URL } from '@/lib/site';
import { CONTAINER_CLASS } from '@/lib/layout';
import { Button } from '@/app/components/ui/Button';
import { QuickAutomationCta } from '@/app/components/QuickAutomationCta';
import { ArrowLeft } from 'lucide-react';

type Props = { params: Promise<{ slug: string }> };

/** Static params: code slugs + Airtable slugs (when API available at build time). */
export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

/** SEO metadata: uses Airtable meta_description when present, else excerpt. */
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

function ArticleBody({ slug }: { slug: string }) {
  const blocks = BLOG_CONTENT[slug];
  if (!blocks?.length) return null;
  return (
    <div className="article-body">
      {blocks.map((block, i) => {
        if (block.t === 'h2') return <h2 key={i} id={(block.c as string).slice(0, 40).replace(/\s+/g, '-').toLowerCase()} className="text-xl sm:text-2xl font-bold text-[#e4e4e7] mt-10 mb-4">{block.c as string}</h2>;
        if (block.t === 'h3') return <h3 key={i} className="text-lg sm:text-xl font-bold text-zinc-200 mt-6 mb-3">{block.c as string}</h3>;
        if (block.t === 'p') return <p key={i} className="text-zinc-400 leading-relaxed mb-4">{block.c as string}</p>;
        if (block.t === 'ul') return <ul key={i} className="list-disc pl-6 space-y-1 my-4 text-zinc-400">{(block as { t: 'ul'; c: string[] }).c.map((item, j) => <li key={j} className="my-1">{item}</li>)}</ul>;
        if (block.t === 'faq') {
          const faq = (block as { t: 'faq'; c: { q: string; a: string }[] }).c;
          return (
            <section key={i} className="mt-10 mb-8" aria-labelledby="faq-heading">
              <h2 id="faq-heading" className="text-xl sm:text-2xl font-bold text-[#e4e4e7] mb-6">Najczęściej zadawane pytania</h2>
              <dl className="space-y-4">
                {faq.map((item, j) => (
                  <div key={j} className="border-b border-white/10 pb-4">
                    <dt className="text-[#e4e4e7] font-semibold mb-2">{item.q}</dt>
                    <dd className="text-zinc-400 leading-relaxed">{item.a}</dd>
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
              <p className="text-zinc-400 leading-relaxed mb-6">{cta.text}</p>
              <div className="flex flex-wrap items-center gap-4">
                <Link href="/#contact">
                  <Button variant="primary">Napisz do nas</Button>
                </Link>
                {CALENDLY_URL && (
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm sm:text-base transition-all h-12 min-h-12 px-6 sm:px-8 bg-transparent border-2 border-white/15 text-[#e4e4e7] hover:border-[#d8f17b]/50 hover:bg-white/5"
                  >
                    Umów krótką diagnozę
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
              <h2 id="sources-heading" className="text-xl sm:text-2xl font-bold text-[#e4e4e7] mb-4">Źródła</h2>
              <ul className="list-none space-y-2 text-zinc-400">
                {sources.map((src, j) => (
                  <li key={j}>
                    <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-[#d8f17b] hover:text-[#d8f17b]/90 underline underline-offset-2 break-all">
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
  const post = await getUnifiedPostBySlug(slug);
  if (!post) notFound();

  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;
  const description = post.metaDescription || post.excerpt;

  // JSON-LD BlogPosting schema (headline, datePublished, description, url) for SEO.
  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    datePublished: post.date,
    description,
    url: canonicalUrl,
    image: getUnifiedPostCoverUrl(post),
    author: { '@type': 'Organization', name: 'SmartWeave' },
    publisher: { '@type': 'Organization', name: 'SmartWeave', logo: { '@type': 'ImageObject', url: `${SITE_URL}/assets/smartweave-logo.png` } },
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

  const isAirtable = post.source === 'airtable';

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}
      <Header />
      <main id="main-content" role="main" className="min-h-screen subpage-main">
        <article className="relative py-10 sm:py-16 md:py-20 lg:py-24 xl:py-28 px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 overflow-hidden">
          <div className="absolute inset-0 bg-[var(--bg)]" />
          <div className={CONTAINER_CLASS}>
            <div className="max-w-3xl mx-auto">
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
                  <time dateTime={post.date} className="text-zinc-500 text-sm mb-2 block">Dodano: {post.date}</time>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-[#e4e4e7] mb-4">
                    {post.title}
                  </h1>
                  <p className="text-base sm:text-xl text-zinc-400 leading-relaxed mb-8 max-w-[80ch]">
                    {post.excerpt}
                  </p>
                </header>
              </MotionFadeIn>
              {isAirtable && post.content ? (
                <div
                  className="article-body prose prose-invert max-w-none text-zinc-400 [&_h2]:text-xl [&_h2]:sm:text-2xl [&_h2]:font-bold [&_h2]:text-[#e4e4e7] [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:sm:text-xl [&_h3]:font-bold [&_h3]:text-zinc-200 [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:leading-relaxed [&_p]:mb-4 [&_a]:text-[#d8f17b] [&_a]:hover:underline [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1 [&_ul]:my-4"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              ) : (
                <ArticleBody slug={slug} />
              )}
            </div>
          </div>
        </article>
        <QuickAutomationCta topic="blog" />
        <div className="gradient-philosophy-to-footer">
          <SimpleCTASection />
          <Footer />
        </div>
      </main>
      <ScrollToTop />
    </>
  );
}
