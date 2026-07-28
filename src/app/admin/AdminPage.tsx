import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowLeft,
  ImagePlus,
  LogOut,
  Plus,
  Save,
  Trash2,
  FileText,
  BookOpen,
  Type,
  HelpCircle,
} from "lucide-react";
import { useAuth } from "./AuthProvider";
import { MarkdownEditor } from "./MarkdownEditor";
import {
  adminDeleteBlogPost,
  adminDeleteFaq,
  adminDeleteGuide,
  adminListBlogPosts,
  adminListFaqs,
  adminListGuides,
  adminUpdatePageCopy,
  adminUpsertBlogPost,
  adminUpsertFaq,
  adminUpsertGuide,
  uploadContentImage,
  adminGetPageCopy,
} from "@/app/content/api";
import {
  GUIDE_ICON_OPTIONS,
  PRODUCT_COLORS,
  PRODUCT_OPTIONS,
  slugify,
  type BlogPost,
  type ResourceFaq,
  type ResourceGuide,
  type ResourcesPageCopy,
} from "@/app/content/types";

type Tab = "blog" | "guides" | "copy" | "faqs";

const inputClass =
  "w-full rounded-xl bg-[#071528] border border-white/[0.08] px-4 py-3 text-sm text-white/85 placeholder:text-white/25 focus:outline-none focus:border-[#1B6FE8]/50";
const labelClass = "block text-[11px] font-bold tracking-[0.16em] uppercase text-white/42 mb-2";

type Props = { onNavigate: (page: string) => void };

