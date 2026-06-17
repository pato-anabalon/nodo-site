import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  CircleHelp,
  Gauge,
  MapPin,
  MessageSquareText,
  MonitorSmartphone,
  Search,
  ShieldCheck,
} from "lucide-react";
import { ConstellationBackground } from "@/components/atoms/ConstellationBackground";
import { Container } from "@/components/atoms/Container";
import { MetaChip } from "@/components/atoms/MetaChip";
import { NodoLogo } from "@/components/atoms/NodoLogo";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { TrackedCtaButton } from "@/components/molecules/TrackedCtaButton";
import { websiteDesignAucklandPageContent } from "@/lib/content";
import { cn, testIdSlug } from "@/lib/utils";

const iconMap = [ShieldCheck, Search, MessageSquareText];
const heroChipAccents = ["purple", "lavender", "pink"] as const;
const introPointIconMap = [MessageSquareText, ShieldCheck, ArrowRight];
const processStepGradientClasses = [
  "bg-[linear-gradient(135deg,#f4fbff_0%,#ffffff_35%,#f1ecff_68%,#fff7fb_100%)]",
  "bg-[linear-gradient(135deg,#fff8fb_0%,#ffffff_36%,#eef7ff_66%,#f4efff_100%)]",
  "bg-[linear-gradient(135deg,#f8fff9_0%,#ffffff_34%,#f3efff_64%,#f8f4ff_100%)]",
  "bg-[linear-gradient(135deg,#fffdf5_0%,#ffffff_34%,#eef7ff_65%,#f7f1ff_100%)]",
];
const includedIconMap = [
  MonitorSmartphone,
  MessageSquareText,
  ShieldCheck,
  Gauge,
  Search,
  CheckCircle2,
  Gauge,
  ArrowRight,
];
const includedFeatureMeta = [
  {
    label: "Plan",
    className: "sm:col-span-2 lg:col-span-2",
    gradient:
      "bg-[linear-gradient(135deg,rgba(124,58,237,0.28),rgba(255,255,255,0.075)_42%,rgba(232,48,207,0.16))]",
  },
  {
    label: "Content",
    gradient:
      "bg-[linear-gradient(135deg,rgba(232,48,207,0.18),rgba(255,255,255,0.065)_46%,rgba(124,58,237,0.14))]",
  },
  {
    label: "Design",
    gradient:
      "bg-[linear-gradient(135deg,rgba(196,181,253,0.20),rgba(255,255,255,0.06)_42%,rgba(124,58,237,0.16))]",
  },
  {
    label: "Build",
    className: "sm:col-span-2 lg:col-span-2",
    gradient:
      "bg-[linear-gradient(135deg,rgba(124,58,237,0.22),rgba(255,255,255,0.07)_38%,rgba(79,70,229,0.16))]",
  },
  {
    label: "SEO",
    gradient:
      "bg-[linear-gradient(135deg,rgba(255,255,255,0.07),rgba(124,58,237,0.17)_52%,rgba(232,48,207,0.10))]",
  },
  {
    label: "Enquiry",
    gradient:
      "bg-[linear-gradient(135deg,rgba(232,48,207,0.14),rgba(255,255,255,0.06)_48%,rgba(196,181,253,0.18))]",
  },
  {
    label: "Speed",
    gradient:
      "bg-[linear-gradient(135deg,rgba(196,181,253,0.16),rgba(255,255,255,0.065)_44%,rgba(124,58,237,0.18))]",
  },
  {
    label: "Launch",
    gradient:
      "bg-[linear-gradient(135deg,rgba(124,58,237,0.18),rgba(255,255,255,0.065)_42%,rgba(232,48,207,0.16))]",
  },
];
const faqCardGradientClasses = [
  "bg-[linear-gradient(145deg,#ffffff_0%,#fbf8ff_48%,#efe8ff_100%)]",
  "bg-[linear-gradient(145deg,#ffffff_0%,#f8fbff_46%,#f4eaff_100%)]",
  "bg-[linear-gradient(145deg,#fffafd_0%,#ffffff_46%,#eeeaff_100%)]",
  "bg-[linear-gradient(145deg,#ffffff_0%,#fbf7ff_44%,#eef6ff_100%)]",
];

