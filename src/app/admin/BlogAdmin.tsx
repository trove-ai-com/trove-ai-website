import { useEffect, useState } from "react";
import {
  Check,
  ChevronRight,
  Edit2,
  Eye,
  EyeOff,
  FileText,
  ImagePlus,
  Plus,
  Save,
  Search,
  Send,
  Trash2,
} from "lucide-react";
import { MarkdownEditor } from "./MarkdownEditor";
import { Field, StatusBanner, inputClass, labelClass } from "./adminUi";
import {
  adminDeleteBlogPost,
  adminListBlogPosts,
  adminUpsertBlogPost,
  uploadContentImage,
} from "@/app/content/api";
import {
  PRODUCT_COLORS,
  PRODUCT_OPTIONS,
  slugify,
  type BlogPost,
} from "@/app/content/types";

type StatusFilter = "all" | "published" | "draft";

type Props = {
  editing: Partial<BlogPost> | null;
  onEdit: (post: Partial<BlogPost> | null) => void;
  onRequestNew: () => void;
};

export function emptyBlogDraft(): Partial<BlogPost> {
  return {
    title: "",
    slug: "",
    product: PRODUCT_OPTIONS[0],
    product_color: PRODUCT_COLORS[PRODUCT_OPTIONS[0]],
    image_url: "",
    excerpt: "",
    body: "",
    date_label: new Date().toLocaleString("en-US", { month: "short", year: "numeric" }),
    read_time: "5 min",
    tags: [],
    published: false,
  };
}

export function BlogAdmin({ editing, onEdit, onRequestNew }: Props) {
  if (editing) {
    return <BlogEditor editing={editing} onChange={onEdit} onClose={() => onEdit(null)} />;
  }
  return <BlogList onEdit={onEdit} onRequestNew={onRequestNew} />;
}

