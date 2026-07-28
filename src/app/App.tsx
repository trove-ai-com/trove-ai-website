import { useState, useEffect, useRef, type ReactNode } from "react";
import { motion, useInView } from "motion/react";
import troveLogo from "@/imports/Trove.png";
import partnersHero from "@/imports/pexels-kampus-8463142.jpg";
import {
  Camera, Radio, Heart, Shield, Lock, Building,
  Network, Users, ArrowRight, Menu, X, ChevronDown,
  Zap, Globe, Check, Brain, Award, ChevronRight, Cpu,
  Activity, Layers, PenLine,
} from "lucide-react";
import { allInsights } from "@/app/blog/loadArticles";
import { ArticleBody } from "@/app/blog/ArticleBody";
import { AdminPage } from "@/app/admin/AdminPage";
import { AuthProvider } from "@/app/admin/AuthProvider";
import { ResourcesPageLive } from "@/app/content/ResourcesPageLive";
import { ArticlePageLive, BlogPageLive } from "@/app/content/BlogPagesLive";
import { ContactPage } from "@/app/contact/ContactPage";
import { openContact } from "@/app/contact/openContact";

type Page = "home" | "solutions" | "about" | "industries" | "resources" | "blog" | "blog-composer" | "admin" | "partners" | "contact" | "visualiq" | "deepsenseiq" | "careiq" | "cyberiq" | "vellumguard" | "lexso" | `article-${string}`;

function TroveLogo({ className }: { className?: string }) {
  const [src, setSrc] = useState<string>("");

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const d = imageData.data;
      for (let i = 0; i < d.length; i += 4) {
        if (d[i] > 240 && d[i + 1] > 240 && d[i + 2] > 240) {
          d[i + 3] = 0;
        }
      }
      ctx.putImageData(imageData, 0, 0);
      setSrc(canvas.toDataURL());
    };
    img.src = troveLogo;
  }, []);

  if (!src) return <div className={className} />;
  return <img src={src} alt="Trove" className={className} />;
}

// ─── DATA ──────────────────────────────────────────────────────────────────

const products = [
  {
    id: "visualiq",
    name: "VisualIQ",
    tagline: "Camera Intelligence Platform",
    description:
      "Transform existing cameras into intelligent sensors. Natural language alerts, behavioral analytics, and hardware-agnostic deployment across any facility.",
    color: "#0EA5E9",
    border: "rgba(14,165,233,0.22)",
    bg: "rgba(14,165,233,0.05)",
    Icon: Camera,
    capabilities: ["Natural language alerts", "Behavioral analytics", "Hardware agnostic", "Zero rip-and-replace"],
  },
  {
    id: "deepsenseiq",
    name: "DeepSenseIQ",
    tagline: "Continuous Intelligence Engine",
    description:
      "Edge-first AI for continuous multi-sensor data ingestion. Operates fully offline and delivers evidence-based threat detection at operational scale.",
    color: "#10B981",
    border: "rgba(16,185,129,0.22)",
    bg: "rgba(16,185,129,0.05)",
    Icon: Radio,
    capabilities: ["Edge AI processing", "Offline operation", "Multi-sensor fusion", "Evidence-based alerts"],
  },
  {
    id: "careiq",
    name: "CareIQ",
    tagline: "Behavioral Safety Monitor",
    description:
      "AI monitoring purpose-built for healthcare, education, and childcare. Real-time behavioral anomaly detection with a safety-first alert workflow.",
    color: "#8B5CF6",
    border: "rgba(139,92,246,0.22)",
    bg: "rgba(139,92,246,0.05)",
    Icon: Heart,
    capabilities: ["Behavioral monitoring", "Safety timeline", "Regulatory compliant", "Privacy preserving"],
  },
  {
    id: "cyberiq",
    name: "CyberIQ",
    tagline: "Unified Threat Intelligence",
    description:
      "One AI engine ingesting logs, code, and network traffic simultaneously. Delivers risk scoring with full explainability across the entire attack surface.",
    color: "#F97316",
    border: "rgba(249,115,22,0.22)",
    bg: "rgba(249,115,22,0.05)",
    Icon: Shield,
    capabilities: ["Full-spectrum ingestion", "Risk scoring", "Explainable AI", "MITRE ATT&CK mapping"],
  },
  {
    id: "vellumguard",
    name: "VellumGuard",
    tagline: "Zero Trust Communications",
    description:
      "Node-to-node encrypted communications with verifiable trust at every layer. Built for defense, government, and healthcare data sovereignty requirements.",
    color: "#14B8A6",
    border: "rgba(20,184,166,0.22)",
    bg: "rgba(20,184,166,0.05)",
    Icon: Lock,
    capabilities: ["Zero trust architecture", "Node-to-node trust", "Encrypted transfers", "Audit trail"],
  },
  {
    id: "lexso",
    name: "LEXSO",
    tagline: "Physical Security Command",
    description:
      "The most advanced AI-powered physical security command system. Sensor fusion, deterrence, and real-time command center intelligence in a single platform.",
    color: "#10B981",
    border: "rgba(16,185,129,0.3)",
    bg: "rgba(7,21,40,0.6)",
    Icon: Building,
    capabilities: ["Sensor fusion", "Deterrence systems", "Interactive command map", "Timeline & alerts"],
  },
];

const industriesList = [
  { name: "Government", Icon: Building, desc: "Situational awareness for agencies at every level", color: "#1B6FE8" },
  { name: "Defense", Icon: Shield, desc: "Mission-critical intelligence for defense operations", color: "#10B981" },
  { name: "Healthcare", Icon: Heart, desc: "Patient safety and clinical AI across care settings", color: "#8B5CF6" },
  { name: "Education", Icon: Users, desc: "Campus safety monitoring and behavioral insights", color: "#F97316" },
  { name: "Infrastructure", Icon: Network, desc: "Protection of critical physical and digital systems", color: "#0EA5E9" },
  { name: "Commercial", Icon: Globe, desc: "Enterprise-grade intelligence at scale", color: "#14B8A6" },
  { name: "Financial", Icon: Zap, desc: "Cyber risk management and compliance automation", color: "#EAB308" },
  { name: "Manufacturing", Icon: Cpu, desc: "Operational intelligence and security for industrial systems", color: "#EC4899" },
];

const industryDetails: Record<string, {
  pain: string;
  useCases: string[];
  recommended: string[];
  workflow: string;
  metric: { value: string; label: string }[];
}> = {
  Government: {
    pain: "Agencies face exploding data volumes from siloed systems that cannot correlate signals in real time, leaving critical threats undetected.",
    useCases: ["Situational awareness command centers", "Cross-agency threat intelligence fusion", "Physical security monitoring", "Cyber incident response"],
    recommended: ["VisualIQ", "DeepSenseIQ", "CyberIQ", "LEXSO"],
    workflow: "Ingest → Correlate → Alert → Authorize",
    metric: [{ value: "47", label: "Federal Agency Deployments" }, { value: "<30s", label: "Mean Time to Alert" }],
  },
  Defense: {
    pain: "Mission-critical environments demand AI that operates fully offline, explains its reasoning, and integrates with existing hardware without rip-and-replace.",
    useCases: ["Base perimeter security", "Multi-sensor fusion at the edge", "Secure communications", "Intelligence analytics"],
    recommended: ["DeepSenseIQ", "VellumGuard", "LEXSO", "CyberIQ"],
    workflow: "Sense → Classify → Decide → Report",
    metric: [{ value: "Air-gap", label: "Deployment Capable" }, { value: "Edge", label: "Processing Model" }],
  },
  Healthcare: {
    pain: "Clinical environments need AI that improves patient safety without adding burden to already-stretched staff or creating compliance exposure.",
    useCases: ["Patient behavioral monitoring", "Elopement prevention", "Fall risk detection", "Medication compliance"],
    recommended: ["CareIQ", "VisualIQ", "VellumGuard"],
    workflow: "Monitor → Detect → Alert → Resolve",
    metric: [{ value: "HIPAA", label: "Compliant" }, { value: "62%", label: "Reduction in Incidents" }],
  },
  Education: {
    pain: "Schools need safety tools that are unobtrusive, explainable, and respect student privacy while giving administrators early warning signals.",
    useCases: ["Campus perimeter monitoring", "Threat assessment workflows", "Behavioral early warning", "Emergency response coordination"],
    recommended: ["CareIQ", "VisualIQ", "LEXSO"],
    workflow: "Observe → Assess → Notify → Respond",
    metric: [{ value: "FERPA", label: "Privacy Compliant" }, { value: "Real-time", label: "Alert Delivery" }],
  },
  Infrastructure: {
    pain: "Critical infrastructure faces increasingly complex physical-cyber attack surfaces that overwhelm human security teams operating legacy tools.",
    useCases: ["Facility perimeter intelligence", "OT network monitoring", "Anomaly detection at the edge", "Incident command workflows"],
    recommended: ["VisualIQ", "DeepSenseIQ", "CyberIQ", "LEXSO"],
    workflow: "Detect → Correlate → Prioritize → Contain",
    metric: [{ value: "NERC CIP", label: "Aligned" }, { value: "99.97%", label: "Platform Uptime" }],
  },
  Commercial: {
    pain: "Enterprise organizations struggle to translate vast security data into actionable intelligence and justify ROI to the board.",
    useCases: ["Corporate security intelligence", "Loss prevention analytics", "Insider threat detection", "Compliance monitoring"],
    recommended: ["VisualIQ", "CyberIQ", "DeepSenseIQ"],
    workflow: "Collect → Analyze → Score → Report",
    metric: [{ value: "API-first", label: "Integration Model" }, { value: "Modular", label: "Deployment" }],
  },
  Financial: {
    pain: "Financial institutions need AI that operates in regulated environments, explains every decision, and scales across complex distributed networks.",
    useCases: ["Fraud detection and risk scoring", "Insider threat monitoring", "Physical branch security", "Cyber risk management"],
    recommended: ["CyberIQ", "VellumGuard", "VisualIQ"],
    workflow: "Ingest → Score → Explain → Audit",
    metric: [{ value: "PCI-DSS", label: "Compliant" }, { value: "Full", label: "Audit Trail" }],
  },
  Manufacturing: {
    pain: "Industrial environments have massive OT/IT convergence challenges with legacy systems never designed for AI-native security or intelligence.",
    useCases: ["Operational safety monitoring", "Equipment anomaly detection", "Access control intelligence", "Supply chain integrity"],
    recommended: ["DeepSenseIQ", "VisualIQ", "CyberIQ"],
    workflow: "Sense → Detect → Alert → Dispatch",
    metric: [{ value: "ICS/SCADA", label: "Aware" }, { value: "Edge", label: "Deployment Ready" }],
  },
};

// ─── SHARED COMPONENTS ─────────────────────────────────────────────────────

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children, dark = true }: { children: ReactNode; dark?: boolean }) {
  return (
    <div
      className={`inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase mb-4 ${dark ? "text-[#10B981]" : "text-[#059669]"}`}
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      <span className="w-5 h-px bg-current opacity-60" />
      {children}
      <span className="w-5 h-px bg-current opacity-60" />
    </div>
  );
}

function SharedFooter({ onNavigate }: { onNavigate: (p: Page | string) => void }) {
  return (
    <footer className="bg-[#030A14] border-t border-white/[0.05] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          <div className="col-span-2">
            <button onClick={() => onNavigate("home")} className="flex items-center mb-5">
              <TroveLogo className="h-7 w-auto object-contain" />
            </button>
            <p className="text-white/42 text-sm leading-relaxed max-w-xs">
              Human-centered AI for safety, security, and critical decisions. Built for the environments where failure is not an option.
            </p>
          </div>
          {[
            { title: "Products", links: ["VisualIQ", "DeepSenseIQ", "CareIQ", "CyberIQ", "VellumGuard", "LEXSO"] },
            { title: "Company", links: ["About", "Careers", "Partners", "Press", "Contact"] },
            { title: "Resources", links: ["Documentation", "Blog", "Whitepapers", "Case Studies", "Security"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-white/40 text-[10px] font-semibold tracking-[0.2em] uppercase mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => {
                        if (link === "About") onNavigate("about");
                        else if (link === "Partners") onNavigate("partners");
                        else if (link === "Contact") onNavigate("contact");
                        else if (link === "Blog") onNavigate("blog");
                      }}
                      className="text-white/42 hover:text-white/70 text-sm transition-colors text-left"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/[0.05] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/38 text-xs">© 2025 Trove-AI, Inc. All rights reserved.</p>
          <div className="flex gap-6 items-center">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((link) => (
              <button key={link} className="text-white/38 hover:text-white/40 text-xs transition-colors">{link}</button>
            ))}
            <button
              onClick={() => onNavigate("admin")}
              className="text-white/25 hover:text-white/50 text-xs transition-colors"
            >
              Admin
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── DATA FLOW VISUALIZATION ───────────────────────────────────────────────

function DataFlowViz() {
  const inputs = [
    { id: "cam", label: "Camera Feeds", y: 68 },
    { id: "doc", label: "Documents", y: 148 },
    { id: "sen", label: "Sensor Data", y: 228 },
    { id: "net", label: "Network Logs", y: 308 },
  ];
  const outputs = [
    { id: "v", label: "VisualIQ", y: 62, color: "#0EA5E9" },
    { id: "d", label: "DeepSenseIQ", y: 122, color: "#10B981" },
    { id: "c", label: "CareIQ", y: 182, color: "#8B5CF6" },
    { id: "cy", label: "CyberIQ", y: 242, color: "#F97316" },
    { id: "vg", label: "VellumGuard", y: 302, color: "#14B8A6" },
    { id: "l", label: "LEXSO", y: 354, color: "#10B981" },
  ];
  const cx = 274, cy = 210;

  return (
    <svg viewBox="0 0 558 412" className="w-full h-full" style={{ overflow: "visible" }}>
      <defs>
        <radialGradient id="engGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1B6FE8" stopOpacity="0.45" />
          <stop offset="70%" stopColor="#1B6FE8" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#1B6FE8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="emeraldGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
        </radialGradient>
        <filter id="dotGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="labelGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Ambient glows */}
      <circle cx={cx} cy={cy} r="100" fill="url(#engGlow)" />
      <circle cx={cx} cy={cy} r="70" fill="url(#emeraldGlow)" />

      {/* Input paths */}
      {inputs.map((inp, i) => {
        const d = `M 92,${inp.y} C 175,${inp.y} 195,${cy} ${cx - 42},${cy}`;
        return (
          <g key={inp.id}>
            <path d={d} stroke="rgba(27,111,232,0.18)" strokeWidth="1.5" fill="none" id={`ip${i}`} />
            {[0, 1, 2].map((k) => (
              <circle key={k} r="2.8" fill="#3B8BF2" filter="url(#dotGlow)">
                <animateMotion
                  dur={`${3.0 + i * 0.25}s`}
                  repeatCount="indefinite"
                  begin={`${k * 0.95 + i * 0.18}s`}
                >
                  <mpath href={`#ip${i}`} />
                </animateMotion>
                <animate
                  attributeName="opacity"
                  values="0;0.9;0.9;0"
                  keyTimes="0;0.08;0.85;1"
                  dur={`${3.0 + i * 0.25}s`}
                  repeatCount="indefinite"
                  begin={`${k * 0.95 + i * 0.18}s`}
                />
              </circle>
            ))}
          </g>
        );
      })}

      {/* Output paths */}
      {outputs.map((out, i) => {
        const d = `M ${cx + 42},${cy} C ${cx + 96},${cy} ${cx + 108},${out.y} 462,${out.y}`;
        return (
          <g key={out.id}>
            <path d={d} stroke={`${out.color}28`} strokeWidth="1.5" fill="none" id={`op${i}`} />
            {[0, 1].map((k) => (
              <circle key={k} r="2.5" fill={out.color} filter="url(#dotGlow)">
                <animateMotion
                  dur={`${2.3 + i * 0.14}s`}
                  repeatCount="indefinite"
                  begin={`${k * 1.15 + i * 0.12}s`}
                >
                  <mpath href={`#op${i}`} />
                </animateMotion>
                <animate
                  attributeName="opacity"
                  values="0;0.95;0.95;0"
                  keyTimes="0;0.08;0.82;1"
                  dur={`${2.3 + i * 0.14}s`}
                  repeatCount="indefinite"
                  begin={`${k * 1.15 + i * 0.12}s`}
                />
              </circle>
            ))}
          </g>
        );
      })}

      {/* Input node boxes */}
      {inputs.map((inp) => (
        <g key={inp.id}>
          <rect x="8" y={inp.y - 16} width="82" height="32" rx="7" fill="rgba(7,21,40,0.92)" stroke="rgba(27,111,232,0.28)" strokeWidth="1" />
          <text x="49" y={inp.y + 5} textAnchor="middle" fill="#6B88A8" fontSize="8.5" fontFamily="Inter, sans-serif">
            {inp.label}
          </text>
        </g>
      ))}

      {/* Engine outer pulse ring */}
      <circle cx={cx} cy={cy} r="62" fill="none" stroke="rgba(27,111,232,0.15)" strokeWidth="1">
        <animate attributeName="r" values="62;92" dur="2.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;0" dur="2.8s" repeatCount="indefinite" />
      </circle>

      {/* Engine body */}
      <circle cx={cx} cy={cy} r="58" fill="rgba(4,13,26,0.98)" stroke="rgba(27,111,232,0.55)" strokeWidth="1.8" />

      {/* Rotating ring */}
      <circle cx={cx} cy={cy} r="49" fill="none" stroke="rgba(16,185,129,0.28)" strokeWidth="1" strokeDasharray="3.5 7">
        <animateTransform attributeName="transform" type="rotate" from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`} dur="22s" repeatCount="indefinite" />
      </circle>

      {/* Engine inner content */}
      <text x={cx} y={cy - 10} textAnchor="middle" fill="#E8F0FF" fontSize="11.5" fontWeight="600" fontFamily="Space Grotesk, sans-serif" filter="url(#labelGlow)">
        DeepSense
      </text>
      <text x={cx} y={cy + 6} textAnchor="middle" fill="#4A6480" fontSize="7.5" fontFamily="Inter, sans-serif" letterSpacing="0.14em">
        AI ENGINE
      </text>
      <text x={cx} y={cy + 22} textAnchor="middle" fill="#10B981" fontSize="8.5" fontFamily="JetBrains Mono, monospace">
        ● ACTIVE
      </text>

      {/* Output node boxes */}
      {outputs.map((out) => (
        <g key={out.id}>
          <rect x="464" y={out.y - 14} width="88" height="28" rx="6" fill="rgba(7,21,40,0.92)" stroke={`${out.color}28`} strokeWidth="1" />
          <circle cx="476" cy={out.y} r="3.5" fill={out.color} opacity="0.88" />
          <text x="486" y={out.y + 4.5} fill="#C8D8F0" fontSize="8.8" fontFamily="Space Grotesk, sans-serif" fontWeight="500">
            {out.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

// ─── NAVIGATION ────────────────────────────────────────────────────────────

function Nav({ currentPage, onNavigate }: { currentPage: Page; onNavigate: (p: Page) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navLinks: { label: string; page?: Page; hasMega?: boolean; hasSub?: boolean }[] = [
    { label: "Solutions", hasMega: true },
    { label: "Industries", page: "industries" },
    { label: "About", page: "about" },
    { label: "Resources", page: "resources", hasSub: true },
    { label: "Partners", page: "partners" },
  ];

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#040D1A]/88 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_1px_0_rgba(27,111,232,0.1)]"
          : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => onNavigate("home")} className="flex items-center flex-shrink-0">
          <TroveLogo className="h-8 w-auto object-contain" />
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => { if (link.hasMega) setMegaOpen(true); if (link.hasSub) setSubOpen(true); }}
              onMouseLeave={() => { if (link.hasMega) setMegaOpen(false); if (link.hasSub) setSubOpen(false); }}
            >
              <button
                onClick={() => { link.page && onNavigate(link.page); }}
                aria-current={link.page && (currentPage === link.page || (link.hasSub && (currentPage === "blog" || currentPage === "blog-composer" || (typeof currentPage === "string" && currentPage.startsWith("article-"))))) ? "page" : undefined}
                aria-expanded={link.hasMega ? megaOpen : link.hasSub ? subOpen : undefined}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  link.page && (currentPage === link.page || (link.hasSub && (currentPage === "blog" || currentPage === "blog-composer" || (typeof currentPage === "string" && currentPage.startsWith("article-")))))
                    ? "text-white bg-white/[0.08]"
                    : "text-white/55 hover:text-white hover:bg-white/[0.05]"
                }`}
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {link.label}
                {(link.hasMega || link.hasSub) && (
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${(link.hasMega && megaOpen) || (link.hasSub && subOpen) ? "rotate-180" : ""}`} />
                )}
              </button>

              {/* Resources sub-menu — pt-1 bridges the hover gap so the menu doesn't close on mouse transit */}
              {link.hasSub && subOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-1 z-50">
                  <div className="w-60 bg-[#071528] border border-white/[0.10] rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                    {([
                      { label: "Resources & Insights", page: "resources" as Page, desc: "Comparison guides & FAQ", active: currentPage === "resources" },
                      { label: "Blog", page: "blog" as Page, desc: "Monthly articles: Insights index", active: currentPage === "blog" },
                    ] as { label: string; page: Page; desc: string; active: boolean }[]).map((item, i) => (
                      <button
                        key={item.page}
                        onClick={() => { onNavigate(item.page); setSubOpen(false); }}
                        className={`w-full flex items-start gap-3 px-4 py-4 text-left transition-colors ${i < 1 ? "border-b border-white/[0.06]" : ""} ${item.active ? "bg-white/[0.06]" : "hover:bg-white/[0.05]"}`}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${item.active ? "bg-[#10B981]" : "bg-white/20"}`} />
                        <div>
                          <span className={`block text-sm font-semibold ${item.active ? "text-[#10B981]" : "text-white/85"}`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.label}</span>
                          <span className="block text-[11px] text-white/42 mt-0.5 leading-snug" style={{ fontFamily: "Inter, sans-serif" }}>{item.desc}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Mega Menu */}
              {/* pt-2 wrapper fills the gap so mouse transit doesn't dismiss the menu */}
              {link.hasMega && megaOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50">
                  <div className="w-[700px] max-w-[calc(100vw-2rem)] bg-[#071528] border border-white/[0.09] rounded-2xl p-6 shadow-[0_24px_80px_rgba(0,0,0,0.7)]">
                    <div className="mb-4 pb-3 border-b border-white/[0.06]">
                      <p className="text-[10px] font-semibold tracking-[0.18em] text-white/42 uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        DeepSense-Powered Products
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {products.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => { onNavigate(product.id as Page); setMegaOpen(false); }}
                          className="flex items-start gap-3 p-4 rounded-xl hover:bg-white/[0.06] active:bg-white/[0.1] transition-colors text-left group cursor-pointer"
                        >
                          <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ background: `${product.color}18` }}
                          >
                            <product.Icon className="w-4 h-4" style={{ color: product.color }} />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                              {product.name}
                            </div>
                            <div className="text-[11px] text-white/35 mt-0.5 leading-snug">{product.tagline}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                      <button
                        onClick={() => { onNavigate("solutions"); setMegaOpen(false); }}
                        className="flex items-center gap-2 text-xs font-medium text-[#10B981] hover:gap-3 transition-all"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        Full platform overview <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-[11px] text-white/42">All products powered by DeepSense</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-2">
          <button className="text-sm text-white/50 hover:text-white transition-colors px-3 py-2 font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Sign In
          </button>
          <button
            onClick={() => openContact(onNavigate, { reason: "Request Demo" })}
            className="relative overflow-hidden text-sm font-semibold bg-[#1B6FE8] hover:bg-[#2B7FF8] text-white px-4 py-2 rounded-lg transition-all group"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <span className="relative z-10">Request Demo</span>
            <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500" />
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white/60 hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#071528]/98 backdrop-blur-xl border-t border-white/[0.06] px-6 py-4">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <div key={link.label}>
                <button
                  onClick={() => { link.page && onNavigate(link.page); setMenuOpen(false); }}
                  className={`w-full px-3 py-3 text-sm hover:text-white hover:bg-white/[0.05] rounded-xl transition-colors text-left font-medium ${link.page && (currentPage === link.page) ? "text-white bg-white/[0.06]" : "text-white/60"}`}
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {link.hasSub ? "Resources & Insights" : link.label}
                </button>
                {link.hasSub && (
                  <button
                    onClick={() => { onNavigate("blog"); setMenuOpen(false); }}
                    className={`w-full px-3 py-2.5 text-sm hover:text-white hover:bg-white/[0.05] rounded-xl transition-colors text-left font-medium pl-7 ${currentPage === "blog" ? "text-[#10B981]" : "text-white/45"}`}
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    ↳ Blog
                  </button>
                )}
              </div>
            ))}
            <div className="mt-3 pt-3 border-t border-white/[0.06]">
              <button
                onClick={() => { openContact(onNavigate, { reason: "Request Demo" }); setMenuOpen(false); }}
                className="w-full bg-[#1B6FE8] text-white text-sm font-semibold py-3 rounded-xl"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Request Demo
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── ANIMATED DASHBOARD MOCKUP ─────────────────────────────────────────────

