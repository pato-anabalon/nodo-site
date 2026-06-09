import type { Metadata } from "next";
import { LandingPage } from "@/components/templates/LandingPage";
import { createPageMetadata, defaultSeo } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Nodo | Brand, Marketing, and Websites for Growing Businesses",
  description: defaultSeo.description,
  path: "/",
});

export default function Home() {
  return <LandingPage />;
}