export function AdminPage({ onNavigate }: Props) {
  const { user, loading, configured, signIn, signOut } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [signingIn, setSigningIn] = useState(false);

  async function handleSignIn(e: FormEvent) {
    e.preventDefault();
    setAuthError("");
    setSigningIn(true);
    const { error } = await signIn(username, password);
    setSigningIn(false);
    if (error) setAuthError(error);
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-24 bg-[#040D1A] flex items-center justify-center">
        <p className="text-white/40 text-sm">Loading…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen pt-16 bg-[#040D1A]">
        <div className="max-w-md mx-auto px-6 py-16">
          <button
            onClick={() => onNavigate("resources")}
            className="inline-flex items-center gap-2 text-[11px] text-white/42 hover:text-white/60 mb-8"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to site
          </button>
          <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-[#10B981] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Admin
          </p>
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Sign in
          </h1>
          <p className="text-white/45 text-sm mb-8" style={{ fontFamily: "Inter, sans-serif" }}>
            Manage Resources &amp; Insights content. Use the username created in Supabase Auth.
          </p>

          {!configured && (
            <div className="mb-6 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200/90">
              Supabase is not configured. Copy <code className="text-amber-100">.env.example</code> to{" "}
              <code className="text-amber-100">.env</code> and add your project URL and anon key.
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-4 rounded-2xl border border-white/[0.07] bg-[#071528]/60 p-6">
            <div>
              <label className={labelClass} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Username
              </label>
              <input
                className={inputClass}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
              />
            </div>
            <div>
              <label className={labelClass} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Password
              </label>
              <input
                type="password"
                className={inputClass}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
            {authError && <p className="text-sm text-red-400">{authError}</p>}
            <button
              type="submit"
              disabled={signingIn || !configured}
              className="w-full rounded-xl bg-[#1B6FE8] hover:bg-[#1558c0] disabled:opacity-50 text-white text-sm font-semibold px-5 py-3 transition-colors"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {signingIn ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <AdminDashboard onNavigate={onNavigate} onSignOut={signOut} />;
}

function AdminDashboard({ onNavigate, onSignOut }: { onNavigate: (p: string) => void; onSignOut: () => Promise<void> }) {
  const [tab, setTab] = useState<Tab>("blog");

  const tabs: { id: Tab; label: string; Icon: typeof FileText }[] = [
    { id: "blog", label: "Blog", Icon: FileText },
    { id: "guides", label: "Guides", Icon: BookOpen },
    { id: "copy", label: "Page copy", Icon: Type },
    { id: "faqs", label: "FAQs", Icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen pt-16 bg-[#040D1A]">
      <div className="border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-6 py-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-[#10B981] mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Resources &amp; Insights
            </p>
            <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Content admin
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate("resources")}
              className="text-sm text-white/45 hover:text-white transition-colors"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              View site
            </button>
            <button
              onClick={() => onSignOut()}
              className="inline-flex items-center gap-2 text-sm text-white/45 hover:text-white border border-white/[0.1] rounded-full px-4 py-2 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign out
            </button>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-6 flex gap-1 pb-0 overflow-x-auto">
          {tabs.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`inline-flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                tab === id ? "border-[#10B981] text-white" : "border-transparent text-white/40 hover:text-white/70"
              }`}
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <Icon className="w-3.5 h-3.5" /> {label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {tab === "blog" && <BlogAdmin />}
        {tab === "guides" && <GuidesAdmin />}
        {tab === "copy" && <CopyAdmin />}
        {tab === "faqs" && <FaqsAdmin />}
      </div>
    </div>
  );
}

function StatusBanner({ message, error }: { message: string; error?: boolean }) {
  if (!message) return null;
  return (
    <p className={`text-sm mb-4 ${error ? "text-red-400" : "text-[#10B981]"}`} style={{ fontFamily: "Inter, sans-serif" }}>
      {message}
    </p>
  );
}

// ─── Blog admin ─────────────────────────────────────────────────────────────

function BlogAdmin() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<Partial<BlogPost> | null>(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  async function load() {
    try {
      setPosts(await adminListBlogPosts());
    } catch (e) {
      setError(true);
      setStatus(e instanceof Error ? e.message : "Failed to load posts");
    }
  }

  useEffect(() => {
    load();
  }, []);

  function startNew() {
    setEditing({
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
      published: true,
    });
    setStatus("");
  }

  async function save() {
    if (!editing?.title) return;
    setBusy(true);
    setError(false);
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
        published: editing.published !== false,
      });
      setStatus("Saved.");
      setEditing(null);
      await load();
    } catch (e) {
      setError(true);
      setStatus(e instanceof Error ? e.message : "Save failed");
    }
    setBusy(false);
  }

  async function remove(id: string) {
    if (!confirm("Delete this article permanently?")) return;
    try {
      await adminDeleteBlogPost(id);
      setStatus("Deleted.");
      await load();
    } catch (e) {
      setError(true);
      setStatus(e instanceof Error ? e.message : "Delete failed");
    }
  }

  async function onCover(file: File | undefined) {
    if (!file || !editing) return;
    setBusy(true);
    try {
      const url = await uploadContentImage(file, "blog");
      setEditing({ ...editing, image_url: url });
      setStatus("Image uploaded.");
    } catch (e) {
      setError(true);
      setStatus(e instanceof Error ? e.message : "Upload failed");
    }
    setBusy(false);
  }

  if (editing) {
    const tagsStr = (editing.tags || []).join(", ");
    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {editing.id ? "Edit article" : "New article"}
          </h2>
          <button onClick={() => setEditing(null)} className="text-sm text-white/45 hover:text-white">
            Cancel
          </button>
        </div>
        <StatusBanner message={status} error={error} />
        <Field label="Title">
          <input
            className={inputClass}
            value={editing.title || ""}
            onChange={(e) =>
              setEditing({
                ...editing,
                title: e.target.value,
                slug: editing.id ? editing.slug : slugify(e.target.value),
              })
            }
          />
        </Field>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Slug">
            <input className={inputClass} value={editing.slug || ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} />
          </Field>
          <Field label="Product">
            <select
              className={inputClass}
              value={editing.product || PRODUCT_OPTIONS[0]}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  product: e.target.value,
                  product_color: PRODUCT_COLORS[e.target.value],
                })
              }
            >
              {PRODUCT_OPTIONS.map((p) => (
                <option key={p} value={p} className="bg-[#071528]">
                  {p}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Date label">
            <input className={inputClass} value={editing.date_label || ""} onChange={(e) => setEditing({ ...editing, date_label: e.target.value })} />
          </Field>
          <Field label="Read time">
            <input className={inputClass} value={editing.read_time || ""} onChange={(e) => setEditing({ ...editing, read_time: e.target.value })} />
          </Field>
        </div>
        <Field label="Tags (comma-separated)">
          <input
            className={inputClass}
            value={tagsStr}
            onChange={(e) =>
              setEditing({
                ...editing,
                tags: e.target.value
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean),
              })
            }
          />
        </Field>
        <Field label="Excerpt">
          <textarea className={`${inputClass} min-h-[80px]`} value={editing.excerpt || ""} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} />
        </Field>
        <Field label="Cover image">
          <div className="flex flex-wrap items-center gap-3">
            <label className="inline-flex items-center gap-2 text-sm text-white/50 border border-white/[0.1] rounded-full px-4 py-2 cursor-pointer hover:border-white/25">
              <ImagePlus className="w-4 h-4" /> Upload
              <input type="file" accept="image/*" className="hidden" onChange={(e) => onCover(e.target.files?.[0])} />
            </label>
            <input
              className={`${inputClass} flex-1 min-w-[200px]`}
              placeholder="Or paste image URL"
              value={editing.image_url || ""}
              onChange={(e) => setEditing({ ...editing, image_url: e.target.value })}
            />
          </div>
          {editing.image_url && (
            <div className="mt-3 h-40 rounded-xl overflow-hidden border border-white/[0.08]">
              <img src={editing.image_url} alt="" className="w-full h-full object-cover" />
            </div>
          )}
        </Field>
        <Field label="Body">
          <MarkdownEditor
            value={editing.body || ""}
            onChange={(body) => setEditing({ ...editing, body })}
            minHeightClass="min-h-[220px]"
          />
        </Field>
        <label className="flex items-center gap-2 text-sm text-white/60">
          <input
            type="checkbox"
            checked={editing.published !== false}
            onChange={(e) => setEditing({ ...editing, published: e.target.checked })}
          />
          Published
        </label>
        <button
          onClick={save}
          disabled={busy}
          className="inline-flex items-center gap-2 rounded-xl bg-[#1B6FE8] hover:bg-[#1558c0] disabled:opacity-50 text-white text-sm font-semibold px-5 py-3"
        >
          <Save className="w-4 h-4" /> {busy ? "Saving…" : "Save article"}
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Blog articles
        </h2>
        <button onClick={startNew} className="inline-flex items-center gap-2 rounded-xl bg-[#1B6FE8] text-white text-sm font-semibold px-4 py-2.5">
          <Plus className="w-4 h-4" /> New article
        </button>
      </div>
      <StatusBanner message={status} error={error} />
      <div className="space-y-3">
        {posts.map((p) => (
          <div key={p.id} className="flex items-center gap-4 rounded-xl border border-white/[0.07] bg-[#071528]/50 p-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{p.title}</p>
              <p className="text-[11px] text-white/40 mt-1">
                {p.product} · {p.date_label} · {p.published ? "Published" : "Draft"}
              </p>
            </div>
            <button onClick={() => setEditing(p)} className="text-sm text-[#10B981] hover:underline">
              Edit
            </button>
            <button onClick={() => remove(p.id)} className="text-white/35 hover:text-red-400">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        {posts.length === 0 && <p className="text-white/40 text-sm">No articles yet.</p>}
      </div>
    </div>
  );
}

// ─── Guides admin ───────────────────────────────────────────────────────────

function GuidesAdmin() {
  const [guides, setGuides] = useState<ResourceGuide[]>([]);
  const [editing, setEditing] = useState<Partial<ResourceGuide> | null>(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  async function load() {
    try {
      setGuides(await adminListGuides());
    } catch (e) {
      setError(true);
      setStatus(e instanceof Error ? e.message : "Failed to load guides");
    }
  }

  useEffect(() => {
    load();
  }, []);

  function startNew() {
    setEditing({
      type: "Guide",
      title: "",
      excerpt: "",
      body: "",
      product: "VisualIQ",
      product_color: PRODUCT_COLORS.VisualIQ,
      date_label: new Date().toLocaleString("en-US", { month: "short", year: "numeric" }),
      read_time: "5 min",
      tags: [],
      icon_key: "Camera",
      published: true,
      sort_order: guides.length,
    });
  }

  async function save() {
    if (!editing?.title) return;
    setBusy(true);
    setError(false);
    try {
      await adminUpsertGuide({
        ...editing,
        title: editing.title,
        type: editing.type || "Guide",
        excerpt: editing.excerpt || "",
        body: editing.body || "",
        product: editing.product || "VisualIQ",
        product_color: editing.product_color || "#0EA5E9",
        date_label: editing.date_label || "",
        read_time: editing.read_time || "5 min",
        tags: editing.tags || [],
        icon_key: editing.icon_key || "Camera",
        published: editing.published !== false,
        sort_order: editing.sort_order ?? 0,
      });
      setStatus("Saved.");
      setEditing(null);
      await load();
    } catch (e) {
      setError(true);
      setStatus(e instanceof Error ? e.message : "Save failed");
    }
    setBusy(false);
  }

  async function remove(id: string) {
    if (!confirm("Delete this guide permanently?")) return;
    try {
      await adminDeleteGuide(id);
      setStatus("Deleted.");
      await load();
    } catch (e) {
      setError(true);
      setStatus(e instanceof Error ? e.message : "Delete failed");
    }
  }

  if (editing) {
    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {editing.id ? "Edit guide" : "New guide"}
          </h2>
          <button onClick={() => setEditing(null)} className="text-sm text-white/45 hover:text-white">
            Cancel
          </button>
        </div>
        <StatusBanner message={status} error={error} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Type">
            <input className={inputClass} value={editing.type || ""} onChange={(e) => setEditing({ ...editing, type: e.target.value })} />
          </Field>
          <Field label="Icon">
            <select className={inputClass} value={editing.icon_key || "Camera"} onChange={(e) => setEditing({ ...editing, icon_key: e.target.value })}>
              {GUIDE_ICON_OPTIONS.map((k) => (
                <option key={k} value={k} className="bg-[#071528]">
                  {k}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <Field label="Title">
          <input className={inputClass} value={editing.title || ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
        </Field>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field label="Product">
            <select
              className={inputClass}
              value={editing.product || "VisualIQ"}
              onChange={(e) => setEditing({ ...editing, product: e.target.value, product_color: PRODUCT_COLORS[e.target.value] })}
            >
              {PRODUCT_OPTIONS.map((p) => (
                <option key={p} value={p} className="bg-[#071528]">
                  {p}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Date">
            <input className={inputClass} value={editing.date_label || ""} onChange={(e) => setEditing({ ...editing, date_label: e.target.value })} />
          </Field>
          <Field label="Read time">
            <input className={inputClass} value={editing.read_time || ""} onChange={(e) => setEditing({ ...editing, read_time: e.target.value })} />
          </Field>
        </div>
        <Field label="Tags (comma-separated)">
          <input
            className={inputClass}
            value={(editing.tags || []).join(", ")}
            onChange={(e) =>
              setEditing({
                ...editing,
                tags: e.target.value
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean),
              })
            }
          />
        </Field>
        <Field label="Excerpt">
          <textarea className={`${inputClass} min-h-[80px]`} value={editing.excerpt || ""} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} />
        </Field>
        <Field label="Body">
          <MarkdownEditor
            value={editing.body || ""}
            onChange={(body) => setEditing({ ...editing, body })}
            minHeightClass="min-h-[180px]"
          />
        </Field>
        <Field label="Sort order">
          <input
            type="number"
            className={inputClass}
            value={editing.sort_order ?? 0}
            onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })}
          />
        </Field>
        <label className="flex items-center gap-2 text-sm text-white/60">
          <input type="checkbox" checked={editing.published !== false} onChange={(e) => setEditing({ ...editing, published: e.target.checked })} />
          Published
        </label>
        <button onClick={save} disabled={busy} className="inline-flex items-center gap-2 rounded-xl bg-[#1B6FE8] text-white text-sm font-semibold px-5 py-3 disabled:opacity-50">
          <Save className="w-4 h-4" /> {busy ? "Saving…" : "Save guide"}
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Resource guides
        </h2>
        <button onClick={startNew} className="inline-flex items-center gap-2 rounded-xl bg-[#1B6FE8] text-white text-sm font-semibold px-4 py-2.5">
          <Plus className="w-4 h-4" /> New guide
        </button>
      </div>
      <StatusBanner message={status} error={error} />
      <div className="space-y-3">
        {guides.map((g) => (
          <div key={g.id} className="flex items-center gap-4 rounded-xl border border-white/[0.07] bg-[#071528]/50 p-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{g.title}</p>
              <p className="text-[11px] text-white/40 mt-1">
                {g.type} · {g.product} · order {g.sort_order}
              </p>
            </div>
            <button onClick={() => setEditing(g)} className="text-sm text-[#10B981] hover:underline">
              Edit
            </button>
            <button onClick={() => remove(g.id)} className="text-white/35 hover:text-red-400">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Page copy admin ────────────────────────────────────────────────────────

function CopyAdmin() {
  const [copy, setCopy] = useState<ResourcesPageCopy | null>(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    adminGetPageCopy()
      .then(setCopy)
      .catch((e) => {
        setError(true);
        setStatus(e instanceof Error ? e.message : "Failed to load page copy");
      });
  }, []);

  async function save() {
    if (!copy) return;
    setBusy(true);
    setError(false);
    try {
      const saved = await adminUpdatePageCopy(copy);
      setCopy(saved);
      setStatus("Page copy saved.");
    } catch (e) {
      setError(true);
      setStatus(e instanceof Error ? e.message : "Save failed");
    }
    setBusy(false);
  }

  if (!copy) return <p className="text-white/40 text-sm">Loading…</p>;

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        Resources page copy
      </h2>
      <StatusBanner message={status} error={error} />
      {(
        [
          ["hero_eyebrow", "Hero eyebrow"],
          ["hero_title", "Hero title"],
          ["hero_subtitle", "Hero subtitle"],
          ["hero_note", "Hero note"],
          ["about_label", "About label"],
          ["about_body", "About body"],
          ["cta_eyebrow", "CTA eyebrow"],
          ["cta_title", "CTA title"],
          ["cta_body", "CTA body"],
        ] as const
      ).map(([key, label]) => (
        <Field key={key} label={label}>
          {key.includes("body") || key.includes("subtitle") || key.includes("note") || key === "hero_title" ? (
            <textarea
              className={`${inputClass} min-h-[72px]`}
              value={copy[key]}
              onChange={(e) => setCopy({ ...copy, [key]: e.target.value })}
            />
          ) : (
            <input className={inputClass} value={copy[key]} onChange={(e) => setCopy({ ...copy, [key]: e.target.value })} />
          )}
        </Field>
      ))}
      <button onClick={save} disabled={busy} className="inline-flex items-center gap-2 rounded-xl bg-[#1B6FE8] text-white text-sm font-semibold px-5 py-3 disabled:opacity-50">
        <Save className="w-4 h-4" /> {busy ? "Saving…" : "Save page copy"}
      </button>
    </div>
  );
}

// ─── FAQs admin ─────────────────────────────────────────────────────────────

function FaqsAdmin() {
  const [faqs, setFaqs] = useState<ResourceFaq[]>([]);
  const [editing, setEditing] = useState<Partial<ResourceFaq> | null>(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  async function load() {
    try {
      setFaqs(await adminListFaqs());
    } catch (e) {
      setError(true);
      setStatus(e instanceof Error ? e.message : "Failed to load FAQs");
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function save() {
    if (!editing?.question) return;
    setBusy(true);
    setError(false);
    try {
      await adminUpsertFaq({
        ...editing,
        question: editing.question,
        answer: editing.answer || "",
        sort_order: editing.sort_order ?? faqs.length,
        published: editing.published !== false,
      });
      setStatus("Saved.");
      setEditing(null);
      await load();
    } catch (e) {
      setError(true);
      setStatus(e instanceof Error ? e.message : "Save failed");
    }
    setBusy(false);
  }

  async function remove(id: string) {
    if (!confirm("Delete this FAQ?")) return;
    try {
      await adminDeleteFaq(id);
      setStatus("Deleted.");
      await load();
    } catch (e) {
      setError(true);
      setStatus(e instanceof Error ? e.message : "Delete failed");
    }
  }

  if (editing) {
    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {editing.id ? "Edit FAQ" : "New FAQ"}
          </h2>
          <button onClick={() => setEditing(null)} className="text-sm text-white/45 hover:text-white">
            Cancel
          </button>
        </div>
        <StatusBanner message={status} error={error} />
        <Field label="Question">
          <input className={inputClass} value={editing.question || ""} onChange={(e) => setEditing({ ...editing, question: e.target.value })} />
        </Field>
        <Field label="Answer">
          <textarea className={`${inputClass} min-h-[120px]`} value={editing.answer || ""} onChange={(e) => setEditing({ ...editing, answer: e.target.value })} />
        </Field>
        <Field label="Sort order">
          <input
            type="number"
            className={inputClass}
            value={editing.sort_order ?? 0}
            onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })}
          />
        </Field>
        <label className="flex items-center gap-2 text-sm text-white/60">
          <input type="checkbox" checked={editing.published !== false} onChange={(e) => setEditing({ ...editing, published: e.target.checked })} />
          Published
        </label>
        <button onClick={save} disabled={busy} className="inline-flex items-center gap-2 rounded-xl bg-[#1B6FE8] text-white text-sm font-semibold px-5 py-3 disabled:opacity-50">
          <Save className="w-4 h-4" /> {busy ? "Saving…" : "Save FAQ"}
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Resources FAQs
        </h2>
        <button
          onClick={() => setEditing({ question: "", answer: "", sort_order: faqs.length, published: true })}
          className="inline-flex items-center gap-2 rounded-xl bg-[#1B6FE8] text-white text-sm font-semibold px-4 py-2.5"
        >
          <Plus className="w-4 h-4" /> New FAQ
        </button>
      </div>
      <StatusBanner message={status} error={error} />
      <div className="space-y-3">
        {faqs.map((f) => (
          <div key={f.id} className="flex items-center gap-4 rounded-xl border border-white/[0.07] bg-[#071528]/50 p-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{f.question}</p>
              <p className="text-[11px] text-white/40 mt-1 line-clamp-1">{f.answer}</p>
            </div>
            <button onClick={() => setEditing(f)} className="text-sm text-[#10B981] hover:underline">
              Edit
            </button>
            <button onClick={() => remove(f.id)} className="text-white/35 hover:text-red-400">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={labelClass} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        {label}
      </label>
      {children}
    </div>
  );
}
