import { ConstellationBackground } from "@/components/atoms/ConstellationBackground";
import { Container } from "@/components/atoms/Container";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { ContactForm } from "@/components/molecules/ContactForm";

type ContactSectionProps = {
  selectedPlanSlug?: string;
  intent?: string;
  source?: string;
};

export function ContactSection({ selectedPlanSlug, intent, source }: ContactSectionProps) {
  return (
    <main data-testid="contact-page-main" className="relative flex min-h-screen overflow-hidden bg-white pt-28 text-nodo-black">
      <ConstellationBackground
        backgroundTone="light"
        className="opacity-18 mix-blend-multiply"
        density={1}
        fps={34}
        interactive
        maxDevicePixelRatio={1.5}
        maxNodes={104}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(124,58,237,0.10),transparent_28%),radial-gradient(circle_at_82%_22%,rgba(232,48,207,0.06),transparent_22%)]" />
      <Container className="relative z-10 flex flex-1">
        <section
          data-testid="contact-page-form-section"
          className="grid w-full flex-1 items-center gap-12 border-b border-black/8 pb-16 pt-10 lg:grid-cols-[0.8fr_1fr]"
        >
          <div data-testid="contact-page-intro">
            <SectionHeading
              eyebrow="Contact"
              title="Tell Nodo what needs to move faster."
              description="Share the workflow, system, platform, or business problem you want to improve. The first step is clarity."
              surfaceTone="light"
            />
            <div data-testid="contact-page-details" className="mt-10 grid gap-4 text-sm text-nodo-ink/66">
              <p>
                <span className="font-semibold text-nodo-black">Location:</span> Auckland, New Zealand
              </p>
              <p>
                <span className="font-semibold text-nodo-black">Focus:</span> Digital systems,
                automation, web platforms, and AI-enabled operations.
              </p>
            </div>
          </div>
          <div data-testid="contact-page-form-card" className="rounded-[2rem] border border-black/8 bg-white/82 p-5 shadow-[0_24px_90px_rgba(22,19,25,0.10)] backdrop-blur-xl sm:p-8">
            <ContactForm selectedPlanSlug={selectedPlanSlug} intent={intent} source={source} />
          </div>
        </section>
      </Container>
    </main>
  );
}
