"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { ConstellationBackground } from "@/components/atoms/ConstellationBackground";
import { Container } from "@/components/atoms/Container";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { Button } from "@/components/atoms/Button";
import { ServicesPageShowcase } from "@/components/organisms/ServicesPageShowcase";
import { servicesPageContent } from "@/lib/content";

gsap.registerPlugin(useGSAP);

const servicesHeroTitleWords = servicesPageContent.hero.title.split(" ");

export function ServicesPage() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(".services-hero-title", { autoAlpha: 1 });
        gsap.set(".services-hero-title span", { yPercent: 105 });
        gsap.set(
          [
            ".services-hero-kicker",
            ".services-hero-copy",
            ".services-hero-cta",
          ],
          {
            autoAlpha: 0,
            y: 18,
          },
        );
        gsap.set(".services-hero-visual-part", {
          autoAlpha: 0,
          y: 26,
          scale: 0.98,
        });

        const tl = gsap.timeline({
          paused: true,
          defaults: { ease: "power3.out" },
        });

        tl.to(".services-hero-kicker", { autoAlpha: 1, y: 0, duration: 0.7 })
          .to(
            ".services-hero-title span",
            { yPercent: 0, duration: 0.85, stagger: 0.08 },
            "-=0.25",
          )
          .to(
            ".services-hero-copy",
            { autoAlpha: 1, y: 0, duration: 0.75 },
            "-=0.25",
          )
          .to(
            ".services-hero-cta",
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
            ".services-hero-visual-part",
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              stagger: 0.1,
              clearProps: "transform,visibility",
            },
            0.35,
          );

        const playIntro = () => {
          tl.play(0);
        };

        if (document.documentElement.dataset.nodoPreloaded === "true") {
          playIntro();
        } else {
          window.addEventListener("nodo:preloader-complete", playIntro, {
            once: true,
          });
        }

        return () => {
          window.removeEventListener("nodo:preloader-complete", playIntro);
        };
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            ".services-hero-kicker",
            ".services-hero-title",
            ".services-hero-title span",
            ".services-hero-copy",
            ".services-hero-cta",
          ],
          {
            autoAlpha: 1,
            y: 0,
            yPercent: 0,
          },
        );
        gsap.set(".services-hero-visual-part", {
          autoAlpha: 1,
          y: 0,
          scale: 1,
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <main
      ref={root}
      data-testid="services-page-main"
      className="overflow-hidden bg-nodo-black"
    >
      <section
        data-testid="services-page-hero-section"
        className="relative flex min-h-screen overflow-hidden bg-white pt-28 text-nodo-black"
      >
        <ConstellationBackground
          backgroundTone="light"
          className="opacity-18 mix-blend-multiply"
          density={1}
          fps={34}
          interactive
          maxDevicePixelRatio={1.5}
          maxNodes={104}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(124,58,237,0.10),transparent_28%),radial-gradient(circle_at_82%_22%,rgba(232,48,207,0.06),transparent_22%)]" />
        <Container className="relative z-10 grid items-center gap-12 pb-16 pt-10 lg:grid-cols-[1fr_0.78fr]">
          <div>
            <p className="services-hero-kicker opacity-0 motion-reduce:opacity-100 mb-5 text-sm font-black uppercase tracking-[0.24em] text-nodo-purple">
              {servicesPageContent.hero.eyebrow}
            </p>
            <h1 className="services-hero-title opacity-0 motion-reduce:opacity-100 max-w-5xl text-balance text-5xl font-black leading-[0.9] tracking-normal text-nodo-black sm:text-7xl lg:text-8xl">
              {servicesHeroTitleWords.map((word, index) => (
                <span
                  key={`${word}-${index}`}
                  className="mb-[-0.12em] inline-block overflow-hidden pb-[0.12em] align-top"
                >
                  <span className="inline-block pr-[0.22em]">{word}</span>
                </span>
              ))}
            </h1>
            {servicesPageContent.hero.subtitle ? (
              <p className="services-hero-copy opacity-0 motion-reduce:opacity-100 mt-7 max-w-3xl text-pretty text-xl font-semibold leading-8 text-nodo-ink/82 sm:text-2xl">
                {servicesPageContent.hero.subtitle}
              </p>
            ) : null}
            <p className="services-hero-copy opacity-0 motion-reduce:opacity-100 mt-5 max-w-2xl text-pretty text-lg leading-8 text-nodo-ink/68">
              {servicesPageContent.hero.copy}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button
                href="/contact?source=services-hero"
                variant="inverted"
                dataTestId="services-hero-primary-button"
                className="services-hero-cta opacity-0 motion-reduce:opacity-100"
              >
                Let’s talk
              </Button>
              <Button
                href="#service-breakdown"
                variant="secondary"
                surfaceTone="light"
                dataTestId="services-hero-secondary-button"
                className="services-hero-cta opacity-0 motion-reduce:opacity-100"
              >
                Explore the services
              </Button>
            </div>
          </div>

          <div className="services-hero-visual relative flex items-center pb-2">
            <div className="services-hero-visual-part relative overflow-hidden rounded-[2.2rem] border border-black/8 bg-[linear-gradient(145deg,#f8f4ff_0%,#ffffff_48%,#fbf8ff_100%)] p-4 shadow-[0_28px_90px_rgba(22,19,25,0.12)] opacity-0 motion-reduce:opacity-100 sm:p-5">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(124,58,237,0.10),transparent_28%),radial-gradient(circle_at_82%_80%,rgba(232,48,207,0.06),transparent_22%)]" />
              <div className="relative overflow-hidden rounded-[1.7rem] border border-black/8 bg-white">
                <video
                  className="aspect-[4/5] w-full object-cover"
                  src="/videos/search-tree-animation-optimized.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  data-testid="services-page-hero-video"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(5,5,5,0.12))]" />
              </div>
              <div className="services-hero-visual-part absolute inset-x-8 bottom-8 rounded-[1.4rem] border border-white/35 bg-white/84 px-5 py-4 backdrop-blur-md opacity-0 motion-reduce:opacity-100">
                <p className="text-[0.65rem] font-black uppercase tracking-[0.18em] text-nodo-purple">
                  One digital partner
                </p>
                <p className="mt-2 text-base font-semibold leading-7 text-nodo-ink/78">
                  Brand clarity, smarter demand generation, and web experiences
                  designed to help you sell better.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section
        data-testid="services-page-positioning-section"
        className="border-y border-black/8 bg-white py-18 text-nodo-black sm:py-24"
      >
        <Container>
          <ScrollReveal>
            <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
              <div className="relative overflow-hidden rounded-[2rem] border border-black/8 bg-[linear-gradient(145deg,#f8f5ff_0%,#ffffff_48%,#f7f2ff_100%)] p-6 sm:p-8">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(124,58,237,0.14),transparent_28%),radial-gradient(circle_at_72%_74%,rgba(232,48,207,0.12),transparent_24%)]" />
                <div className="relative min-h-[22rem] overflow-hidden rounded-[1.6rem] border border-black/8 bg-white/72 shadow-[0_24px_90px_rgba(22,19,25,0.08)]">
                  <video
                    className="h-full w-full object-cover"
                    src="/videos/brand-strategy-optimized.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    data-testid="services-page-positioning-video"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(5,5,5,0.16))]" />
                  <div className="absolute bottom-5 left-5 right-5 rounded-[1.35rem] border border-white/30 bg-white/78 px-4 py-4 backdrop-blur-md">
                    <p className="text-[0.65rem] font-black uppercase tracking-[0.18em] text-nodo-purple">
                      Brand / Demand / Build
                    </p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-nodo-ink/78">
                      One connected system designed to help your business look
                      sharper, generate more demand, and convert more
                      confidently.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-[0.24em] text-nodo-purple">
                  {servicesPageContent.positioning.eyebrow}
                </p>
                <h2 className="mt-5 text-balance text-4xl font-black leading-[0.95] text-nodo-black sm:text-6xl">
                  {servicesPageContent.positioning.title}
                </h2>
                <p className="mt-6 max-w-3xl text-pretty text-lg leading-8 text-nodo-ink/68">
                  {servicesPageContent.positioning.copy}
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {servicesPageContent.positioning.pillars.map(
                    (pillar, index) => (
                      <div
                        key={pillar.title}
                        className="rounded-[1.4rem] border border-black/8 bg-black/[0.02] p-4"
                      >
                        <p className="text-[0.65rem] font-black uppercase tracking-[0.18em] text-nodo-purple">
                          0{index + 1}
                        </p>
                        <p className="mt-3 text-base font-black text-nodo-black">
                          {pillar.title}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-nodo-ink/66">
                          {pillar.description}
                        </p>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <section
        id="service-breakdown"
        data-testid="services-page-breakdown-section"
        className="py-20 sm:py-28"
      >
        <Container>
          <ScrollReveal>
            <SectionHeading
              eyebrow={servicesPageContent.detailSection.eyebrow}
              title={servicesPageContent.detailSection.title}
              description={servicesPageContent.detailSection.description}
              className="max-w-4xl"
            />
          </ScrollReveal>
          <div className="mt-12">
            <ServicesPageShowcase />
          </div>
        </Container>
      </section>

      <section
        data-testid="services-page-final-cta-section"
        className="bg-nodo-purple py-20 text-white sm:py-28"
      >
        <Container>
          <ScrollReveal>
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="mb-5 text-sm font-black uppercase tracking-[0.24em] text-white/70">
                  {servicesPageContent.finalCta.eyebrow}
                </p>
                <h2 className="max-w-4xl text-balance text-4xl font-black leading-[0.95] tracking-normal sm:text-6xl">
                  {servicesPageContent.finalCta.title}
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-white/72">
                  {servicesPageContent.finalCta.copy}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button
                  href="/contact?source=services-final"
                  variant="inverted"
                  dataTestId="services-final-primary-button"
                >
                  Let’s talk
                </Button>
                <Button
                  href="/plans"
                  variant="secondary"
                  dataTestId="services-final-secondary-button"
                  icon={<ArrowRight aria-hidden="true" className="size-4" />}
                >
                  View plans
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </main>
  );
}
