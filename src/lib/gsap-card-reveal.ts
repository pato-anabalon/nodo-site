import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export type CardEntranceState = {
  x: number;
  y: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
};

type CardScrubRevealOptions = {
  container: HTMLElement;
  itemSelector: string;
  entranceStates?: CardEntranceState[];
  duration?: number;
  ease?: string;
  end?: string;
  mediaQuery?: string;
  scrub?: boolean | number;
  stagger?: number;
  start?: string;
};

type CardRevealControls = {
  revert: () => void;
};

export const nodoCardEntranceStates: CardEntranceState[] = [
  { x: -65, y: 80, rotateX: -18, rotateY: -26, rotateZ: -7 },
  { x: 10, y: 100, rotateX: -30, rotateY: 6, rotateZ: 3 },
  { x: 65, y: 80, rotateX: -18, rotateY: 26, rotateZ: 7 }
];

export const nodoCardFinalState = {
  autoAlpha: 1,
  x: 0,
  y: 0,
  rotation: 0,
  rotationX: 0,
  rotationY: 0
};

export function setCardsToEntrance(cards: HTMLElement[], entranceStates = nodoCardEntranceStates) {
  cards.forEach((card, index) => {
    const entranceState = entranceStates[index % entranceStates.length];

    gsap.set(card, {
      autoAlpha: 0,
      x: entranceState.x,
      y: entranceState.y,
      rotation: entranceState.rotateZ,
      rotationX: entranceState.rotateX,
      rotationY: entranceState.rotateY,
      transformOrigin: 'center bottom',
      transformStyle: 'preserve-3d',
      transformPerspective: 1200,
      force3D: true,
      willChange: 'transform, opacity'
    });
  });
}

export function createCardScrubReveal({
  container,
  itemSelector,
  entranceStates = nodoCardEntranceStates,
  duration = 1.7,
  ease = 'power3.out',
  end = 'bottom 80%',
  mediaQuery = '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
  scrub = 0.8,
  stagger = 0.16,
  start = 'top 82%'
}: CardScrubRevealOptions): CardRevealControls {
  const cards = Array.from(container.querySelectorAll<HTMLElement>(itemSelector));
  const mm = gsap.matchMedia();

  mm.add(mediaQuery, () => {
    gsap.set(container, { perspective: 1200 });
    setCardsToEntrance(cards, entranceStates);

    const timeline = gsap.timeline({
      defaults: {
        duration,
        ease
      },
      scrollTrigger: {
        trigger: container,
        start,
        end,
        scrub,
        invalidateOnRefresh: true
      }
    });

    cards.forEach((card, index) => {
      timeline.to(card, nodoCardFinalState, index * stagger);
    });
  });

  mm.add('(prefers-reduced-motion: reduce)', () => {
    gsap.set(cards, {
      ...nodoCardFinalState,
      clearProps: 'transform,visibility,opacity,willChange'
    });
  });

  return {
    revert: () => mm.revert()
  };
}
