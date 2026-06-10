import type { Metadata } from "next";
import { JsonLdScript } from "@/components/atoms/JsonLdScript";
import { CaseStudiesPage } from "@/components/templates/CaseStudiesPage";
import { caseStudiesPageContent } from "@/lib/content";
import { createBreadcrumbStructuredData, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Case Studies | Nodo Client Work",
  description: caseStudiesPageContent.hero.copy,
  path: "/case-studies",
});

export default function CaseStudiesPageRoute() {
  return (
    <>
      <JsonLdScript id="breadcrumb-structured-data" data={createBreadcrumbStructuredData("/case-studies")} />
      <CaseStudiesPage />
    </>
  );
}
