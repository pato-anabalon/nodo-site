import type { Metadata } from "next";
import { RoutePlaceholder } from "@/components/molecules/RoutePlaceholder";
import { placeholderPages } from "@/lib/content";

export const metadata: Metadata = {
  title: "Case Studies",
  description: placeholderPages["case-studies"].description,
};

export default function CaseStudiesPage() {
  return <RoutePlaceholder {...placeholderPages["case-studies"]} />;
}
