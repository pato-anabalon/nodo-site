"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { ConstellationBackground } from "@/components/atoms/ConstellationBackground";
import { Container } from "@/components/atoms/Container";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { caseStudiesPageContent, caseStudyWorkCards } from "@/lib/content";
import { testIdSlug } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

const heroTitleWords = caseStudiesPageContent.hero.title.split(" ");
const showSelectedWorkSection = false;

function BrowserSlot({
  label,
  title,
  description,
  imageSrc,
  imageAlt,
  videoSrc,
  tone,
}: {
  label: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  videoSrc: string;
  tone: "before" | "after";
}) {
  const isAfter = tone === "after";

  return (
    <article
      data-testid={`case-studies-plasterpro-${tone}-slot`}
      className="relative overflow-hidden rounded-[1.75rem] border border-white/12 bg-white/[0.045] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.18)] sm:p-5"
    >
      <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex gap-2">
          <span className="size-2.5 rounded-full bg-white/26" />
          <span className="size-2.5 rounded-full bg-white/18" />
          <span className="size-2.5 rounded-full bg-white/12" />
        </div>
        <span className="rounded-full border border-white/12 bg-white/[0.055] px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.16em] text-white/56">
          {label}
        </span>
      </div>
      <div
        className={[
          "relative mt-5 aspect-[16/10] overflow-hidden rounded-[1.25rem] border",
          isAfter
            ? "border-nodo-lavender/30 bg-white"
            : "border-white/10 bg-white/[0.035]",
        ].join(" ")}
      >
        <video
          aria-label={imageAlt}
          autoPlay
          className="h-full w-full object-cover object-top"
          controls
          loop
          muted
          playsInline
          poster={imageSrc}
          preload="metadata"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_68%,rgba(5,5,5,0.42))]" />
      </div>
      <div className="mt-5">
        <h3 className="text-2xl font-black tracking-normal text-white">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-white/62">{description}</p>
      </div>
    </article>
  );
}

function HeroTransformationPanel() {
  const { featured } = caseStudiesPageContent;
  const { before, after } = featured.comparison;

  return (
    <div
      data-testid="case-studies-hero-proof-panel"
      className="case-hero-proof-panel relative min-h-[28rem] opacity-0 [perspective:1200px] motion-reduce:opacity-100 lg:mb-24 xl:mb-32"
    >
      <div className="pointer-events-none absolute -inset-5 rounded-[2.5rem] bg-[radial-gradient(circle_at_28%_22%,rgba(124,58,237,0.26),transparent_32%),radial-gradient(circle_at_78%_76%,rgba(232,48,207,0.14),transparent_28%)] blur-xl" />
      <div className="case-hero-proof-item case-hero-carousel-card case-hero-carousel-before absolute left-0 top-4 w-[74%] overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-3 opacity-0 shadow-[0_22px_80px_rgba(0,0,0,0.24)] [backface-visibility:hidden] [transform-style:preserve-3d] will-change-transform motion-reduce:opacity-100 sm:top-0">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[1.1rem] bg-white/6">
          <Image
            src={before.imageSrc}
            alt={before.imageAlt}
            fill
            sizes="(min-width: 1024px) 34vw, 72vw"
            className="object-cover object-top grayscale"
          />
          <div className="absolute inset-0 bg-nodo-black/8" />
        </div>
        <span className="mt-3 inline-flex rounded-full border border-white/12 bg-white/[0.055] px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.16em] text-white/54">
          Wix before
        </span>
      </div>

      <div className="case-hero-proof-item case-hero-carousel-card case-hero-carousel-after absolute bottom-0 right-0 w-[86%] overflow-hidden rounded-[1.75rem] border border-nodo-lavender/36 bg-white p-3 opacity-0 shadow-[0_28px_100px_rgba(124,58,237,0.28)] [backface-visibility:hidden] [transform-style:preserve-3d] will-change-transform motion-reduce:opacity-100">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[1.25rem] bg-white">
          <Image
            src={after.imageSrc}
            alt={after.imageAlt}
            fill
            priority
            sizes="(min-width: 1024px) 42vw, 86vw"
            className="object-cover object-top"
          />
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[0.65rem] font-black uppercase tracking-[0.18em] text-nodo-purple">
              Featured transformation
            </p>
            <p className="mt-1 text-sm font-black leading-5 text-nodo-black">
              PlasterPro Solution
            </p>
          </div>
          <span className="rounded-full bg-nodo-black px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-white">
            Nodo after
          </span>
        </div>
      </div>
    </div>
  );
}

