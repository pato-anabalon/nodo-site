import type { Metadata } from "next";
import { RoutePlaceholder } from "@/components/molecules/RoutePlaceholder";
import { placeholderPages } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Case Studies",
  description: placeholderPages["case-studies"].description,
  path: "/case-studies",
  noIndex: true,
});

export default function CaseStudiesPage() {
  return <RoutePlaceholder pageKey="case-studies" {...placeholderPages["case-studies"]} />;
}
