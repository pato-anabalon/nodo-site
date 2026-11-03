import { allPlanOptions, type PlanSlug } from '@/lib/content';

export type PlanFinderQuestionId = 'focus' | 'website' | 'care' | 'local' | 'marketing' | 'brand' | 'budget';

export type PlanFinderAnswers = Partial<Record<PlanFinderQuestionId, string>>;

export type PlanFinderOption = {
  value: string;
  label: string;
  hint?: string;
};

export type PlanFinderQuestion = {
  id: PlanFinderQuestionId;
  title: string;
  hint?: string;
  options: PlanFinderOption[];
  isVisible?: (answers: PlanFinderAnswers) => boolean;
};

export type PlanFinderRecommendation = {
  plan: PlanSlug;
  alternative?: PlanSlug;
  reasons: string[];
};

export const PLAN_FINDER_SOURCE = 'plan-finder';
export const PLAN_FINDER_STORAGE_KEY = 'nodo:plan-finder-summary';

const needsWebsiteFocus = (answers: PlanFinderAnswers) => answers.focus === 'website' || answers.focus === 'everything';

export const planFinderQuestions: PlanFinderQuestion[] = [
  {
    id: 'focus',
    title: 'What frustrates you most right now?',
    options: [
      {
        value: 'website',
        label: 'My website is not working for me',
        hint: 'It is outdated, missing, or not bringing enquiries.'
      },
      {
        value: 'visibility',
        label: 'Not enough people find or remember us',
        hint: 'Little activity on social media, content, or ads.'
      },
      {
        value: 'brand',
        label: 'My business does not look as good as it is',
        hint: 'The logo and identity feel unclear or inconsistent.'
      },
      { value: 'everything', label: 'A bit of everything', hint: 'Website, marketing, and brand all need work.' }
    ]
  },
  {
    id: 'website',
    title: 'Do you have a website today?',
    options: [
      { value: 'none', label: 'No, I need one' },
      { value: 'rebuild', label: 'Yes, but it needs a rebuild' },
      { value: 'improve', label: 'Yes, it works but could do more' }
    ]
  },
  {
    id: 'care',
    title: 'Who will look after the website after launch?',
    options: [
      { value: 'nodo', label: 'I would like Nodo to look after it', hint: 'Updates, support, and improvements.' },
      { value: 'internal', label: 'Someone on my team', hint: 'We only need it built once.' },
      { value: 'unsure', label: 'Not sure yet' }
    ],
    isVisible: needsWebsiteFocus
  },
  {
    id: 'local',
    title: 'How important are Google and local enquiries right now?',
    options: [
      { value: 'basic', label: 'A solid foundation is enough for now' },
      { value: 'priority', label: 'It is a priority', hint: 'We want more local enquiries.' }
    ],
    isVisible: (answers) => answers.focus !== 'brand'
  },
  {
    id: 'marketing',
    title: 'How is your marketing going today?',
    options: [
      { value: 'none', label: 'We barely post or advertise' },
      { value: 'inconsistent', label: 'We do some, but it is inconsistent' },
      { value: 'scale', label: 'It is running and we want to scale it' }
    ],
    isVisible: (answers) => answers.focus === 'visibility' || answers.focus === 'everything'
  },
  {
    id: 'brand',
    title: 'How do you feel about your brand today?',
    options: [
      { value: 'none', label: 'We do not really have one yet' },
      { value: 'inconsistent', label: 'We have a logo, but things look inconsistent' },
      { value: 'reposition', label: 'We are repositioning or launching seriously' },
      { value: 'solid', label: 'It is solid, no big changes needed' }
    ],
    isVisible: (answers) => answers.focus === 'brand' || answers.focus === 'everything'
  },
  {
    id: 'budget',
    title: 'What monthly investment feels realistic?',
    hint: 'Approximate, GST exclusive. Branding and one-off builds are quoted separately.',
    options: [
      { value: 'under-500', label: 'Under NZD 500' },
      { value: '500-1500', label: 'NZD 500 – 1,500' },
      { value: '1500-3000', label: 'NZD 1,500 – 3,000' },
      { value: '3000-plus', label: 'NZD 3,000+' },
      { value: 'unsure', label: 'Not sure yet' }
    ]
  }
];

export function getVisibleQuestions(answers: PlanFinderAnswers) {
  return planFinderQuestions.filter((question) => !question.isVisible || question.isVisible(answers));
}

const budgetLevels: Record<string, number> = {
  'under-500': 0,
  '500-1500': 1,
  '1500-3000': 2,
  '3000-plus': 3
};

function websitePlan(answers: PlanFinderAnswers, budget: number | undefined): PlanFinderRecommendation {
  if (answers.care === 'internal') {
    return {
      plan: 'nodo-launch',
      alternative: 'nodo-flow',
      reasons: ['You want the website built once and managed by your own team.']
    };
  }

  const wantsLocalGrowth = answers.local === 'priority' && budget !== 0;

  if (wantsLocalGrowth) {
    return {
      plan: 'nodo-growth',
      alternative: 'nodo-flow',
      reasons: [
        'Google and local enquiries are a priority, and Growth adds local SEO and Google Business support.',
        'Nodo keeps the website supported and improving after launch.'
      ]
    };
  }

  return {
    plan: 'nodo-flow',
    alternative: 'nodo-growth',
    reasons: [
      answers.website === 'none'
        ? 'You need a professional website and someone to keep it up to date.'
        : 'Your website needs a stronger build and someone to keep it up to date.',
      'A solid foundation is the right starting point before investing in local growth.'
    ]
  };
}

