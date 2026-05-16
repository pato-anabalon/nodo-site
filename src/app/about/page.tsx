import type { Metadata } from "next";
import { RoutePlaceholder } from "@/components/molecules/RoutePlaceholder";
import { placeholderPages } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: placeholderPages.about.description,
};

export default function AboutPage() {
  return <RoutePlaceholder pageKey="about" {...placeholderPages.about} />;
}
