import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { PainPointsSection } from '../components/PainPointsSection';
import { ServicesSection } from '../components/ServicesSection';
import { ToolsSection } from '../components/ToolsSection';
import { AutomationDetails } from '../components/AutomationDetails';
import { PortfolioSection } from '../components/PortfolioSection';
import { PhilosophySection } from '../components/PhilosophySection';
import { CTASection } from '../components/CTASection';
import { Footer } from '../components/Footer';
import { ScrollToTop } from '../components/ScrollToTop';

export function HomePage() {
  return (
    <>
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
    </>
  );
}
