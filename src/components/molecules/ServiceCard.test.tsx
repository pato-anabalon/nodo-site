import { Globe } from "lucide-react";
import { screen } from "@testing-library/react";
import { expectNoA11yViolations } from "@/test/a11y";
import { renderWithProviders } from "@/test/render";
import { ServiceCard } from "./ServiceCard";

describe("ServiceCard", () => {
  it("should render service content and index", async () => {
    const view = renderWithProviders(
      <ServiceCard
        index={1}
        service={{
          eyebrow: "Websites",
          title: "Website design",
          description: "Custom websites for growing businesses.",
          icon: Globe,
        }}
      />,
    );

    expect(screen.getByRole("heading", { name: /website design/i })).toBeInTheDocument();
    expect(screen.getByText("Websites")).toBeInTheDocument();
    expect(screen.getByText("02")).toBeInTheDocument();
    await expectNoA11yViolations(view);
  });
});
