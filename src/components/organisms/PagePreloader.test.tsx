import { act, screen } from "@testing-library/react";
import { renderWithProviders } from "@/test/render";
import { PagePreloader } from "./PagePreloader";

describe("PagePreloader", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
      window.setTimeout(() => callback(0), 0);
      return 1;
    });
    window.sessionStorage.clear();
    delete document.documentElement.dataset.nodoPreloaded;
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it("should skip when the preloader has already been seen", () => {
    window.sessionStorage.setItem("nodo:preloader-seen", "true");

    renderWithProviders(<PagePreloader />);

    expect(screen.queryByRole("status", { name: /loading nodo/i })).not.toBeInTheDocument();
    expect(document.documentElement.dataset.nodoPreloaded).toBe("true");
  });

  it("should show then complete the preloader", async () => {
    const listener = jest.fn();
    window.addEventListener("nodo:preloader-complete", listener);

    renderWithProviders(<PagePreloader />);

    await act(async () => {
      jest.runOnlyPendingTimers();
    });

    expect(screen.getByRole("status", { name: /loading nodo/i })).toBeInTheDocument();

    await act(async () => {
      jest.advanceTimersByTime(1_500);
    });

    expect(window.sessionStorage.getItem("nodo:preloader-seen")).toBe("true");
    expect(listener).toHaveBeenCalled();
    window.removeEventListener("nodo:preloader-complete", listener);
  });
});
