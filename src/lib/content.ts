import type { LucideIcon } from "lucide-react";
import {
  Blocks,
  Bot,
  Gauge,
  GitBranch,
  Layers3,
  LineChart,
  MousePointer2,
  Network,
  Sparkles,
  Workflow,
} from "lucide-react";

export const navigation = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Case studies", href: "/case-studies" },
  { label: "Contact", href: "/contact" },
];

export type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    title: "Digital systems",
    description:
      "Custom operational tools that remove manual work, reduce friction, and keep teams moving with confidence.",
    icon: Network,
  },
  {
    title: "Workflow automation",
    description:
      "Connected automations for sales, delivery, reporting, admin, and repeatable processes that should not live in spreadsheets.",
    icon: Workflow,
  },
  {
    title: "Web platforms",
    description:
      "High-performing websites, portals, and client-facing experiences designed to become business infrastructure.",
    icon: Blocks,
  },
  {
    title: "AI-enabled operations",
    description:
      "Practical AI layers for routing, summarising, triage, support, and decision support inside real business workflows.",
    icon: Bot,
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
      "A focused look at Nodo's digital systems, workflow automation, web platforms, and AI-enabled operations.",
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
