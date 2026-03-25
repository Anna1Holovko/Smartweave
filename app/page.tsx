import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { PainPointsSection } from './components/PainPointsSection';
import { ServicesSection } from './components/ServicesSection';
import { ToolsSection } from './components/ToolsSection';
import { AutomationDetails } from './components/AutomationDetails';
import { QuickAutomationCta } from './components/QuickAutomationCta';
import { PortfolioSection } from './components/PortfolioSection';
import { BlogSection } from './components/BlogSection';
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
        <QuickAutomationCta />
        <PortfolioSection />
        <BlogSection />
        <div className="gradient-philosophy-to-footer">
          <CTASection />
          <Footer />
        </div>
      </main>
      <ScrollToTop />
    </>
  );
}
