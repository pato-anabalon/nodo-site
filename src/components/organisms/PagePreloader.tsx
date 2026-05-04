"use client";

import { useEffect, useState } from "react";
import { ConstellationBackground } from "@/components/atoms/ConstellationBackground";
import { NodoLogo } from "@/components/atoms/NodoLogo";
import { cn } from "@/lib/utils";

const MIN_VISIBLE_MS = 950;
const PRELOADER_SESSION_KEY = "nodo:preloader-seen";

function waitForWindowLoad() {
  if (document.readyState === "complete") {
    return Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    window.addEventListener("load", () => resolve(), { once: true });
  });
}

function waitForFonts() {
  if (!("fonts" in document)) {
    return Promise.resolve();
  }

  return document.fonts.ready.then(() => undefined);
}

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export function PagePreloader() {
  const [isLeaving, setIsLeaving] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const originalOverflow = document.body.style.overflow;
    const hasSeenPreloader = window.sessionStorage.getItem(PRELOADER_SESSION_KEY) === "true";

    if (hasSeenPreloader) {
      document.documentElement.dataset.nodoPreloaded = "true";
      window.dispatchEvent(new Event("nodo:preloader-complete"));
      return;
    }

    window.requestAnimationFrame(() => {
      if (!cancelled) {
        setIsMounted(true);
      }
    });

    document.body.style.overflow = "hidden";

    async function preparePage() {
      await Promise.all([waitForWindowLoad(), waitForFonts(), wait(MIN_VISIBLE_MS)]);

      if (cancelled) {
        return;
      }

      setIsLeaving(true);
      window.setTimeout(() => {
        if (!cancelled) {
          document.body.style.overflow = originalOverflow;
          window.sessionStorage.setItem(PRELOADER_SESSION_KEY, "true");
          document.documentElement.dataset.nodoPreloaded = "true";
          window.dispatchEvent(new Event("nodo:preloader-complete"));
          setIsMounted(false);
        }
      }, 520);
    }

    preparePage();

    return () => {
      cancelled = true;
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-nodo-black transition duration-500 ease-out",
        isLeaving && "pointer-events-none opacity-0",
      )}
      aria-live="polite"
      aria-label="Loading Nodo"
      role="status"
    >
      <ConstellationBackground className="opacity-70" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.22),transparent_34%)]" />
      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
        <NodoLogo inverted className="preloader-logo scale-[1.4] sm:scale-[1.7]" />
        <div className="w-56 overflow-hidden rounded-full bg-white/12">
          <div className="h-1.5 w-1/2 rounded-full bg-nodo-purple shadow-[0_0_28px_rgba(124,58,237,0.8)] motion-safe:animate-[nodo-loader_1.05s_ease-in-out_infinite]" />
        </div>
        <p className="text-xs font-black uppercase tracking-[0.28em] text-white/58">
          Loading
        </p>
      </div>
    </div>
  );
}
