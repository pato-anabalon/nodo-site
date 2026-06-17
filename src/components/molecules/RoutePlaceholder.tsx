import { Container } from "@/components/atoms/Container";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { TrackedCtaButton } from "@/components/molecules/TrackedCtaButton";

type RoutePlaceholderProps = {
  pageKey: string;
  eyebrow: string;
  title: string;
  description: string;
  headingLevel?: "h1" | "h2";
};

export function RoutePlaceholder({ pageKey, eyebrow, title, description, headingLevel = "h2" }: RoutePlaceholderProps) {
  return (
    <main data-testid={`${pageKey}-page-main`} className="min-h-screen bg-nodo-black pt-36">
      <Container>
        <section
          data-testid={`${pageKey}-page-hero-section`}
          className="grid min-h-[62vh] items-center gap-10 border-b border-white/12 pb-16 lg:grid-cols-[1fr_0.7fr]"
        >
          <SectionHeading eyebrow={eyebrow} title={title} description={description} headingLevel={headingLevel}>
            <div className="mt-8 flex flex-wrap gap-3">
              <TrackedCtaButton
                href="/contact"
                label="Let's talk"
                location={`${pageKey}_placeholder`}
                route={`/${pageKey}`}
                dataTestId={`${pageKey}-hero-primary-button`}
              >
                Let’s talk
              </TrackedCtaButton>
              <TrackedCtaButton
                href="/"
                label="Back to home"
                location={`${pageKey}_placeholder`}
                route={`/${pageKey}`}
                variant="secondary"
                dataTestId={`${pageKey}-hero-secondary-button`}
              >
                Back to home
              </TrackedCtaButton>
            </div>
          </SectionHeading>
          <div className="relative min-h-72 overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.04] p-6">
            <div className="absolute inset-x-6 top-6 h-px bg-white/18" />
            <div className="absolute bottom-8 left-8 right-8 grid grid-cols-3 gap-3">
              <span className="h-24 rounded-2xl bg-nodo-purple" />
              <span className="h-24 rounded-2xl bg-white" />
              <span className="h-24 rounded-2xl bg-nodo-lavender" />
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}
