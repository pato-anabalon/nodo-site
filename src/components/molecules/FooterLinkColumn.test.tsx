import { screen } from "@testing-library/react";
import { expectNoA11yViolations } from "@/test/a11y";
import { renderWithProviders } from "@/test/render";
import { FooterLinkColumn } from "./FooterLinkColumn";

describe("FooterLinkColumn", () => {
  it("should render titled navigation links", async () => {
    const view = renderWithProviders(
      <FooterLinkColumn
        title="Explore"
        links={[
          { label: "Services", href: "/services" },
          { label: "Plans", href: "/plans" },
        ]}
      />,
    );

    expect(screen.getByText("Explore")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /services/i })).toHaveAttribute("href", "/services");
    expect(screen.getByRole("link", { name: /plans/i })).toHaveAttribute("href", "/plans");
    await expectNoA11yViolations(view);
  });
});
