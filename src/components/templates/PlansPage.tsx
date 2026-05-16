import { ArrowDown, ArrowRight } from "lucide-react";
import { ConstellationBackground } from "@/components/atoms/ConstellationBackground";
import { Container } from "@/components/atoms/Container";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { TrackedPlanCta } from "@/components/molecules/TrackedPlanCta";
import { PlansComparison } from "@/components/organisms/PlansComparison";
import { PlansFaq } from "@/components/organisms/PlansFaq";
import { LaunchPlanCard, PlansGrid } from "@/components/organisms/PlansGrid";
import { plansPageContent } from "@/lib/content";

function contactHref(intent: "discovery-call" | "quote", source: string) {
  return `/contact?intent=${intent}&source=${source}`;
}

export function PlansPage() {
  return (
    <main className="overflow-hidden bg-nodo-black">
      <section className="relative flex min-h-screen overflow-hidden bg-nodo-black pt-28">
        <ConstellationBackground
          className="opacity-64"
          density={0.7}
          fps={36}
          interactive
          maxDevicePixelRatio={1.5}
          maxNodes={68}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(124,58,237,0.22),transparent_28%),radial-gradient(circle_at_76%_24%,rgba(232,48,207,0.12),transparent_24%)]" />
        <Container className="relative z-10 grid items-center gap-12 pb-16 pt-10 lg:grid-cols-[1fr_0.78fr]">
          <div>
            <p className="mb-5 text-sm font-black uppercase tracking-[0.24em] text-nodo-lavender">
              {plansPageContent.hero.eyebrow}
            </p>
            <h1 className="max-w-5xl text-balance text-5xl font-black leading-[0.9] tracking-normal text-white sm:text-7xl lg:text-8xl">
              {plansPageContent.hero.title}
            </h1>
            <p className="mt-7 max-w-3xl text-pretty text-xl font-semibold leading-8 text-white/76 sm:text-2xl">
              {plansPageContent.hero.subtitle}
            </p>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-8 text-white/58">
              {plansPageContent.hero.copy}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <TrackedPlanCta
                href={contactHref("discovery-call", "plans-hero")}
                plan="not-selected"
                intent="discovery-call"
                location="plans_hero_primary"
              >
                Book a discovery call
              </TrackedPlanCta>
              <TrackedPlanCta
                href={contactHref("quote", "plans-hero")}
                plan="not-selected"
                intent="quote"
                location="plans_hero_secondary"
                variant="secondary"
              >
                Request a quote
              </TrackedPlanCta>
            </div>
          </div>

          <div
            className="relative min-h-[440px] pt-5 lg:min-h-[560px]"
            aria-hidden="true"
          >
            <span className="nodo-animated-tag absolute left-1/2 top-0 z-10 -translate-x-1/2 rounded-full border border-white/14 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-white shadow-[0_14px_45px_rgba(124,58,237,0.18)]">
              Partnership path
            </span>
            <div className="absolute inset-x-0 bottom-0 top-5 rounded-[2rem] border border-white/12 bg-nodo-black/42 shadow-[0_30px_110px_rgba(0,0,0,0.32)]" />
            <div className="absolute inset-x-6 bottom-6 top-16 grid grid-rows-[auto_1fr_auto]">
              <div className="grid gap-5">
                {["Launch", "Support", "Improve", "Grow"].map((step, index) => (
                  <div key={step} className="flex items-center gap-4">
                    <span className="flex size-12 items-center justify-center rounded-full border border-white/14 bg-white/[0.06] text-sm font-black text-white">
                      0{index + 1}
                    </span>
                    <span className="h-px flex-1 bg-white/14" />
                    <span className="min-w-24 text-right text-sm font-black uppercase tracking-[0.18em] text-white/64">
                      {step}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center self-center text-nodo-lavender">
                <span className="hidden h-px w-20 bg-nodo-lavender/45 sm:block" />
                <span className="mx-4 rounded-full border border-nodo-lavender/30 bg-nodo-purple/12 px-4 py-2 text-center text-[0.65rem] font-black uppercase leading-4 tracking-[0.16em] text-nodo-lavender">
                  From handover to momentum
                </span>
                <span className="hidden h-px w-20 bg-nodo-lavender/45 sm:block" />
              </div>

              <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
                <div className="rounded-3xl border border-white/10 bg-nodo-black/55 p-4">
                  <p className="text-sm font-bold text-white/46">One-off</p>
                  <p className="mt-2 text-xl font-black text-white">
                    Static handover
                  </p>
                </div>
                <div className="hidden items-center justify-center text-nodo-lavender lg:flex">
                  <span className="h-px w-8 bg-nodo-lavender/50" />
                  <ArrowRight
                    aria-hidden="true"
                    className="mx-2 size-5 shrink-0"
                  />
                  <span className="h-px w-8 bg-nodo-lavender/50" />
                </div>
                <div className="rounded-3xl border border-nodo-lavender/40 bg-nodo-purple/20 p-4">
                  <p className="text-sm font-bold text-nodo-lavender">
                    Partnership
                  </p>
                  <p className="mt-2 text-xl font-black text-white">
                    Ongoing momentum
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
        <a
          href="#plans"
          className="absolute bottom-5 right-5 z-10 inline-flex size-11 items-center justify-center rounded-full border border-white/18 bg-white/8 text-white transition hover:border-nodo-lavender/70 hover:bg-white/14"
          aria-label="Scroll to plans"
        >
          <ArrowDown aria-hidden="true" className="size-4" />
        </a>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] py-18 sm:py-24">
        <Container>
          <ScrollReveal>
            <div className="grid gap-8 lg:grid-cols-[0.65fr_1fr] lg:items-end">
              <p className="text-sm font-black uppercase tracking-[0.24em] text-nodo-lavender">
                {plansPageContent.positioning.eyebrow}
              </p>
              <div>
                <h2 className="text-balance text-4xl font-black leading-[0.95] text-white sm:text-6xl">
                  {plansPageContent.positioning.title}
                </h2>
                <p className="mt-6 max-w-3xl text-pretty text-lg leading-8 text-white/64">
                  {plansPageContent.positioning.copy}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <section className="py-20 sm:py-28" id="plans">
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

      <section className="border-y border-white/10 bg-white/[0.025] py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:items-center">
            <ScrollReveal>
              <SectionHeading
                eyebrow={plansPageContent.launchAlternative.eyebrow}
                title={plansPageContent.launchAlternative.title}
                description={plansPageContent.launchAlternative.copy}
              />
            </ScrollReveal>
            <ScrollReveal delay={0.12}>
              <LaunchPlanCard />
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <ScrollReveal>
            <SectionHeading
              eyebrow="Compare"
              title="See what keeps moving after launch."
              description="The main difference is not the website. It is the operating rhythm around it."
              className="max-w-4xl"
            />
          </ScrollReveal>
          <div className="mt-12">
            <PlansComparison />
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
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

      <section className="bg-nodo-purple py-20 text-white sm:py-28">
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
                  variant="inverted"
                >
                  Request a quote
                </TrackedPlanCta>
                <TrackedPlanCta
                  href={contactHref("discovery-call", "plans-final")}
                  plan="not-selected"
                  intent="discovery-call"
                  location="plans_final_secondary"
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
