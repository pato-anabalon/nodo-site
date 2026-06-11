import Image from "next/image";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/atoms/Container";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { TrackedCtaButton } from "@/components/molecules/TrackedCtaButton";
import { caseStudiesPageContent } from "@/lib/content";

const proofPoints = [
  "Clearer service structure",
  "Stronger local trust",
  "More visible quote paths",
];

export function HomeProofSection() {
  const { featured } = caseStudiesPageContent;
  const after = featured.comparison.after;

  return (
    <section
      data-testid="home-proof-section"
      className="overflow-hidden bg-white py-16 text-nodo-black sm:py-20"
    >
      <Container>
        <div
          data-testid="home-proof-layout"
          className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center"
        >
          <ScrollReveal>
            <div data-testid="home-proof-content" className="max-w-3xl">
              <p
                data-testid="home-proof-eyebrow"
                className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-nodo-purple"
              >
                Featured transformation
              </p>
              <h2
                data-testid="home-proof-title"
                className="text-balance text-4xl font-black leading-[0.95] tracking-normal sm:text-6xl"
              >
                From an outdated Wix site to a clearer, higher-trust trade website.
              </h2>
              <p
                data-testid="home-proof-copy"
                className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-nodo-ink/68"
              >
                PlasterPro Solution needed a website that matched the quality of their Auckland property work. Nodo
                reshaped the experience around services, trust signals, local relevance, and easier quote paths.
              </p>
              <ul data-testid="home-proof-points" className="mt-7 grid gap-3">
                {proofPoints.map((point) => (
                  <li key={point} className="flex items-center gap-3 text-sm font-semibold text-nodo-ink/72">
                    <CheckCircle2 aria-hidden="true" className="size-5 shrink-0 text-nodo-purple" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <TrackedCtaButton
                  href="/case-studies"
                  label="View the case study"
                  event="homepage"
                  location="home_proof"
                  surfaceTone="light"
                  dataTestId="home-proof-case-study-button"
                  icon={
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none"
                    />
                  }
                  className="group"
                >
                  View the case study
                </TrackedCtaButton>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div
              data-testid="home-proof-visual"
              className="relative overflow-hidden rounded-[1.75rem] border border-black/8 bg-[linear-gradient(145deg,#fbf9ff_0%,#ffffff_48%,#f5f0ff_100%)] p-3 shadow-[0_24px_80px_rgba(22,19,25,0.10)]"
            >
              <div className="flex items-center justify-between gap-3 border-b border-black/8 px-3 py-3">
                <div className="flex gap-2" aria-hidden="true">
                  <span className="size-2.5 rounded-full bg-nodo-purple/70" />
                  <span className="size-2.5 rounded-full bg-nodo-lavender" />
                  <span className="size-2.5 rounded-full bg-nodo-black/18" />
                </div>
                <span className="truncate rounded-full border border-black/8 bg-white/70 px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.16em] text-nodo-ink/50">
                  {featured.client}
                </span>
              </div>
              <div className="relative mt-3 aspect-[16/10] overflow-hidden rounded-[1.25rem] bg-white">
                <Image
                  src={after.imageSrc}
                  alt={after.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 48vw, 90vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
