import { indexableRoutes, siteUrl } from "@/lib/seo";
import sitemap from "./sitemap";

describe("sitemap", () => {
  it("should include all indexable routes", () => {
    expect(sitemap()).toEqual(
      indexableRoutes.map((route) => ({
        url: `${siteUrl}${route.path === "/" ? "/" : route.path}`,
        changeFrequency: "monthly",
        priority: route.priority,
      })),
    );
  });
});
