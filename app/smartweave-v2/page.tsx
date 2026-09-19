import type { Metadata } from 'next';
import { Header } from './_components/Header';
import { HeroSection } from './_components/HeroSection';
import { PainPointsSection } from './_components/PainPointsSection';
import { ServicesSection } from './_components/ServicesSection';
import { ToolsSection } from './_components/ToolsSection';
import { AutomationDetails } from './_components/AutomationDetails';
import { PortfolioSection } from './_components/PortfolioSection';
import { BlogSection } from './_components/BlogSection';
import { CTASection } from './_components/CTASection';
import { Footer } from './_components/Footer';
import { ScrollToTop } from './_components/ScrollToTop';

export const metadata: Metadata = {
  title: 'SmartWeave — archiwalna wersja v2',
  robots: { index: false, follow: false },
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content" role="main">
        <HeroSection />
        <PainPointsSection />
        <ServicesSection />
        <ToolsSection />
        <AutomationDetails />
        <PortfolioSection />
        <BlogSection />
        <div className="v2-gradient-philosophy-to-footer">
          <CTASection />
          <Footer />
        </div>
      </main>
      <ScrollToTop />
    </>
  );
}
