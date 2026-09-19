import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { ScrollToTop } from '@/app/components/ScrollToTop';
import { getServiceBySlug, SERVICE_SLUGS } from '@/lib/services';
import type { ServiceSlug } from '@/lib/services';
import { SERVICE_PAGE_CONTENT } from '@/lib/service-page-content';
import { USLUGI_PAGE_CONTENT } from '@/lib/uslugi-page-content';
import { SITE_URL } from '@/lib/site';
import { SECTION_CLASS, CONTAINER_CLASS } from '@/lib/layout';
import { QuickAutomationCta } from '@/app/components/QuickAutomationCta';
import { ServiceUslugaPage, type RealizacjeConfig } from '@/app/components/ServiceUslugaPage';
import { BrandingAiBridgeSection } from '@/app/components/BrandingAiBridgeSection';

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
  chatboty:
    'Chatboty dla firm: FAQ, leady 24/7, integracja z CRM, baza wiedzy i scenariusze. Wdrożenia pod Twoją markę — SmartWeave.',
};

const SLUG_KEYWORDS: Partial<Record<string, string[]>> = {
  automatyzacja: [
    'automatyzacja procesów',
    'automatyzacja procesów biznesowych',
    'automatyzacja procesów dla firm',
    'automatyzacja AI',
  ],
  'agenci-ai': ['agenci AI', 'agenci AI dla firm', 'automatyzacja z AI', 'AI dla firm'],
  chatboty: ['chatbot dla firm', 'chatbot na stronie', 'chatbot B2B', 'asystent AI na stronie'],
};

function realizacjeForSlug(slug: ServiceSlug): RealizacjeConfig {
  if (slug === 'strony') {
    return { mode: 'portfolio', title: 'Realizacje na stronach internetowych' };
  }
  if (slug === 'aplikacje-webowe') {
    return {
      mode: 'link',
      title: 'Realizacje',
      description: 'Przykłady projektów w tej kategorii znajdziesz na dedykowanej podstronie realizacji.',
      href: '/realizacje/aplikacje-webowe',
      linkLabel: 'Realizacje - aplikacje webowe',
    };
  }
  if (slug === 'chatboty') {
    return {
      mode: 'link',
      title: 'Realizacje',
      description: 'Przykłady wdrożeń chatbotów i asystentów znajdziesz na dedykowanej podstronie realizacji.',
      href: '/realizacje/chatboty',
      linkLabel: 'Realizacje - chatboty',
    };
  }
  return { mode: 'none' };
}

function showHybridCrossLinks(slug: ServiceSlug): boolean {
  return (
    slug === 'strony' ||
    slug === 'aplikacje-webowe' ||
    slug === 'chatboty' ||
    slug === 'automatyzacja' ||
    slug === 'agenci-ai'
  );
}

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
  if (!pageContent) notFound();

  const slugTyped = slug as ServiceSlug;

  return (
    <>
      <Header />
      <main id="main-content" role="main" className="subpage-main">
        <section className={SECTION_CLASS}>
          <div className="absolute inset-0 bg-[var(--bg)]" />

          <div className={CONTAINER_CLASS}>
            <ServiceUslugaPage
              slug={slugTyped}
              title={service.title}
              description={service.description}
              problemHeading={
                pageContent.problemHeading ?? 'Z jakimi problemami mierzą się nasi Partnerzy Biznesowi?'
              }
              problems={USLUGI_PAGE_CONTENT[slugTyped].problems}
              solution={pageContent.solution}
              features={service.features}
              benefits={pageContent.benefits}
              process={pageContent.process}
              realizacje={realizacjeForSlug(slugTyped)}
              beforeCrossLinks={slugTyped === 'branding' ? <BrandingAiBridgeSection /> : undefined}
              showHybridCrossLinks={showHybridCrossLinks(slugTyped)}
            />
          </div>
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
