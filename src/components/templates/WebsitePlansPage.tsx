"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowDown, BarChart3, CalendarDays, Rocket, TrendingUp } from "lucide-react";
import { ConstellationBackground } from "@/components/atoms/ConstellationBackground";
import { Container } from "@/components/atoms/Container";
import { MetaChip } from "@/components/atoms/MetaChip";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { TrackedPlanCta } from "@/components/molecules/TrackedPlanCta";
import { PlansComparison } from "@/components/organisms/PlansComparison";
import { PlansFaq } from "@/components/organisms/PlansFaq";
import { LaunchPlanCard, PlansGrid } from "@/components/organisms/PlansGrid";
import { planCadenceItems, plans, plansPageContent, type PlanCadenceItem } from "@/lib/content";
import { testIdSlug } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

const plansHeroTitleWords = plansPageContent.hero.title.split(" ");
const heroChipAccents = ["purple", "lavender", "pink"] as const;
const cadenceIcons = [Rocket, CalendarDays, BarChart3, TrendingUp] as const;

function contactHref(intent: "discovery-call" | "quote", source: string) {
  return `/contact?intent=${intent}&source=${source}`;
}

function planName(planSlug: PlanCadenceItem["planSlug"]) {
  return plans.find((plan) => plan.slug === planSlug)?.name ?? planSlug;
}

function cadenceAccentClass(planSlug: PlanCadenceItem["planSlug"]) {
  if (planSlug === "nodo-launch") {
    return "from-white/18 via-nodo-lavender/20 to-white/6";
  }

  if (planSlug === "nodo-growth") {
    return "from-nodo-purple/52 via-nodo-lavender/18 to-white/6";
  }

  if (planSlug === "nodo-nexus") {
    return "from-nodo-pink/34 via-nodo-purple/24 to-white/6";
  }

  return "from-nodo-lavender/34 via-nodo-purple/18 to-white/6";
}

