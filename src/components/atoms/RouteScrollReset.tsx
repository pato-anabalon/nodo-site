'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function setScroll(top: number) {
  const root = document.documentElement;
  const previousScrollBehavior = root.style.scrollBehavior;

  root.style.scrollBehavior = 'auto';
  window.scrollTo({ left: 0, top, behavior: 'auto' });
  // ScrollTrigger caches the previous page's scroll position and restores it on refresh,
  // which pushes short pages (e.g. /contact) to the bottom. Setting the scroll through its
  // own scroll function updates that cache.
  ScrollTrigger.getScrollFunc(window)(top);
  root.style.scrollBehavior = previousScrollBehavior;
}

function getHashTarget() {
  const id = decodeURIComponent(window.location.hash.slice(1));

  return id ? document.getElementById(id) : null;
}

function scrollToHashTarget(target: HTMLElement) {
  const scrollMarginTop = Number.parseFloat(window.getComputedStyle(target).scrollMarginTop) || 0;

  setScroll(Math.max(0, target.getBoundingClientRect().top + window.scrollY - scrollMarginTop));
}

function resetRouteScroll() {
  setScroll(0);
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();

      // Links to another page's section (e.g. /plans/websites#nodo-flow) land on that section
      // once pinned sections have been measured.
      const target = getHashTarget();

      if (target) {
        scrollToHashTarget(target);
      }
    });
  });
}

export function RouteScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    return () => {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = previousScrollRestoration;
      }
    };
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(resetRouteScroll);
    const timeout = window.setTimeout(resetRouteScroll, 80);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, [pathname]);

  return null;
}
