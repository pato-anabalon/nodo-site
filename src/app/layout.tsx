import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';
import { JsonLdScript } from '@/components/atoms/JsonLdScript';
import { AnalyticsConsentManager } from '@/components/molecules/AnalyticsConsentManager';
import { RouteScrollReset } from '@/components/atoms/RouteScrollReset';
import { Footer } from '@/components/organisms/Footer';
import { Header } from '@/components/organisms/Header';
import { PagePreloader } from '@/components/organisms/PagePreloader';
import { createGlobalStructuredData, defaultSeo, siteName, siteUrl } from '@/lib/seo';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

const preloaderSessionScript = `
try {
  if (window.sessionStorage.getItem('nodo:preloader-seen') === 'true') {
    document.documentElement.dataset.nodoPreloaded = 'true';
  }
} catch {}
`;

export const metadata: Metadata = {
  title: {
    default: defaultSeo.title,
    template: '%s | Nodo'
  },
  description: defaultSeo.description,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl
  },
  openGraph: {
    title: defaultSeo.title,
    description: defaultSeo.description,
    url: siteUrl,
    siteName,
    locale: 'en_NZ',
    type: 'website',
    images: [defaultSeo.image]
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultSeo.title,
    description: defaultSeo.description,
    images: [defaultSeo.image.url]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-NZ" className={inter.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <Script
          id="preloader-session-bootstrap"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: preloaderSessionScript }}
        />
        <JsonLdScript id="global-structured-data" data={createGlobalStructuredData()} />
        <RouteScrollReset />
        <PagePreloader />
        <Header />
        {children}
        <Footer />
        <AnalyticsConsentManager />
        <Analytics />
      </body>
    </html>
  );
}
