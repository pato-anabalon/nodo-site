import { Container } from '@/components/atoms/Container';
import { ScrollReveal } from '@/components/atoms/ScrollReveal';
import { SectionHeading } from '@/components/atoms/SectionHeading';
import { TrackedCtaButton } from '@/components/molecules/TrackedCtaButton';
import { HomeServicesCardGrid } from '@/components/organisms/HomeServicesCardGrid';

export function ServicesSection() {
  return (
    <section
      id="services"
      data-testid="home-services-section"
      className="scroll-mt-20 overflow-x-clip bg-nodo-black lg:scroll-mt-24 py-24 sm:py-32"
    >
      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow="What Nodo builds"
            title="Three services, one direction."
            description="From brand clarity to digital growth and high-performing websites, Nodo builds the layers that shape how a business is seen, trusted, and chosen."
          />
        </ScrollReveal>
        <HomeServicesCardGrid />
        <div className="mt-8">
          <TrackedCtaButton
            href="/plans"
            label="See plans and pricing"
            event="homepage"
            location="home_services"
            variant="secondary"
            dataTestId="home-services-plans-button"
          >
            See plans and pricing
          </TrackedCtaButton>
        </div>
      </Container>
    </section>
  );
}
