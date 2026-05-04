import Image from "next/image";
import { Container } from "@/components/atoms/Container";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { SectionHeading } from "@/components/atoms/SectionHeading";

export function AboutSection() {
  return (
    <section className="bg-white py-24 text-nodo-black sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Based in Auckland"
              title="A technical partner for businesses that are ready to operate better."
              description="Nodo works with growing companies that have reached the point where ad hoc tools, manual processes, and disconnected systems are slowing the team down."
              className="[&_h2]:text-nodo-black [&_p]:text-nodo-ink/68"
            />
            <p className="mt-6 max-w-2xl text-lg leading-8 text-nodo-ink/68">
              The approach is direct: understand the workflow, design a better operating
              system, build it with care, and keep improving it around real usage.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <div className="relative overflow-hidden rounded-[2rem] bg-nodo-black p-6">
              <Image
                src="/brand/nodo-logo-black.png"
                alt="Nodo logo variations"
                width={1600}
                height={900}
                className="h-auto w-full rounded-[1.5rem] bg-white object-cover"
                priority={false}
              />
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
