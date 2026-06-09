import type { Metadata } from "next";
import { JsonLdScript } from "@/components/atoms/JsonLdScript";
import { ServicesPage as ServicesPageTemplate } from "@/components/templates/ServicesPage";
import { servicesPageContent } from "@/lib/content";
import { createBreadcrumbStructuredData, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Services",
  description: servicesPageContent.hero.copy,
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLdScript id="breadcrumb-structured-data" data={createBreadcrumbStructuredData("/services")} />
      <ServicesPageTemplate />
    </>
  );
}
