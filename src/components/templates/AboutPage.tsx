'use client';

import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, BadgeCheck, Compass, Target } from 'lucide-react';
import { ConstellationBackground } from '@/components/atoms/ConstellationBackground';
import { Container } from '@/components/atoms/Container';
import { MetaChip } from '@/components/atoms/MetaChip';
import { ScrollReveal } from '@/components/atoms/ScrollReveal';
import { SectionHeading } from '@/components/atoms/SectionHeading';
import { AboutClientFocusButton } from '@/components/molecules/AboutClientFocusButton';
import { AboutPhilosophyCard } from '@/components/molecules/AboutPhilosophyCard';
import { AboutValueSignalCard } from '@/components/molecules/AboutValueSignalCard';
import { TrackedCtaButton } from '@/components/molecules/TrackedCtaButton';
import { aboutPageContent } from '@/lib/content';
import { testIdSlug } from '@/lib/utils';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const missionIcons = [Target, Compass, BadgeCheck] as const;
const CLIENT_ROTATION_MS = 2000;

function MissionIcon({ index }: { index: number }) {
  const Icon = missionIcons[index % missionIcons.length];

  return <Icon aria-hidden="true" className="size-5" />;
}

function AboutValuesSignal() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: '(min-width: 1024px)',
          reduceMotion: '(prefers-reduced-motion: reduce)'
        },
        (context) => {
          const { desktop, reduceMotion } = context.conditions ?? {};
          const items = Array.from(root.current?.querySelectorAll<HTMLElement>('.about-value-signal-item') ?? []);
          const navItems = Array.from(root.current?.querySelectorAll<HTMLElement>('.about-value-nav-item') ?? []);
          const navMarkers = Array.from(root.current?.querySelectorAll<HTMLElement>('.about-value-nav-marker') ?? []);

          if (!desktop || reduceMotion || items.length < 2) {
            gsap.set(items, {
              autoAlpha: 1,
              clearProps: 'position,inset,transform'
            });
            gsap.set(navItems, { opacity: 1 });
            gsap.set(navMarkers, { scaleX: 1 });
            return;
          }

          gsap.set(items, { autoAlpha: 0 });
          gsap.set(items[0], { autoAlpha: 1 });
          gsap.set(navItems, { opacity: 0.32 });
          gsap.set(navItems[0], { opacity: 1 });
          gsap.set(navMarkers, { scaleX: 0, transformOrigin: 'left center' });
          gsap.set(navMarkers[0], { scaleX: 1 });

          const timeline = gsap.timeline({
            defaults: { ease: 'power3.out' },
            scrollTrigger: {
              trigger: root.current,
              start: 'top top',
              end: () => `+=${window.innerHeight * 4.2}`,
              pin: true,
              scrub: 0.75,
              anticipatePin: 1,
              invalidateOnRefresh: true
            }
          });

          items.slice(1).forEach((item, index) => {
            const previousItem = items[index];
            const previousParts = previousItem.querySelectorAll(
              '.about-value-signal-icon, .about-value-signal-number, .about-value-signal-title, .about-value-signal-copy'
            );
            const nextIcon = item.querySelector('.about-value-signal-icon');
            const nextNumber = item.querySelector('.about-value-signal-number');
            const nextTitle = item.querySelector('.about-value-signal-title');
            const nextCopy = item.querySelector('.about-value-signal-copy');
            const nextBackdrop = item.querySelector('.about-value-signal-backdrop');
            const position = index * 1.15;

            timeline
              .to(
                previousParts,
                {
                  autoAlpha: 0,
                  y: -34,
                  duration: 0.34,
                  stagger: 0.025,
                  ease: 'power2.in'
                },
                position
              )
              .to(previousItem, { autoAlpha: 0, duration: 0.16 }, position + 0.3)
              .set(item, { autoAlpha: 1 }, position + 0.4)
              .fromTo(
                nextBackdrop,
                { autoAlpha: 0, scale: 0.86, rotation: -4 },
                { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.72 },
                position + 0.4
              )
              .fromTo(
                nextIcon,
                { autoAlpha: 0, scale: 0.7, rotation: -12 },
                { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.52 },
                position + 0.46
              )
              .fromTo(nextNumber, { autoAlpha: 0, x: -22 }, { autoAlpha: 1, x: 0, duration: 0.4 }, position + 0.5)
              .fromTo(nextTitle, { autoAlpha: 0, y: 52 }, { autoAlpha: 1, y: 0, duration: 0.58 }, position + 0.56)
              .fromTo(nextCopy, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.48 }, position + 0.68)
              .to(navItems[index], { opacity: 0.32, duration: 0.18 }, position + 0.38)
              .to(navMarkers[index], { scaleX: 0, duration: 0.18 }, position + 0.38)
              .to(navItems[index + 1], { opacity: 1, duration: 0.28 }, position + 0.48)
              .to(navMarkers[index + 1], { scaleX: 1, duration: 0.42 }, position + 0.48);
          });
        }
      );

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      data-testid="about-values-section"
      aria-labelledby="about-values-heading"
      className="relative overflow-hidden bg-nodo-black py-20 text-white sm:py-28 lg:min-h-[100svh] lg:py-0"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(124,58,237,0.14),transparent_34%),linear-gradient(300deg,rgba(232,48,207,0.08),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-nodo-purple/70 to-transparent" />
      <Container className="relative grid gap-12 lg:min-h-[100svh] lg:grid-cols-[0.72fr_1.5fr_0.58fr] lg:items-center lg:gap-10">
        <header className="lg:self-center">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-nodo-lavender">Our values</p>
          <h2
            id="about-values-heading"
            className="mt-5 max-w-md text-balance text-4xl font-black leading-[0.94] tracking-normal sm:text-5xl"
          >
            The standards behind the work.
          </h2>
          <p className="mt-6 max-w-sm text-base leading-7 text-white/58">
            Seven principles guide how Nodo thinks, builds, communicates, and supports every project.
          </p>
        </header>

        <div data-testid="about-values-signal-stage" className="relative grid gap-4 lg:min-h-[36rem]">
          {aboutPageContent.values.map((value, index) => {
            return (
              <AboutValueSignalCard
                key={value.name}
                index={index}
                total={aboutPageContent.values.length}
                value={value}
              />
            );
          })}
        </div>

        <ol aria-label="Value sequence" className="hidden gap-4 lg:grid">
          {aboutPageContent.values.map((value, index) => (
            <li key={value.name} className="about-value-nav-item grid grid-cols-[2rem_1fr] items-center gap-3">
              <span className="text-xs font-black text-nodo-lavender">{String(index + 1).padStart(2, '0')}</span>
              <span>
                <span className="block text-sm font-bold text-white">{value.name}</span>
                <span className="mt-2 block h-px overflow-hidden bg-white/10">
                  <span className="about-value-nav-marker block h-full w-full bg-gradient-to-r from-nodo-purple to-nodo-pink" />
                </span>
              </span>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function AboutClientsLoop() {
  const root = useRef<HTMLElement>(null);
  const panel = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReduceMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);

    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    const section = root.current;

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.25 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || isPaused || reduceMotion) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % aboutPageContent.clients.length);
    }, CLIENT_ROTATION_MS);

    return () => window.clearInterval(interval);
  }, [isPaused, isVisible, reduceMotion]);

  useGSAP(
    () => {
      if (!panel.current) {
        return;
      }

      if (reduceMotion) {
        gsap.set(panel.current, { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.killTweensOf(panel.current);
      gsap.fromTo(
        panel.current,
        { autoAlpha: 0, y: 34 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.48,
          ease: 'power3.out',
          overwrite: true
        }
      );
    },
    {
      dependencies: [activeIndex, reduceMotion],
      scope: root
    }
  );

  if (reduceMotion) {
    return (
      <section
        ref={root}
        data-testid="about-clients-section"
        className="bg-[linear-gradient(180deg,#ffffff_0%,#f8f5ff_100%)] py-20 text-nodo-black sm:py-28"
      >
        <Container>
          <SectionHeading
            eyebrow="Our clients"
            title="Built for practical businesses with real-world customers."
            description="Nodo primarily works with service-led businesses that need trust, clarity, and a professional digital presence."
            surfaceTone="light"
          />
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {aboutPageContent.clients.map((client) => {
              const Icon = client.icon;

              return (
                <div
                  key={client.name}
                  data-testid={`about-client-${testIdSlug(client.name)}`}
                  className="flex items-center gap-4 rounded-lg border border-black/8 bg-white p-5 shadow-[0_16px_48px_rgba(22,19,25,0.06)]"
                >
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-nodo-purple/10 text-nodo-purple">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <span className="text-sm font-bold leading-6 text-nodo-ink/76">{client.name}</span>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    );
  }

  const activeClient = aboutPageContent.clients[activeIndex];

  return (
    <section
      ref={root}
      data-testid="about-clients-section"
      aria-labelledby="about-clients-heading"
      className="bg-[linear-gradient(180deg,#ffffff_0%,#f8f5ff_100%)] py-20 text-nodo-black sm:py-28"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <ScrollReveal>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-nodo-purple">Our clients</p>
              <h2
                id="about-clients-heading"
                className="mt-5 max-w-xl text-balance text-4xl font-black leading-[0.94] tracking-normal sm:text-6xl"
              >
                Built for practical businesses with real-world customers.
              </h2>
              <p className="mt-6 max-w-lg text-lg leading-8 text-nodo-ink/64">
                Nodo primarily works with service-led businesses that need trust, clarity, and a professional digital
                presence.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div
              data-testid="about-clients-focus-loop"
              className="relative overflow-hidden rounded-lg border border-nodo-purple/16 bg-white shadow-[0_28px_90px_rgba(124,58,237,0.12)]"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onFocusCapture={() => setIsPaused(true)}
              onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setIsPaused(false);
                }
              }}
            >
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-nodo-purple via-nodo-lavender to-nodo-pink" />
              <div className="grid lg:grid-cols-[1fr_15rem]">
                <div className="relative min-h-[25rem] overflow-hidden p-7 sm:p-9">
                  <div className="pointer-events-none absolute right-3 top-0 text-[10rem] font-black leading-none text-nodo-purple/[0.055] sm:text-[13rem]">
                    {String(activeIndex + 1).padStart(2, '0')}
                  </div>

                  <article
                    ref={panel}
                    key={activeClient.name}
                    data-testid={`about-client-panel-${testIdSlug(activeClient.name)}`}
                    className="absolute inset-7 flex flex-col justify-center sm:inset-9"
                  >
                    <h3 className="max-w-xl text-balance text-4xl font-black leading-[0.92] tracking-normal text-nodo-black sm:text-6xl">
                      {activeClient.name}
                    </h3>
                    <p className="mt-6 max-w-lg text-base leading-7 text-nodo-ink/62 sm:text-lg sm:leading-8">
                      {activeClient.description}
                    </p>
                  </article>
                </div>

                <div className="border-t border-black/8 bg-[#fbf9ff] p-4 lg:border-l lg:border-t-0">
                  <p className="px-3 pb-3 text-xs font-black uppercase tracking-[0.18em] text-nodo-ink/42">
                    Client focus
                  </p>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-5 px-2 pb-2 lg:grid-cols-1 lg:gap-y-4">
                    {aboutPageContent.clients.map((client, index) => {
                      return (
                        <AboutClientFocusButton
                          key={client.name}
                          dataTestId={`about-client-${testIdSlug(client.name)}`}
                          icon={client.icon}
                          isActive={activeIndex === index}
                          isPaused={isPaused}
                          label={client.name}
                          onClick={() => setActiveIndex(index)}
                          progressDurationMs={CLIENT_ROTATION_MS}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}

export function AboutPage() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set(
          [
            '.about-hero-kicker',
            '.about-hero-title',
            '.about-hero-copy',
            '.about-hero-chip',
            '.about-hero-cta',
            '.about-hero-media'
          ],
          { autoAlpha: 0, y: 28 }
        );
        gsap.set('.about-hero-media', { scale: 0.96 });

        const tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });

        tl.to('.about-hero-kicker', { autoAlpha: 1, y: 0, duration: 0.6 })
          .to('.about-hero-title', { autoAlpha: 1, y: 0, duration: 0.9 }, '-=0.18')
          .to('.about-hero-copy', { autoAlpha: 1, y: 0, duration: 0.7 }, '-=0.35')
          .to('.about-hero-chip', { autoAlpha: 1, y: 0, duration: 0.48, stagger: 0.06 }, '-=0.22')
          .to('.about-hero-cta', { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.07 }, '-=0.18')
          .to('.about-hero-media', { autoAlpha: 1, y: 0, scale: 1, duration: 0.85 }, '-=0.82');

        const playIntro = () => {
          tl.play(0);
        };

        if (document.documentElement.dataset.nodoPreloaded === 'true') {
          playIntro();
        } else {
          window.addEventListener('nodo:preloader-complete', playIntro, { once: true });
        }

        return () => {
          window.removeEventListener('nodo:preloader-complete', playIntro);
        };
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(
          [
            '.about-hero-kicker',
            '.about-hero-title',
            '.about-hero-copy',
            '.about-hero-chip',
            '.about-hero-cta',
            '.about-hero-media'
          ],
          { autoAlpha: 1, y: 0, scale: 1 }
        );
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <main ref={root} data-testid="about-page-main" className="overflow-hidden bg-nodo-black">
      <section
        data-testid="about-hero-section"
        className="relative min-h-screen overflow-hidden bg-nodo-black pt-28 text-white"
      >
        <ConstellationBackground
          className="opacity-46"
          density={0.76}
          fps={36}
          interactive
          maxDevicePixelRatio={1.5}
          maxNodes={58}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(124,58,237,0.2),transparent_30%),radial-gradient(circle_at_78%_26%,rgba(232,48,207,0.12),transparent_26%)]" />
        <Container className="relative z-10 grid min-h-[calc(100vh-7rem)] items-center gap-12 pb-16 pt-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="about-hero-kicker mb-5 text-sm font-black uppercase tracking-[0.24em] text-nodo-lavender opacity-0 motion-reduce:opacity-100">
              {aboutPageContent.hero.eyebrow}
            </p>
            <h1
              data-testid="about-hero-heading"
              className="about-hero-title max-w-5xl text-balance text-5xl font-black leading-[0.9] tracking-normal opacity-0 motion-reduce:opacity-100 sm:text-7xl lg:text-8xl"
            >
              {aboutPageContent.hero.title}
            </h1>
            <p className="about-hero-copy mt-7 max-w-2xl text-pretty text-lg leading-8 text-white/64 opacity-0 motion-reduce:opacity-100 sm:text-xl">
              {aboutPageContent.hero.copy}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {aboutPageContent.hero.highlights.map((highlight, index) => (
                <MetaChip
                  key={highlight}
                  accent={index === 1 ? 'lavender' : index === 2 ? 'pink' : 'purple'}
                  className="about-hero-chip opacity-0 motion-reduce:opacity-100"
                  dataTestId={`about-hero-highlight-${testIdSlug(highlight)}`}
                  tone="dark"
                >
                  {highlight}
                </MetaChip>
              ))}
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <TrackedCtaButton
                href="/contact?source=about-hero"
                label={aboutPageContent.hero.primaryCta}
                location="about_hero"
                route="/about"
                dataTestId="about-hero-primary-button"
                className="about-hero-cta opacity-0 motion-reduce:opacity-100"
              >
                {aboutPageContent.hero.primaryCta}
              </TrackedCtaButton>
              <TrackedCtaButton
                href="/case-studies"
                label={aboutPageContent.hero.secondaryCta}
                location="about_hero"
                route="/about"
                variant="secondary"
                dataTestId="about-hero-secondary-button"
                className="about-hero-cta opacity-0 motion-reduce:opacity-100"
              >
                {aboutPageContent.hero.secondaryCta}
              </TrackedCtaButton>
            </div>
          </div>

          <div
            data-testid="about-hero-media"
            className="about-hero-media relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.045] p-3 opacity-0 shadow-[0_30px_100px_rgba(0,0,0,0.32)] motion-reduce:opacity-100"
          >
            <video
              className="aspect-[4/5] w-full rounded-[1.55rem] object-cover"
              src="/videos/team-discussion-optimized.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              data-testid="about-hero-video"
            />
            <div className="absolute inset-x-8 bottom-8 rounded-3xl border border-white/20 bg-nodo-black/78 px-5 py-4 backdrop-blur-md">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-nodo-lavender">Connect. Build. Grow.</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-white/72">
                Clear direction, practical execution, and digital foundations designed to keep improving.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section
        data-testid="about-story-section"
        className="border-y border-black/8 bg-white py-20 text-nodo-black sm:py-28"
      >
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <ScrollReveal>
              <SectionHeading
                eyebrow={aboutPageContent.story.eyebrow}
                title={aboutPageContent.story.title}
                description={aboutPageContent.story.copy}
                surfaceTone="light"
                headingLevel="h2"
              />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="rounded-[2.1rem] bg-[linear-gradient(135deg,rgba(124,58,237,0.68),rgba(232,48,207,0.34),rgba(196,181,253,0.2))] p-px shadow-[0_30px_100px_rgba(124,58,237,0.16)]">
                <div className="relative overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_18%_18%,rgba(124,58,237,0.18),transparent_32%),radial-gradient(circle_at_88%_76%,rgba(232,48,207,0.14),transparent_30%),linear-gradient(145deg,#ffffff_0%,#f8f5ff_42%,#efe7ff_100%)] p-6 sm:p-8">
                  <p className="relative text-pretty text-2xl font-black leading-tight text-nodo-black sm:text-4xl">
                    Businesses do not always need more marketing. They need a stronger foundation.
                  </p>
                  <p className="relative mt-6 text-lg leading-8 text-nodo-ink/68">{aboutPageContent.story.support}</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <section data-testid="about-philosophy-section" className="bg-nodo-black py-20 text-white sm:py-28">
        <Container>
          <ScrollReveal>
            <SectionHeading
              eyebrow={aboutPageContent.philosophy.eyebrow}
              title={aboutPageContent.philosophy.title}
              description={aboutPageContent.positioning.copy}
              className="max-w-5xl"
            />
          </ScrollReveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {aboutPageContent.philosophy.steps.map((step, index) => (
              <ScrollReveal key={step.word} delay={index * 0.06}>
                <AboutPhilosophyCard index={index} step={step} />
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <section
        data-testid="about-mission-section"
        className="bg-[linear-gradient(180deg,#ffffff_0%,#f8f5ff_100%)] py-20 text-nodo-black sm:py-28"
      >
        <Container>
          <div className="grid gap-5 lg:grid-cols-3">
            {aboutPageContent.missionVision.map((item, index) => (
              <ScrollReveal key={item.label} delay={index * 0.06}>
                <article
                  data-testid={`about-${testIdSlug(item.label)}-card`}
                  className="relative h-full overflow-hidden rounded-lg border border-black/8 bg-white p-6 shadow-[0_24px_80px_rgba(22,19,25,0.08)] transition-shadow duration-300 hover:shadow-[0_28px_90px_color-mix(in_oklab,var(--nodo-purple)_32%,transparent)]"
                >
                  <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-nodo-purple via-nodo-lavender to-nodo-pink" />
                  <div className="flex items-start justify-between gap-5 lg:min-h-44">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-nodo-purple">{item.label}</p>
                      <h3 className="mt-5 text-2xl font-black leading-tight text-nodo-black">{item.title}</h3>
                    </div>
                    <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-nodo-purple/10 text-nodo-purple">
                      <MissionIcon index={index} />
                    </span>
                  </div>
                  <p className="mt-5 border-t border-black/8 pt-5 text-base leading-7 text-nodo-ink/68">{item.copy}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <AboutValuesSignal />

      <section
        data-testid="about-services-section"
        className="border-y border-black/8 bg-[linear-gradient(180deg,#ffffff_0%,#f7f2ff_100%)] py-20 text-nodo-black sm:py-28"
      >
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <ScrollReveal>
              <SectionHeading
                eyebrow="What we do"
                title="Strategy, design, and communication in one direction."
                description="Nodo combines the foundations a business needs to look credible, communicate clearly, and keep improving after launch."
                surfaceTone="light"
              />
            </ScrollReveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {aboutPageContent.services.map((service, index) => {
                const Icon = service.icon;

                return (
                  <ScrollReveal key={service.title} delay={index * 0.05}>
                    <article
                      data-testid={`about-service-${testIdSlug(service.title)}`}
                      className="h-full rounded-lg border border-black/8 bg-white p-5 shadow-[0_18px_60px_rgba(22,19,25,0.07)]"
                    >
                      <span className="inline-flex size-11 items-center justify-center rounded-full bg-nodo-purple/10 text-nodo-purple">
                        <Icon aria-hidden="true" className="size-5" />
                      </span>
                      <h3 className="mt-6 text-xl font-black leading-tight text-nodo-black">{service.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-nodo-ink/68">{service.description}</p>
                    </article>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <AboutClientsLoop />

      <section data-testid="about-final-cta-section" className="bg-nodo-purple py-20 text-white sm:py-28">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="mb-5 text-sm font-black uppercase tracking-[0.24em] text-white/70">
                {aboutPageContent.closing.eyebrow}
              </p>
              <h2 className="max-w-4xl text-balance text-4xl font-black leading-[0.95] tracking-normal sm:text-6xl">
                {aboutPageContent.closing.title}
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/72">{aboutPageContent.closing.copy}</p>
            </div>
            <TrackedCtaButton
              href="/contact?source=about-final"
              label={aboutPageContent.closing.cta}
              location="about_final"
              route="/about"
              dataTestId="about-final-primary-button"
              variant="secondary"
              surfaceTone="purple"
              icon={<ArrowUpRight aria-hidden="true" className="size-4" />}
            >
              {aboutPageContent.closing.cta}
            </TrackedCtaButton>
          </div>
        </Container>
      </section>
    </main>
  );
}
