import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { SectionHeading } from "@/components/atoms/SectionHeading";

type RoutePlaceholderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function RoutePlaceholder({ eyebrow, title, description }: RoutePlaceholderProps) {
  return (
    <main className="min-h-screen bg-nodo-black pt-36">
      <Container>
        <section className="grid min-h-[62vh] items-end gap-10 border-b border-white/12 pb-16 lg:grid-cols-[1fr_0.7fr]">
          <SectionHeading eyebrow={eyebrow} title={title} description={description}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact">Start a project</Button>
              <Button href="/" variant="secondary">
                Back to home
              </Button>
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
