import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, CustomEase);

type PlansHubNodo3dCardRevealOptions = {
  container: HTMLElement;
  itemSelector?: string;
};

type PlansHubNodo3dCardRevealControls = {
  revert: () => void;
};

const plansHubNodo3dEntranceStates = [
  { x: -65, y: 80, rotationX: -18, rotationY: -26, rotation: -7 },
  { x: 10, y: 100, rotationX: -30, rotationY: 6, rotation: 3 },
  { x: 65, y: 80, rotationX: -18, rotationY: 26, rotation: 7 }
] as const;

const plansHubNodo3dFinalState = {
  opacity: 1,
  x: 0,
  y: 0,
  rotation: 0,
  rotationX: 0,
  rotationY: 0
};

function setCardsToEntrance(cards: HTMLElement[]) {
  cards.forEach((card, index) => {
    const entranceState = plansHubNodo3dEntranceStates[index % plansHubNodo3dEntranceStates.length];

    gsap.set(card, {
      ...entranceState,
      opacity: 0,
      force3D: true,
      transitionProperty: 'none',
      transformOrigin: 'center bottom',
      transformStyle: 'preserve-3d',
      willChange: 'transform, opacity'
    });
  });
}

export function createPlansHubNodo3dCardReveal({
  container,
  itemSelector = '.plans-hub-reveal-card'
}: PlansHubNodo3dCardRevealOptions): PlansHubNodo3dCardRevealControls {
  const cards = Array.from(container.querySelectorAll<HTMLElement>(itemSelector));
  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const plansHubNodo3dEase = CustomEase.create('plans-hub-nodo-3d-reveal', 'M0,0 C0.16,1 0.3,1 1,1');

    gsap.set(container, { perspective: 1200 });
    setCardsToEntrance(cards);

    const tweens = cards.map((card, index) =>
      gsap.to(card, {
        ...plansHubNodo3dFinalState,
        clearProps: 'transform,willChange,transitionProperty',
        delay: index * 0.1,
        duration: 1,
        ease: plansHubNodo3dEase,
        overwrite: 'auto',
        scrollTrigger: {
          trigger: card,
          start: 'top bottom-=120px',
          once: true,
          toggleActions: 'play none none none'
        }
      })
    );

    const refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(refreshFrame);
      tweens.forEach((tween) => tween.kill());
    };
  });

  mm.add('(prefers-reduced-motion: reduce)', () => {
    gsap.set(cards, {
      ...plansHubNodo3dFinalState,
      clearProps: 'transform,willChange,transitionProperty'
    });
  });

  return {
    revert: () => mm.revert()
  };
}
