import { Container } from "@/components/atoms/Container";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { ServiceCard } from "@/components/molecules/ServiceCard";
import { services } from "@/lib/content";

export function ServicesSection() {
  return (
    <section id="services" className="bg-nodo-black py-24 sm:py-32">
      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow="What Nodo builds"
            title="Systems that make growing businesses easier to run."
            description="Nodo designs and builds the operational layer between people, tools, data, and clients. The work is practical, polished, and built around business momentum."
          />
        </ScrollReveal>
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
