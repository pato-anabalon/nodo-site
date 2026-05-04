import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/components/organisms/Footer";
import { Header } from "@/components/organisms/Header";
import { PagePreloader } from "@/components/organisms/PagePreloader";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Nodo | Digital systems for growing businesses",
    template: "%s | Nodo",
  },
  description:
    "Nodo is an Auckland-based digital systems company building workflow automation, web platforms, and AI-enabled operations for growing businesses.",
  metadataBase: new URL("https://nodo.nz"),
  openGraph: {
    title: "Nodo",
    description: "Clarity. Speed. Results. Digital systems for growing businesses.",
    siteName: "Nodo",
    locale: "en_NZ",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <PagePreloader />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
