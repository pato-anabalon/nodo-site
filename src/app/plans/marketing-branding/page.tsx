import type { Metadata } from "next";
import { MarketingBrandingPlansPage } from "@/components/templates/MarketingBrandingPlansPage";

export const metadata: Metadata = {
  title: "Marketing & Branding Plans | Nodo",
  description:
    "Explore Nodo's marketing plans, branding packages and connected all-in-one bundles for growing New Zealand businesses.",
};

export default function MarketingBrandingPlansRoute() {
  return <MarketingBrandingPlansPage />;
}
