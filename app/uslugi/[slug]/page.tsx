import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { ScrollToTop } from '@/app/components/ScrollToTop';
import { MotionFadeIn } from '@/app/components/MotionFadeIn';
import { SERVICES, getServiceBySlug, SERVICE_SLUGS } from '@/lib/services';
import type { ServiceSlug } from '@/lib/services';
import { SERVICE_PAGE_CONTENT } from '@/lib/service-page-content';
import { USLUGI_PAGE_CONTENT } from '@/lib/uslugi-page-content';
import { SITE_URL } from '@/lib/site';
import { SECTION_CLASS, CONTAINER_CLASS } from '@/lib/layout';
import { ArrowLeft } from 'lucide-react';
import { AutomationWorkflowSection } from '@/app/components/AutomationWorkflowSection';
import { AiAnimationSection } from '@/app/components/AiAnimationSection';
import { ServiceProblemCards } from '@/app/components/ServiceProblemCards';
import { ServiceSolutionBlock } from '@/app/components/ServiceSolutionBlock';
import { ServiceFeaturesList } from '@/app/components/ServiceFeaturesList';
import { ServiceBenefitsList } from '@/app/components/ServiceBenefitsList';
import { ServiceProcessSteps } from '@/app/components/ServiceProcessSteps';
import { ServiceRealizacjeGrid } from '@/app/components/ServiceRealizacjeGrid';
import { PORTFOLIO_ITEMS } from '@/lib/portfolio';
import { BrandMarkIcon } from '@/app/components/BrandMarkIcon';
import { BrandingAiBridgeSection } from '@/app/components/BrandingAiBridgeSection';
import { HybridServiceCrossLinks } from '@/app/components/HybridServiceCrossLinks';
import { QuickAutomationCta } from '@/app/components/QuickAutomationCta';

