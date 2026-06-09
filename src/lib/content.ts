import type { LucideIcon } from "lucide-react";
import {
  Blocks,
  Brush,
  Gauge,
  GitBranch,
  Layers3,
  Megaphone,
  MousePointer2,
  PackageCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

export const navigation = [
  { label: "Services", href: "/services" },
  { label: "Plans", href: "/plans" },
  { label: "Case studies", href: "/case-studies" },
  { label: "Contact", href: "/contact" },
];

export type Service = {
  eyebrow: string;
  title: string;
  description: string;
  highlight: string;
  deliverables: string[];
  ctaLabel: string;
  href: string;
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    eyebrow: "Brand foundation",
    title: "Branding",
    description:
      "Positioning, identity direction, and brand foundations built to make your business feel sharper, clearer, and more credible at every touchpoint.",
    highlight: "Clarify how your business looks, sounds, and is remembered.",
    deliverables: [
      "Brand positioning direction",
      "Identity direction and visual language",
      "Messaging foundations for digital channels",
    ],
    ctaLabel: "Discuss branding",
    href: "/contact?service=branding&source=services-section",
    icon: Brush,
  },
  {
    eyebrow: "Demand generation",
    title: "Digital Marketing Solutions",
    description:
      "Practical marketing support that improves your visibility, generates stronger enquiries, and gives your business a more consistent growth engine.",
    highlight:
      "Turn your digital activity into repeatable traction instead of scattered effort.",
    deliverables: [
      "Campaign and channel strategy",
      "SEO and performance-led content direction",
      "Conversion improvements across landing experiences",
    ],
    ctaLabel: "Plan growth activity",
    href: "/contact?service=digital-marketing-solutions&source=services-section",
    icon: Workflow,
  },
  {
    eyebrow: "Digital presence",
    title: "Website design & development",
    description:
      "Premium websites designed and built to look sharp, perform fast, and support the way your business actually sells, communicates, and grows.",
    highlight:
      "Build the experience your audience lands on and your business grows through.",
    deliverables: [
      "Custom website design and UX structure",
      "Responsive development in modern web stacks",
      "Launch-ready performance, CMS, and enquiry flows",
    ],
    ctaLabel: "Start a website project",
    href: "/contact?service=website-design-development&source=services-section",
    icon: Blocks,
  },
];

export const processSteps = [
  {
    eyebrow: "Clarify",
    title: "Find what is unclear",
    description:
      "We identify the gaps in your message, offer, website, and marketing so the next move is obvious.",
    output: "Audit",
    question: "What is unclear and worth fixing first?",
    result: "A sharper next move",
    icon: MousePointer2,
  },
  {
    eyebrow: "Shape",
    title: "Turn it into a direction",
    description:
      "We define the brand, content, user journey, and priorities your business needs to show up with confidence.",
    output: "Direction",
    question: "What should the brand, content, and journey say?",
    result: "A clearer path to launch",
    icon: Layers3,
  },
  {
    eyebrow: "Launch",
    title: "Build what customers see",
    description:
      "We create the brand, website, and marketing assets needed to turn attention into enquiries.",
    output: "Launch assets",
    question: "What needs to exist for customers to act?",
    result: "A visible, usable digital presence",
    icon: GitBranch,
  },
  {
    eyebrow: "Improve",
    title: "Keep momentum moving",
    description:
      "We review performance, feedback, and opportunities so the work keeps getting sharper.",
    output: "Optimisation",
    question: "What can be improved after launch?",
    result: "Better momentum over time",
    icon: Gauge,
  },
];

export const resultOutcomes = [
  {
    label: "Trust",
    title: "Stronger first impression",
    description:
      "Your brand and website look more credible from the first visit.",
    icon: Sparkles,
  },
  {
    label: "Action",
    title: "Clearer customer action",
    description:
      "Visitors understand what you offer, why it matters, and how to take the next step.",
    icon: MousePointer2,
  },
  {
    label: "Consistency",
    title: "More consistent presence",
    description:
      "Your website, content, and marketing feel connected instead of scattered.",
    icon: Workflow,
  },
];

