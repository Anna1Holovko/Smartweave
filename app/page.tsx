import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { StrategicCapabilitiesSection } from './components/StrategicCapabilitiesSection';
import { MethodologySection } from './components/MethodologySection';
import { DifferentiatorsSection } from './components/DifferentiatorsSection';
import { CaseStudySection } from './components/CaseStudySection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content" role="main">
        <HeroSection />
        <StrategicCapabilitiesSection />
        <MethodologySection />
        <DifferentiatorsSection />
        <CaseStudySection />
        <div className="gradient-philosophy-to-footer">
          <CTASection />
          <Footer />
        </div>
      </main>
      <ScrollToTop />
    </>
  );
}
