"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/atoms/Container";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { ProcessStep } from "@/components/molecules/ProcessStep";
import { processSteps } from "@/lib/content";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function ProcessSection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isDesktop, reduceMotion } = context.conditions ?? {};

          if (reduceMotion) {
            gsap.set(".process-step", { autoAlpha: 1, y: 0 });
            return;
          }

          gsap.from(".process-step", {
            autoAlpha: 0,
            y: 44,
            duration: 0.8,
            stagger: 0.14,
            ease: "power3.out",
            scrollTrigger: {
              trigger: root.current,
              start: "top 70%",
              once: true,
            },
          });

          if (isDesktop) {
            gsap.to(".process-orbit", {
              rotation: 46,
              transformOrigin: "center",
              ease: "none",
              scrollTrigger: {
                trigger: root.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            });
          }
        },
      );

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="overflow-hidden bg-white py-24 text-nodo-black sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="relative">
            <div className="sticky top-28">
              <p className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-nodo-purple">
                How we work
              </p>
              <h2 className="text-balance text-4xl font-black leading-[0.95] tracking-normal sm:text-6xl">
                A system is only useful when the business can feel it.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-nodo-ink/68">
                The process starts with clarity, then moves quickly into design, build, and
                improvement loops that keep the result grounded in daily operations.
              </p>
              <svg
                className="process-orbit mt-12 hidden h-64 w-64 overflow-visible lg:block"
                viewBox="0 0 260 260"
                fill="none"
                aria-hidden="true"
              >
                <path d="M42 122L130 112L206 98" stroke="#050505" strokeWidth="7" strokeLinecap="round" />
                <path d="M130 112L164 34" stroke="#050505" strokeWidth="7" strokeLinecap="round" />
                <path d="M130 112L86 224" stroke="#050505" strokeWidth="7" strokeLinecap="round" />
                <circle cx="42" cy="122" r="18" fill="#050505" />
                <circle cx="130" cy="112" r="15" fill="#050505" />
                <circle cx="206" cy="98" r="20" fill="#050505" />
                <circle cx="164" cy="34" r="20" fill="#050505" />
                <circle cx="86" cy="224" r="26" fill="#7c3aed" />
              </svg>
            </div>
          </div>
          <div className="rounded-[2rem] bg-nodo-black px-5 py-4 sm:px-8 sm:py-8">
            <SectionHeading
              eyebrow="Operating rhythm"
              title="From bottleneck to business advantage."
              className="mb-8"
            />
            {processSteps.map((step) => (
              <ProcessStep key={step.title} {...step} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