export const placeholderPages = {
  services: {
    title: "Services",
    eyebrow: "What we build",
    description:
      "A focused look at Nodo's branding, digital marketing solutions, and website design and development services.",
  },
  about: {
    title: "About Nodo",
    eyebrow: "Auckland, New Zealand",
    description:
      "Nodo partners with growing businesses to build sharper brands, smarter marketing, and websites that create clarity, speed, and measurable results.",
  },
  "case-studies": {
    title: "Case Studies",
    eyebrow: "Work in progress",
    description:
      "Selected examples of brand, marketing, and website improvements will live here as the portfolio grows.",
  },
};

export const servicesPageContent = {
  hero: {
    eyebrow: "Nodo services",
    title: "Brand, marketing, and web built to drive sales.",
    subtitle: "",
    copy: "Nodo brings branding, digital marketing, and website development together so your business looks sharper, attracts the right attention, and converts with more confidence.",
    highlights: ["Sharper positioning", "More visibility", "Better conversion"],
  },
  positioning: {
    eyebrow: "Built to connect",
    title: "Three distinct services. One connected growth direction.",
    copy: "Brand gives your business clarity. Marketing helps you generate momentum. Your website turns that momentum into action. Nodo designs each layer to support the others, so your digital presence feels coherent instead of fragmented.",
    pillars: [
      {
        title: "Brand",
        description:
          "Identity and positioning that give your business a clearer edge.",
      },
      {
        title: "Demand",
        description:
          "Marketing activity that helps you generate visibility, leads, and traction.",
      },
      {
        title: "Build",
        description:
          "Web experiences that turn attention into real commercial movement.",
      },
    ],
  },
  detailSection: {
    eyebrow: "Service breakdown",
    title: "Choose the area that needs the most attention right now.",
    description:
      "Whether your priority is brand clarity, growth activity, or a better website, Nodo can help you define the right starting point and shape the work around your business goals.",
  },
  finalCta: {
    eyebrow: "Start with the right layer",
    title: "Need help deciding where to begin?",
    copy: "You may need sharper positioning first. Or a stronger website. Or a better growth engine. We can help you work out the priority and scope the right next move.",
  },
};

export type PlanSlug =
  | "nodo-flow"
  | "nodo-growth"
  | "nodo-nexus"
  | "nodo-launch"
  | "starter-marketing"
  | "growth-marketing"
  | "full-digital-marketing"
  | "brand-starter"
  | "brand-growth"
  | "full-brand-launch"
  | "bundle-start"
  | "bundle-growth"
  | "bundle-scale";

export type WebsitePlanSlug = Extract<
  PlanSlug,
  "nodo-flow" | "nodo-growth" | "nodo-nexus" | "nodo-launch"
>;

export type PlanIntent = "discovery-call" | "quote";

export type Plan = {
  slug: WebsitePlanSlug;
  name: string;
  label: string;
  type: "Digital Growth Partnership" | "One-off Website Build";
  badge?: string;
  price: string;
  priceDetail?: string;
  contractNote?: string;
  summary: string;
  includedFeatures: string[];
  excludedFeatures?: string[];
  ctaLabel: string;
  highlighted?: boolean;
  tone: "entry" | "growth" | "premium" | "one-off";
};

export type PlansHubCard = {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
  icon: LucideIcon;
};

export type CommercialPlan = {
  slug: PlanSlug;
  name: string;
  label: string;
  category: "Marketing" | "Branding" | "Bundle";
  model: "Monthly plan" | "One-off project" | "Connected monthly bundle";
  price: string;
  summary: string;
  includedFeatures: string[];
  ctaLabel: string;
  highlighted?: boolean;
};

export const plansHubContent = {
  hero: {
    eyebrow: "Nodo plans",
    title: "Choose the right digital path.",
    copy: "Start with the area your business needs most: a stronger website, consistent marketing, sharper branding, or one connected growth plan.",
    highlights: ["Websites", "Marketing", "Branding", "Bundles"],
  },
  positioning: {
    eyebrow: "One direction",
    title:
      "Brand creates clarity. Marketing creates momentum. Your website turns it into action.",
    copy: "Nodo plans are structured so each service can stand alone, but the strongest results happen when the pieces work together with one strategy and one commercial direction.",
  },
  finalCta: {
    eyebrow: "Not sure where to begin?",
    title: "We can help you choose the right starting point.",
    copy: "Tell us what you want to improve and we will recommend the plan or bundle that makes the most commercial sense.",
  },
};

