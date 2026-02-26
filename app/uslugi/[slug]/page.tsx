import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { ScrollToTop } from '@/app/components/ScrollToTop';
import { MotionFadeIn } from '@/app/components/MotionFadeIn';
import { Button } from '@/app/components/ui/Button';
import { SERVICES, getServiceBySlug, SERVICE_SLUGS } from '@/lib/services';
import { SITE_URL, CALENDLY_URL } from '@/lib/site';
import { SECTION_CLASS, CONTAINER_CLASS } from '@/lib/layout';
import { ArrowLeft, Globe, Workflow, Palette, Check, Bot } from 'lucide-react';

const SERVICE_ICONS = [Globe, Palette, Workflow, Bot] as const;

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
    title: `${shortTitle} – usługi | SmartWeave`,
    description: service.description,
    openGraph: {
      title: `${shortTitle} | SmartWeave`,
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

  const index = SERVICES.findIndex((s) => s.slug === slug);
  const Icon = index >= 0 ? SERVICE_ICONS[index] : Globe;

  return (
    <>
      <Header />
      <main id="main-content" role="main" className="min-h-screen">
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
            <MotionFadeIn delay={0.1} className="mb-12 sm:mb-20">
              <span className="inline-block mb-3 sm:mb-4 px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-300 text-xs sm:text-sm font-medium uppercase tracking-wider">
                Oferta
              </span>
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${service.gradient} p-0.5`}>
                  <div className="w-full h-full bg-slate-950 rounded-xl flex items-center justify-center">
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white px-0">
                  {service.title}
                </h1>
              </div>
              <p className="text-base sm:text-xl text-slate-400 max-w-[80ch]">
                {service.description}
              </p>
            </MotionFadeIn>

            <div className="max-w-3xl">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Zakres usługi</h2>
              <ul className="space-y-3 text-slate-400">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm sm:text-base">
                    <Check className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" aria-hidden />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12 sm:mt-16 lg:mt-20 relative overflow-hidden rounded-2xl p-8 md:p-12 text-center border border-slate-700/50 bg-slate-900/40 backdrop-blur-xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Zainteresowała Cię ta usługa?</h2>
              <p className="text-base sm:text-xl text-slate-400 mb-8 max-w-[80ch] mx-auto px-2">
                Umów bezpłatną konsultację — opowiemy o szczegółach i dopasujemy rozwiązanie do Twoich potrzeb.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/#contact">
                  <Button variant="primary">Napisz do nas</Button>
                </Link>
                {CALENDLY_URL && (
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm sm:text-base transition-all h-12 min-h-12 px-6 sm:px-8 bg-transparent border-2 border-slate-700 text-white hover:border-purple-500/50 hover:bg-slate-800/30"
                  >
                    Umów spotkanie
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
