"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, XCircle } from "lucide-react";
import { TrackedPlanCta } from "@/components/molecules/TrackedPlanCta";
import { plans, plansPageContent, type Plan } from "@/lib/content";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function contactHref(plan: Plan["slug"]) {
  return `/contact?plan=${plan}&intent=quote&source=plans`;
}

function planTypeLabel(plan: Plan) {
  return plan.tone === "one-off" ? "One-off build" : "Growth partnership";
}

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <article
      className={cn(
        "plan-card group relative flex h-full flex-col overflow-visible rounded-[2rem] border bg-white/[0.045] p-6 pt-10 shadow-[0_24px_80px_rgba(0,0,0,0.25)] transition duration-300 hover:-translate-y-1 hover:border-nodo-lavender/50 hover:bg-white/[0.07] sm:p-7 sm:pt-11",
        plan.highlighted
          ? "border-nodo-lavender/70 bg-[linear-gradient(160deg,rgba(124,58,237,0.42),rgba(255,255,255,0.08)_42%,rgba(5,5,5,0.7))] shadow-[0_30px_110px_rgba(124,58,237,0.32)]"
          : "border-white/12",
        plan.tone === "premium" && "bg-[linear-gradient(145deg,rgba(124,58,237,0.16),rgba(255,255,255,0.045))]",
        plan.tone === "one-off" && "bg-white/[0.025] opacity-90",
      )}
    >
      <div
        className={cn(
          "absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 rounded-xl border px-4 py-2 text-center text-xs font-black uppercase tracking-[0.16em] shadow-[0_14px_34px_rgba(0,0,0,0.28)]",
          plan.highlighted
            ? "border-white/20 bg-nodo-lavender text-nodo-black"
            : "border-white/14 bg-nodo-purple text-white",
          plan.tone === "one-off" && "border-white/18 bg-nodo-black text-white",
        )}
      >
        {planTypeLabel(plan)}
      </div>

      <div className="flex min-h-10 items-start justify-center gap-3">
        {plan.badge ? (
          <span className="mt-1 rounded-full border border-nodo-pink/40 bg-nodo-pink px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-white shadow-[0_12px_32px_rgba(232,48,207,0.32)]">
            {plan.badge}
          </span>
        ) : null}
      </div>

      <div className="mt-7">
        <h3 className="text-3xl font-black tracking-normal text-white">{plan.name}</h3>
        <p className="mt-3 min-h-16 text-sm leading-6 text-white/62">{plan.label}</p>
      </div>

      <div className="mt-7 border-y border-white/12 py-5">
        <p className="text-2xl font-black leading-tight text-white">{plan.price}</p>
        {plan.priceDetail ? (
          <p className="mt-2 text-sm leading-6 text-white/46">{plan.priceDetail}</p>
        ) : null}
        {plan.contractNote ? (
          <p className="mt-2 text-sm font-semibold text-nodo-lavender">{plan.contractNote}</p>
        ) : null}
      </div>

      <p className="mt-5 text-pretty text-sm leading-6 text-white/68">{plan.summary}</p>

      <div className="mt-6 grid gap-3">
        {plan.includedFeatures.map((feature) => (
          <div key={feature} className="flex gap-3 text-sm leading-5 text-white/72">
            <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-nodo-lavender" />
            <span>{feature}</span>
          </div>
        ))}
        {plan.excludedFeatures?.map((feature) => (
          <div key={feature} className="flex gap-3 text-sm leading-5 text-white/38">
            <XCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-white/28" />
            <span>{feature}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-8">
        <TrackedPlanCta
          href={contactHref(plan.slug)}
          plan={plan.slug}
          intent="quote"
          location="plans_grid"
          variant={plan.highlighted ? "primary" : "secondary"}
          className="w-full"
        >
          {plan.ctaLabel}
        </TrackedPlanCta>
      </div>
    </article>
  );
}

const growthPartnershipPlans = plans.filter((plan) => plan.tone !== "one-off");
const launchPlan = plans.find((plan) => plan.tone === "one-off");

export function PlansGrid() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".plan-card");

        gsap.set(cards, { autoAlpha: 0, y: 38 });

        ScrollTrigger.batch(cards, {
          start: "top 84%",
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: 0.75,
              ease: "power3.out",
              stagger: 0.08,
              overwrite: true,
            });
          },
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".plan-card", { autoAlpha: 1, y: 0 });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <div className="grid gap-5 lg:grid-cols-3">
        {growthPartnershipPlans.map((plan) => (
          <PlanCard key={plan.slug} plan={plan} />
        ))}
      </div>
      <p className="mt-5 text-sm text-white/46">{plansPageContent.pricingNote}</p>
    </div>
  );
}

export function LaunchPlanCard() {
  if (!launchPlan) {
    return null;
  }

  return (
    <article className="plan-card relative overflow-visible rounded-[2rem] border border-white/12 bg-white/[0.035] p-6 pt-10 shadow-[0_24px_80px_rgba(0,0,0,0.22)] lg:p-8 lg:pt-10">
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_70%_20%,rgba(124,58,237,0.18),transparent_34%)]" />
      <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white/18 bg-nodo-black px-4 py-2 text-center text-xs font-black uppercase tracking-[0.16em] text-white shadow-[0_14px_34px_rgba(0,0,0,0.28)]">
        One-off build
      </div>

      <div className="relative grid gap-8 lg:grid-cols-[0.75fr_1fr] lg:items-start">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-white/42">
            Alternative path
          </p>
          <h3 className="mt-4 text-4xl font-black tracking-normal text-white">
            {launchPlan.name}
          </h3>
          <p className="mt-4 max-w-xl text-pretty text-base leading-7 text-white/64">
            {launchPlan.summary}
          </p>
          <div className="mt-7 rounded-3xl border border-white/10 bg-nodo-black/50 p-5">
            <p className="text-sm font-semibold text-white/46">One-time investment</p>
            <p className="mt-2 text-3xl font-black leading-tight text-white">
              {launchPlan.price}
            </p>
            <TrackedPlanCta
              href={contactHref(launchPlan.slug)}
              plan={launchPlan.slug}
              intent="quote"
              location="plans_launch_alternative"
              variant="secondary"
              className="mt-5 w-full"
            >
              {launchPlan.ctaLabel}
            </TrackedPlanCta>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
            <h4 className="text-sm font-black uppercase tracking-[0.18em] text-nodo-lavender">
              Included
            </h4>
            <div className="mt-5 grid gap-3">
              {launchPlan.includedFeatures.map((feature) => (
                <div key={feature} className="flex gap-3 text-sm leading-5 text-white/72">
                  <CheckCircle2
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-nodo-lavender"
                  />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-nodo-black/40 p-5">
            <h4 className="text-sm font-black uppercase tracking-[0.18em] text-white/42">
              Not included in this model
            </h4>
            <div className="mt-5 grid gap-3">
              {launchPlan.excludedFeatures?.map((feature) => (
                <div key={feature} className="flex gap-3 text-sm leading-5 text-white/38">
                  <XCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-white/26" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
