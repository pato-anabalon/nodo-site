import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Footer } from "@/components/organisms/Footer";
import { Header } from "@/components/organisms/Header";
import { PagePreloader } from "@/components/organisms/PagePreloader";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const defaultTitle = "Nodo | Digital systems for growing businesses";
const defaultDescription =
  "Nodo helps growing businesses build sharper brands, smarter digital marketing, and high-performing websites that turn clarity into results.";
const defaultOpenGraphImage = {
  url: "/og/nodo-og-image.png",
  width: 1200,
  height: 630,
  alt: "Nodo - Clarity. Speed. Results.",
};

export const metadata: Metadata = {
  title: {
    default: defaultTitle,
    template: "%s | Nodo",
  },
  description: defaultDescription,
  metadataBase: new URL("https://www.nodo.co.nz"),
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: "/",
    siteName: "Nodo",
    locale: "en_NZ",
    type: "website",
    images: [defaultOpenGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [defaultOpenGraphImage.url],
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
        <Analytics />
      </body>
    </html>
  );
}
