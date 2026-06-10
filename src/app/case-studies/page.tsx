import type { Metadata } from "next";
import { CaseStudiesPage } from "@/components/templates/CaseStudiesPage";
import { caseStudiesPageContent } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Case Studies | Nodo Client Work",
  description: caseStudiesPageContent.hero.copy,
  path: "/case-studies",
  noIndex: true,
});

export default function CaseStudiesPageRoute() {
  return <CaseStudiesPage />;
}
