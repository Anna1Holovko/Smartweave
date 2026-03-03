import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { ScrollToTop } from '@/app/components/ScrollToTop';
import { MotionFadeIn } from '@/app/components/MotionFadeIn';
import { SERVICES, getServiceBySlug, SERVICE_SLUGS } from '@/lib/services';
import { SERVICE_PAGE_CONTENT } from '@/lib/service-page-content';
import { SITE_URL } from '@/lib/site';
import { SECTION_CLASS, CONTAINER_CLASS } from '@/lib/layout';
import { ArrowLeft, Check, ExternalLink } from 'lucide-react';
import { UslugiConsultationBlock } from '@/app/components/UslugiConsultationBlock';
import { AutomationWorkflowSection } from '@/app/components/AutomationWorkflowSection';
import { PORTFOLIO_ITEMS } from '@/lib/portfolio';

/** Page/SEO titles – aligned with search phrases (projektowanie stron www dla firm, automatyzacja procesów AI, strony pod leada B2B) */
const SLUG_TITLES: Record<string, string> = {
  strony: 'Projektowanie stron www dla firm',
  branding: 'Identyfikacja wizualna i branding',
  automatyzacja: 'Automatyzacja procesów biznesowych i agenci AI',
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
  const pageContent = SERVICE_PAGE_CONTENT[slug];

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

            {/* Centred title and description */}
            <MotionFadeIn delay={0.1} className="text-center mb-10 sm:mb-12 lg:mb-14">
              <span className="inline-block mb-3 sm:mb-4 px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-300 text-xs sm:text-sm font-medium uppercase tracking-wider">
                Oferta
              </span>
              <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent px-2 pb-[0.2em] break-words leading-snug mt-3 sm:mt-4`}>
                {service.title}
              </h1>
              <p className="text-base sm:text-xl text-white/90 max-w-[80ch] mx-auto px-2 mt-4 leading-relaxed">
                {service.description}
              </p>
            </MotionFadeIn>

            {pageContent && (
              <>
                <MotionFadeIn delay={0.15} className="mb-10 sm:mb-12 lg:mb-14 max-w-[80ch] mx-auto lg:mx-0">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">Z jakim problemem wychodzimy?</h2>
                  <p className="text-white/90 leading-relaxed">{pageContent.problem}</p>
                </MotionFadeIn>
                <MotionFadeIn delay={0.2} className="mb-10 sm:mb-12 lg:mb-14 max-w-[80ch] mx-auto lg:mx-0">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">Nasze podejście do rozwiązania</h2>
                  <p className="text-white/90 leading-relaxed">{pageContent.solution}</p>
                </MotionFadeIn>
              </>
            )}

            <div className={`grid gap-8 lg:gap-12 xl:gap-16 items-start ${slug === 'automatyzacja' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
              <div className={slug === 'automatyzacja' ? 'order-2 lg:order-1 space-y-6 lg:space-y-8' : 'space-y-6 lg:space-y-8'}>
                <MotionFadeIn delay={0.2}>
                  <div className="relative p-8 md:p-10 bg-transparent">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6">Co wdrażamy</h2>
                    <ul className="space-y-4 text-white/90">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm sm:text-base">
                          <Check className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" aria-hidden />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </MotionFadeIn>
              </div>

              {/* Right: AI animation only on Automatyzacja procesów i agenci AI */}
              {slug === 'automatyzacja' && (
                <MotionFadeIn delay={0.15} className="order-1 lg:order-2 w-full lg:sticky lg:top-24 hidden lg:block cursor-auto">
                  <AutomationWorkflowSection embedded />
                </MotionFadeIn>
              )}
            </div>

            {pageContent && (
              <>
                <MotionFadeIn delay={0.25} className="mt-12 sm:mt-16 lg:mt-20 mb-10 sm:mb-12 lg:mb-14">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6">Korzyści dla Twojej firmy</h2>
                  <ul className="space-y-4 text-white/90 max-w-[80ch]">
                    {pageContent.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm sm:text-base">
                        <Check className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" aria-hidden />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </MotionFadeIn>
                <MotionFadeIn delay={0.3} className="mb-10 sm:mb-12 lg:mb-14">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6">Jak wygląda proces współpracy</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {pageContent.process.map((item) => (
                      <div
                        key={item.step}
                        className="relative p-6 sm:p-8 rounded-xl bg-purple-900/90 shadow-lg"
                      >
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-purple-950 text-white text-base font-bold mb-4" aria-hidden>
                          {item.step}
                        </span>
                        <h3 className="text-white font-bold mb-2 text-base sm:text-lg">{item.title}</h3>
                        <p className="text-white/90 text-sm leading-relaxed">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </MotionFadeIn>
              </>
            )}

            {/* Realizacje – full-width section, 3 columns (only on strony) */}
            {slug === 'strony' && (
              <MotionFadeIn delay={0.25} className="w-full mt-12 sm:mt-16 lg:mt-20">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8">Realizacje na stronach internetowych</h2>
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
                    className="inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm sm:text-base transition-all h-12 min-h-12 px-6 sm:px-8 text-white cta-gradient-animated hover:scale-105 hover:shadow-[0_0_28px_rgba(167,139,250,0.4)]"
                  >
                    Zobacz wszystkie realizacje
                  </Link>
                </div>
              </MotionFadeIn>
            )}
          </div>
        </section>

        <UslugiConsultationBlock
          variant="centered"
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
