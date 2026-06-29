import { Container } from "@/components/atoms/Container";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { HomeServicesCardGrid } from "@/components/organisms/HomeServicesCardGrid";

export function ServicesSection() {
  return (
    <section
      id="services"
      data-testid="home-services-section"
      className="bg-nodo-black py-24 sm:py-32"
    >
      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow="What Nodo builds"
            title="Three core services built to move the business forward."
            description="From brand clarity to digital growth and high-performing websites, Nodo builds the layers that shape how a business is seen, trusted, and chosen."
          />
        </ScrollReveal>
        <HomeServicesCardGrid />
      </Container>
    </section>
  );
}
