import { ArrowDownRight } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { ConstellationBackground } from "@/components/atoms/ConstellationBackground";
import { Container } from "@/components/atoms/Container";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { plansHubCards, plansHubContent } from "@/lib/content";

export function PlansHubPage() {
  return (
    <main
      data-testid="plans-page-main"
      className="overflow-hidden bg-nodo-black"
    >
      <section
        data-testid="plans-hub-hero-section"
        className="relative flex min-h-[92vh] overflow-hidden bg-nodo-black pt-28"
      >
        <ConstellationBackground
          className="opacity-42"
          density={0.62}
          fps={36}
          interactive
          maxDevicePixelRatio={1.5}
          maxNodes={54}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(124,58,237,0.2),transparent_30%),radial-gradient(circle_at_80%_28%,rgba(232,48,207,0.08),transparent_24%)]" />
        <Container className="relative z-10 grid items-center gap-12 pb-16 pt-12 lg:grid-cols-[0.95fr_0.9fr]">
          <div data-testid="plans-hub-hero-content">
            <p
              data-testid="plans-hub-hero-eyebrow"
              className="mb-5 text-sm font-black uppercase tracking-[0.24em] text-nodo-lavender"
            >
              {plansHubContent.hero.eyebrow}
            </p>
            <h1
              data-testid="plans-hub-hero-title"
              className="max-w-5xl text-balance text-5xl font-black leading-[0.9] tracking-normal text-white sm:text-7xl lg:text-8xl"
            >
              {plansHubContent.hero.title}
            </h1>
            <p
              data-testid="plans-hub-hero-copy"
              className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-white/62"
            >
              {plansHubContent.hero.copy}
            </p>
            <div
              data-testid="plans-hub-hero-highlights"
              className="mt-8 flex flex-wrap gap-3"
            >
              {plansHubContent.hero.highlights.map((highlight) => (
                <span
                  key={highlight}
                  data-testid={`plans-hub-hero-highlight-${highlight.toLowerCase()}`}
                  className="rounded-full border border-white/12 bg-white/[0.055] px-4 py-2 text-sm font-semibold text-white/72"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>

          <div className="relative" data-testid="plans-hub-hero-video-card">
            <div className="pointer-events-none absolute -inset-4 rounded-[2.5rem] bg-[radial-gradient(circle_at_30%_20%,rgba(124,58,237,0.24),transparent_34%),radial-gradient(circle_at_78%_80%,rgba(232,48,207,0.14),transparent_30%)] blur-xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.045] p-3 shadow-[0_30px_110px_rgba(0,0,0,0.32)]">
              <video
                className="aspect-[4/5] w-full rounded-[1.45rem] object-cover sm:aspect-[5/4] lg:aspect-[4/5]"
                src="/videos/plans-optimized.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                data-testid="plans-hub-hero-video"
              />
              <div className="pointer-events-none absolute inset-3 rounded-[1.45rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(5,5,5,0.24))]" />
            </div>
          </div>
        </Container>
      </section>

      <section
        data-testid="plans-hub-positioning-section"
        className="border-y border-black/8 bg-white py-18 text-nodo-black sm:py-24"
      >
        <Container>
          <ScrollReveal>
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1fr] lg:items-start">
              <SectionHeading
                eyebrow={plansHubContent.positioning.eyebrow}
                title={plansHubContent.positioning.title}
                description={plansHubContent.positioning.copy}
                className="[&_h2]:text-nodo-black [&_p]:text-nodo-ink/68"
              />
              <div className="grid gap-4" data-testid="plans-hub-card-grid">
                {plansHubCards.map((card) => {
                  const Icon = card.icon;

                  return (
                    <article
                      key={card.href}
                      data-testid={`plans-hub-card-${card.title
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/^-|-$/g, "")}`}
                      className="group rounded-[1.75rem] border border-black/8 bg-black/[0.025] p-5 shadow-[0_18px_60px_rgba(22,19,25,0.06)] transition duration-300 hover:-translate-y-1 hover:border-nodo-purple/30 hover:bg-white sm:p-6"
                    >
                      <div className="flex gap-5">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-nodo-purple/20 bg-nodo-purple/10 text-nodo-purple">
                          <Icon aria-hidden="true" className="size-5" />
                        </div>
                        <div>
                          <p className="text-xs font-black uppercase tracking-[0.18em] text-nodo-purple">
                            {card.eyebrow}
                          </p>
                          <h3 className="mt-2 text-2xl font-black text-nodo-black">
                            {card.title}
                          </h3>
                          <p className="mt-3 text-sm leading-6 text-nodo-ink/68">
                            {card.description}
                          </p>
                          <Button
                            href={card.href}
                            variant="primary"
                            surfaceTone="light"
                            dataTestId={`plans-hub-card-${card.title
                              .toLowerCase()
                              .replace(/[^a-z0-9]+/g, "-")
                              .replace(/^-|-$/g, "")}-button`}
                            className="mt-5"
                            icon={
                              <ArrowDownRight
                                aria-hidden="true"
                                className="size-4"
                              />
                            }
                          >
                            {card.ctaLabel}
                          </Button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <section
        data-testid="plans-hub-final-cta-section"
        className="bg-nodo-purple py-20 text-white sm:py-28"
      >
        <Container>
          <ScrollReveal>
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="mb-5 text-sm font-black uppercase tracking-[0.24em] text-white/70">
                  {plansHubContent.finalCta.eyebrow}
                </p>
                <h2 className="max-w-4xl text-balance text-4xl font-black leading-[0.95] tracking-normal sm:text-6xl">
                  {plansHubContent.finalCta.title}
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-white/72">
                  {plansHubContent.finalCta.copy}
                </p>
              </div>
              <Button
                href="/contact?intent=discovery-call&source=plans-hub-final"
                variant="inverted"
                dataTestId="plans-hub-final-button"
              >
                Book a discovery call
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </main>
  );
}
