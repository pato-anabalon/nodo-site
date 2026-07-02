'use client';

import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/atoms/Container';
import { SectionHeading } from '@/components/atoms/SectionHeading';
import { ProcessStep } from '@/components/molecules/ProcessStep';
import { processSteps } from '@/lib/content';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function ProcessSection() {
  const root = useRef<HTMLElement>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [shouldRenderVideo, setShouldRenderVideo] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduceMotion: '(prefers-reduced-motion: reduce)'
        },
        (context) => {
          const { reduceMotion } = context.conditions ?? {};

          if (reduceMotion) {
            gsap.set('.process-step', { autoAlpha: 1, y: 0 });
            return;
          }

          gsap.from('.process-step', {
            autoAlpha: 0,
            y: 44,
            duration: 0.8,
            stagger: 0.14,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: root.current,
              start: 'top 70%',
              once: true
            }
          });
        }
      );

      return () => mm.revert();
    },
    { scope: root }
  );

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 1024px)');
    const updateVideoRendering = () => {
      setShouldRenderVideo(desktopQuery.matches);
    };

    updateVideoRendering();

    desktopQuery.addEventListener('change', updateVideoRendering);

    return () => {
      desktopQuery.removeEventListener('change', updateVideoRendering);
    };
  }, []);

  useEffect(() => {
    let frameId = 0;

    const updateActiveStep = () => {
      window.cancelAnimationFrame(frameId);

      frameId = window.requestAnimationFrame(() => {
        const steps = Array.from(root.current?.querySelectorAll<HTMLElement>('.process-step') ?? []);

        if (!steps.length) {
          return;
        }

        const activationLine = window.innerHeight * 0.58;
        let nextIndex = 0;
        let closestDistance = Number.POSITIVE_INFINITY;

        steps.forEach((step, index) => {
          const rect = step.getBoundingClientRect();
          const center = rect.top + rect.height / 2;
          const distance = Math.abs(center - activationLine);

          if (distance < closestDistance) {
            closestDistance = distance;
            nextIndex = index;
          }
        });

        setActiveStepIndex((currentIndex) => (currentIndex === nextIndex ? currentIndex : nextIndex));
      });
    };

    updateActiveStep();

    window.addEventListener('scroll', updateActiveStep, { passive: true });
    window.addEventListener('resize', updateActiveStep);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', updateActiveStep);
      window.removeEventListener('resize', updateActiveStep);
    };
  }, []);

  return (
    <section
      ref={root}
      data-testid="home-process-section"
      className="overflow-hidden bg-white py-24 text-nodo-black sm:py-32"
    >
      <Container>
        <div data-testid="home-process-layout" className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
          <div data-testid="home-process-intro-column" className="relative flex">
            <div data-testid="home-process-intro-panel" className="flex h-full w-full flex-col">
              <p
                data-testid="home-process-eyebrow"
                className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-nodo-purple"
              >
                How we work
              </p>
              <h2
                data-testid="home-process-title"
                className="text-balance text-4xl font-black leading-[0.95] tracking-normal sm:text-6xl"
              >
                A clear path from idea to momentum.
              </h2>
              <p data-testid="home-process-description" className="mt-6 max-w-xl text-lg leading-8 text-nodo-ink/68">
                We keep the process simple: understand what matters, shape the direction, launch the work, and keep
                improving around real customer response.
              </p>
              {shouldRenderVideo ? (
                <div
                  data-testid="home-process-video-frame"
                  className="mt-10 min-h-72 flex-1 overflow-hidden rounded-[1.75rem] border border-black/8 bg-nodo-black shadow-[0_24px_80px_rgba(22,19,25,0.14)]"
                >
                  <video
                    data-testid="home-process-video"
                    className="h-full min-h-72 w-full object-cover"
                    src="/videos/how-we-work.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    onLoadedMetadata={() => window.dispatchEvent(new Event('resize'))}
                  />
                </div>
              ) : null}
            </div>
          </div>
          <div
            data-testid="home-process-steps-panel"
            className="flex h-full flex-col rounded-[2rem] bg-nodo-black px-5 py-4 sm:px-8 sm:py-8"
          >
            <SectionHeading eyebrow="Working rhythm" title="Four moves. Clear outputs." className="mb-8 shrink-0" />
            <div data-testid="home-process-steps-list" className="flex flex-1 flex-col justify-between gap-2">
              {processSteps.map((step, index) => (
                <ProcessStep
                  key={step.title}
                  {...step}
                  index={index}
                  isActive={index === activeStepIndex}
                  isLast={index === processSteps.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
