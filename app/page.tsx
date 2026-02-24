import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { PainPointsSection } from './components/PainPointsSection';
import { ServicesSection } from './components/ServicesSection';
import { ToolsSection } from './components/ToolsSection';
import { AutomationDetails } from './components/AutomationDetails';
import { PortfolioSection } from './components/PortfolioSection';
import { BlogSection } from './components/BlogSection';
import { PhilosophySection } from './components/PhilosophySection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

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
        <div className="gradient-philosophy-to-footer">
          <PhilosophySection />
          <CTASection />
          <Footer />
        </div>
      <ScrollToTop />
    </>
  );
}
