import { Container } from '@/components/atoms/Container';
import { ScrollReveal } from '@/components/atoms/ScrollReveal';
import { SectionHeading } from '@/components/atoms/SectionHeading';
import { LoopingVideo } from '@/components/molecules/LoopingVideo';

export function AboutSection() {
  return (
    <section data-testid="home-about-section" className="bg-white py-24 text-nodo-black sm:py-32">
      <Container>
        <div data-testid="home-about-layout" className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Based in Auckland"
              title="An Auckland partner for growing businesses."
              description="Nodo works with growing companies that need sharper positioning, more consistent marketing, and a website that supports real commercial growth."
              surfaceTone="light"
            />
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <div
              data-testid="home-about-video-card"
              className="relative overflow-hidden rounded-[2rem] bg-nodo-black p-6"
            >
              <LoopingVideo
                className="h-auto w-full rounded-[1.5rem] bg-white object-cover"
                src="/videos/team-discussion-optimized.mp4"
                label="A team discussing a project around a table"
                dataTestId="home-about-video"
              />
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
