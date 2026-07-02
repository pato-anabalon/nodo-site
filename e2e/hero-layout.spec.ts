import { expect, test } from '@playwright/test';

const animatedHeroRoutes = [
  {
    path: '/',
    sectionTestId: 'home-hero-section',
    contentTestId: 'home-hero-content',
    titleTestId: 'home-hero-title',
    animatedWordSelector: '.hero-title-word'
  },
  {
    path: '/services',
    sectionTestId: 'services-page-hero-section',
    contentTestId: 'services-page-hero-content',
    titleTestId: 'services-page-hero-title',
    animatedWordSelector: '.services-hero-title-word'
  },
  {
    path: '/plans',
    sectionTestId: 'plans-hub-hero-section',
    contentTestId: 'plans-hub-hero-content',
    titleTestId: 'plans-hub-hero-title',
    animatedWordSelector: '.plans-hub-hero-title-word'
  },
  {
    path: '/plans/websites',
    sectionTestId: 'plans-page-hero-section',
    contentTestId: 'website-plans-hero-content',
    titleTestId: 'website-plans-hero-title',
    animatedWordSelector: '.plans-hero-title-word'
  },
  {
    path: '/plans/marketing-branding',
    sectionTestId: 'marketing-branding-plans-hero-section',
    contentTestId: 'marketing-branding-hero-content',
    titleTestId: 'marketing-branding-hero-title',
    animatedWordSelector: '.marketing-hero-title-word'
  },
  {
    path: '/case-studies',
    sectionTestId: 'case-studies-hero-section',
    contentTestId: 'case-studies-hero-content',
    titleTestId: 'case-studies-hero-title',
    animatedWordSelector: '.case-hero-title-word'
  }
];

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    document.documentElement.dataset.nodoPreloaded = 'true';
    window.sessionStorage.setItem('nodo:preloader-seen', 'true');
  });
});

for (const route of animatedHeroRoutes) {
  test(`${route.path} hero title starts masked and content stays vertically centered`, async ({ page }) => {
    await page.goto(route.path);
    await page.evaluate(() => {
      document.documentElement.dataset.nodoPreloaded = 'true';
      window.dispatchEvent(new Event('nodo:preloader-complete'));
    });

    const section = page.getByTestId(route.sectionTestId);
    const content = page.getByTestId(route.contentTestId);
    const title = page.getByTestId(route.titleTestId);

    await expect(section).toBeVisible();
    await expect(content).toBeVisible();
    await expect(title).toBeVisible();

    const titleClassName = await title.getAttribute('class');
    const animatedWordClasses = await title
      .locator(route.animatedWordSelector)
      .evaluateAll((words) => words.map((word) => word.getAttribute('class') ?? ''));

    expect(titleClassName).toContain('opacity-0');
    expect(animatedWordClasses.length).toBeGreaterThan(0);
    expect(animatedWordClasses.every((className) => !className.includes('translateY(135%)'))).toBe(true);

    await page.waitForTimeout(1_600);

    await expect(title).toBeVisible();

    const wordMaskStates = await title.locator(route.animatedWordSelector).evaluateAll((words) =>
      words.map((word) => {
        const parent = word.parentElement;
        const wordRect = word.getBoundingClientRect();
        const parentRect = parent?.getBoundingClientRect();

        if (!parentRect) {
          return false;
        }

        const wordCenterY = wordRect.top + wordRect.height / 2;

        return wordCenterY >= parentRect.top && wordCenterY <= parentRect.bottom;
      })
    );

    expect(wordMaskStates.every(Boolean)).toBe(true);

    const layout = await page.evaluate(
      ({ sectionTestId, contentTestId }) => {
        const section = document.querySelector<HTMLElement>(`[data-testid="${sectionTestId}"]`);
        const content = document.querySelector<HTMLElement>(`[data-testid="${contentTestId}"]`);

        if (!section || !content) {
          return null;
        }

        const sectionRect = section.getBoundingClientRect();
        const contentRect = content.getBoundingClientRect();
        const sectionCenter = sectionRect.top + sectionRect.height / 2;
        const contentCenter = contentRect.top + contentRect.height / 2;

        return {
          contentCenter,
          contentTop: contentRect.top,
          sectionCenter,
          sectionHeight: sectionRect.height,
          sectionTop: sectionRect.top
        };
      },
      { sectionTestId: route.sectionTestId, contentTestId: route.contentTestId }
    );

    expect(layout).not.toBeNull();

    if (!layout) {
      return;
    }

    const centerDelta = Math.abs(layout.contentCenter - layout.sectionCenter);
    const allowedDelta = Math.max(140, layout.sectionHeight * 0.18);

    expect(centerDelta).toBeLessThanOrEqual(allowedDelta);
    expect(layout.contentTop).toBeGreaterThanOrEqual(layout.sectionTop - 1);
  });
}
