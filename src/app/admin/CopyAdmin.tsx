import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { Field, StatusBanner, inputClass } from "./adminUi";
import { adminGetPageCopy, adminUpdatePageCopy } from "@/app/content/api";
import type { ResourcesPageCopy } from "@/app/content/types";

export function CopyAdmin() {
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

  return (
    <div>
      <div className="px-6 py-5 border-b border-white/[0.05]">
        <h1 className="text-base font-bold text-white/80" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Pages
        </h1>
        <p className="text-xs text-white/30 mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
          Resources page copy
        </p>
      </div>
      <div className="p-6 max-w-3xl">
        {!copy ? (
          <p className="text-white/40 text-sm">Loading…</p>
        ) : (
          <div className="space-y-5">
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
                    className={`${inputClass} min-h-[72px] resize-none`}
                    value={copy[key]}
                    onChange={(e) => setCopy({ ...copy, [key]: e.target.value })}
                  />
                ) : (
                  <input
                    className={inputClass}
                    value={copy[key]}
                    onChange={(e) => setCopy({ ...copy, [key]: e.target.value })}
                  />
                )}
              </Field>
            ))}
            <button
              onClick={save}
              disabled={busy}
              className="inline-flex items-center gap-2 rounded-xl bg-[#1B6FE8] text-white text-sm font-semibold px-5 py-3 disabled:opacity-50"
            >
              <Save className="w-4 h-4" /> {busy ? "Saving…" : "Save page copy"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
