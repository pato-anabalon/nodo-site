import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { trackPlansCtaClicked } from "@/lib/analytics";
import { renderWithProviders } from "@/test/render";
import { TrackedPlanCta } from "./TrackedPlanCta";

jest.mock("@/lib/analytics", () => ({
  trackPlansCtaClicked: jest.fn(),
}));

describe("TrackedPlanCta", () => {
  it("should track plan CTA clicks", async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <TrackedPlanCta href="/contact?plan=flow" plan="flow" intent="quote" location="plans_grid">
        Choose Flow
      </TrackedPlanCta>,
    );

    await user.click(screen.getByRole("link", { name: /choose flow/i }));

    expect(trackPlansCtaClicked).toHaveBeenCalledWith({
      plan: "flow",
      intent: "quote",
      location: "plans_grid",
    });
  });
});