function marketingPlan(answers: PlanFinderAnswers, budget: number | undefined): PlanFinderRecommendation {
  const fallbackLevel = answers.marketing === 'scale' ? 2 : answers.marketing === 'inconsistent' ? 1 : 0;
  const level = Math.min(budget ?? fallbackLevel, 2);
  const tiers: PlanSlug[] = ['starter-marketing', 'growth-marketing', 'full-digital-marketing'];
  const reasons = [
    [
      'You need a consistent presence online without running full campaigns yet.',
      'Regular content, short-form video, and simple campaigns will make you easier to find and remember.',
      'You are ready for stronger campaigns, lead generation, and ongoing optimisation.'
    ][level]
  ];

  if (answers.local === 'priority') {
    reasons.push('Local enquiries are a priority, so visibility work comes first.');
  }

  return {
    plan: tiers[level],
    alternative: tiers[level === 2 ? 1 : level + 1],
    reasons
  };
}

function brandPlan(answers: PlanFinderAnswers): PlanFinderRecommendation {
  if (answers.brand === 'reposition') {
    return {
      plan: 'full-brand-launch',
      alternative: 'brand-growth',
      reasons: ['You are repositioning or launching seriously, so strategy and positioning need to come first.']
    };
  }

  if (answers.brand === 'none') {
    return {
      plan: 'brand-starter',
      alternative: 'brand-growth',
      reasons: ['You need a clean identity and the essential assets to launch with consistency.']
    };
  }

  return {
    plan: 'brand-growth',
    alternative: 'brand-starter',
    reasons: ['Your brand exists, but it needs stronger visual consistency across every channel.']
  };
}

function bundlePlan(answers: PlanFinderAnswers, budget: number | undefined): PlanFinderRecommendation {
  const reasons = ['You want your website, brand, and marketing working in the same direction.'];

  if (budget === 3 && (answers.marketing === 'scale' || answers.brand === 'reposition')) {
    return {
      plan: 'bundle-scale',
      alternative: 'bundle-growth',
      reasons: [...reasons, 'You are ready to scale, with advanced marketing, full brand work, and website support.']
    };
  }

  if (budget === 3 || (budget === undefined && (answers.local === 'priority' || answers.marketing === 'scale'))) {
    return {
      plan: 'bundle-growth',
      alternative: 'bundle-start',
      reasons: [...reasons, 'Ongoing visibility and stronger growth support matter more than just getting started.']
    };
  }

  return {
    plan: 'bundle-start',
    alternative: 'bundle-growth',
    reasons: [...reasons, 'One connected setup gets the essentials right from the start.']
  };
}

export function recommendPlan(answers: PlanFinderAnswers): PlanFinderRecommendation {
  const budget = answers.budget ? budgetLevels[answers.budget] : undefined;
  const needsWebsite = needsWebsiteFocus(answers) || answers.website === 'none';
  const needsMarketing =
    answers.focus === 'visibility' || answers.focus === 'everything' || answers.marketing === 'scale';
  const needsBrand = answers.focus === 'brand' || answers.focus === 'everything' || answers.brand === 'none';
  const needCount = [needsWebsite, needsMarketing, needsBrand].filter(Boolean).length;
  const focusPlan =
    answers.focus === 'visibility'
      ? marketingPlan(answers, budget)
      : answers.focus === 'brand'
        ? brandPlan(answers)
        : websitePlan(answers, budget);

  if (needCount >= 2 && answers.care !== 'internal') {
    if (budget === undefined || budget >= 2) {
      return { ...bundlePlan(answers, budget), alternative: focusPlan.plan };
    }

    return {
      ...focusPlan,
      alternative: 'bundle-start',
      reasons: [...focusPlan.reasons, 'When you are ready to connect everything, a bundle brings it together.']
    };
  }

  return focusPlan;
}

export function getPlanName(slug: PlanSlug) {
  return allPlanOptions.find((plan) => plan.slug === slug)?.name ?? slug;
}

export function getPlanPrice(slug: PlanSlug) {
  return allPlanOptions.find((plan) => plan.slug === slug)?.price;
}

export function getPlanHref(slug: PlanSlug) {
  const isWebsitePlan = slug === 'nodo-flow' || slug === 'nodo-growth' || slug === 'nodo-launch';

  return `${isWebsitePlan ? '/plans/websites' : '/plans/marketing-branding'}#${slug}`;
}

export function getPlanContactHref(slug: PlanSlug) {
  return `/contact?plan=${slug}&intent=quote&source=${PLAN_FINDER_SOURCE}`;
}

export function buildPlanFinderSummary(answers: PlanFinderAnswers, recommendation: PlanFinderRecommendation) {
  const lines = getVisibleQuestions(answers).flatMap((question) => {
    const option = question.options.find((item) => item.value === answers[question.id]);

    return option ? [`- ${question.title} ${option.label}`] : [];
  });

  return [
    'Plan finder answers:',
    ...lines,
    `Recommended plan: ${getPlanName(recommendation.plan)}`,
    '',
    'Anything else we should know:',
    ''
  ].join('\n');
}
