import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/test/render";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("should render footer navigation and legal content", () => {
    renderWithProviders(<Footer />);

    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: /footer navigation/i })).toBeInTheDocument();
    expect(screen.getByText(/built in auckland/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${new Date().getFullYear()} Nodo`))).toBeInTheDocument();
  });
});
