import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/test/render";
import NotFound, { metadata } from "./not-found";

describe("NotFound", () => {
  it("should render helpful 404 actions", () => {
    renderWithProviders(<NotFound />);

    expect(screen.getByRole("heading", { level: 1, name: /drifted off the map/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /back to home/i })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: /explore services/i })).toHaveAttribute("href", "/services");
    expect(screen.getByRole("link", { name: /talk to nodo/i })).toHaveAttribute("href", "/contact?source=404");
    expect(metadata.robots).toEqual({ index: false, follow: false });
  });
});
