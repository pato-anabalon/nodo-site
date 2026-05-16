import type { Metadata } from "next";
import { ServicesPage as ServicesPageTemplate } from "@/components/templates/ServicesPage";
import { servicesPageContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description: servicesPageContent.hero.subtitle,
};

export default function ServicesPage() {
  return <ServicesPageTemplate />;
}
