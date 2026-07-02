import type { Metadata } from 'next';
import { JsonLdScript } from '@/components/atoms/JsonLdScript';
import { MarketingBrandingPlansPage } from '@/components/templates/MarketingBrandingPlansPage';
import { createBreadcrumbStructuredData, createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Marketing & Branding Plans',
  description:
    "Explore Nodo's marketing plans, branding packages and connected all-in-one bundles for growing New Zealand businesses.",
  path: '/plans/marketing-branding'
});

export default function MarketingBrandingPlansRoute() {
  return (
    <>
      <JsonLdScript
        id="breadcrumb-structured-data"
        data={createBreadcrumbStructuredData('/plans/marketing-branding')}
      />
      <MarketingBrandingPlansPage />
    </>
  );
}
