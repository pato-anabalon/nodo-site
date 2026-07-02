import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  type CardEntranceState,
  nodoCardEntranceStates,
  nodoCardFinalState,
  setCardsToEntrance
} from '@/lib/gsap-card-reveal';

gsap.registerPlugin(ScrollTrigger);

type CardRevealEase = string | ((progress: number) => number);
type CardRevealStart = string | ((card: HTMLElement, index: number, cards: HTMLElement[]) => string);

type CardOnceRevealOptions = {
  container: HTMLElement;
  itemSelector: string;
  duration?: number;
  ease?: CardRevealEase;
  entranceStates?: CardEntranceState[];
  mediaQuery?: string;
  onceStart?: CardRevealStart;
  stagger?: number;
  toggleActions?: string;
};

type CardRevealControls = {
  revert: () => void;
};

export const nodoCardRevealEase = createCubicBezierEase(0.16, 1, 0.3, 1);

function createCubicBezierEase(x1: number, y1: number, x2: number, y2: number) {
  const sampleCount = 11;
  const sampleStep = 1 / (sampleCount - 1);
  const sampleValues = Array.from({ length: sampleCount }, (_value, index) =>
    calculateBezier(index * sampleStep, x1, x2)
  );

  function a(point1: number, point2: number) {
    return 1 - 3 * point2 + 3 * point1;
  }

  function b(point1: number, point2: number) {
    return 3 * point2 - 6 * point1;
  }

  function c(point1: number) {
    return 3 * point1;
  }

  function calculateBezier(time: number, point1: number, point2: number) {
    return ((a(point1, point2) * time + b(point1, point2)) * time + c(point1)) * time;
  }

  function getSlope(time: number, point1: number, point2: number) {
    return 3 * a(point1, point2) * time * time + 2 * b(point1, point2) * time + c(point1);
  }

  function binarySubdivide(value: number, start: number, end: number) {
    let currentValue = 0;
    let currentTime = 0;

    for (let index = 0; index < 10; index += 1) {
      currentTime = start + (end - start) / 2;
      currentValue = calculateBezier(currentTime, x1, x2) - value;

      if (Math.abs(currentValue) <= 0.0000001) {
        break;
      }

      if (currentValue > 0) {
        end = currentTime;
      } else {
        start = currentTime;
      }
    }

    return currentTime;
  }

  function newtonRaphsonIterate(value: number, guessTime: number) {
    for (let index = 0; index < 4; index += 1) {
      const currentSlope = getSlope(guessTime, x1, x2);

      if (currentSlope === 0) {
        return guessTime;
      }

      const currentValue = calculateBezier(guessTime, x1, x2) - value;
      guessTime -= currentValue / currentSlope;
    }

    return guessTime;
  }

  function getTimeForX(value: number) {
    let intervalStart = 0;
    let currentSample = 1;
    const lastSample = sampleCount - 1;

    for (; currentSample !== lastSample && sampleValues[currentSample] <= value; currentSample += 1) {
      intervalStart += sampleStep;
    }

    currentSample -= 1;

    const distance =
      (value - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
    const guessTime = intervalStart + distance * sampleStep;
    const initialSlope = getSlope(guessTime, x1, x2);

    if (initialSlope >= 0.001) {
      return newtonRaphsonIterate(value, guessTime);
    }

    if (initialSlope === 0) {
      return guessTime;
    }

    return binarySubdivide(value, intervalStart, intervalStart + sampleStep);
  }

  return (progress: number) => {
    if (progress === 0 || progress === 1 || (x1 === y1 && x2 === y2)) {
      return progress;
    }

    return calculateBezier(getTimeForX(progress), y1, y2);
  };
}

function getResolvedStart(onceStart: CardRevealStart, card: HTMLElement, index: number, cards: HTMLElement[]) {
  return typeof onceStart === 'function' ? onceStart(card, index, cards) : onceStart;
}

export function getNodoDesktopCardOnceStart(_card: HTMLElement, index: number, cards: HTMLElement[]) {
  if (cards.length >= 3 && index % 3 === 1) {
    return 'top 74%';
  }

  return 'top 84%';
}

export function createCardOnceReveal({
  container,
  itemSelector,
  duration = 1.7,
  ease = nodoCardRevealEase,
  entranceStates = nodoCardEntranceStates,
  mediaQuery = '(prefers-reduced-motion: no-preference)',
  onceStart = getNodoDesktopCardOnceStart,
  stagger = 0,
  toggleActions = 'play none none none'
}: CardOnceRevealOptions): CardRevealControls {
  const cards = Array.from(container.querySelectorAll<HTMLElement>(itemSelector));
  const mm = gsap.matchMedia();

  mm.add(mediaQuery, () => {
    gsap.set(container, { perspective: 1200 });
    setCardsToEntrance(cards, entranceStates);

    const triggers = cards.map((card, index) =>
      gsap.to(card, {
        ...nodoCardFinalState,
        delay: index * stagger,
        duration,
        ease,
        overwrite: 'auto',
        scrollTrigger: {
          trigger: card,
          start: getResolvedStart(onceStart, card, index, cards),
          once: true,
          toggleActions
        }
      })
    );

    const refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(refreshFrame);
      triggers.forEach((trigger) => trigger.kill());
    };
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
