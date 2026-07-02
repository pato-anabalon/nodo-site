import type { Metadata } from 'next';
import { JsonLdScript } from '@/components/atoms/JsonLdScript';
import { WebsiteDesignAucklandPage } from '@/components/templates/WebsiteDesignAucklandPage';
import { websiteDesignAucklandPageContent } from '@/lib/content';
import { createBreadcrumbStructuredData, createPageMetadata, createServiceStructuredData } from '@/lib/seo';

const pagePath = '/services/website-design-auckland';

export const metadata: Metadata = createPageMetadata({
  title: 'Website Design Auckland | Custom Websites for Better Enquiries',
  description:
    'Custom website design and redesigns for Auckland businesses that need stronger credibility, clearer services, and better enquiry paths.',
  path: pagePath
});

function createFaqStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: websiteDesignAucklandPageContent.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };
}

export default function WebsiteDesignAucklandRoute() {
  return (
    <>
      <JsonLdScript id="breadcrumb-structured-data" data={createBreadcrumbStructuredData(pagePath)} />
      <JsonLdScript
        id="service-structured-data"
        data={createServiceStructuredData({
          name: 'Website Design Auckland',
          description: metadata.description ?? websiteDesignAucklandPageContent.hero.copy,
          path: pagePath,
          serviceType: 'Website design and development'
        })}
      />
      <JsonLdScript id="faq-structured-data" data={createFaqStructuredData()} />
      <WebsiteDesignAucklandPage />
    </>
  );
}
