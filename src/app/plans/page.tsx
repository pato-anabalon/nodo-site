import type { Metadata } from "next";
import { PlansPage } from "@/components/templates/PlansPage";

export const metadata: Metadata = {
  title: "Nodo Plans | Website, Growth and Digital Partnership Plans",
  description:
    "Explore Nodo's website and digital growth plans for New Zealand businesses, including one-off builds and ongoing support plans.",
};

export default function PlansRoute() {
  return <PlansPage />;
}
