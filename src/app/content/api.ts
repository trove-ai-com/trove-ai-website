import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import type { BlogPost, ResourceFaq, ResourceGuide, ResourcesPageCopy } from "./types";
import { PRODUCT_COLORS } from "./types";
import { allInsights as localInsights } from "@/app/blog/loadArticles";

// ─── Fallback local data ────────────────────────────────────────────────────

const fallbackGuides: ResourceGuide[] = [
  {
    id: "local-0",
    type: "Comparison Guide",
    title: "Hardware-Agnostic vs. Proprietary Video Surveillance",
    excerpt:
      "A detailed breakdown of deployment costs, integration complexity, and long-term flexibility between open-architecture camera systems and vendor-locked proprietary platforms.",
    body: "Proprietary systems offer tight integration but extract long-term cost through licensing, hardware lock-in, and limited interoperability. Hardware-agnostic platforms like VisualIQ separate intelligence from infrastructure, turning any existing camera into a smart sensor without rip-and-replace. The operational savings over a five-year horizon consistently exceed 40% when procurement, maintenance, and upgrade cycles are modeled together.",
    product: "VisualIQ",
    product_color: "#0EA5E9",
    date_label: "Jun 2025",
    read_time: "8 min",
    tags: ["Video Surveillance", "Hardware", "VisualIQ"],
    icon_key: "Camera",
    published: true,
    sort_order: 0,
  },
  {
    id: "local-1",
    type: "Explainer",
    title: "What Is Hardware-Agnostic Multi-Sensor Fusion?",
    excerpt:
      "Multi-sensor fusion combines data from cameras, radar, LiDAR, acoustic sensors, and network telemetry into a single unified intelligence picture, without requiring proprietary hardware.",
    body: "Rather than siloing each sensor type into its own management interface, DeepSenseIQ ingests heterogeneous sensor streams and correlates them at the reasoning layer, so a motion alert from a radar sensor and a corresponding camera detection are treated as a single event, not two separate incidents requiring manual correlation.",
    product: "DeepSenseIQ",
    product_color: "#10B981",
    date_label: "May 2025",
    read_time: "6 min",
    tags: ["Sensor Fusion", "Edge AI", "DeepSenseIQ"],
    icon_key: "Radio",
    published: true,
    sort_order: 1,
  },
  {
    id: "local-2",
    type: "Compliance Guide",
    title: "AI Surveillance Compliance for Government",
    excerpt:
      "Navigating FedRAMP, CJIS, FISMA, and IL4 requirements when deploying AI-powered surveillance and threat detection across federal and state agencies.",
    body: "Federal AI deployments require more than a compliant data center. The AI models themselves must meet explainability standards, retain audit trails for every automated decision, and operate within boundaries defined by each agency's ATO. This guide maps Trove-AI's compliance posture across all major federal frameworks in effect as of 2025.",
    product: "CyberIQ",
    product_color: "#F97316",
    date_label: "Apr 2025",
    read_time: "10 min",
    tags: ["Compliance", "Government", "FedRAMP"],
    icon_key: "Shield",
    published: true,
    sort_order: 2,
  },
];

const fallbackCopy: ResourcesPageCopy = {
  id: 1,
  hero_eyebrow: "Resources & Insights",
  hero_title: "Explore guides, FAQs,\nand expert insights.",
  hero_subtitle:
    "Comparison guides and FAQ content on hardware-agnostic security, multi-sensor fusion, and AI surveillance compliance for government.",
  hero_note:
    "Resources publishes one new comparison or FAQ piece per month, building on the direct-answer content across Trove-AI's product and industry pages.",
  about_label: "About this publication",
  about_body:
    "Whether you're comparing solutions, reviewing technical requirements, or learning about AI technologies, Resources & Insights provides straightforward answers to the questions teams ask most often.",
  cta_eyebrow: "Ready to go deeper?",
  cta_title: "See how these products work in the field.",
  cta_body:
    "Every guide on this page connects to a live product. Explore the full Trove-AI platform to see the capabilities in context.",
};

const fallbackFaqs: ResourceFaq[] = [
  {
    id: "faq-0",
    question: "How often is new content published?",
    answer:
      "Resources & Insights publishes one new comparison guide, explainer, or FAQ piece per month. Insights blog articles rotate across product lines on the same cadence.",
    sort_order: 0,
    published: true,
  },
  {
    id: "faq-1",
    question: "Do I need an account to read guides?",
    answer: "No. All Resources & Insights content is free, ungated, and available without a form or subscription.",
    sort_order: 1,
    published: true,
  },
  {
    id: "faq-2",
    question: "Can I request a topic?",
    answer:
      "Yes. Contact the Trove-AI team with a comparison, compliance, or technical topic you need covered and we will prioritize it in the editorial calendar when it aligns with platform capability.",
    sort_order: 2,
    published: true,
  },
];

function localPostsAsBlogPosts(): BlogPost[] {
  return localInsights.map((a) => ({
    id: String(a.id),
    slug: a.slug,
    title: a.title,
    product: a.product,
    product_color: a.productColor || PRODUCT_COLORS[a.product] || "#1B6FE8",
    image_url: a.image,
    excerpt: a.excerpt,
    body: a.body,
    date_label: a.date,
    read_time: a.readTime,
    tags: a.tags,
    published: a.published,
  }));
}

// ─── Public fetches ─────────────────────────────────────────────────────────

