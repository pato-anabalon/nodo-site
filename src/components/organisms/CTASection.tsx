import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";

export function CTASection() {
  return (
    <section data-testid="home-cta-section" className="bg-nodo-purple py-20 text-white sm:py-28">
      <Container>
        <ScrollReveal>
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="mb-5 text-sm font-black uppercase tracking-[0.24em] text-white/70">
                Ready when you are
              </p>
              <h2 className="max-w-4xl text-balance text-4xl font-black leading-[0.95] tracking-normal sm:text-6xl">
                Build a system that scales with the business.
              </h2>
            </div>
            <Button href="/contact" variant="inverted" dataTestId="home-cta-primary-button">
              Start the conversation
            </Button>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
