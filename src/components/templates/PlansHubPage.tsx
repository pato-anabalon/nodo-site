"use client";

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDownRight } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { ConstellationBackground } from '@/components/atoms/ConstellationBackground';
import { Container } from '@/components/atoms/Container';
import { MetaChip } from '@/components/atoms/MetaChip';
import { ScrollReveal } from '@/components/atoms/ScrollReveal';
import { SectionHeading } from '@/components/atoms/SectionHeading';
import { plansHubCards, plansHubContent } from '@/lib/content';
import { testIdSlug } from '@/lib/utils';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const plansHubHeroTitleWords = plansHubContent.hero.title.split(' ');
const heroChipAccents = ['purple', 'lavender', 'pink'] as const;

export function PlansHubPage() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set('.plans-hub-hero-title-word', { yPercent: 135 });
        gsap.set('.plans-hub-hero-title', { autoAlpha: 1 });
        gsap.set(
          [
            '.plans-hub-hero-eyebrow',
            '.plans-hub-hero-copy',
            '.plans-hub-hero-chip',
            '.plans-hub-video-frame',
          ],
          {
            autoAlpha: 0,
            y: 22,
          },
        );
        gsap.set('.plans-hub-video-glow', { autoAlpha: 0, scale: 0.92 });
        gsap.set('.plans-hub-path-line', { scaleX: 0, transformOrigin: 'left center' });
        gsap.set('.plans-hub-path-node', { autoAlpha: 0, scale: 0.4 });
        gsap.set('.plans-hub-path-card', { autoAlpha: 0, y: 34 });

        const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        heroTl
          .to('.plans-hub-hero-eyebrow', { autoAlpha: 1, y: 0, duration: 0.65 })
          .to('.plans-hub-hero-title-word', { yPercent: 0, duration: 0.9, stagger: 0.075 }, '-=0.18')
          .to('.plans-hub-hero-copy', { autoAlpha: 1, y: 0, duration: 0.72 }, '-=0.18')
          .to('.plans-hub-hero-chip', { autoAlpha: 1, y: 0, duration: 0.56, stagger: 0.07 }, '-=0.24')
          .to('.plans-hub-video-glow', { autoAlpha: 1, scale: 1, duration: 0.75 }, '-=0.5')
          .to('.plans-hub-video-frame', { autoAlpha: 1, y: 0, duration: 0.82 }, '-=0.52');

        const pathTl = gsap.timeline({
          scrollTrigger: {
            trigger: '[data-testid="plans-hub-positioning-section"]',
            start: 'top 72%',
            once: true,
          },
          defaults: { ease: 'power3.out' },
        });

        pathTl
          .to('.plans-hub-path-line', { scaleX: 1, duration: 0.95 })
          .to('.plans-hub-path-node', { autoAlpha: 1, scale: 1, duration: 0.42, stagger: 0.12 }, '-=0.62')
          .to('.plans-hub-path-card', { autoAlpha: 1, y: 0, duration: 0.72, stagger: 0.1 }, '-=0.22');
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(
          [
            '.plans-hub-hero-eyebrow',
            '.plans-hub-hero-title',
            '.plans-hub-hero-title-word',
            '.plans-hub-hero-copy',
            '.plans-hub-hero-chip',
            '.plans-hub-video-frame',
            '.plans-hub-video-glow',
            '.plans-hub-path-line',
            '.plans-hub-path-node',
            '.plans-hub-path-card',
          ],
          {
            autoAlpha: 1,
            y: 0,
            yPercent: 0,
            scale: 1,
            scaleX: 1,
            rotation: 0,
          },
        );
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <main ref={root} data-testid="plans-page-main" className="overflow-hidden bg-nodo-black">
      <section
        data-testid="plans-hub-hero-section"
        className="relative flex min-h-screen overflow-hidden bg-nodo-black pt-28"
      >
        <ConstellationBackground
          className="opacity-42"
          density={0.62}
          fps={36}
          interactive
          maxDevicePixelRatio={1.5}
          maxNodes={54}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(124,58,237,0.2),transparent_30%),radial-gradient(circle_at_80%_28%,rgba(232,48,207,0.08),transparent_24%)]" />
        <Container className="relative z-10 grid items-center gap-12 pb-16 pt-12 lg:grid-cols-[0.95fr_0.9fr]">
          <div data-testid="plans-hub-hero-content">
            <p
              data-testid="plans-hub-hero-eyebrow"
              className="plans-hub-hero-eyebrow opacity-0 motion-reduce:opacity-100 mb-5 text-sm font-black uppercase tracking-[0.24em] text-nodo-lavender"
            >
              {plansHubContent.hero.eyebrow}
            </p>
            <h1
              data-testid="plans-hub-hero-title"
              className="plans-hub-hero-title opacity-0 motion-reduce:opacity-100 max-w-5xl text-balance text-5xl font-black leading-[0.9] tracking-normal text-white sm:text-7xl lg:text-8xl"
            >
              {plansHubHeroTitleWords.map((word, index) => (
                <span
                  key={`${word}-${index}`}
                  className="mb-[-0.22em] inline-block overflow-hidden pb-[0.22em] align-top"
                >
                  <span className="plans-hub-hero-title-word inline-block pr-[0.22em]">{word}</span>
                </span>
              ))}
            </h1>
            <p
              data-testid="plans-hub-hero-copy"
              className="plans-hub-hero-copy opacity-0 motion-reduce:opacity-100 mt-6 max-w-2xl text-pretty text-lg leading-8 text-white/62"
            >
              {plansHubContent.hero.copy}
            </p>
            <div data-testid="plans-hub-hero-highlights" className="mt-8 flex flex-wrap gap-3">
              {plansHubContent.hero.highlights.map((highlight, index) => {
                const chip = (
                  <MetaChip
                    accent={heroChipAccents[index % heroChipAccents.length]}
                    className="plans-hub-hero-chip opacity-0 motion-reduce:opacity-100"
                    dataTestId={`plans-hub-hero-highlight-${testIdSlug(highlight)}`}
                    tone="dark"
                  >
                    {highlight}
                  </MetaChip>
                );

                return highlight === "Bundles" ? (
                  <span key={highlight} className="hidden sm:inline-flex">
                    {chip}
                  </span>
                ) : (
                  <span key={highlight}>{chip}</span>
                );
              })}
            </div>
          </div>

          <div className="relative" data-testid="plans-hub-hero-video-card">
            <div className="plans-hub-video-glow pointer-events-none absolute -inset-4 rounded-[2.5rem] bg-[radial-gradient(circle_at_30%_20%,rgba(124,58,237,0.24),transparent_34%),radial-gradient(circle_at_78%_80%,rgba(232,48,207,0.14),transparent_30%)] blur-xl" />
            <div className="plans-hub-video-frame opacity-0 motion-reduce:opacity-100 relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.045] p-3 shadow-[0_30px_110px_rgba(0,0,0,0.32)]">
              <video
                className="aspect-[4/5] w-full rounded-[1.45rem] object-cover sm:aspect-[5/4] lg:aspect-[4/5]"
                src="/videos/plans-optimized.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                data-testid="plans-hub-hero-video"
              />
              <div className="pointer-events-none absolute inset-3 rounded-[1.45rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(5,5,5,0.24))]" />
            </div>
          </div>
        </Container>
      </section>

      <section
        data-testid="plans-hub-positioning-section"
        className="border-y border-black/8 bg-white py-18 text-nodo-black sm:py-24"
      >
        <Container>
          <ScrollReveal>
            <div>
              <SectionHeading
                eyebrow={plansHubContent.positioning.eyebrow}
                title={plansHubContent.positioning.title}
                description={plansHubContent.positioning.copy}
                className="max-w-5xl [&_h2]:text-nodo-black [&_p]:text-nodo-ink/68"
              />
              <div data-testid="plans-hub-path-rail" className="relative mt-10 hidden h-10 items-center lg:flex">
                <div className="plans-hub-path-line h-px w-full bg-nodo-purple/24" />
                <div className="absolute inset-x-0 flex items-center justify-between">
                  {plansHubCards.map((card) => (
                    <span
                      key={card.href}
                      data-testid={`plans-hub-path-node-${card.title
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/^-|-$/g, '')}`}
                      className="plans-hub-path-node size-3 rounded-full border border-nodo-purple/40 bg-white shadow-[0_0_22px_rgba(124,58,237,0.32)]"
                    />
                  ))}
                </div>
              </div>
              <div className="mt-12 grid items-stretch gap-4 lg:grid-cols-3" data-testid="plans-hub-card-grid">
                {plansHubCards.map((card) => {
                  const Icon = card.icon;

                  return (
                    <article
                      key={card.href}
                      data-testid={`plans-hub-card-${card.title
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/^-|-$/g, '')}`}
                      className="plans-hub-path-card group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-black/8 bg-black/[0.025] p-5 shadow-[0_18px_60px_rgba(22,19,25,0.06)] transition duration-300 hover:-translate-y-1 hover:border-nodo-purple/55 hover:bg-white hover:shadow-[0_18px_44px_rgba(124,58,237,0.18)] sm:p-6"
                    >
                      <Icon
                        aria-hidden="true"
                        data-testid={`plans-hub-card-${card.title
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, '-')
                          .replace(/^-|-$/g, '')}-background-icon`}
                        className="pointer-events-none absolute -right-3 top-0 z-0 size-28 text-nodo-purple/[0.10] transition duration-300 group-hover:text-nodo-purple/[0.16] sm:size-32"
                      />
                      <div className="relative z-10 flex h-full flex-col">
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-nodo-purple">
                          {card.eyebrow}
                        </p>
                        <h3 className="mt-2 text-2xl font-black text-nodo-black">{card.title}</h3>
                        <p className="mt-5 text-sm leading-6 text-nodo-ink/68">{card.description}</p>
                        <Button
                          href={card.href}
                          variant="primary"
                          surfaceTone="light"
                          dataTestId={`plans-hub-card-${card.title
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, '-')
                            .replace(/^-|-$/g, '')}-button`}
                          className="mt-12"
                          icon={<ArrowDownRight aria-hidden="true" className="size-4" />}
                        >
                          {card.ctaLabel}
                        </Button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <section data-testid="plans-hub-final-cta-section" className="bg-nodo-purple py-20 text-white sm:py-28">
        <Container>
          <ScrollReveal>
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="mb-5 text-sm font-black uppercase tracking-[0.24em] text-white/70">
                  {plansHubContent.finalCta.eyebrow}
                </p>
                <h2 className="max-w-4xl text-balance text-4xl font-black leading-[0.95] tracking-normal sm:text-6xl">
                  {plansHubContent.finalCta.title}
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-white/72">{plansHubContent.finalCta.copy}</p>
              </div>
              <Button
                href="/contact?intent=discovery-call&source=plans-hub-final"
                variant="inverted"
                dataTestId="plans-hub-final-button"
              >
                Book a discovery call
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </main>
  );
}
