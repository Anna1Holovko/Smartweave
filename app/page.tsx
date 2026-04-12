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
import { getAllPosts } from '@/lib/blog-adapter';

/** ISR: refetch Notion blog data for this page (~60s). Keep in sync with lib/notion-articles NOTION_LIST_REVALIDATE_SECONDS default. */
export const revalidate = 30;

export default async function HomePage() {
  const allPosts = await getAllPosts();
  const blogFeatured = allPosts.slice(0, 3).map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    image: p.image,
  }));

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
        <BlogSection posts={blogFeatured} />
        <div className="gradient-philosophy-to-footer">
          <CTASection />
          <Footer />
        </div>
      </main>
      <ScrollToTop />
    </>
  );
}
