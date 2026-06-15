import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/test/render";
import { AboutSection } from "./AboutSection";
import { CTASection } from "./CTASection";
import { HomeProofSection } from "./HomeProofSection";
import { ResultsSection } from "./ResultsSection";
import { ServicesSection } from "./ServicesSection";

describe("home section organisms", () => {
  it("should render the services section", () => {
    renderWithProviders(<ServicesSection />);

    expect(screen.getByRole("heading", { name: /three core services/i })).toBeInTheDocument();
  });

  it("should render the proof section with case study CTA", () => {
    renderWithProviders(<HomeProofSection />);

    expect(screen.getByRole("heading", { name: /outdated wix site/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view the case study/i })).toHaveAttribute("href", "/case-studies");
  });

  it("should render the results section", () => {
    renderWithProviders(<ResultsSection />);

    expect(screen.getByRole("heading", { name: /easier to trust/i })).toBeInTheDocument();
  });

  it("should render the about section", () => {
    renderWithProviders(<AboutSection />);

    expect(screen.getByRole("heading", { name: /digital growth partner/i })).toBeInTheDocument();
    expect(screen.getByTestId("home-about-video")).toHaveAttribute("src", "/videos/team-discussion-optimized.mp4");
  });

  it("should render the final CTA section", () => {
    renderWithProviders(<CTASection />);

    expect(screen.getByRole("heading", { name: /digital presence/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /start the conversation/i })).toHaveAttribute("href", "/contact");
  });
});
