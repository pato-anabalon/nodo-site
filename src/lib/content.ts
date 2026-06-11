import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  Blocks,
  Brush,
  Clapperboard,
  Gauge,
  GitBranch,
  Instagram,
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
  bestWhen: string;
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
    bestWhen:
      "Best when your business looks inconsistent, unclear, or hard to explain.",
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
    eyebrow: "Visibility & enquiries",
    title: "Digital Marketing",
    description:
      "Practical marketing support that helps the right people find you, understand your value, and take the next step.",
    bestWhen:
      "Best when people are not finding you, remembering you, or taking action.",
    highlight:
      "Turn scattered marketing activity into clearer visibility and stronger enquiries.",
    deliverables: [
      "Campaign and channel strategy",
      "SEO and performance-led content direction",
      "Conversion improvements across landing experiences",
    ],
    ctaLabel: "Plan marketing activity",
    href: "/contact?service=digital-marketing&source=services-section",
    icon: Workflow,
  },
  {
    eyebrow: "Digital presence",
    title: "Website design & development",
    description:
      "Premium websites designed and built to look sharp, perform fast, and support the way your business actually sells, communicates, and grows.",
    bestWhen:
      "Best when your site looks outdated, feels unclear, or is not generating enough enquiries.",
    highlight:
      "Build the experience your audience lands on and your business grows through.",
    deliverables: [
      "Custom website design and UX structure",
      "Responsive development in modern web stacks",
      "Launch-ready performance, CMS, and enquiry flows",
    ],
    ctaLabel: "Explore website design",
    href: "/services/website-design-auckland",
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

export type CaseStudyWorkCard = {
  title: string;
  eyebrow: string;
  description: string;
  href?: string;
  ctaLabel?: string;
  tags: string[];
  icon: LucideIcon;
};

export const caseStudiesPageContent = {
  hero: {
    eyebrow: "Selected work",
    title: "Work that makes businesses easier to trust, find, and choose.",
    copy: "Selected website redesigns, social media work, and content pieces for New Zealand businesses, starting with a full website transformation for PlasterPro Solution.",
    highlights: ["Website redesign", "Social media", "Video content"],
  },
  featured: {
    eyebrow: "Featured case study",
    client: "PlasterPro Solution",
    href: "https://www.plasterprosolution.co.nz/",
    industry: "Auckland plastering, painting, gib stopping, and property presentation",
    headline:
      "From an outdated Wix site to a high-trust trade website for Auckland property work.",
    summary:
      "PlasterPro Solution needed a website that matched the quality of their work. The redesign gave the business clearer service structure, stronger trust signals, better local relevance, and a sharper first impression.",
    tags: ["Website redesign", "UX", "Copywriting", "SEO structure"],
    challenge: {
      title: "The challenge",
      description:
        "The old site did not communicate the quality, range, or credibility of the business clearly enough. For a trade business working across Auckland properties, the website needed to feel professional quickly and make it easier for clients to request a quote.",
    },
    work: {
      title: "What changed",
      points: [
        "A clearer service architecture for plastering, painting, gib stopping, and property presentation.",
        "A stronger first impression built around premium finishes and Auckland property work.",
        "Trust signals through reviews, qualifications, suppliers, project imagery, and clear contact paths.",
        "More direct copy that helps homeowners, builders, agents, and property managers understand the offer.",
      ],
    },
    outcomes: [
      "Stronger credibility from the first visit",
      "Clearer explanation of services",
      "Better foundation for local SEO",
      "More visible quote paths",
    ],
    comparison: {
      before: {
        label: "Before",
        title: "Old Wix presence",
        description:
          "The previous site had weak hierarchy, crowded sections, and limited trust signals for a trade business working across Auckland properties.",
        imageSrc: "/case-studies/plasterpro-old.png",
        imageAlt: "Old PlasterPro Solution Wix website screenshot before the Nodo redesign.",
        videoSrc: "/videos/plasterpro-old-site-480.mp4",
      },
      after: {
        label: "After",
        title: "Nodo redesign",
        description:
          "A sharper website experience built around services, process, projects, reviews, and quote actions.",
        imageSrc: "/case-studies/plasterpro-new.png",
        imageAlt: "New PlasterPro Solution website screenshot after the Nodo redesign.",
        videoSrc: "/videos/plasterpro-new-site-480.mp4",
      },
    },
  },
  selectedWork: {
    eyebrow: "More client work",
    title: "Useful work does not always need a full case study.",
    copy: "Some projects are ongoing, smaller in scope, or focused on specific content needs. This section keeps those visible without overclaiming results.",
  },
  finalCta: {
    eyebrow: "Have a business that needs this kind of shift?",
    title: "Tell us what feels unclear, outdated, or inconsistent.",
    copy: "We can help you decide whether your next move is website, marketing, brand, or content.",
  },
};

export const caseStudyWorkCards: CaseStudyWorkCard[] = [
  {
    title: "PISNCO",
    eyebrow: "Social media management",
    description:
      "Ongoing social media support focused on rhythm, visual consistency, captions, and brand presence.",
    href: "https://www.instagram.com/pisnco/",
    ctaLabel: "View Instagram",
    tags: ["Social media", "Content planning", "Captions"],
    icon: Instagram,
  },
  {
    title: "Short-form video pieces",
    eyebrow: "Video content",
    description:
      "Video assets and social pieces created to help businesses explain, promote, launch, or stay visible.",
    tags: ["Video editing", "Reels", "Content pieces"],
    icon: Clapperboard,
  },
  {
    title: "Website and content support",
    eyebrow: "Active work",
    description:
      "Smaller improvements across websites, content structure, and digital presence for clients that need practical support.",
    tags: ["Website support", "Content", "Digital presence"],
    icon: ArrowUpRight,
  },
];

export const servicesPageContent = {
  hero: {
    eyebrow: "Nodo services",
    title: "Brand, marketing, and websites that help customers choose you.",
    subtitle: "",
    copy: "Nodo brings branding, digital marketing, and website development together so your business looks sharper, attracts the right attention, and turns that attention into clearer enquiries.",
    highlights: ["Sharper positioning", "More visibility", "Better conversion"],
  },
  positioning: {
    eyebrow: "Built to connect",
    title: "Three services. One clearer digital presence.",
    copy: "Brand makes your business easier to recognise and trust. Marketing helps the right people find you and understand your value. Your website turns that attention into enquiries, bookings, or next steps.",
    pillars: [
      {
        title: "Brand",
        description:
          "Make the business easier to recognise and trust.",
      },
      {
        title: "Marketing",
        description:
          "Help the right people find you and understand your value.",
      },
      {
        title: "Website",
        description:
          "Turn attention into enquiries, bookings, or next steps.",
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
    title: "Not sure what your business needs first?",
    copy: "We can help you identify the highest-impact starting point: brand clarity, marketing momentum, or a stronger website.",
  },
};

export const websiteDesignAucklandPageContent = {
  hero: {
    eyebrow: "Website design Auckland",
    title:
      "Websites for Auckland businesses that need to look credible and win better enquiries.",
    subtitle:
      "Custom website design, redesigns, and launch-ready builds for service businesses that need customers to understand, trust, and contact them faster.",
    copy:
      "Nodo designs and builds websites that make your offer clearer, your business easier to trust, and your next enquiry easier to start.",
    highlights: [
      "Custom website design",
      "Website redesigns",
      "Built in Auckland",
    ],
  },
  intro: {
    eyebrow: "What the page needs to do",
    title:
      "A good website should make the next decision easier for your customer.",
    copy:
      "Most people do not read every section. They scan for credibility, relevance, proof, and a simple next step. We structure your website around those decisions so visitors can quickly understand what you do, why it matters, and how to get in touch.",
    points: [
      "Explain your services without making people work for the answer.",
      "Show enough proof to reduce doubt before someone contacts you.",
      "Create clear paths for quotes, bookings, calls, and enquiries.",
    ],
  },
  problems: {
    eyebrow: "Common reasons to redesign",
    title: "Signs your current website is costing you trust.",
    items: [
      {
        title: "It looks older than the business behind it",
        copy:
          "If the website feels outdated, customers may assume the service, process, or reliability is outdated too.",
      },
      {
        title: "People cannot quickly understand what you offer",
        copy:
          "Clear structure matters. Visitors should not need to dig through the site to know whether you can help them.",
      },
      {
        title: "The site gets visits but not enough enquiries",
        copy:
          "A website needs stronger calls to action, better proof, and a cleaner journey from interest to contact.",
      },
    ],
  },
  process: {
    eyebrow: "How we build",
    title: "A clear website process from direction to launch.",
    steps: [
      {
        title: "Clarify the offer",
        copy:
          "We define what the website needs to communicate, who it needs to persuade, and what action matters most.",
      },
      {
        title: "Structure the journey",
        copy:
          "We map the pages, sections, proof points, and enquiry paths customers need before they feel ready to act.",
      },
      {
        title: "Design and build",
        copy:
          "We create a responsive website that looks sharp, loads well, and supports the way your business sells.",
      },
      {
        title: "Launch and improve",
        copy:
          "We prepare the site for launch with SEO basics, analytics, contact flows, and a path for future improvements.",
      },
    ],
  },
  included: {
    eyebrow: "What is included",
    title: "Website design that covers more than the visual layer.",
    items: [
      "Website strategy and page structure",
      "UX writing and content hierarchy",
      "Custom responsive interface design",
      "Modern website development",
      "Basic technical SEO setup",
      "Contact forms and enquiry paths",
      "Performance-minded implementation",
      "Launch support and next-step recommendations",
    ],
  },
  proof: {
    eyebrow: "Featured redesign",
    title: "PlasterPro Solution needed a website that matched the quality of their Auckland property work.",
    copy:
      "The redesign replaced an outdated Wix presence with a sharper website built around services, process, project proof, reviews, and quote actions.",
    bullets: [
      "Clearer service structure for Auckland plastering and painting work.",
      "Stronger first impression for property owners and commercial enquiries.",
      "More direct paths to request a quote from the site.",
    ],
    href: "/case-studies",
    ctaLabel: "View the case study",
    imageSrc: "/case-studies/plasterpro-new.png",
    imageAlt:
      "New PlasterPro Solution website screenshot after the Nodo redesign.",
  },
  plans: {
    eyebrow: "Project paths",
    title: "Choose a one-off build or an ongoing website partnership.",
    copy:
      "Some businesses need a polished website launched once. Others need ongoing support, updates, SEO basics, and conversion improvements after launch. Nodo can help you choose the right path.",
    primaryCta: "Explore website plans",
    secondaryCta: "Talk about a website",
  },
  faq: [
    {
      question: "Do you only build websites for Auckland businesses?",
      answer:
        "Nodo is based in Auckland and works with New Zealand businesses. Auckland is our local market, but we can support businesses across the country.",
    },
    {
      question: "Can you redesign an existing website?",
      answer:
        "Yes. A redesign is often the best option when the current site looks outdated, feels unclear, or no longer reflects the quality of the business.",
    },
    {
      question: "Do you handle the website copy and structure?",
      answer:
        "Yes. We help shape the page structure, content hierarchy, and UX writing so visitors can understand the business and take action more easily.",
    },
    {
      question: "Can the website keep improving after launch?",
      answer:
        "Yes. Nodo offers ongoing website partnerships for updates, support, SEO basics, and conversion improvements after the first launch.",
    },
  ],
  finalCta: {
    eyebrow: "Start with clarity",
    title: "Need a website that makes your business easier to choose?",
    copy:
      "Tell us what your current site is not doing well. We will help you decide whether you need a redesign, a new build, or an ongoing website partnership.",
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
    title: "Choose the right plan for what your business needs next.",
    copy: "Start with the area that needs attention first: a stronger website, clearer brand, more consistent marketing, or one connected plan that brings it all together.",
    highlights: ["Websites", "Marketing", "Branding", "Bundles"],
  },
  positioning: {
    eyebrow: "One direction",
    title:
      "Brand builds trust. Marketing brings attention. Your website turns it into enquiries.",
    copy: "Each plan can stand alone, but the strongest results happen when your brand, marketing, and website are working toward the same business goal.",
  },
  finalCta: {
    eyebrow: "Not sure where to begin?",
    title: "We can help you choose the right starting point.",
    copy: "Tell us what you want to improve and we will recommend the plan or bundle that makes the most sense for your business.",
  },
};

export const plansHubCards: PlansHubCard[] = [
  {
    eyebrow: "Website & growth",
    title: "Website Plans",
    description:
      "Choose this if your website needs to launch, improve, or keep generating enquiries after go-live.",
    href: "/plans/websites",
    ctaLabel: "Explore website plans",
    icon: Blocks,
  },
  {
    eyebrow: "Visibility & identity",
    title: "Marketing & Branding Plans",
    description:
      "Choose this if people need to understand, remember, and trust your business more clearly.",
    href: "/plans/marketing-branding",
    ctaLabel: "Explore marketing & branding",
    icon: Megaphone,
  },
  {
    eyebrow: "Connected offer",
    title: "All-in-One Bundles",
    description:
      "Choose this if you want brand, website, and marketing moving in the same direction.",
    href: "/plans/marketing-branding#bundles",
    ctaLabel: "View bundles",
    icon: PackageCheck,
  },
];

export const plansPageContent = {
  hero: {
    eyebrow: "Website plans",
    title: "Website plans for launch, support, and ongoing improvement.",
    subtitle: "",
    copy: "Choose a one-off website build or an ongoing partnership that keeps your website updated, supported, and improving after launch.",
    highlights: [
      "One-off build available",
      "Monthly support available",
      "Built to keep improving",
    ],
  },
  positioning: {
    eyebrow: "Partner model",
    title: "A website needs care after launch.",
    copy: "Your website can keep improving after it goes live: updates, support, SEO basics, conversion improvements, and clearer paths for enquiries. That is what the partnership plans are built for.",
  },
  pricingNote:
    "All prices are indicative, GST exclusive, and may vary depending on scope.",
  launchAlternative: {
    eyebrow: "One-off option",
    title: "Only need the website built once?",
    copy: "Nodo Launch is for businesses that want a polished website delivered once, then managed internally. It is the right fit if you already have someone to handle updates, content, and future improvements.",
  },
  purchaseOption: {
    eyebrow: "After 12 months",
    title: "What happens after the first 12 months?",
    copy: "Flow, Growth, and Nexus are structured as 12-month partnerships. After that period, we can discuss whether continuing the partnership or exploring a website purchase option makes more sense for your business.",
    note: "The best option depends on your website structure, service history, and how much support you want after the first year.",
  },
  finalCta: {
    eyebrow: "Ready when you are",
    title: "Not sure which plan fits?",
    copy: "Tell us what you need to improve. We will help you choose between a one-off build, an ongoing website partnership, or a connected brand, marketing, and website plan.",
  },
};

export const plans: Plan[] = [
  {
    slug: "nodo-flow",
    name: "Nodo Flow",
    label:
      "Best for a professional website with monthly care",
    type: "Digital Growth Partnership",
    price: "From NZD 649/month",
    priceDetail: "Initial build and onboarding investment from NZD 2,500",
    contractNote: "12-month partnership period",
    summary:
      "A strong starting point for businesses that want their website built, supported, and kept up to date over time.",
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
    ctaLabel: "Talk about Flow",
    tone: "entry",
  },
  {
    slug: "nodo-growth",
    name: "Nodo Growth",
    badge: "Most Popular",
    label:
      "Best for more enquiries, stronger visibility, and regular improvements",
    type: "Digital Growth Partnership",
    price: "From NZD 1,099/month",
    priceDetail: "Initial build and onboarding investment from NZD 4,500",
    contractNote: "12-month partnership period",
    summary:
      "An ongoing website partnership for businesses that want better visibility, clearer customer actions, and more useful enquiries over time.",
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
    ctaLabel: "Talk about Growth",
    highlighted: true,
    tone: "growth",
  },
  {
    slug: "nodo-nexus",
    name: "Nodo Nexus",
    label:
      "Best for advanced optimisation, integrations, and strategic support",
    type: "Digital Growth Partnership",
    price: "From NZD 1,990/month",
    priceDetail: "Initial build and onboarding investment from NZD 7,500",
    contractNote: "12-month partnership period",
    summary:
      "A premium partnership for businesses that need deeper optimisation, more complex website improvements, and higher-touch strategic support.",
    includedFeatures: [
      "Everything in Nodo Growth",
      "Advanced conversion support",
      "Booking, FAQ or lead handling improvements",
      "Advanced integrations",
      "Strategic optimisation support",
      "Priority turnaround",
      "Website purchase option after 12 months",
    ],
    ctaLabel: "Talk about Nexus",
    tone: "premium",
  },
  {
    slug: "nodo-launch",
    name: "Nodo Launch",
    label: "Best for businesses that only need the website built once",
    type: "One-off Website Build",
    price: "From NZD 5,990",
    summary:
      "A one-time website build for businesses that want the site delivered once, then managed internally after launch.",
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
    ctaLabel: "Talk about Launch",
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
    feature: "Website design and build",
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
    feature: "Essential SEO setup",
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
    feature: "Monthly website support",
    values: {
      "nodo-flow": true,
      "nodo-growth": true,
      "nodo-nexus": true,
      "nodo-launch": false,
    },
  },
  {
    feature: "Monthly updates",
    values: {
      "nodo-flow": true,
      "nodo-growth": true,
      "nodo-nexus": true,
      "nodo-launch": false,
    },
  },
  {
    feature: "Local visibility support",
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
    feature: "Growth improvements",
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
    feature: "Purchase option",
    values: {
      "nodo-flow": "After 12 months",
      "nodo-growth": "After 12 months",
      "nodo-nexus": "After 12 months",
      "nodo-launch": "One-off purchase",
    },
  },
  {
    feature: "One-time build model",
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
      "What is the difference between Nodo Launch and Flow, Growth, or Nexus?",
    answer:
      "Nodo Launch is a one-off website build. Nodo Flow, Nodo Growth and Nodo Nexus are ongoing website partnerships that include support, updates and improvements after launch.",
  },
  {
    question: "Do the partnership plans include a minimum period?",
    answer:
      "Yes. Flow, Growth and Nexus are structured around a 12-month partnership period so we can build, support and improve the website properly over time.",
  },
  {
    question: "Can I buy the website after a partnership plan?",
    answer:
      "Yes. After the initial 12-month partnership period, we can discuss a website purchase option. The right path depends on the site structure, service history, and how much support you want next.",
  },
  {
    question: "Can the plans be tailored to my business?",
    answer:
      "Yes. These plans are standard starting points. We can tailor the scope depending on your business goals, timeline, support needs, and website requirements.",
  },
];