export function CaseStudiesPage() {
  const { hero, featured, selectedWork, finalCta } = caseStudiesPageContent;
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const beforeCard = root.current?.querySelector<HTMLElement>(
          ".case-hero-carousel-before",
        );
        const afterCard = root.current?.querySelector<HTMLElement>(
          ".case-hero-carousel-after",
        );
        const proofPanel = root.current?.querySelector<HTMLElement>(
          ".case-hero-proof-panel",
        );

        if (!beforeCard || !afterCard || !proofPanel) {
          return;
        }

        const beforeBackState = {
          autoAlpha: 0.66,
          xPercent: 0,
          y: 0,
          scale: 0.82,
          rotation: -3,
          rotationY: -12,
          zIndex: 1,
        };
        const beforeFrontState = {
          autoAlpha: 1,
          xPercent: 20,
          y: 118,
          scale: 1.08,
          rotation: 1,
          rotationY: 0,
          zIndex: 4,
        };
        const afterFrontState = {
          autoAlpha: 1,
          xPercent: 0,
          y: 0,
          scale: 1,
          rotation: 0,
          rotationY: 0,
          zIndex: 4,
        };
        const afterBackState = {
          autoAlpha: 0.58,
          xPercent: -18,
          y: -92,
          scale: 0.78,
          rotation: -4,
          rotationY: -12,
          zIndex: 1,
        };

        gsap.set(".case-hero-eyebrow", { autoAlpha: 0, y: 18 });
        gsap.set(".case-hero-title", { autoAlpha: 1 });
        gsap.set(".case-hero-title-word", { yPercent: 112, rotation: 2 });
        gsap.set([".case-hero-copy", ".case-hero-chip"], {
          autoAlpha: 0,
          y: 18,
        });
        gsap.set(".case-hero-proof-panel", {
          autoAlpha: 0,
          x: 44,
          clipPath: "inset(0 0 0 100% round 2rem)",
        });
        gsap.set(".case-hero-proof-item", {
          autoAlpha: 0,
          x: 18,
          xPercent: 0,
          transformOrigin: "50% 50%",
          force3D: true,
        });

        const carouselTl = gsap.timeline({
          paused: true,
          repeat: -1,
          defaults: { ease: "power3.inOut", overwrite: "auto" },
        });

        carouselTl
          .to(afterCard, {
            xPercent: 1,
            y: -8,
            rotation: 0.35,
            duration: 3,
            ease: "sine.inOut",
          })
          .set(beforeCard, { zIndex: 5 })
          .set(afterCard, { zIndex: 2 }, "<")
          .to(
            beforeCard,
            {
              ...beforeFrontState,
              duration: 0.82,
            },
            "+=0.04",
          )
          .to(
            afterCard,
            {
              ...afterBackState,
              duration: 0.82,
            },
            "<",
          )
          .to(beforeCard, {
            xPercent: 21,
            y: 110,
            rotation: 1.35,
            duration: 3,
            ease: "sine.inOut",
          })
          .set(afterCard, { zIndex: 5 })
          .set(beforeCard, { zIndex: 2 }, "<")
          .to(
            afterCard,
            {
              ...afterFrontState,
              duration: 0.82,
            },
            "+=0.04",
          )
          .to(
            beforeCard,
            {
              ...beforeBackState,
              duration: 0.82,
            },
            "<",
          );

        const tl = gsap.timeline({
          paused: true,
          defaults: { ease: "power3.out" },
        });

        tl.to(".case-hero-eyebrow", {
          autoAlpha: 1,
          y: 0,
          duration: 0.58,
        })
          .to(
            ".case-hero-title-word",
            {
              yPercent: 0,
              rotation: 0,
              duration: 0.9,
              stagger: { each: 0.045, from: "start" },
            },
            "-=0.18",
          )
          .to(
            ".case-hero-copy",
            { autoAlpha: 1, y: 0, duration: 0.68 },
            "-=0.34",
          )
          .to(
            ".case-hero-chip",
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.46,
              stagger: 0.055,
            },
            "-=0.26",
          )
          .to(
            ".case-hero-proof-panel",
            {
              autoAlpha: 1,
              x: 0,
              clipPath: "inset(0 0 0 0% round 2rem)",
              duration: 0.86,
              clearProps: "clipPath",
            },
            0.48,
          )
          .to(
            ".case-hero-proof-item",
            {
              autoAlpha: 1,
              x: 0,
              duration: 0.48,
              stagger: 0.08,
            },
            "-=0.36",
          )
          .add(() => {
            gsap.set(beforeCard, beforeBackState);
            gsap.set(afterCard, afterFrontState);
            carouselTl.play(0);
          });

        const playIntro = () => {
          tl.play(0);
        };

        const pauseCarousel = () => carouselTl.pause();
        const resumeCarousel = () => carouselTl.resume();

        proofPanel.addEventListener("mouseenter", pauseCarousel);
        proofPanel.addEventListener("mouseleave", resumeCarousel);

        if (document.documentElement.dataset.nodoPreloaded === "true") {
          playIntro();
        } else {
          window.addEventListener("nodo:preloader-complete", playIntro, {
            once: true,
          });
        }

        return () => {
          window.removeEventListener("nodo:preloader-complete", playIntro);
          proofPanel.removeEventListener("mouseenter", pauseCarousel);
          proofPanel.removeEventListener("mouseleave", resumeCarousel);
          carouselTl.kill();
        };
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            ".case-hero-eyebrow",
            ".case-hero-title",
            ".case-hero-title-word",
            ".case-hero-copy",
            ".case-hero-chip",
            ".case-hero-proof-panel",
            ".case-hero-proof-item",
          ],
          {
            autoAlpha: 1,
            x: 0,
            xPercent: 0,
            y: 0,
            yPercent: 0,
            scale: 1,
            rotation: 0,
            rotationY: 0,
            clipPath: "none",
          },
        );
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <main ref={root} data-testid="case-studies-page-main" className="overflow-hidden bg-nodo-black">
      <section
        data-testid="case-studies-hero-section"
        className="relative flex min-h-screen overflow-hidden bg-nodo-black pt-28"
      >
        <ConstellationBackground
          className="opacity-55"
          density={0.72}
          fps={34}
          interactive
          maxDevicePixelRatio={1.5}
          maxNodes={64}
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.14),rgba(5,5,5,0.76))]" />
        <Container className="relative z-10 grid items-end gap-12 pb-16 pt-16 lg:grid-cols-[1fr_0.72fr]">
          <div data-testid="case-studies-hero-content">
            <p
              data-testid="case-studies-hero-eyebrow"
              className="case-hero-eyebrow mb-5 opacity-0 motion-reduce:opacity-100 text-sm font-black uppercase tracking-[0.24em] text-nodo-lavender"
            >
              {hero.eyebrow}
            </p>
            <h1
              data-testid="case-studies-hero-title"
              className="case-hero-title max-w-6xl opacity-0 motion-reduce:opacity-100 text-balance text-5xl font-black leading-[0.9] tracking-normal text-white sm:text-7xl lg:text-8xl"
            >
              {heroTitleWords.map((word, index) => (
                <span
                  key={`${word}-${index}`}
                  className="mb-[-0.22em] inline-block overflow-hidden pb-[0.22em] align-top"
                >
                  <span className="case-hero-title-word inline-block pr-[0.22em]">
                    {word}
                  </span>
                </span>
              ))}
            </h1>
            <p
              data-testid="case-studies-hero-copy"
              className="case-hero-copy mt-6 max-w-2xl opacity-0 motion-reduce:opacity-100 text-pretty text-lg leading-8 text-white/66"
            >
              {hero.copy}
            </p>
            <div
              data-testid="case-studies-hero-highlights"
              className="mt-8 flex flex-wrap gap-3"
            >
              {hero.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="case-hero-chip opacity-0 motion-reduce:opacity-100 rounded-full border border-white/12 bg-white/[0.055] px-4 py-2 text-sm font-semibold text-white/72"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>

          <HeroTransformationPanel />
        </Container>
      </section>

      <section
        data-testid="case-studies-featured-section"
        className="border-y border-white/10 py-20 sm:py-28"
      >
        <Container>
          <ScrollReveal>
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.24em] text-nodo-lavender">
                  {featured.eyebrow}
                </p>
                <h2
                  data-testid="case-studies-plasterpro-title"
                  className="mt-5 text-balance text-4xl font-black leading-[0.95] tracking-normal text-white sm:text-6xl"
                >
                  {featured.client}
                </h2>
                <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-white/42">
                  {featured.industry}
                </p>
                <p
                  data-testid="case-studies-plasterpro-summary"
                  className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-white/68"
                >
                  {featured.summary}
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {featured.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/12 bg-white/[0.055] px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-white/62"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-8">
                  <Button
                    href={featured.href}
                    target="_blank"
                    rel="noreferrer"
                    dataTestId="case-studies-plasterpro-live-site-button"
                    className="group"
                    icon={
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-4 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none"
                      />
                    }
                  >
                    View live site
                  </Button>
                </div>
              </div>

              <div className="grid gap-5">
                <div
                  data-testid="case-studies-plasterpro-headline-card"
                  className="rounded-[1.75rem] border border-nodo-lavender/32 bg-nodo-purple/20 p-6"
                >
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-nodo-lavender">
                    Website redesign
                  </p>
                  <h3 className="mt-4 text-balance text-3xl font-black leading-tight text-white sm:text-4xl">
                    {featured.headline}
                  </h3>
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  <article className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5">
                    <h3 className="text-xl font-black text-white">
                      {featured.challenge.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-white/64">
                      {featured.challenge.description}
                    </p>
                  </article>
                  <article className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5">
                    <h3 className="text-xl font-black text-white">
                      {featured.work.title}
                    </h3>
                    <ul className="mt-4 grid gap-3">
                      {featured.work.points.map((point) => (
                        <li key={point} className="flex gap-3 text-sm leading-6 text-white/66">
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-nodo-lavender" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            <ScrollReveal>
              <BrowserSlot {...featured.comparison.before} tone="before" />
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <BrowserSlot {...featured.comparison.after} tone="after" />
            </ScrollReveal>
          </div>

          <ScrollReveal>
            <div
              data-testid="case-studies-plasterpro-outcomes"
              className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              {featured.outcomes.map((outcome) => (
                <div
                  key={outcome}
                  className="rounded-[1.25rem] border border-white/10 bg-white/[0.045] p-5"
                >
                  <p className="text-sm font-semibold leading-6 text-white/74">
                    {outcome}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {showSelectedWorkSection ? (
        <section
          data-testid="case-studies-selected-work-section"
          className="bg-white py-20 text-nodo-black sm:py-28"
        >
          <Container>
            <ScrollReveal>
              <SectionHeading
                eyebrow={selectedWork.eyebrow}
                title={selectedWork.title}
                description={selectedWork.copy}
                surfaceTone="light"
              />
            </ScrollReveal>
            <div
              data-testid="case-studies-selected-work-grid"
              className="mt-12 grid gap-5 lg:grid-cols-3"
            >
              {caseStudyWorkCards.map((card, index) => {
                const Icon = card.icon;
                const slug = testIdSlug(card.title);

                return (
                  <ScrollReveal key={card.title} delay={index * 0.06} className="h-full">
                    <article
                      data-testid={`case-studies-work-card-${slug}`}
                      className="group flex h-full flex-col rounded-[1.75rem] border border-black/8 bg-[linear-gradient(145deg,#fbf9ff_0%,#ffffff_52%,#f8f4ff_100%)] p-6 shadow-[0_18px_60px_rgba(22,19,25,0.06)] transition duration-300 hover:-translate-y-1 hover:border-nodo-purple/45 hover:shadow-[0_20px_54px_rgba(124,58,237,0.16)]"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-black uppercase tracking-[0.18em] text-nodo-purple">
                            {card.eyebrow}
                          </p>
                          <h3 className="mt-4 text-3xl font-black tracking-normal text-nodo-black">
                            {card.title}
                          </h3>
                        </div>
                        <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-black/8 bg-nodo-black text-white shadow-[0_12px_34px_rgba(0,0,0,0.16)]">
                          <Icon aria-hidden="true" className="size-5" />
                        </span>
                      </div>
                      <p className="mt-5 text-pretty text-base leading-7 text-nodo-ink/68">
                        {card.description}
                      </p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {card.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-black/8 bg-black/[0.035] px-3 py-1.5 text-xs font-bold text-nodo-ink/62"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      {card.href && card.ctaLabel ? (
                        <div className="mt-auto pt-8">
                          <Button
                            href={card.href}
                            target="_blank"
                            rel="noreferrer"
                            variant="inverted"
                            dataTestId={`case-studies-work-card-${slug}-button`}
                            className="w-full justify-between"
                            icon={<ArrowUpRight aria-hidden="true" className="size-4" />}
                          >
                            {card.ctaLabel}
                          </Button>
                        </div>
                      ) : null}
                    </article>
                  </ScrollReveal>
                );
              })}
            </div>
          </Container>
        </section>
      ) : null}

      <section
        data-testid="case-studies-final-cta-section"
        className="bg-nodo-purple py-20 text-white sm:py-28"
      >
        <Container>
          <ScrollReveal>
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="mb-5 text-sm font-black uppercase tracking-[0.24em] text-white/70">
                  {finalCta.eyebrow}
                </p>
                <h2 className="max-w-4xl text-balance text-4xl font-black leading-[0.95] tracking-normal sm:text-6xl">
                  {finalCta.title}
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-white/72">
                  {finalCta.copy}
                </p>
              </div>
              <Button
                href="/contact?intent=project&source=case-studies-final"
                variant="inverted"
                dataTestId="case-studies-final-button"
              >
                Talk about your project
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </main>
  );
}