export function WebsitePlansPage() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(".plans-hero-title-word", { yPercent: 135 });
        gsap.set(".plans-hero-title", { autoAlpha: 1 });
        gsap.set([".plans-hero-kicker", ".plans-hero-copy", ".plans-hero-cta", ".plans-hero-chip", ".plans-hero-scroll"], {
          autoAlpha: 0,
          y: 22,
        });

        const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });

        tl.to(".plans-hero-kicker", { autoAlpha: 1, y: 0, duration: 0.65 })
          .to(".plans-hero-title-word", { yPercent: 0, duration: 0.9, stagger: 0.075 }, "-=0.18")
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
        gsap.set([".plans-hero-kicker", ".plans-hero-title", ".plans-hero-title-word", ".plans-hero-copy", ".plans-hero-cta", ".plans-hero-chip", ".plans-hero-scroll"], {
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
                  className="mb-[-0.22em] inline-block overflow-hidden pb-[0.22em] align-top"
                >
                  <span className="plans-hero-title-word inline-block pr-[0.22em]">{word}</span>
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
              {plansPageContent.hero.highlights.map((highlight, index) => (
                <MetaChip
                  key={highlight}
                  accent={heroChipAccents[index % heroChipAccents.length]}
                  className="plans-hero-chip opacity-0 motion-reduce:opacity-100"
                  dataTestId={`website-plans-hero-highlight-${testIdSlug(highlight)}`}
                  tone="dark"
                >
                  {highlight}
                </MetaChip>
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
                Help me choose a plan
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
                      After go-live
                    </p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-nodo-ink/78">
                      The partnership plans keep your website supported,
                      updated, and improving after launch.
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
              description="Flow, Growth, and Nexus are for businesses that want more than a website delivered once. They include support, updates, and improvement over time."
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
        data-testid="plans-page-cadence-section"
        className="border-b border-white/10 bg-white/[0.035] py-18 sm:py-24"
      >
        <Container>
          <ScrollReveal>
            <SectionHeading
              eyebrow="How each plan works"
              title="Ongoing partnership cadence or a focused launch path."
              description="Flow, Growth, and Nexus are designed around a 12-month improvement rhythm. Launch is different: it is a focused delivery path for getting a website live quickly, then deciding what support makes sense next."
              className="max-w-5xl"
            />
          </ScrollReveal>
          <div
            data-testid="plans-page-cadence-grid"
            className="mt-12 grid gap-5 lg:grid-cols-2"
          >
            {planCadenceItems.map((item, index) => (
              <ScrollReveal key={item.planSlug} delay={index * 0.05}>
                <article
                  data-testid={`plans-page-cadence-card-${item.planSlug}`}
                  className="relative h-full overflow-hidden rounded-lg border border-white/10 bg-nodo-black/78 text-white shadow-[0_26px_80px_rgba(0,0,0,0.24)]"
                >
                  <div className={`h-1.5 bg-gradient-to-r ${cadenceAccentClass(item.planSlug)}`} />
                  <div className="p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-nodo-lavender">
                          {item.eyebrow}
                        </p>
                        <h3 className="mt-2 text-2xl font-black leading-tight text-white">
                          {planName(item.planSlug)}
                        </h3>
                      </div>
                      <span className="shrink-0 rounded-full border border-white/12 bg-white/[0.055] px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-white/68">
                        {item.term}
                      </span>
                    </div>

                    <div className="mt-6 space-y-0">
                      {item.points.map((point, pointIndex) => {
                        const Icon = cadenceIcons[pointIndex % cadenceIcons.length];
                        const step = String(pointIndex + 1).padStart(2, "0");
                        const isLast = pointIndex === item.points.length - 1;

                        return (
                          <div
                            key={point.label}
                            data-testid={`plans-page-cadence-${item.planSlug}-${testIdSlug(point.label)}`}
                            className="grid grid-cols-[2.75rem_1fr] gap-4"
                          >
                            <div className="relative flex flex-col items-center">
                              <span className="relative z-10 inline-flex size-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.065] text-xs font-black text-white">
                                {step}
                              </span>
                              {!isLast ? <span className="h-full w-px bg-gradient-to-b from-white/18 to-white/4" /> : null}
                            </div>
                            <div className={isLast ? "pb-0" : "pb-5"}>
                              <div className="flex items-center gap-2">
                                <span className="inline-flex size-7 items-center justify-center rounded-full bg-nodo-purple/22 text-nodo-lavender">
                                  <Icon aria-hidden="true" className="size-3.5" />
                                </span>
                                <h4 className="text-sm font-black leading-tight text-white">
                                  {point.label}
                                </h4>
                              </div>
                              <p className="mt-2 max-w-xl text-sm leading-6 text-white/60">
                                {point.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-6 rounded-md border border-white/10 bg-white/[0.045] px-4 py-3">
                      <p className="text-sm font-semibold leading-6 text-white/64">
                        {item.planSlug === "nodo-launch"
                          ? "Fast launch first. Support can be added later."
                          : "Built for support, reporting, and planned improvement."}
                      </p>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute right-4 top-5 text-6xl font-black leading-none text-white/[0.035] sm:text-7xl">
                    {item.planSlug === "nodo-launch" ? "GO" : "12"}
                  </div>
                </article>
              </ScrollReveal>
            ))}
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
              title="Compare what happens after launch."
              description="The biggest difference is what continues after the website goes live: support, updates, visibility work, conversion improvements, and strategic guidance."
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
        className="border-y border-black/8 bg-[linear-gradient(180deg,#ffffff_0%,#f7f2ff_100%)] py-20 text-nodo-black sm:py-28"
      >
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <ScrollReveal>
              <SectionHeading
                eyebrow={plansPageContent.purchaseOption.eyebrow}
                title={plansPageContent.purchaseOption.title}
                description={plansPageContent.purchaseOption.copy}
                className="[&_h2]:text-nodo-black [&_p]:text-nodo-ink/68"
              >
                <p className="mt-6 rounded-3xl border border-black/8 bg-white p-5 text-pretty text-base leading-7 text-nodo-ink/68 shadow-[0_18px_60px_rgba(22,19,25,0.08)]">
                  {plansPageContent.purchaseOption.note}
                </p>
              </SectionHeading>
            </ScrollReveal>
            <ScrollReveal delay={0.12}>
              <PlansFaq tone="light" />
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
                  href={contactHref("discovery-call", "plans-final")}
                  plan="not-selected"
                  intent="discovery-call"
                  location="plans_final_primary"
                  dataTestId="plans-final-primary-button"
                  variant="inverted"
                >
                  Help me choose
                </TrackedPlanCta>
                <TrackedPlanCta
                  href={contactHref("quote", "plans-final")}
                  plan="not-selected"
                  intent="quote"
                  location="plans_final_secondary"
                  dataTestId="plans-final-secondary-button"
                  variant="secondary"
                >
                  Request a quote
                </TrackedPlanCta>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </main>
  );
}
