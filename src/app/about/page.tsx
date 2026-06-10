import type { Metadata } from "next";
import { RoutePlaceholder } from "@/components/molecules/RoutePlaceholder";
import { placeholderPages } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description: placeholderPages.about.description,
  path: "/about",
  noIndex: true,
});

export default function AboutPage() {
  return <RoutePlaceholder pageKey="about" headingLevel="h1" {...placeholderPages.about} />;
}
