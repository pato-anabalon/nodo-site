import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/test/render";
import { CaseStudiesPage } from "./CaseStudiesPage";
import { LandingPage } from "./LandingPage";
import { MarketingBrandingPlansPage } from "./MarketingBrandingPlansPage";
import { PlansHubPage } from "./PlansHubPage";
import { ServicesPage } from "./ServicesPage";
import { WebsiteDesignAucklandPage } from "./WebsiteDesignAucklandPage";
import { WebsitePlansPage } from "./WebsitePlansPage";

describe("page templates", () => {
  beforeEach(() => {
    document.documentElement.dataset.nodoPreloaded = "true";
  });

  it("should render LandingPage", () => {
    renderWithProviders(<LandingPage />);

    expect(screen.getByTestId("home-page-main")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("nodo");
  });

  it("should render ServicesPage", () => {
    renderWithProviders(<ServicesPage />);

    expect(screen.getByTestId("services-page-main")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("should render PlansHubPage", () => {
    renderWithProviders(<PlansHubPage />);

    expect(screen.getByTestId("plans-page-main")).toBeInTheDocument();
    expect(screen.getByTestId("plans-hub-card-grid")).toBeInTheDocument();
  });

  it("should render WebsitePlansPage", () => {
    renderWithProviders(<WebsitePlansPage />);

    expect(screen.getByTestId("plans-page-main")).toBeInTheDocument();
    expect(screen.getByTestId("plans-grid")).toBeInTheDocument();
    expect(screen.getByTestId("plans-launch-card")).toBeInTheDocument();
  });

  it("should render MarketingBrandingPlansPage", () => {
    renderWithProviders(<MarketingBrandingPlansPage />);

    expect(screen.getByTestId("marketing-branding-plans-page-main")).toBeInTheDocument();
    expect(screen.getByTestId("marketing-plans-section")).toBeInTheDocument();
    expect(screen.getByTestId("branding-plans-section")).toBeInTheDocument();
  });

  it("should render WebsiteDesignAucklandPage", () => {
    renderWithProviders(<WebsiteDesignAucklandPage />);

    expect(screen.getByTestId("website-design-auckland-page-main")).toBeInTheDocument();
    expect(screen.getByTestId("website-design-auckland-faq-section")).toBeInTheDocument();
  });

  it("should render CaseStudiesPage", () => {
    renderWithProviders(<CaseStudiesPage />);

    expect(screen.getByTestId("case-studies-page-main")).toBeInTheDocument();
    expect(screen.getAllByText(/PlasterPro Solution/i).length).toBeGreaterThan(0);
  });
});
