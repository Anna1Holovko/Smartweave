import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { BLOG_POSTS, getBlogCoverUrl, getPostBySlug } from '@/lib/blog';
import { BLOG_CONTENT } from '@/lib/blog-content';
import { SITE_URL } from '@/lib/site';
import { ArrowLeft } from 'lucide-react';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Nie znaleziono' };
  const coverUrl = getBlogCoverUrl(post);
  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: canonicalUrl,
      images: [{ url: coverUrl, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
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
        if (block.t === 'h2') return <h2 key={i} id={block.c.slice(0, 40).replace(/\s+/g, '-').toLowerCase()} className="text-xl sm:text-2xl font-bold text-white mt-10 mb-4">{block.c}</h2>;
        if (block.t === 'h3') return <h3 key={i} className="text-lg sm:text-xl font-bold text-slate-200 mt-6 mb-3">{block.c}</h3>;
        if (block.t === 'p') return <p key={i} className="text-slate-400 leading-relaxed mb-4">{block.c}</p>;
        if (block.t === 'ul') return <ul key={i} className="list-disc pl-6 space-y-1 my-4 text-slate-400">{block.c.map((item, j) => <li key={j} className="my-1">{item}</li>)}</ul>;
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
    publisher: { '@type': 'Organization', name: 'SmartWeave', logo: { '@type': 'ImageObject', url: `${SITE_URL}/assets/smartweave-logo.png` } },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main-content" role="main" className="min-h-screen">
        <article className="relative py-10 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 min-h-[44px] items-center text-slate-400 hover:text-purple-400 transition-colors mb-6 sm:mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Wróć do bloga
            </Link>
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
              <time dateTime={post.date} className="text-slate-500 text-sm mb-2 block">{post.date}</time>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                {post.title}
              </h1>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                {post.excerpt}
              </p>
            </header>
            <ArticleBody slug={slug} />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
