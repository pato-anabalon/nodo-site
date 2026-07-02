import type { Metadata } from 'next';
import { JsonLdScript } from '@/components/atoms/JsonLdScript';
import { WebsitePlansPage } from '@/components/templates/WebsitePlansPage';
import { createBreadcrumbStructuredData, createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Website Plans | Launch, Support and Ongoing Improvement',
  description:
    'Explore Nodo website plans for New Zealand businesses, including one-off builds, monthly support, and ongoing website improvement.',
  path: '/plans/websites'
});

export default function WebsitePlansRoute() {
  return (
    <>
      <JsonLdScript id="breadcrumb-structured-data" data={createBreadcrumbStructuredData('/plans/websites')} />
      <WebsitePlansPage />
    </>
  );
}
