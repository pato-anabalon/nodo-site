import { Container } from '@/components/atoms/Container';
import { ScrollReveal } from '@/components/atoms/ScrollReveal';
import { SectionHeading } from '@/components/atoms/SectionHeading';
import { ProofPoint } from '@/components/molecules/ProofPoint';
import { resultOutcomes } from '@/lib/content';

export function ResultsSection() {
  return (
    <section data-testid="home-results-section" className="bg-nodo-black py-24 sm:py-32">
      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow="What improves"
            title="What changes for your customers."
            description="Nodo focuses on the visible improvements that matter to Auckland service businesses: clearer positioning, stronger first impressions, better enquiries, and a digital presence that feels consistent."
            className="max-w-4xl [&>p:last-child]:max-w-2xl"
          />
        </ScrollReveal>

        <div data-testid="home-results-card-grid" className="mt-12 grid gap-4 md:grid-cols-3">
          {resultOutcomes.map((point, index) => (
            <ScrollReveal key={point.title} delay={index * 0.08}>
              <ProofPoint {...point} />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