export async function fetchPublishedBlogPosts(): Promise<BlogPost[]> {
  const sb = getSupabase();
  if (!sb) return localPostsAsBlogPosts();
  const { data, error } = await sb
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });
  if (error || !data) return localPostsAsBlogPosts();
  return data as BlogPost[];
}

export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const sb = getSupabase();
  if (!sb) {
    return localPostsAsBlogPosts().find((p) => p.slug === slug || p.id === slug) ?? null;
  }
  const { data, error } = await sb
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (error || !data) {
    return localPostsAsBlogPosts().find((p) => p.slug === slug) ?? null;
  }
  return data as BlogPost;
}

export async function fetchPublishedGuides(): Promise<ResourceGuide[]> {
  const sb = getSupabase();
  if (!sb) return fallbackGuides;
  const { data, error } = await sb
    .from("resource_guides")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });
  if (error || !data) return fallbackGuides;
  return data as ResourceGuide[];
}

export async function fetchPageCopy(): Promise<ResourcesPageCopy> {
  const sb = getSupabase();
  if (!sb) return fallbackCopy;
  const { data, error } = await sb.from("resources_page_copy").select("*").eq("id", 1).maybeSingle();
  if (error || !data) return fallbackCopy;
  return data as ResourcesPageCopy;
}

export async function fetchPublishedFaqs(): Promise<ResourceFaq[]> {
  const sb = getSupabase();
  if (!sb) return fallbackFaqs;
  const { data, error } = await sb
    .from("resource_faqs")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });
  if (error || !data) return fallbackFaqs;
  return data as ResourceFaq[];
}

// ─── Admin CRUD ─────────────────────────────────────────────────────────────

export async function adminListBlogPosts(): Promise<BlogPost[]> {
  const sb = getSupabase();
  if (!sb) throw new Error("Supabase is not configured");
  const { data, error } = await sb.from("blog_posts").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as BlogPost[];
}

export async function adminUpsertBlogPost(
  post: Partial<BlogPost> & { title: string; slug: string }
): Promise<BlogPost> {
  const sb = getSupabase();
  if (!sb) throw new Error("Supabase is not configured");
  const payload = {
    ...post,
    product_color: post.product_color || PRODUCT_COLORS[post.product ?? ""] || "#1B6FE8",
    tags: post.tags ?? [],
  };
  const { data, error } = await sb.from("blog_posts").upsert(payload).select().single();
  if (error) throw error;
  return data as BlogPost;
}

export async function adminDeleteBlogPost(id: string): Promise<void> {
  const sb = getSupabase();
  if (!sb) throw new Error("Supabase is not configured");
  const { error } = await sb.from("blog_posts").delete().eq("id", id);
  if (error) throw error;
}

export async function adminListGuides(): Promise<ResourceGuide[]> {
  const sb = getSupabase();
  if (!sb) throw new Error("Supabase is not configured");
  const { data, error } = await sb.from("resource_guides").select("*").order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as ResourceGuide[];
}

export async function adminUpsertGuide(
  guide: Partial<ResourceGuide> & { title: string }
): Promise<ResourceGuide> {
  const sb = getSupabase();
  if (!sb) throw new Error("Supabase is not configured");
  const payload = {
    ...guide,
    product_color: guide.product_color || PRODUCT_COLORS[guide.product ?? ""] || "#0EA5E9",
    tags: guide.tags ?? [],
  };
  const { data, error } = await sb.from("resource_guides").upsert(payload).select().single();
  if (error) throw error;
  return data as ResourceGuide;
}

export async function adminDeleteGuide(id: string): Promise<void> {
  const sb = getSupabase();
  if (!sb) throw new Error("Supabase is not configured");
  const { error } = await sb.from("resource_guides").delete().eq("id", id);
  if (error) throw error;
}

export async function adminGetPageCopy(): Promise<ResourcesPageCopy> {
  return fetchPageCopy();
}

export async function adminUpdatePageCopy(copy: Partial<ResourcesPageCopy>): Promise<ResourcesPageCopy> {
  const sb = getSupabase();
  if (!sb) throw new Error("Supabase is not configured");
  const { data, error } = await sb
    .from("resources_page_copy")
    .upsert({ id: 1, ...copy })
    .select()
    .single();
  if (error) throw error;
  return data as ResourcesPageCopy;
}

export async function adminListFaqs(): Promise<ResourceFaq[]> {
  const sb = getSupabase();
  if (!sb) throw new Error("Supabase is not configured");
  const { data, error } = await sb.from("resource_faqs").select("*").order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as ResourceFaq[];
}

export async function adminUpsertFaq(faq: Partial<ResourceFaq> & { question: string }): Promise<ResourceFaq> {
  const sb = getSupabase();
  if (!sb) throw new Error("Supabase is not configured");
  const { data, error } = await sb.from("resource_faqs").upsert(faq).select().single();
  if (error) throw error;
  return data as ResourceFaq;
}

export async function adminDeleteFaq(id: string): Promise<void> {
  const sb = getSupabase();
  if (!sb) throw new Error("Supabase is not configured");
  const { error } = await sb.from("resource_faqs").delete().eq("id", id);
  if (error) throw error;
}

export async function uploadContentImage(file: File, folder = "uploads"): Promise<string> {
  const sb = getSupabase();
  if (!sb) throw new Error("Supabase is not configured");
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await sb.storage.from("content-images").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;
  const { data } = sb.storage.from("content-images").getPublicUrl(path);
  return data.publicUrl;
}

export { isSupabaseConfigured };
