"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Share2,
  Target,
  type LucideIcon,
} from "lucide-react";
import { ConstellationBackground } from "@/components/atoms/ConstellationBackground";
import { Container } from "@/components/atoms/Container";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { ContactForm } from "@/components/molecules/ContactForm";
import { contactEmail, contactPhone, socialLinks, type SocialPlatform } from "@/lib/seo";

gsap.registerPlugin(useGSAP);

type ContactSectionProps = {
  selectedPlanSlug?: string;
  intent?: string;
  source?: string;
};

type ContactDetail = {
  label: string;
  value: string;
  href?: string;
  icon: LucideIcon;
  testId: string;
};

const socialIcons: Record<SocialPlatform, LucideIcon> = {
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
};

const contactDetails: ContactDetail[] = [
  {
    label: "Location",
    value: "Auckland, New Zealand",
    icon: MapPin,
    testId: "contact-page-detail-location",
  },
  {
    label: "Best fit",
    value: "Brand clarity, digital marketing, high-performing websites, and growth plans that connect the work.",
    icon: Target,
    testId: "contact-page-detail-best-fit",
  },
  {
    label: "Email",
    value: contactEmail,
    href: `mailto:${contactEmail}`,
    icon: Mail,
    testId: "contact-page-detail-email",
  },
  {
    label: "Phone",
    value: contactPhone,
    href: `tel:${contactPhone.replace(/\s+/g, "")}`,
    icon: Phone,
    testId: "contact-page-detail-phone",
  },
];

export function ContactSection({ selectedPlanSlug, intent, source }: ContactSectionProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(
          [
            ".contact-page-heading > *",
            ".contact-page-details-card",
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
            ".contact-page-details-card",
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.62,
            },
            "-=0.28",
          )
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
            ".contact-page-details-card",
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
              title="Tell us what you want to move forward."
              description="Share the project, pressure point, or growth goal. Nodo will come back with the clearest next step, not a generic sales pitch."
              className="contact-page-heading"
              headingLevel="h1"
              surfaceTone="light"
            />
            <div
              data-testid="contact-page-details"
              className="contact-page-details-card relative mt-10 overflow-hidden rounded-[2rem] border border-black/8 bg-white/80 p-5 text-sm text-nodo-ink/66 shadow-[0_22px_70px_rgba(22,19,25,0.10)] backdrop-blur-xl sm:p-6"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_92%_82%,rgba(124,58,237,0.14),transparent_32%),radial-gradient(circle_at_72%_100%,rgba(232,48,207,0.09),transparent_26%)]" />
              <div className="relative grid gap-1">
                <p className="contact-page-detail text-xs font-black uppercase tracking-[0.2em] text-nodo-lavender">
                  Start with clarity
                </p>
                <p className="contact-page-detail max-w-md text-sm font-semibold leading-6 text-nodo-ink/62">
                  Send the form for context, or use a direct channel if you already know what you need.
                </p>
              </div>
              <div className="relative mt-5 grid gap-4">
                {contactDetails.map((detail) => {
                  const Icon = detail.icon;
                  const value = (
                    <span className="block text-sm font-semibold leading-6 text-nodo-ink/72 transition group-hover/detail:text-nodo-black">
                      {detail.value}
                    </span>
                  );

                  return (
                    <div
                      key={detail.label}
                      className="contact-page-detail group/detail grid grid-cols-[2.5rem_1fr] items-center gap-3 border-t border-black/8 pt-4 first:border-t-0 first:pt-0"
                      data-testid={detail.testId}
                    >
                      <span className="inline-flex size-10 items-center justify-center rounded-full border border-black/8 bg-white text-nodo-purple shadow-[0_8px_24px_rgba(124,58,237,0.10)] transition duration-300 group-hover/detail:-translate-y-0.5 group-hover/detail:border-nodo-purple/25 group-hover/detail:shadow-[0_12px_30px_rgba(124,58,237,0.16)] motion-reduce:transform-none">
                        <Icon aria-hidden="true" className="size-4" />
                      </span>
                      <span>
                        <span className="block text-[0.68rem] font-black uppercase tracking-[0.18em] text-nodo-ink/42">
                          {detail.label}
                        </span>
                        {detail.href ? (
                          <a
                            href={detail.href}
                            className="inline-block cursor-pointer font-semibold text-nodo-purple transition duration-200 hover:-translate-y-0.5 hover:text-nodo-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nodo-purple motion-reduce:transform-none"
                          >
                            {value}
                          </a>
                        ) : (
                          value
                        )}
                      </span>
                    </div>
                  );
                })}
                <div className="contact-page-detail grid grid-cols-[2.5rem_1fr] items-center gap-3 border-t border-black/8 pt-4">
                  <span className="inline-flex size-10 items-center justify-center rounded-full border border-black/8 bg-white text-nodo-purple shadow-[0_8px_24px_rgba(124,58,237,0.10)]">
                    <Share2 aria-hidden="true" className="size-4" />
                  </span>
                  <span>
                    <span className="block text-[0.68rem] font-black uppercase tracking-[0.18em] text-nodo-ink/42">
                      Social
                    </span>
                    <span className="mt-2 flex flex-wrap gap-2">
                      {socialLinks.map((link) => {
                        const Icon = socialIcons[link.platform];

                        if (!link.href) {
                          return (
                            <span
                              key={link.platform}
                              aria-label={`${link.label} coming soon`}
                              aria-disabled="true"
                              className="inline-flex size-10 cursor-not-allowed items-center justify-center rounded-full border border-nodo-purple/20 bg-white text-nodo-ink/32 opacity-60"
                              data-testid={`contact-page-social-${link.platform}`}
                              title={`${link.label} coming soon`}
                            >
                              <Icon aria-hidden="true" className="size-4" />
                            </span>
                          );
                        }

                        return (
                          <a
                            key={link.platform}
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={link.label}
                            className="group/social inline-flex size-10 cursor-pointer items-center justify-center rounded-full border border-nodo-purple/35 bg-white text-nodo-purple shadow-[0_8px_24px_rgba(124,58,237,0.10)] transition duration-300 hover:-translate-y-1 hover:rotate-3 hover:scale-105 hover:border-nodo-purple hover:bg-nodo-purple hover:text-white hover:shadow-[0_16px_34px_rgba(124,58,237,0.24)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nodo-purple motion-reduce:transform-none"
                            data-testid={`contact-page-social-${link.platform}`}
                            title={link.label}
                          >
                            <Icon
                              aria-hidden="true"
                              className="size-4 transition duration-300 group-hover/social:-rotate-12 group-hover/social:scale-110 motion-reduce:transform-none"
                            />
                          </a>
                        );
                      })}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            data-testid="contact-page-form-card"
            className="contact-page-form-card relative overflow-hidden rounded-[2rem] border border-nodo-purple/35 bg-white/88 p-5 shadow-[0_24px_90px_rgba(22,19,25,0.12)] backdrop-blur-xl sm:p-8"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_4%,rgba(124,58,237,0.10),transparent_30%),radial-gradient(circle_at_86%_100%,rgba(232,48,207,0.07),transparent_26%)]" />
            <div className="relative">
              <ContactForm selectedPlanSlug={selectedPlanSlug} intent={intent} source={source} />
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}
