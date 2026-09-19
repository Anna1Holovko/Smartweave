import type { Metadata } from 'next';
import { Header } from './_components/Header';
import { HeroSection } from './_components/HeroSection';
import { PainPointsSection } from './_components/PainPointsSection';
import { ServicesSection } from './_components/ServicesSection';
import { ToolsSection } from './_components/ToolsSection';
import { AutomationDetails } from './_components/AutomationDetails';
import { PortfolioSection } from './_components/PortfolioSection';
import { PhilosophySection } from './_components/PhilosophySection';
import { CTASection } from './_components/CTASection';
import { Footer } from './_components/Footer';
import { ScrollToTop } from './_components/ScrollToTop';

export const metadata: Metadata = {
  title: 'SmartWeave — archiwalna wersja',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function SmartWeaveV1Page() {
  return (
    <div className="bg-slate-950 text-white antialiased">
      <Header />
      <HeroSection />
      <PainPointsSection />
      <ServicesSection />
      <ToolsSection />
      <AutomationDetails />
      <PortfolioSection />
      <PhilosophySection />
      <CTASection />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
