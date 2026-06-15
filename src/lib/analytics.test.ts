import { track } from "@vercel/analytics";
import {
  trackContactFormError,
  trackContactFormSubmitted,
  trackHomepageCtaClicked,
  trackNotFoundCtaClicked,
  trackPlansComparisonViewed,
  trackPlansCtaClicked,
  trackPlansFaqOpened,
} from "./analytics";

describe("analytics", () => {
  it("should forward tracking events to Vercel Analytics", () => {
    trackPlansCtaClicked({ plan: "flow", intent: "quote", location: "plans" });
    trackPlansComparisonViewed();
    trackPlansFaqOpened("Question?");
    trackContactFormSubmitted({ plan: "not-selected", intent: "general", source: "contact" });
    trackContactFormError({ plan: "not-selected", intent: "general", source: "contact", reason: "failed" });
    trackHomepageCtaClicked({ label: "Talk", location: "hero", href: "/contact" });
    trackNotFoundCtaClicked({ label: "Home", href: "/" });

    expect(track).toHaveBeenCalledTimes(7);
    expect(track).toHaveBeenCalledWith("Plans CTA Clicked", {
      plan: "flow",
      intent: "quote",
      location: "plans",
    });
  });
});
