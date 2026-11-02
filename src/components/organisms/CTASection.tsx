import { Container } from '@/components/atoms/Container';
import { ScrollReveal } from '@/components/atoms/ScrollReveal';
import { TrackedCtaButton } from '@/components/molecules/TrackedCtaButton';

export function CTASection() {
  return (
    <section data-testid="home-cta-section" className="bg-nodo-purple py-20 text-white sm:py-28">
      <Container>
        <ScrollReveal>
          <div data-testid="home-cta-layout" className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p
                data-testid="home-cta-eyebrow"
                className="mb-5 text-sm font-black uppercase tracking-[0.24em] text-white/90"
              >
                Clarity. Speed. Results.
              </p>
              <h2
                data-testid="home-cta-title"
                className="max-w-4xl text-balance text-4xl font-black leading-[0.95] tracking-normal sm:text-6xl"
              >
                Let’s make your business easier to choose.
              </h2>
            </div>
            <div data-testid="home-cta-actions" className="lg:text-right">
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <TrackedCtaButton
                  href="/contact?source=home-cta"
                  label="Start the conversation"
                  event="homepage"
                  location="home_final_cta"
                  variant="inverted"
                  dataTestId="home-cta-primary-button"
                >
                  Start the conversation
                </TrackedCtaButton>
                <TrackedCtaButton
                  href="/plans"
                  label="See plans"
                  event="homepage"
                  location="home_final_cta"
                  variant="secondary"
                  surfaceTone="purple"
                  dataTestId="home-cta-plans-button"
                >
                  See plans
                </TrackedCtaButton>
              </div>
              <p data-testid="home-cta-reassurance" className="mt-4 text-sm font-semibold leading-6 text-white">
                Tell us about your business. We reply within one business day.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
