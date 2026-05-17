"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Button } from "@/components/atoms/Button";
import { NodoLogo } from "@/components/atoms/NodoLogo";
import { navigation } from "@/lib/content";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

const PAGE_TOP_VISIBILITY_Y = 8;
const HEADER_HOVER_ZONE_HEIGHT = 92;
const NAVBAR_REVEAL_UP_SCROLL_DISTANCE = 72;

export function Header() {
  const root = useRef<HTMLElement>(null);
  const nav = useRef<HTMLElement>(null);
  const navItemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const pathname = usePathname();
  const [previewHref, setPreviewHref] = useState<string | null>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });

  const activeHref =
    navigation.find((item) => pathname === item.href || pathname.startsWith(`${item.href}/`))
      ?.href ?? null;
  const indicatorHref = previewHref ?? activeHref;

  const updateIndicator = useCallback(() => {
    const navElement = nav.current;

    if (!navElement || !indicatorHref) {
      setIndicator((current) => ({ ...current, opacity: 0 }));
      return;
    }

    const itemElement = navItemRefs.current[indicatorHref];

    if (!itemElement) {
      setIndicator((current) => ({ ...current, opacity: 0 }));
      return;
    }

    const navRect = navElement.getBoundingClientRect();
    const itemRect = itemElement.getBoundingClientRect();

    if (!navRect.width || !itemRect.width) {
      setIndicator((current) => ({ ...current, opacity: 0 }));
      return;
    }

    setIndicator({
      left: itemRect.left - navRect.left,
      width: itemRect.width,
      opacity: 1,
    });
  }, [indicatorHref]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(updateIndicator);

    window.addEventListener("resize", updateIndicator);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateIndicator);
    };
  }, [updateIndicator]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        let lastScrollY = window.scrollY;
        let upwardScrollDistance = 0;
        let isAtPageTop = lastScrollY <= PAGE_TOP_VISIBILITY_Y;
        let hasScrolledUpEnough = false;
        let isPointerInHeaderZone = false;

        gsap.set(".site-header-navbar", {
          autoAlpha: 0,
          y: -28,
          xPercent: -50,
        });

        const navbarReveal = gsap
          .timeline({ paused: true, defaults: { ease: "power3.out" } })
          .to(".site-header-navbar", {
            autoAlpha: 1,
            y: 0,
            xPercent: -50,
            duration: 0.55,
          });

        const syncNavbar = () => {
          if (isAtPageTop || hasScrolledUpEnough || isPointerInHeaderZone) {
            navbarReveal.play();
          } else {
            navbarReveal.reverse();
          }
        };

        const handleScroll = () => {
          const currentScrollY = Math.max(window.scrollY, 0);
          const scrollDelta = currentScrollY - lastScrollY;

          isAtPageTop = currentScrollY <= PAGE_TOP_VISIBILITY_Y;

          if (isAtPageTop) {
            upwardScrollDistance = 0;
            hasScrolledUpEnough = false;
          } else if (scrollDelta > 1) {
            upwardScrollDistance = 0;
            hasScrolledUpEnough = false;
          } else if (scrollDelta < -1) {
            upwardScrollDistance += Math.abs(scrollDelta);
            hasScrolledUpEnough = upwardScrollDistance >= NAVBAR_REVEAL_UP_SCROLL_DISTANCE;
          }

          lastScrollY = currentScrollY;
          syncNavbar();
        };

        const handlePointerMove = (event: PointerEvent) => {
          isPointerInHeaderZone = event.clientY <= HEADER_HOVER_ZONE_HEIGHT;
          syncNavbar();
        };

        const handlePointerLeave = () => {
          isPointerInHeaderZone = false;
          syncNavbar();
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("pointermove", handlePointerMove, { passive: true });
        window.addEventListener("pointerleave", handlePointerLeave);

        return () => {
          window.removeEventListener("scroll", handleScroll);
          window.removeEventListener("pointermove", handlePointerMove);
          window.removeEventListener("pointerleave", handlePointerLeave);
        };
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        let lastScrollY = window.scrollY;
        let upwardScrollDistance = 0;
        let isAtPageTop = lastScrollY <= PAGE_TOP_VISIBILITY_Y;
        let hasScrolledUpEnough = false;
        let isPointerInHeaderZone = false;

        const syncNavbar = () => {
          gsap.set(".site-header-navbar", {
            autoAlpha: isAtPageTop || hasScrolledUpEnough || isPointerInHeaderZone ? 1 : 0,
            y: 0,
            xPercent: -50,
          });
        };

        const handleScroll = () => {
          const currentScrollY = Math.max(window.scrollY, 0);
          const scrollDelta = currentScrollY - lastScrollY;

          isAtPageTop = currentScrollY <= PAGE_TOP_VISIBILITY_Y;

          if (isAtPageTop) {
            upwardScrollDistance = 0;
            hasScrolledUpEnough = false;
          } else if (scrollDelta > 1) {
            upwardScrollDistance = 0;
            hasScrolledUpEnough = false;
          } else if (scrollDelta < -1) {
            upwardScrollDistance += Math.abs(scrollDelta);
            hasScrolledUpEnough = upwardScrollDistance >= NAVBAR_REVEAL_UP_SCROLL_DISTANCE;
          }

          lastScrollY = currentScrollY;
          syncNavbar();
        };

        const handlePointerMove = (event: PointerEvent) => {
          isPointerInHeaderZone = event.clientY <= HEADER_HOVER_ZONE_HEIGHT;
          syncNavbar();
        };

        const handlePointerLeave = () => {
          isPointerInHeaderZone = false;
          syncNavbar();
        };

        gsap.set(".site-header-navbar", {
          autoAlpha: 0,
          y: 0,
          xPercent: -50,
        });
        syncNavbar();

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("pointermove", handlePointerMove, { passive: true });
        window.addEventListener("pointerleave", handlePointerLeave);

        return () => {
          window.removeEventListener("scroll", handleScroll);
          window.removeEventListener("pointermove", handlePointerMove);
          window.removeEventListener("pointerleave", handlePointerLeave);
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <header
      ref={root}
      data-testid="site-header"
      className="pointer-events-none fixed inset-x-0 top-0 z-50"
    >
      <div className="nodo-header-surface nodo-header-top-line absolute top-0 h-[10px]" />
      <div className="flex w-full items-start justify-between gap-4">
        <div className="flex items-center">
          <div className="relative">
            <span className="pointer-events-none absolute right-[-3.5rem] top-[10px] hidden size-14 lg:block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                className="nodo-header-surface-fill size-full"
                aria-hidden="true"
              >
                <path d="m100,0H0v100C0,44.77,44.77,0,100,0Z" />
              </svg>
            </span>
            <Link
              href="/"
              aria-label="Nodo home"
              className="nodo-header-surface nodo-header-surface-hover pointer-events-auto relative flex h-[var(--nodo-header-logo-height)] w-[var(--nodo-header-logo-width)] items-center rounded-br-[2.1rem] px-7 py-4 text-white shadow-[0_18px_38px_rgba(5,5,5,0.18)] transition duration-300 sm:px-8"
            >
              <NodoLogo inverted className="scale-[0.9]" />
            </Link>
          </div>
        </div>
        <nav
          ref={nav}
          className="site-header-navbar nodo-header-surface pointer-events-auto absolute left-1/2 top-5 hidden h-[58px] -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 px-3 py-2 opacity-0 shadow-[0_18px_38px_rgba(5,5,5,0.18)] motion-reduce:opacity-100 lg:flex"
          aria-label="Main navigation"
          onMouseLeave={() => setPreviewHref(null)}
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-2 rounded-full border border-white/14 bg-white/[0.105] shadow-[0_10px_26px_rgba(124,58,237,0.16)] transition-[left,width,opacity] duration-300 ease-out"
            style={{
              left: indicator.left,
              opacity: indicator.opacity,
              width: indicator.width,
            }}
          />
          {navigation.map((item) => {
            const isActive = item.href === activeHref;
            const isPreviewingAnotherItem = Boolean(previewHref && previewHref !== activeHref);

            return (
              <Link
                key={item.href}
                href={item.href}
                ref={(element) => {
                  navItemRefs.current[item.href] = element;
                }}
                aria-current={isActive ? "page" : undefined}
                onFocus={() => setPreviewHref(item.href)}
                onBlur={() => setPreviewHref(null)}
                onMouseEnter={() => setPreviewHref(item.href)}
                onClick={() => setPreviewHref(item.href)}
                className={cn(
                  "relative z-10 rounded-full px-5 py-2.5 text-sm font-semibold transition duration-200 active:scale-[0.98]",
                  isActive && isPreviewingAnotherItem && "text-nodo-lavender",
                  isActive && !isPreviewingAnotherItem && "text-white",
                  !isActive && "text-white/64 hover:text-white",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="pointer-events-auto relative hidden lg:block">
          <span className="pointer-events-none absolute left-[-3.5rem] top-[10px] size-14">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              className="nodo-header-surface-fill size-full -scale-x-100"
              aria-hidden="true"
            >
              <path d="m100,0H0v100C0,44.77,44.77,0,100,0Z" />
            </svg>
          </span>
          <div className="nodo-header-surface flex h-[var(--nodo-header-logo-height)] w-[var(--nodo-header-action-width)] items-center justify-center rounded-bl-[2.1rem] px-7 py-4 shadow-[0_18px_38px_rgba(5,5,5,0.18)]">
            <Button
              href="/contact"
              surfaceTone="dark"
              dataTestId="site-header-contact-button"
            >
              Let’s talk
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
