"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { NodoLogo } from "@/components/atoms/NodoLogo";
import { TrackedCtaButton } from "@/components/molecules/TrackedCtaButton";
import { navigation } from "@/lib/content";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

const PAGE_TOP_VISIBILITY_Y = 8;
const HEADER_HOVER_ZONE_HEIGHT = 92;
const NAVBAR_REVEAL_UP_SCROLL_DISTANCE = 72;
const mobileNavigation = [{ label: "Home", href: "/" }, ...navigation];

export function Header() {
  const root = useRef<HTMLElement>(null);
  const nav = useRef<HTMLElement>(null);
  const navItemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const pathname = usePathname();
  const [previewHref, setPreviewHref] = useState<string | null>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

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
      <div className="nodo-header-surface nodo-header-top-line absolute top-0 hidden h-[10px] lg:block" />
      <div className="hidden w-full items-start justify-between gap-4 lg:flex">
        <div className="flex items-center">
          <div className="relative">
            <span className="pointer-events-none absolute right-[-3.5rem] top-[10px] size-14">
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
            <TrackedCtaButton
              href="/contact"
              label="Let's talk"
              location="site_header"
              route={pathname}
              surfaceTone="dark"
              dataTestId="site-header-contact-button"
            >
              Let’s talk
            </TrackedCtaButton>
          </div>
        </div>
      </div>

      <div
        data-testid="site-header-mobile-bar"
        className="pointer-events-auto relative flex h-20 w-full items-center justify-between border-b border-white/10 bg-nodo-black/94 px-5 text-white shadow-[0_18px_38px_rgba(5,5,5,0.16)] backdrop-blur-md lg:hidden"
      >
        <Link
          href="/"
          aria-label="Nodo home"
          data-testid="site-header-mobile-logo"
          className="relative flex items-center gap-3"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <span className="relative z-50 inline-flex">
            <NodoLogo inverted markOnly />
          </span>
          <span
            data-testid="site-header-mobile-logo-wordmark"
            className="relative z-10 text-[2rem] font-black leading-none tracking-normal"
          >
            nodo<span className="text-nodo-purple">.</span>
          </span>
        </Link>
        <span aria-hidden="true" className="size-12 shrink-0" />
      </div>

      <button
        type="button"
        aria-label="Close menu"
        data-testid="site-header-mobile-menu-backdrop"
        className={cn(
          "pointer-events-auto fixed inset-x-0 bottom-0 top-20 z-10 bg-[color-mix(in_oklab,var(--nodo-black)_50%,transparent)] backdrop-blur-[var(--blur-sm)] transition duration-300 lg:hidden",
          isMobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      <div
        id="site-header-mobile-menu"
        data-testid="site-header-mobile-menu"
        aria-hidden={!isMobileMenuOpen}
        className={cn(
          "site-header-mobile-panel pointer-events-auto fixed left-[4.75rem] right-0 top-0 z-30 origin-top-right transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:left-[5.25rem] lg:hidden",
          isMobileMenuOpen
            ? "translate-x-0 translate-y-0 scale-100"
            : "pointer-events-none translate-x-full -translate-y-2 scale-[0.98]",
        )}
      >
        <div aria-hidden="true" className="pt-[128%]" />
        <svg
          className="pointer-events-none absolute left-0 top-0 size-full drop-shadow-[0_30px_90px_rgba(5,5,5,0.28)]"
          viewBox="0 0 309 393"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M52.8829 -282.219C20.1588 -263.326 0 -228.409 0 -190.622V179.906C0 217.693 20.1593 252.61 52.884 271.503L248.585 384.491C287.367 406.882 335.844 378.894 335.844 334.113V-418.111C335.844 -430.324 322.623 -437.957 312.046 -431.851L52.8829 -282.219Z"
            fill="var(--foreground)"
          />
        </svg>
        <div className="absolute inset-0 z-10 flex flex-col items-end px-6 pt-28 sm:px-8 sm:pt-32">
          <nav aria-label="Mobile navigation" className="grid justify-items-end gap-3 text-right">
            {mobileNavigation.map((item, index) => {
              const isActive = item.href === activeHref;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  data-testid={`site-header-mobile-menu-link-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    transitionDelay: isMobileMenuOpen ? `${130 + index * 70}ms` : "0ms",
                  }}
                  className={cn(
                    "block text-2xl font-medium leading-tight tracking-normal transition duration-500 ease-out",
                    isMobileMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0",
                    isActive ? "text-nodo-purple/45" : "text-nodo-purple hover:text-nodo-purple/72",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
      <button
        type="button"
        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMobileMenuOpen}
        aria-controls="site-header-mobile-menu"
        data-testid="site-header-mobile-menu-button"
        className={cn(
          "pointer-events-auto fixed right-5 top-4 z-[90] inline-flex size-12 items-center justify-center transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nodo-lavender lg:hidden",
          isMobileMenuOpen ? "scale-105 text-nodo-purple" : "scale-100 text-white",
        )}
        onClick={() => setIsMobileMenuOpen((current) => !current)}
      >
        <span className="relative block size-6" aria-hidden="true">
          <span
            className={cn(
              "absolute left-0 top-1/2 h-0.5 w-6 rounded-full bg-current transition duration-300 ease-out",
              isMobileMenuOpen ? "-translate-y-1/2 rotate-45" : "-translate-y-[0.55rem]",
            )}
          />
          <span
            className={cn(
              "absolute left-0 top-1/2 h-0.5 w-6 -translate-y-1/2 rounded-full bg-current transition duration-200 ease-out",
              isMobileMenuOpen ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100",
            )}
          />
          <span
            className={cn(
              "absolute left-0 top-1/2 h-0.5 w-6 rounded-full bg-current transition duration-300 ease-out",
              isMobileMenuOpen ? "-translate-y-1/2 -rotate-45" : "translate-y-[0.55rem]",
            )}
          />
        </span>
      </button>
    </header>
  );
}
