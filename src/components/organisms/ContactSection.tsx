"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ConstellationBackground } from "@/components/atoms/ConstellationBackground";
import { Container } from "@/components/atoms/Container";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { ContactForm } from "@/components/molecules/ContactForm";

gsap.registerPlugin(useGSAP);

type ContactSectionProps = {
  selectedPlanSlug?: string;
  intent?: string;
  source?: string;
};

export function ContactSection({ selectedPlanSlug, intent, source }: ContactSectionProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(
          [
            ".contact-page-heading > *",
            ".contact-page-detail",
            ".contact-page-form-card",
            "[data-testid='contact-form'] > *",
          ],
          {
            autoAlpha: 0,
            y: 20,
          },
        );
        gsap.set(".contact-page-form-card", {
          scale: 0.98,
        });

        const tl = gsap.timeline({
          paused: true,
          defaults: { ease: "power3.out" },
        });

        tl.to(".contact-page-heading > *", {
          autoAlpha: 1,
          y: 0,
          duration: 0.72,
          stagger: 0.08,
        })
          .to(
            ".contact-page-detail",
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.58,
              stagger: 0.06,
            },
            "-=0.22",
          )
          .to(
            ".contact-page-form-card",
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.78,
            },
            "-=0.42",
          )
          .to(
            "[data-testid='contact-form'] > *",
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.54,
              stagger: 0.045,
              clearProps: "transform,visibility",
            },
            "-=0.46",
          );

        const playIntro = () => {
          tl.play(0);
        };

        if (document.documentElement.dataset.nodoPreloaded === "true") {
          playIntro();
        } else {
          window.addEventListener("nodo:preloader-complete", playIntro, {
            once: true,
          });
        }

        return () => {
          window.removeEventListener("nodo:preloader-complete", playIntro);
        };
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            ".contact-page-heading > *",
            ".contact-page-detail",
            ".contact-page-form-card",
            "[data-testid='contact-form'] > *",
          ],
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
          },
        );
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <main
      ref={root}
      data-testid="contact-page-main"
      className="relative flex min-h-screen overflow-hidden bg-white pt-28 text-nodo-black"
    >
      <ConstellationBackground
        backgroundTone="light"
        className="opacity-18 mix-blend-multiply"
        density={1}
        fps={34}
        interactive
        maxDevicePixelRatio={1.5}
        maxNodes={104}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(124,58,237,0.10),transparent_28%),radial-gradient(circle_at_82%_22%,rgba(232,48,207,0.06),transparent_22%)]" />
      <Container className="relative z-10 flex flex-1">
        <section
          data-testid="contact-page-form-section"
          className="grid w-full flex-1 items-center gap-12 border-b border-black/8 pb-16 pt-10 lg:grid-cols-[0.8fr_1fr]"
        >
          <div data-testid="contact-page-intro">
            <SectionHeading
              eyebrow="Contact"
              title="Tell Nodo what needs to move faster."
              description="Share the brand, digital marketing, or website project you want to create, improve, or scale. The first step is clarity."
              className="contact-page-heading"
              surfaceTone="light"
            />
            <div data-testid="contact-page-details" className="mt-10 grid gap-4 text-sm text-nodo-ink/66">
              <p className="contact-page-detail">
                <span className="font-semibold text-nodo-black">Location:</span> Auckland, New Zealand
              </p>
              <p className="contact-page-detail">
                <span className="font-semibold text-nodo-black">Focus:</span> Branding, digital
                marketing, high-performing websites, and connected growth systems.
              </p>
            </div>
          </div>
          <div data-testid="contact-page-form-card" className="contact-page-form-card relative overflow-hidden rounded-[2rem] border border-black/8 bg-white/82 p-5 shadow-[0_24px_90px_rgba(22,19,25,0.10)] backdrop-blur-xl sm:p-8">
            <ContactForm selectedPlanSlug={selectedPlanSlug} intent={intent} source={source} />
          </div>
        </section>
      </Container>
    </main>
  );
}
