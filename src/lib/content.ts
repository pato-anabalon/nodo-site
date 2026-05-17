import type { LucideIcon } from "lucide-react";
import {
  Blocks,
  Brush,
  Gauge,
  GitBranch,
  Layers3,
  LineChart,
  MousePointer2,
  Sparkles,
  Workflow,
} from "lucide-react";

export const navigation = [
  { label: "Services", href: "/services" },
  { label: "Plans", href: "/plans" },
  { label: "About", href: "/about" },
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
      "Positioning, identity direction, and brand systems built to make your business feel sharper, clearer, and more credible at every touchpoint.",
    highlight: "Clarify how your business looks, sounds, and is remembered.",
    deliverables: [
      "Brand positioning direction",
      "Identity systems and visual language",
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
      "Practical marketing systems that improve your visibility, generate stronger enquiries, and give your business a more consistent growth engine.",
    highlight: "Turn your digital activity into repeatable traction instead of scattered effort.",
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
    highlight: "Build the experience your audience lands on and your business grows through.",
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
    eyebrow: "Diagnose",
    title: "Map the business reality",
    description:
      "We find the bottlenecks, handoffs, data gaps, and high-value moments where a better system can change the pace.",
    icon: MousePointer2,
  },
  {
    eyebrow: "Design",
    title: "Shape the operating model",
    description:
      "We turn messy workflows into crisp interfaces, reliable automations, and architecture that can grow with the company.",
    icon: Layers3,
  },
  {
    eyebrow: "Build",
    title: "Move fast with polish",
    description:
      "We ship production-ready digital systems with the right balance of speed, craft, and maintainability.",
    icon: GitBranch,
  },
  {
    eyebrow: "Improve",
    title: "Measure and optimise",
    description:
      "We keep tuning the system around usage, feedback, and business outcomes so the work compounds over time.",
    icon: Gauge,
  },
];

export const outcomes = [
  "Cleaner client experiences",
  "Fewer disconnected tools",
  "Less manual admin",
  "Faster response cycles",
  "Better visibility across work",
  "Systems ready for scale",
];

export const proofPoints = [
  {
    label: "Signal",
    title: "A sharper view of what matters",
    description:
      "Nodo turns fragmented inputs into a system your team can understand, trust, and act on.",
    icon: Sparkles,
  },
  {
    label: "Momentum",
    title: "Speed without operational chaos",
    description:
      "The goal is not just to launch faster. It is to make the business itself move faster.",
    icon: Gauge,
  },
  {
    label: "Return",
    title: "Technology tied to outcomes",
    description:
      "Every build is anchored to a commercial reason: time saved, revenue unlocked, or friction removed.",
    icon: LineChart,
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
      "Nodo partners with growing businesses to design and build digital systems that create clarity, speed, and measurable results.",
  },
  "case-studies": {
    title: "Case Studies",
    eyebrow: "Work in progress",
    description:
      "Selected examples of systems, platforms, and operational improvements will live here as the portfolio grows.",
  },
};

