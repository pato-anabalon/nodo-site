import { AboutSection } from "@/components/organisms/AboutSection";
import { CTASection } from "@/components/organisms/CTASection";
import { Hero } from "@/components/organisms/Hero";
import { HomeProofSection } from "@/components/organisms/HomeProofSection";
import { ProcessSection } from "@/components/organisms/ProcessSection";
import { ResultsSection } from "@/components/organisms/ResultsSection";
import { ServicesSection } from "@/components/organisms/ServicesSection";

export function LandingPage() {
  return (
    <main data-testid="home-page-main">
      <Hero />
      <HomeProofSection />
      <ServicesSection />
      <ProcessSection />
      <ResultsSection />
      <AboutSection />
      <CTASection />
    </main>
  );
}
