import { cn, testIdSlug } from "./utils";

describe("utils", () => {
  it("should join class names", () => {
    expect(cn("a", false && "b", "c")).toBe("a c");
  });

  it("should create stable test id slugs", () => {
    expect(testIdSlug("Website Design Auckland!")).toBe("website-design-auckland");
  });
});
