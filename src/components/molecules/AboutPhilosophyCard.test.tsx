import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/test/render";
import { AboutPhilosophyCard } from "./AboutPhilosophyCard";

describe("AboutPhilosophyCard", () => {
  it("renders the philosophy step with a stable test id", () => {
    renderWithProviders(
      <AboutPhilosophyCard
        index={0}
        step={{
          word: "Connect",
          line: "Understand the business, the people, and the opportunity.",
        }}
      />,
    );

    expect(screen.getByTestId("about-philosophy-connect")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Connect" })).toBeInTheDocument();
  });
});