export const plansHubCards: PlansHubCard[] = [
  {
    eyebrow: "Website & growth",
    title: "Website Plans",
    description:
      "For businesses that need a premium website, ongoing support, conversion improvements, and a clearer digital foundation.",
    href: "/plans/websites",
    ctaLabel: "Explore website plans",
    icon: Blocks,
  },
  {
    eyebrow: "Visibility & identity",
    title: "Marketing & Branding Plans",
    description:
      "For businesses that need consistent content, campaigns, brand assets, launch materials, or stronger visual direction.",
    href: "/plans/marketing-branding",
    ctaLabel: "Explore marketing & branding",
    icon: Megaphone,
  },
  {
    eyebrow: "Connected offer",
    title: "All-in-One Bundles",
    description:
      "For businesses that want website, brand, and marketing work aligned under one practical growth plan.",
    href: "/plans/marketing-branding#bundles",
    ctaLabel: "View bundles",
    icon: PackageCheck,
  },
];

export const plansPageContent = {
  hero: {
    eyebrow: "Website plans",
    title: "Digital plans that keep your business moving.",
    subtitle: "",
    copy: "Nodo gives you a stronger website, ongoing support, and practical improvements that keep delivering after launch.",
    highlights: [
      "One-off or ongoing",
      "Clear pricing paths",
      "Built for momentum",
    ],
  },
  positioning: {
    eyebrow: "Partner model",
    title: "More than a website.",
    copy: "A website should not be a static asset that gets left behind after launch. At Nodo, we offer both one-off builds and ongoing digital partnership plans designed to keep your business visible, up to date and moving forward.",
  },
  pricingNote:
    "All prices are indicative, GST exclusive, and may vary depending on scope.",
  launchAlternative: {
    eyebrow: "One-off option",
    title: "Need a one-off build instead?",
    copy: "Nodo Launch is available for businesses that want a polished website delivered once and managed internally after launch. It is a clear option, but the strongest long-term value sits in an ongoing Digital Growth Partnership.",
  },
  purchaseOption: {
    eyebrow: "Long-term value",
    title: "A flexible model, built for long-term value.",
    copy: "Our Digital Growth Partnerships are designed for businesses that want ongoing website support and optimisation, not just an initial build. After the first 12 months, clients on Nodo Flow, Nodo Growth and Nodo Nexus can discuss a website purchase option if they wish to change how the partnership works.",
    note: "If this is something you would like to explore, we are happy to explain how the model works in more detail during a call.",
  },
  finalCta: {
    eyebrow: "Ready when you are",
    title: "Let's build what's next.",
    copy: "Whether you need a one-off landing page, a new website or an ongoing digital partner, we can help you find the right plan for your business.",
  },
};

