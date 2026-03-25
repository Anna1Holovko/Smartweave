import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { ScrollToTop } from '@/app/components/ScrollToTop';
import { PageIntro } from '@/app/components/PageIntro';
import { QuickAutomationCta } from '@/app/components/QuickAutomationCta';
import { Button } from '@/app/components/ui/Button';
import { SITE_URL } from '@/lib/site';
import { SECTION_CLASS, CONTAINER_CLASS, INTRO_MB_CLASS } from '@/lib/layout';
import { AUTOMATYZACJA_AI_CITIES } from '@/lib/automatyzacja-ai-cities';

export function generateStaticParams() {
  return AUTOMATYZACJA_AI_CITIES.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const row = AUTOMATYZACJA_AI_CITIES.find((c) => c.slug === city);
  if (!row) return { title: 'SmartWeave' };
  const title = `Automatyzacja AI dla firm ${row.name}`;
  const description = row.metaDescription;
  const url = `${SITE_URL}/automatyzacja-ai/${city}`;
  return {
    title: `${title} | SmartWeave`,
    description,
    openGraph: { title: `${title} | SmartWeave`, description, url },
    alternates: { canonical: url },
  };
}

export default async function AutomatyzacjaAiCityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const row = AUTOMATYZACJA_AI_CITIES.find((c) => c.slug === city);
  if (!row) notFound();

  return (
    <>
      <Header />
      <main id="main-content" role="main" className="min-h-screen subpage-main">
        <section className={SECTION_CLASS}>
          <div className="absolute inset-0 bg-[var(--bg)]" />

          <div className={CONTAINER_CLASS}>
            <PageIntro
              backHref="/automatyzacja-ai-dla-firm"
              backLabel="Automatyzacja AI dla firm"
              badge="Lokalnie"
              badgeVariant="accent"
              title={`Automatyzacja AI dla firm ${row.phraseLocative}`}
              description={`${row.localIntro} Działamy też zdalnie w całej Polsce.`}
              className={INTRO_MB_CLASS}
            />

            <div className="max-w-[80ch] mx-auto space-y-6 text-zinc-400 leading-relaxed">
              <p>
                Szukasz automatyzacji procesów z elementami AI? Zaczynamy od mapy procesu i dobieramy integracje oraz{' '}
                <Link href="/uslugi/agenci-ai" className="text-[#d8f17b] hover:underline">
                  agentów AI
                </Link>
                .
              </p>
              <p>
                Dbamy też o spójność komunikacji z{' '}
                <Link href="/uslugi/branding" className="text-[#d8f17b] hover:underline">
                  identyfikacją wizualną
                </Link>{' '}
                oraz{' '}
                <Link href="/uslugi/strony" className="text-[#d8f17b] hover:underline">
                  strona www
                </Link>{' '}
                .
              </p>
              <p>
                <Link href="/automatyzacja-ai-dla-firm" className="text-[#d8f17b] hover:underline font-medium">
                  ← Pełny przegląd: automatyzacja AI dla firm
                </Link>
              </p>
            </div>

            <div className="flex justify-center mt-10">
              <Link href="/#contact">
                <Button variant="primary">Bezpłatna konsultacja</Button>
              </Link>
            </div>
          </div>
        </section>

        <QuickAutomationCta topic="automatyzacja" />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
