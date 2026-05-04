import type { Metadata } from "next";
import { ContactSection } from "@/components/organisms/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Nodo to discuss a digital system, workflow automation, platform, or operational improvement.",
};

export default function ContactPage() {
  return <ContactSection />;
}
