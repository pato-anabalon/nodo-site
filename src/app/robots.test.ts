import robots from './robots';

describe('robots', () => {
  it('should allow the site and block API routes', () => {
    expect(robots()).toEqual(
      expect.objectContaining({
        rules: {
          userAgent: '*',
          allow: '/',
          disallow: ['/api/']
        },
        host: 'https://www.nodo.co.nz'
      })
    );
  });
});
