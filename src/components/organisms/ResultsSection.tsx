import { Check } from "lucide-react";
import { Container } from "@/components/atoms/Container";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { ProofPoint } from "@/components/molecules/ProofPoint";
import { outcomes, proofPoints } from "@/lib/content";

export function ResultsSection() {
  return (
    <section data-testid="home-results-section" className="bg-nodo-black py-24 sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Business outcomes"
              title="The work should show up in the way the company runs."
              description="Nodo's projects are shaped around observable improvements: fewer clicks, faster handoffs, cleaner data, stronger client experiences, and better decisions."
            />
          </ScrollReveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {outcomes.map((outcome, index) => (
              <ScrollReveal key={outcome} delay={index * 0.035}>
                <div className="flex min-h-20 items-center gap-4 rounded-3xl border border-white/12 bg-white/[0.055] px-5">
                  <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-nodo-purple text-white">
                    <Check aria-hidden="true" className="size-4" />
                  </span>
                  <span className="text-base font-semibold text-white/78">{outcome}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
        <div className="mt-20 grid gap-10 md:grid-cols-3">
          {proofPoints.map((point, index) => (
            <ScrollReveal key={point.title} delay={index * 0.08}>
              <ProofPoint {...point} />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
