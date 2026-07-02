import type { Metadata } from 'next';
import { JsonLdScript } from '@/components/atoms/JsonLdScript';
import { PlansHubPage } from '@/components/templates/PlansHubPage';
import { createBreadcrumbStructuredData, createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Nodo Plans | Website, Marketing, Branding and Growth Plans',
  description:
    'Choose the right Nodo plan for what your business needs next, from websites and marketing to branding and connected growth bundles.',
  path: '/plans'
});

export default function PlansRoute() {
  return (
    <>
      <JsonLdScript id="breadcrumb-structured-data" data={createBreadcrumbStructuredData('/plans')} />
      <PlansHubPage />
    </>
  );
}
