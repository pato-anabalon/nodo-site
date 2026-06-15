import { screen } from "@testing-library/react";
import { expectNoA11yViolations } from "@/test/a11y";
import { renderWithProviders } from "@/test/render";
import { NodoLogo } from "./NodoLogo";

describe("NodoLogo", () => {
  it("should render the full logo by default", async () => {
    const view = renderWithProviders(<NodoLogo />);

    expect(screen.getByLabelText("Nodo")).toHaveTextContent("nodo.");
    await expectNoA11yViolations(view);
  });

  it("should render mark only", () => {
    renderWithProviders(<NodoLogo markOnly />);

    expect(screen.getByLabelText("Nodo")).not.toHaveTextContent("nodo.");
  });
});
