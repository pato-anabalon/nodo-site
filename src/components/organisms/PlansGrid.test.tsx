import { screen } from "@testing-library/react";
import { plans } from "@/lib/content";
import { renderWithProviders } from "@/test/render";
import { LaunchPlanCard, PlansGrid } from "./PlansGrid";

describe("PlansGrid", () => {
  it("should render growth partnership plans before Launch", () => {
    renderWithProviders(<PlansGrid />);

    expect(screen.getByTestId("plans-grid-growth-partnership-cards")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Nodo Flow" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Nodo Growth" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Nodo Nexus" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Nodo Launch" })).not.toBeInTheDocument();
  });

  it("should render the Launch alternative card", () => {
    renderWithProviders(<LaunchPlanCard />);

    expect(screen.getByRole("heading", { name: plans.find((plan) => plan.tone === "one-off")?.name })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /launch/i })).toHaveAttribute("href", expect.stringContaining("source=plans"));
  });
});
