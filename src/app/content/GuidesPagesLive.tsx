import { useEffect, useState } from "react";
import { ArrowRight, Camera, ChevronRight, Layers, Lock, Radio, Shield, Brain } from "lucide-react";
import { fallbackGuides, fetchPublishedGuideBySlug, fetchPublishedGuides } from "@/app/content/api";
import { guideSlug, toPlainPreview, type ResourceGuide } from "@/app/content/types";
import { ArticleBody } from "@/app/blog/ArticleBody";

const iconMap: Record<string, typeof Camera> = {
  Camera,
  Radio,
  Shield,
  Lock,
  Brain,
  Layers,
};

type Nav = (page: string) => void;

type SharedProps = {
  onNavigate: Nav;
  FadeUp: React.ComponentType<{ children: React.ReactNode; delay?: number; className?: string }>;
  SharedFooter: React.ComponentType<{ onNavigate: Nav }>;
};

function GuideIcon({ name, className, color }: { name: string; className?: string; color?: string }) {
  const Icon = iconMap[name] || Camera;
  return <Icon className={className} style={color ? { color } : undefined} />;
}

export function GuidesPageLive({ onNavigate, FadeUp, SharedFooter }: SharedProps) {
  const [guides, setGuides] = useState<ResourceGuide[]>(fallbackGuides);
  const [activeProduct, setActiveProduct] = useState("All");
  const [activeTag, setActiveTag] = useState("All");
  const [activeType, setActiveType] = useState("All");

  useEffect(() => {
    fetchPublishedGuides().then(setGuides);
  }, []);

  const productFilters = ["All", ...Array.from(new Set(guides.map((g) => g.product).filter(Boolean)))];
  const tagFilters = ["All", ...Array.from(new Set(guides.flatMap((g) => g.tags || []))).sort((a, b) => a.localeCompare(b))];
  const typeFilters = ["All", ...Array.from(new Set(guides.map((g) => g.type).filter(Boolean)))];
  const filtered = guides
    .filter((g) => activeProduct === "All" || g.product === activeProduct)
    .filter((g) => activeTag === "All" || (g.tags || []).includes(activeTag))
    .filter((g) => activeType === "All" || g.type === activeType);
  const featured = guides[0];
  const filtersActive = activeProduct !== "All" || activeTag !== "All" || activeType !== "All";

  return (
    <div className="min-h-screen pt-16 bg-[#040D1A]">
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
                  <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-[#10B981] mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Guides
                  </p>
                  <h1 className="text-5xl md:text-[3.75rem] font-bold text-white leading-[1.04] tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Comparison guides
                    <br />
                    <span className="text-[#10B981]">and technical explainers.</span>
                  </h1>
                  <p className="mt-6 text-white/48 text-base leading-relaxed max-w-lg" style={{ fontFamily: "Inter, sans-serif" }}>
                    Comparison guides, explainers, and compliance maps across Trove-AI&apos;s product lines.
                  </p>
                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <button
                      onClick={() =>
                        document.getElementById("all-guides")?.scrollIntoView({ behavior: "smooth", block: "start" })
                      }
                      className="flex items-center gap-2 text-sm font-semibold text-[#10B981] hover:gap-3 transition-all"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      Browse all guides <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="hidden lg:flex flex-col items-end justify-end gap-1.5">
                  <span className="text-[11px] text-white/38" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {guides.length} guides published
                  </span>
                  <span className="text-[11px] text-white/38" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    Comparison &amp; compliance
                  </span>
                  <span className="text-[11px] text-white/38" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    6 product lines covered
                  </span>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {featured && (
        <section className="py-16 border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6">
            <FadeUp>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-white/42" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Featured
                </span>
                <div className="flex-1 h-px bg-white/[0.05]" />
              </div>
              <div
                className="group grid grid-cols-1 lg:grid-cols-[1fr_360px] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-white/[0.14] transition-all duration-300 cursor-pointer bg-[#071528]"
                onClick={() => onNavigate(`guide-${guideSlug(featured)}`)}
              >
                <div className="p-10 md:p-12">
                  <div className="flex items-center gap-3 mb-6">
                    <span
                      className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                      style={{ background: `${featured.product_color}18`, color: featured.product_color, fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {featured.type}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/12" />
                    <span className="text-[11px] text-white/40" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {featured.date_label}
                    </span>
                    <span className="text-[11px] text-white/40" style={{ fontFamily: "Inter, sans-serif" }}>
                      {featured.read_time} read
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white leading-[1.12] mb-5 group-hover:text-[#10B981] transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {featured.title}
                  </h2>
                  <p className="text-white/48 leading-relaxed mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
                    {toPlainPreview(featured.excerpt || featured.body, 280)}
                  </p>
                  <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-[#10B981] group-hover:gap-3 transition-all" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Read guide <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
                <div className="hidden lg:flex flex-col items-center justify-center border-l border-white/[0.05] p-10 relative overflow-hidden">
                  <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 90% 70% at 50% 50%, ${featured.product_color}0B, transparent)` }} />
                  <div className="relative z-10 text-center">
                    <div
                      className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5"
                      style={{ background: `${featured.product_color}15`, border: `1px solid ${featured.product_color}20` }}
                    >
                      <GuideIcon name={featured.icon_key} className="w-9 h-9" color={featured.product_color} />
                    </div>
                    <div className="space-y-2">
                      {featured.tags.map((tag) => (
                        <div key={tag} className="text-[11px] text-white/42 border border-white/[0.07] rounded-full px-3 py-1 inline-block mx-1" style={{ fontFamily: "Inter, sans-serif" }}>
                          {tag}
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 text-[10px] font-bold tracking-wider uppercase" style={{ color: featured.product_color, fontFamily: "'Space Grotesk', sans-serif" }}>
                      {featured.product}
                    </p>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>
      )}

      <section id="all-guides" className="py-16 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-white/42" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  All guides
                </span>
                <div className="w-10 h-px bg-white/[0.05]" />
                <span className="text-[11px] text-white/40" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {filtered.length} results
                </span>
              </div>
              {filtersActive ? (
                <button
                  onClick={() => {
                    setActiveProduct("All");
                    setActiveTag("All");
                    setActiveType("All");
                  }}
                  className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Clear filters
                </button>
              ) : null}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              <GuideFilter
                label="Product"
                value={activeProduct}
                onChange={setActiveProduct}
                options={productFilters.map((p) => ({ value: p, label: p === "All" ? "All products" : p }))}
              />
              <GuideFilter
                label="Tag"
                value={activeTag}
                onChange={setActiveTag}
                options={tagFilters.map((t) => ({ value: t, label: t === "All" ? "All tags" : t }))}
              />
              <GuideFilter
                label="Type"
                value={activeType}
                onChange={setActiveType}
                options={typeFilters.map((t) => ({ value: t, label: t === "All" ? "All types" : t }))}
              />
            </div>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((guide, i) => (
              <FadeUp key={guide.id} delay={i * 0.05} className="h-full">
                <button
                  onClick={() => onNavigate(`guide-${guideSlug(guide)}`)}
                  className="group text-left bg-[#071528] rounded-2xl border border-white/[0.07] overflow-hidden hover:border-white/[0.14] hover:-translate-y-0.5 transition-all duration-300 w-full h-full flex flex-col"
                >
                  <div className="h-px" style={{ background: `linear-gradient(90deg, ${guide.product_color}90, transparent)` }} />
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <span
                        className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
                        style={{ background: `${guide.product_color}18`, color: guide.product_color, fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {guide.type}
                      </span>
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: `${guide.product_color}14` }}
                      >
                        <GuideIcon name={guide.icon_key} className="w-4 h-4" color={guide.product_color} />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[11px] text-white/42" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        {guide.date_label}
                      </span>
                      <span className="text-[11px] text-white/38" style={{ fontFamily: "Inter, sans-serif" }}>
                        {guide.read_time}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-white/85 leading-snug mb-2 group-hover:text-white transition-colors line-clamp-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {guide.title}
                    </h3>
                    <p className="text-sm text-white/35 leading-relaxed mb-4 flex-1" style={{ fontFamily: "Inter, sans-serif" }}>
                      {toPlainPreview(guide.excerpt || guide.body)}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/[0.05]">
                      <div className="flex gap-1.5 flex-wrap">
                        {guide.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-[10px] text-white/32 border border-white/[0.07] rounded px-2 py-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#10B981] opacity-50 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </button>
              </FadeUp>
            ))}
          </div>
          {filtered.length === 0 ? (
            <p className="py-16 text-center text-sm text-white/35" style={{ fontFamily: "Inter, sans-serif" }}>
              No guides match these filters.
            </p>
          ) : null}
        </div>
      </section>

      <SharedFooter onNavigate={onNavigate} />
    </div>
  );
}

function GuideFilter({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      <span
        className="block text-[10px] font-bold tracking-[0.18em] uppercase text-white/35 mb-1.5"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#071528] border border-white/[0.1] rounded-xl px-3 py-2.5 text-sm text-white/80 focus:outline-none focus:border-[#10B981]/50 cursor-pointer"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-[#071528]">
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function GuidePageLive({ guideSlug: openedSlug, onNavigate, FadeUp, SharedFooter }: SharedProps & { guideSlug: string }) {
  const [guide, setGuide] = useState<ResourceGuide | null>(null);
  const [others, setOthers] = useState<ResourceGuide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [item, all] = await Promise.all([fetchPublishedGuideBySlug(openedSlug), fetchPublishedGuides()]);
      if (!cancelled) {
        setGuide(item);
        setOthers(all.filter((g) => guideSlug(g) !== openedSlug && g.id !== openedSlug).slice(0, 3));
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [openedSlug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 bg-[#040D1A] flex items-center justify-center">
        <p className="text-white/40 text-sm">Loading guide…</p>
      </div>
    );
  }

  if (!guide) {
    return (
      <div className="min-h-screen pt-24 bg-[#040D1A] flex flex-col items-center justify-center gap-4">
        <p className="text-white/50">Guide not found.</p>
        <button onClick={() => onNavigate("guides")} className="text-[#10B981] text-sm">
          Back to Guides
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-[#040D1A]">
      <section className="border-b border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="h-px" style={{ background: `linear-gradient(90deg, ${guide.product_color}70, transparent)` }} />
          <div className="py-14">
            <FadeUp>
              <button
                onClick={() => onNavigate("guides")}
                className="inline-flex items-center gap-1.5 text-[11px] font-medium text-white/42 hover:text-white/55 transition-colors mb-7"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <ChevronRight className="w-3 h-3 rotate-180" /> Guides
              </button>
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                  style={{ background: `${guide.product_color}18`, color: guide.product_color, fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {guide.type}
                </span>
                <span className="w-1 h-1 rounded-full bg-white/12" />
                <span className="text-[11px] text-white/42" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {guide.date_label}
                </span>
                <span className="text-[11px] text-white/42" style={{ fontFamily: "Inter, sans-serif" }}>
                  {guide.read_time} read
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-[1.08] tracking-tight mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {guide.title}
              </h1>
              <p className="text-white/50 text-lg leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                {toPlainPreview(guide.excerpt || guide.body, 320)}
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-4xl mx-auto px-6">
          <FadeUp>
            <ArticleBody body={guide.body} />
            <div className="mt-10 pt-8 border-t border-white/[0.06] flex flex-wrap gap-2">
              {guide.tags.map((tag) => (
                <span key={tag} className="text-[11px] text-white/32 border border-white/[0.08] rounded-full px-3 py-1" style={{ fontFamily: "Inter, sans-serif" }}>
                  {tag}
                </span>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {others.length > 0 && (
        <section className="py-14 border-t border-white/[0.06]">
          <div className="max-w-4xl mx-auto px-6">
            <FadeUp>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-white/42" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  More guides
                </span>
                <div className="flex-1 h-px bg-white/[0.05]" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {others.map((g, i) => (
                  <FadeUp key={g.id} delay={i * 0.06}>
                    <button
                      onClick={() => onNavigate(`guide-${guideSlug(g)}`)}
                      className="group text-left bg-[#071528] rounded-2xl border border-white/[0.07] overflow-hidden hover:border-white/[0.14] hover:-translate-y-0.5 transition-all duration-300 w-full"
                    >
                      <div className="p-5">
                        <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: g.product_color, fontFamily: "'Space Grotesk', sans-serif" }}>
                          {g.type}
                        </span>
                        <p className="mt-1.5 text-sm font-semibold text-white/80 leading-snug group-hover:text-white transition-colors line-clamp-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                          {g.title}
                        </p>
                        <p className="mt-1 text-[11px] text-white/42" style={{ fontFamily: "Inter, sans-serif" }}>
                          {g.read_time} read
                        </p>
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
