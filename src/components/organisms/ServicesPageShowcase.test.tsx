import { screen } from "@testing-library/react";
import { services } from "@/lib/content";
import { renderWithProviders } from "@/test/render";
import { ServicesPageShowcase } from "./ServicesPageShowcase";

describe("ServicesPageShowcase", () => {
  it("should render service showcase cards and CTAs", () => {
    renderWithProviders(<ServicesPageShowcase />);

    for (const service of services) {
      expect(screen.getByRole("heading", { name: service.title })).toBeInTheDocument();
    }
  });
});
