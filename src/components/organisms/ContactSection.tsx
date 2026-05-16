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
    <main className="relative overflow-hidden bg-nodo-black pt-36">
      <ConstellationBackground className="opacity-65" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_30%,rgba(124,58,237,0.18),transparent_32%),radial-gradient(circle_at_82%_18%,rgba(232,48,207,0.08),transparent_26%)]" />
      <Container className="relative z-10">
        <section className="grid min-h-[76vh] gap-12 border-b border-white/12 pb-20 lg:grid-cols-[0.8fr_1fr]">
          <div>
            <SectionHeading
              eyebrow="Contact"
              title="Tell Nodo what needs to move faster."
              description="Share the workflow, system, platform, or business problem you want to improve. The first step is clarity."
            />
            <div className="mt-10 grid gap-4 text-sm text-white/62">
              <p>
                <span className="font-semibold text-white">Location:</span> Auckland, New Zealand
              </p>
              <p>
                <span className="font-semibold text-white">Focus:</span> Digital systems,
                automation, web platforms, and AI-enabled operations.
              </p>
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/12 bg-nodo-black/70 p-5 shadow-[0_24px_90px_rgba(0,0,0,0.42)] backdrop-blur-xl sm:p-8">
            <ContactForm selectedPlanSlug={selectedPlanSlug} intent={intent} source={source} />
          </div>
        </section>
      </Container>
    </main>
  );
}