export const servicesPageContent = {
  hero: {
    eyebrow: "Nodo services",
    title: "Brand, marketing, and web built to drive sales.",
    subtitle: "",
    copy:
      "Nodo brings branding, digital marketing, and website development together so your business looks sharper, attracts the right attention, and converts with more confidence.",
    highlights: [
      "Sharper positioning",
      "More visibility",
      "Better conversion",
    ],
  },
  positioning: {
    eyebrow: "Built to connect",
    title: "Three distinct services. One connected growth system.",
    copy:
      "Brand gives your business clarity. Marketing helps you generate momentum. Your website turns that momentum into action. Nodo designs each layer to support the others, so your digital presence feels coherent instead of fragmented.",
    pillars: [
      {
        title: "Brand",
        description: "Identity and positioning that give your business a clearer edge.",
      },
      {
        title: "Demand",
        description: "Marketing systems that help you generate visibility, leads, and traction.",
      },
      {
        title: "Build",
        description: "Web experiences that turn attention into real commercial movement.",
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
    copy:
      "You may need sharper positioning first. Or a stronger website. Or a better growth engine. We can help you work out the priority and scope the right next move.",
  },
};

export type PlanSlug = "nodo-flow" | "nodo-growth" | "nodo-nexus" | "nodo-launch";

export type PlanIntent = "discovery-call" | "quote";

export type Plan = {
  slug: PlanSlug;
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

export const plansPageContent = {
  hero: {
    eyebrow: "Nodo plans",
    title: "Digital plans that keep your business moving.",
    subtitle: "",
    copy:
      "Nodo gives you clearer digital structure, ongoing support, and practical improvements that keep delivering after launch.",
    highlights: [
      "One-off or ongoing",
      "Clear pricing paths",
      "Built for momentum",
    ],
  },
  positioning: {
    eyebrow: "Partner model",
    title: "More than a website.",
    copy:
      "A website should not be a static asset that gets left behind after launch. At Nodo, we offer both one-off builds and ongoing digital partnership plans designed to keep your business visible, up to date and moving forward.",
  },
  pricingNote: "All prices are indicative, GST exclusive, and may vary depending on scope.",
  launchAlternative: {
    eyebrow: "One-off option",
    title: "Need a one-off build instead?",
    copy:
      "Nodo Launch is available for businesses that want a polished website delivered once and managed internally after launch. It is a clear option, but the strongest long-term value sits in an ongoing Digital Growth Partnership.",
  },
  purchaseOption: {
    eyebrow: "Long-term value",
    title: "A flexible model, built for long-term value.",
    copy:
      "Our Digital Growth Partnerships are designed for businesses that want ongoing technology support, not just an initial build. After the first 12 months, clients on Nodo Flow, Nodo Growth and Nodo Nexus can discuss a website purchase option if they wish to change how the partnership works.",
    note:
      "If this is something you would like to explore, we are happy to explain how the model works in more detail during a call.",
  },
  finalCta: {
    eyebrow: "Ready when you are",
    title: "Let's build what's next.",
    copy:
      "Whether you need a one-off landing page, a new website or an ongoing digital partner, we can help you find the right plan for your business.",
  },
};

export const plans: Plan[] = [
  {
    slug: "nodo-flow",
    name: "Nodo Flow",
    label: "Best for businesses that want a professional website with ongoing support",
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
    label: "Best for businesses that want consistent digital growth and stronger local visibility",
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
    label: "Best for businesses that want advanced systems, automation and strategic support",
    type: "Digital Growth Partnership",
    price: "From NZD 1,990/month",
    priceDetail: "Initial build and onboarding investment from NZD 7,500",
    contractNote: "12-month partnership period",
    summary:
      "A premium digital partnership for businesses that want more advanced growth systems, AI-driven workflows and connected digital operations.",
    includedFeatures: [
      "Everything in Nodo Growth",
      "AI-powered automations",
      "Booking, FAQ or lead handling workflows",
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

export type PlanComparisonValue = boolean | string;

export type PlanComparisonRow = {
  feature: string;
  values: Record<PlanSlug, PlanComparisonValue>;
};

export const planComparisonRows: PlanComparisonRow[] = [
  {
    feature: "Website build",
    values: { "nodo-flow": true, "nodo-growth": true, "nodo-nexus": true, "nodo-launch": true },
  },
  {
    feature: "Responsive design",
    values: { "nodo-flow": true, "nodo-growth": true, "nodo-nexus": true, "nodo-launch": true },
  },
  {
    feature: "SEO basics",
    values: { "nodo-flow": true, "nodo-growth": true, "nodo-nexus": true, "nodo-launch": true },
  },
  {
    feature: "Analytics setup",
    values: { "nodo-flow": true, "nodo-growth": true, "nodo-nexus": true, "nodo-launch": true },
  },
  {
    feature: "Monthly support",
    values: { "nodo-flow": true, "nodo-growth": true, "nodo-nexus": true, "nodo-launch": false },
  },
  {
    feature: "Ongoing updates",
    values: { "nodo-flow": true, "nodo-growth": true, "nodo-nexus": true, "nodo-launch": false },
  },
  {
    feature: "Local SEO support",
    values: { "nodo-flow": false, "nodo-growth": true, "nodo-nexus": true, "nodo-launch": false },
  },
  {
    feature: "Google Business Profile support",
    values: { "nodo-flow": false, "nodo-growth": true, "nodo-nexus": true, "nodo-launch": false },
  },
  {
    feature: "Landing page / growth improvements",
    values: { "nodo-flow": "Small improvements", "nodo-growth": true, "nodo-nexus": true, "nodo-launch": false },
  },
  {
    feature: "AI-powered automations",
    values: { "nodo-flow": false, "nodo-growth": false, "nodo-nexus": true, "nodo-launch": false },
  },
  {
    feature: "Priority support",
    values: { "nodo-flow": false, "nodo-growth": true, "nodo-nexus": "Priority turnaround", "nodo-launch": false },
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
    values: { "nodo-flow": false, "nodo-growth": false, "nodo-nexus": false, "nodo-launch": true },
  },
];

export const plansFaq = [
  {
    question: "What is the difference between Nodo Launch and a Digital Growth Partnership?",
    answer:
      "Nodo Launch is a one-off website build. Nodo Flow, Nodo Growth and Nodo Nexus are Digital Growth Partnerships that include support, updates and continuous improvement over time.",
  },
  {
    question: "Do the partnership plans include a minimum period?",
    answer:
      "Yes. Our Digital Growth Partnerships are structured around a 12-month partnership period so we can build, support and improve the digital system properly over time.",
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
