"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowDown } from "lucide-react";
import { ConstellationBackground } from "@/components/atoms/ConstellationBackground";
import { Container } from "@/components/atoms/Container";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { TrackedPlanCta } from "@/components/molecules/TrackedPlanCta";
import { PlansComparison } from "@/components/organisms/PlansComparison";
import { PlansFaq } from "@/components/organisms/PlansFaq";
import { LaunchPlanCard, PlansGrid } from "@/components/organisms/PlansGrid";
import { plansPageContent } from "@/lib/content";

gsap.registerPlugin(useGSAP);

const plansHeroTitleWords = plansPageContent.hero.title.split(" ");

function contactHref(intent: "discovery-call" | "quote", source: string) {
  return `/contact?intent=${intent}&source=${source}`;
}

export function WebsitePlansPage() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(".plans-hero-title", { autoAlpha: 1 });
        gsap.set(".plans-hero-title span", { yPercent: 105 });
        gsap.set([".plans-hero-kicker", ".plans-hero-copy", ".plans-hero-cta", ".plans-hero-chip", ".plans-hero-scroll"], {
          autoAlpha: 0,
          y: 22,
        });

        const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });

        tl.to(".plans-hero-kicker", { autoAlpha: 1, y: 0, duration: 0.65 })
          .to(".plans-hero-title span", { yPercent: 0, duration: 0.9, stagger: 0.075 }, "-=0.18")
          .to(".plans-hero-copy", { autoAlpha: 1, y: 0, duration: 0.72, stagger: 0.08 }, "-=0.18")
          .to(".plans-hero-chip", { autoAlpha: 1, y: 0, duration: 0.56, stagger: 0.07 }, "-=0.25")
          .to(
            ".plans-hero-cta",
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.08,
              clearProps: "transform,visibility",
            },
            "-=0.2",
          )
          .to(".plans-hero-scroll", { autoAlpha: 1, y: 0, duration: 0.45 }, 0.9);

        const playIntro = () => {
          tl.play(0);
        };

        if (document.documentElement.dataset.nodoPreloaded === "true") {
          playIntro();
        } else {
          window.addEventListener("nodo:preloader-complete", playIntro, { once: true });
        }

        return () => {
          window.removeEventListener("nodo:preloader-complete", playIntro);
        };
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([".plans-hero-kicker", ".plans-hero-title", ".plans-hero-title span", ".plans-hero-copy", ".plans-hero-cta", ".plans-hero-chip", ".plans-hero-scroll"], {
          autoAlpha: 1,
          y: 0,
          yPercent: 0,
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <main
      ref={root}
      data-testid="plans-page-main"
      className="overflow-hidden bg-nodo-black"
    >
      <section
        data-testid="plans-page-hero-section"
        className="relative flex min-h-screen overflow-hidden bg-nodo-black pt-28"
      >
        <ConstellationBackground
          className="opacity-42"
          density={0.7}
          fps={36}
          interactive
          maxDevicePixelRatio={1.5}
          maxNodes={56}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(124,58,237,0.18),transparent_28%),radial-gradient(circle_at_76%_24%,rgba(232,48,207,0.08),transparent_24%)]" />
        <Container className="relative z-10 flex items-center pb-16 pt-12">
          <div className="max-w-6xl" data-testid="website-plans-hero-content">
            <p
              data-testid="website-plans-hero-eyebrow"
              className="plans-hero-kicker opacity-0 motion-reduce:opacity-100 mb-5 text-sm font-black uppercase tracking-[0.24em] text-nodo-lavender"
            >
              {plansPageContent.hero.eyebrow}
            </p>
            <h1
              data-testid="website-plans-hero-title"
              className="plans-hero-title opacity-0 motion-reduce:opacity-100 max-w-6xl text-balance text-5xl font-black leading-[0.9] tracking-normal text-white sm:text-7xl lg:text-8xl"
            >
              {plansHeroTitleWords.map((word, index) => (
                <span
                  key={`${word}-${index}`}
                  className="mb-[-0.12em] inline-block overflow-hidden pb-[0.12em] align-top"
                >
                  <span className="inline-block pr-[0.22em]">{word}</span>
                </span>
              ))}
            </h1>
            {plansPageContent.hero.subtitle ? (
              <p
                data-testid="website-plans-hero-subtitle"
                className="plans-hero-copy opacity-0 motion-reduce:opacity-100 mt-7 max-w-3xl text-pretty text-xl font-semibold leading-8 text-white/76 sm:text-2xl"
              >
                {plansPageContent.hero.subtitle}
              </p>
            ) : null}
            <p
              data-testid="website-plans-hero-copy"
              className="plans-hero-copy opacity-0 motion-reduce:opacity-100 mt-5 max-w-2xl text-pretty text-lg leading-8 text-white/58"
            >
              {plansPageContent.hero.copy}
            </p>
            <div data-testid="website-plans-hero-highlights" className="mt-8 flex flex-wrap gap-3">
              {plansPageContent.hero.highlights.map((highlight) => (
                <span
                  key={highlight}
                  data-testid={`website-plans-hero-highlight-${highlight.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`}
                  className="plans-hero-chip opacity-0 motion-reduce:opacity-100 rounded-full border border-white/12 bg-white/[0.055] px-4 py-2 text-sm font-semibold text-white/72"
                >
                  {highlight}
                </span>
              ))}
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <TrackedPlanCta
                href={contactHref("discovery-call", "plans-hero")}
                plan="not-selected"
                intent="discovery-call"
                location="plans_hero_primary"
                dataTestId="plans-hero-primary-button"
                className="plans-hero-cta opacity-0 motion-reduce:opacity-100"
              >
                Book a discovery call
              </TrackedPlanCta>
              <TrackedPlanCta
                href={contactHref("quote", "plans-hero")}
                plan="not-selected"
                intent="quote"
                location="plans_hero_secondary"
                dataTestId="plans-hero-secondary-button"
                variant="secondary"
                className="plans-hero-cta opacity-0 motion-reduce:opacity-100"
              >
                Request a quote
              </TrackedPlanCta>
            </div>
          </div>
        </Container>
        <a
          href="#plans"
          className="plans-hero-scroll opacity-0 motion-reduce:opacity-100 absolute bottom-5 right-5 z-10 inline-flex size-11 items-center justify-center rounded-full border border-white/18 bg-white/8 text-white transition hover:border-nodo-lavender/70 hover:bg-white/14"
          aria-label="Scroll to plans"
        >
          <ArrowDown aria-hidden="true" className="size-4" />
        </a>
      </section>

      <section
        data-testid="plans-page-positioning-section"
        className="border-y border-black/8 bg-white py-18 text-nodo-black sm:py-24"
      >
        <Container>
          <ScrollReveal>
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.24em] text-nodo-purple">
                  {plansPageContent.positioning.eyebrow}
                </p>
                <h2 className="mt-5 text-balance text-4xl font-black leading-[0.95] text-nodo-black sm:text-6xl">
                  {plansPageContent.positioning.title}
                </h2>
                <p className="mt-6 max-w-3xl text-pretty text-lg leading-8 text-nodo-ink/68">
                  {plansPageContent.positioning.copy}
                </p>
              </div>
              <div className="relative overflow-hidden rounded-[2rem] border border-black/8 bg-[linear-gradient(145deg,#f8f5ff_0%,#ffffff_48%,#f7f2ff_100%)] p-6 sm:p-8">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_20%,rgba(124,58,237,0.12),transparent_26%),radial-gradient(circle_at_78%_76%,rgba(232,48,207,0.1),transparent_24%)]" />
                <div className="relative aspect-square w-full overflow-hidden rounded-[1.6rem] border border-black/8 bg-white/72 shadow-[0_24px_90px_rgba(22,19,25,0.08)]">
                  <video
                    className="h-full w-full object-cover"
                    src="/videos/client-planning-optimized.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    data-testid="plans-page-positioning-video"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(5,5,5,0.18))]" />
                  <div className="absolute bottom-5 left-5 right-5 rounded-[1.35rem] border border-white/30 bg-white/78 px-4 py-4 backdrop-blur-md">
                    <p className="text-[0.65rem] font-black uppercase tracking-[0.18em] text-nodo-purple">
                      Partnership model
                    </p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-nodo-ink/78">
                      A long-term digital partner gives you more than launch
                      delivery. It gives you momentum, support, and room to keep
                      improving after go-live.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <section
        id="plans"
        data-testid="plans-page-grid-section"
        className="py-20 sm:py-28"
      >
        <Container>
          <ScrollReveal>
            <SectionHeading
              eyebrow="Growth partnerships"
              title="Choose the level of ongoing support your business needs."
              description="Digital Growth Partnerships are the main way Nodo helps growing businesses keep improving after launch."
            />
          </ScrollReveal>
          <div className="mt-12">
            <PlansGrid />
          </div>
        </Container>
      </section>

      <section
        data-testid="plans-page-launch-alternative-section"
        className="border-y border-black/8 bg-white py-16 text-nodo-black sm:py-20"
      >
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:items-center">
            <ScrollReveal>
              <SectionHeading
                eyebrow={plansPageContent.launchAlternative.eyebrow}
                title={plansPageContent.launchAlternative.title}
                description={plansPageContent.launchAlternative.copy}
                className="[&_h2]:text-nodo-black [&_p]:text-nodo-ink/68"
              />
            </ScrollReveal>
            <ScrollReveal delay={0.12}>
              <LaunchPlanCard />
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <section
        data-testid="plans-page-comparison-section"
        className="py-20 sm:py-28"
      >
        <Container>
          <ScrollReveal>
            <SectionHeading
              eyebrow="Compare"
              title="See what keeps moving after launch."
              description="The main difference is not just the website. It is the ongoing support, visibility work, and conversion improvements around it."
              className="max-w-4xl"
            />
          </ScrollReveal>
          <div className="mt-12">
            <PlansComparison />
          </div>
        </Container>
      </section>

      <section
        data-testid="plans-page-purchase-option-section"
        className="py-20 sm:py-28"
      >
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <ScrollReveal>
              <SectionHeading
                eyebrow={plansPageContent.purchaseOption.eyebrow}
                title={plansPageContent.purchaseOption.title}
                description={plansPageContent.purchaseOption.copy}
              >
                <p className="mt-6 rounded-3xl border border-white/12 bg-white/[0.045] p-5 text-pretty text-base leading-7 text-white/64">
                  {plansPageContent.purchaseOption.note}
                </p>
              </SectionHeading>
            </ScrollReveal>
            <ScrollReveal delay={0.12}>
              <PlansFaq />
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <section
        data-testid="plans-page-final-cta-section"
        className="bg-nodo-purple py-20 text-white sm:py-28"
      >
        <Container>
          <ScrollReveal>
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="mb-5 text-sm font-black uppercase tracking-[0.24em] text-white/70">
                  {plansPageContent.finalCta.eyebrow}
                </p>
                <h2 className="max-w-4xl text-balance text-4xl font-black leading-[0.95] tracking-normal sm:text-6xl">
                  {plansPageContent.finalCta.title}
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-white/72">
                  {plansPageContent.finalCta.copy}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <TrackedPlanCta
                  href={contactHref("quote", "plans-final")}
                  plan="not-selected"
                  intent="quote"
                  location="plans_final_primary"
                  dataTestId="plans-final-primary-button"
                  variant="inverted"
                >
                  Request a quote
                </TrackedPlanCta>
                <TrackedPlanCta
                  href={contactHref("discovery-call", "plans-final")}
                  plan="not-selected"
                  intent="discovery-call"
                  location="plans_final_secondary"
                  dataTestId="plans-final-secondary-button"
                  variant="secondary"
                >
                  Book a discovery call
                </TrackedPlanCta>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </main>
  );
}
