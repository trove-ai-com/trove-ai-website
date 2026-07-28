import type { ReactNode } from "react";

export const inputClass =
  "w-full bg-[#0A1929] border border-white/[0.1] rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#1B6FE8]/60 transition-colors";

export const labelClass =
  "block text-xs font-semibold text-white/50 uppercase tracking-widest mb-2";

export type AdminSection = "blog" | "guides" | "copy" | "faqs";

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <label className={labelClass} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

export function StatusBanner({ message, error }: { message: string; error?: boolean }) {
  if (!message) return null;
  return (
    <p className={`text-sm mb-4 ${error ? "text-red-400" : "text-[#10B981]"}`} style={{ fontFamily: "Inter, sans-serif" }}>
      {message}
    </p>
  );
}
