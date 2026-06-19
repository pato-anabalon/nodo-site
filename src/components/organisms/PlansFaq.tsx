"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { trackPlansFaqOpened } from "@/lib/analytics";
import { plansFaq } from "@/lib/content";
import { cn } from "@/lib/utils";
import { testIdSlug } from "@/lib/utils";

type PlansFaqProps = {
  tone?: "dark" | "light";
};

export function PlansFaq({ tone = "dark" }: PlansFaqProps) {
  const [openQuestion, setOpenQuestion] = useState(plansFaq[0]?.question ?? "");
  const isLight = tone === "light";

  return (
    <div data-testid="plans-faq-list" className="grid gap-3">
      {plansFaq.map((item) => {
        const isOpen = openQuestion === item.question;
        const slug = testIdSlug(item.question);

        return (
          <article
            key={item.question}
            data-testid={`plans-faq-item-${slug}`}
            className={cn(
              "rounded-3xl border",
              isLight
                ? "border-black/8 bg-white shadow-[0_18px_60px_rgba(22,19,25,0.08)]"
                : "border-white/12 bg-white/[0.045]",
            )}
            data-state={isOpen ? "open" : "closed"}
          >
            <button
              type="button"
              data-testid={`plans-faq-toggle-${slug}`}
              className={cn(
                "flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6",
                isLight ? "text-nodo-black" : "text-white",
              )}
              aria-expanded={isOpen}
              onClick={() => {
                setOpenQuestion(isOpen ? "" : item.question);

                if (!isOpen) {
                  trackPlansFaqOpened(item.question);
                }
              }}
            >
              <span className="text-lg font-black leading-tight">{item.question}</span>
              <span
                className={cn(
                  "inline-flex size-9 shrink-0 items-center justify-center rounded-full border transition-transform duration-300 motion-reduce:transition-none data-[state=open]:rotate-180",
                  isLight
                    ? "border-black/10 bg-nodo-purple/8 text-nodo-purple"
                    : "border-white/14 bg-white/[0.06]",
                )}
                data-state={isOpen ? "open" : "closed"}
              >
                {isOpen ? (
                  <Minus aria-hidden="true" className="size-4" />
                ) : (
                  <Plus aria-hidden="true" className="size-4" />
                )}
              </span>
            </button>
            <div
              data-testid={`plans-faq-panel-${slug}`}
              className="grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none data-[state=closed]:grid-rows-[0fr] data-[state=closed]:opacity-0 data-[state=open]:grid-rows-[1fr] data-[state=open]:opacity-100"
              data-state={isOpen ? "open" : "closed"}
            >
              <div className="min-h-0">
                <p
                  className={cn(
                    "px-5 pb-5 text-pretty text-base leading-7 sm:px-6",
                    isLight ? "text-nodo-ink/68" : "text-white/64",
                  )}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
