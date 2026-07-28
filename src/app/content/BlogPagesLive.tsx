import { useEffect, useState } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { fetchBlogPostBySlug, fetchPublishedBlogPosts } from "@/app/content/api";
import type { BlogPost } from "@/app/content/types";
import { ArticleBody } from "@/app/blog/ArticleBody";

type Nav = (page: string) => void;

type SharedProps = {
  onNavigate: Nav;
  FadeUp: React.ComponentType<{ children: React.ReactNode; delay?: number; className?: string }>;
  SharedFooter: React.ComponentType<{ onNavigate: Nav }>;
};

export function BlogPageLive({ onNavigate, FadeUp, SharedFooter }: SharedProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [activeProduct, setActiveProduct] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPublishedBlogPosts().then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  const productFilters = ["All", ...Array.from(new Set(posts.map((a) => a.product)))];
  const filtered = activeProduct === "All" ? posts : posts.filter((a) => a.product === activeProduct);
  const featured = posts[0];

  if (loading) {
    return (
      <div className="min-h-screen pt-24 bg-[#040D1A] flex items-center justify-center">
        <p className="text-white/40 text-sm">Loading insights…</p>
      </div>
    );
  }

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
                    Insights
                  </p>
                  <h1 className="text-5xl md:text-[3.75rem] font-bold text-white leading-[1.04] tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Monthly articles on
                    <br />
                    <span className="text-[#10B981]">AI that matters.</span>
                  </h1>
                  <p className="mt-6 text-white/48 text-base leading-relaxed max-w-lg" style={{ fontFamily: "Inter, sans-serif" }}>
                    Monthly articles on AI security, physical security, and cyber intelligence topics across Trove-AI&apos;s product lines.
                  </p>
                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <button
                      onClick={() =>
                        document.getElementById("recent-articles")?.scrollIntoView({ behavior: "smooth", block: "start" })
                      }
                      className="flex items-center gap-2 text-sm font-semibold text-[#10B981] hover:gap-3 transition-all"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      Browse recent articles <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="hidden lg:flex flex-col items-end justify-end gap-1.5">
                  <span className="text-[11px] text-white/38" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {posts.length} articles published
                  </span>
                  <span className="text-[11px] text-white/38" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    1 new article / month
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
                  Latest
                </span>
                <div className="flex-1 h-px bg-white/[0.05]" />
              </div>
              <div
                className="group grid grid-cols-1 lg:grid-cols-[1fr_360px] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-white/[0.14] transition-all duration-300 cursor-pointer bg-[#071528]"
                onClick={() => onNavigate(`article-${featured.slug}`)}
              >
                <div className="p-10 md:p-12">
                  <div className="flex items-center gap-3 mb-6">
                    <span
                      className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                      style={{ background: `${featured.product_color}18`, color: featured.product_color, fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {featured.product}
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
                    {featured.excerpt}
                  </p>
                  <p className="text-white/42 leading-relaxed text-sm border-t border-white/[0.05] pt-4 line-clamp-4" style={{ fontFamily: "Inter, sans-serif" }}>
                    {featured.body.split(/\n\n+/)[0]}
                  </p>
                  <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-[#10B981] group-hover:gap-3 transition-all" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Read article <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
                <div className="hidden lg:block relative overflow-hidden border-l border-white/[0.05]">
                  <img src={featured.image_url} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(7,21,40,0.4), transparent)" }} />
                </div>
              </div>
            </FadeUp>
          </div>
        </section>
      )}

      <section id="recent-articles" className="py-16 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-white/42" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  All articles
                </span>
                <div className="w-10 h-px bg-white/[0.05]" />
                <span className="text-[11px] text-white/40" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {filtered.length} results
                </span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {productFilters.map((p) => (
                  <button
                    key={p}
                    onClick={() => setActiveProduct(p)}
                    className={`text-[11px] px-3 py-1.5 rounded-full border transition-colors ${
                      activeProduct === p ? "bg-white/10 border-white/20 text-white" : "border-white/[0.08] text-white/40 hover:text-white/60"
                    }`}
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((article, i) => (
              <FadeUp key={article.id} delay={i * 0.05} className="h-full">
                <button
                  onClick={() => onNavigate(`article-${article.slug}`)}
                  className="group text-left bg-[#071528] rounded-2xl border border-white/[0.07] overflow-hidden hover:border-white/[0.14] hover:-translate-y-0.5 transition-all duration-300 w-full h-full flex flex-col"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img src={article.image_url} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(7,21,40,0.7))" }} />
                    <span
                      className="absolute bottom-3 left-4 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full backdrop-blur-sm"
                      style={{ background: `${article.product_color}25`, color: article.product_color, fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {article.product}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[11px] text-white/42" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        {article.date_label}
                      </span>
                      <span className="text-[11px] text-white/38" style={{ fontFamily: "Inter, sans-serif" }}>
                        {article.read_time}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-white/85 leading-snug mb-2 group-hover:text-white transition-colors line-clamp-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {article.title}
                    </h3>
                    <p className="text-sm text-white/35 leading-relaxed mb-4 flex-1" style={{ fontFamily: "Inter, sans-serif" }}>
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/[0.05]">
                      <div className="flex gap-1.5 flex-wrap">
                        {article.tags.slice(0, 2).map((tag) => (
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
        </div>
      </section>

      <SharedFooter onNavigate={onNavigate} />
    </div>
  );
}

export function ArticlePageLive({ articleSlug, onNavigate, FadeUp, SharedFooter }: SharedProps & { articleSlug: string }) {
  const [article, setArticle] = useState<BlogPost | null>(null);
  const [others, setOthers] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [post, all] = await Promise.all([fetchBlogPostBySlug(articleSlug), fetchPublishedBlogPosts()]);
      if (!cancelled) {
        setArticle(post);
        setOthers(all.filter((a) => a.slug !== articleSlug).slice(0, 3));
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [articleSlug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 bg-[#040D1A] flex items-center justify-center">
        <p className="text-white/40 text-sm">Loading article…</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen pt-24 bg-[#040D1A] flex flex-col items-center justify-center gap-4">
        <p className="text-white/50">Article not found.</p>
        <button onClick={() => onNavigate("blog")} className="text-[#10B981] text-sm">
          Back to Insights
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-[#040D1A]">
      <section className="border-b border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="h-px" style={{ background: `linear-gradient(90deg, ${article.product_color}70, transparent)` }} />
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
                <span
                  className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                  style={{ background: `${article.product_color}18`, color: article.product_color, fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {article.product}
                </span>
                <span className="w-1 h-1 rounded-full bg-white/12" />
                <span className="text-[11px] text-white/42" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {article.date_label}
                </span>
                <span className="text-[11px] text-white/42" style={{ fontFamily: "Inter, sans-serif" }}>
                  {article.read_time} read
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-[1.08] tracking-tight mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {article.title}
              </h1>
              <p className="text-white/50 text-lg leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                {article.excerpt}
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {article.image_url && (
        <div className="max-w-4xl mx-auto px-6 mt-10">
          <FadeUp>
            <div className="rounded-2xl overflow-hidden border border-white/[0.07]" style={{ height: "380px" }}>
              <img src={article.image_url} alt={article.title} className="w-full h-full object-cover" />
            </div>
          </FadeUp>
        </div>
      )}

      <section className="py-14">
        <div className="max-w-4xl mx-auto px-6">
          <FadeUp>
            <ArticleBody body={article.body} />
            <div className="mt-10 pt-8 border-t border-white/[0.06] flex flex-wrap gap-2">
              {article.tags.map((tag) => (
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
                  More articles
                </span>
                <div className="flex-1 h-px bg-white/[0.05]" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {others.map((a, i) => (
                  <FadeUp key={a.id} delay={i * 0.06}>
                    <button
                      onClick={() => onNavigate(`article-${a.slug}`)}
                      className="group text-left bg-[#071528] rounded-2xl border border-white/[0.07] overflow-hidden hover:border-white/[0.14] hover:-translate-y-0.5 transition-all duration-300 w-full"
                    >
                      <div className="h-36 overflow-hidden">
                        <img src={a.image_url} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="p-5">
                        <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: a.product_color, fontFamily: "'Space Grotesk', sans-serif" }}>
                          {a.product}
                        </span>
                        <p className="mt-1.5 text-sm font-semibold text-white/80 leading-snug group-hover:text-white transition-colors line-clamp-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                          {a.title}
                        </p>
                        <p className="mt-1 text-[11px] text-white/42" style={{ fontFamily: "Inter, sans-serif" }}>
                          {a.read_time} read
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
