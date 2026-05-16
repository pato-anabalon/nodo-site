import type { Metadata } from "next";
import { ContactSection } from "@/components/organisms/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Nodo to discuss a digital system, workflow automation, platform, or operational improvement.",
};

type ContactPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function readSearchParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;

  return (
    <ContactSection
      selectedPlanSlug={readSearchParam(params.plan)}
      intent={readSearchParam(params.intent)}
      source={readSearchParam(params.source)}
    />
  );
}