/** Page/SEO titles - aligned with search phrases (projektowanie stron www dla firm, automatyzacja procesów AI, strony pod leada B2B) */
const SLUG_TITLES: Record<string, string> = {
  strony: 'Projektowanie stron www dla firm',
  branding: 'Identyfikacja wizualna i branding',
  automatyzacja: 'Automatyzacja procesów biznesowych z wykorzystaniem AI',
  'agenci-ai': 'Agenci AI',
  chatboty: 'Chatboty na stronie i w kanałach komunikacji',
  'aplikacje-webowe': 'Aplikacje webowe',
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
  const ctaTopic =
    slug === 'strony'
      ? 'strony'
      : slug === 'branding'
        ? 'branding'
        : slug === 'automatyzacja'
          ? 'automatyzacja'
          : slug === 'agenci-ai'
            ? 'agenci-ai'
            : slug === 'chatboty'
              ? 'chatboty'
              : slug === 'aplikacje-webowe'
                ? 'aplikacje-webowe'
                : 'default';
  const ctaDescription = `Opowiedz nam krótko o Twoich potrzebach w obszarze: ${service.title}. W 30 minut wskażemy najlepszy pierwszy krok i dopasujemy wdrożenie.`;

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
              <span className="inline-flex items-center justify-center gap-2 mb-3 sm:mb-4 text-[#d8f17b] text-xs sm:text-sm font-medium uppercase tracking-wider">
                <BrandMarkIcon />
                Oferta
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-[#d8f17b] px-2 pb-[0.2em] break-words leading-snug mt-3 sm:mt-4">
                {service.title}
              </h1>
              <p className="text-base sm:text-xl text-zinc-400 max-w-[80ch] mx-auto px-2 mt-4">
                {service.description}
              </p>
            </MotionFadeIn>

            {/* Problem cards grid – home-style 2x3 like PainPointsSection */}
            <MotionFadeIn delay={0.12}>
              <ServiceProblemCards
                problems={USLUGI_PAGE_CONTENT[slug as ServiceSlug].problems}
                slug={slug as ServiceSlug}
                heading={pageContent?.problemHeading ?? 'Z jakimi problemami mierzą się nasi Partnerzy Biznesowi?'}
              />
            </MotionFadeIn>

            {pageContent && (
              <>
                <MotionFadeIn delay={0.2} className="mb-10 sm:mb-12 lg:mb-14">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#e4e4e7] mb-4">Nasze podejście do rozwiązania</h2>
                  <ServiceSolutionBlock solution={pageContent.solution} />
                </MotionFadeIn>
              </>
            )}

            <div className={`grid gap-8 lg:gap-12 xl:gap-16 items-start ${slug === 'automatyzacja' || slug === 'agenci-ai' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
              <div className={slug === 'automatyzacja' || slug === 'agenci-ai' ? 'order-2 lg:order-1 space-y-6 lg:space-y-8' : 'space-y-6 lg:space-y-8'}>
                <MotionFadeIn delay={0.2}>
                  <div className="relative p-8 md:p-10 bg-transparent">
                    <h2 className="text-lg sm:text-xl font-semibold text-[#e4e4e7] mb-6">
                      {slug === 'automatyzacja' ? 'Co możemy zautomatyzować w Twojej firmie' : 'Co wdrażamy'}
                    </h2>
                    <ServiceFeaturesList features={service.features} />
                  </div>
                </MotionFadeIn>
              </div>

              {/* Right: workflow diagram on Automatyzacja, AI animation on Agenci AI */}
              {slug === 'automatyzacja' && (
                <MotionFadeIn delay={0.15} className="order-1 lg:order-2 w-full lg:sticky lg:top-24 hidden lg:block cursor-auto">
                  <AutomationWorkflowSection embedded />
                </MotionFadeIn>
              )}
              {slug === 'agenci-ai' && (
                <MotionFadeIn delay={0.15} className="order-1 lg:order-2 w-full lg:sticky lg:top-24 hidden lg:block cursor-auto">
                  <AiAnimationSection />
                </MotionFadeIn>
              )}
            </div>

            {pageContent && (
              <>
                <MotionFadeIn delay={0.25} className="mt-12 sm:mt-16 lg:mt-20 mb-10 sm:mb-12 lg:mb-14">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#e4e4e7] mb-6">Korzyści dla Twojej firmy</h2>
                  <ServiceBenefitsList benefits={pageContent.benefits} />
                </MotionFadeIn>
                <MotionFadeIn delay={0.3} className="mb-10 sm:mb-12 lg:mb-14">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#e4e4e7] mb-6">Jak wygląda proces współpracy</h2>
                  <ServiceProcessSteps process={pageContent.process} />
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

            {/* Realizacje - full-width section with Framer stagger (only on strony) */}
            {slug === 'strony' && (
              <MotionFadeIn delay={0.25} className="w-full mt-12 sm:mt-16 lg:mt-20">
                <h2 className="text-xl sm:text-2xl font-bold text-[#e4e4e7] mb-6 sm:mb-8">Realizacje na stronach internetowych</h2>
                <ServiceRealizacjeGrid items={PORTFOLIO_ITEMS} />
              </MotionFadeIn>
            )}

            {(slug === 'chatboty' || slug === 'aplikacje-webowe') && (
              <MotionFadeIn delay={0.32} className="w-full mt-12 sm:mt-16 lg:mt-20">
                <h2 className="text-xl sm:text-2xl font-bold text-[#e4e4e7] mb-4">Realizacje</h2>
                <p className="text-zinc-400 max-w-[80ch] mb-6">
                  Przykłady projektów w tej kategorii znajdziesz na dedykowanej podstronie realizacji.
                </p>
                <Link
                  href={`/realizacje/${slug}`}
                  className="inline-flex items-center gap-2 text-[#d8f17b] font-semibold hover:underline min-h-[44px]"
                >
                  {slug === 'chatboty' ? 'Realizacje - chatboty' : 'Realizacje - aplikacje webowe'}
                  <span aria-hidden> →</span>
                </Link>
              </MotionFadeIn>
            )}

            {slug === 'branding' && (
              <MotionFadeIn delay={0.34}>
                <BrandingAiBridgeSection />
              </MotionFadeIn>
            )}

            {(slug === 'strony' ||
              slug === 'automatyzacja' ||
              slug === 'agenci-ai' ||
              slug === 'chatboty' ||
              slug === 'aplikacje-webowe') && (
              <MotionFadeIn delay={0.34}>
                <HybridServiceCrossLinks slug={slug as ServiceSlug} />
              </MotionFadeIn>
            )}
          </div>
        </section>

        <QuickAutomationCta
          topic={ctaTopic}
          title="Zainteresowała Cię ta usługa?"
          description={ctaDescription}
          secondaryHref="/#contact"
          secondaryLabel="Napisz do nas"
          bullets={['więcej leadów', 'szybszy follow-up', 'mniej ręcznych kroków']}
        />

        <div className="gradient-philosophy-to-footer">
          <Footer />
        </div>
      </main>
      <ScrollToTop />
    </>
  );
}