export const plans: Plan[] = [
  {
    slug: "nodo-flow",
    name: "Nodo Flow",
    label:
      "Best for businesses that want a professional website with ongoing support",
    type: "Digital Growth Partnership",
    price: "From NZD 649/month",
    priceDetail: "Initial build and onboarding investment from NZD 2,500",
    contractNote: "12-month partnership period",
    summary:
      "A strong starting point for businesses that want more than a one-off website, with ongoing updates, support and website care.",
    includedFeatures: [
      "Professional website build",
      "Responsive design",
      "Essential on-page SEO",
      "Analytics setup",
      "Hosting and maintenance support",
      "Monthly updates",
      "Small ongoing improvements",
      "Email support",
      "Website purchase option after 12 months",
    ],
    ctaLabel: "Enquire about Nodo Flow",
    tone: "entry",
  },
  {
    slug: "nodo-growth",
    name: "Nodo Growth",
    badge: "Most Popular",
    label:
      "Best for businesses that want consistent digital growth and stronger local visibility",
    type: "Digital Growth Partnership",
    price: "From NZD 1,099/month",
    priceDetail: "Initial build and onboarding investment from NZD 4,500",
    contractNote: "12-month partnership period",
    summary:
      "An ongoing digital growth plan for businesses that want their website to generate more enquiries, leads or bookings over time.",
    includedFeatures: [
      "Everything in Nodo Flow",
      "Local SEO support",
      "Google Business Profile support",
      "Conversion-focused improvements",
      "Landing page or growth updates",
      "Reporting and roadmap guidance",
      "Priority support",
      "Website purchase option after 12 months",
    ],
    ctaLabel: "Enquire about Nodo Growth",
    highlighted: true,
    tone: "growth",
  },
  {
    slug: "nodo-nexus",
    name: "Nodo Nexus",
    label:
      "Best for businesses that want advanced website growth and strategic support",
    type: "Digital Growth Partnership",
    price: "From NZD 1,990/month",
    priceDetail: "Initial build and onboarding investment from NZD 7,500",
    contractNote: "12-month partnership period",
    summary:
      "A premium digital partnership for businesses that want stronger website growth, sharper optimisation, and strategic digital support.",
    includedFeatures: [
      "Everything in Nodo Growth",
      "Advanced conversion support",
      "Booking, FAQ or lead handling improvements",
      "Advanced integrations",
      "Strategic optimisation support",
      "Priority turnaround",
      "Website purchase option after 12 months",
    ],
    ctaLabel: "Enquire about Nodo Nexus",
    tone: "premium",
  },
  {
    slug: "nodo-launch",
    name: "Nodo Launch",
    label: "Best for businesses that only need a one-off website build",
    type: "One-off Website Build",
    price: "From NZD 5,990",
    summary:
      "A one-time website build for businesses that want their site delivered and managed internally after launch.",
    includedFeatures: [
      "Website design and development",
      "Responsive layout",
      "Essential on-page SEO",
      "Analytics setup",
      "Launch support",
      "Limited post-launch support",
    ],
    excludedFeatures: [
      "Ongoing monthly updates",
      "Recurring optimisation",
      "Local SEO support",
      "Google Business support",
      "Continuous strategy input",
    ],
    ctaLabel: "Enquire about Nodo Launch",
    tone: "one-off",
  },
];

export const marketingBrandingPageContent = {
  hero: {
    eyebrow: "Marketing & branding plans",
    title: "Build the clarity and momentum your business needs.",
    copy: "Nodo helps you shape how your business looks, communicates, and shows up online, with practical plans for brand foundations, marketing activity, and connected launch support.",
    highlights: ["Monthly marketing", "One-off branding", "Connected bundles"],
  },
  marketing: {
    eyebrow: "Marketing plans",
    title: "Consistent digital activity without scattered execution.",
    description:
      "Marketing plans are built for visibility, content rhythm, client acquisition, and practical optimisation across the channels that matter.",
  },
  branding: {
    eyebrow: "Branding plans",
    title: "A sharper identity for every touchpoint.",
    description:
      "Branding plans give your business the visual direction, assets, and launch materials needed to look credible and consistent.",
  },
  bundles: {
    eyebrow: "All-in-One bundles",
    title: "Website, brand, and marketing aligned from the start.",
    description:
      "Bundles connect the core layers into one strategy, reducing duplicated effort and making the whole digital presence feel coherent.",
    note: "Ad spend, printing, paid stock assets, paid software, domain costs, third-party subscriptions, and additional production days are quoted separately unless included in the proposal.",
  },
  finalCta: {
    eyebrow: "Plan the next move",
    title: "Need the right mix of brand, marketing, and web?",
    copy: "Share what you are trying to improve and Nodo will help shape a plan that fits your stage, budget, and commercial priority.",
  },
};

export const marketingPlans: CommercialPlan[] = [
  {
    slug: "starter-marketing",
    name: "Marketing Starter",
    label:
      "Best for businesses that need to stay active and professional online",
    category: "Marketing",
    model: "Monthly plan",
    price: "From NZD 300/month",
    summary:
      "A basic monthly plan for businesses that need a consistent presence without running a full campaign.",
    includedFeatures: [
      "Social media posting",
      "Caption writing",
      "Story management",
      "Basic content guidance",
      "Monthly scheduling",
    ],
    ctaLabel: "Enquire about Marketing Starter",
  },
  {
    slug: "growth-marketing",
    name: "Marketing Growth",
    label:
      "Best for businesses that need better content and basic growth activity",
    category: "Marketing",
    model: "Monthly plan",
    price: "From NZD 700/month",
    summary:
      "A stronger monthly plan for businesses that need more consistent content, short-form video, and simple campaign support.",
    includedFeatures: [
      "Social media management",
      "Content creation",
      "Reels and short-form video",
      "Basic paid ads",
      "Content strategy",
      "Analytics and monthly reporting",
    ],
    ctaLabel: "Enquire about Marketing Growth",
    highlighted: true,
  },
  {
    slug: "full-digital-marketing",
    name: "Full Digital Marketing",
    label:
      "Best for businesses focused on stronger campaign execution and lead generation",
    category: "Marketing",
    model: "Monthly plan",
    price: "From NZD 1,500/month",
    summary:
      "A complete monthly growth plan for businesses that want stronger campaigns, lead generation, and ongoing optimisation.",
    includedFeatures: [
      "Advanced paid advertising",
      "Content production",
      "SEO and visibility",
      "Lead generation campaigns",
      "Analytics and optimisation",
      "Ongoing growth support",
    ],
    ctaLabel: "Enquire about Full Digital Marketing",
  },
];

