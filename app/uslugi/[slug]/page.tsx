import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { ScrollToTop } from '@/app/components/ScrollToTop';
import { MotionFadeIn } from '@/app/components/MotionFadeIn';
import { getServiceBySlug, SERVICE_SLUGS } from '@/lib/services';
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
import { CollaborationProcessSection } from '@/app/components/CollaborationProcessSection';
import { BrandMarkIcon } from '@/app/components/BrandMarkIcon';
import { BrandingAiBridgeSection } from '@/app/components/BrandingAiBridgeSection';
import { HybridServiceCrossLinks } from '@/app/components/HybridServiceCrossLinks';
import { QuickAutomationCta } from '@/app/components/QuickAutomationCta';
import { StronyUslugaPage } from '@/app/components/StronyUslugaPage';

/** Page/SEO titles - aligned with search phrases (projektowanie stron www dla firm, automatyzacja procesów AI, strony pod leada B2B) */
const SLUG_TITLES: Record<string, string> = {
  strony: 'Projektowanie stron www dla firm',
  branding: 'Identyfikacja wizualna i branding',
  automatyzacja: 'Automatyzacja procesów biznesowych',
  'agenci-ai': 'Agenci AI',
  chatboty: 'Chatboty na stronie i w kanałach komunikacji',
  'aplikacje-webowe': 'Aplikacje webowe',
};

/** Richer meta descriptions for high-intent queries (GSC: automatyzacja procesów, agenci AI). */
const SLUG_META_DESCRIPTION: Partial<Record<string, string>> = {
  automatyzacja:
    'Automatyzacja procesów biznesowych: workflowy, integracje Make i n8n, CRM, mniej ręcznej pracy. SmartWeave wdraża automatyzację z AI dla firm.',
  'agenci-ai':
    'Agenci AI dla firm: pierwsza odpowiedź, kwalifikacja leadów, dokumenty w CRM. Wdrożenia pod Twój proces — SmartWeave.',
};

const SLUG_KEYWORDS: Partial<Record<string, string[]>> = {
  automatyzacja: [
    'automatyzacja procesów',
    'automatyzacja procesów biznesowych',
    'automatyzacja procesów dla firm',
    'automatyzacja AI',
  ],
  'agenci-ai': ['agenci AI', 'agenci AI dla firm', 'automatyzacja z AI', 'AI dla firm'],
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
  const metaDesc =
    SLUG_META_DESCRIPTION[slug] ??
    service.description
      .replace(/\.$/, '')
      .trim()
      .slice(0, 158);
  const kw = SLUG_KEYWORDS[slug];
  return {
    title: `${shortTitle} - usługi`,
    description: metaDesc,
    ...(kw ? { keywords: kw } : {}),
    openGraph: {
      title: `${shortTitle} - usługi`,
      description: metaDesc,
      url: `${SITE_URL}/uslugi/${slug}`,
    },
    alternates: { canonical: `${SITE_URL}/uslugi/${slug}` },
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

            {slug === 'strony' && pageContent ? (
              <div className={CONTAINER_CLASS}>
                <StronyUslugaPage
                  title={service.title}
                  description={service.description}
                  problemHeading={
                    pageContent.problemHeading ?? 'Z jakimi problemami mierzą się nasi Partnerzy Biznesowi?'
                  }
                  problems={USLUGI_PAGE_CONTENT.strony.problems}
                  solution={pageContent.solution}
                  features={service.features}
                  benefits={pageContent.benefits}
                  process={pageContent.process}
                />
              </div>
            ) : (
              <>
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

                <MotionFadeIn delay={0.1} className="text-center mb-10 sm:mb-12 lg:mb-14">
                  <span className="inline-flex items-center justify-center gap-2 mb-3 sm:mb-4 text-[#d8f17b] text-xs sm:text-sm font-medium uppercase tracking-wider">
                    <BrandMarkIcon />
                    Oferta
                  </span>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-[#d8f17b] px-2 pb-[0.2em] break-words leading-snug mt-3 sm:mt-4">
                    {service.title}
                  </h1>
                  <p className="text-base sm:text-xl text-zinc-400 max-w-[80ch]">
                    {service.description}
                  </p>
                </MotionFadeIn>

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

                <div
                  className={`grid gap-8 lg:gap-12 xl:gap-16 items-start ${slug === 'automatyzacja' || slug === 'agenci-ai' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}
                >
                  <div
                    className={
                      slug === 'automatyzacja' || slug === 'agenci-ai'
                        ? 'order-2 lg:order-1 space-y-6 lg:space-y-8'
                        : 'space-y-6 lg:space-y-8'
                    }
                  >
                    <MotionFadeIn delay={0.2}>
                      <div className="relative p-8 md:p-10 bg-transparent">
                        <h2 className="text-lg sm:text-xl font-semibold text-[#e4e4e7] mb-6">
                          {slug === 'automatyzacja' ? 'Co możemy zautomatyzować w Twojej firmie' : 'Co wdrażamy'}
                        </h2>
                        <ServiceFeaturesList features={service.features} />
                      </div>
                    </MotionFadeIn>
                  </div>

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
                  <MotionFadeIn delay={0.25} className="mt-12 sm:mt-16 lg:mt-20 mb-10 sm:mb-12 lg:mb-14">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#e4e4e7] mb-6">Korzyści dla Twojej firmy</h2>
                    <ServiceBenefitsList benefits={pageContent.benefits} />
                  </MotionFadeIn>
                )}
                </div>
                {pageContent && <CollaborationProcessSection process={pageContent.process} />}
                <div className={CONTAINER_CLASS}>
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

                {(slug === 'automatyzacja' ||
                  slug === 'agenci-ai' ||
                  slug === 'chatboty' ||
                  slug === 'aplikacje-webowe') && (
                  <MotionFadeIn delay={0.34}>
                    <HybridServiceCrossLinks slug={slug as ServiceSlug} />
                  </MotionFadeIn>
                )}
                </div>
              </>
            )}
        </section>

        <QuickAutomationCta />

        <div className="gradient-philosophy-to-footer">
          <Footer />
        </div>
      </main>
      <ScrollToTop />
    </>
  );
}
