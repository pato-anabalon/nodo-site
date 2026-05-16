"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Minus } from "lucide-react";
import { trackPlansComparisonViewed } from "@/lib/analytics";
import { planComparisonRows, plans, type PlanComparisonValue } from "@/lib/content";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function ComparisonValue({ value }: { value: PlanComparisonValue }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center gap-2 text-nodo-lavender">
        <Check aria-hidden="true" className="size-4" />
        <span className="sr-only">Included</span>
      </span>
    );
  }

  if (value === false) {
    return (
      <span className="inline-flex items-center gap-2 text-white/28">
        <Minus aria-hidden="true" className="size-4" />
        <span className="sr-only">Not included</span>
      </span>
    );
  }

  return <span className="text-sm font-semibold text-white/70">{value}</span>;
}

export function PlansComparison() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!root.current) {
        return;
      }

      let tracked = false;

      ScrollTrigger.create({
        trigger: root.current,
        start: "top 72%",
        once: true,
        onEnter: () => {
          if (!tracked) {
            tracked = true;
            trackPlansComparisonViewed();
          }
        },
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="overflow-hidden rounded-[1.75rem] border border-white/12 bg-white/[0.045]">
      <div className="hidden md:block">
        <table className="w-full table-fixed border-collapse text-left">
          <colgroup>
            <col className="w-[24%]" />
            <col className="w-[19%]" />
            <col className="w-[19%]" />
            <col className="w-[19%]" />
            <col className="w-[19%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-white/12 bg-white/[0.045]">
              <th className="px-4 py-4 text-xs font-black uppercase tracking-[0.16em] text-white/46 lg:px-5">
                Feature
              </th>
              {plans.map((plan) => (
                <th key={plan.slug} className="px-4 py-4 text-sm font-black text-white lg:px-5 lg:text-base">
                  <span className="block text-balance">{plan.name}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {planComparisonRows.map((row) => (
              <tr key={row.feature} className="border-b border-white/8 last:border-b-0">
                <th className="px-4 py-3 text-sm font-semibold leading-5 text-white/72 lg:px-5">
                  {row.feature}
                </th>
                {plans.map((plan) => (
                  <td key={plan.slug} className="px-4 py-3 align-middle lg:px-5">
                    <ComparisonValue value={row.values[plan.slug]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 p-4 md:hidden">
        {plans.map((plan) => (
          <article key={plan.slug} className="rounded-3xl border border-white/10 bg-nodo-black/50 p-5">
            <h3 className="text-xl font-black text-white">{plan.name}</h3>
            <div className="mt-4 grid gap-3">
              {planComparisonRows.map((row) => (
                <div key={row.feature} className="flex items-center justify-between gap-4 border-b border-white/8 pb-3 last:border-b-0 last:pb-0">
                  <span className="text-sm text-white/58">{row.feature}</span>
                  <ComparisonValue value={row.values[plan.slug]} />
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
