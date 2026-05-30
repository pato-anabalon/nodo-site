import type { Metadata } from "next";
import { WebsitePlansPage } from "@/components/templates/WebsitePlansPage";

export const metadata: Metadata = {
  title: "Website Plans | Nodo Website and Growth Partnerships",
  description:
    "Explore Nodo's website and digital growth plans for New Zealand businesses, including one-off builds and ongoing support plans.",
};

export default function WebsitePlansRoute() {
  return <WebsitePlansPage />;
}