function BlogList({
  onEdit,
  onRequestNew,
}: {
  onEdit: (post: Partial<BlogPost> | null) => void;
  onRequestNew: () => void;
}) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [status, setStatus] = useState("");
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<StatusFilter>("all");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  async function load() {
    try {
      setPosts(await adminListBlogPosts());
      setError(false);
    } catch (e) {
      setError(true);
      setStatus(e instanceof Error ? e.message : "Failed to load posts");
    }
  }

  useEffect(() => {
    load();
  }, []);

  const filtered = posts.filter((p) => {
    const matchStatus =
      filterStatus === "all" ||
      (filterStatus === "published" ? p.published : !p.published);
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.product.toLowerCase().includes(q) ||
      p.slug.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const stats = {
    total: posts.length,
    published: posts.filter((p) => p.published).length,
    draft: posts.filter((p) => !p.published).length,
  };

  async function setPublished(post: BlogPost, published: boolean) {
    try {
      await adminUpsertBlogPost({ ...post, published });
      setStatus(published ? "Published." : "Moved to draft.");
      setError(false);
      await load();
    } catch (e) {
      setError(true);
      setStatus(e instanceof Error ? e.message : "Update failed");
    }
  }

  async function remove(id: string) {
    try {
      await adminDeleteBlogPost(id);
      setConfirmDelete(null);
      setStatus("Deleted.");
      setError(false);
      await load();
    } catch (e) {
      setError(true);
      setStatus(e instanceof Error ? e.message : "Delete failed");
    }
  }

  const statusColor = {
    published: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    draft: "text-white/50 bg-white/[0.05] border-white/[0.1]",
  };

  return (
    <div>
      <div className="px-6 py-5 border-b border-white/[0.05] flex items-center justify-between">
        <div>
          <h1 className="text-base font-bold text-white/80" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Blog Posts
          </h1>
          <p className="text-xs text-white/30 mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
            {filtered.length} of {posts.length} posts
          </p>
        </div>
        <button
          onClick={onRequestNew}
          className="flex items-center gap-1.5 bg-[#1B6FE8] hover:bg-[#1558C8] text-white text-xs font-semibold px-3 py-2 rounded-lg transition-all"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          <Plus className="w-3.5 h-3.5" /> New post
        </button>
      </div>

      <div className="p-6">
        <StatusBanner message={status} error={error} />

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          {[
            { label: "Total", value: stats.total, color: "#1B6FE8" },
            { label: "Published", value: stats.published, color: "#10B981" },
            { label: "Drafts", value: stats.draft, color: "#64748B" },
          ].map((s) => (
            <div key={s.label} className="bg-[#071528] border border-white/[0.07] rounded-xl px-4 py-4">
              <p className="text-2xl font-bold mb-0.5" style={{ color: s.color, fontFamily: "'Space Grotesk', sans-serif" }}>
                {s.value}
              </p>
              <p
                className="text-[11px] text-white/35 uppercase tracking-wider font-semibold"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-[#071528] border border-white/[0.07] rounded-2xl overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 px-5 py-4 border-b border-white/[0.06]">
            <h2 className="text-sm font-bold text-white/70 mr-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              All posts
            </h2>
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title, product, or slug…"
                className="w-full bg-[#0A1929] border border-white/[0.08] rounded-lg pl-9 pr-4 py-1.5 text-sm text-white/70 placeholder-white/20 focus:outline-none focus:border-[#1B6FE8]/40"
                style={{ fontFamily: "Inter, sans-serif" }}
              />
            </div>
            <div className="flex gap-1 flex-shrink-0">
              {(["all", "published", "draft"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold capitalize transition-colors ${
                    filterStatus === s ? "bg-[#1B6FE8]/20 text-[#1B6FE8]" : "text-white/35 hover:text-white/60"
                  }`}
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div
            className="hidden md:grid grid-cols-[auto_1fr_120px_100px_100px] gap-4 px-5 py-2 border-b border-white/[0.04] text-[10px] font-bold uppercase tracking-widest text-white/20"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <span className="w-14" />
            <span>Title</span>
            <span>Product</span>
            <span>Status</span>
            <span>Actions</span>
          </div>

          <div className="divide-y divide-white/[0.03]">
            {filtered.length === 0 && (
              <div className="py-16 text-center">
                <FileText className="w-7 h-7 text-white/15 mx-auto mb-3" />
                <p className="text-sm text-white/25" style={{ fontFamily: "Inter, sans-serif" }}>
                  No posts match this filter
                </p>
              </div>
            )}
            {filtered.map((post) => (
              <div
                key={post.id}
                className="grid grid-cols-1 md:grid-cols-[auto_1fr_120px_100px_100px] gap-x-4 gap-y-2 px-5 py-3.5 hover:bg-white/[0.015] transition-colors group items-center"
              >
                <div className="w-14 h-10 rounded-lg overflow-hidden bg-white/[0.04] flex-shrink-0 hidden md:block">
                  {post.image_url && (
                    <img
                      src={post.image_url}
                      alt=""
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                    />
                  )}
                </div>
                <div className="min-w-0">
                  <p
                    className="text-sm font-semibold text-white/75 group-hover:text-white/90 transition-colors truncate mb-0.5"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {post.title}
                  </p>
                  <div className="flex items-center gap-2 text-[11px] text-white/25" style={{ fontFamily: "Inter, sans-serif" }}>
                    <span>{post.date_label || "—"}</span>
                    <span>·</span>
                    <span>{post.read_time}</span>
                  </div>
                </div>
                <span className="text-xs text-white/35 truncate hidden md:block" style={{ fontFamily: "Inter, sans-serif" }}>
                  {post.product}
                </span>
                <span
                  className={`hidden md:inline-flex text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border w-fit ${
                    post.published ? statusColor.published : statusColor.draft
                  }`}
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {post.published ? "published" : "draft"}
                </span>
                <div className="flex items-center gap-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                  {!post.published ? (
                    <button
                      onClick={() => setPublished(post, true)}
                      title="Publish"
                      className="w-7 h-7 flex items-center justify-center rounded-md text-emerald-400/50 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setPublished(post, false)}
                      title="Unpublish"
                      className="w-7 h-7 flex items-center justify-center rounded-md text-yellow-400/50 hover:text-yellow-400 hover:bg-yellow-500/10 transition-colors"
                    >
                      <EyeOff className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    onClick={() => onEdit(post)}
                    title="Edit"
                    className="w-7 h-7 flex items-center justify-center rounded-md text-white/25 hover:text-white hover:bg-white/[0.06] transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  {confirmDelete === post.id ? (
                    <button
                      onClick={() => remove(post.id)}
                      className="px-2 h-7 flex items-center gap-1 rounded-md text-red-400 bg-red-500/10 text-[11px] font-semibold"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      Delete?
                    </button>
                  ) : (
                    <button
                      onClick={() => setConfirmDelete(post.id)}
                      title="Delete"
                      className="w-7 h-7 flex items-center justify-center rounded-md text-white/15 hover:text-red-400 hover:bg-red-500/[0.08] transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BlogEditor({
  editing,
  onChange,
  onClose,
}: {
  editing: Partial<BlogPost>;
  onChange: (post: Partial<BlogPost> | null) => void;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"content" | "seo" | "settings">("content");
  const [statusMsg, setStatusMsg] = useState("");
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);

  function patch(partial: Partial<BlogPost>) {
    onChange({ ...editing, ...partial });
  }

  function handleTitleChange(v: string) {
    patch({
      title: v,
      slug: editing.id ? editing.slug : slugify(v),
    });
  }

  async function save(published?: boolean) {
    if (!editing.title) {
      setError(true);
      setStatusMsg("Title is required.");
      return;
    }
    setBusy(true);
    setError(false);
    const nextPublished = published ?? Boolean(editing.published);
    try {
      const slug = editing.slug || slugify(editing.title);
      await adminUpsertBlogPost({
        ...editing,
        title: editing.title,
        slug,
        product: editing.product || "DeepSense",
        product_color: editing.product_color || PRODUCT_COLORS[editing.product || ""] || "#1B6FE8",
        image_url: editing.image_url || "",
        excerpt: editing.excerpt || "",
        body: editing.body || "",
        date_label: editing.date_label || "",
        read_time: editing.read_time || "5 min",
        tags: editing.tags || [],
        published: nextPublished,
      });
      patch({ published: nextPublished });
      setSaved(true);
      setStatusMsg(nextPublished ? "Published." : "Draft saved.");
      setTimeout(() => setSaved(false), 2000);
      if (!editing.id) {
        onClose();
      }
    } catch (e) {
      setError(true);
      setStatusMsg(e instanceof Error ? e.message : "Save failed");
    }
    setBusy(false);
  }

  async function onCover(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    try {
      const url = await uploadContentImage(file, "blog");
      patch({ image_url: url });
      setStatusMsg("Image uploaded.");
      setError(false);
    } catch (e) {
      setError(true);
      setStatusMsg(e instanceof Error ? e.message : "Upload failed");
    }
    setBusy(false);
  }

  const tabBtn = (id: typeof activeTab, label: string) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
        activeTab === id ? "bg-[#1B6FE8]/20 text-[#1B6FE8]" : "text-white/40 hover:text-white/70"
      }`}
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      {label}
    </button>
  );

  const tagsStr = (editing.tags || []).join(", ");
  const isPublished = Boolean(editing.published);

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-white/40 hover:text-white/70 transition-colors text-sm"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <ChevronRight className="w-4 h-4 rotate-180" /> All posts
          </button>
          <ChevronRight className="w-3 h-3 text-white/20" />
          <span className="text-white/60 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
            {editing.id ? "Edit post" : "New post"}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="text-emerald-400 text-sm flex items-center gap-1">
              <Check className="w-4 h-4" />
              Saved
            </span>
          )}
          <button
            onClick={() => void save(false)}
            disabled={busy}
            className="px-4 py-2 border border-white/[0.12] hover:border-white/[0.24] text-white/60 hover:text-white rounded-lg text-sm font-semibold transition-all disabled:opacity-50"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Save draft
          </button>
          <button
            onClick={() => void save(true)}
            disabled={busy}
            className="flex items-center gap-2 px-5 py-2 bg-[#1B6FE8] hover:bg-[#1558C8] text-white rounded-lg text-sm font-semibold transition-all disabled:opacity-50"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <Send className="w-4 h-4" /> Publish
          </button>
        </div>
      </div>

      <StatusBanner message={statusMsg} error={error} />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
        <div className="space-y-6">
          <input
            value={editing.title || ""}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Post title..."
            className="w-full bg-transparent border-b border-white/[0.1] pb-3 text-3xl font-bold text-white placeholder-white/20 focus:outline-none focus:border-[#1B6FE8]/60 transition-colors"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          />

          <div className="flex gap-2 border-b border-white/[0.06] pb-0">
            {tabBtn("content", "Content")}
            {tabBtn("seo", "SEO")}
            {tabBtn("settings", "Settings")}
          </div>

          {activeTab === "content" && (
            <div className="space-y-5">
              <div>
                <label className={labelClass} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Excerpt
                </label>
                <textarea
                  value={editing.excerpt || ""}
                  onChange={(e) => patch({ excerpt: e.target.value })}
                  rows={2}
                  placeholder="Short summary shown in listings..."
                  className={`${inputClass} resize-none`}
                  style={{ fontFamily: "Inter, sans-serif" }}
                />
              </div>
              <div>
                <label className={labelClass} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Content
                </label>
                <MarkdownEditor
                  value={editing.body || ""}
                  onChange={(body) => patch({ body })}
                  minHeightClass="min-h-[280px]"
                />
              </div>
            </div>
          )}

          {activeTab === "seo" && (
            <div className="space-y-5">
              <div>
                <label className={labelClass} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  URL slug
                </label>
                <div className="flex items-center bg-[#0A1929] border border-white/[0.1] rounded-xl overflow-hidden focus-within:border-[#1B6FE8]/60 transition-colors">
                  <span
                    className="px-4 text-white/25 text-sm border-r border-white/[0.08] py-3 whitespace-nowrap"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    /blog/
                  </span>
                  <input
                    value={editing.slug || ""}
                    onChange={(e) => patch({ slug: e.target.value })}
                    className="flex-1 bg-transparent px-3 py-3 text-white text-sm focus:outline-none"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  />
                </div>
              </div>
              <div>
                <label className={labelClass} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Excerpt as meta description
                </label>
                <textarea
                  value={editing.excerpt || ""}
                  onChange={(e) => patch({ excerpt: e.target.value })}
                  rows={3}
                  className={`${inputClass} resize-none`}
                  style={{ fontFamily: "Inter, sans-serif" }}
                  placeholder="Appears in listings and search-style summaries..."
                />
                <p className="text-xs text-white/30 mt-1" style={{ fontFamily: "Inter, sans-serif" }}>
                  {(editing.excerpt || "").length}/160 characters
                </p>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-5">
              <Field label="Featured image">
                <div className="flex flex-wrap items-center gap-3">
                  <label className="inline-flex items-center gap-2 text-sm text-white/50 border border-white/[0.1] rounded-full px-4 py-2 cursor-pointer hover:border-white/25">
                    <ImagePlus className="w-4 h-4" /> Upload
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => onCover(e.target.files?.[0])} />
                  </label>
                  <input
                    className={`${inputClass} flex-1 min-w-[200px]`}
                    placeholder="Or paste image URL"
                    value={editing.image_url || ""}
                    onChange={(e) => patch({ image_url: e.target.value })}
                  />
                </div>
                {editing.image_url && (
                  <img
                    src={editing.image_url}
                    alt="Preview"
                    className="mt-3 w-full h-40 object-cover rounded-lg border border-white/[0.08]"
                  />
                )}
              </Field>
              <Field label="Product">
                <select
                  className={`${inputClass} cursor-pointer`}
                  value={editing.product || PRODUCT_OPTIONS[0]}
                  onChange={(e) =>
                    patch({
                      product: e.target.value,
                      product_color: PRODUCT_COLORS[e.target.value],
                    })
                  }
                >
                  {PRODUCT_OPTIONS.map((p) => (
                    <option key={p} value={p} className="bg-[#0A1929]">
                      {p}
                    </option>
                  ))}
                </select>
              </Field>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Date label">
                  <input
                    className={inputClass}
                    value={editing.date_label || ""}
                    onChange={(e) => patch({ date_label: e.target.value })}
                  />
                </Field>
                <Field label="Read time">
                  <input
                    className={inputClass}
                    value={editing.read_time || ""}
                    onChange={(e) => patch({ read_time: e.target.value })}
                  />
                </Field>
              </div>
              <Field label="Tags (comma-separated)">
                <input
                  className={inputClass}
                  value={tagsStr}
                  onChange={(e) =>
                    patch({
                      tags: e.target.value
                        .split(",")
                        .map((t) => t.trim())
                        .filter(Boolean),
                    })
                  }
                  placeholder="AI, Government, Security..."
                />
              </Field>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-[#071528] border border-white/[0.07] rounded-xl p-5">
            <p
              className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Publish status
            </p>
            <div className="space-y-2">
              {([
                { id: false, label: "draft" },
                { id: true, label: "published" },
              ] as const).map((s) => (
                <label
                  key={String(s.id)}
                  className="flex items-center gap-3 cursor-pointer p-2 rounded-lg transition-colors hover:bg-white/[0.03]"
                >
                  <input
                    type="radio"
                    name="status"
                    checked={isPublished === s.id}
                    onChange={() => patch({ published: s.id })}
                    className="accent-[#1B6FE8]"
                  />
                  <p
                    className={`text-sm font-semibold capitalize ${
                      s.id ? "text-emerald-400" : "text-white/60"
                    }`}
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {s.label}
                  </p>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={() => save()}
            disabled={busy}
            className="w-full flex items-center justify-center gap-2 bg-[#071528] border border-white/[0.12] hover:border-[#1B6FE8]/40 text-white/70 hover:text-white py-3 rounded-xl text-sm font-semibold transition-all disabled:opacity-50"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <Save className="w-4 h-4" /> {busy ? "Saving…" : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
