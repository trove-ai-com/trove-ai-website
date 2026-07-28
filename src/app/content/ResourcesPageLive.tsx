import { useEffect, useState } from "react";
import { ArrowRight, Camera, Radio, Shield, Lock, Brain, Layers } from "lucide-react";
import { fetchPageCopy, fetchPublishedFaqs, fetchPublishedGuides } from "@/app/content/api";
import type { ResourceFaq, ResourceGuide, ResourcesPageCopy } from "@/app/content/types";

const iconMap: Record<string, typeof Camera> = {
  Camera,
  Radio,
  Shield,
  Lock,
  Brain,
  Layers,
};

type Props = {
  onNavigate: (page: string) => void;
  FadeUp: React.ComponentType<{ children: React.ReactNode; delay?: number; className?: string }>;
  SharedFooter: React.ComponentType<{ onNavigate: (page: string) => void }>;
};

export function ResourcesPageLive({ onNavigate, FadeUp, SharedFooter }: Props) {
  const [guides, setGuides] = useState<ResourceGuide[]>([]);
  const [copy, setCopy] = useState<ResourcesPageCopy | null>(null);
  const [faqs, setFaqs] = useState<ResourceFaq[]>([]);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [g, c, f] = await Promise.all([
        fetchPublishedGuides(),
        fetchPageCopy(),
        fetchPublishedFaqs(),
      ]);
      if (!cancelled) {
        setGuides(g);
        setCopy(c);
        setFaqs(f);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading || !copy) {
    return (
      <div className="min-h-screen pt-24 bg-[#040D1A] flex items-center justify-center">
        <p className="text-white/40 text-sm">Loading resources…</p>
      </div>
    );
  }

  const featured = guides[0];
  const rest = guides.slice(1);
  const heroLines = copy.hero_title.split("\n");

  return (
    <div className="min-h-screen pt-16 bg-[#040D1A]">
      <section className="border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-[#1B6FE8]/70 via-white/[0.07] to-transparent" />
          <div className="py-20 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16 items-end">
            <FadeUp>
              <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-[#10B981] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {copy.hero_eyebrow}
              </p>
              <h1 className="text-5xl md:text-[3.75rem] font-bold text-white leading-[1.04] tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {heroLines.map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < heroLines.length - 1 && <br />}
                  </span>
                ))}
              </h1>
              <p className="mt-6 text-white/50 text-lg leading-relaxed max-w-2xl" style={{ fontFamily: "Inter, sans-serif" }}>
                {copy.hero_subtitle}
              </p>
              <p className="mt-3 text-white/42 text-sm leading-relaxed max-w-xl" style={{ fontFamily: "Inter, sans-serif" }}>
                {copy.hero_note}
              </p>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="divide-y divide-white/[0.05]">
                {[
                  { n: String(guides.length), label: "Comparison guides", note: "Available now" },
                  { n: "1×", label: "New piece per month", note: "No subscription" },
                  { n: "Free", label: "No gate, no form", note: "Direct access" },
                ].map((s) => (
                  <div key={s.label} className="flex items-baseline justify-between py-3.5">
                    <div className="flex items-baseline gap-3">
                      <span className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {s.n}
                      </span>
                      <span className="text-sm text-white/42" style={{ fontFamily: "Inter, sans-serif" }}>
                        {s.label}
                      </span>
                    </div>
                    <span className="text-[10px] text-white/40 tracking-wider flex-shrink-0" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {s.note}
                    </span>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {featured && (
        <section className="py-16 border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6">
            <FadeUp>
              <div className="flex items-center gap-4 mb-10">
                <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-white/42" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Featured
                </span>
                <div className="flex-1 h-px bg-white/[0.05]" />
              </div>
            </FadeUp>
            <FadeUp delay={0.05}>
              <div
                className="group grid grid-cols-1 lg:grid-cols-[1fr_300px] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-white/[0.13] transition-all duration-300 cursor-pointer bg-[#071528]"
                onClick={() => setExpanded(expanded === 0 ? null : 0)}
              >
                <div className="p-10 md:p-12">
                  <div className="flex items-center gap-3 mb-7">
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
                  <h2 className="text-3xl md:text-4xl font-bold text-white leading-[1.12] mb-5 group-hover:text-[#10B981] transition-colors duration-200" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {featured.title}
                  </h2>
                  <p className="text-white/48 leading-relaxed text-base mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
                    {featured.excerpt}
                  </p>
                  {expanded === 0 && (
                    <p className="text-white/42 leading-relaxed text-sm mt-4 border-t border-white/[0.05] pt-4" style={{ fontFamily: "Inter, sans-serif" }}>
                      {featured.body}
                    </p>
                  )}
                  <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-[#10B981] group-hover:gap-3 transition-all" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {expanded === 0 ? "Close" : "Read guide"}{" "}
                    <ArrowRight className={`w-4 h-4 transition-transform ${expanded === 0 ? "rotate-90" : ""}`} />
                  </div>
                </div>
                <div className="hidden lg:flex flex-col items-center justify-center border-l border-white/[0.05] p-10 relative overflow-hidden">
                  <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 90% 70% at 50% 50%, ${featured.product_color}0B, transparent)` }} />
                  <div className="relative z-10 text-center">
                    {(() => {
                      const Icon = iconMap[featured.icon_key] || Camera;
                      return (
                        <div
                          className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5"
                          style={{ background: `${featured.product_color}15`, border: `1px solid ${featured.product_color}20` }}
                        >
                          <Icon className="w-9 h-9" style={{ color: featured.product_color }} />
                        </div>
                      );
                    })()}
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

      {rest.length > 0 && (
        <section className="py-16 border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6">
            <FadeUp>
              <div className="flex items-center gap-4 mb-10">
                <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-white/42" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  More guides
                </span>
                <div className="flex-1 h-px bg-white/[0.05]" />
              </div>
            </FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {rest.map((guide, i) => {
                const idx = i + 1;
                const GuideIcon = iconMap[guide.icon_key] || Camera;
                return (
                  <FadeUp key={guide.id} delay={i * 0.08} className="h-full">
                    <div
                      className="group bg-[#071528] rounded-2xl border border-white/[0.07] overflow-hidden hover:border-white/[0.14] transition-all duration-300 cursor-pointer h-full flex flex-col"
                      onClick={() => setExpanded(expanded === idx ? null : idx)}
                    >
                      <div className="h-px" style={{ background: `linear-gradient(90deg, ${guide.product_color}90, transparent)` }} />
                      <div className="p-8 flex flex-col flex-1">
                        <div className="flex items-start justify-between mb-5">
                          <span
                            className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
                            style={{ background: `${guide.product_color}18`, color: guide.product_color, fontFamily: "'Space Grotesk', sans-serif" }}
                          >
                            {guide.type}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-white/38" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                              {guide.date_label}
                            </span>
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${guide.product_color}14` }}>
                              <GuideIcon className="w-3.5 h-3.5" style={{ color: guide.product_color }} />
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
                              <span key={tag} className="text-[10px] text-white/40 border border-white/[0.07] rounded px-2 py-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center gap-1.5 text-[11px] text-[#10B981] opacity-60 group-hover:opacity-100 transition-opacity" style={{ fontFamily: "Inter, sans-serif" }}>
                            {expanded === idx ? "Close" : guide.read_time + " read"}
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
      )}

      {faqs.length > 0 && (
        <section className="py-16 border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6">
            <FadeUp>
              <div className="flex items-center gap-4 mb-10">
                <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-white/42" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  FAQ
                </span>
                <div className="flex-1 h-px bg-white/[0.05]" />
              </div>
            </FadeUp>
            <div className="max-w-3xl space-y-3">
              {faqs.map((faq, i) => (
                <FadeUp key={faq.id} delay={i * 0.04}>
                  <div className="rounded-xl border border-white/[0.07] bg-[#071528]/50 overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/[0.03] transition-colors"
                    >
                      <span className="text-sm font-semibold text-white/80 pr-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {faq.question}
                      </span>
                      <span className="text-white/42 flex-shrink-0 text-lg leading-none">{openFaq === i ? "×" : "+"}</span>
                    </button>
                    {openFaq === i && (
                      <div className="px-5 pb-5">
                        <p className="text-sm text-white/42 leading-relaxed pt-1" style={{ fontFamily: "Inter, sans-serif" }}>
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}

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
                    <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#10B981]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      Insights
                    </p>
                    <span className="text-[10px] text-white/38 border border-white/[0.08] rounded px-1.5 py-0.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      blog index
                    </span>
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

      <section className="py-16 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 items-center py-10 border border-white/[0.06] rounded-2xl px-10">
              <div>
                <p className="text-[10px] font-bold tracking-[0.24em] uppercase text-white/42 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {copy.about_label}
                </p>
                <p className="text-white/38 text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                  {copy.about_body}
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
                    <p className="text-[10px] font-bold tracking-widest uppercase text-white/42 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {item.label}
                    </p>
                    {item.value.split("\n").map((line) => (
                      <p key={line} className="text-sm text-white/50 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                        {line}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <p className="text-[10px] font-bold tracking-[0.24em] uppercase text-white/40 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {copy.cta_eyebrow}
                </p>
                <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {copy.cta_title}
                </h2>
                <p className="mt-2 text-white/35 text-sm leading-relaxed max-w-lg" style={{ fontFamily: "Inter, sans-serif" }}>
                  {copy.cta_body}
                </p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0 flex-wrap">
                <button
                  onClick={() => onNavigate("solutions")}
                  className="inline-flex items-center gap-2 bg-[#1B6FE8] hover:bg-[#1558c0] text-white text-sm font-semibold px-5 py-3 rounded-xl transition-colors"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Explore solutions <ArrowRight className="w-4 h-4" />
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
