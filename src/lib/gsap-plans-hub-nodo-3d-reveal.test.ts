import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createPlansHubNodo3dCardReveal } from './gsap-plans-hub-nodo-3d-reveal';

type ActiveMotionQuery = 'no-preference' | 'reduce';

function createCardGrid() {
  const container = document.createElement('div');
  const cards = Array.from({ length: 3 }, () => {
    const card = document.createElement('article');

    card.className = 'plans-hub-reveal-card';
    container.appendChild(card);

    return card;
  });

  return { cards, container };
}

function mockMatchMedia(activeQuery: ActiveMotionQuery) {
  const cleanups: Array<() => void> = [];
  const mm = {
    add: jest.fn((query: string, callback: () => void | (() => void)) => {
      const shouldRun =
        (activeQuery === 'no-preference' && query === '(prefers-reduced-motion: no-preference)') ||
        (activeQuery === 'reduce' && query === '(prefers-reduced-motion: reduce)');

      if (!shouldRun) {
        return;
      }

      const cleanup = callback();

      if (typeof cleanup === 'function') {
        cleanups.push(cleanup);
      }
    }),
    revert: jest.fn(() => {
      cleanups.forEach((cleanup) => cleanup());
    })
  };

  (gsap.matchMedia as jest.Mock).mockReturnValue(mm);

  return mm;
}

describe('createPlansHubNodo3dCardReveal', () => {
  beforeEach(() => {
    (gsap.matchMedia as jest.Mock).mockClear();
    (gsap.set as jest.Mock).mockClear();
    (gsap.to as jest.Mock).mockClear();
    (CustomEase.create as jest.Mock).mockClear();
    (ScrollTrigger.refresh as jest.Mock).mockClear();
    (window.requestAnimationFrame as jest.Mock).mockClear();
    (window.cancelAnimationFrame as jest.Mock).mockClear();
  });

  it('should create indexed 3D one-time reveals for Plans Hub cards', () => {
    const mm = mockMatchMedia('no-preference');
    const { cards, container } = createCardGrid();

    const controls = createPlansHubNodo3dCardReveal({ container });

    expect(CustomEase.create).toHaveBeenCalledWith('plans-hub-nodo-3d-reveal', 'M0,0 C0.16,1 0.3,1 1,1');
    expect(gsap.set).toHaveBeenCalledWith(container, { perspective: 1200 });

    const cardSetCalls = (gsap.set as jest.Mock).mock.calls.filter(([target]) => cards.includes(target));

    expect(cardSetCalls.map(([, vars]) => vars)).toEqual([
      expect.objectContaining({
        opacity: 0,
        rotation: -7,
        rotationX: -18,
        rotationY: -26,
        transitionProperty: 'none',
        x: -65,
        y: 80
      }),
      expect.objectContaining({
        opacity: 0,
        rotation: 3,
        rotationX: -30,
        rotationY: 6,
        transitionProperty: 'none',
        x: 10,
        y: 100
      }),
      expect.objectContaining({
        opacity: 0,
        rotation: 7,
        rotationX: -18,
        rotationY: 26,
        transitionProperty: 'none',
        x: 65,
        y: 80
      })
    ]);

    (gsap.to as jest.Mock).mock.calls.forEach(([target, vars], index) => {
      expect(target).toBe(cards[index]);
      expect(vars).toEqual(
        expect.objectContaining({
          clearProps: 'transform,willChange,transitionProperty',
          delay: index * 0.1,
          duration: 1,
          ease: 'custom-ease',
          opacity: 1,
          overwrite: 'auto',
          rotation: 0,
          rotationX: 0,
          rotationY: 0,
          x: 0,
          y: 0
        })
      );
      expect(vars.scrollTrigger).toEqual({
        trigger: cards[index],
        start: 'top bottom-=120px',
        once: true,
        toggleActions: 'play none none none'
      });
    });

    const tweenResults = (gsap.to as jest.Mock).mock.results.map(({ value }) => value);

    controls.revert();

    expect(mm.revert).toHaveBeenCalledTimes(1);
    expect(window.cancelAnimationFrame).toHaveBeenCalledWith(1);
    tweenResults.forEach((tween) => {
      expect(tween.kill).toHaveBeenCalledTimes(1);
    });
  });

  it('should set cards directly to the final state for reduced motion', () => {
    mockMatchMedia('reduce');
    const { cards, container } = createCardGrid();

    createPlansHubNodo3dCardReveal({ container });

    expect(gsap.to).not.toHaveBeenCalled();
    expect(window.requestAnimationFrame).not.toHaveBeenCalled();
    expect(gsap.set).toHaveBeenCalledWith(
      cards,
      expect.objectContaining({
        clearProps: 'transform,willChange,transitionProperty',
        opacity: 1,
        rotation: 0,
        rotationX: 0,
        rotationY: 0,
        x: 0,
        y: 0
      })
    );
  });
});
