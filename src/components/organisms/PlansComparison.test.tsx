import { screen } from "@testing-library/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { trackPlansComparisonViewed } from "@/lib/analytics";
import { plans } from "@/lib/content";
import { renderWithProviders } from "@/test/render";
import { PlansComparison } from "./PlansComparison";

jest.mock("@/lib/analytics", () => ({
  trackPlansComparisonViewed: jest.fn(),
}));

describe("PlansComparison", () => {
  it("should render desktop and mobile comparison data and track view", () => {
    renderWithProviders(<PlansComparison />);

    expect(screen.getByRole("table")).toBeInTheDocument();
    for (const plan of plans) {
      expect(screen.getAllByText(plan.name).length).toBeGreaterThan(0);
    }
    expect(screen.getAllByText(/included/i).length).toBeGreaterThan(0);
    const options = (ScrollTrigger.create as jest.Mock).mock.calls.at(-1)?.[0];
    options?.onEnter();
    expect(trackPlansComparisonViewed).toHaveBeenCalledTimes(1);
  });
});
