import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ScrollToTop } from '../components/ScrollToTop';
import { MotionFadeIn } from '../components/MotionFadeIn';
import { getServiceBySlug } from '@/lib/services';
import type { ServiceSlug } from '@/lib/services';
import { SERVICE_PAGE_CONTENT } from '@/lib/service-page-content';
import { USLUGI_PAGE_CONTENT } from '@/lib/uslugi-page-content';
import { SITE_URL } from '@/lib/site';
import { SECTION_CLASS, CONTAINER_CLASS } from '@/lib/layout';
import { ArrowLeft } from 'lucide-react';
import { ServiceProblemCards } from '@/app/components/ServiceProblemCards';
import { ServiceSolutionBlock } from '@/app/components/ServiceSolutionBlock';
import { ServiceFeaturesList } from '@/app/components/ServiceFeaturesList';
import { ServiceBenefitsList } from '@/app/components/ServiceBenefitsList';
import { CollaborationProcessSection } from '@/app/components/CollaborationProcessSection';
import { QuickAutomationCta } from '@/app/components/QuickAutomationCta';
import { BrandMarkIcon } from '@/app/components/BrandMarkIcon';

const SLUG: ServiceSlug = 'agenci-ai';

export const metadata: Metadata = {
  title: 'Agenci AI - SmartWeave',
  description:
    'Agenci AI: programy oparte na sztucznej inteligencji – chatbot, kwalifikacja leadów, przetwarzanie dokumentów. Odzew w minutę, 24/7.',
  openGraph: {
    title: 'Agenci AI | SmartWeave',
    description: 'Budujemy agenty AI pod Twoją firmę: rozmowa z klientem, kwalifikacja leadów, baza wiedzy, integracja z CRM.',
    url: `${SITE_URL}/agenci-ai`,
  },
};

export default function AgenciAiPage() {
  const service = getServiceBySlug(SLUG);
  const pageContent = SERVICE_PAGE_CONTENT[SLUG];
  const problems = USLUGI_PAGE_CONTENT[SLUG].problems;

  if (!service || !pageContent) return null;

  return (
    <>
      <Header />
      <main id="main-content" role="main" className="subpage-main">
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
                problems={problems}
                slug={SLUG}
                heading={pageContent.problemHeading ?? 'Z jakimi problemami mierzą się nasi Partnerzy Biznesowi?'}
              />
            </MotionFadeIn>

            <MotionFadeIn delay={0.2} className="mb-10 sm:mb-12 lg:mb-14">
              <h2 className="text-xl sm:text-2xl font-bold text-[#e4e4e7] mb-4">Nasze podejście do rozwiązania</h2>
              <ServiceSolutionBlock solution={pageContent.solution} />
            </MotionFadeIn>

            <MotionFadeIn delay={0.2} className="mb-10 sm:mb-12 lg:mb-14">
              <h2 className="text-lg sm:text-xl font-semibold text-[#e4e4e7] mb-6">Co wdrażamy</h2>
              <ServiceFeaturesList features={service.features} />
            </MotionFadeIn>

            <MotionFadeIn delay={0.25} className="mt-12 sm:mt-16 lg:mt-20 mb-10 sm:mb-12 lg:mb-14">
              <h2 className="text-xl sm:text-2xl font-bold text-[#e4e4e7] mb-6">Korzyści dla Twojej firmy</h2>
              <ServiceBenefitsList benefits={pageContent.benefits} />
            </MotionFadeIn>
          </div>

          <CollaborationProcessSection process={pageContent.process} />
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
