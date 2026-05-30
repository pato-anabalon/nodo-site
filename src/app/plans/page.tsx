import type { Metadata } from "next";
import { PlansHubPage } from "@/components/templates/PlansHubPage";

export const metadata: Metadata = {
  title: "Nodo Plans | Website, Marketing, Branding and Growth Plans",
  description:
    "Choose the right Nodo plan for your business, including website plans, marketing plans, branding packages and connected growth bundles.",
};

export default function PlansRoute() {
  return <PlansHubPage />;
}
