import { useMemo, useState, type KeyboardEvent } from "react";
import { Plus, X } from "lucide-react";

type Props = {
  value: string[];
  onChange: (tags: string[]) => void;
  suggestions?: string[];
  placeholder?: string;
};

export function TagInput({ value, onChange, suggestions = [], placeholder = "Add tag…" }: Props) {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  const options = useMemo(
    () => suggestions.filter((s) => !value.includes(s) && s.toLowerCase().includes(input.toLowerCase())),
    [suggestions, value, input]
  );

  function addTag(tag: string) {
    const t = tag.trim();
    if (!t || value.includes(t)) return;
    onChange([...value, t]);
    setInput("");
  }

  function removeTag(tag: string) {
    onChange(value.filter((t) => t !== tag));
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(input);
    } else if (e.key === "Backspace" && !input && value.length) {
      removeTag(value[value.length - 1]);
    }
  }

  return (
    <div className="relative">
      <div className="flex flex-wrap items-center gap-1.5 w-full bg-[#0A1929] border border-white/[0.1] rounded-xl px-3 py-2 focus-within:border-[#1B6FE8]/60 transition-colors">
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-full bg-white/[0.06] border border-white/[0.1] text-white/70 text-xs px-2.5 py-1"
          >
            {tag}
            <button type="button" onClick={() => removeTag(tag)} className="text-white/35 hover:text-red-400">
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 120)}
          placeholder={value.length ? "" : placeholder}
          className="flex-1 min-w-[100px] bg-transparent text-sm text-white py-1 focus:outline-none placeholder-white/25"
        />
      </div>

      {open && (options.length > 0 || input.trim()) && (
        <div className="absolute z-20 mt-1 w-full max-h-48 overflow-y-auto bg-[#0A1929] border border-white/[0.12] rounded-xl shadow-xl py-1">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => addTag(opt)}
              className="w-full text-left px-3 py-1.5 text-sm text-white/70 hover:bg-white/[0.06]"
            >
              {opt}
            </button>
          ))}
          {input.trim() && !suggestions.includes(input.trim()) && (
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => addTag(input)}
              className="w-full flex items-center gap-1.5 text-left px-3 py-1.5 text-sm text-[#1B6FE8] hover:bg-white/[0.06]"
            >
              <Plus className="w-3.5 h-3.5" /> Create "{input.trim()}"
            </button>
          )}
        </div>
      )}
    </div>
  );
}
