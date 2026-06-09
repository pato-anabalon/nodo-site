import type { Metadata } from "next";
import { JsonLdScript } from "@/components/atoms/JsonLdScript";
import { ContactSection } from "@/components/organisms/ContactSection";
import { createBreadcrumbStructuredData, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact Nodo to discuss a branding, digital marketing, or website project for your business.",
  path: "/contact",
});

type ContactPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function readSearchParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;

  return (
    <>
      <JsonLdScript id="breadcrumb-structured-data" data={createBreadcrumbStructuredData("/contact")} />
      <ContactSection
        selectedPlanSlug={readSearchParam(params.plan)}
        intent={readSearchParam(params.intent)}
        source={readSearchParam(params.source)}
      />
    </>
  );
}