export const brandingPlans: CommercialPlan[] = [
  {
    slug: "brand-starter",
    name: "Brand Starter",
    label:
      "Best for new businesses that need a clean identity and basic launch assets",
    category: "Branding",
    model: "One-off project",
    price: "From NZD 900",
    summary:
      "A professional starting point with the essential identity assets needed to launch with more consistency.",
    includedFeatures: [
      "Logo package",
      "Brand colours and typography",
      "Mini brand guide",
      "Business card design",
      "Flyer or one-page design",
      "Email signature",
      "Social media starter assets",
    ],
    ctaLabel: "Enquire about Brand Starter",
  },
  {
    slug: "brand-growth",
    name: "Brand Growth",
    label:
      "Best for businesses that want stronger visual consistency across channels",
    category: "Branding",
    model: "One-off project",
    price: "From NZD 1,500",
    summary:
      "A more refined identity package with stronger visual direction and editable assets for future marketing.",
    includedFeatures: [
      "Everything in Brand Starter",
      "Enhanced visual direction",
      "Canva templates",
      "Expanded social assets",
      "Improved presentation design",
      "Additional launch materials",
    ],
    ctaLabel: "Enquire about Brand Growth",
    highlighted: true,
  },
  {
    slug: "full-brand-launch",
    name: "Full Brand & Launch",
    label:
      "Best for businesses preparing to launch seriously, reposition, or scale",
    category: "Branding",
    model: "One-off project",
    price: "From NZD 2,500",
    summary:
      "A complete brand package covering strategy, positioning, guidelines, launch assets, and digital direction.",
    includedFeatures: [
      "Full brand strategy",
      "Brand positioning",
      "Tone of voice",
      "Advanced brand guidelines",
      "Social media templates",
      "Presentation and pitch decks",
      "Packaging or signage direction",
      "Website visual direction",
      "Launch campaign assets",
    ],
    ctaLabel: "Enquire about Full Brand & Launch",
  },
];

export const bundlePlans: CommercialPlan[] = [
  {
    slug: "bundle-start",
    name: "Bundle Start",
    label:
      "Best for businesses starting their digital presence with the essentials connected",
    category: "Bundle",
    model: "Connected monthly bundle",
    price: "From NZD 1,999/month",
    summary:
      "A launch-ready package that connects an entry website, essential branding, and starter marketing into one setup.",
    includedFeatures: [
      "Website Flow",
      "Brand Start",
      "Marketing Starter",
      "One connected setup",
      "Aligned website, brand, and marketing content",
    ],
    ctaLabel: "Enquire about Bundle Start",
  },
  {
    slug: "bundle-growth",
    name: "Bundle Growth",
    label:
      "Best for businesses that want ongoing visibility, better content, and stronger growth support",
    category: "Bundle",
    model: "Connected monthly bundle",
    price: "From NZD 2,999/month",
    summary:
      "A stronger partnership combining website growth support, expanded brand assets, monthly marketing, and strategy calls.",
    includedFeatures: [
      "Website Growth",
      "Brand Growth",
      "Marketing Growth",
      "Monthly strategy call",
      "Priority support",
      "Aligned strategy and visual direction",
    ],
    ctaLabel: "Enquire about Bundle Growth",
    highlighted: true,
  },
  {
    slug: "bundle-scale",
    name: "Bundle Scale",
    label:
      "Best for businesses ready to scale with advanced marketing, brand, and website support",
    category: "Bundle",
    model: "Connected monthly bundle",
    price: "From NZD 4,499/month",
    summary:
      "A premium bundle that connects advanced website support, full brand work, and digital marketing.",
    includedFeatures: [
      "Website Nexus",
      "Full Brand & Launch",
      "Full Digital Marketing",
      "Advanced conversion support",
      "Priority turnaround",
      "Connected digital direction",
    ],
    ctaLabel: "Enquire about Bundle Scale",
  },
];

