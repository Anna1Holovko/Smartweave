import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { BLOG_POSTS } from '@/lib/blog';
import { ArrowLeft } from 'lucide-react';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: 'Nie znaleziono' };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
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
            <time className="text-slate-500 text-sm mb-2 block">{post.date}</time>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              {post.title}
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              {post.excerpt}
            </p>
            <p className="text-slate-500 text-sm">
              Pełna treść artykułu wkrótce.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
