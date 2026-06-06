import type { Metadata } from "next";

export const siteUrl = "https://www.nodo.co.nz";
export const siteName = "Nodo";
export const legalName = "Nodo Limited";

export const defaultSeo = {
  title: "Nodo | Brand, marketing, and websites for growing businesses",
  description:
    "Nodo helps growing businesses build sharper brands, smarter digital marketing, and high-performing websites that turn attention into stronger enquiries.",
  image: {
    url: "/og/nodo-og-image.png",
    width: 1200,
    height: 630,
    alt: "Nodo - Clarity. Speed. Results.",
  },
};

export const indexableRoutes = [
  { path: "/", priority: 1 },
  { path: "/services", priority: 0.9 },
  { path: "/plans", priority: 0.85 },
  { path: "/plans/websites", priority: 0.8 },
  { path: "/plans/marketing-branding", priority: 0.8 },
  { path: "/about", priority: 0.65 },
  { path: "/contact", priority: 0.65 },
] as const;

const breadcrumbLabels: Record<(typeof indexableRoutes)[number]["path"], string> = {
  "/": "Home",
  "/services": "Services",
  "/plans": "Plans",
  "/plans/websites": "Website Plans",
  "/plans/marketing-branding": "Marketing & Branding Plans",
  "/about": "About",
  "/contact": "Contact",
};

const services = [
  {
    name: "Branding",
    description:
      "Brand positioning, identity direction, and messaging foundations for growing businesses.",
  },
  {
    name: "Digital Marketing Solutions",
    description:
      "Digital marketing support for visibility, content direction, campaigns, and lead generation.",
  },
  {
    name: "Website design & development",
    description:
      "Custom website design and development for high-performing, conversion-focused digital experiences.",
  },
];

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
};

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

export function createGlobalStructuredData() {
  const businessId = `${siteUrl}/#professionalservice`;
  const websiteId = `${siteUrl}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": businessId,
        name: siteName,
        legalName,
        url: siteUrl,
        logo: absoluteUrl("/brand/nodo-logo-black.png"),
        image: absoluteUrl(defaultSeo.image.url),
        description: defaultSeo.description,
        email: "contact@nodo.co.nz",
        telephone: "+64 27 742 3001",
        address: {
          "@type": "PostalAddress",
          streetAddress: "19 Marywil Crescent, Hauraki",
          addressLocality: "Auckland",
          addressRegion: "Auckland",
          postalCode: "0627",
          addressCountry: "New Zealand",
        },
        areaServed: {
          "@type": "Country",
          name: "New Zealand",
        },
        sameAs: ["https://www.instagram.com/nodo.co.nz/"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Nodo services",
          itemListElement: services.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.name,
              description: service.description,
              provider: {
                "@id": businessId,
              },
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: siteName,
        url: siteUrl,
        publisher: {
          "@id": businessId,
        },
        inLanguage: "en-NZ",
      },
    ],
  };
}

export function createBreadcrumbStructuredData(path: (typeof indexableRoutes)[number]["path"]) {
  const segments = path.split("/").filter(Boolean);
  const items = [
    {
      name: breadcrumbLabels["/"],
      item: absoluteUrl("/"),
    },
    ...segments.map((_, index) => {
      const segmentPath = `/${segments.slice(0, index + 1).join("/")}` as keyof typeof breadcrumbLabels;

      return {
        name: breadcrumbLabels[segmentPath] ?? segments[index],
        item: absoluteUrl(segmentPath),
      };
    }),
  ];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}

export function createPageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const socialTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName,
      locale: "en_NZ",
      type: "website",
      images: [defaultSeo.image],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [defaultSeo.image.url],
    },
    robots: noIndex
      ? {
          index: false,
          follow: true,
        }
      : undefined,
  };
}
