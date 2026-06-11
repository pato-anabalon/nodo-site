import type { Metadata } from "next";
import { ArrowLeft, Compass, MessageCircle } from "lucide-react";
import { ConstellationBackground } from "@/components/atoms/ConstellationBackground";
import { Container } from "@/components/atoms/Container";
import { NodoLogo } from "@/components/atoms/NodoLogo";
import { TrackedCtaButton } from "@/components/molecules/TrackedCtaButton";

export const metadata: Metadata = {
  title: "Page not found | Nodo",
  description: "This Nodo page could not be found.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main
      data-testid="not-found-page-main"
      className="relative min-h-screen overflow-hidden bg-nodo-black pt-28 text-white"
    >
      <ConstellationBackground
        className="opacity-72"
        density={0.68}
        fps={32}
        maxDevicePixelRatio={1.5}
        maxNodes={72}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(124,58,237,0.18),transparent_34%),linear-gradient(180deg,rgba(5,5,5,0.08),rgba(5,5,5,0.72))]" />
      <Container className="relative z-10 flex min-h-[calc(100vh-7rem)] items-center py-16">
        <section
          data-testid="not-found-hero-section"
          className="grid w-full gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"
        >
          <div data-testid="not-found-content" className="max-w-3xl">
            <p
              data-testid="not-found-eyebrow"
              className="mb-5 text-sm font-black uppercase tracking-[0.24em] text-nodo-lavender"
            >
              404 / Lost path
            </p>
            <h1
              data-testid="not-found-title"
              className="text-balance text-5xl font-black leading-[0.9] tracking-normal sm:text-7xl lg:text-8xl"
            >
              This page has drifted off the map.
            </h1>
            <p
              data-testid="not-found-copy"
              className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-white/68"
            >
              The link may have moved, or the page may not exist yet. You can head back to the main site, browse
              services, or tell us what you were trying to find.
            </p>
            <div data-testid="not-found-actions" className="mt-9 flex flex-wrap gap-3">
              <TrackedCtaButton
                href="/"
                label="Back to home"
                event="not-found"
                dataTestId="not-found-home-button"
                icon={<ArrowLeft aria-hidden="true" className="size-4" />}
              >
                Back to home
              </TrackedCtaButton>
              <TrackedCtaButton
                href="/services"
                label="Explore services"
                event="not-found"
                variant="secondary"
                dataTestId="not-found-services-button"
                icon={<Compass aria-hidden="true" className="size-4" />}
              >
                Explore services
              </TrackedCtaButton>
              <TrackedCtaButton
                href="/contact?source=404"
                label="Talk to Nodo"
                event="not-found"
                variant="ghost"
                dataTestId="not-found-contact-button"
                icon={<MessageCircle aria-hidden="true" className="size-4" />}
              >
                Talk to Nodo
              </TrackedCtaButton>
            </div>
          </div>

          <div
            data-testid="not-found-visual"
            className="relative min-h-[24rem] overflow-hidden rounded-[2rem] border border-white/12 bg-[linear-gradient(145deg,rgba(255,255,255,0.07),rgba(255,255,255,0.035)_45%,rgba(124,58,237,0.16))] p-6 shadow-[0_30px_110px_rgba(0,0,0,0.34)]"
            aria-hidden="true"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-nodo-lavender/50 to-transparent" />
            <div className="relative flex h-full min-h-[21rem] flex-col justify-between">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <NodoLogo inverted className="text-white" />
                <span className="rounded-full border border-white/12 bg-white/[0.06] px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-white/52">
                  path missing
                </span>
              </div>
              <div className="grid gap-3">
                <span className="h-4 w-2/3 rounded-full bg-white/16" />
                <span className="h-4 w-5/6 rounded-full bg-white/10" />
                <span className="h-4 w-1/2 rounded-full bg-nodo-purple/60" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <span className="h-24 rounded-2xl border border-white/10 bg-white/[0.08]" />
                <span className="h-24 rounded-2xl border border-nodo-lavender/30 bg-nodo-purple/28" />
                <span className="h-24 rounded-2xl border border-white/10 bg-white/[0.08]" />
              </div>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}
