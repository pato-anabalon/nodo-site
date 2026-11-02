'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function refreshScrollTriggers() {
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  });
}

function scrollToPageTop() {
  const root = document.documentElement;
  const previousScrollBehavior = root.style.scrollBehavior;

  root.style.scrollBehavior = 'auto';
  window.scrollTo({ left: 0, top: 0, behavior: 'auto' });
  // ScrollTrigger caches the previous page's scroll position and restores it on refresh,
  // which pushes short pages (e.g. /contact) to the bottom. Setting the scroll through its
  // own scroll function updates that cache.
  ScrollTrigger.getScrollFunc(window)(0);
  root.style.scrollBehavior = previousScrollBehavior;
  refreshScrollTriggers();
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
    const frame = window.requestAnimationFrame(scrollToPageTop);
    const timeout = window.setTimeout(scrollToPageTop, 80);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, [pathname]);

  return null;
}
