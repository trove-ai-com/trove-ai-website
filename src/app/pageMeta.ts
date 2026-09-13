import { pathToPage } from "@/app/pageRoutes";

export const SITE_URL = "https://www.trove-ai.com";
export const SITE_NAME = "Trove-AI";

export type PageMeta = {
  title: string;
  description: string;
  robots?: string;
};

const DEFAULT_DESCRIPTION =
  "Trove-AI builds human-centric AI software for safety, security, and critical decisions. Built to protect people in the environments that need it most.";

export const PAGE_META: Record<string, PageMeta> = {
  home: {
    title: "Trove-AI — Intelligently Protecting Our Future",
    description: DEFAULT_DESCRIPTION,
  },
  solutions: {
    title: "Solutions — Trove-AI Platform",
    description:
      "One unified platform for safety, security, and critical decisions. VisualIQ, DeepSenseIQ, CareIQ, CyberIQ, VellumGuard, and LEXSO, powered by the DeepSense AI Engine.",
  },
  about: {
    title: "About Trove-AI",
    description:
      "Trove-AI is a human-centric AI software company founded in 2023, building AI systems that protect people in safety, security, and care environments.",
  },
  industries: {
    title: "Industries — Trove-AI",
    description:
      "AI solutions tailored to government, defense, health and education safety, commercial security, and infrastructure operations.",
  },
  partners: {
    title: "Partners — Trove-AI",
    description: "Partner with Trove-AI to deploy human-centric AI for safety, security, and critical decisions.",
  },
  contact: {
    title: "Contact Trove-AI",
    description: "Talk with Trove-AI about deploying AI for safety, security, and critical decisions in your environment.",
  },
  resources: {
    title: "Resources & Insights — Trove-AI",
    description:
      "Comparison guides and FAQ content on hardware-agnostic security, multi-sensor fusion, and AI surveillance compliance.",
  },
  guides: {
    title: "Guides — Trove-AI",
    description: "Comparison guides, explainers, and compliance maps across Trove-AI product lines.",
  },
  blog: {
    title: "Blog — Trove-AI",
    description: "Weekly pieces on AI development, physical security, and cyber intelligence across Trove-AI product lines.",
  },
  visualiq: {
    title: "VisualIQ — Camera Intelligence Platform | Trove-AI",
    description:
      "Transform existing cameras into intelligent sensors. Natural language alerts, behavioral analytics, and hardware-agnostic deployment across any facility.",
  },
  deepsenseiq: {
    title: "DeepSenseIQ — Continuous Intelligence Engine | Trove-AI",
    description:
      "Edge-first AI for continuous multi-sensor data ingestion. Operates fully offline and delivers evidence-based threat detection at operational scale.",
  },
  careiq: {
    title: "CareIQ — Behavioral Safety Monitor | Trove-AI",
    description:
      "AI monitoring purpose-built for healthcare, education, and childcare. Real-time behavioral anomaly detection with a safety-first alert workflow.",
  },
  cyberiq: {
    title: "CyberIQ — Unified Threat Intelligence | Trove-AI",
    description:
      "One AI engine ingesting logs, code, and network traffic simultaneously. Risk scoring with full explainability across the attack surface.",
  },
  vellumguard: {
    title: "VellumGuard — Zero Trust Communications | Trove-AI",
    description:
      "Node-to-node post-quantum encrypted communications with verifiable trust at every layer for defense, government, and healthcare.",
  },
  lexso: {
    title: "LEXSO — Physical Security Command | Trove-AI",
    description:
      "AI-powered physical security command: sensor fusion, deterrence, and real-time command center intelligence in a single platform.",
  },
  admin: {
    title: "Admin — Trove-AI",
    description: "Trove-AI content administration.",
    robots: "noindex, nofollow",
  },
};

const FALLBACK_META: PageMeta = {
  title: `${SITE_NAME} — Human-centric AI for safety and security`,
  description: DEFAULT_DESCRIPTION,
};

export const PRERENDER_PATHS = [
  "/",
  "/solutions",
  "/about",
  "/industries",
  "/partners",
  "/contact",
  "/resources",
  "/guides",
  "/blog",
  "/visualiq",
  "/deepsenseiq",
  "/careiq",
  "/cyberiq",
  "/vellumguard",
  "/lexso",
] as const;

export function metaForPath(pathname: string): PageMeta {
  const page = pathToPage(pathname);
  if (page === "blog-composer") return PAGE_META.admin;
  if (page.startsWith("article-")) {
    return {
      title: `Blog — ${SITE_NAME}`,
      description: PAGE_META.blog.description,
    };
  }
  if (page.startsWith("guide-")) {
    return {
      title: `Guides — ${SITE_NAME}`,
      description: PAGE_META.guides.description,
    };
  }
  return PAGE_META[page] ?? FALLBACK_META;
}

export function canonicalForPath(pathname: string): string {
  const path = pathname.replace(/\/+$/, "") || "/";
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}
