import type { Metadata } from "next";
import { RoutePlaceholder } from "@/components/molecules/RoutePlaceholder";
import { placeholderPages } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description: placeholderPages.services.description,
};

export default function ServicesPage() {
  return <RoutePlaceholder {...placeholderPages.services} />;
}
