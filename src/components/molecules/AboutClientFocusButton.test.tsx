import { Sparkles } from "lucide-react";
import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "@/test/render";
import { AboutClientFocusButton } from "./AboutClientFocusButton";

describe("AboutClientFocusButton", () => {
  it("renders an active client control and handles selection", () => {
    const onClick = jest.fn();

    renderWithProviders(
      <AboutClientFocusButton
        dataTestId="about-client-emerging-brands"
        icon={Sparkles}
        isActive
        isPaused={false}
        label="Emerging brands"
        onClick={onClick}
        progressDurationMs={2000}
      />,
    );

    const button = screen.getByTestId("about-client-emerging-brands");

    expect(button).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
