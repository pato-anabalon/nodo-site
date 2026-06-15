import { screen } from "@testing-library/react";
import { expectNoA11yViolations } from "@/test/a11y";
import { renderWithProviders } from "@/test/render";
import { SectionHeading } from "./SectionHeading";

describe("SectionHeading", () => {
  it("should render heading, eyebrow, description, and children", async () => {
    const view = renderWithProviders(
      <SectionHeading
        eyebrow="Services"
        title="What Nodo builds"
        description="Brand, marketing, and websites."
        headingLevel="h1"
      >
        <a href="/contact">Talk to Nodo</a>
      </SectionHeading>,
    );

    expect(screen.getByRole("heading", { level: 1, name: /what nodo builds/i })).toBeInTheDocument();
    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("Brand, marketing, and websites.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /talk to nodo/i })).toHaveAttribute("href", "/contact");
    await expectNoA11yViolations(view);
  });
});
