import type { Metadata } from "next";
import { AboutPage as AboutPageTemplate } from "@/components/templates/AboutPage";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About Nodo",
  description:
    "Nodo is a creative agency in Auckland helping service businesses build sharper brands, better websites, and a more consistent digital presence.",
  path: "/about",
});

export default function AboutPage() {
  return <AboutPageTemplate />;
}
