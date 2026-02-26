import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { ScrollToTop } from '@/app/components/ScrollToTop';
import { MotionFadeIn } from '@/app/components/MotionFadeIn';
import { SERVICES, getServiceBySlug, SERVICE_SLUGS } from '@/lib/services';
import { SITE_URL } from '@/lib/site';
import { SECTION_CLASS, CONTAINER_CLASS } from '@/lib/layout';
import { ArrowLeft, Check, ExternalLink } from 'lucide-react';
import { UslugiConsultationBlock } from '@/app/components/UslugiConsultationBlock';
import { PORTFOLIO_ITEMS } from '@/lib/portfolio';

const SLUG_TITLES: Record<string, string> = {
  strony: 'Strony internetowe',
  branding: 'Logo i identyfikacja wizualna',
  automatyzacja: 'Automatyzacja procesów biznesowych',
  'agenci-ai': 'Agenci AI',
};

export async function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: 'Usługa | SmartWeave' };
  const shortTitle = SLUG_TITLES[slug] ?? service.title;
  return {
    title: `${shortTitle} – usługi`,
    description: service.description,
    openGraph: {
      title: `${shortTitle} – usługi`,
      description: service.description,
      url: `${SITE_URL}/uslugi/${slug}`,
    },
  };
}

export default async function UslugiSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <Header />
      <main id="main-content" role="main">
        {/* Service intro – home-style: centered, gradient title, badge */}
        <section className={SECTION_CLASS}>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950/30 to-slate-950" />
          <div className="absolute top-0 left-1/4 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-purple-500/10 rounded-full blur-3xl" />

          <div className={CONTAINER_CLASS}>
            <MotionFadeIn>
              <Link
                href="/uslugi"
                className="inline-flex items-center gap-2 text-slate-400 hover:text-purple-400 transition-colors mb-6 sm:mb-8 lg:mb-12 min-h-[44px] min-w-[44px] items-center justify-center sm:min-h-0 sm:min-w-0 sm:justify-start"
              >
                <ArrowLeft className="w-4 h-4 flex-shrink-0" />
                <span>Wszystkie usługi</span>
              </Link>
            </MotionFadeIn>

            <MotionFadeIn delay={0.1} className="text-center mb-12 sm:mb-20">
              <span className="inline-block mb-3 sm:mb-4 px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-300 text-xs sm:text-sm font-medium uppercase tracking-wider">
                Oferta
              </span>
              <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent px-2 break-words`}>
                {service.title}
              </h1>
              <p className="text-base sm:text-xl text-slate-400 max-w-[80ch] mx-auto px-2 mt-4">
                {service.description}
              </p>
            </MotionFadeIn>

            <MotionFadeIn delay={0.2}>
              <div className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/40 backdrop-blur-xl p-8 md:p-10 transition-all duration-300 hover:border-purple-500/50 hover:shadow-[0_0_40px_rgba(147,51,234,0.2)]">
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient} rounded-b-2xl`} />
                <h2 className="text-lg sm:text-xl font-semibold text-white mb-6">Zakres usługi</h2>
                <ul className="space-y-4 text-slate-400">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm sm:text-base">
                      <Check className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" aria-hidden />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </MotionFadeIn>

            {slug === 'strony' && (
              <MotionFadeIn delay={0.25} className="mt-12 sm:mt-16 lg:mt-20">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8">Realizacje</h2>
                <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                  {PORTFOLIO_ITEMS.map((item, index) => (
                    <article
                      key={index}
                      className="group relative flex flex-col rounded-2xl border border-slate-700/50 bg-slate-900/40 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/50 hover:shadow-[0_0_40px_rgba(147,51,234,0.2)]"
                    >
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col h-full"
                        title={`Zobacz realizację: ${item.title}`}
                      >
                        <div className="relative flex-1 min-h-[200px] p-3 sm:p-4">
                          <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden bg-slate-800 border border-white/10 shadow-inner">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                              sizes="(max-width: 479px) 100vw, (max-width: 1023px) 50vw, 33.33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-900/40">
                              <ExternalLink className="w-8 h-8 text-white" />
                            </div>
                          </div>
                        </div>
                        <div className="relative bg-slate-900 border-t border-slate-700/50 px-4 sm:px-5 py-4 sm:py-5 flex flex-col">
                          <span className="text-slate-400 text-sm font-normal mb-1">{item.category}</span>
                          <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-purple-300 transition-colors pr-10">
                            {item.title}
                          </h3>
                          <div className="absolute right-4 bottom-4 flex items-center justify-center w-9 h-9 rounded-lg border border-slate-600 bg-slate-800/80 text-white group-hover:border-purple-500/50 transition-colors">
                            <ExternalLink className="w-4 h-4" aria-hidden />
                          </div>
                        </div>
                        <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${item.gradient} group-hover:w-full transition-all duration-500`} />
                      </a>
                    </article>
                  ))}
                </div>
                <div className="mt-8 sm:mt-10 text-center">
                  <Link
                    href="/realizacje"
                    className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 sm:px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm sm:text-base font-semibold hover:opacity-90 transition-opacity"
                  >
                    Zobacz wszystkie realizacje
                  </Link>
                </div>
              </MotionFadeIn>
            )}
          </div>
        </section>

        <UslugiConsultationBlock
          title="Zainteresowała Cię ta usługa?"
          description="Umów bezpłatną konsultację — opowiemy o szczegółach i dopasujemy rozwiązanie do Twoich potrzeb."
        />

        <div className="gradient-philosophy-to-footer">
          <Footer />
        </div>
      </main>
      <ScrollToTop />
    </>
  );
}