function DashboardMockup() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2200);
    return () => clearInterval(id);
  }, []);

  const alerts = [
    { time: "09:42:11", level: "HIGH", msg: "Perimeter breach, Gate 4C", color: "#EF4444", product: "LEXSO" },
    { time: "09:41:03", level: "MED", msg: "Unusual network traffic pattern", color: "#F97316", product: "CyberIQ" },
    { time: "09:39:55", level: "LOW", msg: "Camera offline, Building B2", color: "#EAB308", product: "VisualIQ" },
    { time: "09:38:22", level: "HIGH", msg: "Behavioral anomaly detected", color: "#EF4444", product: "CareIQ" },
  ];

  const metrics = [
    { label: "Active Sensors", value: "1,247", delta: "+3" },
    { label: "Threats Blocked", value: "8,402", delta: "+12" },
    { label: "System Health", value: "99.97%", delta: "" },
  ];

  const barHeights = [40, 65, 50, 80, 55, 70, 45, 90, 60, 75, 85, 50];

  return (
    <div className="bg-[#071528] rounded-2xl border border-white/[0.08] overflow-hidden shadow-2xl">
      {/* Titlebar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-[#040D1A]/60">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          <span className="ml-2 text-[11px] text-white/42" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            DeepSense Command: Live
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
          <span className="text-[10px] text-[#10B981]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>OPERATIONAL</span>
        </div>
      </div>

      {/* Metrics row */}
      <div className="grid grid-cols-3 border-b border-white/[0.06]">
        {metrics.map((m) => (
          <div key={m.label} className="px-4 py-3 border-r border-white/[0.06] last:border-r-0">
            <div className="text-[10px] text-white/35 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{m.label}</div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{m.value}</span>
              {m.delta && <span className="text-[10px] text-[#10B981]">{m.delta}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Chart + Alerts */}
      <div className="grid grid-cols-2 gap-0 divide-x divide-white/[0.05]">
        {/* Mini bar chart */}
        <div className="px-4 py-4">
          <div className="text-[10px] text-white/42 mb-3 tracking-wider uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Threat Activity, 24h
          </div>
          <div className="flex items-end gap-1 h-16">
            {barHeights.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm transition-all duration-700"
                style={{
                  height: `${i === (tick % barHeights.length) ? Math.min(h + 20, 100) : h}%`,
                  background: i === (tick % barHeights.length)
                    ? "rgba(27,111,232,0.8)"
                    : "rgba(27,111,232,0.25)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Alert feed */}
        <div className="px-4 py-4">
          <div className="text-[10px] text-white/42 mb-3 tracking-wider uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Live Alerts
          </div>
          <div className="space-y-2">
            {alerts.slice(0, 3).map((alert, i) => (
              <div key={i} className="flex items-start gap-2">
                <span
                  className="text-[8px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5"
                  style={{ background: `${alert.color}20`, color: alert.color, fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {alert.level}
                </span>
                <div>
                  <div className="text-[10px] text-white/60 leading-tight">{alert.msg}</div>
                  <div className="text-[9px] text-white/42 mt-0.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {alert.time} · {alert.product}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── HOME PAGE ──────────────────────────────────────────────────────────────

function HomePage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <div>
      {/* ── HERO ── */}
      <section className="min-h-screen bg-[#040D1A] flex items-center pt-16 relative overflow-hidden">
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        {/* Ambient orbs */}
        <div className="absolute top-1/3 left-[15%] w-[500px] h-[500px] bg-[#1B6FE8] opacity-[0.055] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-[10%] w-[400px] h-[400px] bg-[#10B981] opacity-[0.04] rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 w-full py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 items-center">
            {/* Left */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="inline-flex items-center gap-2 bg-[#10B981]/[0.1] border border-[#10B981]/25 rounded-full px-3.5 py-1.5 mb-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                  <span className="text-[11px] font-semibold text-[#10B981] tracking-wider uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Enterprise AI Platform
                  </span>
                </div>
                <h1
                  className="text-5xl md:text-[3.6rem] lg:text-[4rem] font-bold text-white leading-[1.06] tracking-[-0.02em]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Intelligently Protecting<br />
                  <span className="text-[#10B981]">Our Future</span>
                </h1>
                <p className="mt-6 text-[1.05rem] text-white/45 leading-relaxed max-w-lg" style={{ fontFamily: "Inter, sans-serif" }}>
                  Trove-AI builds human-centric AI software for safety, security, and critical decisions. Our solutions protect people across government, commercial, and care environments through one unified platform.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    onClick={() => onNavigate("solutions")}
                    className="relative overflow-hidden flex items-center gap-2 bg-[#1B6FE8] hover:bg-[#2B7FF8] text-white font-semibold px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5 text-sm shadow-lg shadow-[#1B6FE8]/25 group"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    <span className="relative z-10 flex items-center gap-2">Explore Solutions <ArrowRight className="w-4 h-4" /></span>
                    <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500" />
                  </button>
                  <button
                    onClick={() => onNavigate("industries")}
                    className="flex items-center gap-2 border border-white/[0.14] hover:border-white/25 text-white/60 hover:text-white font-semibold px-6 py-3 rounded-xl transition-all text-sm"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Industries
                  </button>
                </div>

              </motion.div>
            </div>

            {/* Right: Data flow viz */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="h-[420px] hidden lg:block"
            >
              <DataFlowViz />
            </motion.div>
          </div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="flex justify-center mt-20"
          >
            <div className="flex flex-col items-center gap-2.5 text-white/40 text-[11px]" style={{ fontFamily: "Inter, sans-serif" }}>
              <span>Scroll to explore</span>
              <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── NITROGEN PLATFORM ── */}
      <section className="bg-[#F5F7FB] py-32">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-14">
              <SectionLabel dark={false}>The Platform</SectionLabel>
              <h2
                className="text-4xl md:text-5xl font-bold text-[#040D1A] mt-2"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Every product runs on <span className="text-[#1B6FE8]">DeepSense AI Engine</span>
              </h2>
              <p className="mt-4 text-[#718096] text-lg max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                A proprietary AI engine built from the ground up for enterprise reliability, handling multi-modal ingestion, real-time inference, and explainable reasoning at scale.
              </p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            {/* Architecture code block */}
            <FadeUp delay={0.1} className="h-full">
              <div
                className="bg-[#040D1A] rounded-2xl border border-white/[0.07] overflow-hidden shadow-2xl h-full"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.02]">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                    <span className="ml-2 text-white/42 text-[11px]">nitrogen.arch</span>
                  </div>
                  <span className="text-[10px] text-[#10B981]">LIVE</span>
                </div>
                <div className="p-5 space-y-1 text-[12px]">
                  <div className="text-[#4A6480]"># DeepSense Architecture: Unified AI Runtime</div>
                  <div className="h-px bg-white/[0.06] my-3" />
                  {[
                    {
                      layer: "INGESTION LAYER",
                      items: ["multi-modal intake (video, audio, network, file)", "edge preprocessing, 12ms target latency", "schema normalization → internal IR"],
                      color: "#0EA5E9",
                    },
                    {
                      layer: "INFERENCE LAYER",
                      items: ["real-time ML pipeline, ensemble models", "confidence scoring with uncertainty bounds", "continuous ingest, no batch dependency"],
                      color: "#10B981",
                    },
                    {
                      layer: "REASONING LAYER",
                      items: ["causal graph analysis", "cross-product threat correlation", "explainability engine, human-readable output"],
                      color: "#8B5CF6",
                    },
                    {
                      layer: "OUTPUT LAYER",
                      items: ["natural language alerts → operator display", "structured events → SIEM / SOAR integration", "API-first: REST, gRPC, WebSocket"],
                      color: "#F97316",
                    },
                  ].map((block) => (
                    <div key={block.layer} className="mt-3">
                      <div className="text-[11px] font-medium" style={{ color: block.color }}>
                        ── {block.layer} ───────────────────────────
                      </div>
                      {block.items.map((item) => (
                        <div key={item} className="text-[11px] text-white/35 pl-4 py-[3px]">
                          • {item}
                        </div>
                      ))}
                    </div>
                  ))}
                  <div className="h-px bg-white/[0.06] my-3" />
                  <div className="flex items-center gap-2 text-[#10B981] text-[11px]">
                    <span>✓</span>
                    <span>All six products share one runtime, with zero context fragmentation</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#10B981] text-[11px]">
                    <span>✓</span>
                    <span>Air-gap deployable. No external dependencies required</span>
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* Stats + dashboard */}
            <div className="space-y-6">
              <FadeUp delay={0.15}>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Inference Latency", value: "<50ms", sub: "p99 production" },
                    { label: "Platform Uptime", value: "99.97%", sub: "12-month SLA" },
                    { label: "Deployment", value: "Air-Gap", sub: "capable" },
                    { label: "Data Modes", value: "Multi-Modal", sub: "video · sensor · network · doc" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white rounded-xl p-4 border border-[#E2E8F0] shadow-sm flex flex-col justify-between">
                      <div className="text-[11px] text-[#6B7280] mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{stat.label}</div>
                      <div className="text-xl font-bold text-[#040D1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{stat.value}</div>
                      <div className="text-[10px] text-[#9CA3AF] mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>{stat.sub}</div>
                    </div>
                  ))}
                </div>
              </FadeUp>
              <FadeUp delay={0.22}>
                <DashboardMockup />
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section className="bg-[#040D1A] py-32">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-16">
              <SectionLabel>Products</SectionLabel>
              <h2
                className="text-4xl md:text-5xl font-bold text-white mt-2"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Six products. One platform.
              </h2>
              <p className="mt-4 text-white/40 text-lg max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                Purpose-built for each domain, yet fully integrated, sharing data, context, and intelligence across your entire operation.
              </p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product, i) => (
              <FadeUp key={product.id} delay={i * 0.07}>
                <div
                  className="group relative rounded-2xl p-6 border cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
                  style={{
                    background: product.bg,
                    borderColor: product.border,
                  }}
                  onClick={() => onNavigate("solutions")}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: `${product.color}18` }}
                  >
                    <product.Icon className="w-5 h-5" style={{ color: product.color }} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {product.name}
                  </h3>
                  <div className="text-xs font-semibold mb-3 tracking-wide" style={{ color: product.color, fontFamily: "'Space Grotesk', sans-serif" }}>
                    {product.tagline}
                  </div>
                  <p className="text-sm text-white/38 leading-relaxed mb-5" style={{ fontFamily: "Inter, sans-serif" }}>
                    {product.description}
                  </p>
                  <div className="space-y-1.5 mb-5">
                    {product.capabilities.slice(0, 3).map((cap) => (
                      <div key={cap} className="flex items-center gap-2 text-xs text-white/35" style={{ fontFamily: "Inter, sans-serif" }}>
                        <Check className="w-3 h-3 flex-shrink-0" style={{ color: product.color, opacity: 0.7 }} />
                        {cap}
                      </div>
                    ))}
                  </div>
                  <div
                    className="flex items-center gap-1.5 text-xs font-semibold group-hover:gap-3 transition-all duration-300"
                    style={{ color: product.color, fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                  {/* Subtle glow on hover */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ boxShadow: `inset 0 0 0 1px ${product.color}40` }}
                  />
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-[#F0F4FA] py-32">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-16">
              <SectionLabel dark={false}>How It Works</SectionLabel>
              <h2 className="text-4xl font-bold text-[#040D1A] mt-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Intelligence that connects the dots
              </h2>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
            {[
              { n: "01", title: "Ingest", desc: "DeepSense accepts any data type: video, documents, network logs, and sensor streams simultaneously.", Icon: Layers },
              { n: "02", title: "Analyze", desc: "Real-time ML pipeline processes data in under 50ms, correlating signals across all active products.", Icon: Activity },
              { n: "03", title: "Reason", desc: "Explainability engine surfaces context-aware intelligence: not just alerts, but evidence and reasoning.", Icon: Brain },
              { n: "04", title: "Act", desc: "Natural language outputs route to the right operator, system, or automated response workflow instantly.", Icon: Zap },
            ].map((step, i) => (
              <FadeUp key={step.n} delay={i * 0.1}>
                <div className="relative p-8 border-r border-[#D1DBE8] last:border-r-0 group hover:bg-white transition-colors duration-300">
                  <div className="text-[11px] font-bold text-[#1B6FE8] mb-4 tracking-widest" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{step.n}</div>
                  <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] flex items-center justify-center mb-4 group-hover:bg-[#1B6FE8]/10 transition-colors">
                    <step.Icon className="w-5 h-5 text-[#1B6FE8]" />
                  </div>
                  <h3 className="font-bold text-[#040D1A] mb-2 text-lg" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{step.title}</h3>
                  <p className="text-sm text-[#718096] leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{step.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="bg-white py-32">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 items-start">
              <div>
                <SectionLabel dark={false}>Industries</SectionLabel>
                <h2 className="text-4xl font-bold text-[#040D1A] leading-tight mt-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Built for the most demanding environments
                </h2>
                <p className="mt-4 text-[#718096] leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                  From federal agencies to rural healthcare providers, Trove deploys where it matters most, under conditions where failure is not an option.
                </p>
                <button
                  onClick={() => onNavigate("industries")}
                  className="mt-8 flex items-center gap-2 text-sm font-semibold text-[#1B6FE8] hover:gap-3 transition-all"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  View all industries <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {industriesList.slice(0, 4).map((ind, i) => (
                  <FadeUp key={ind.name} delay={0.08 * i} className="h-full">
                    <div
                      className="group p-5 rounded-2xl border border-[#E8EDF4] hover:border-[#10B981]/40 hover:bg-[#10B981]/[0.04] hover:shadow-[0_8px_30px_rgba(16,185,129,0.12)] transition-all cursor-pointer h-full"
                      onClick={() => onNavigate("industries")}
                    >
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center mb-3.5"
                        style={{ background: `${ind.color}12` }}
                      >
                        <ind.Icon className="w-4.5 h-4.5" style={{ color: ind.color, width: 18, height: 18 }} />
                      </div>
                      <h3 className="font-bold text-[#040D1A] group-hover:text-[#059669] transition-colors mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{ind.name}</h3>
                      <p className="text-sm text-[#718096] leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{ind.desc}</p>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── PARTNERS ── */}
      <section className="bg-[#F5F7FB] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-8">
              <p className="text-[10px] font-semibold tracking-[0.22em] text-[#6B7280] uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Trusted Technology Partners
              </p>
            </div>
            <div className="flex items-center justify-center gap-14 flex-wrap">
              {["Constellis", "QumulusAI", "LomaHipe"].map((partner) => (
                <div key={partner} className="text-[22px] font-bold text-[#9CA3AF] hover:text-[#6B7280] transition-colors cursor-pointer tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {partner}
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#040D1A] py-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1B6FE8]/[0.08] via-transparent to-[#10B981]/[0.08] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-[#1B6FE8]/30 to-transparent" />
        <div className="max-w-3xl mx-auto px-6 text-center relative">
          <FadeUp>
            <SectionLabel>Get Started</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-2 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Ready to deploy<br />
              <span className="text-[#10B981]">intelligence?</span>
            </h2>
            <p className="mt-5 text-white/38 text-lg leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
              Our team works directly with you to ensure a successful implementation, from initial deployment through full operational capability.
            </p>
            <div className="mt-9 flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => openContact(onNavigate, { reason: "Request Demo" })}
                className="relative overflow-hidden flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white font-semibold px-8 py-3.5 rounded-xl transition-all hover:-translate-y-0.5 text-sm shadow-lg shadow-[#10B981]/20 group"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <span className="relative z-10 flex items-center gap-2">Request a Demo <ArrowRight className="w-4 h-4" /></span>
                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500" />
              </button>
              <button
                onClick={() => openContact(onNavigate, { reason: "General Inquiry" })}
                className="flex items-center gap-2 border border-white/[0.13] hover:border-white/25 text-white/55 hover:text-white font-semibold px-8 py-3.5 rounded-xl transition-all text-sm"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Contact Sales
              </button>
            </div>
          </FadeUp>
        </div>
      </section>

      <SharedFooter onNavigate={onNavigate} />
    </div>
  );
}

// ─── SOLUTIONS PAGE ─────────────────────────────────────────────────────────

function SolutionsPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [activeId, setActiveId] = useState("visualiq");
  const selected = products.find((p) => p.id === activeId)!;

  // Hexagonal arrangement around center
  const cx = 220, cy = 200, r = 148;
  const centerRadius = 44;
  const nodeRadius = 32;
  const angles = [-90, -30, 30, 90, 150, 210];
  const nodes = products.map((p, i) => {
    const angle = (angles[i] * Math.PI) / 180;
    const nx = cx + r * Math.cos(angle);
    const ny = cy + r * Math.sin(angle);
    const dx = nx - cx;
    const dy = ny - cy;
    const dist = Math.hypot(dx, dy);
    const ux = dx / dist;
    const uy = dy / dist;
    return {
      ...p,
      nx,
      ny,
      // Line endpoints sit on each circle's edge, not through the centers
      x1: cx + ux * centerRadius,
      y1: cy + uy * centerRadius,
      x2: nx - ux * nodeRadius,
      y2: ny - uy * nodeRadius,
    };
  });

  return (
    <div className="min-h-screen bg-[#040D1A] pt-16">
      {/* Hero */}
      <section className="py-24 border-b border-white/[0.05] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1B6FE8]/[0.04] to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <SectionLabel>Platform Overview</SectionLabel>
            <h1 className="text-5xl md:text-6xl font-bold text-white mt-2 leading-[1.06] tracking-tight max-w-3xl" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              One engine.<br />
              Six products.<br />
              <span className="text-[#10B981]">Infinite coverage.</span>
            </h1>
            <p className="mt-6 text-white/40 text-lg max-w-xl leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
              Every Trove product is purpose-built for its domain, yet interconnected through DeepSense, sharing context and intelligence across your entire operation without any integration overhead.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Interactive Ecosystem */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[440px_1fr] gap-14 items-center">
            {/* SVG Diagram */}
            <FadeUp>
              <div className="relative">
                <svg viewBox="0 0 440 400" className="w-full">
                  <defs>
                    <radialGradient id="cGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#1B6FE8" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#1B6FE8" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <circle cx={cx} cy={cy} r="115" fill="url(#cGrad)" />

                  {/* Connection lines — clipped to circle edges */}
                  {nodes.map((node) => (
                    <line
                      key={node.id}
                      x1={node.x1} y1={node.y1}
                      x2={node.x2} y2={node.y2}
                      stroke={node.id === activeId ? node.color : "rgba(255,255,255,0.07)"}
                      strokeWidth={node.id === activeId ? "1.8" : "1"}
                      strokeDasharray={node.id === activeId ? "none" : "3 6"}
                    />
                  ))}

                  {/* Center DeepSense node */}
                  <circle cx={cx} cy={cy} r="44" fill="rgba(4,13,26,0.98)" stroke="rgba(27,111,232,0.6)" strokeWidth="2" />
                  <circle cx={cx} cy={cy} r="37" fill="none" stroke="rgba(16,185,129,0.25)" strokeWidth="1" strokeDasharray="3 6">
                    <animateTransform attributeName="transform" type="rotate" from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`} dur="20s" repeatCount="indefinite" />
                  </circle>
                  <text x={cx} y={cy - 6} textAnchor="middle" fill="#E8F0FF" fontSize="10.5" fontWeight="600" fontFamily="Space Grotesk, sans-serif">DeepSense</text>
                  <text x={cx} y={cy + 8} textAnchor="middle" fill="#4A6480" fontSize="7" fontFamily="Inter, sans-serif" letterSpacing="0.12em">AI ENGINE</text>

                  {/* Product nodes */}
                  {nodes.map((node) => {
                    const isActive = node.id === activeId;
                    return (
                      <g key={node.id} onClick={() => setActiveId(node.id)} className="cursor-pointer" style={{ userSelect: "none" }}>
                        <circle
                          cx={node.nx}
                          cy={node.ny}
                          r="32"
                          fill={isActive ? `${node.color}18` : "rgba(7,21,40,0.95)"}
                          stroke={isActive ? node.color : "rgba(255,255,255,0.09)"}
                          strokeWidth={isActive ? "2" : "1"}
                          style={{ transition: "all 0.25s ease" }}
                        />
                        {isActive && (
                          <circle cx={node.nx} cy={node.ny} r="36" fill="none" stroke={node.color} strokeWidth="1" opacity="0.2">
                            <animate attributeName="r" values="32;42;32" dur="2s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
                          </circle>
                        )}
                        <text
                          x={node.nx}
                          y={node.ny + 3}
                          textAnchor="middle"
                          fill={isActive ? "#fff" : "#6B88A8"}
                          fontSize="8"
                          fontWeight="600"
                          fontFamily="Space Grotesk, sans-serif"
                          style={{ transition: "all 0.25s ease" }}
                        >
                          {node.name}
                        </text>
                      </g>
                    );
                  })}
                </svg>
                <p className="text-center text-[11px] text-white/42 mt-2" style={{ fontFamily: "Inter, sans-serif" }}>Click any product node to explore</p>
              </div>
            </FadeUp>

            {/* Product detail panel */}
            <FadeUp delay={0.1}>
              <div
                className="rounded-2xl p-8 border transition-all duration-300"
                style={{ background: selected.bg, borderColor: selected.border }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ background: `${selected.color}20` }}
                  >
                    <selected.Icon className="w-6 h-6" style={{ color: selected.color }} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{selected.name}</h3>
                    <div className="text-sm font-semibold mt-0.5" style={{ color: selected.color, fontFamily: "'Space Grotesk', sans-serif" }}>
                      {selected.tagline}
                    </div>
                  </div>
                </div>

                <p className="text-white/48 leading-relaxed mb-6" style={{ fontFamily: "Inter, sans-serif" }}>{selected.description}</p>

                <div className="mb-6">
                  <div className="text-[10px] font-semibold tracking-[0.18em] text-white/42 uppercase mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Key Capabilities
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    {selected.capabilities.map((cap) => (
                      <div key={cap} className="flex items-center gap-2 text-sm text-white/48" style={{ fontFamily: "Inter, sans-serif" }}>
                        <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: selected.color }} />
                        {cap}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => onNavigate(selected.id as Page)}
                    className="flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl transition-all hover:-translate-y-0.5"
                    style={{ background: `${selected.color}18`, color: selected.color, fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Full Capabilities <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => openContact(onNavigate, { reason: "Request Demo", message: `I'd like a demo of ${selected.name}.` })}
                    className="text-sm font-semibold px-5 py-2.5 rounded-xl transition-all border border-white/[0.1] text-white/40 hover:text-white hover:border-white/20"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Request Demo
                  </button>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* All products grid */}
      <section className="py-20 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <h2 className="text-3xl font-bold text-white mb-10" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              All Products
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product, i) => (
              <FadeUp key={product.id} delay={i * 0.07}>
                <div
                  className="p-6 rounded-2xl border cursor-pointer hover:-translate-y-1 transition-all duration-300 group"
                  style={{ background: product.bg, borderColor: product.border }}
                  onClick={() => setActiveId(product.id)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: `${product.color}18` }}
                    >
                      <product.Icon style={{ color: product.color, width: 18, height: 18 }} />
                    </div>
                    <span className="text-[10px] text-white/42" style={{ fontFamily: "'JetBrains Mono', monospace" }}>DeepSense</span>
                  </div>
                  <h3 className="font-bold text-white mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{product.name}</h3>
                  <p className="text-sm text-white/38 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{product.tagline}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <SharedFooter onNavigate={onNavigate} />
    </div>
  );
}

// ─── ABOUT PAGE ─────────────────────────────────────────────────────────────

function AboutPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const values = [
    {
      title: "Trust",
      subtitle: "Our foundation, earned not assumed.",
      desc: "Every system we build is designed to be auditable, explainable, and worthy of the confidence placed in it.",
      Icon: Shield,
      accent: "#1B6FE8",
    },
    {
      title: "Care",
      subtitle: "Protecting with purpose.",
      desc: "We build for the people on the other side of the screen: the vulnerable, the endangered, those who depend on us to get it right.",
      Icon: Heart,
      accent: "#10B981",
    },
    {
      title: "Human",
      subtitle: "Technology serving people.",
      desc: "AI is here to support people, not replace them. We build tools that help people make better decisions with confidence.",
      Icon: Users,
      accent: "#8B5CF6",
    },
    {
      title: "Resolve",
      subtitle: "Dedicated delivery.",
      desc: "We deliver what we promise and stand behind our work, especially in environments where reliability and accountability matter most.",
      Icon: Award,
      accent: "#F97316",
    },
  ];

  const faqs = [
    {
      q: "What is Trove-AI?",
      a: "Trove-AI is a human-centric AI software company founded in 2023, building AI systems that protect people in safety, security, and care environments. Products include CareIQ, VisualIQ, DeepSenseIQ, CyberIQ, VellumGuard, and LEXSO.",
    },
    {
      q: "Is Trove-AI the same as Trove AI (trove.ai)?",
      a: "No. Trove-AI (trove-ai.com) builds AI systems for security, safety, and care environments. Trove AI (trove.ai) is an unrelated AI platform for private equity firms.",
    },
    {
      q: "Who founded Trove-AI?",
      a: "Trove-AI was founded in 2023 by AI and machine learning engineers with experience in U.S. intelligence community applications.",
    },
    {
      q: "What is Trove-AI's mission?",
      a: "Building AI systems that people can trust to protect the lives and dignity of those who need it most.",
    },
    {
      q: "What is LEXSO?",
      a: "LEXSO is a layered extended security operations platform developed jointly by Trove-AI and Constellis for complex physical security environments.",
    },
    {
      q: "What is DeepSense?",
      a: "DeepSense is Trove-AI's proprietary core AI engine, combining synthetic data generation and multimodal AI to power the IQ product family.",
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="bg-[#040D1A] py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1B6FE8]/[0.04] to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <SectionLabel>About Trove-AI</SectionLabel>
            <h1 className="text-5xl md:text-6xl font-bold text-white mt-2 leading-[1.06] max-w-3xl" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              We built the AI<br />that protects<br /><span className="text-[#10B981]">what matters.</span>
            </h1>
            <p className="mt-6 text-white/50 text-lg max-w-2xl leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
              Trove-AI is a human-centric AI software company founded in 2023, building AI systems that protect people in safety, security, and care environments. Our products include CareIQ, VisualIQ, DeepSenseIQ, CyberIQ, VellumGuard, and LEXSO.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <FadeUp>
              <div className="bg-[#040D1A] rounded-2xl p-10 h-full border border-white/[0.06]">
                <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-[#10B981] mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  <span className="w-4 h-px bg-current" /> Mission
                </div>
                <p className="text-2xl font-semibold text-white leading-snug" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  "Building AI systems that people can trust to protect the lives and dignity of those who need it most."
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <div className="bg-[#F5F7FB] rounded-2xl p-10 h-full border border-[#E8EDF4]">
                <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-[#1B6FE8] mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  <span className="w-4 h-px bg-current" /> Vision
                </div>
                <p className="text-2xl font-semibold text-[#040D1A] leading-snug" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  "To become the enduring standard for trustworthy AI, developing people and technology to protect and empower those who are vulnerable."
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-[#040D1A] py-28">
        <div className="max-w-5xl mx-auto px-6">
          <FadeUp>
            <SectionLabel>History</SectionLabel>
            <h2 className="text-4xl font-bold text-white mt-2 mb-14" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              How we got here
            </h2>
          </FadeUp>
          <div className="space-y-0">
            {[
              { year: "2023", title: "Founded", desc: "Trove-AI founded by AI and machine learning engineers with experience in U.S. intelligence community applications." },
              { year: "2023", title: "DeepSense v1", desc: "First version of the DeepSense engine, combining synthetic data generation and multimodal AI, deployed in initial environments." },
              { year: "2023", title: "VisualIQ Launch", desc: "VisualIQ released as the first product in the IQ family, enabling camera intelligence with zero hardware replacement." },
              { year: "2024", title: "Platform Expansion", desc: "DeepSenseIQ, CareIQ, and CyberIQ added to the platform. Healthcare, education, and cyber verticals enter general availability." },
              { year: "2024", title: "LEXSO: Joint Development", desc: "LEXSO developed in partnership with Constellis as a layered extended security operations platform for complex physical security environments." },
              { year: "2024", title: "VellumGuard Launch", desc: "Platform completed with VellumGuard, delivering zero trust node-to-node encrypted communications for the most sensitive environments." },
              { year: "2025", title: "DeepSense v3: Enterprise Scale", desc: "DeepSense v3 reaches enterprise scale, powering the full IQ product family with sub-50ms inference and air-gap deployment certification." },
            ].map((item, i, arr) => (
              <FadeUp key={`${item.year}-${item.title}`} delay={i * 0.07}>
                <div className="flex gap-8 pb-10">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-[#1B6FE8] border-2 border-[#040D1A] ring-[3px] ring-[#1B6FE8]/20 flex-shrink-0 mt-1 z-10" />
                    {i < arr.length - 1 && <div className="w-px flex-1 bg-white/[0.07] mt-1" />}
                  </div>
                  <div className="pb-2">
                    <span className="text-[11px] font-medium text-[#10B981]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{item.year}</span>
                    <h3 className="font-bold text-white mt-0.5 text-lg" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.title}</h3>
                    <p className="text-white/40 text-sm mt-1 leading-relaxed max-w-lg" style={{ fontFamily: "Inter, sans-serif" }}>{item.desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative py-28 overflow-hidden" style={{ background: "#040D1A" }}>
        {/* Animated mesh gradient */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 80% 60% at 20% 50%, rgba(27,111,232,0.18) 0%, transparent 70%), radial-gradient(ellipse 60% 80% at 80% 30%, rgba(16,185,129,0.14) 0%, transparent 65%), radial-gradient(ellipse 50% 50% at 50% 80%, rgba(139,92,246,0.1) 0%, transparent 60%)",
            animation: "meshShift 12s ease-in-out infinite alternate",
          }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 70% 50% at 70% 60%, rgba(16,185,129,0.1) 0%, transparent 60%), radial-gradient(ellipse 50% 70% at 20% 20%, rgba(27,111,232,0.12) 0%, transparent 55%)",
            animation: "meshShift2 15s ease-in-out infinite alternate",
          }} />
        </div>
        <style>{`
          @keyframes meshShift {
            0%   { transform: translate(0, 0) scale(1); }
            33%  { transform: translate(3%, 2%) scale(1.04); }
            66%  { transform: translate(-2%, 3%) scale(0.97); }
            100% { transform: translate(2%, -2%) scale(1.02); }
          }
          @keyframes meshShift2 {
            0%   { transform: translate(0, 0) scale(1.05); }
            50%  { transform: translate(-4%, -3%) scale(0.96); }
            100% { transform: translate(3%, 2%) scale(1.03); }
          }
        `}</style>
        <div className="relative max-w-7xl mx-auto px-6" style={{ zIndex: 1 }}>
          <FadeUp>
            <div className="mb-14">
              <SectionLabel>Values</SectionLabel>
              <h2 className="text-4xl font-bold text-white mt-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                What guides every decision
              </h2>
            </div>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((v, i) => (
              <FadeUp key={v.title} delay={i * 0.1} className="h-full">
                <div
                  className="rounded-2xl p-7 border h-full group hover:-translate-y-1 transition-all duration-300"
                  style={{ background: `${v.accent}08`, borderColor: `${v.accent}20` }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: `${v.accent}18` }}
                  >
                    <v.Icon className="w-5 h-5" style={{ color: v.accent }} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {v.title}
                  </h3>
                  <p className="text-sm font-medium mb-3" style={{ color: v.accent, fontFamily: "'Space Grotesk', sans-serif" }}>
                    {v.subtitle}
                  </p>
                  <p className="text-sm text-white/40 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                    {v.desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F5F7FB] py-28">
        <div className="max-w-3xl mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-14">
              <SectionLabel dark={false}>FAQ</SectionLabel>
              <h2 className="text-4xl font-bold text-[#040D1A] mt-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Frequently asked questions
              </h2>
            </div>
          </FadeUp>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FadeUp key={i} delay={i * 0.06}>
                <div className="bg-white rounded-2xl border border-[#E8EDF4] overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-7 py-5 text-left group"
                  >
                    <span
                      className="font-semibold text-[#040D1A] group-hover:text-[#1B6FE8] transition-colors pr-4"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {faq.q}
                    </span>
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                      style={{
                        background: openFaq === i ? "#1B6FE8" : "#EEF2FF",
                        transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)",
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M6 2v8M2 6h8" stroke={openFaq === i ? "#fff" : "#1B6FE8"} strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    </div>
                  </button>
                  {openFaq === i && (
                    <div className="px-7 pb-6">
                      <div className="h-px bg-[#E8EDF4] mb-5" />
                      <p className="text-[#4A5568] leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              </FadeUp>
            ))}
          </div>

          {/* FAQ CTA */}
          <FadeUp delay={0.3}>
            <div className="mt-12 bg-[#040D1A] rounded-2xl p-8 text-center border border-white/[0.06]">
              <p className="text-white/50 mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
                Ready to see how Trove-AI products work together?
              </p>
              <button
                onClick={() => onNavigate("solutions")}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#10B981] hover:gap-3 transition-all"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                See the full product family <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </FadeUp>
        </div>
      </section>

      <SharedFooter onNavigate={onNavigate} />
    </div>
  );
}

// ─── INDUSTRIES PAGE ────────────────────────────────────────────────────────

function IndustriesPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [active, setActive] = useState("Government");
  const detail = industryDetails[active];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="bg-[#040D1A] py-24 border-b border-white/[0.05] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#10B981]/[0.03] to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <SectionLabel>Industries</SectionLabel>
            <h1 className="text-5xl md:text-6xl font-bold text-white mt-2 max-w-2xl leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Solutions built for every environment.
            </h1>
            <p className="mt-5 text-white/40 text-lg max-w-xl leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
              Different industries face different challenges. Trove-AI delivers AI solutions tailored to government, health and education safety, commercial security, and infrastructure operations.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Industry Explorer */}
      <section className="bg-white min-h-[600px]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr]">
            {/* Sidebar */}
            <div className="border-r border-[#E8EDF4] py-8 lg:py-12">
              {industriesList.map((ind) => (
                <button
                  key={ind.name}
                  onClick={() => setActive(ind.name)}
                  className={`w-full flex items-center gap-3 px-5 py-3.5 text-left transition-all duration-200 border-l-2 ${
                    active === ind.name
                      ? "border-l-[#1B6FE8] bg-[#F0F5FF] text-[#040D1A]"
                      : "border-l-transparent text-[#718096] hover:text-[#040D1A] hover:bg-[#F8FAFC]"
                  }`}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: active === ind.name ? `${ind.color}15` : "#F0F4F8",
                    }}
                  >
                    <ind.Icon
                      style={{
                        color: active === ind.name ? ind.color : "#A0AEC0",
                        width: 16,
                        height: 16,
                      }}
                    />
                  </div>
                  <span className="font-semibold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {ind.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Detail panel */}
            {detail && (
              <FadeUp className="py-10 lg:py-12 px-8 lg:px-10">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-[#040D1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{active}</h2>
                    <p className="text-[#718096] mt-2 leading-relaxed max-w-xl" style={{ fontFamily: "Inter, sans-serif" }}>{detail.pain}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#6B7280] mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      Use Cases
                    </h4>
                    <ul className="space-y-2">
                      {detail.useCases.map((uc) => (
                        <li key={uc} className="flex items-start gap-2.5 text-sm text-[#4A5568]" style={{ fontFamily: "Inter, sans-serif" }}>
                          <ChevronRight className="w-4 h-4 text-[#1B6FE8] flex-shrink-0 mt-0.5" />
                          {uc}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#6B7280] mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        Recommended Products
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {detail.recommended.map((name) => {
                          const prod = products.find((p) => p.name === name);
                          return (
                            <span
                              key={name}
                              className="text-xs font-semibold px-3 py-1.5 rounded-full border"
                              style={
                                prod
                                  ? { color: prod.color, borderColor: prod.border, background: prod.bg, fontFamily: "'Space Grotesk', sans-serif" }
                                  : { fontFamily: "'Space Grotesk', sans-serif" }
                              }
                            >
                              {name}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#6B7280] mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        Workflow
                      </h4>
                      <div className="bg-[#040D1A] rounded-xl px-5 py-3 inline-block">
                        <span className="text-[#10B981] text-sm font-medium" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                          {detail.workflow}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#6B7280] mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        Key Metrics
                      </h4>
                      <div className="flex gap-4">
                        {detail.metric.map((m) => (
                          <div key={m.label} className="bg-[#F5F7FB] rounded-xl px-4 py-3 border border-[#E8EDF4]">
                            <div className="text-xl font-bold text-[#1B6FE8]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{m.value}</div>
                            <div className="text-[10px] text-[#6B7280] mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>{m.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() =>
                    openContact(onNavigate, {
                      reason: "General Inquiry",
                      message: `I'd like to talk to a ${active} specialist about Trove-AI solutions for our environment.`,
                    })
                  }
                  className="flex items-center gap-2 bg-[#1B6FE8] hover:bg-[#2B7FF8] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all hover:-translate-y-0.5"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Talk to a {active} specialist <ArrowRight className="w-4 h-4" />
                </button>
              </FadeUp>
            )}
          </div>
        </div>
      </section>

      {/* All industries grid */}
      <section className="bg-[#F5F7FB] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <h3 className="text-2xl font-bold text-[#040D1A] mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>All Industries</h3>
          </FadeUp>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {industriesList.map((ind, i) => (
              <FadeUp key={ind.name} delay={i * 0.06} className="h-full">
                <button
                  onClick={() => { setActive(ind.name); window.scrollTo({ top: 220, behavior: "smooth" }); }}
                  className="group p-5 rounded-2xl border border-[#E8EDF4] bg-white hover:border-[#10B981]/40 hover:bg-[#10B981]/[0.04] hover:shadow-[0_8px_30px_rgba(16,185,129,0.12)] transition-all text-left w-full h-full"
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: `${ind.color}12` }}
                  >
                    <ind.Icon style={{ color: ind.color, width: 18, height: 18 }} />
                  </div>
                  <h4 className="font-bold text-[#040D1A] group-hover:text-[#059669] transition-colors text-sm mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{ind.name}</h4>
                  <p className="text-sm text-[#6B7280] leading-snug" style={{ fontFamily: "Inter, sans-serif" }}>{ind.desc}</p>
                </button>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <SharedFooter onNavigate={onNavigate} />
    </div>
  );
}

// ─── APP ────────────────────────────────────────────────────────────────────

// ─── RESOURCES PAGE ──────────────────────────────────────────────────────────

const resourceGuides = [
  {
    type: "Comparison Guide",
    title: "Hardware-Agnostic vs. Proprietary Video Surveillance",
    excerpt: "A detailed breakdown of deployment costs, integration complexity, and long-term flexibility between open-architecture camera systems and vendor-locked proprietary platforms.",
    body: "Proprietary systems offer tight integration but extract long-term cost through licensing, hardware lock-in, and limited interoperability. Hardware-agnostic platforms like VisualIQ separate intelligence from infrastructure, turning any existing camera into a smart sensor without rip-and-replace. The operational savings over a five-year horizon consistently exceed 40% when procurement, maintenance, and upgrade cycles are modeled together.",
    readTime: "8 min",
    product: "VisualIQ",
    productColor: "#0EA5E9",
    date: "Jun 2025",
    tags: ["Video Surveillance", "Hardware", "VisualIQ"],
    icon: Camera,
  },
  {
    type: "Explainer",
    title: "What Is Hardware-Agnostic Multi-Sensor Fusion?",
    excerpt: "Multi-sensor fusion combines data from cameras, radar, LiDAR, acoustic sensors, and network telemetry into a single unified intelligence picture, without requiring proprietary hardware.",
    body: "Rather than siloing each sensor type into its own management interface, DeepSenseIQ ingests heterogeneous sensor streams and correlates them at the reasoning layer, so a motion alert from a radar sensor and a corresponding camera detection are treated as a single event, not two separate incidents requiring manual correlation.",
    readTime: "6 min",
    product: "DeepSenseIQ",
    productColor: "#10B981",
    date: "May 2025",
    tags: ["Sensor Fusion", "Edge AI", "DeepSenseIQ"],
    icon: Radio,
  },
  {
    type: "Compliance Guide",
    title: "AI Surveillance Compliance for Government",
    excerpt: "Navigating FedRAMP, CJIS, FISMA, and IL4 requirements when deploying AI-powered surveillance and threat detection across federal and state agencies.",
    body: "Federal AI deployments require more than a compliant data center. The AI models themselves must meet explainability standards, retain audit trails for every automated decision, and operate within boundaries defined by each agency's ATO. This guide maps Trove-AI's compliance posture across all major federal frameworks in effect as of 2025.",
    readTime: "10 min",
    product: "CyberIQ",
    productColor: "#F97316",
    date: "Apr 2025",
    tags: ["Compliance", "Government", "FedRAMP"],
    icon: Shield,
  },
];

function ResourcesPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="min-h-screen pt-16 bg-[#040D1A]">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-[#1B6FE8]/70 via-white/[0.07] to-transparent" />
          <div className="py-20 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16 items-end">
            <FadeUp>
              <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-[#10B981] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Resources &amp; Insights
              </p>
              <h1 className="text-5xl md:text-[3.75rem] font-bold text-white leading-[1.04] tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Explore guides, FAQs,<br />and expert insights.
              </h1>
              <p className="mt-6 text-white/50 text-lg leading-relaxed max-w-2xl" style={{ fontFamily: "Inter, sans-serif" }}>
                Comparison guides and FAQ content on hardware-agnostic security, multi-sensor fusion, and AI surveillance compliance for government.
              </p>
              <p className="mt-3 text-white/42 text-sm leading-relaxed max-w-xl" style={{ fontFamily: "Inter, sans-serif" }}>
                Resources publishes one new comparison or FAQ piece per month, building on the direct-answer content across Trove-AI's product and industry pages.
              </p>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="divide-y divide-white/[0.05]">
                {[
                  { n: "3", label: "Comparison guides", note: "Available now" },
                  { n: "1×", label: "New piece per month", note: "No subscription" },
                  { n: "Free", label: "No gate, no form", note: "Direct access" },
                ].map((s) => (
                  <div key={s.label} className="flex items-baseline justify-between py-3.5">
                    <div className="flex items-baseline gap-3">
                      <span className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{s.n}</span>
                      <span className="text-sm text-white/42" style={{ fontFamily: "Inter, sans-serif" }}>{s.label}</span>
                    </div>
                    <span className="text-[10px] text-white/40 tracking-wider flex-shrink-0" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{s.note}</span>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Featured guide (first article, large) ─────────────────────────── */}
      <section className="py-16 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="flex items-center gap-4 mb-10">
              <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-white/42" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Featured</span>
              <div className="flex-1 h-px bg-white/[0.05]" />
            </div>
          </FadeUp>
          <FadeUp delay={0.05}>
            <div className="group grid grid-cols-1 lg:grid-cols-[1fr_300px] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-white/[0.13] transition-all duration-300 cursor-pointer bg-[#071528]"
              onClick={() => setExpanded(expanded === 0 ? null : 0)}
            >
              {/* Content */}
              <div className="p-10 md:p-12">
                <div className="flex items-center gap-3 mb-7">
                  <span
                    className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                    style={{ background: `${resourceGuides[0].productColor}18`, color: resourceGuides[0].productColor, fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {resourceGuides[0].type}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-white/12" />
                  <span className="text-[11px] text-white/40" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{resourceGuides[0].date}</span>
                  <span className="text-[11px] text-white/40" style={{ fontFamily: "Inter, sans-serif" }}>{resourceGuides[0].readTime} read</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-[1.12] mb-5 group-hover:text-[#10B981] transition-colors duration-200" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {resourceGuides[0].title}
                </h2>
                <p className="text-white/48 leading-relaxed text-base mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
                  {resourceGuides[0].excerpt}
                </p>
                {expanded === 0 && (
                  <p className="text-white/42 leading-relaxed text-sm mt-4 border-t border-white/[0.05] pt-4" style={{ fontFamily: "Inter, sans-serif" }}>
                    {resourceGuides[0].body}
                  </p>
                )}
                <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-[#10B981] group-hover:gap-3 transition-all" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {expanded === 0 ? "Close" : "Read guide"} <ArrowRight className={`w-4 h-4 transition-transform ${expanded === 0 ? "rotate-90" : ""}`} />
                </div>
              </div>
              {/* Decorative aside */}
              <div className="hidden lg:flex flex-col items-center justify-center border-l border-white/[0.05] p-10 relative overflow-hidden">
                <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 90% 70% at 50% 50%, ${resourceGuides[0].productColor}0B, transparent)` }} />
                <div className="relative z-10 text-center">
                  <div
                    className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5"
                    style={{ background: `${resourceGuides[0].productColor}15`, border: `1px solid ${resourceGuides[0].productColor}20` }}
                  >
                    <Camera className="w-9 h-9" style={{ color: resourceGuides[0].productColor }} />
                  </div>
                  <div className="space-y-2">
                    {resourceGuides[0].tags.map((tag) => (
                      <div key={tag} className="text-[11px] text-white/42 border border-white/[0.07] rounded-full px-3 py-1 inline-block mx-1" style={{ fontFamily: "Inter, sans-serif" }}>{tag}</div>
                    ))}
                  </div>
                  <p className="mt-4 text-[10px] font-bold tracking-wider uppercase" style={{ color: resourceGuides[0].productColor, fontFamily: "'Space Grotesk', sans-serif" }}>{resourceGuides[0].product}</p>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Remaining two guides ──────────────────────────────────────────── */}
      <section className="py-16 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="flex items-center gap-4 mb-10">
              <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-white/42" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>More guides</span>
              <div className="flex-1 h-px bg-white/[0.05]" />
            </div>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {resourceGuides.slice(1).map((guide, i) => {
              const idx = i + 1;
              const GuideIcon = guide.icon;
              return (
                <FadeUp key={guide.title} delay={i * 0.08} className="h-full">
                  <div
                    className="group bg-[#071528] rounded-2xl border border-white/[0.07] overflow-hidden hover:border-white/[0.14] transition-all duration-300 cursor-pointer h-full flex flex-col"
                    onClick={() => setExpanded(expanded === idx ? null : idx)}
                  >
                    <div className="h-px" style={{ background: `linear-gradient(90deg, ${guide.productColor}90, transparent)` }} />
                    <div className="p-8 flex flex-col flex-1">
                      <div className="flex items-start justify-between mb-5">
                        <span
                          className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
                          style={{ background: `${guide.productColor}18`, color: guide.productColor, fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          {guide.type}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-white/38" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{guide.date}</span>
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${guide.productColor}14` }}>
                            <GuideIcon className="w-3.5 h-3.5" style={{ color: guide.productColor }} />
                          </div>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white leading-snug mb-3 group-hover:text-[#10B981] transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {guide.title}
                      </h3>
                      <p className="text-sm text-white/42 leading-relaxed flex-1 mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
                        {guide.excerpt}
                      </p>
                      {expanded === idx && (
                        <p className="text-sm text-white/42 leading-relaxed mb-4 border-t border-white/[0.05] pt-4" style={{ fontFamily: "Inter, sans-serif" }}>
                          {guide.body}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/[0.05]">
                        <div className="flex gap-1.5 flex-wrap">
                          {guide.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="text-[10px] text-white/40 border border-white/[0.07] rounded px-2 py-0.5" style={{ fontFamily: "Inter, sans-serif" }}>{tag}</span>
                          ))}
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-[#10B981] opacity-60 group-hover:opacity-100 transition-opacity" style={{ fontFamily: "Inter, sans-serif" }}>
                          {expanded === idx ? "Close" : guide.readTime + " read"}
                          <ArrowRight className={`w-3 h-3 transition-transform ${expanded === idx ? "rotate-90" : ""}`} />
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Insights blog index link ──────────────────────────────────────── */}
      <section className="py-12 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div
              className="group flex items-center justify-between gap-6 p-8 rounded-2xl border border-white/[0.07] hover:border-[#10B981]/30 hover:bg-[#10B981]/[0.03] transition-all duration-300 cursor-pointer"
              onClick={() => onNavigate("blog")}
            >
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.2)" }}>
                  <Layers className="w-5 h-5 text-[#10B981]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#10B981]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Insights</p>
                    <span className="text-[10px] text-white/38 border border-white/[0.08] rounded px-1.5 py-0.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>blog index</span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#10B981] transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Monthly articles on AI security, physical security, and cyber intelligence
                  </h3>
                  <p className="text-sm text-white/38 mt-1" style={{ fontFamily: "Inter, sans-serif" }}>
                    One new article per month, rotating across all Trove-AI product lines and industries.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-[#10B981] group-hover:gap-3 transition-all flex-shrink-0" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Browse recent articles <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Publishing cadence callout ─────────────────────────────────────── */}
      <section className="py-16 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 items-center py-10 border border-white/[0.06] rounded-2xl px-10">
              <div>
                <p className="text-[10px] font-bold tracking-[0.24em] uppercase text-white/42 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>About this publication</p>
                <p className="text-white/38 text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                  Whether you're comparing solutions, reviewing technical requirements, or learning about AI technologies, Resources & Insights provides straightforward answers to the questions teams ask most often.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Audience", value: "Security engineers\nGov IT procurement\nCompliance leads" },
                  { label: "Format", value: "Comparison guides\nTechnical explainers\nCompliance maps" },
                  { label: "Cadence", value: "1 new piece/month\nNo newsletter\nNo paywall" },
                  { label: "Coverage", value: "All 6 product lines\nAll major industries\nAll compliance frameworks" },
                ].map((item) => (
                  <div key={item.label} className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.05]">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-white/42 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.label}</p>
                    {item.value.split("\n").map((line) => (
                      <p key={line} className="text-sm text-white/50 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{line}</p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Footer CTA ────────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <p className="text-[10px] font-bold tracking-[0.24em] uppercase text-white/40 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Ready to go deeper?</p>
                <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>See how these products work in the field.</h2>
                <p className="mt-2 text-white/35 text-sm leading-relaxed max-w-lg" style={{ fontFamily: "Inter, sans-serif" }}>
                  Every guide on this page connects to a live product. Explore the full Trove-AI platform to see the capabilities in context.
                </p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0 flex-wrap">
                <button
                  onClick={() => onNavigate("solutions")}
                  className="flex items-center gap-2 bg-[#1B6FE8] hover:bg-[#1557c4] text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all hover:-translate-y-0.5"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Explore the platform <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate("about")}
                  className="flex items-center gap-2 border border-white/[0.12] hover:border-white/[0.24] text-white/50 hover:text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  About Trove-AI
                </button>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <SharedFooter onNavigate={onNavigate} />
    </div>
  );
}

// ─── BLOG PAGE ───────────────────────────────────────────────────────────────

function ArticlePage({ articleId, onNavigate }: { articleId: number; onNavigate: (p: Page) => void }) {
  const article = allInsights.find((a) => a.id === articleId);
  if (!article) return null;

  const others = allInsights.filter((a) => a.id !== articleId).slice(0, 3);

  return (
    <div className="min-h-screen pt-16 bg-[#040D1A]">
      {/* Hero */}
      <section className="border-b border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="h-px" style={{ background: `linear-gradient(90deg, ${article.productColor}70, transparent)` }} />
          <div className="py-14">
            <FadeUp>
              <button
                onClick={() => onNavigate("blog")}
                className="inline-flex items-center gap-1.5 text-[11px] font-medium text-white/42 hover:text-white/55 transition-colors mb-7"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <ChevronRight className="w-3 h-3 rotate-180" /> Insights
              </button>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full" style={{ background: `${article.productColor}18`, color: article.productColor, fontFamily: "'Space Grotesk', sans-serif" }}>
                  {article.product}
                </span>
                <span className="w-1 h-1 rounded-full bg-white/12" />
                <span className="text-[11px] text-white/42" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{article.date}</span>
                <span className="text-[11px] text-white/42" style={{ fontFamily: "Inter, sans-serif" }}>{article.readTime} read</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-[1.08] tracking-tight mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {article.title}
              </h1>
              <p className="text-white/50 text-lg leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{article.excerpt}</p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Cover image */}
      <div className="max-w-4xl mx-auto px-6 mt-10">
        <FadeUp>
          <div className="rounded-2xl overflow-hidden border border-white/[0.07]" style={{ height: "380px" }}>
            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          </div>
        </FadeUp>
      </div>

      {/* Article body */}
      <section className="py-14">
        <div className="max-w-4xl mx-auto px-6">
          <FadeUp>
            <ArticleBody body={article.body} />
            <div className="mt-10 pt-8 border-t border-white/[0.06] flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span key={tag} className="text-[11px] text-white/32 border border-white/[0.08] rounded-full px-3 py-1" style={{ fontFamily: "Inter, sans-serif" }}>{tag}</span>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* More articles */}
      {others.length > 0 && (
        <section className="py-14 border-t border-white/[0.06]">
          <div className="max-w-4xl mx-auto px-6">
            <FadeUp>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-white/42" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>More articles</span>
                <div className="flex-1 h-px bg-white/[0.05]" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {others.map((a, i) => (
                  <FadeUp key={a.id} delay={i * 0.06}>
                    <button
                      onClick={() => onNavigate(`article-${a.id}` as Page)}
                      className="group text-left bg-[#071528] rounded-2xl border border-white/[0.07] overflow-hidden hover:border-white/[0.14] hover:-translate-y-0.5 transition-all duration-300 w-full"
                    >
                      <div className="h-36 overflow-hidden">
                        <img src={a.image} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="p-5">
                        <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: a.productColor, fontFamily: "'Space Grotesk', sans-serif" }}>{a.product}</span>
                        <p className="mt-1.5 text-sm font-semibold text-white/80 leading-snug group-hover:text-white transition-colors line-clamp-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{a.title}</p>
                        <p className="mt-1 text-[11px] text-white/42" style={{ fontFamily: "Inter, sans-serif" }}>{a.readTime} read</p>
                      </div>
                    </button>
                  </FadeUp>
                ))}
              </div>
            </FadeUp>
          </div>
        </section>
      )}

      <SharedFooter onNavigate={onNavigate} />
    </div>
  );
}

function BlogPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [activeProduct, setActiveProduct] = useState<string>("All");
  const productFilters = ["All", ...Array.from(new Set(allInsights.map((a) => a.product)))];
  const filtered = activeProduct === "All" ? allInsights : allInsights.filter((a) => a.product === activeProduct);

  return (
    <div className="min-h-screen pt-16 bg-[#040D1A]">

      {/* Hero */}
      <section className="border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-[#10B981]/60 via-white/[0.06] to-transparent" />
          <div className="py-20">
            <FadeUp>
              <button
                onClick={() => onNavigate("resources")}
                className="inline-flex items-center gap-1.5 text-[11px] font-medium text-white/42 hover:text-white/55 transition-colors mb-7"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <ChevronRight className="w-3 h-3 rotate-180" /> Resources &amp; Insights
              </button>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-[#10B981] mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Insights</p>
                  <h1 className="text-5xl md:text-[3.75rem] font-bold text-white leading-[1.04] tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Monthly articles on<br /><span className="text-[#10B981]">AI that matters.</span>
                  </h1>
                  <p className="mt-6 text-white/48 text-base leading-relaxed max-w-lg" style={{ fontFamily: "Inter, sans-serif" }}>
                    Monthly articles on AI security, physical security, and cyber intelligence topics across Trove-AI's product lines.
                  </p>
                  <p className="mt-3 text-white/40 text-sm leading-relaxed max-w-lg" style={{ fontFamily: "Inter, sans-serif" }}>
                    Insights is Trove-AI's ongoing content index, with one new article published monthly, rotating across product lines and industries.
                  </p>
                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <button
                      className="flex items-center gap-2 text-sm font-semibold text-[#10B981] hover:gap-3 transition-all"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      Browse recent articles <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onNavigate("blog-composer")}
                      className="flex items-center gap-2 text-sm font-medium text-white/45 hover:text-white border border-white/[0.1] hover:border-white/25 rounded-full px-4 py-2 transition-all"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      <PenLine className="w-3.5 h-3.5" /> Write article
                    </button>
                  </div>
                </div>
                <div className="hidden lg:flex flex-col items-end justify-end gap-1.5">
                  <span className="text-[11px] text-white/38" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{allInsights.length} articles published</span>
                  <span className="text-[11px] text-white/38" style={{ fontFamily: "'JetBrains Mono', monospace" }}>1 new article / month</span>
                  <span className="text-[11px] text-white/38" style={{ fontFamily: "'JetBrains Mono', monospace" }}>6 product lines covered</span>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Featured article */}
      <section className="py-16 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-white/42" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Latest</span>
              <div className="flex-1 h-px bg-white/[0.05]" />
            </div>
            <div
              className="group grid grid-cols-1 lg:grid-cols-[1fr_360px] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-white/[0.14] transition-all duration-300 cursor-pointer bg-[#071528]"
              onClick={() => onNavigate(`article-${allInsights[0].id}` as Page)}
            >
              <div className="p-10 md:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full" style={{ background: `${allInsights[0].productColor}18`, color: allInsights[0].productColor, fontFamily: "'Space Grotesk', sans-serif" }}>
                    {allInsights[0].product}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-white/12" />
                  <span className="text-[11px] text-white/40" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{allInsights[0].date}</span>
                  <span className="text-[11px] text-white/40" style={{ fontFamily: "Inter, sans-serif" }}>{allInsights[0].readTime} read</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-[1.12] mb-5 group-hover:text-[#10B981] transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {allInsights[0].title}
                </h2>
                <p className="text-white/48 leading-relaxed mb-4" style={{ fontFamily: "Inter, sans-serif" }}>{allInsights[0].excerpt}</p>
                <p className="text-white/42 leading-relaxed text-sm border-t border-white/[0.05] pt-4 line-clamp-4" style={{ fontFamily: "Inter, sans-serif" }}>{allInsights[0].body.split(/\n\n+/)[0]}</p>
                <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-[#10B981] group-hover:gap-3 transition-all" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Read article <ArrowRight className="w-4 h-4" />
                </div>
              </div>
              <div className="hidden lg:block relative overflow-hidden border-l border-white/[0.05]">
                <img src={allInsights[0].image} alt={allInsights[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(7,21,40,0.4), transparent)" }} />
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Article index */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-white/42" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>All articles</span>
                <div className="w-10 h-px bg-white/[0.05]" />
                <span className="text-[11px] text-white/40" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{filtered.length} results</span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {productFilters.map((p) => (
                  <button
                    key={p}
                    onClick={() => setActiveProduct(p)}
                    className="text-xs font-semibold px-4 py-2.5 min-h-[44px] rounded-full border transition-all"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      background: activeProduct === p ? "#10B981" : "transparent",
                      color: activeProduct === p ? "#fff" : "rgba(255,255,255,0.32)",
                      borderColor: activeProduct === p ? "#10B981" : "rgba(255,255,255,0.09)",
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((article, i) => (
              <FadeUp key={article.title} delay={i * 0.05} className="h-full">
                <button
                  onClick={() => onNavigate(`article-${article.id}` as Page)}
                  className="group bg-[#071528] rounded-2xl border border-white/[0.07] overflow-hidden hover:border-white/[0.14] hover:-translate-y-0.5 transition-all duration-300 h-full flex flex-col text-left w-full"
                >
                  {/* Cover image */}
                  <div className="relative h-44 overflow-hidden flex-shrink-0">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(7,21,40,0.7))" }} />
                    <span className="absolute bottom-3 left-4 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full backdrop-blur-sm" style={{ background: `${article.productColor}25`, color: article.productColor, fontFamily: "'Space Grotesk', sans-serif" }}>
                      {article.product}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] text-white/42" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{article.date}</span>
                      <span className="text-[11px] text-white/38" style={{ fontFamily: "Inter, sans-serif" }}>{article.readTime}</span>
                    </div>
                    <h3 className="font-bold text-white leading-snug mb-3 group-hover:text-[#10B981] transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {article.title}
                    </h3>
                    <p className="text-sm text-white/35 leading-relaxed mb-4 flex-1" style={{ fontFamily: "Inter, sans-serif" }}>{article.excerpt}</p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/[0.05]">
                      <div className="flex gap-1.5 flex-wrap">
                        {article.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-[10px] text-white/38 border border-white/[0.06] rounded px-2 py-0.5" style={{ fontFamily: "Inter, sans-serif" }}>{tag}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-1 text-[11px] font-medium text-[#10B981]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        Read <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </div>
                </button>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.2}>
            <div className="mt-12 pt-8 border-t border-white/[0.05] flex items-center justify-between">
              <button
                onClick={() => onNavigate("resources")}
                className="flex items-center gap-2 text-sm text-white/42 hover:text-white transition-colors"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <ChevronRight className="w-4 h-4 rotate-180" /> Back to Resources
              </button>
              <button
                onClick={() => onNavigate("solutions")}
                className="flex items-center gap-2 text-sm font-semibold text-[#10B981] hover:gap-3 transition-all"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Explore the platform <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </FadeUp>
        </div>
      </section>

      <SharedFooter onNavigate={onNavigate} />
    </div>
  );
}

// ─── APP ────────────────────────────────────────────────────────────────────

// ─── PARTNERS PAGE ───────────────────────────────────────────────────────────

function PartnersPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const partners = [
    {
      id: "constellis",
      name: "Constellis",
      label: "LEXSO × Constellis",
      type: "Joint Development",
      typeColor: "#0EA5E9",
      region: "Global",
      domain: "Physical Security",
      logo: "C",
      logoColor: "#0EA5E9",
      product: "LEXSO",
      productColor: "#0EA5E9",
      headline: "Co-developed for complex physical security environments.",
      description: "LEXSO is developed jointly with Constellis, a global risk management and security firm, for complex physical security environments. Constellis brings deep operational expertise in protective services, security staffing, and intelligence. LEXSO brings the AI command layer that fuses those operations into a unified intelligence picture.",
      detail: "Constellis operates across six continents, supporting government, corporate, and high-risk commercial clients. The LEXSO × Constellis partnership translates AI-native security capabilities into the field-tested operational playbooks Constellis deploys at scale.",
      capabilities: ["Joint product development", "Field deployment expertise", "Government & commercial reach", "Global operational footprint"],
      url: null,
    },
    {
      id: "qumulusai",
      name: "QumulusAI",
      label: "QumulusAI",
      type: "AI Infrastructure",
      typeColor: "#10B981",
      region: "Global / Edge",
      domain: "HPC & AI Infrastructure",
      logo: "Q",
      logoColor: "#10B981",
      product: "AI-as-a-Service",
      productColor: "#10B981",
      headline: "Sole trusted AI and security-posture provider.",
      description: "QumulusAI is a global HPC and AI infrastructure provider building a differentiated position as a data center closer to the edge, with multiple regional data centers reducing latency and improving access to high-performance computing.",
      detail: "Trove-AI is QumulusAI's sole trusted AI and security-posture provider, delivering AI-as-a-Service and Algorithm-as-a-Service through the QumulusAI platform. This exclusive relationship positions Trove-AI's DeepSense-powered stack as the AI intelligence layer across QumulusAI's distributed infrastructure footprint.",
      capabilities: ["AI-as-a-Service delivery", "Algorithm-as-a-Service", "Edge-proximate infrastructure", "Security posture management"],
      url: null,
    },
    {
      id: "lomahipe",
      name: "LomaHipe",
      label: "LomaHipe",
      type: "Sister Initiative",
      typeColor: "#8B5CF6",
      region: "Healthcare",
      domain: "Health Data Trust",
      logo: "L",
      logoColor: "#8B5CF6",
      product: "VellumGuard",
      productColor: "#8B5CF6",
      headline: "VellumGuard is LomaHipe's secure communications layer.",
      description: "LomaHipe is Trove-AI's sister initiative building a health data trust for secure, verifiable exchange of health data across organizations. Trove-AI's VellumGuard is integrated into the LomaHipe health data trust as its secure communications layer.",
      detail: "VellumGuard governs node enrollment, authentication, and audit for every exchange within the LomaHipe trust network. LomaHipe is hosted at its own permanent domain and is not part of the trove-ai.com site. It operates as an independent initiative with its own governance, identity, and stakeholder relationships.",
      capabilities: ["Node enrollment & authentication", "Zero-trust audit logging", "Verifiable data exchange", "Cross-org health data governance"],
      url: "lomahipe.com",
    },
  ];

  return (
    <div className="min-h-screen pt-16 bg-[#040D1A]">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="border-b border-white/[0.06] relative overflow-hidden">
        {/* Subtle ecosystem grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle, rgba(27,111,232,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#040D1A] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="h-px bg-gradient-to-r from-[#1B6FE8]/70 via-white/[0.07] to-transparent" />
          <div className="py-20 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 items-end">
            <FadeUp>
              <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-[#10B981] mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Partners &amp; Ecosystem
              </p>
              <h1 className="text-5xl md:text-[3.75rem] font-bold text-white leading-[1.04] tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Select partners.<br /><span className="text-[#1B6FE8]">Deeper integration.</span>
              </h1>
              <p className="mt-6 text-white/50 text-lg leading-relaxed max-w-2xl" style={{ fontFamily: "Inter, sans-serif" }}>
                Trove-AI's partner ecosystem includes Constellis, QumulusAI, and LomaHipe, the health data trust initiative VellumGuard is integrated into.
              </p>
              <p className="mt-3 text-white/42 text-sm leading-relaxed max-w-xl" style={{ fontFamily: "Inter, sans-serif" }}>
                Trove-AI works with select partners to extend its products into markets and infrastructure it does not serve alone.
              </p>
            </FadeUp>

            {/* Partner photo */}
            <FadeUp delay={0.12}>
              <div className="relative rounded-2xl overflow-hidden h-64 lg:h-72">
                <img
                  src={partnersHero}
                  alt="Trove-AI partner team joining hands, collaborative partnership"
                  className="w-full h-full object-cover object-center"
                />
                {/* Dark overlay to integrate with navy theme */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#040D1A]/70 via-[#040D1A]/20 to-transparent" />
                {/* Bottom caption */}
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-white/50" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Built on trust. Extended through partnership.
                  </p>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Partner cards ─────────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="flex items-center gap-4 mb-12">
              <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-white/42" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Partner profiles</span>
              <div className="flex-1 h-px bg-white/[0.05]" />
              <span className="text-[11px] text-white/40" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{partners.length} partners</span>
            </div>
          </FadeUp>

          <div className="space-y-5">
            {partners.map((partner, i) => (
              <FadeUp key={partner.id} delay={i * 0.08}>
                <div className="group bg-[#071528] rounded-2xl border border-white/[0.07] overflow-hidden hover:border-white/[0.12] transition-all duration-300">
                  {/* Top accent bar */}
                  <div className="h-px" style={{ background: `linear-gradient(90deg, ${partner.logoColor}80, transparent)` }} />

                  <div className="p-8 md:p-10">
                    {/* Header row */}
                    <div className="flex items-start justify-between gap-6 mb-7 flex-wrap">
                      <div className="flex items-center gap-4">
                        {/* Logo mark */}
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold flex-shrink-0"
                          style={{ background: `${partner.logoColor}14`, border: `1px solid ${partner.logoColor}25`, color: partner.logoColor, fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          {partner.logo}
                        </div>
                        <div>
                          <div className="flex items-center gap-2.5 mb-1 flex-wrap">
                            <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{partner.label}</h2>
                            <span
                              className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
                              style={{ background: `${partner.typeColor}15`, color: partner.typeColor, fontFamily: "'Space Grotesk', sans-serif" }}
                            >
                              {partner.type}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="text-[11px] text-white/42" style={{ fontFamily: "Inter, sans-serif" }}>{partner.domain}</span>
                            <span className="w-1 h-1 rounded-full bg-white/15" />
                            <span className="text-[11px] text-white/42" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{partner.region}</span>
                          </div>
                        </div>
                      </div>
                      {/* Product badge */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-[10px] text-white/40" style={{ fontFamily: "Inter, sans-serif" }}>Trove product:</span>
                        <span
                          className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full"
                          style={{ background: `${partner.productColor}15`, color: partner.productColor, fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          {partner.product}
                        </span>
                      </div>
                    </div>

                    {/* Content grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-8">
                      <div>
                        <p className="text-base font-semibold text-white/80 mb-3 leading-snug" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                          {partner.headline}
                        </p>
                        <p className="text-sm text-white/45 leading-relaxed mb-3" style={{ fontFamily: "Inter, sans-serif" }}>
                          {partner.description}
                        </p>
                        <p className="text-sm text-white/42 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                          {partner.detail}
                        </p>
                        {partner.url && (
                          <div className="mt-4 flex items-center gap-2 text-sm text-[#8B5CF6]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            <Globe className="w-3.5 h-3.5" />
                            <span className="font-medium">{partner.url}</span>
                          </div>
                        )}
                      </div>

                      {/* Capabilities */}
                      <div>
                        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/42 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Capabilities</p>
                        <div className="space-y-2.5">
                          {partner.capabilities.map((cap) => (
                            <div key={cap} className="flex items-start gap-2.5">
                              <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ background: partner.logoColor }} />
                              <span className="text-sm text-white/45 leading-snug" style={{ fontFamily: "Inter, sans-serif" }}>{cap}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ecosystem philosophy ──────────────────────────────────────────── */}
      <section className="py-16 border-t border-white/[0.05] border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 items-center">
              <div>
                <p className="text-[10px] font-bold tracking-[0.24em] uppercase text-white/42 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Partnership philosophy</p>
                <h2 className="text-3xl font-bold text-white mb-4 leading-snug" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  We partner selectively,<br />not broadly.
                </h2>
                <p className="text-white/42 text-sm leading-relaxed mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
                  Trove-AI doesn't maintain a partner directory or a reseller channel. Every partner relationship is a co-development, integration, or infrastructure arrangement, one that extends a Trove-AI product into a context it couldn't reach alone.
                </p>
                <p className="text-white/42 text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                  This keeps the ecosystem small, accountable, and technically coherent. Partners don't resell Trove-AI. They build with it.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { n: "3", label: "Active partners", note: "All strategic" },
                  { n: "1", label: "Exclusive AI provider", note: "QumulusAI" },
                  { n: "2", label: "Joint products", note: "LEXSO, VellumGuard" },
                  { n: "0", label: "Reseller relationships", note: "By design" },
                ].map((s) => (
                  <div key={s.label} className="bg-white/[0.03] rounded-xl p-5 border border-white/[0.05]">
                    <div className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{s.n}</div>
                    <div className="text-xs text-white/45 mb-0.5" style={{ fontFamily: "Inter, sans-serif" }}>{s.label}</div>
                    <div className="text-[10px] text-white/38" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{s.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Partner CTA ───────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-12 px-10 rounded-2xl border border-white/[0.07] bg-[#071528] relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none" style={{
                background: "radial-gradient(ellipse 60% 80% at 100% 50%, rgba(27,111,232,0.07), transparent)",
              }} />
              <div className="relative z-10">
                <p className="text-[10px] font-bold tracking-[0.24em] uppercase text-white/42 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Become a partner</p>
                <h2 className="text-3xl font-bold text-white mb-3 leading-snug" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Interested in partnering<br />with Trove-AI?
                </h2>
                <p className="text-white/40 text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                  If your organization is building infrastructure, delivering security operations, or operating in healthcare data, and you see an opportunity to work alongside a Trove-AI product, we're open to the conversation.
                </p>
              </div>
              <div className="relative z-10 flex flex-col items-start lg:items-end gap-4">
                <button
                  onClick={() => onNavigate("about")}
                  className="flex items-center gap-2 bg-[#1B6FE8] hover:bg-[#1557c4] text-white font-semibold px-7 py-3.5 rounded-xl text-sm transition-all hover:-translate-y-0.5"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Get in touch <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[11px] text-white/40 text-right" style={{ fontFamily: "Inter, sans-serif" }}>
                  No partner portals. No channel programs.<br />Just a direct conversation.
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <SharedFooter onNavigate={onNavigate} />
    </div>
  );
}

// ─── PRODUCT PAGE SHELL ──────────────────────────────────────────────────────

function ProductPageShell({ product, children, onNavigate }: { product: typeof products[0]; children: ReactNode; onNavigate: (p: Page) => void }) {
  return (
    <div className="min-h-screen pt-16 bg-[#040D1A]">
      <section className="border-b border-white/[0.06] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 70% 80% at 0% 50%, ${product.color}07, transparent)` }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="h-px" style={{ background: `linear-gradient(90deg, ${product.color}80, transparent)` }} />
          <div className="py-16">
            <FadeUp>
              <button onClick={() => onNavigate("solutions")} className="inline-flex items-center gap-1.5 text-[11px] font-medium text-white/42 hover:text-white/55 transition-colors mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                <ChevronRight className="w-3 h-3 rotate-180" /> Solutions
              </button>
              <div className="flex items-start gap-5 mb-5">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: `${product.color}15`, border: `1px solid ${product.color}25` }}>
                  <product.Icon className="w-7 h-7" style={{ color: product.color }} />
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-[0.28em] uppercase mb-1" style={{ color: product.color, fontFamily: "'Space Grotesk', sans-serif" }}>{product.tagline}</p>
                  <h1 className="text-5xl md:text-[3.5rem] font-bold text-white leading-[1.05] tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{product.name}</h1>
                </div>
              </div>
              <p className="text-white/48 text-lg leading-relaxed max-w-2xl" style={{ fontFamily: "Inter, sans-serif" }}>{product.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {product.capabilities.map((cap) => (
                  <span key={cap} className="text-[11px] font-medium px-3 py-1 rounded-full border" style={{ borderColor: `${product.color}30`, color: product.color, background: `${product.color}0C`, fontFamily: "'Space Grotesk', sans-serif" }}>{cap}</span>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
      {children}
      <SharedFooter onNavigate={onNavigate} />
    </div>
  );
}

// ─── VISUALIQ PAGE ────────────────────────────────────────────────────────────

function VisualIQPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const product = products.find((p) => p.id === "visualiq")!;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const pipeline = [
    { layer: "Camera / NVR / drone ingest", purpose: "Connects to RTSP streams, ONVIF cameras, NVR-restreamed video, and drone feeds already covering the facility." },
    { layer: "Frame sampling", purpose: "Processes small frames at low FPS by default to keep workload manageable across many lines and zones." },
    { layer: "Object detection", purpose: "Detects people, vehicles and forklifts, general objects, and camera health." },
    { layer: "Object tracking", purpose: "Computes trajectories, dwell time, and zone crossing instead of isolated detections." },
    { layer: "Scene & behavior analysis", purpose: "Builds spatial and temporal understanding of activity across production and facility zones." },
    { layer: "Rule engine", purpose: "Applies facility-specific zones, shift schedules, and thresholds to determine whether an event is meaningful." },
    { layer: "Event & alert layer", purpose: "Generates alerts, evidence clips, metadata, and searchable events for operations and safety teams." },
    { layer: "Dashboard / API", purpose: "Shows zone status, recent events, and supports integration into existing facility systems." },
  ];

  const verticals = [
    {
      name: "Manufacturing",
      color: "#EC4899",
      headline: "Safety and operational intelligence using cameras already on the plant floor.",
      overview: "VisualIQ supports manufacturing facilities with combined security and operational intelligence. It installs on existing cameras and VMSs with no hardware replacement required. A plant floor combines three needs at once: safety compliance near machinery, perimeter and dock security, and operational visibility into congestion and downtime. VisualIQ acts as a continuous awareness layer that escalates only events matching configured, plant-specific rules.",
      useCases: [
        { cat: "Safety & Compliance", items: ["PPE-compliance candidate detection", "Restricted machinery zone entry", "Person-forklift proximity alerts"] },
        { cat: "Operational Intelligence", items: ["Line congestion and dwell-time analytics", "Workflow bottleneck flags", "Shift-change traffic patterns"] },
        { cat: "Perimeter & Dock", items: ["After-hours access detection", "Vehicle dwell time at loading docks", "Camera health across large plant footprint"] },
      ],
      alert: { severity: "Warning", location: "Line 4 Restricted Zone", body: "Person detected within an active forklift operating zone without a recorded safety hold. Evidence: 20-second clip available.", action: "Floor supervisor should verify immediately." },
      deployments: [
        { tier: "Pilot", cameras: "1–10 cameras", hw: "GPU workstation, low FPS sampling" },
        { tier: "Single line", cameras: "10–30 cameras", hw: "Single GPU workstation, zone and proximity rules" },
        { tier: "Plant-wide", cameras: "30–100 cameras", hw: "Higher-end workstation or small server, adaptive FPS" },
        { tier: "Multi-plant", cameras: "100+ cameras", hw: "DGX-class or multi-GPU server, adaptive scheduling" },
      ],
    },
    {
      name: "Government & Defense",
      color: "#1B6FE8",
      headline: "Cloud or on-premises deployment to meet data sovereignty requirements.",
      overview: "VisualIQ supports government and defense facilities with flexible deployment topology based on each facility's data residency requirements. It is part of a broader Trove-AI government stack alongside LEXSO, DeepSenseIQ, VellumGuard, and CyberIQ. Many enterprise surveillance platforms require proprietary hardware. VisualIQ runs on hardware customers already own or independently procure.",
      useCases: [
        { cat: "Perimeter & Facility", items: ["Restricted-zone entry detection", "After-hours access alerts"] },
        { cat: "Checkpoint & Access", items: ["Vehicle loitering near checkpoints", "Crowd behavior at access points"] },
        { cat: "Sensitive Area Protection", items: ["Unattended object detection near sensitive facilities", "Restricted-area dwell-time alerts"] },
      ],
      alert: { severity: "Critical", location: "Perimeter Zone C", body: "Person detected inside restricted perimeter with no corresponding access-control event. Evidence: 20-second clip available.", action: "Security team should verify immediately." },
      deployments: [
        { tier: "Pilot", cameras: "1–20 cameras", hw: "GPU workstation, on-premises or cloud" },
        { tier: "Single facility", cameras: "20–50 cameras", hw: "Single GPU workstation or small server" },
        { tier: "Multi-building campus", cameras: "50–200 cameras", hw: "Higher-end server, adaptive FPS" },
        { tier: "Multi-site / agency-wide", cameras: "200+ cameras", hw: "DGX-class or multi-GPU server, adaptive scheduling" },
      ],
    },
    {
      name: "Critical Infrastructure & Utilities",
      color: "#10B981",
      headline: "Hardware-agnostic security across industrial, remote, and unmanned facility environments.",
      overview: "VisualIQ provides security across industrial and utility facilities, paired with DeepSenseIQ for offline data triage and VellumGuard for secure communication between distributed sites with intermittent connectivity. For remote or unmanned sites, the pipeline is designed to run against intermittent connectivity and escalate camera-health and perimeter events immediately.",
      useCases: [
        { cat: "Perimeter & Substation", items: ["Fence-line breach detection", "Unauthorized access to substations or pipeline points"] },
        { cat: "Unmanned Site Awareness", items: ["Camera offline or obstructed alerts", "Motion anomalies at lightly staffed sites"] },
        { cat: "Equipment & Asset", items: ["Unattended object near critical equipment", "Vehicle dwell time without a matching work order"] },
      ],
      alert: { severity: "Critical", location: "Substation 7 Perimeter", body: "Person detected crossing the fence line outside a scheduled maintenance window. Evidence: 20-second clip available.", action: "Dispatch or security team should verify immediately." },
      deployments: [
        { tier: "Pilot", cameras: "1–10 cameras", hw: "GPU workstation or edge kit, low FPS sampling" },
        { tier: "Single facility", cameras: "10–30 cameras", hw: "Single GPU workstation or edge kit" },
        { tier: "Multi-site", cameras: "30–100 cameras", hw: "Regional server or aggregated edge deployment" },
        { tier: "Regional / utility-wide", cameras: "100+ cameras", hw: "DGX-class or multi-GPU server, adaptive scheduling" },
      ],
    },
  ];

  const faqs = [
    { q: "Does this replace our safety officers?", a: "No. VisualIQ is an early awareness layer. Safety officers and floor supervisors still verify and act on every alert." },
    { q: "Does this require new cameras?", a: "No. It runs on existing cameras, NVR systems, and drone feeds already in use." },
    { q: "Can VisualIQ identify specific workers by name?", a: "Not in its current form. It detects patterns, proximity, and zone activity, not individual identity." },
    { q: "How is VisualIQ different from LEXSO?", a: "VisualIQ is a software-only visual analytics layer. LEXSO, developed with Constellis, adds full-scale hardware, software, and deterrence capability for facilities that need more than software alone." },
    { q: "Can VisualIQ run fully on-premises for data residency requirements?", a: "Yes. Deployment is available cloud, on-premises, or hybrid based on the facility's data sovereignty requirements." },
    { q: "How does this work at sites with unreliable connectivity?", a: "VisualIQ processes locally where possible, and VellumGuard is available to move alerts and evidence securely between nodes when connectivity is intermittent." },
  ];

  return (
    <ProductPageShell product={product} onNavigate={onNavigate}>

      {/* Pipeline architecture */}
      <section className="py-16 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-white/42" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Core Architecture</span>
              <div className="flex-1 h-px bg-white/[0.05]" />
            </div>
            <p className="text-white/38 text-sm max-w-2xl mb-8 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
              VisualIQ is built as a modular pipeline. Rather than analyzing frame by frame, it builds a temporal understanding of activity across the facility over time.
            </p>
          </FadeUp>
          <div className="border border-white/[0.07] rounded-2xl overflow-hidden">
            {pipeline.map((row, i) => (
              <FadeUp key={row.layer} delay={i * 0.03}>
                <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] border-b border-white/[0.06] last:border-b-0 hover:bg-white/[0.02] transition-colors">
                  <div className="px-6 py-4 md:border-r border-white/[0.06] flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: product.color }} />
                    <span className="text-sm font-semibold text-white/70" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{row.layer}</span>
                  </div>
                  <div className="px-6 py-4">
                    <span className="text-sm text-white/40 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{row.purpose}</span>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Verticals */}
      {verticals.map((v) => (
        <section key={v.name} className="py-16 border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6">
            <FadeUp>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full" style={{ background: `${v.color}15`, color: v.color, fontFamily: "'Space Grotesk', sans-serif" }}>{v.name}</span>
                <div className="flex-1 h-px bg-white/[0.05]" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{v.headline}</h2>
              <p className="text-white/38 text-sm leading-relaxed max-w-3xl mb-10" style={{ fontFamily: "Inter, sans-serif" }}>{v.overview}</p>
            </FadeUp>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <FadeUp delay={0.05}>
                <div className="space-y-3">
                  {v.useCases.map((uc) => (
                    <div key={uc.cat} className="bg-[#071528] rounded-xl border border-white/[0.07] p-5">
                      <p className="text-[10px] font-bold tracking-widest uppercase mb-3" style={{ color: v.color, fontFamily: "'Space Grotesk', sans-serif" }}>{uc.cat}</p>
                      <div className="space-y-2">
                        {uc.items.map((item) => (
                          <div key={item} className="flex items-start gap-2.5">
                            <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ background: v.color }} />
                            <span className="text-sm text-white/50" style={{ fontFamily: "Inter, sans-serif" }}>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </FadeUp>
              <FadeUp delay={0.1}>
                <div className="space-y-3">
                  {/* Sample alert */}
                  <div className="bg-[#071528] rounded-xl border border-white/[0.07] p-5">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-white/42 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Sample Alert</p>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ background: v.alert.severity === "Critical" ? "rgba(239,68,68,0.15)" : "rgba(249,115,22,0.15)", color: v.alert.severity === "Critical" ? "#EF4444" : "#F97316", fontFamily: "'Space Grotesk', sans-serif" }}>{v.alert.severity}</span>
                      <span className="text-[11px] text-white/38" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{v.alert.location}</span>
                    </div>
                    <p className="text-sm text-white/50 leading-relaxed mb-2" style={{ fontFamily: "Inter, sans-serif" }}>{v.alert.body}</p>
                    <p className="text-xs text-white/42 border-t border-white/[0.05] pt-2" style={{ fontFamily: "Inter, sans-serif" }}>Recommended: {v.alert.action}</p>
                  </div>
                  {/* Deployment tiers */}
                  <div className="bg-[#071528] rounded-xl border border-white/[0.07] overflow-hidden">
                    <div className="px-5 py-3 border-b border-white/[0.06]">
                      <p className="text-[10px] font-bold tracking-widest uppercase text-white/42" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Deployment Tiers</p>
                    </div>
                    {v.deployments.map((d, di) => (
                      <div key={d.tier} className={`px-5 py-3 ${di < v.deployments.length - 1 ? "border-b border-white/[0.05]" : ""}`}>
                        <div className="flex items-baseline justify-between mb-0.5">
                          <span className="text-xs font-semibold text-white/65" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{d.tier}</span>
                          <span className="text-[11px]" style={{ color: v.color, fontFamily: "'JetBrains Mono', monospace" }}>{d.cameras}</span>
                        </div>
                        <span className="text-[11px] text-white/42" style={{ fontFamily: "Inter, sans-serif" }}>{d.hw}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>
      ))}

      {/* Privacy */}
      <section className="py-14 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-white/42" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Privacy & Responsible AI</span>
              <div className="flex-1 h-px bg-white/[0.05]" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {["No facial recognition in MVP", "No identity matching tied to personnel records", "Local-first processing where possible", "Short event clips instead of constant cloud upload", "Human review before escalation", "Clear retention policy"].map((item) => (
                <div key={item} className="flex items-start gap-2.5 bg-[#071528] rounded-xl p-4 border border-white/[0.06]">
                  <Check className="w-3.5 h-3.5 text-[#10B981] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-white/48 leading-snug" style={{ fontFamily: "Inter, sans-serif" }}>{item}</span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-white/42" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>FAQ</span>
              <div className="flex-1 h-px bg-white/[0.05]" />
            </div>
          </FadeUp>
          <div className="max-w-3xl space-y-2">
            {faqs.map((faq, i) => (
              <FadeUp key={faq.q} delay={i * 0.04}>
                <div className="border border-white/[0.07] rounded-xl overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/[0.03] transition-colors">
                    <span className="text-sm font-semibold text-white/80 pr-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{faq.q}</span>
                    <span className="text-white/42 flex-shrink-0 text-lg leading-none">{openFaq === i ? "×" : "+"}</span>
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 border-t border-white/[0.05]">
                      <p className="text-sm text-white/42 leading-relaxed pt-3" style={{ fontFamily: "Inter, sans-serif" }}>{faq.a}</p>
                    </div>
                  )}
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 py-10 px-10 rounded-2xl border border-white/[0.07] bg-[#071528] relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 50% 80% at 100% 50%, ${product.color}07, transparent)` }} />
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Ready to deploy VisualIQ?</h2>
                <p className="text-white/38 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>No hardware replacement required. Runs on your existing cameras from day one.</p>
              </div>
              <div className="relative z-10 flex gap-3 flex-wrap">
                <button onClick={() => onNavigate("solutions")} className="flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all hover:-translate-y-0.5" style={{ background: product.color, fontFamily: "'Space Grotesk', sans-serif" }}>
                  See all products <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={() => onNavigate("industries")} className="flex items-center gap-2 border border-white/[0.12] hover:border-white/[0.24] text-white/50 hover:text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Browse industries
                </button>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

    </ProductPageShell>
  );
}

// ─── STUB PRODUCT PAGES ───────────────────────────────────────────────────────

function ProductStubPage({ productId, onNavigate }: { productId: string; onNavigate: (p: Page) => void }) {
  const product = products.find((p) => p.id === productId)!;

  const details: Record<string, { summary: string; sections: { title: string; items: string[] }[] }> = {
    deepsenseiq: {
      summary: "Edge-first AI for continuous multi-sensor data ingestion. DeepSenseIQ operates fully offline and delivers evidence-based threat detection at operational scale, from remote substations to contested environments where cloud connectivity cannot be guaranteed.",
      sections: [
        { title: "Edge Processing", items: ["Compressed model inference on-device", "IL4/IL5 air-gapped deployment support", "Syncs detections to cloud when bandwidth allows", "Adaptive FPS and model scaling by site tier"] },
        { title: "Multi-Sensor Ingestion", items: ["Cameras, radar, LiDAR, acoustic sensors", "Network telemetry correlation", "Heterogeneous stream normalization", "Single unified event output across all sensors"] },
        { title: "Evidence & Alerting", items: ["Evidence-based detection with confidence scores", "Audit trail per detection event", "Short clip attachment for every alert", "Integration with VellumGuard for secure transport"] },
      ],
    },
    careiq: {
      summary: "AI monitoring purpose-built for healthcare, education, and childcare. CareIQ uses ambient sensor fusion to detect falls, distress patterns, and unsafe behaviors, without facial recognition or identity storage, while maintaining patient dignity and regulatory compliance.",
      sections: [
        { title: "Behavioral Detection", items: ["Fall detection with confidence scoring", "Distress pattern recognition", "Unsafe proximity and behavioral anomalies", "Ambient sensor fusion, no biometric storage"] },
        { title: "Compliance", items: ["HIPAA-aligned architecture", "No personally identifiable biometric data stored", "Behavioral alerts, not identity-based", "Clear retention and audit policy"] },
        { title: "Deployment", items: ["Healthcare facilities and hospitals", "Education campuses and classrooms", "Childcare and early learning environments", "Human-in-the-loop escalation on every alert"] },
      ],
    },
    cyberiq: {
      summary: "One AI engine ingesting logs, code, and network traffic simultaneously. CyberIQ delivers risk scoring with full explainability and MITRE ATT&CK mapping across the entire attack surface, turning data overload into prioritized, auditable intelligence.",
      sections: [
        { title: "Full-Spectrum Ingestion", items: ["Log files, SIEM feeds, SOAR integration", "Code repository and artifact scanning", "Network traffic and flow analysis", "Simultaneous cross-source correlation"] },
        { title: "Risk Intelligence", items: ["Explainable AI risk scoring per event", "MITRE ATT&CK technique tagging", "Kill chain correlation across sources", "Confidence score and evidence chain per finding"] },
        { title: "Deployment", items: ["On-premises, cloud, and hybrid", "Air-gapped and classified network support", "Synthetic training data for classified environments", "DeepSense inference engine with audit trail"] },
      ],
    },
    vellumguard: {
      summary: "Node-to-node encrypted communications with verifiable trust at every layer. VellumGuard governs node enrollment, authentication, and audit for every exchange, built for defense, government, and healthcare data sovereignty requirements.",
      sections: [
        { title: "Zero Trust Architecture", items: ["Node-to-node trust verification on every exchange", "No single compromised credential unlocks a network", "Behavioral and contextual cross-validation on access", "Zone-level context before authorization is granted"] },
        { title: "Encrypted Transport", items: ["Secure evidence and alert transport between sites", "Intermittent connectivity support for remote nodes", "LomaHipe health data trust integration", "Verifiable exchange with full audit trail"] },
        { title: "Deployment", items: ["Government and defense data residency compliance", "Healthcare cross-organization data exchange", "Distributed infrastructure with remote nodes", "Integration with VisualIQ and DeepSenseIQ"] },
      ],
    },
    lexso: {
      summary: "The most advanced AI-powered physical security command system. Co-developed with Constellis for complex physical security environments, LEXSO combines sensor fusion, deterrence, and real-time command center intelligence in a single platform.",
      sections: [
        { title: "Command Intelligence", items: ["Real-time interactive command map", "Sensor fusion across cameras, radar, and access control", "Alert timeline with evidence chain", "AI-prioritized incident queue"] },
        { title: "Deterrence Systems", items: ["Hardware-integrated deterrence capability", "Constellis field deployment expertise", "Physical and cyber event correlation", "Escalation workflow with security operations"] },
        { title: "Deployment", items: ["Complex physical security environments", "Government and commercial facilities", "Co-developed with Constellis, global reach", "LEXSO × Constellis joint delivery model"] },
      ],
    },
  };

  const d = details[productId] || { summary: product.description, sections: [] };

  return (
    <ProductPageShell product={product} onNavigate={onNavigate}>
      <section className="py-16 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <p className="text-white/45 text-base leading-relaxed max-w-2xl mb-12" style={{ fontFamily: "Inter, sans-serif" }}>{d.summary}</p>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {d.sections.map((sec, i) => (
              <FadeUp key={sec.title} delay={i * 0.07} className="h-full">
                <div className="bg-[#071528] rounded-2xl border border-white/[0.07] p-7 h-full" style={{ borderTop: `2px solid ${product.color}40` }}>
                  <p className="text-[10px] font-bold tracking-widest uppercase mb-4" style={{ color: product.color, fontFamily: "'Space Grotesk', sans-serif" }}>{sec.title}</p>
                  <div className="space-y-2.5">
                    {sec.items.map((item) => (
                      <div key={item} className="flex items-start gap-2.5">
                        <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ background: product.color }} />
                        <span className="text-sm text-white/48 leading-snug" style={{ fontFamily: "Inter, sans-serif" }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 py-10 px-10 rounded-2xl border border-white/[0.07] bg-[#071528] relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 50% 80% at 100% 50%, ${product.color}07, transparent)` }} />
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Learn more about {product.name}</h2>
                <p className="text-white/38 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>See how {product.name} fits into the full DeepSense-powered platform.</p>
              </div>
              <div className="relative z-10 flex gap-3 flex-wrap">
                <button onClick={() => onNavigate("solutions")} className="flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all hover:-translate-y-0.5" style={{ background: product.color, fontFamily: "'Space Grotesk', sans-serif" }}>
                  Full platform <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={() => onNavigate("about")} className="flex items-center gap-2 border border-white/[0.12] hover:border-white/[0.24] text-white/50 hover:text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  About Trove-AI
                </button>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </ProductPageShell>
  );
}

// ─── DEEPSENSEIQ PAGE ────────────────────────────────────────────────────────

function DeepSenseIQPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const product = products.find((p) => p.id === "deepsenseiq")!;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const pipeline = [
    { stage: "Continuous, Multi-Route Intake", purpose: "File-based collections (documents, images, audio, video, archives) and continuous live camera or sensor feeds are both loaded into a controlled landing zone rather than opened directly." },
    { stage: "Threat Screening & Sandboxing", purpose: "Files are scanned for malware indicators, suspicious scripts, macros, executables, embedded objects, archive risks, and file-type mismatches. Live feeds are screened for integrity and anomalous signal." },
    { stage: "AI Enrichment", purpose: "Extracts text, metadata, entities, keywords, topics, transcripts, and image findings, converting both file collections and live-feed segments into structured, searchable information." },
    { stage: "Search, Query & Reporting", purpose: "Analysts search across file-based and live-feed-derived data together, ask natural-language questions, inspect source-backed evidence, and generate reports." },
  ];

  const verticals = [
    {
      name: "Government & Defense",
      color: "#1B6FE8",
      headline: "Offline edge intelligence for untrusted field data. No cloud required.",
      overview: "DeepSenseIQ provides offline edge intelligence and data triage for untrusted data collected in the field. Field and intelligence teams regularly receive file drops from thumb drives, captured devices, and field transfers, alongside continuous live feeds, often in secure or disconnected environments. The challenge is answering three questions quickly and safely: what is this data, what does it mean, and is it safe to use.",
      useCases: [
        { cat: "Field Data Triage", items: ["Screening data from thumb drives, captured devices, and field transfers", "Converting raw collections into structured, searchable information", "Quarantine and review workflow for flagged files"] },
        { cat: "Continuous Feed Triage", items: ["Ingesting live camera and sensor feeds at a forward site alongside file collections", "Flagging feed anomalies or gaps for review without continuous monitoring"] },
        { cat: "Disconnected Operations", items: ["Full intake, screening, enrichment, and search without internet connectivity", "Local evidence store and local audit logs", "CodeIQ dual-use: rapid vulnerability mapping in adversarial or captured code"] },
      ],
      finding: { severity: "Quarantined", location: "Field Collection 12, File 0447", body: "Extension mismatch detected: file declared as .docx but binary signature indicates an executable.", action: "Analyst should review in sandbox before release to enrichment." },
      deployments: [
        { tier: "Field / single device", hw: "Laptop or ruggedized workstation, fully local processing" },
        { tier: "Team or program", hw: "GPU-enabled edge kit for larger or more frequent collections" },
        { tier: "Air-gapped enclave", hw: "Fully disconnected deployment with local UI, models, search index, and audit logs" },
      ],
    },
    {
      name: "Critical Infrastructure & Utilities",
      color: "#10B981",
      headline: "Local triage for field-collected and live-feed data at remote and unmanned sites.",
      overview: "DeepSenseIQ processes data locally at a remote site, whether a field transfer or a live feed, before it enters the utility's broader systems. Paired with VellumGuard for secure transport between nodes and VisualIQ for camera-based monitoring of the same sites, it answers what the data is, what it means, and whether it is safe to bring into the network.",
      useCases: [
        { cat: "Field Crew Data Intake", items: ["Screening inspection photos, videos, and reports collected on site", "Converting raw field collections into structured, searchable records"] },
        { cat: "Remote Site Operations", items: ["Local processing at sites with intermittent or no connectivity", "Syncing cleared data and findings to central systems when connectivity resumes", "Drone and inspection imagery structuring for engineering review"] },
        { cat: "Secure Handoff", items: ["Screening vendor and firmware update files before deployment to field equipment", "Pairing with VellumGuard for secure node-to-node transport of cleared data"] },
      ],
      finding: { severity: "Flagged", location: "Substation 7 Firmware Update", body: "Embedded script detected in update package, inconsistent with standard firmware update structure.", action: "IT security review before deployment to field equipment." },
      deployments: [
        { tier: "Field technician device", hw: "Laptop or ruggedized device, local processing at the point of collection" },
        { tier: "Single remote site", hw: "GPU-enabled edge kit for ongoing inspection and maintenance data" },
        { tier: "Multi-site / regional", hw: "Aggregated edge deployment with secure sync to central systems via VellumGuard" },
      ],
    },
    {
      name: "Manufacturing",
      color: "#EC4899",
      headline: "Beyond camera feeds: triage every route data enters the plant.",
      overview: "DeepSenseIQ extends beyond VisualIQ's camera-based security and operational intelligence to triage every route data enters the plant: supplier file drops, engineering transfers, maintenance archives, quality documentation, and IoT or sensor exports, alongside live plant-floor feeds. Especially valuable where third-party supplier or vendor files introduce supply-chain risk.",
      useCases: [
        { cat: "Supplier & Vendor Intake", items: ["Screening incoming supplier files before they enter plant systems", "Flagging file-type mismatches and embedded risks in vendor data"] },
        { cat: "Plant-Floor Feed Triage", items: ["Ingesting live plant-floor camera feeds alongside file-based supplier and engineering data", "Structuring feed-derived findings into the same searchable index as document data"] },
        { cat: "Engineering & Maintenance Docs", items: ["Structuring engineering transfers and maintenance records for search", "Natural-language queries across plant-floor data, live or file-based"] },
      ],
      finding: { severity: "Quarantined", location: "Supplier Data Drop 22", body: "Embedded executable detected in a file declared as a specification document.", action: "Supply-chain security review before release to engineering systems." },
      deployments: [
        { tier: "Single vendor intake", hw: "Local workstation, processing at the point of intake" },
        { tier: "Single line / plant", hw: "GPU-enabled workstation or edge kit for ongoing documentation volume" },
        { tier: "Multi-plant", hw: "Aggregated deployment with centralized reporting across facilities" },
      ],
    },
  ];

  const faqs = [
    { q: "Does DeepSenseIQ require internet connectivity?", a: "No. It is designed to run fully offline, with local UI, models, search index, and audit logs." },
    { q: "Can this be used in classified or disconnected environments?", a: "Yes. Air-gapped deployment is a supported configuration, with all processing kept local to the enclave." },
    { q: "Does DeepSenseIQ replace intelligence analysts?", a: "No. It triages and structures data so analysts can review it faster. Analysts still make every judgment about meaning and next steps." },
    { q: "How is this different from VisualIQ?", a: "VisualIQ analyzes live camera feeds for security and operational events. DeepSenseIQ triages files and data collected in the field, including inspection photos, firmware updates, and maintenance records, whether or not a camera was involved." },
    { q: "How does it work at sites with intermittent connectivity?", a: "DeepSenseIQ processes data locally at the site. Cleared data and findings can sync to central systems, optionally through VellumGuard, when connectivity allows." },
  ];

  return (
    <ProductPageShell product={product} onNavigate={onNavigate}>
      <section className="py-16 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-white/42" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Core Architecture</span>
              <div className="flex-1 h-px bg-white/[0.05]" />
            </div>
            <p className="text-white/38 text-sm max-w-2xl mb-8 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
              A four-stage pipeline applied to every route, whether data arrives as a file drop or a continuous live feed.
            </p>
          </FadeUp>
          <div className="border border-white/[0.07] rounded-2xl overflow-hidden">
            {pipeline.map((row, i) => (
              <FadeUp key={row.stage} delay={i * 0.04}>
                <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] border-b border-white/[0.06] last:border-b-0 hover:bg-white/[0.02] transition-colors">
                  <div className="px-6 py-4 md:border-r border-white/[0.06] flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: product.color }} />
                    <span className="text-sm font-semibold text-white/70" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{row.stage}</span>
                  </div>
                  <div className="px-6 py-4">
                    <span className="text-sm text-white/40 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{row.purpose}</span>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {verticals.map((v) => (
        <section key={v.name} className="py-16 border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6">
            <FadeUp>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full" style={{ background: `${v.color}15`, color: v.color, fontFamily: "'Space Grotesk', sans-serif" }}>{v.name}</span>
                <div className="flex-1 h-px bg-white/[0.05]" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{v.headline}</h2>
              <p className="text-white/38 text-sm leading-relaxed max-w-3xl mb-10" style={{ fontFamily: "Inter, sans-serif" }}>{v.overview}</p>
            </FadeUp>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <FadeUp delay={0.05}>
                <div className="space-y-3">
                  {v.useCases.map((uc) => (
                    <div key={uc.cat} className="bg-[#071528] rounded-xl border border-white/[0.07] p-5">
                      <p className="text-[10px] font-bold tracking-widest uppercase mb-3" style={{ color: v.color, fontFamily: "'Space Grotesk', sans-serif" }}>{uc.cat}</p>
                      <div className="space-y-2">
                        {uc.items.map((item) => (
                          <div key={item} className="flex items-start gap-2.5">
                            <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ background: v.color }} />
                            <span className="text-sm text-white/50" style={{ fontFamily: "Inter, sans-serif" }}>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </FadeUp>
              <FadeUp delay={0.1}>
                <div className="space-y-3">
                  <div className="bg-[#071528] rounded-xl border border-white/[0.07] p-5">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-white/42 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Sample Finding</p>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ background: v.finding.severity === "Quarantined" ? "rgba(239,68,68,0.15)" : "rgba(249,115,22,0.15)", color: v.finding.severity === "Quarantined" ? "#EF4444" : "#F97316", fontFamily: "'Space Grotesk', sans-serif" }}>{v.finding.severity}</span>
                      <span className="text-[11px] text-white/38" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{v.finding.location}</span>
                    </div>
                    <p className="text-sm text-white/50 leading-relaxed mb-2" style={{ fontFamily: "Inter, sans-serif" }}>{v.finding.body}</p>
                    <p className="text-xs text-white/42 border-t border-white/[0.05] pt-2" style={{ fontFamily: "Inter, sans-serif" }}>Recommended: {v.finding.action}</p>
                  </div>
                  <div className="bg-[#071528] rounded-xl border border-white/[0.07] overflow-hidden">
                    <div className="px-5 py-3 border-b border-white/[0.06]">
                      <p className="text-[10px] font-bold tracking-widest uppercase text-white/42" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Deployment Tiers</p>
                    </div>
                    {v.deployments.map((d, di) => (
                      <div key={d.tier} className={`px-5 py-3 ${di < v.deployments.length - 1 ? "border-b border-white/[0.05]" : ""}`}>
                        <div className="flex items-baseline justify-between mb-0.5">
                          <span className="text-xs font-semibold text-white/65" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{d.tier}</span>
                        </div>
                        <span className="text-[11px] text-white/42" style={{ fontFamily: "Inter, sans-serif" }}>{d.hw}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>
      ))}

      <section className="py-14 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-white/42" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Responsible AI</span>
              <div className="flex-1 h-px bg-white/[0.05]" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {["Screens and enriches data, no automated intelligence assessments", "Human review required before any flagged file is released", "Local processing keeps untrusted data off the cloud", "Retention follows the program's existing records policy"].map((item) => (
                <div key={item} className="flex items-start gap-2.5 bg-[#071528] rounded-xl p-4 border border-white/[0.06]">
                  <Check className="w-3.5 h-3.5 text-[#10B981] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-white/48 leading-snug" style={{ fontFamily: "Inter, sans-serif" }}>{item}</span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="py-14 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-white/42" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>FAQ</span>
              <div className="flex-1 h-px bg-white/[0.05]" />
            </div>
          </FadeUp>
          <div className="max-w-3xl space-y-2">
            {faqs.map((faq, i) => (
              <FadeUp key={faq.q} delay={i * 0.04}>
                <div className="border border-white/[0.07] rounded-xl overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/[0.03] transition-colors">
                    <span className="text-sm font-semibold text-white/80 pr-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{faq.q}</span>
                    <span className="text-white/42 flex-shrink-0 text-lg leading-none">{openFaq === i ? "×" : "+"}</span>
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 border-t border-white/[0.05]">
                      <p className="text-sm text-white/42 leading-relaxed pt-3" style={{ fontFamily: "Inter, sans-serif" }}>{faq.a}</p>
                    </div>
                  )}
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 py-10 px-10 rounded-2xl border border-white/[0.07] bg-[#071528] relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 50% 80% at 100% 50%, ${product.color}07, transparent)` }} />
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Deploy DeepSenseIQ at the edge</h2>
                <p className="text-white/38 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>No cloud required. Fully local processing from field device to air-gapped enclave.</p>
              </div>
              <div className="relative z-10 flex gap-3 flex-wrap">
                <button onClick={() => onNavigate("solutions")} className="flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all hover:-translate-y-0.5" style={{ background: product.color, fontFamily: "'Space Grotesk', sans-serif" }}>
                  Full platform <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={() => onNavigate("industries")} className="flex items-center gap-2 border border-white/[0.12] hover:border-white/[0.24] text-white/50 hover:text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Browse industries
                </button>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </ProductPageShell>
  );
}

// ─── CAREIQ PAGE ──────────────────────────────────────────────────────────────

function CareIQPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const product = products.find((p) => p.id === "careiq")!;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const pipeline = [
    { stage: "Camera / NVR ingest", purpose: "Connects to RTSP streams, NVR-restreamed video, and existing IP cameras already installed on site." },
    { stage: "Frame sampling", purpose: "Processes small frames at low FPS by default to keep latency and compute cost low across many rooms or zones." },
    { stage: "Lightweight detection", purpose: "Detects people, groups, vehicles, bags, and basic object/scene candidates relevant to care-specific rules." },
    { stage: "Tracking & zone engine", purpose: "Maintains presence and count over time for ratio, dwell-time, and zone-crossing logic. Applies room schedules and zone definitions." },
    { stage: "Care-specific rule engine", purpose: "Turns detections into context-specific events: supervision ratios, restricted-area access, schedule-based thresholds." },
    { stage: "Event & alert layer", purpose: "Stores events, evidence clips, status, and alert delivery data for director, nurse, or staff review." },
    { stage: "Dashboard", purpose: "Shows zone status, recent alerts, event detail, thumbnails, and clips with recommended action." },
  ];

  const verticals = [
    {
      name: "Childcare & Development Centers",
      color: "#8B5CF6",
      headline: "Continuous supervision monitoring using cameras already installed on site.",
      overview: "CareIQ gives childcare and development centers continuous behavioral monitoring with no hardware replacement required. Built on VisualIQ's visual analytics foundation with childcare expert guidance, CareIQ watches continuously so a director does not have to review every camera all day, escalating only events that match center-specific configured rules: supervision ratios, pickup-zone crowding, and restricted-room access.",
      useCases: [
        { cat: "Supervision & Ratio", items: ["Zero-adult-presence detection in occupied rooms", "Ratio-threshold alerts during instruction windows", "Naptime motion anomalies"] },
        { cat: "Pickup & Drop-off Safety", items: ["Crowd buildup at dismissal", "Lingering in pickup zones", "Unusual movement near entry points"] },
        { cat: "Restricted Area Protection", items: ["Medication room access outside staff hours", "Kitchen access outside meal prep windows", "After-hours building access"] },
      ],
      alert: { severity: "Critical", location: "Toddler Room 3", body: "No adult presence detected in an occupied classroom for over 90 seconds.", action: "Director should verify immediately." },
      deployments: [
        { tier: "Pilot", cameras: "1–5 cameras", hw: "GPU laptop or workstation" },
        { tier: "Single center", cameras: "5–20 cameras", hw: "Single GPU workstation, ratio and access rules" },
        { tier: "Multi-room / multi-building", cameras: "20–50 cameras", hw: "Higher-end workstation or small server, adaptive FPS" },
      ],
    },
    {
      name: "K-12 Schools",
      color: "#F59E0B",
      headline: "Campus-wide behavioral safety monitoring centered on child protection.",
      overview: "CareIQ gives K-12 schools campus-wide behavioral safety monitoring. A school campus has far more cameras than any administrator or SRO can watch continuously. CareIQ applies school-tuned models to flag events worth a look, such as an unrecognized entry pattern during class hours or a hallway crowd forming outside a scheduled passing period. DeepSenseIQ is available for districts needing full-campus coverage.",
      useCases: [
        { cat: "Perimeter & Entry", items: ["Unauthorized door use outside bell schedule", "Tailgating patterns at controlled entrances", "After-hours access detection"] },
        { cat: "Hallway & Common Areas", items: ["Crowd buildup outside scheduled class-change periods", "Loitering outside bell schedule windows"] },
        { cat: "Parking & Dismissal", items: ["Vehicle lingering past configured dismissal window", "Crowd concentration at pickup lanes"] },
      ],
      alert: { severity: "Watch", location: "East Entrance", body: "Door opened outside scheduled passing period.", action: "SRO or front-office staff should confirm authorized entry." },
      deployments: [
        { tier: "Pilot", cameras: "1–20 cameras", hw: "GPU workstation, basic alerts" },
        { tier: "Single school", cameras: "20–50 cameras", hw: "Higher-end workstation or small server" },
        { tier: "Multi-building campus", cameras: "50–200 cameras", hw: "DGX-class or multi-GPU server, adaptive scheduling" },
      ],
    },
    {
      name: "Healthcare Facilities",
      color: "#06B6D4",
      headline: "Vulnerable-population monitoring across NICU, pediatric, and clinical units.",
      overview: "CareIQ supports patient and staff safety monitoring in healthcare facilities, with particular focus on vulnerable-population settings such as NICU and pediatric units. Vulnerable patients often cannot advocate for themselves, and unit staff cannot watch every room continuously. CareIQ flags fall candidates and restricted-area entries so nursing staff get an early, reviewable alert. Behavioral and safety monitoring only, not health-records data.",
      useCases: [
        { cat: "Vulnerable-Population Monitoring", items: ["NICU and pediatric unit behavioral safety", "Fall candidate and person-down detection", "Elevated mobility-risk movement candidates"] },
        { cat: "Restricted Area Protection", items: ["Medication room access outside authorized windows", "Unit access control and after-hours entry", "Unusual dwell near restricted rooms"] },
        { cat: "Facility Operations", items: ["Camera health across clinical units", "Shift-change and visiting-hour schedule awareness"] },
      ],
      alert: { severity: "Critical", location: "Pediatric Unit Hallway 2", body: "Fall candidate detected. Evidence: 20-second clip available.", action: "Nursing staff should verify immediately." },
      deployments: [
        { tier: "Pilot", cameras: "1–5 cameras", hw: "GPU laptop or workstation, low FPS sampling" },
        { tier: "Single unit", cameras: "5–20 cameras", hw: "Single GPU workstation, fall and access rules" },
        { tier: "Multi-unit facility", cameras: "20–50 cameras", hw: "Higher-end workstation or small server, adaptive FPS" },
        { tier: "Multi-building health system", cameras: "50–200 cameras", hw: "DGX-class or multi-GPU server, adaptive scheduling" },
      ],
    },
    {
      name: "Religious Campuses",
      color: "#10B981",
      headline: "Children's ministry safety monitoring with full-campus coverage via DeepSenseIQ.",
      overview: "CareIQ helps churches turn existing cameras into a real-time care and safety system centered on children's ministry, built with childcare expert guidance. It watches for church-specific concerns such as after-hours movement, restricted-area entry, and lingering near children's areas, and alerts staff with clear, reviewable evidence. DeepSenseIQ is available alongside it for congregations that need full-campus security coverage beyond the children's wing.",
      useCases: [
        { cat: "Children's Ministry Safety", items: ["Person entering children's wing after check-in closes", "Adult lingering near nursery or classroom doorway", "Movement in children's hallway after program ends"] },
        { cat: "After-Hours Awareness", items: ["Person detected inside after hours", "Movement near offering room or restricted office areas", "Vehicle lingering in parking lot after hours"] },
        { cat: "Facility Operations", items: ["Camera offline or blocked alerts", "Activity in storage or maintenance areas"] },
      ],
      alert: { severity: "Warning", location: "Nursery Hallway", body: "A person has remained near the nursery hallway for more than 2 minutes after check-in closed.", action: "Review and notify children's ministry lead if needed." },
      deployments: [
        { tier: "Pilot", cameras: "1–5 cameras", hw: "GPU laptop or workstation, low FPS sampling" },
        { tier: "Small church", cameras: "5–20 cameras", hw: "Single GPU workstation, person/vehicle/bag detection" },
        { tier: "Medium church / school campus", cameras: "20–50 cameras", hw: "Higher-end GPU workstation or small server, adaptive FPS" },
        { tier: "Large / multi-building campus", cameras: "50–200 cameras", hw: "DGX-class or multi-GPU server, adaptive scheduling" },
      ],
    },
    {
      name: "Hospitality & Resorts",
      color: "#F97316",
      headline: "Vulnerable-guest monitoring for pools, kids' clubs, and family resort properties.",
      overview: "CareIQ supports hospitality properties and family resorts with vulnerable-guest monitoring, delivered alongside DeepSenseIQ, which triages the rest of the property's operational and security data. Family resorts carry specific safety concerns around pools and water features, children's club areas, and guests who may need help but are not being actively watched at that moment. CareIQ is the early awareness layer for those moments.",
      useCases: [
        { cat: "Pool & Water Safety", items: ["Possible distress detection in pools and water features", "Unattended child detection near water", "Motionless-in-water pattern alerts"] },
        { cat: "Children's Area Safety", items: ["Kids'-club zone monitoring during and outside program hours", "Unattended-child alerts near restricted areas"] },
        { cat: "Vulnerable Guest Wellbeing", items: ["Wandering or disoriented movement pattern flags for staff follow-up"] },
      ],
      alert: { severity: "Critical", location: "Main Pool Zone", body: "A person has been motionless in the water for over 20 seconds, a pattern consistent with possible distress.", action: "Lifeguard or staff should respond immediately." },
      deployments: [
        { tier: "Single property", cameras: "10–30 cameras", hw: "GPU workstation, pool and kids'-club rules" },
        { tier: "Resort campus", cameras: "30–100 cameras", hw: "Higher-end workstation or small server, adaptive FPS" },
        { tier: "Multi-property group", cameras: "100+ cameras", hw: "Multi-GPU server, adaptive scheduling" },
      ],
    },
  ];

  const faqs = [
    { q: "Does CareIQ replace existing staff or safety officers?", a: "No. CareIQ is an early awareness layer. Directors, SROs, nurses, lifeguards, and volunteers still verify and act on every alert." },
    { q: "Does CareIQ require new cameras?", a: "No. It runs on cameras already installed on site: RTSP streams, NVR-restreamed video, and existing IP cameras." },
    { q: "Can CareIQ identify specific individuals by name?", a: "Not in its current form. It detects patterns, presence, and zone activity, not individual identity." },
    { q: "Is this a weapons-detection system?", a: "No, CareIQ does not claim reliable weapon detection in its current form." },
    { q: "Does CareIQ access or store patient health records?", a: "No. CareIQ is a behavioral and facility-safety monitoring layer built on camera data, and does not touch clinical or health-records systems." },
    { q: "How does it extend to a full campus or full property?", a: "DeepSenseIQ is available to extend coverage beyond CareIQ's care-specific models, with full-campus coverage for schools and churches and full-property coverage for hospitality. Both run on the same camera infrastructure and bundle at $40–$75 per camera per month." },
  ];

  return (
    <ProductPageShell product={product} onNavigate={onNavigate}>
      <section className="py-16 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-white/42" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Core Architecture</span>
              <div className="flex-1 h-px bg-white/[0.05]" />
            </div>
            <p className="text-white/38 text-sm max-w-2xl mb-8 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
              Built on VisualIQ's visual analytics foundation, CareIQ adds a care-specific rule engine that understands schedules, ratios, and zone context rather than reporting raw detections.
            </p>
          </FadeUp>
          <div className="border border-white/[0.07] rounded-2xl overflow-hidden">
            {pipeline.map((row, i) => (
              <FadeUp key={row.stage} delay={i * 0.03}>
                <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] border-b border-white/[0.06] last:border-b-0 hover:bg-white/[0.02] transition-colors">
                  <div className="px-6 py-4 md:border-r border-white/[0.06] flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: product.color }} />
                    <span className="text-sm font-semibold text-white/70" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{row.stage}</span>
                  </div>
                  <div className="px-6 py-4">
                    <span className="text-sm text-white/40 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{row.purpose}</span>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {verticals.map((v) => (
        <section key={v.name} className="py-16 border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6">
            <FadeUp>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full" style={{ background: `${v.color}15`, color: v.color, fontFamily: "'Space Grotesk', sans-serif" }}>{v.name}</span>
                <div className="flex-1 h-px bg-white/[0.05]" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{v.headline}</h2>
              <p className="text-white/38 text-sm leading-relaxed max-w-3xl mb-10" style={{ fontFamily: "Inter, sans-serif" }}>{v.overview}</p>
            </FadeUp>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <FadeUp delay={0.05}>
                <div className="space-y-3">
                  {v.useCases.map((uc) => (
                    <div key={uc.cat} className="bg-[#071528] rounded-xl border border-white/[0.07] p-5">
                      <p className="text-[10px] font-bold tracking-widest uppercase mb-3" style={{ color: v.color, fontFamily: "'Space Grotesk', sans-serif" }}>{uc.cat}</p>
                      <div className="space-y-2">
                        {uc.items.map((item) => (
                          <div key={item} className="flex items-start gap-2.5">
                            <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ background: v.color }} />
                            <span className="text-sm text-white/50" style={{ fontFamily: "Inter, sans-serif" }}>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </FadeUp>
              <FadeUp delay={0.1}>
                <div className="space-y-3">
                  <div className="bg-[#071528] rounded-xl border border-white/[0.07] p-5">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-white/42 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Sample Alert</p>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ background: v.alert.severity === "Critical" ? "rgba(239,68,68,0.15)" : v.alert.severity === "Warning" ? "rgba(249,115,22,0.15)" : "rgba(234,179,8,0.15)", color: v.alert.severity === "Critical" ? "#EF4444" : v.alert.severity === "Warning" ? "#F97316" : "#EAB308", fontFamily: "'Space Grotesk', sans-serif" }}>{v.alert.severity}</span>
                      <span className="text-[11px] text-white/38" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{v.alert.location}</span>
                    </div>
                    <p className="text-sm text-white/50 leading-relaxed mb-2" style={{ fontFamily: "Inter, sans-serif" }}>{v.alert.body}</p>
                    <p className="text-xs text-white/42 border-t border-white/[0.05] pt-2" style={{ fontFamily: "Inter, sans-serif" }}>Recommended: {v.alert.action}</p>
                  </div>
                  <div className="bg-[#071528] rounded-xl border border-white/[0.07] overflow-hidden">
                    <div className="px-5 py-3 border-b border-white/[0.06]">
                      <p className="text-[10px] font-bold tracking-widest uppercase text-white/42" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Deployment Tiers</p>
                    </div>
                    {v.deployments.map((d, di) => (
                      <div key={d.tier} className={`px-5 py-3 ${di < v.deployments.length - 1 ? "border-b border-white/[0.05]" : ""}`}>
                        <div className="flex items-baseline justify-between mb-0.5">
                          <span className="text-xs font-semibold text-white/65" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{d.tier}</span>
                          <span className="text-[11px]" style={{ color: v.color, fontFamily: "'JetBrains Mono', monospace" }}>{d.cameras}</span>
                        </div>
                        <span className="text-[11px] text-white/42" style={{ fontFamily: "Inter, sans-serif" }}>{d.hw}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>
      ))}

      <section className="py-14 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-white/42" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Privacy & Responsible AI</span>
              <div className="flex-1 h-px bg-white/[0.05]" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {["No facial recognition in MVP", "No individual identity matching", "No child identification", "Local-first processing where possible", "Short event clips, no constant cloud upload", "Human review before escalation", "False-positive feedback loop", "Clear retention policy"].map((item) => (
                <div key={item} className="flex items-start gap-2.5 bg-[#071528] rounded-xl p-4 border border-white/[0.06]">
                  <Check className="w-3.5 h-3.5 text-[#10B981] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-white/48 leading-snug" style={{ fontFamily: "Inter, sans-serif" }}>{item}</span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="py-14 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-white/42" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>FAQ</span>
              <div className="flex-1 h-px bg-white/[0.05]" />
            </div>
          </FadeUp>
          <div className="max-w-3xl space-y-2">
            {faqs.map((faq, i) => (
              <FadeUp key={faq.q} delay={i * 0.04}>
                <div className="border border-white/[0.07] rounded-xl overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/[0.03] transition-colors">
                    <span className="text-sm font-semibold text-white/80 pr-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{faq.q}</span>
                    <span className="text-white/42 flex-shrink-0 text-lg leading-none">{openFaq === i ? "×" : "+"}</span>
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 border-t border-white/[0.05]">
                      <p className="text-sm text-white/42 leading-relaxed pt-3" style={{ fontFamily: "Inter, sans-serif" }}>{faq.a}</p>
                    </div>
                  )}
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 py-10 px-10 rounded-2xl border border-white/[0.07] bg-[#071528] relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 50% 80% at 100% 50%, ${product.color}07, transparent)` }} />
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Protect vulnerable populations with CareIQ</h2>
                <p className="text-white/38 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>No hardware replacement. Runs on existing cameras from day one. $40–$75 per camera per month with DeepSenseIQ bundle.</p>
              </div>
              <div className="relative z-10 flex gap-3 flex-wrap">
                <button onClick={() => onNavigate("solutions")} className="flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all hover:-translate-y-0.5" style={{ background: product.color, fontFamily: "'Space Grotesk', sans-serif" }}>
                  Full platform <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={() => onNavigate("industries")} className="flex items-center gap-2 border border-white/[0.12] hover:border-white/[0.24] text-white/50 hover:text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Browse industries
                </button>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </ProductPageShell>
  );
}

// ─── CYBERIQ PAGE ────────────────────────────────────────────────────────────

function CyberIQPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const product = products.find((p) => p.id === "cyberiq")!;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const modules = [
    { name: "CodeIQ", label: "Code Intelligence", purpose: "Reads source code and repositories to find vulnerabilities, unsafe patterns, and exposed secrets before deployment. Also supports rapid vulnerability mapping in adversarial or captured code (Gov & Defense)." },
    { name: "LogIQ", label: "System Intelligence", purpose: "Reads system and application logs to detect anomalous behavior, brute-force attempts, unauthorized access, and audit-trail anomalies. Leads for Financial Services and Healthcare IT." },
    { name: "NetworkIQ", label: "Network Intelligence", purpose: "Reads packets and connections to detect intrusions, lateral movement, and abnormal traffic patterns. Available as firms extend beyond code and log coverage." },
    { name: "Correlation Engine", label: "Cross-Layer Intelligence", purpose: "Connects code-level findings to log-level detection rules and network-level signals so a single vulnerability or anomaly is understood in full context rather than in isolation." },
  ];

  const verticals = [
    {
      name: "Financial Services",
      color: "#F97316",
      headline: "Stop breaches at the source by securing code before it ships and detecting anomalies as they happen.",
      overview: "CyberIQ helps financial services firms secure customer-facing APIs, core banking systems, and the dense compliance surface of PCI-DSS, SOX, and GLBA. CodeIQ and LogIQ lead the deployment. NetworkIQ is available as firms extend into network-layer detection. Findings are explained in plain language, not as raw rule violations, and mapped to applicable compliance frameworks, paired with a specific recommended fix.",
      useCases: [
        { cat: "Secure API & Application Dev", items: ["SQL injection and unsafe-query detection before deployment", "Insecure credential handling in customer-facing services", "Vulnerable or outdated third-party dependency detection"] },
        { cat: "Fraud-Adjacent Anomaly Detection", items: ["Unusual account-access patterns in logs", "Privilege escalation and insider-threat indicators", "Correlation between code changes and post-deployment access anomalies"] },
        { cat: "Compliance Mapping", items: ["PCI-DSS: secure coding and access-logging for cardholder data environments", "SOX: change-control and audit-trail relevant findings", "GLBA: customer financial information safeguarding across code and logs"] },
      ],
      finding: { severity: "Critical", location: "Customer Search Service", body: "Potential SQL injection vulnerability detected in a query against customer account data. Recommendation: replace string concatenation with parameterized queries.", action: "Suggested secure implementation attached. Engineering team should review before next release." },
    },
    {
      name: "Government & Defense",
      color: "#1B6FE8",
      headline: "Air-gapped mission software assurance, with dual-use adversarial code intelligence.",
      overview: "CyberIQ is proving out in the hardest environments first: defense and intelligence community customers who need air-gapped deployment and adversarial code analysis. CodeIQ, LogIQ, and NetworkIQ all support disconnected or classified-network operation. CodeIQ's dual-use design also supports rapid vulnerability mapping in adversarial or nation-state code samples, a capability with no direct commercial equivalent.",
      useCases: [
        { cat: "Mission Software Assurance", items: ["Evaluating mission software against organizational security standards", "Generating review artifacts to support software assurance initiatives", "Identifying common software weaknesses before deployment"] },
        { cat: "Dual-Use Code Intelligence", items: ["Defensive scanning of a program's own codebase before it ships", "Rapid vulnerability mapping in adversarial or nation-state code samples"] },
        { cat: "Air-Gapped Operations", items: ["Full CodeIQ, LogIQ, and NetworkIQ operation without internet connectivity", "Evidence and findings retained locally within the enclave", "NIST 800-53 and RMF findings mapping for program authorization support"] },
      ],
      finding: { severity: "Critical", location: "Mission Component Alpha", body: "Unauthenticated input path detected into a component handling mission-critical data. Recommendation: add authentication and input validation prior to next release candidate.", action: "Program security team should review before next release candidate." },
    },
    {
      name: "Healthcare IT",
      color: "#06B6D4",
      headline: "Catch ransomware early, flag unauthorized EHR access, and secure patient-facing apps.",
      overview: "CyberIQ is available for healthcare IT teams, with LogIQ and NetworkIQ leading for compliance and ransomware-defense use cases. This is distinct from CareIQ, which addresses physical patient safety. CyberIQ addresses the IT security and compliance layer behind electronic health records, patient portals, and connected medical devices, covering the specific combination of ransomware exposure, EHR audit requirements, and expanding device attack surface.",
      useCases: [
        { cat: "Ransomware Early Detection", items: ["Lateral-movement pattern detection across the clinical network", "Correlated log and network findings for faster containment decisions"] },
        { cat: "EHR Access Compliance", items: ["Unauthorized or unusual access-pattern detection against assigned care responsibilities", "Audit-trail-relevant findings to support HIPAA Security Rule review"] },
        { cat: "Connected Medical Device Monitoring", items: ["Baseline network behavior for connected devices", "Anomaly detection without disrupting device operation"] },
      ],
      finding: { severity: "Critical", location: "Clinical Network Segment 4", body: "Lateral-movement pattern consistent with early-stage ransomware behavior detected. Recommendation: isolate affected segment pending IT security review.", action: "IT security team should review and consider segment isolation immediately." },
    },
  ];

  const faqs = [
    { q: "Does CyberIQ replace our SOC or compliance team?", a: "No. CyberIQ surfaces explained, prioritized findings. Security engineers and compliance teams still make every remediation and reporting decision." },
    { q: "Can CyberIQ certify us as PCI-DSS, SOX, or HIPAA compliant?", a: "No. CyberIQ maps relevant findings to these frameworks to support a firm's own compliance process. It does not issue certifications." },
    { q: "Does CyberIQ require replacing our existing SIEM or CI/CD tooling?", a: "No. CyberIQ integrates into Visual Studio Code, existing CI/CD pipelines, and existing log and network infrastructure." },
    { q: "Can CyberIQ run fully disconnected from the internet?", a: "Yes. Air-gapped deployment is a first-class supported configuration for defense and intelligence community environments." },
    { q: "Does CyberIQ's adversarial code analysis mean it performs offensive actions?", a: "No. CodeIQ maps vulnerabilities in adversarial or captured code samples for intelligence purposes. It does not take autonomous offensive action." },
    { q: "Is this the same as CareIQ for healthcare?", a: "No. CareIQ addresses physical patient and staff safety through camera-based behavioral monitoring. CyberIQ addresses IT security: EHR access patterns, network behavior, and application code." },
  ];

  return (
    <ProductPageShell product={product} onNavigate={onNavigate}>
      <section className="py-16 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-white/42" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Three Modules, One Engine</span>
              <div className="flex-1 h-px bg-white/[0.05]" />
            </div>
            <p className="text-white/38 text-sm max-w-2xl mb-8 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
              Source code, logs, and network traffic feed three modules simultaneously. A correlation layer connects findings across all three so a single vulnerability or anomaly is understood in full context.
            </p>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modules.map((mod, i) => (
              <FadeUp key={mod.name} delay={i * 0.06}>
                <div className="bg-[#071528] border border-white/[0.07] rounded-2xl p-6" style={{ borderTop: `2px solid ${product.color}40` }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-base font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{mod.name}</span>
                    <span className="text-[10px] font-medium text-white/42 px-2 py-0.5 rounded-full bg-white/[0.05]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{mod.label}</span>
                  </div>
                  <p className="text-sm text-white/45 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{mod.purpose}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {verticals.map((v) => (
        <section key={v.name} className="py-16 border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6">
            <FadeUp>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full" style={{ background: `${v.color}15`, color: v.color, fontFamily: "'Space Grotesk', sans-serif" }}>{v.name}</span>
                <div className="flex-1 h-px bg-white/[0.05]" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{v.headline}</h2>
              <p className="text-white/38 text-sm leading-relaxed max-w-3xl mb-10" style={{ fontFamily: "Inter, sans-serif" }}>{v.overview}</p>
            </FadeUp>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <FadeUp delay={0.05}>
                <div className="space-y-3">
                  {v.useCases.map((uc) => (
                    <div key={uc.cat} className="bg-[#071528] rounded-xl border border-white/[0.07] p-5">
                      <p className="text-[10px] font-bold tracking-widest uppercase mb-3" style={{ color: v.color, fontFamily: "'Space Grotesk', sans-serif" }}>{uc.cat}</p>
                      <div className="space-y-2">
                        {uc.items.map((item) => (
                          <div key={item} className="flex items-start gap-2.5">
                            <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ background: v.color }} />
                            <span className="text-sm text-white/50" style={{ fontFamily: "Inter, sans-serif" }}>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </FadeUp>
              <FadeUp delay={0.1}>
                <div className="bg-[#071528] rounded-xl border border-white/[0.07] p-5 h-full">
                  <p className="text-[10px] font-bold tracking-widest uppercase text-white/42 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Sample Finding</p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-500/15 text-red-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{v.finding.severity}</span>
                    <span className="text-[11px] text-white/38" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{v.finding.location}</span>
                  </div>
                  <p className="text-sm text-white/50 leading-relaxed mb-2" style={{ fontFamily: "Inter, sans-serif" }}>{v.finding.body}</p>
                  <p className="text-xs text-white/42 border-t border-white/[0.05] pt-2" style={{ fontFamily: "Inter, sans-serif" }}>{v.finding.action}</p>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>
      ))}

      <section className="py-14 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-white/42" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Responsible AI</span>
              <div className="flex-1 h-px bg-white/[0.05]" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {["Analyzes code, logs, and network metadata, not customer account contents directly", "No autonomous remediation action in production without human approval", "Access to findings follows the firm's existing role-based access controls", "Air-gapped deployment keeps analysis fully disconnected where required"].map((item) => (
                <div key={item} className="flex items-start gap-2.5 bg-[#071528] rounded-xl p-4 border border-white/[0.06]">
                  <Check className="w-3.5 h-3.5 text-[#10B981] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-white/48 leading-snug" style={{ fontFamily: "Inter, sans-serif" }}>{item}</span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="py-14 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-white/42" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>FAQ</span>
              <div className="flex-1 h-px bg-white/[0.05]" />
            </div>
          </FadeUp>
          <div className="max-w-3xl space-y-2">
            {faqs.map((faq, i) => (
              <FadeUp key={faq.q} delay={i * 0.04}>
                <div className="border border-white/[0.07] rounded-xl overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/[0.03] transition-colors">
                    <span className="text-sm font-semibold text-white/80 pr-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{faq.q}</span>
                    <span className="text-white/42 flex-shrink-0 text-lg leading-none">{openFaq === i ? "×" : "+"}</span>
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 border-t border-white/[0.05]">
                      <p className="text-sm text-white/42 leading-relaxed pt-3" style={{ fontFamily: "Inter, sans-serif" }}>{faq.a}</p>
                    </div>
                  )}
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 py-10 px-10 rounded-2xl border border-white/[0.07] bg-[#071528] relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 50% 80% at 100% 50%, ${product.color}07, transparent)` }} />
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Deploy CyberIQ across your stack</h2>
                <p className="text-white/38 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>Integrates into your existing IDE, CI/CD pipeline, and SIEM infrastructure. No rebuild required.</p>
              </div>
              <div className="relative z-10 flex gap-3 flex-wrap">
                <button onClick={() => onNavigate("solutions")} className="flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all hover:-translate-y-0.5" style={{ background: product.color, fontFamily: "'Space Grotesk', sans-serif" }}>
                  Full platform <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={() => onNavigate("industries")} className="flex items-center gap-2 border border-white/[0.12] hover:border-white/[0.24] text-white/50 hover:text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Browse industries
                </button>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </ProductPageShell>
  );
}

// ─── VELLUMGUARD PAGE ────────────────────────────────────────────────────────

function VellumGuardPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const product = products.find((p) => p.id === "vellumguard")!;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const trustStages = [
    { stage: "Enroll the Node", purpose: "Authorized administrators enroll approved devices, including laptops, edge servers, mission devices, and application endpoints, into the VellumGuard environment." },
    { stage: "Authenticate & Authorize", purpose: "Each node must prove its identity and receive policy authorization before it can communicate with another node." },
    { stage: "Exchange Securely", purpose: "Approved nodes exchange encrypted messages, files, and structured payloads directly with one another." },
    { stage: "Audit & Govern", purpose: "VellumGuard records delivery status, policy decisions, node health, errors, and revocation events for every exchange." },
  ];

  const verticals = [
    {
      name: "Government & Defense",
      color: "#1B6FE8",
      headline: "Zero-trust node-to-node communications for mission devices and field teams.",
      overview: "VellumGuard is Trove-AI's secure communications layer for controlled exchange between trusted edge nodes, without opening broad network access. In mission environments, laptops, edge servers, mission devices, and application endpoints need to move messages, files, and structured data securely, without giving every device broad network access, relying on a full enterprise collaboration suite, or depending on constant connectivity.",
      useCases: [
        { cat: "Mission Device Exchange", items: ["Secure messaging and file transfer between laptops, edge servers, and mission devices", "No broad network access required for either party"] },
        { cat: "Field Team Coordination", items: ["Structured data exchange between field teams and command systems", "Narrower footprint than a traditional VPN", "Local queueing and automatic retry on reconnect"] },
        { cat: "IQ-Family Secure Handoff", items: ["Moving cleared data, alerts, or evidence between VisualIQ or DeepSenseIQ nodes and central systems", "Policy-governed exchange rather than open network access", "Immediate revocation of a compromised or lost device's access"] },
      ],
      governance: { status: "Revoked", node: "Node MD-1147", body: "Credentials revoked following device loss report. All pending exchange attempts blocked and logged.", action: "Reviewed by program security officer." },
      deployments: [
        { tier: "Pilot", scope: "A handful of nodes within a single unit or team" },
        { tier: "Program-level", scope: "Nodes across a program's devices, servers, and application endpoints" },
        { tier: "Theater or enclave-wide", scope: "Nodes across a deployed environment spanning multiple units or locations" },
      ],
    },
    {
      name: "Critical Infrastructure & Utilities",
      color: "#10B981",
      headline: "Secure transport between remote sites and central systems, designed for intermittent connectivity.",
      overview: "VellumGuard provides secure node-to-node communication for distributed infrastructure sites with intermittent connectivity. Often paired with DeepSenseIQ, which triages field-collected and live-feed data at the edge, and VisualIQ, which monitors site cameras. VellumGuard is the layer that moves resulting alerts, evidence, and structured data between sites and central systems securely.",
      useCases: [
        { cat: "Field Crew to Central Handoff", items: ["Secure transport of inspection data and structured payloads from field devices to central operations", "No broad network access granted to field devices"] },
        { cat: "Remote Site Coordination", items: ["Node-to-node exchange between remote sites and regional or central systems", "Local queueing during connectivity gaps with automatic retry"] },
        { cat: "DeepSenseIQ Cleared-Data Transport", items: ["Secure movement of triaged, cleared data from a remote site to central systems", "Policy-governed exchange rather than open network access", "Node health monitoring across distributed footprint"] },
      ],
      governance: { status: "Flagged", node: "Node SUB-07-EDGE", body: "No health telemetry reported for 48 hours.", action: "Dispatch or remote diagnostic check before resuming trusted exchange." },
      deployments: [
        { tier: "Pilot", scope: "Nodes at a single remote site, such as one substation" },
        { tier: "Multi-site", scope: "Nodes across a regional footprint of remote and manned sites" },
        { tier: "Regional / utility-wide", scope: "Nodes across the full distributed footprint, including central systems" },
      ],
    },
    {
      name: "Healthcare: LomaHipe",
      color: "#8B5CF6",
      headline: "The secure communications layer within the LomaHipe health data trust.",
      overview: "VellumGuard is integrated into LomaHipe, Trove-AI's sister initiative building a health data trust for secure, verifiable exchange of health data across organizations. Within that trust, VellumGuard governs node enrollment, authentication, and audit for every exchange between participating institutions. Health data trusts require secure, verifiable exchange across organizations that each run their own systems, without granting broad network access between participants.",
      useCases: [
        { cat: "Institution-to-Institution Exchange", items: ["Secure exchange of health data between participating institutions", "Exchange scoped to each institution's specific data-sharing agreement"] },
        { cat: "Application Integration", items: ["Secure connections between EHR export gateways and institutional integration points", "No broad network access granted between institutions' systems"] },
        { cat: "Trust-Wide Governance", items: ["Full audit trail of every exchange, policy decision, and node-health event across the trust", "Structured onboarding and revocation for participating institutions"] },
      ],
      governance: { status: "Blocked", node: "Node INST-14-GATEWAY", body: "Exchange attempt outside the scope of the node's data-sharing agreement.", action: "Logged for trust administrator review." },
      deployments: [
        { tier: "Pilot", scope: "A small number of participating institutions exchanging a limited data set" },
        { tier: "Multi-institution", scope: "Multiple participating institutions and their integration gateways" },
        { tier: "Trust-wide", scope: "The full set of institutions and application integration points in the LomaHipe trust" },
      ],
    },
  ];

  const faqs = [
    { q: "Does VellumGuard replace a traditional VPN?", a: "No. A VPN can give a connected device broad access once inside the network. VellumGuard treats every endpoint as a controlled node that must be known, approved, and governed by policy before any communication occurs." },
    { q: "How does VellumGuard handle intermittent connectivity?", a: "It queues messages and files locally when a node is disconnected, and automatically retries and recovers once connectivity resumes." },
    { q: "Can a revoked node reconnect automatically?", a: "No. Revocation blocks further exchange attempts from that node until an administrator re-enrolls and re-authorizes it." },
    { q: "What is LomaHipe?", a: "LomaHipe is Trove-AI's sister initiative building a health data trust for secure, verifiable exchange of health data across organizations. It is hosted at its own domain, lomahipe.com, separate from trove-ai.com." },
    { q: "Is this the same as CyberIQ for healthcare?", a: "No. CyberIQ addresses IT security monitoring for a health system's own network, logs, and applications. VellumGuard is the secure communications layer governing data exchange between institutions participating in the LomaHipe health data trust." },
  ];

  return (
    <ProductPageShell product={product} onNavigate={onNavigate}>
      <section className="py-16 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-white/42" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>The Trust Model</span>
              <div className="flex-1 h-px bg-white/[0.05]" />
            </div>
            <p className="text-white/38 text-sm max-w-2xl mb-8 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
              Every node must move through enrollment and authentication before it can exchange anything. Every exchange is recorded for governance.
            </p>
          </FadeUp>
          <div className="border border-white/[0.07] rounded-2xl overflow-hidden">
            {trustStages.map((row, i) => (
              <FadeUp key={row.stage} delay={i * 0.04}>
                <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] border-b border-white/[0.06] last:border-b-0 hover:bg-white/[0.02] transition-colors">
                  <div className="px-6 py-4 md:border-r border-white/[0.06] flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: product.color }} />
                    <span className="text-sm font-semibold text-white/70" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{row.stage}</span>
                  </div>
                  <div className="px-6 py-4">
                    <span className="text-sm text-white/40 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{row.purpose}</span>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={0.2}>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
              {["Node identity & encrypted sessions", "Message, file & structured data exchange", "Local queueing, retry & recovery", "Node health telemetry, revocation & audit logging"].map((cap) => (
                <div key={cap} className="flex items-start gap-2.5 bg-[#071528] rounded-xl p-4 border border-white/[0.06]">
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: product.color }} />
                  <span className="text-sm text-white/48 leading-snug" style={{ fontFamily: "Inter, sans-serif" }}>{cap}</span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {verticals.map((v) => (
        <section key={v.name} className="py-16 border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6">
            <FadeUp>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full" style={{ background: `${v.color}15`, color: v.color, fontFamily: "'Space Grotesk', sans-serif" }}>{v.name}</span>
                <div className="flex-1 h-px bg-white/[0.05]" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{v.headline}</h2>
              <p className="text-white/38 text-sm leading-relaxed max-w-3xl mb-10" style={{ fontFamily: "Inter, sans-serif" }}>{v.overview}</p>
            </FadeUp>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <FadeUp delay={0.05}>
                <div className="space-y-3">
                  {v.useCases.map((uc) => (
                    <div key={uc.cat} className="bg-[#071528] rounded-xl border border-white/[0.07] p-5">
                      <p className="text-[10px] font-bold tracking-widest uppercase mb-3" style={{ color: v.color, fontFamily: "'Space Grotesk', sans-serif" }}>{uc.cat}</p>
                      <div className="space-y-2">
                        {uc.items.map((item) => (
                          <div key={item} className="flex items-start gap-2.5">
                            <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ background: v.color }} />
                            <span className="text-sm text-white/50" style={{ fontFamily: "Inter, sans-serif" }}>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </FadeUp>
              <FadeUp delay={0.1}>
                <div className="space-y-3">
                  <div className="bg-[#071528] rounded-xl border border-white/[0.07] p-5">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-white/42 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Sample Governance Record</p>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ background: v.governance.status === "Revoked" ? "rgba(239,68,68,0.15)" : v.governance.status === "Blocked" ? "rgba(239,68,68,0.15)" : "rgba(249,115,22,0.15)", color: v.governance.status === "Revoked" || v.governance.status === "Blocked" ? "#EF4444" : "#F97316", fontFamily: "'Space Grotesk', sans-serif" }}>{v.governance.status}</span>
                      <span className="text-[11px] text-white/38" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{v.governance.node}</span>
                    </div>
                    <p className="text-sm text-white/50 leading-relaxed mb-2" style={{ fontFamily: "Inter, sans-serif" }}>{v.governance.body}</p>
                    <p className="text-xs text-white/42 border-t border-white/[0.05] pt-2" style={{ fontFamily: "Inter, sans-serif" }}>{v.governance.action}</p>
                  </div>
                  <div className="bg-[#071528] rounded-xl border border-white/[0.07] overflow-hidden">
                    <div className="px-5 py-3 border-b border-white/[0.06]">
                      <p className="text-[10px] font-bold tracking-widest uppercase text-white/42" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Deployment Scale</p>
                    </div>
                    {v.deployments.map((d, di) => (
                      <div key={d.tier} className={`px-5 py-3 ${di < v.deployments.length - 1 ? "border-b border-white/[0.05]" : ""}`}>
                        <div className="flex items-baseline justify-between mb-0.5">
                          <span className="text-xs font-semibold text-white/65" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{d.tier}</span>
                        </div>
                        <span className="text-[11px] text-white/42" style={{ fontFamily: "Inter, sans-serif" }}>{d.scope}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>
      ))}

      <section className="py-14 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-white/42" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>FAQ</span>
              <div className="flex-1 h-px bg-white/[0.05]" />
            </div>
          </FadeUp>
          <div className="max-w-3xl space-y-2">
            {faqs.map((faq, i) => (
              <FadeUp key={faq.q} delay={i * 0.04}>
                <div className="border border-white/[0.07] rounded-xl overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/[0.03] transition-colors">
                    <span className="text-sm font-semibold text-white/80 pr-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{faq.q}</span>
                    <span className="text-white/42 flex-shrink-0 text-lg leading-none">{openFaq === i ? "×" : "+"}</span>
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 border-t border-white/[0.05]">
                      <p className="text-sm text-white/42 leading-relaxed pt-3" style={{ fontFamily: "Inter, sans-serif" }}>{faq.a}</p>
                    </div>
                  )}
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 py-10 px-10 rounded-2xl border border-white/[0.07] bg-[#071528] relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 50% 80% at 100% 50%, ${product.color}07, transparent)` }} />
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Govern every node with VellumGuard</h2>
                <p className="text-white/38 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>Zero trust at the communications layer. Every node enrolled, authenticated, and audited before a single byte moves.</p>
              </div>
              <div className="relative z-10 flex gap-3 flex-wrap">
                <button onClick={() => onNavigate("solutions")} className="flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all hover:-translate-y-0.5" style={{ background: product.color, fontFamily: "'Space Grotesk', sans-serif" }}>
                  Full platform <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={() => onNavigate("partners")} className="flex items-center gap-2 border border-white/[0.12] hover:border-white/[0.24] text-white/50 hover:text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Partners & ecosystem
                </button>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </ProductPageShell>
  );
}

// ─── APP ────────────────────────────────────────────────────────────────────

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  const navigate = (page: Page | string) => {
    setCurrentPage(page as Page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const articleSlug =
    typeof currentPage === "string" && currentPage.startsWith("article-")
      ? currentPage.replace("article-", "")
      : null;

  return (
    <AuthProvider>
    <div className="min-h-screen overflow-x-hidden" style={{ fontFamily: "Inter, sans-serif", background: "#040D1A" }}>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-[#1B6FE8] focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-semibold">Skip to main content</a>
      {currentPage !== "admin" && <Nav currentPage={currentPage} onNavigate={navigate} />}
      <main id="main-content">
        {currentPage === "home" && <HomePage onNavigate={navigate} />}
        {currentPage === "solutions" && <SolutionsPage onNavigate={navigate} />}
        {currentPage === "about" && <AboutPage onNavigate={navigate} />}
        {currentPage === "industries" && <IndustriesPage onNavigate={navigate} />}
        {currentPage === "contact" && (
          <ContactPage onNavigate={navigate} FadeUp={FadeUp} SharedFooter={SharedFooter} />
        )}
        {currentPage === "resources" && (
          <ResourcesPageLive onNavigate={navigate} FadeUp={FadeUp} SharedFooter={SharedFooter} />
        )}
        {currentPage === "blog" && (
          <BlogPageLive onNavigate={navigate} FadeUp={FadeUp} SharedFooter={SharedFooter} />
        )}
        {(currentPage === "blog-composer" || currentPage === "admin") && (
          <AdminPage onNavigate={navigate} />
        )}
        {articleSlug && (
          <ArticlePageLive articleSlug={articleSlug} onNavigate={navigate} FadeUp={FadeUp} SharedFooter={SharedFooter} />
        )}
        {currentPage === "partners" && <PartnersPage onNavigate={navigate} />}
        {currentPage === "visualiq" && <VisualIQPage onNavigate={navigate} />}
        {currentPage === "deepsenseiq" && <DeepSenseIQPage onNavigate={navigate} />}
        {currentPage === "careiq" && <CareIQPage onNavigate={navigate} />}
        {currentPage === "cyberiq" && <CyberIQPage onNavigate={navigate} />}
        {currentPage === "vellumguard" && <VellumGuardPage onNavigate={navigate} />}
        {currentPage === "lexso" && <ProductStubPage productId="lexso" onNavigate={navigate} />}
      </main>
    </div>
    </AuthProvider>
  );
}
