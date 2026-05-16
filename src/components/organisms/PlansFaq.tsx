"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { trackPlansFaqOpened } from "@/lib/analytics";
import { plansFaq } from "@/lib/content";

export function PlansFaq() {
  const [openQuestion, setOpenQuestion] = useState(plansFaq[0]?.question ?? "");

  return (
    <div className="grid gap-3">
      {plansFaq.map((item) => {
        const isOpen = openQuestion === item.question;

        return (
          <article key={item.question} className="rounded-3xl border border-white/12 bg-white/[0.045]">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left text-white sm:px-6"
              aria-expanded={isOpen}
              onClick={() => {
                setOpenQuestion(isOpen ? "" : item.question);

                if (!isOpen) {
                  trackPlansFaqOpened(item.question);
                }
              }}
            >
              <span className="text-lg font-black leading-tight">{item.question}</span>
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-white/14 bg-white/[0.06]">
                {isOpen ? (
                  <Minus aria-hidden="true" className="size-4" />
                ) : (
                  <Plus aria-hidden="true" className="size-4" />
                )}
              </span>
            </button>
            {isOpen ? (
              <p className="px-5 pb-5 text-pretty text-base leading-7 text-white/64 sm:px-6">
                {item.answer}
              </p>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
