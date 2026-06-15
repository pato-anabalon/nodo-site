import { screen } from "@testing-library/react";
import { expectNoA11yViolations } from "@/test/a11y";
import { renderWithProviders } from "@/test/render";
import { MetaChip } from "./MetaChip";

describe("MetaChip", () => {
  it.each([
    ["dark", "purple"],
    ["light", "lavender"],
    ["purple", "pink"],
  ] as const)("should render %s tone with %s accent", async (tone, accent) => {
    const view = renderWithProviders(
      <MetaChip tone={tone} accent={accent} dataTestId={`chip-${tone}`}>
        Auckland
      </MetaChip>,
    );

    expect(screen.getByText("Auckland")).toBeInTheDocument();
    expect(screen.getByTestId(`chip-${tone}`)).toBeInTheDocument();
    await expectNoA11yViolations(view);
  });

  it("should render with default props", () => {
    renderWithProviders(<MetaChip>Default chip</MetaChip>);

    expect(screen.getByText("Default chip")).toBeInTheDocument();
  });
});
