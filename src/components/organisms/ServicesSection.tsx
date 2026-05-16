import { Container } from "@/components/atoms/Container";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { ServiceCard } from "@/components/molecules/ServiceCard";
import { services } from "@/lib/content";

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
        <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <ScrollReveal key={service.title} delay={index * 0.04}>
              <ServiceCard service={service} index={index} />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
