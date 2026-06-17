import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/test/render";
import RootLayout, { metadata } from "./layout";

describe("RootLayout", () => {
  it("should render the app shell", () => {
    renderWithProviders(
      <RootLayout>
        <main>Page content</main>
      </RootLayout>,
    );

    expect(screen.getByText("Page content")).toBeInTheDocument();
    expect(screen.getByTestId("site-header")).toBeInTheDocument();
    expect(screen.getByTestId("site-footer")).toBeInTheDocument();
    expect(document.documentElement).toHaveAttribute("lang", "en-NZ");
  });

  it("should expose global metadata", () => {
    expect(metadata.metadataBase?.toString()).toBe("https://www.nodo.co.nz/");
    expect(metadata.title).toEqual(expect.objectContaining({ template: "%s | Nodo" }));
  });
});
