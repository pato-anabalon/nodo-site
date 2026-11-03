import {
  buildPlanFinderSummary,
  getPlanContactHref,
  getPlanHref,
  getVisibleQuestions,
  recommendPlan,
  type PlanFinderAnswers
} from './plan-finder';

describe('plan finder', () => {
  it('should ask between 4 and 7 questions depending on the focus', () => {
    const count = (focus: string) => getVisibleQuestions({ focus }).length;

    expect(count('website')).toBe(5);
    expect(count('visibility')).toBe(5);
    expect(count('brand')).toBe(4);
    expect(count('everything')).toBe(7);
  });

  it.each<[string, PlanFinderAnswers, string]>([
    [
      'Launch when the team manages the site',
      { focus: 'website', website: 'rebuild', care: 'internal' },
      'nodo-launch'
    ],
    [
      'Flow for a supported foundation',
      { focus: 'website', website: 'rebuild', care: 'nodo', local: 'basic', budget: 'under-500' },
      'nodo-flow'
    ],
    [
      'Growth when local enquiries are a priority',
      { focus: 'website', website: 'improve', care: 'nodo', local: 'priority', budget: '500-1500' },
      'nodo-growth'
    ],
    [
      'Flow when local is a priority but the budget is under 500',
      { focus: 'website', website: 'improve', care: 'nodo', local: 'priority', budget: 'under-500' },
      'nodo-flow'
    ],
    [
      'marketing tier from the budget',
      { focus: 'visibility', website: 'improve', local: 'basic', marketing: 'inconsistent', budget: '500-1500' },
      'growth-marketing'
    ],
    ['brand starter for a new identity', { focus: 'brand', website: 'improve', brand: 'none' }, 'brand-starter'],
    [
      'full brand launch when repositioning',
      { focus: 'brand', website: 'improve', brand: 'reposition' },
      'full-brand-launch'
    ],
    [
      'bundle start for everything on a mid budget',
      {
        focus: 'everything',
        website: 'none',
        care: 'nodo',
        local: 'basic',
        marketing: 'none',
        brand: 'none',
        budget: '1500-3000'
      },
      'bundle-start'
    ],
    [
      'bundle scale when ready to scale with a high budget',
      {
        focus: 'everything',
        website: 'rebuild',
        care: 'nodo',
        local: 'priority',
        marketing: 'scale',
        brand: 'inconsistent',
        budget: '3000-plus'
      },
      'bundle-scale'
    ],
    [
      'the focus plan when several needs but a low budget',
      {
        focus: 'everything',
        website: 'none',
        care: 'nodo',
        local: 'basic',
        marketing: 'none',
        brand: 'none',
        budget: 'under-500'
      },
      'nodo-flow'
    ]
  ])('should recommend %s', (_label, answers, expected) => {
    const recommendation = recommendPlan(answers);

    expect(recommendation.plan).toBe(expected);
    expect(recommendation.reasons.length).toBeGreaterThan(0);
    expect(recommendation.alternative).not.toBe(recommendation.plan);
  });

  it('should suggest a bundle as the alternative when the budget is low', () => {
    expect(recommendPlan({ focus: 'everything', website: 'none', care: 'nodo', budget: 'under-500' }).alternative).toBe(
      'bundle-start'
    );
  });

  it('should build plan and contact links', () => {
    expect(getPlanHref('nodo-growth')).toBe('/plans/websites#nodo-growth');
    expect(getPlanHref('brand-growth')).toBe('/plans/marketing-branding#brand-growth');
    expect(getPlanContactHref('bundle-start')).toBe('/contact?plan=bundle-start&intent=quote&source=plan-finder');
  });

  it('should summarise only the answered, visible questions for the contact message', () => {
    const answers = { focus: 'website', website: 'none', care: 'nodo', local: 'basic', budget: 'under-500' };
    const summary = buildPlanFinderSummary(answers, recommendPlan(answers));

    expect(summary).toContain('- What frustrates you most right now? My website is not working for me');
    expect(summary).toContain('Recommended plan: Nodo Flow');
    expect(summary).not.toContain('How is your marketing going today?');
    expect(summary.length).toBeLessThan(1500);
  });
});