export const allPlanOptions = [
  ...plans,
  ...marketingPlans,
  ...brandingPlans,
  ...bundlePlans,
] satisfies Array<{ slug: PlanSlug; name: string }>;

export type PlanComparisonValue = boolean | string;

export type PlanComparisonRow = {
  feature: string;
  values: Record<WebsitePlanSlug, PlanComparisonValue>;
};

export const planComparisonRows: PlanComparisonRow[] = [
  {
    feature: "Website build",
    values: {
      "nodo-flow": true,
      "nodo-growth": true,
      "nodo-nexus": true,
      "nodo-launch": true,
    },
  },
  {
    feature: "Responsive design",
    values: {
      "nodo-flow": true,
      "nodo-growth": true,
      "nodo-nexus": true,
      "nodo-launch": true,
    },
  },
  {
    feature: "SEO basics",
    values: {
      "nodo-flow": true,
      "nodo-growth": true,
      "nodo-nexus": true,
      "nodo-launch": true,
    },
  },
  {
    feature: "Analytics setup",
    values: {
      "nodo-flow": true,
      "nodo-growth": true,
      "nodo-nexus": true,
      "nodo-launch": true,
    },
  },
  {
    feature: "Monthly support",
    values: {
      "nodo-flow": true,
      "nodo-growth": true,
      "nodo-nexus": true,
      "nodo-launch": false,
    },
  },
  {
    feature: "Ongoing updates",
    values: {
      "nodo-flow": true,
      "nodo-growth": true,
      "nodo-nexus": true,
      "nodo-launch": false,
    },
  },
  {
    feature: "Local SEO support",
    values: {
      "nodo-flow": false,
      "nodo-growth": true,
      "nodo-nexus": true,
      "nodo-launch": false,
    },
  },
  {
    feature: "Google Business Profile support",
    values: {
      "nodo-flow": false,
      "nodo-growth": true,
      "nodo-nexus": true,
      "nodo-launch": false,
    },
  },
  {
    feature: "Landing page / growth improvements",
    values: {
      "nodo-flow": "Small improvements",
      "nodo-growth": true,
      "nodo-nexus": true,
      "nodo-launch": false,
    },
  },
  {
    feature: "Advanced conversion support",
    values: {
      "nodo-flow": false,
      "nodo-growth": false,
      "nodo-nexus": true,
      "nodo-launch": false,
    },
  },
  {
    feature: "Priority support",
    values: {
      "nodo-flow": false,
      "nodo-growth": true,
      "nodo-nexus": "Priority turnaround",
      "nodo-launch": false,
    },
  },
  {
    feature: "Website purchase option",
    values: {
      "nodo-flow": "After 12 months",
      "nodo-growth": "After 12 months",
      "nodo-nexus": "After 12 months",
      "nodo-launch": "One-off purchase",
    },
  },
  {
    feature: "One-off model",
    values: {
      "nodo-flow": false,
      "nodo-growth": false,
      "nodo-nexus": false,
      "nodo-launch": true,
    },
  },
];

export const plansFaq = [
  {
    question:
      "What is the difference between Nodo Launch and a Digital Growth Partnership?",
    answer:
      "Nodo Launch is a one-off website build. Nodo Flow, Nodo Growth and Nodo Nexus are Digital Growth Partnerships that include support, updates and continuous improvement over time.",
  },
  {
    question: "Do the partnership plans include a minimum period?",
    answer:
      "Yes. Our Digital Growth Partnerships are structured around a 12-month partnership period so we can build, support and improve the website properly over time.",
  },
  {
    question: "Can I buy the website after a partnership plan?",
    answer:
      "Yes. After the initial 12-month partnership period, we can discuss a website purchase option. This is best explained in conversation, depending on the site structure and service history.",
  },
  {
    question: "Can the plans be tailored to my business?",
    answer:
      "Yes. These plans are our standard starting points, but we can tailor the scope depending on your business goals, timelines and technical requirements.",
  },
];
