import type { Metadata } from "next";
import { JsonLdScript } from "@/components/atoms/JsonLdScript";
import { RoutePlaceholder } from "@/components/molecules/RoutePlaceholder";
import { placeholderPages } from "@/lib/content";
import { createBreadcrumbStructuredData, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description: placeholderPages.about.description,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLdScript id="breadcrumb-structured-data" data={createBreadcrumbStructuredData("/about")} />
      <RoutePlaceholder pageKey="about" headingLevel="h1" {...placeholderPages.about} />
    </>
  );
}
