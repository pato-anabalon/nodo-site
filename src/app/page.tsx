import type { Metadata } from "next";
import { LandingPage } from "@/components/templates/LandingPage";
import { createPageMetadata, defaultSeo } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Nodo | Website Design, Marketing and Branding in Auckland",
  description: defaultSeo.description,
  path: "/",
});

export default function Home() {
  return <LandingPage />;
}
