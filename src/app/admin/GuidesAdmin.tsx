import { useEffect, useState } from "react";
import { Plus, Save, Trash2 } from "lucide-react";
import { MarkdownEditor } from "./MarkdownEditor";
import { Field, StatusBanner, inputClass } from "./adminUi";
import { adminDeleteGuide, adminListGuides, adminUpsertGuide } from "@/app/content/api";
import {
  GUIDE_ICON_OPTIONS,
  PRODUCT_COLORS,
  PRODUCT_OPTIONS,
  type ResourceGuide,
} from "@/app/content/types";

export function GuidesAdmin() {
  const [guides, setGuides] = useState<ResourceGuide[]>([]);
  const [editing, setEditing] = useState<Partial<ResourceGuide> | null>(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  async function load() {
    try {
      setGuides(await adminListGuides());
      setError(false);
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
      setError(false);
      await load();
    } catch (e) {
      setError(true);
      setStatus(e instanceof Error ? e.message : "Delete failed");
    }
  }

  if (editing) {
    return (
      <div className="p-6 max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white/80" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {editing.id ? "Edit guide" : "New guide"}
          </h2>
          <button onClick={() => setEditing(null)} className="text-sm text-white/45 hover:text-white">
            Cancel
          </button>
        </div>
        <div className="space-y-5">
          <StatusBanner message={status} error={error} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Type">
              <input className={inputClass} value={editing.type || ""} onChange={(e) => setEditing({ ...editing, type: e.target.value })} />
            </Field>
            <Field label="Icon">
              <select
                className={`${inputClass} cursor-pointer`}
                value={editing.icon_key || "Camera"}
                onChange={(e) => setEditing({ ...editing, icon_key: e.target.value })}
              >
                {GUIDE_ICON_OPTIONS.map((k) => (
                  <option key={k} value={k} className="bg-[#0A1929]">
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
                className={`${inputClass} cursor-pointer`}
                value={editing.product || "VisualIQ"}
                onChange={(e) =>
                  setEditing({ ...editing, product: e.target.value, product_color: PRODUCT_COLORS[e.target.value] })
                }
              >
                {PRODUCT_OPTIONS.map((p) => (
                  <option key={p} value={p} className="bg-[#0A1929]">
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
            <textarea
              className={`${inputClass} min-h-[80px] resize-none`}
              value={editing.excerpt || ""}
              onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
            />
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
            className="inline-flex items-center gap-2 rounded-xl bg-[#1B6FE8] text-white text-sm font-semibold px-5 py-3 disabled:opacity-50"
          >
            <Save className="w-4 h-4" /> {busy ? "Saving…" : "Save guide"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="px-6 py-5 border-b border-white/[0.05] flex items-center justify-between">
        <div>
          <h1 className="text-base font-bold text-white/80" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Guides
          </h1>
          <p className="text-xs text-white/30 mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
            {guides.length} resource guides
          </p>
        </div>
        <button
          onClick={startNew}
          className="flex items-center gap-1.5 bg-[#1B6FE8] hover:bg-[#1558C8] text-white text-xs font-semibold px-3 py-2 rounded-lg transition-all"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          <Plus className="w-3.5 h-3.5" /> New guide
        </button>
      </div>
      <div className="p-6">
        <StatusBanner message={status} error={error} />
        <div className="bg-[#071528] border border-white/[0.07] rounded-2xl overflow-hidden divide-y divide-white/[0.03]">
          {guides.map((g) => (
            <div key={g.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.015]">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white/75 truncate" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {g.title}
                </p>
                <p className="text-[11px] text-white/35 mt-0.5">
                  {g.type} · {g.product} · order {g.sort_order}
                </p>
              </div>
              <button onClick={() => setEditing(g)} className="text-sm text-[#1B6FE8] hover:underline">
                Edit
              </button>
              <button onClick={() => remove(g.id)} className="text-white/25 hover:text-red-400">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          {guides.length === 0 && (
            <p className="py-12 text-center text-sm text-white/25">No guides yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
