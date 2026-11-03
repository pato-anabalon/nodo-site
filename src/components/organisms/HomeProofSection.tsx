'use client';

import Image from 'next/image';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent
} from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, Pause, Play } from 'lucide-react';
import { Container } from '@/components/atoms/Container';
import { ScrollReveal } from '@/components/atoms/ScrollReveal';
import { TrackedCtaButton } from '@/components/molecules/TrackedCtaButton';
import { homeProofContent, type HomeProofSlide } from '@/lib/content';
import { cn } from '@/lib/utils';

gsap.registerPlugin(useGSAP);

const AUTOPLAY_MS = 6000;
const TRANSITION_MS = 900;
// Distance between slide centres, as a fraction of the slide width.
const SLIDE_SPAN = 0.88;
const DRAG_THRESHOLD_PX = 6;

type DepthMode = 'desktop' | 'mobile' | 'flat';

const depthSettings: Record<DepthMode, { rotateY: number; zDepth: number; scaleDrop: number; blurMax: number }> = {
  desktop: { rotateY: 34, zDepth: 180, scaleDrop: 0.1, blurMax: 2 },
  mobile: { rotateY: 18, zDepth: 90, scaleDrop: 0.08, blurMax: 1.5 },
  flat: { rotateY: 0, zDepth: 0, scaleDrop: 0.06, blurMax: 0 }
};

const reducedMotionQuery = '(prefers-reduced-motion: reduce)';
const mobileQuery = '(max-width: 767px)';

function subscribeToDepthMode(onChange: () => void) {
  const queries = [window.matchMedia(reducedMotionQuery), window.matchMedia(mobileQuery)];
  queries.forEach((query) => query.addEventListener('change', onChange));

  return () => queries.forEach((query) => query.removeEventListener('change', onChange));
}

function readDepthMode(): DepthMode {
  if (window.matchMedia(reducedMotionQuery).matches) {
    return 'flat';
  }

  return window.matchMedia(mobileQuery).matches ? 'mobile' : 'desktop';
}

function mod(value: number, length: number) {
  return ((value % length) + length) % length;
}

function slideOffset(index: number, position: number, length: number) {
  let offset = index - position;

  while (offset > length / 2) offset -= length;
  while (offset < -length / 2) offset += length;

  return offset;
}

function slideStyle(offset: number, mode: DepthMode) {
  const depth = depthSettings[mode];
  const distance = Math.abs(offset);

  return {
    transform: `translate(-50%, -50%) translate3d(${(offset * SLIDE_SPAN * 100).toFixed(3)}%, 0, ${(
      -distance * depth.zDepth
    ).toFixed(1)}px) rotateY(${(-offset * depth.rotateY).toFixed(2)}deg) scale(${(
      1 - Math.min(distance * depth.scaleDrop, 0.3)
    ).toFixed(4)})`,
    filter: depth.blurMax ? `blur(${Math.min(distance * depth.blurMax, depth.blurMax).toFixed(2)}px)` : 'none',
    // Slides fade out before they wrap from one side to the other.
    opacity: Math.max(0, Math.min(1, 1 - (distance - 1) * 2)),
    zIndex: 100 - Math.round(distance * 10),
    parallax: offset,
    zoom: 1 + Math.min(distance, 1) * 0.14
  };
}

function easeOutQuart(progress: number) {
  return 1 - Math.pow(1 - progress, 4);
}

