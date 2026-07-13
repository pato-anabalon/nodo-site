import {
  absoluteUrl,
  businessAddress,
  contactEmail,
  createBreadcrumbStructuredData,
  createGlobalStructuredData,
  createPageMetadata,
  createServiceStructuredData,
  indexableRoutes,
  legalName,
  siteUrl
} from './seo';

describe('seo', () => {
  it('should build absolute URLs', () => {
    expect(absoluteUrl('/contact')).toBe(`${siteUrl}/contact`);
  });

  it('should create global structured data', () => {
    const data = createGlobalStructuredData();

    expect(data['@graph'][0]).toEqual(
      expect.objectContaining({
        '@type': 'ProfessionalService',
        legalName,
        email: contactEmail,
        address: expect.objectContaining({
          streetAddress: businessAddress.streetAddress,
          addressLocality: businessAddress.addressLocality,
          postalCode: businessAddress.postalCode
        })
      })
    );
    expect(data['@graph'][1]).toEqual(expect.objectContaining({ '@type': 'WebSite' }));
  });

  it('should create breadcrumbs for indexable routes', () => {
    for (const route of indexableRoutes) {
      const data = createBreadcrumbStructuredData(route.path);
      expect(data.itemListElement[0]).toEqual(expect.objectContaining({ name: 'Home' }));
    }
  });

  it('should create service structured data', () => {
    expect(
      createServiceStructuredData({
        name: 'Website Design',
        description: 'Custom websites.',
        path: '/services/website-design-auckland',
        serviceType: 'Website design'
      })
    ).toEqual(
      expect.objectContaining({
        '@type': 'Service',
        url: `${siteUrl}/services/website-design-auckland`
      })
    );
  });

  it('should create page metadata with noIndex support', () => {
    const metadata = createPageMetadata({
      title: 'About',
      description: 'About Nodo',
      path: '/about',
      noIndex: true
    });

    expect(metadata.alternates?.canonical).toBe(`${siteUrl}/about`);
    expect(metadata.robots).toEqual({ index: false, follow: true });
  });
});
