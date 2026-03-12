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

/** Page/SEO titles - aligned with search phrases (projektowanie stron www dla firm, automatyzacja procesów AI, strony pod leada B2B) */
const SLUG_TITLES: Record<string, string> = {
  strony: 'Projektowanie stron www dla firm',
  branding: 'Identyfikacja wizualna i branding',
  automatyzacja: 'Automatyzacja procesów biznesowych z wykorzystaniem AI',
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
  const metaDesc = service.description.replace(/\.$/, '').slice(0, 100);
  return {
    title: `${shortTitle} - usługi`,
    description: metaDesc,
    openGraph: {
      title: `${shortTitle} - usługi`,
      description: metaDesc,
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
      <main id="main-content" role="main" className="subpage-main">
        {/* Service intro - home-style: centered, gradient title, badge */}
        <section className={SECTION_CLASS}>
          <div className="absolute inset-0 bg-[var(--bg)]" />

          <div className={CONTAINER_CLASS}>
            <MotionFadeIn>
              <Link
                href="/uslugi"
                className="inline-flex items-center gap-2 text-zinc-400 hover:text-[#d8f17b] transition-colors mb-6 sm:mb-8 lg:mb-12 min-h-[44px] min-w-[44px] items-center justify-center sm:min-h-0 sm:min-w-0 sm:justify-start"
              >
                <ArrowLeft className="w-4 h-4 flex-shrink-0" />
                <span>Wszystkie usługi</span>
              </Link>
            </MotionFadeIn>

            {/* Centred title and description */}
            <MotionFadeIn delay={0.1} className="text-center mb-10 sm:mb-12 lg:mb-14">
              <span className="inline-block mb-3 sm:mb-4 px-3 py-1.5 sm:px-4 sm:py-2 bg-[#d8f17b]/10 border border-[#d8f17b]/30 rounded-full text-[#d8f17b] text-xs sm:text-sm font-medium uppercase tracking-wider">
                Oferta
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-[#d8f17b] px-2 pb-[0.2em] break-words leading-snug mt-3 sm:mt-4">
                {service.title}
              </h1>
              <p className="text-base sm:text-xl text-zinc-400 max-w-[80ch] mx-auto px-2 mt-4">
                {service.description}
              </p>
            </MotionFadeIn>

            {pageContent && (
              <>
                <MotionFadeIn delay={0.15} className="mb-10 sm:mb-12 lg:mb-14">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#e4e4e7] mb-4">{pageContent.problemHeading ?? 'Z jakim problemem wychodzimy?'}</h2>
                  <p className="text-zinc-400 leading-relaxed max-w-[80ch]">{pageContent.problem}</p>
                </MotionFadeIn>
                <MotionFadeIn delay={0.2} className="mb-10 sm:mb-12 lg:mb-14">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#e4e4e7] mb-4">Nasze podejście do rozwiązania</h2>
                  <div className="text-zinc-400 leading-relaxed max-w-[80ch] space-y-4">
                    {pageContent.solution.split(/\n\n+/).map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </MotionFadeIn>
              </>
            )}

            <div className={`grid gap-8 lg:gap-12 xl:gap-16 items-start ${slug === 'automatyzacja' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
              <div className={slug === 'automatyzacja' ? 'order-2 lg:order-1 space-y-6 lg:space-y-8' : 'space-y-6 lg:space-y-8'}>
                <MotionFadeIn delay={0.2}>
                  <div className="relative p-8 md:p-10 bg-transparent">
                    <h2 className="text-lg sm:text-xl font-semibold text-[#e4e4e7] mb-6">{slug === 'automatyzacja' || slug === 'branding' ? 'Co możemy zautomatyzować w Twojej firmie' : 'Co wdrażamy'}</h2>
                    <ul className="space-y-4 text-zinc-400">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm sm:text-base">
                          <Check className="w-5 h-5 text-[#d8f17b] mt-0.5 flex-shrink-0" aria-hidden />
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
                  <h2 className="text-xl sm:text-2xl font-bold text-[#e4e4e7] mb-6">Korzyści dla Twojej firmy</h2>
                  <ul className="space-y-3 text-zinc-400 max-w-[80ch]">
                    {pageContent.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm sm:text-base">
                        <Check className="w-5 h-5 text-[#d8f17b] mt-0.5 flex-shrink-0" aria-hidden />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </MotionFadeIn>
                <MotionFadeIn delay={0.3} className="mb-10 sm:mb-12 lg:mb-14">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#e4e4e7] mb-6">Jak wygląda proces współpracy</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {pageContent.process.map((item) => (
                      <div
                        key={item.step}
                        className="glass-card relative p-5 sm:p-6 rounded-xl"
                        style={{ background: 'var(--bg-graphite-card)', backdropFilter: 'blur(16px)' }}
                      >
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#d8f17b]/20 text-[#d8f17b] text-sm font-bold mb-3">
                          {item.step}
                        </span>
                        <h3 className="text-[#e4e4e7] font-semibold mb-2">{item.title}</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </MotionFadeIn>
                <MotionFadeIn delay={0.35} className="mb-10 sm:mb-12 lg:mb-14">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#e4e4e7] mb-4">Dlaczego SmartWeave?</h2>
                  <div className="text-zinc-400 leading-relaxed max-w-[80ch] space-y-4">
                    {pageContent.whySmartWeave.split(/\n\n+/).map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </MotionFadeIn>
              </>
            )}

            {/* Realizacje - full-width section, 3 columns (only on strony) */}
            {slug === 'strony' && (
              <MotionFadeIn delay={0.25} className="w-full mt-12 sm:mt-16 lg:mt-20">
                <h2 className="text-xl sm:text-2xl font-bold text-[#e4e4e7] mb-6 sm:mb-8">Realizacje na stronach internetowych</h2>
                <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                  {PORTFOLIO_ITEMS.map((item, index) => (
                    <article
                      key={index}
                      className="group relative flex flex-col rounded-2xl glass-card hover-lift overflow-hidden"
                      style={{ background: 'var(--bg-graphite-card)', backdropFilter: 'blur(16px)' }}
                    >
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col h-full"
                        title={`Zobacz realizację: ${item.title}`}
                      >
                        <div className="relative flex-1 min-h-[200px] p-3 sm:p-4">
                          <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden bg-white/5 border border-white/10 shadow-inner">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                              sizes="(max-width: 479px) 100vw, (max-width: 1023px) 50vw, 33.33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/60 via-transparent to-transparent" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[var(--bg)]/40">
                              <ExternalLink className="w-8 h-8 text-[#d8f17b]" />
                            </div>
                          </div>
                        </div>
                        <div className="relative bg-[var(--bg-2)] border-t border-white/10 px-4 sm:px-5 py-4 sm:py-5 flex flex-col">
                          <span className="text-zinc-400 text-sm font-normal mb-1">{item.category}</span>
                          <h3 className="text-xl sm:text-2xl font-bold text-[#e4e4e7] group-hover:text-[#d8f17b] transition-colors pr-10">
                            {item.title}
                          </h3>
                          <div className="absolute right-4 bottom-4 flex items-center justify-center w-9 h-9 rounded-lg border border-white/15 bg-white/5 text-[#e4e4e7] group-hover:border-[#d8f17b]/50 group-hover:text-[#d8f17b] transition-colors">
                            <ExternalLink className="w-4 h-4" aria-hidden />
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#d8f17b] group-hover:w-full transition-all duration-500" />
                      </a>
                    </article>
                  ))}
                </div>
                <div className="mt-8 sm:mt-10 text-center">
                  <Link
                    href="/realizacje"
                    className="inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm sm:text-base transition-all h-12 min-h-12 px-6 sm:px-8 cta-gradient-animated"
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
          description="Umów bezpłatną konsultację - opowiemy o szczegółach i dopasujemy rozwiązanie"
        />

        <div className="gradient-philosophy-to-footer">
          <Footer />
        </div>
      </main>
      <ScrollToTop />
    </>
  );
}
