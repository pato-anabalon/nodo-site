import type { Metadata } from "next";
import { JsonLdScript } from "@/components/atoms/JsonLdScript";
import { WebsitePlansPage } from "@/components/templates/WebsitePlansPage";
import { createBreadcrumbStructuredData, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Website Plans | Nodo Website and Growth Partnerships",
  description:
    "Explore Nodo's website and digital growth plans for New Zealand businesses, including one-off builds and ongoing support plans.",
  path: "/plans/websites",
});

export default function WebsitePlansRoute() {
  return (
    <>
      <JsonLdScript id="breadcrumb-structured-data" data={createBreadcrumbStructuredData("/plans/websites")} />
      <WebsitePlansPage />
    </>
  );
}