export function WebsiteDesignAucklandPage() {
  const content = websiteDesignAucklandPageContent;

  return (
    <main data-testid="website-design-auckland-page-main" className="overflow-hidden bg-nodo-black">
      <section
        data-testid="website-design-auckland-hero-section"
        className="relative overflow-hidden bg-nodo-black pt-24 sm:pt-28 lg:pt-28"
      >
        <ConstellationBackground
          className="opacity-42"
          density={0.72}
          fps={36}
          interactive
          maxDevicePixelRatio={1.5}
          maxNodes={64}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(124,58,237,0.2),transparent_28%),radial-gradient(circle_at_78%_20%,rgba(232,48,207,0.08),transparent_22%),linear-gradient(180deg,rgba(5,5,5,0.12),rgba(5,5,5,0.82))]" />
        <Container className="relative z-10 grid min-h-[calc(100svh-6rem)] items-center gap-10 pb-12 pt-8 sm:min-h-[calc(100svh-7rem)] sm:pb-14 sm:pt-10 lg:min-h-[40rem] lg:grid-cols-[1fr_0.82fr] lg:gap-12 lg:pb-16 lg:pt-8 xl:min-h-[42rem]">
          <div data-testid="website-design-auckland-hero-content" className="max-w-4xl">
            <p className="mb-4 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-nodo-lavender sm:text-sm">
              <MapPin aria-hidden="true" className="size-4" />
              {content.hero.eyebrow}
            </p>
            <h1
              data-testid="website-design-auckland-hero-title"
              className="text-balance text-4xl font-black leading-[0.92] tracking-normal text-white sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              {content.hero.title}
            </h1>
            <p
              data-testid="website-design-auckland-hero-subtitle"
              className="mt-5 max-w-3xl text-pretty text-lg font-semibold leading-8 text-white/76 sm:text-xl"
            >
              {content.hero.subtitle}
            </p>
            <p
              data-testid="website-design-auckland-hero-copy"
              className="mt-4 max-w-2xl text-pretty text-base leading-7 text-white/58 sm:text-lg sm:leading-8"
            >
              {content.hero.copy}
            </p>
            <div data-testid="website-design-auckland-hero-highlights" className="mt-6 flex flex-wrap gap-3">
              {content.hero.highlights.map((highlight, index) => (
                <MetaChip
                  key={highlight}
                  accent={heroChipAccents[index % heroChipAccents.length]}
                  dataTestId={`website-design-auckland-hero-highlight-${testIdSlug(highlight)}`}
                  tone="dark"
                >
                  {highlight}
                </MetaChip>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <TrackedCtaButton
                href="/contact?service=website-design-auckland&source=website-design-auckland-hero"
                label="Talk about a website"
                location="website_design_auckland_hero"
                route="/services/website-design-auckland"
                dataTestId="website-design-auckland-hero-primary-button"
              >
                Talk about a website
              </TrackedCtaButton>
              <TrackedCtaButton
                href="/plans/websites"
                label="View website plans"
                location="website_design_auckland_hero"
                route="/services/website-design-auckland"
                variant="secondary"
                dataTestId="website-design-auckland-hero-secondary-button"
              >
                View website plans
              </TrackedCtaButton>
            </div>
          </div>

          <div
            data-testid="website-design-auckland-hero-proof"
            className="relative mx-auto w-full max-w-lg self-center lg:max-w-[31rem] lg:justify-self-end xl:max-w-[34rem]"
          >
            <div className="absolute -inset-6 rounded-full bg-nodo-purple/18 blur-3xl" />
            <div className="relative overflow-hidden rounded-[1.6rem] border border-white/12 bg-white/[0.06] p-2.5 shadow-[0_24px_80px_rgba(0,0,0,0.34)] backdrop-blur-md sm:rounded-[1.85rem] sm:p-3">
              <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2.5">
                <span className="size-2 rounded-full bg-white/38" />
                <span className="size-2 rounded-full bg-nodo-lavender/74" />
                <span className="size-2 rounded-full bg-nodo-purple" />
                <span className="ml-2 truncate rounded-full bg-white/8 px-3 py-1 text-[0.68rem] font-semibold text-white/46">
                  plasterprosolution.co.nz
                </span>
              </div>
              <Image
                src={content.proof.imageSrc}
                alt={content.proof.imageAlt}
                width={1446}
                height={894}
                priority
                sizes="(min-width: 1024px) 38vw, 88vw"
                className="aspect-[1.42] w-full rounded-[1.2rem] object-cover object-top sm:rounded-[1.45rem]"
              />
            </div>
          </div>
        </Container>
      </section>

      <section
        data-testid="website-design-auckland-intro-section"
        className="border-y border-black/8 bg-white py-18 text-nodo-black sm:py-24"
      >
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <ScrollReveal>
              <SectionHeading
                eyebrow={content.intro.eyebrow}
                title={content.intro.title}
                description={content.intro.copy}
                surfaceTone="light"
                className="max-w-4xl"
              />
            </ScrollReveal>
            <div className="grid gap-4">
              {content.intro.points.map((point, index) => {
                const IntroIcon = introPointIconMap[index] ?? MessageSquareText;

                return (
                  <ScrollReveal key={point} delay={index * 0.05}>
                    <article
                      data-testid={`website-design-auckland-intro-point-${index + 1}`}
                      className="group relative overflow-hidden rounded-[1.55rem] border border-black/8 bg-[linear-gradient(145deg,#ffffff_0%,#fbf8ff_45%,#f2ecff_100%)] p-5 shadow-[0_14px_34px_rgba(17,12,28,0.05)] transition duration-300 hover:-translate-y-0.5 hover:border-nodo-purple/45 hover:shadow-[0_22px_54px_rgba(124,58,237,0.16)] sm:p-6"
                    >
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(124,58,237,0.16),transparent_32%),radial-gradient(circle_at_82%_78%,rgba(232,48,207,0.10),transparent_28%)] opacity-70 transition duration-300 group-hover:opacity-100" />
                      <p
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-1 top-[82%] z-0 -translate-y-1/2 text-[5rem] font-black leading-none tracking-normal text-nodo-purple/[0.10] transition duration-300 group-hover:text-nodo-purple/[0.16]"
                      >
                        0{index + 1}
                      </p>
                      <div className="relative z-10 grid gap-4 sm:grid-cols-[3.25rem_1fr]">
                        <div className="inline-flex size-12 items-center justify-center rounded-2xl border border-nodo-purple/18 bg-white/72 text-nodo-purple shadow-[0_12px_28px_rgba(124,58,237,0.12)] transition duration-300 group-hover:border-nodo-purple/34 group-hover:bg-nodo-purple group-hover:text-white group-hover:shadow-[0_16px_34px_rgba(124,58,237,0.24)]">
                          <IntroIcon aria-hidden="true" className="size-5" />
                        </div>
                        <div>
                          <p className="text-xs font-black uppercase tracking-[0.18em] text-nodo-purple/72">
                            Decision point {index + 1}
                          </p>
                          <p className="mt-2 text-pretty text-base font-semibold leading-7 text-nodo-ink/76 sm:text-lg">
                            {point}
                          </p>
                        </div>
                      </div>
                    </article>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <section
        data-testid="website-design-auckland-problems-section"
        className="py-20 sm:py-28"
      >
        <Container>
          <ScrollReveal>
            <SectionHeading
              eyebrow={content.problems.eyebrow}
              title={content.problems.title}
              className="max-w-4xl"
            />
          </ScrollReveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {content.problems.items.map((item, index) => {
              const Icon = iconMap[index] ?? ShieldCheck;

              return (
                <ScrollReveal key={item.title} delay={index * 0.05} className="h-full">
                  <article
                    data-testid={`website-design-auckland-problem-${testIdSlug(item.title)}`}
                    className="group relative h-full overflow-hidden rounded-[1.75rem] border border-white/12 bg-white/[0.045] p-6 transition duration-300 hover:-translate-y-1 hover:border-nodo-purple/55 hover:bg-white/[0.065] hover:shadow-[0_18px_54px_rgba(124,58,237,0.18)]"
                  >
                    <div className="mb-10 inline-flex size-12 items-center justify-center rounded-2xl bg-nodo-purple text-white shadow-[0_0_32px_rgba(124,58,237,0.36)]">
                      <Icon aria-hidden="true" className="size-5" />
                    </div>
                    <h2 className="text-2xl font-black tracking-normal text-white">
                      {item.title}
                    </h2>
                    <p className="mt-4 text-pretty text-base leading-7 text-white/64">
                      {item.copy}
                    </p>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section
        data-testid="website-design-auckland-process-section"
        className="border-y border-black/8 bg-white py-20 text-nodo-black sm:py-28"
      >
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <ScrollReveal>
              <SectionHeading
                eyebrow={content.process.eyebrow}
                title={content.process.title}
                surfaceTone="light"
                className="lg:sticky lg:top-32"
              />
            </ScrollReveal>
            <div className="grid gap-4">
              {content.process.steps.map((step, index) => {
                const stepNumber = String(index + 1).padStart(2, "0");

                return (
                  <ScrollReveal key={step.title} delay={index * 0.04}>
                    <article
                      data-testid={`website-design-auckland-process-step-${index + 1}`}
                      className={cn(
                        "group relative overflow-hidden rounded-[1.6rem] border border-black/8 bg-[length:170%_170%] bg-[position:0%_50%] p-6 shadow-[0_14px_36px_rgba(17,12,28,0.06)] transition-[transform,box-shadow,border-color,background-position] duration-500 hover:-translate-y-0.5 hover:border-nodo-purple/45 hover:bg-[position:100%_50%] hover:shadow-[0_24px_60px_rgba(124,58,237,0.16)] motion-reduce:transform-none sm:p-7",
                        processStepGradientClasses[index % processStepGradientClasses.length],
                      )}
                    >
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(124,58,237,0.13),transparent_32%),radial-gradient(circle_at_84%_76%,rgba(232,48,207,0.08),transparent_28%)] opacity-70 transition duration-300 group-hover:opacity-100" />
                      <p
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-3 bottom-[-0.19em] z-0 text-[8rem] font-black leading-none tracking-normal text-nodo-purple/[0.08] transition duration-500 group-hover:translate-x-[-0.08em] group-hover:text-nodo-purple/[0.14] sm:text-[10rem]"
                      >
                        {stepNumber}
                      </p>
                      <div className="relative z-10 max-w-2xl">
                        <p className="inline-flex rounded-full border border-nodo-purple/16 bg-white/64 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-nodo-purple/74 shadow-[0_10px_24px_rgba(124,58,237,0.08)]">
                          Step {stepNumber}
                        </p>
                        <h2 className="mt-5 text-2xl font-black tracking-normal text-nodo-black sm:text-3xl">
                          {step.title}
                        </h2>
                        <p className="mt-3 text-base leading-7 text-nodo-ink/70">
                          {step.copy}
                        </p>
                      </div>
                    </article>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <section
        data-testid="website-design-auckland-included-section"
        className="relative overflow-hidden py-20 sm:py-28"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(124,58,237,0.22),transparent_28%),radial-gradient(circle_at_86%_18%,rgba(232,48,207,0.10),transparent_24%),radial-gradient(circle_at_52%_88%,rgba(196,181,253,0.12),transparent_30%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/22 to-transparent" />
        <Container className="relative z-10">
          <ScrollReveal>
            <SectionHeading
              eyebrow={content.included.eyebrow}
              title={content.included.title}
              className="max-w-4xl"
            />
          </ScrollReveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {content.included.items.map((item, index) => {
              const Icon = includedIconMap[index] ?? CheckCircle2;
              const featureMeta = includedFeatureMeta[index] ?? includedFeatureMeta[0];
              const featureNumber = String(index + 1).padStart(2, "0");

              return (
                <ScrollReveal key={item} delay={index * 0.025} className={cn("h-full", featureMeta.className)}>
                  <article
                    data-testid={`website-design-auckland-included-${testIdSlug(item)}`}
                    className={cn(
                      "group relative min-h-[13rem] overflow-hidden rounded-[1.55rem] border border-white/12 bg-[length:160%_160%] bg-[position:0%_50%] p-5 shadow-[0_18px_46px_rgba(0,0,0,0.18)] transition-[transform,box-shadow,border-color,background-position] duration-500 hover:-translate-y-1 hover:border-nodo-lavender/42 hover:bg-[position:100%_50%] hover:shadow-[0_26px_70px_rgba(124,58,237,0.22)] motion-reduce:transform-none sm:p-6",
                      featureMeta.gradient,
                    )}
                  >
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.16),transparent_26%),radial-gradient(circle_at_82%_78%,rgba(124,58,237,0.16),transparent_28%)] opacity-70 transition duration-300 group-hover:opacity-100" />
                    <div className="pointer-events-none absolute right-5 top-5 size-2 rounded-full bg-nodo-lavender shadow-[0_0_22px_rgba(196,181,253,0.78)] transition duration-300 group-hover:scale-125 group-hover:bg-white" />
                    <div className="pointer-events-none absolute right-6 top-6 h-px w-16 origin-right bg-gradient-to-l from-nodo-lavender/60 to-transparent opacity-30 transition duration-300 group-hover:w-24 group-hover:opacity-70" />
                    <p
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-2 bottom-[-0.2em] text-[6.5rem] font-black leading-none tracking-normal text-white/[0.055] transition duration-500 group-hover:translate-x-[-0.06em] group-hover:text-white/[0.095]"
                    >
                      {featureNumber}
                    </p>
                    <div className="relative z-10 flex h-full flex-col justify-between gap-8">
                      <div className="flex items-start justify-between gap-4">
                        <div className="inline-flex size-12 items-center justify-center rounded-2xl border border-white/14 bg-white/10 text-nodo-lavender shadow-[0_14px_34px_rgba(0,0,0,0.14)] transition duration-300 group-hover:-rotate-3 group-hover:scale-105 group-hover:bg-nodo-purple group-hover:text-white group-hover:shadow-[0_18px_42px_rgba(124,58,237,0.28)]">
                          <Icon aria-hidden="true" className="size-5" />
                        </div>
                        <p className="rounded-full border border-white/12 bg-white/[0.08] px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.18em] text-white/50">
                          {featureMeta.label}
                        </p>
                      </div>
                      <div>
                        <p className="text-base font-black leading-7 text-white sm:text-lg">
                          {item}
                        </p>
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section
        data-testid="website-design-auckland-proof-section"
        className="border-y border-black/8 bg-white py-20 text-nodo-black sm:py-28"
      >
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.92fr] lg:items-center">
            <ScrollReveal>
              <div className="overflow-hidden rounded-[2rem] border border-black/8 bg-black/[0.035] p-3 shadow-[0_28px_80px_rgba(22,19,25,0.10)]">
                <Image
                  src={content.proof.imageSrc}
                  alt={content.proof.imageAlt}
                  width={1446}
                  height={894}
                  sizes="(min-width: 1024px) 48vw, 92vw"
                  className="aspect-[1.28] w-full rounded-[1.5rem] object-cover object-top"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div>
                <p className="text-sm font-black uppercase tracking-[0.24em] text-nodo-purple">
                  {content.proof.eyebrow}
                </p>
                <h2 className="mt-5 text-balance text-4xl font-black leading-[0.95] tracking-normal text-nodo-black sm:text-6xl">
                  {content.proof.title}
                </h2>
                <p className="mt-6 text-pretty text-lg leading-8 text-nodo-ink/68">
                  {content.proof.copy}
                </p>
                <ul className="mt-7 grid gap-3">
                  {content.proof.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-base leading-7 text-nodo-ink/72">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-nodo-purple" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <TrackedCtaButton
                    href={content.proof.href}
                    label={content.proof.ctaLabel}
                    location="website_design_auckland_proof"
                    route="/services/website-design-auckland"
                    variant="inverted"
                    dataTestId="website-design-auckland-proof-button"
                  >
                    {content.proof.ctaLabel}
                  </TrackedCtaButton>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <section
        data-testid="website-design-auckland-plans-section"
        className="py-20 sm:py-28"
      >
        <Container>
          <ScrollReveal>
            <div className="grid gap-8 rounded-[2rem] border border-white/12 bg-white/[0.045] p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-end lg:p-10">
              <div>
                <p className="mb-5 text-sm font-black uppercase tracking-[0.24em] text-nodo-lavender">
                  {content.plans.eyebrow}
                </p>
                <h2 className="max-w-4xl text-balance text-4xl font-black leading-[0.95] tracking-normal text-white sm:text-6xl">
                  {content.plans.title}
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-white/66">
                  {content.plans.copy}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <TrackedCtaButton
                  href="/plans/websites"
                  label={content.plans.primaryCta}
                  location="website_design_auckland_plans"
                  route="/services/website-design-auckland"
                  dataTestId="website-design-auckland-plans-primary-button"
                >
                  {content.plans.primaryCta}
                </TrackedCtaButton>
                <TrackedCtaButton
                  href="/contact?service=website-design-auckland&source=website-design-auckland-plans"
                  label={content.plans.secondaryCta}
                  location="website_design_auckland_plans"
                  route="/services/website-design-auckland"
                  variant="secondary"
                  dataTestId="website-design-auckland-plans-secondary-button"
                >
                  {content.plans.secondaryCta}
                </TrackedCtaButton>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <section
        data-testid="website-design-auckland-faq-section"
        className="relative overflow-hidden border-y border-black/8 bg-[linear-gradient(180deg,#ffffff_0%,#fbf8ff_48%,#ffffff_100%)] py-20 text-nodo-black sm:py-28"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(124,58,237,0.12),transparent_28%),radial-gradient(circle_at_84%_16%,rgba(232,48,207,0.07),transparent_24%)]" />
        <Container className="relative z-10">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Questions"
              title="Website design questions Auckland businesses often ask."
              surfaceTone="light"
              className="max-w-4xl"
            />
          </ScrollReveal>
          <div className="mt-12 grid gap-4 lg:grid-cols-4">
            {content.faq.map((item, index) => {
              const cardNumber = String(index + 1).padStart(2, "0");

              return (
                <ScrollReveal key={item.question} delay={index * 0.04} className="h-full">
                  <article
                    aria-describedby={`website-design-auckland-faq-answer-${index + 1}`}
                    aria-labelledby={`website-design-auckland-faq-question-${index + 1}`}
                    data-testid={`website-design-auckland-faq-${index + 1}`}
                    tabIndex={0}
                    className={cn(
                      "group relative h-full min-h-[18rem] overflow-hidden rounded-[1.65rem] border border-black/8 bg-[length:150%_150%] bg-[position:0%_50%] p-5 shadow-[0_16px_42px_rgba(17,12,28,0.07)] transition-[transform,box-shadow,border-color,background-position] duration-300 hover:-translate-y-1 hover:border-nodo-purple/38 hover:bg-[position:100%_50%] hover:shadow-[0_24px_62px_rgba(124,58,237,0.16)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-nodo-purple motion-reduce:transform-none sm:p-6 lg:min-h-[22rem] lg:[perspective:1000px]",
                      faqCardGradientClasses[index % faqCardGradientClasses.length],
                    )}
                  >
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute right-3 top-5 text-nodo-purple/[0.035] opacity-35 transition duration-300 group-hover:-rotate-3 group-hover:scale-105 group-hover:text-nodo-purple/[0.05] group-hover:opacity-45"
                    >
                      <NodoLogo markOnly className="scale-[3.15]" />
                    </div>
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(124,58,237,0.12),transparent_28%),radial-gradient(circle_at_88%_82%,rgba(232,48,207,0.08),transparent_28%)] opacity-70 transition duration-300 group-hover:opacity-100" />
                    <p
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-[-0.18em] right-3 z-0 text-[6rem] font-black leading-none tracking-normal text-nodo-purple/[0.07] transition duration-300 group-hover:text-nodo-purple/[0.12]"
                    >
                      {cardNumber}
                    </p>
                    <div className="relative z-10 flex h-full flex-col">
                      <div className="flex items-start justify-between gap-4">
                        <p className="rounded-full border border-nodo-purple/16 bg-white/58 px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.18em] text-nodo-purple/72">
                          FAQ {cardNumber}
                        </p>
                        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-2xl border border-nodo-purple/14 bg-white/64 text-nodo-purple shadow-[0_12px_26px_rgba(124,58,237,0.10)] transition duration-300 group-hover:rotate-6 group-hover:bg-nodo-purple group-hover:text-white group-focus-visible:rotate-6 group-focus-visible:bg-nodo-purple group-focus-visible:text-white">
                          <CircleHelp aria-hidden="true" className="size-5" />
                        </span>
                      </div>
                      <div className="mt-8 transition duration-300 lg:group-hover:-translate-y-2 lg:group-focus-visible:-translate-y-2">
                        <h2
                          id={`website-design-auckland-faq-question-${index + 1}`}
                          className="text-balance text-xl font-black leading-tight tracking-normal text-nodo-black lg:text-2xl"
                        >
                          {item.question}
                        </h2>
                      </div>
                      <p
                        id={`website-design-auckland-faq-answer-${index + 1}`}
                        className="mt-5 text-sm font-semibold leading-7 text-nodo-ink/70 transition duration-300 lg:translate-y-3 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-visible:translate-y-0 lg:group-focus-visible:opacity-100"
                      >
                        {item.answer}
                      </p>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section
        data-testid="website-design-auckland-final-cta-section"
        className="bg-nodo-purple py-20 text-white sm:py-28"
      >
        <Container>
          <ScrollReveal>
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="mb-5 text-sm font-black uppercase tracking-[0.24em] text-white/70">
                  {content.finalCta.eyebrow}
                </p>
                <h2 className="max-w-4xl text-balance text-4xl font-black leading-[0.95] tracking-normal sm:text-6xl">
                  {content.finalCta.title}
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-white/72">
                  {content.finalCta.copy}
                </p>
              </div>
              <TrackedCtaButton
                href="/contact?service=website-design-auckland&source=website-design-auckland-final"
                label="Start the conversation"
                location="website_design_auckland_final"
                route="/services/website-design-auckland"
                variant="inverted"
                dataTestId="website-design-auckland-final-button"
              >
                Start the conversation
              </TrackedCtaButton>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </main>
  );
}
