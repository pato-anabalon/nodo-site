import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/test/render";

jest.mock("@/components/templates/LandingPage", () => ({
  LandingPage: () => <main data-testid="home-page-main" />,
}));

jest.mock("@/components/templates/ServicesPage", () => ({
  ServicesPage: () => <main data-testid="services-page-main" />,
}));

jest.mock("@/components/templates/WebsiteDesignAucklandPage", () => ({
  WebsiteDesignAucklandPage: () => <main data-testid="website-design-auckland-page-main" />,
}));

jest.mock("@/components/templates/PlansHubPage", () => ({
  PlansHubPage: () => <main data-testid="plans-hub-hero-section" />,
}));

jest.mock("@/components/templates/WebsitePlansPage", () => ({
  WebsitePlansPage: () => <main data-testid="plans-page-hero-section" />,
}));

jest.mock("@/components/templates/MarketingBrandingPlansPage", () => ({
  MarketingBrandingPlansPage: () => <main data-testid="marketing-branding-plans-page-main" />,
}));

jest.mock("@/components/templates/CaseStudiesPage", () => ({
  CaseStudiesPage: () => <main data-testid="case-studies-page-main" />,
}));

jest.mock("@/components/organisms/ContactSection", () => ({
  ContactSection: ({ selectedPlanSlug, intent, source }: {
    selectedPlanSlug?: string;
    intent?: string;
    source?: string;
  }) => (
    <main data-testid="contact-page-main">
      {selectedPlanSlug}:{intent}:{source}
    </main>
  ),
}));

import AboutPage, { metadata as aboutMetadata } from "./about/page";
import CaseStudiesPageRoute from "./case-studies/page";
import ContactPage, { metadata as contactMetadata } from "./contact/page";
import Home, { metadata as homeMetadata } from "./page";
import MarketingBrandingPlansRoute from "./plans/marketing-branding/page";
import PlansRoute from "./plans/page";
import WebsitePlansRoute from "./plans/websites/page";
import ServicesPage from "./services/page";
import WebsiteDesignAucklandRoute from "./services/website-design-auckland/page";

describe("App Router pages", () => {
  beforeEach(() => {
    document.documentElement.dataset.nodoPreloaded = "true";
  });

  it("should expose expected metadata", () => {
    expect(homeMetadata.title).toBe("Nodo | Brand, Marketing, and Websites for Growing Businesses");
    expect(contactMetadata.title).toBe("Contact");
    expect(aboutMetadata.robots).toEqual({ index: false, follow: true });
  });

  it("should render home", () => {
    renderWithProviders(<Home />);

    expect(screen.getByTestId("home-page-main")).toBeInTheDocument();
  });

  it("should render services routes", () => {
    const { unmount } = renderWithProviders(<ServicesPage />);
    expect(screen.getByTestId("services-page-main")).toBeInTheDocument();
    unmount();

    renderWithProviders(<WebsiteDesignAucklandRoute />);
    expect(screen.getByTestId("website-design-auckland-page-main")).toBeInTheDocument();
  });

  it("should render plans routes", () => {
    const { unmount } = renderWithProviders(<PlansRoute />);
    expect(screen.getByTestId("plans-hub-hero-section")).toBeInTheDocument();
    unmount();

    const websites = renderWithProviders(<WebsitePlansRoute />);
    expect(screen.getByTestId("plans-page-hero-section")).toBeInTheDocument();
    websites.unmount();

    renderWithProviders(<MarketingBrandingPlansRoute />);
    expect(screen.getByTestId("marketing-branding-plans-page-main")).toBeInTheDocument();
  });

  it("should render case studies and about", () => {
    const { unmount } = renderWithProviders(<CaseStudiesPageRoute />);
    expect(screen.getByTestId("case-studies-page-main")).toBeInTheDocument();
    unmount();

    renderWithProviders(<AboutPage />);
    expect(screen.getByTestId("about-page-main")).toBeInTheDocument();
  });

  it("should pass contact search params into the contact form", async () => {
    const ui = await ContactPage({
      searchParams: Promise.resolve({
        plan: "nodo-flow",
        intent: "quote",
        source: "plans",
      }),
    });

    renderWithProviders(ui);

    expect(screen.getByTestId("contact-page-main")).toHaveTextContent("nodo-flow:quote:plans");
  });
});
