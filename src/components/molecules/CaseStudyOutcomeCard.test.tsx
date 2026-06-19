import { ShieldCheck } from "lucide-react";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/test/render";
import { CaseStudyOutcomeCard } from "./CaseStudyOutcomeCard";

describe("CaseStudyOutcomeCard", () => {
  it("renders a qualitative case study outcome", () => {
    renderWithProviders(
      <CaseStudyOutcomeCard
        icon={ShieldCheck}
        index={0}
        outcome="Stronger credibility from the first visit"
      />,
    );

    expect(
      screen.getByText("Stronger credibility from the first visit"),
    ).toBeInTheDocument();
  });
});
