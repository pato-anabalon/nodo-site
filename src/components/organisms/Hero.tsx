"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { ConstellationBackground } from "@/components/atoms/ConstellationBackground";
import { Container } from "@/components/atoms/Container";

gsap.registerPlugin(useGSAP);

const heroTaglineWords = ["Clarity.", "Speed.", "Results."];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(".hero-line", { strokeDashoffset: 1 });
        gsap.set(".hero-node", { scale: 0, transformOrigin: "center" });
        gsap.set(".hero-node-connected", { scale: 0, transformOrigin: "center" });
        gsap.set(".hero-title span", { yPercent: 105 });
        gsap.set(".hero-tagline-word", { yPercent: 105 });
        gsap.set([".hero-kicker", ".hero-bodycopy", ".hero-cta"], {
          autoAlpha: 0,
          y: 18,
        });
        gsap.set(".hero-tagline", { autoAlpha: 1, y: 0 });

        const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });

        tl.to(".hero-kicker", { autoAlpha: 1, y: 0, duration: 0.7 })
          .to(".hero-title span", { yPercent: 0, duration: 0.85, stagger: 0.08 }, "-=0.25")
          .to(".hero-tagline-word", { yPercent: 0, duration: 0.8, stagger: 0.08 }, "-=0.25")
          .to(".hero-bodycopy", { autoAlpha: 1, y: 0, duration: 0.75 }, "-=0.35")
          .to(
            ".hero-cta",
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.08,
              clearProps: "transform,visibility",
            },
            "-=0.2",
          )
          .to(
            ".hero-line",
            { strokeDashoffset: 0, duration: 1.1, stagger: 0.12, ease: "power2.inOut" },
            0.15,
          )
          .to(
            ".hero-node",
            { scale: 1, transformOrigin: "center", duration: 0.58, stagger: 0.08 },
            0.34,
          )
          .to(
            ".hero-node-connected",
            { scale: 1, duration: 0.58 },
            0.72,
          );

        const markFloat = gsap.to(".hero-mark", {
          y: -18,
          rotation: 1.5,
          duration: 4.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          paused: true,
        });

        const connectedPulse = gsap.fromTo(
          ".hero-node-connected",
          { scale: 1, transformOrigin: "center" },
          {
            scale: 28 / 54,
            transformOrigin: "center",
            repeat: -1,
            yoyo: true,
            duration: 1.8,
            ease: "sine.inOut",
            paused: true,
            immediateRender: false,
          },
        );

        tl.call(() => connectedPulse.restart(true), [], 1.42);

        const playIntro = () => {
          tl.play(0);
          markFloat.play(0);
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
        gsap.set([".hero-kicker", ".hero-title span", ".hero-bodycopy", ".hero-cta"], {
          autoAlpha: 1,
          y: 0,
          yPercent: 0,
        });
        gsap.set(".hero-tagline-word", { yPercent: 0 });
        gsap.set(".hero-line", { strokeDashoffset: 0 });
        gsap.set([".hero-node", ".hero-node-connected"], { scale: 1 });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      data-testid="home-hero-section"
      className="relative flex min-h-screen overflow-hidden bg-nodo-black pt-28"
    >
      <ConstellationBackground className="opacity-85" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_24%,rgba(124,58,237,0.20),transparent_30%),linear-gradient(120deg,rgba(232,48,207,0.08),transparent_34%)]" />
      <Container className="relative z-10 grid items-center gap-10 pb-16 pt-10 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="max-w-3xl">
          <p className="hero-kicker mb-6 text-sm font-black uppercase tracking-[0.24em] text-nodo-lavender">
            Auckland digital systems studio
          </p>
          <h1 className="hero-title flex flex-nowrap items-baseline overflow-hidden whitespace-nowrap text-[clamp(4.6rem,16vw,12.5rem)] font-black leading-[0.82] tracking-normal text-white">
            <span className="inline-block shrink-0">Nodo</span>
            <span className="inline-block shrink-0 text-nodo-purple">.</span>
          </h1>
          <p className="hero-tagline mt-7 max-w-2xl text-balance text-2xl font-semibold leading-tight text-white sm:text-4xl">
            {heroTaglineWords.map((word, index) => (
              <span key={`${word}-${index}`} className="inline-block overflow-hidden align-top">
                <span className="hero-tagline-word inline-block pr-[0.24em]">{word}</span>
              </span>
            ))}
          </p>
          <p className="hero-bodycopy mt-6 max-w-xl text-pretty text-lg leading-8 text-white/68">
            Digital systems for growing businesses that need cleaner workflows, sharper
            platforms, and technology that moves at the pace of the company.
          </p>
          <div className="relative z-20 mt-9 flex flex-wrap gap-3">
            <Button href="/contact" className="hero-cta">
              Start a project
            </Button>
            <Button href="#services" variant="secondary" className="hero-cta">
              Explore services
            </Button>
          </div>
        </div>

        <div className="hero-mark relative min-h-[420px] lg:min-h-[620px]" aria-hidden="true">
          <svg
            className="absolute inset-0 h-full w-full overflow-visible"
            viewBox="0 0 680 680"
            fill="none"
          >
            <path
              d="M126 332L294 316L538 284"
              stroke="white"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray="1"
              pathLength="1"
              className="hero-line"
            />
            <path
              d="M294 316L382 94"
              stroke="white"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray="1"
              pathLength="1"
              className="hero-line"
            />
            <path
              d="M294 316L184 590"
              stroke="white"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray="1"
              pathLength="1"
              className="hero-line"
            />
            <circle className="hero-node" cx="126" cy="332" r="38" fill="white" />
            <circle className="hero-node" cx="294" cy="316" r="28" fill="white" />
            <circle className="hero-node" cx="538" cy="284" r="42" fill="white" />
            <circle className="hero-node" cx="382" cy="94" r="40" fill="white" />
            <circle className="hero-node-connected hero-node-pulse" cx="184" cy="590" r="54" fill="#7c3aed" />
          </svg>
        </div>
      </Container>
      <a
        href="#services"
        className="absolute bottom-5 right-5 z-10 inline-flex size-11 items-center justify-center rounded-full border border-white/18 bg-white/8 text-white"
        aria-label="Scroll to services"
      >
        <ArrowDown aria-hidden="true" className="size-4" />
      </a>
    </section>
  );
}
