import type { CSSProperties } from "react";
import { NodoLogo } from "@/components/atoms/NodoLogo";
import { AnalyticsPreferencesButton } from "@/components/molecules/AnalyticsPreferencesButton";
import { FooterContactPanel } from "@/components/molecules/FooterContactPanel";
import { FooterLinkColumn, type FooterLink } from "@/components/molecules/FooterLinkColumn";

const taglineWords = ["Clarity.", "Speed.", "Results."];

const footerColumns: Array<{ title: string; links: FooterLink[] }> = [
  {
    title: "Explore",
    links: [
      { label: "Services", href: "/services" },
      { label: "Website design Auckland", href: "/services/website-design-auckland" },
      { label: "Plans", href: "/plans" },
      { label: "Case studies", href: "/case-studies" },
    ],
  },
  {
    title: "Plans",
    links: [
      { label: "Website Plans", href: "/plans/websites" },
      { label: "Marketing & Branding", href: "/plans/marketing-branding" },
      { label: "All-in-One Bundles", href: "/plans/marketing-branding#bundles" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      data-testid="site-footer"
      className="relative overflow-hidden bg-nodo-black pb-4 text-white"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(124,58,237,0.18),transparent_26%),radial-gradient(circle_at_82%_36%,rgba(232,48,207,0.08),transparent_24%)]" />
      <div className="relative z-10">
        <div
          data-testid="site-footer-main-panel"
          className="overflow-hidden border-y border-white/12 bg-white/[0.035] shadow-[0_30px_110px_rgba(0,0,0,0.34)]"
        >
          <div className="grid w-full gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[35fr_30fr_35fr] lg:items-start lg:px-10">
            <div data-testid="site-footer-brand-block">
              <div>
                <NodoLogo inverted className="text-white" />
                <div
                  data-testid="site-footer-tagline"
                  className="nodo-footer-tagline mt-7 text-4xl font-black leading-[0.95] tracking-normal sm:text-6xl"
                >
                  <span className="sr-only">Clarity. Speed. Results.</span>
                  {taglineWords.map((word, wordIndex) => (
                    <span
                      key={word}
                      aria-hidden="true"
                      className={`nodo-footer-tagline-word${wordIndex === 0 ? " nodo-footer-tagline-word-static" : ""}`}
                      style={{
                        "--word-delay": `${wordIndex * 2.45}s`,
                      } as CSSProperties}
                    >
                      {[...word].map((letter, letterIndex) => (
                        <span
                          key={`${word}-${letterIndex}`}
                          className="nodo-footer-tagline-letter"
                          style={{
                            "--letter-delay": `${wordIndex * 2.45 + letterIndex * 0.045}s`,
                          } as CSSProperties}
                        >
                          {letter}
                        </span>
                      ))}
                    </span>
                  ))}
                </div>
                <p
                  data-testid="site-footer-description"
                  className="mt-6 max-w-md text-lg leading-8 text-white/62"
                >
                  Website design, marketing, and branding for Auckland service businesses.
                </p>
              </div>
            </div>

            <FooterContactPanel />

            <div data-testid="site-footer-navigation-row" className="w-full lg:justify-self-end">
              <nav
                data-testid="site-footer-navigation"
                className="grid w-full gap-8 sm:grid-cols-3"
                aria-label="Footer navigation"
              >
                {footerColumns.map((column) => (
                  <FooterLinkColumn key={column.title} {...column} />
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div
          data-testid="site-footer-legal-row"
          className="flex w-full flex-col gap-3 px-5 pt-6 text-xs font-semibold uppercase tracking-[0.18em] text-white/34 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10"
        >
          <p data-testid="site-footer-location">Built in Auckland, New Zealand.</p>
          <div className="flex flex-col gap-3 sm:items-end">
            <AnalyticsPreferencesButton />
            <p data-testid="site-footer-copyright">© {year} Nodo.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
