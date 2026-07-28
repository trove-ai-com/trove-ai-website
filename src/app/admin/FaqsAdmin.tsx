import { useEffect, useState } from "react";
import { Plus, Save, Trash2 } from "lucide-react";
import { Field, StatusBanner, inputClass } from "./adminUi";
import { adminDeleteFaq, adminListFaqs, adminUpsertFaq } from "@/app/content/api";
import type { ResourceFaq } from "@/app/content/types";

export function FaqsAdmin() {
  const [faqs, setFaqs] = useState<ResourceFaq[]>([]);
  const [editing, setEditing] = useState<Partial<ResourceFaq> | null>(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  async function load() {
    try {
      setFaqs(await adminListFaqs());
      setError(false);
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
            {editing.id ? "Edit FAQ" : "New FAQ"}
          </h2>
          <button onClick={() => setEditing(null)} className="text-sm text-white/45 hover:text-white">
            Cancel
          </button>
        </div>
        <div className="space-y-5">
          <StatusBanner message={status} error={error} />
          <Field label="Question">
            <input
              className={inputClass}
              value={editing.question || ""}
              onChange={(e) => setEditing({ ...editing, question: e.target.value })}
            />
          </Field>
          <Field label="Answer">
            <textarea
              className={`${inputClass} min-h-[120px] resize-none`}
              value={editing.answer || ""}
              onChange={(e) => setEditing({ ...editing, answer: e.target.value })}
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
            <Save className="w-4 h-4" /> {busy ? "Saving…" : "Save FAQ"}
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
            FAQs
          </h1>
          <p className="text-xs text-white/30 mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
            {faqs.length} questions
          </p>
        </div>
        <button
          onClick={() => setEditing({ question: "", answer: "", sort_order: faqs.length, published: true })}
          className="flex items-center gap-1.5 bg-[#1B6FE8] hover:bg-[#1558C8] text-white text-xs font-semibold px-3 py-2 rounded-lg transition-all"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          <Plus className="w-3.5 h-3.5" /> New FAQ
        </button>
      </div>
      <div className="p-6">
        <StatusBanner message={status} error={error} />
        <div className="bg-[#071528] border border-white/[0.07] rounded-2xl overflow-hidden divide-y divide-white/[0.03]">
          {faqs.map((f) => (
            <div key={f.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.015]">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white/75 truncate" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {f.question}
                </p>
                <p className="text-[11px] text-white/35 mt-0.5 line-clamp-1">{f.answer}</p>
              </div>
              <button onClick={() => setEditing(f)} className="text-sm text-[#1B6FE8] hover:underline">
                Edit
              </button>
              <button onClick={() => remove(f.id)} className="text-white/25 hover:text-red-400">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          {faqs.length === 0 && (
            <p className="py-12 text-center text-sm text-white/25">No FAQs yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
