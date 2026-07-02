import { indexableRoutes, siteUrl } from '@/lib/seo';
import sitemap from './sitemap';

describe('sitemap', () => {
  it('should include all indexable routes', () => {
    expect(sitemap()).toEqual(
      indexableRoutes.map((route) => ({
        url: `${siteUrl}${route.path === '/' ? '/' : route.path}`,
        changeFrequency: 'monthly',
        priority: route.priority
      }))
    );
  });

  it('should include the About page now that it is complete', () => {
    expect(indexableRoutes.some((route) => route.path === '/about')).toBe(true);
  });
});