function ProofSlideCard({ slide, isActive }: { slide: HomeProofSlide; isActive: boolean }) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-[1.75rem] border border-black/8 bg-[linear-gradient(145deg,#fbf9ff_0%,#ffffff_48%,#f5f0ff_100%)] p-3 transition-shadow duration-700',
        isActive ? 'shadow-[0_36px_90px_rgba(22,19,25,0.2)]' : 'shadow-[0_18px_50px_rgba(22,19,25,0.1)]'
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-black/8 px-3 py-3">
        <div className="flex gap-2" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-nodo-purple/70" />
          <span className="size-2.5 rounded-full bg-nodo-lavender" />
          <span className="size-2.5 rounded-full bg-nodo-black/18" />
        </div>
        <span className="truncate rounded-full border border-black/8 bg-white/70 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-nodo-ink/64">
          {slide.client}
        </span>
      </div>
      <div className="relative mt-3 aspect-[16/10] overflow-hidden rounded-[1.25rem] bg-white">
        <div className="absolute inset-0 [transform:translateX(calc(var(--slide-parallax,0)*-7%))_scale(var(--slide-zoom,1))]">
          <Image
            src={slide.image.src}
            alt={slide.image.alt}
            fill
            draggable={false}
            sizes="(min-width: 768px) 64vw, 84vw"
            className="object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
}

export function HomeProofSection() {
  const { eyebrow, title, slides } = homeProofContent;
  const slideCount = slides.length;
  const depthMode = useSyncExternalStore(subscribeToDepthMode, readDepthMode, (): DepthMode => 'desktop');
  const [activeIndex, setActiveIndex] = useState(0);
  // The text panel and pagination follow the target slide as soon as a transition starts.
  const [panelIndex, setPanelIndex] = useState(0);
  const [isUserPaused, setIsUserPaused] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const positionRef = useRef(0);
  const animationRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const elapsedRef = useRef(0);
  const hasChangedRef = useRef(false);
  const pauseReasonsRef = useRef({ hover: false, focus: false, offscreen: true, user: false });
  const dragRef = useRef({
    pointerId: -1,
    startX: 0,
    startPosition: 0,
    moved: false,
    lastX: 0,
    lastTime: 0,
    velocity: 0
  });
  const canAutoplay = depthMode !== 'flat';
  const isAutoplaying = canAutoplay && !isUserPaused;
  const activeSlide = slides[panelIndex];

  const paint = useCallback(
    (position: number) => {
      slideRefs.current.forEach((element, index) => {
        if (!element) {
          return;
        }

        const style = slideStyle(slideOffset(index, position, slideCount), depthMode);
        element.style.transform = style.transform;
        element.style.filter = style.filter;
        element.style.opacity = String(style.opacity);
        element.style.zIndex = String(style.zIndex);
        element.style.setProperty('--slide-parallax', style.parallax.toFixed(3));
        element.style.setProperty('--slide-zoom', style.zoom.toFixed(3));
      });
    },
    [depthMode, slideCount]
  );

  const goTo = useCallback(
    (target: number) => {
      window.cancelAnimationFrame(animationRef.current);

      const start = positionRef.current;
      let delta = mod(target, slideCount) - mod(Math.round(start), slideCount);
      if (delta > slideCount / 2) delta -= slideCount;
      if (delta < -slideCount / 2) delta += slideCount;
      const end = Math.round(start) + delta;
      const duration = depthMode === 'flat' ? 0 : TRANSITION_MS;
      const startedAt = performance.now();

      hasChangedRef.current = true;
      isAnimatingRef.current = true;
      setPanelIndex(mod(end, slideCount));
      elapsedRef.current = 0;

      const step = (now: number) => {
        const progress = duration ? Math.min(1, (now - startedAt) / duration) : 1;
        positionRef.current = start + (end - start) * easeOutQuart(progress);
        paint(positionRef.current);

        if (progress < 1) {
          animationRef.current = window.requestAnimationFrame(step);
          return;
        }

        positionRef.current = mod(end, slideCount);
        isAnimatingRef.current = false;
        paint(positionRef.current);
        setActiveIndex(positionRef.current);
      };

      animationRef.current = window.requestAnimationFrame(step);
    },
    [depthMode, paint, slideCount]
  );

  useEffect(() => {
    paint(positionRef.current);
  }, [paint]);

  useEffect(() => {
    pauseReasonsRef.current.user = isUserPaused;
  }, [isUserPaused]);

  // Autoplay with a progress bar; pauses on hover, focus, off-screen, hidden tab, drag, or by choice.
  useEffect(() => {
    if (!canAutoplay) {
      return;
    }

    let frame = 0;
    let previous = performance.now();
    const tick = (now: number) => {
      const reasons = pauseReasonsRef.current;
      const isPaused =
        reasons.hover ||
        reasons.focus ||
        reasons.offscreen ||
        reasons.user ||
        document.hidden ||
        isAnimatingRef.current ||
        dragRef.current.pointerId !== -1;

      if (!isPaused) {
        elapsedRef.current += now - previous;
      }

      previous = now;
      progressRef.current?.style.setProperty('transform', `scaleX(${Math.min(1, elapsedRef.current / AUTOPLAY_MS)})`);

      if (elapsedRef.current >= AUTOPLAY_MS) {
        goTo(Math.round(positionRef.current) + 1);
      }

      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frame);
  }, [canAutoplay, goTo]);

  useEffect(() => {
    const stage = stageRef.current;

    if (!stage) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      pauseReasonsRef.current.offscreen = !entry?.isIntersecting;
    });
    observer.observe(stage);

    return () => observer.disconnect();
  }, []);

  useEffect(() => () => window.cancelAnimationFrame(animationRef.current), []);

  useGSAP(
    () => {
      const panel = panelRef.current;

      if (!panel || !hasChangedRef.current) {
        return;
      }

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const query = (name: string) => panel.querySelectorAll(`[data-proof-reveal="${name}"]`);

        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .from(query('client'), { autoAlpha: 0, x: -24, duration: 0.5 })
          .from(
            query('title'),
            { autoAlpha: 0, y: 28, filter: 'blur(8px)', duration: 0.65, clearProps: 'filter' },
            0.08
          )
          .from(query('copy'), { autoAlpha: 0, y: 20, duration: 0.55 }, 0.2)
          .from(query('point'), { autoAlpha: 0, x: 18, duration: 0.45, stagger: 0.08 }, 0.25)
          .from(query('cta'), { autoAlpha: 0, y: 14, duration: 0.45 }, 0.45);
      });

      return () => mm.revert();
    },
    { dependencies: [panelIndex], revertOnUpdate: true }
  );

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) {
      return;
    }

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startPosition: positionRef.current,
      moved: false,
      lastX: event.clientX,
      lastTime: performance.now(),
      velocity: 0
    };
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const stage = stageRef.current;

    if (stage && event.pointerType === 'mouse' && depthMode === 'desktop') {
      const rect = stage.getBoundingClientRect();
      stage.style.setProperty('--tilt-x', `${(((event.clientY - rect.top) / rect.height - 0.5) * -4).toFixed(2)}deg`);
      stage.style.setProperty('--tilt-y', `${(((event.clientX - rect.left) / rect.width - 0.5) * 5).toFixed(2)}deg`);
    }

    if (drag.pointerId !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - drag.startX;

    if (!drag.moved && Math.abs(deltaX) > DRAG_THRESHOLD_PX) {
      drag.moved = true;
      window.cancelAnimationFrame(animationRef.current);
      isAnimatingRef.current = false;
      event.currentTarget.setPointerCapture(event.pointerId);
    }

    if (!drag.moved) {
      return;
    }

    const now = performance.now();
    drag.velocity = (event.clientX - drag.lastX) / Math.max(16, now - drag.lastTime);
    drag.lastX = event.clientX;
    drag.lastTime = now;

    const slideWidth = slideRefs.current[0]?.offsetWidth ?? 1;
    positionRef.current = drag.startPosition - deltaX / (slideWidth * SLIDE_SPAN);
    paint(positionRef.current);
  };

  const handlePointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;

    if (drag.pointerId !== event.pointerId) {
      return;
    }

    drag.pointerId = -1;

    if (drag.moved) {
      const flick = Math.abs(drag.velocity) > 0.35 ? Math.sign(drag.velocity) * 0.5 : 0;
      goTo(Math.round(positionRef.current - flick));
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(panelIndex + (event.key === 'ArrowRight' ? 1 : -1));
    }
  };

  const controlButton =
    'inline-flex size-11 items-center justify-center rounded-full border border-black/10 bg-white text-nodo-black transition duration-200 hover:border-nodo-purple/50 hover:text-nodo-purple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nodo-purple';

  return (
    <section data-testid="home-proof-section" className="overflow-hidden bg-white py-16 text-nodo-black sm:py-24">
      <div
        data-testid="home-proof-layout"
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured case studies"
        onKeyDown={handleKeyDown}
        onMouseEnter={() => {
          pauseReasonsRef.current.hover = true;
        }}
        onMouseLeave={() => {
          pauseReasonsRef.current.hover = false;
        }}
        onFocus={() => {
          pauseReasonsRef.current.focus = true;
        }}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            pauseReasonsRef.current.focus = false;
          }
        }}
      >
        <Container>
          <ScrollReveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-3xl">
                <p
                  data-testid="home-proof-eyebrow"
                  className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-nodo-purple"
                >
                  {eyebrow}
                </p>
                <h2
                  data-testid="home-proof-title"
                  className="text-balance text-4xl font-black leading-[0.95] tracking-normal sm:text-6xl"
                >
                  {title}
                </h2>
              </div>
              <div className="flex items-center gap-2" data-testid="home-proof-controls">
                <button
                  type="button"
                  aria-label="Previous case study"
                  data-testid="home-proof-previous-button"
                  className={controlButton}
                  onClick={() => goTo(panelIndex - 1)}
                >
                  <ArrowLeft aria-hidden="true" className="size-4" />
                </button>
                <button
                  type="button"
                  aria-label="Next case study"
                  data-testid="home-proof-next-button"
                  className={controlButton}
                  onClick={() => goTo(panelIndex + 1)}
                >
                  <ArrowRight aria-hidden="true" className="size-4" />
                </button>
                {canAutoplay ? (
                  <button
                    type="button"
                    aria-label={isUserPaused ? 'Play case study rotation' : 'Pause case study rotation'}
                    data-testid="home-proof-autoplay-button"
                    className={controlButton}
                    onClick={() => setIsUserPaused((paused) => !paused)}
                  >
                    {isUserPaused ? (
                      <Play aria-hidden="true" className="size-4" />
                    ) : (
                      <Pause aria-hidden="true" className="size-4" />
                    )}
                  </button>
                ) : null}
              </div>
            </div>
          </ScrollReveal>
        </Container>

        <div
          ref={stageRef}
          data-testid="home-proof-visual"
          className="relative mt-10 h-[calc(var(--slide-w)*0.625+7rem)] cursor-grab touch-pan-y select-none [--slide-w:min(84vw,34rem)] [perspective:1600px] active:cursor-grabbing md:[--slide-w:min(62vw,40rem)] sm:mt-12"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          onPointerLeave={() => {
            stageRef.current?.style.setProperty('--tilt-x', '0deg');
            stageRef.current?.style.setProperty('--tilt-y', '0deg');
          }}
        >
          <div className="pointer-events-none absolute inset-0 transition-transform duration-700 ease-out [transform-style:preserve-3d] [transform:rotateX(var(--tilt-x,0deg))_rotateY(var(--tilt-y,0deg))]">
            {slides.map((slide, index) => {
              const style = slideStyle(slideOffset(index, activeIndex, slideCount), depthMode);

              return (
                <div
                  key={slide.id}
                  ref={(node) => {
                    slideRefs.current[index] = node;
                  }}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${slideCount}: ${slide.client}`}
                  aria-hidden={index !== activeIndex}
                  data-testid={`home-proof-slide-${slide.id}`}
                  className="pointer-events-auto absolute left-1/2 top-1/2 w-[var(--slide-w)] will-change-transform [transform-style:preserve-3d]"
                  style={
                    {
                      transform: style.transform,
                      filter: style.filter,
                      opacity: style.opacity,
                      zIndex: style.zIndex,
                      '--slide-parallax': style.parallax,
                      '--slide-zoom': style.zoom
                    } as CSSProperties
                  }
                  onClick={() => {
                    if (!dragRef.current.moved && index !== panelIndex) {
                      goTo(index);
                    }
                  }}
                >
                  <ProofSlideCard slide={slide} isActive={index === activeIndex} />
                </div>
              );
            })}
          </div>
        </div>

        <Container>
          <div className="mt-6 flex items-center justify-center gap-4" data-testid="home-proof-pagination">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Show case study ${index + 1}: ${slide.client}`}
                aria-current={index === panelIndex ? 'true' : undefined}
                data-testid={`home-proof-dot-${slide.id}`}
                className="group inline-flex size-11 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-nodo-purple"
                onClick={() => goTo(index)}
              >
                <span
                  className={cn(
                    'block h-2.5 rounded-full transition-all duration-300',
                    index === panelIndex ? 'w-8 bg-nodo-purple' : 'w-2.5 bg-nodo-black/20 group-hover:bg-nodo-black/40'
                  )}
                />
              </button>
            ))}
          </div>
          {canAutoplay ? (
            <div aria-hidden="true" className="mx-auto mt-1 h-0.5 w-24 overflow-hidden rounded-full bg-nodo-black/10">
              <span
                ref={progressRef}
                className="block h-full w-full origin-left scale-x-0 bg-nodo-purple"
                data-testid="home-proof-progress"
              />
            </div>
          ) : null}

          <div
            ref={panelRef}
            key={activeSlide.id}
            data-testid="home-proof-content"
            aria-live={isAutoplaying ? 'off' : 'polite'}
            className="mx-auto mt-10 grid max-w-5xl gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end"
          >
            <div>
              <div data-proof-reveal="client" className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-11 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-nodo-black p-1.5"
                >
                  <Image
                    src={activeSlide.logo.src}
                    alt=""
                    width={activeSlide.logo.width}
                    height={activeSlide.logo.height}
                    sizes="56px"
                    className={cn('h-full w-full object-contain', activeSlide.logo.className)}
                  />
                </span>
                <span>
                  <span className="block text-base font-black leading-tight">{activeSlide.client}</span>
                  <span className="block text-sm font-semibold text-nodo-ink/64">{activeSlide.kicker}</span>
                </span>
              </div>
              <h3
                data-proof-reveal="title"
                data-testid="home-proof-slide-title"
                className="mt-6 text-balance text-3xl font-black leading-[1] tracking-normal sm:text-4xl"
              >
                {activeSlide.headline}
              </h3>
              <p
                data-proof-reveal="copy"
                data-testid="home-proof-copy"
                className="mt-5 max-w-2xl text-pretty text-lg leading-8 text-nodo-ink/72"
              >
                {activeSlide.copy}
              </p>
            </div>
            <div>
              <ul data-testid="home-proof-points" className="grid gap-3">
                {activeSlide.points.map((point) => (
                  <li
                    key={point}
                    data-proof-reveal="point"
                    className="flex items-center gap-3 text-sm font-semibold text-nodo-ink/80"
                  >
                    <CheckCircle2 aria-hidden="true" className="size-5 shrink-0 text-nodo-purple" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div data-proof-reveal="cta" className="mt-7">
                <TrackedCtaButton
                  href={activeSlide.href}
                  label={`View the case study: ${activeSlide.client}`}
                  event="homepage"
                  location="home_proof"
                  surfaceTone="light"
                  dataTestId="home-proof-case-study-button"
                  icon={
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none"
                    />
                  }
                  className="group"
                >
                  View the case study
                </TrackedCtaButton>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
