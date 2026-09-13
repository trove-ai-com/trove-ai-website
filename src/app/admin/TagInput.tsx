import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { Check, ChevronDown, Plus, X } from "lucide-react";

type Props = {
  value: string[];
  onChange: (tags: string[]) => void;
  suggestions?: string[];
  placeholder?: string;
};

const SPLIT = /[,;\n]+/;

function parseTokens(raw: string): { tags: string[]; remainder: string } {
  const parts = raw.split(SPLIT);
  if (parts.length === 1) return { tags: [], remainder: raw };
  const tags = parts.slice(0, -1).map((p) => p.trim()).filter(Boolean);
  return { tags, remainder: parts[parts.length - 1] ?? "" };
}

export function TagInput({
  value,
  onChange,
  suggestions = [],
  placeholder = "Search or create a tag…",
}: Props) {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [catalog, setCatalog] = useState<string[]>(suggestions);
  const [hidden, setHidden] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const allKnown = useMemo(() => {
    const hiddenSet = new Set(hidden.map((t) => t.toLowerCase()));
    const set = new Set(
      [...catalog, ...suggestions, ...value]
        .map((t) => t.trim())
        .filter((t) => t && !hiddenSet.has(t.toLowerCase()))
    );
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [catalog, suggestions, value, hidden]);

  const filtered = useMemo(() => {
    const q = input.trim().toLowerCase();
    return allKnown.filter((s) => !q || s.toLowerCase().includes(q));
  }, [allKnown, input]);

  const canCreate = Boolean(input.trim()) && !allKnown.some((s) => s.toLowerCase() === input.trim().toLowerCase());

  function remember(tags: string[]) {
    const lower = tags.map((t) => t.toLowerCase());
    setHidden((prev) => prev.filter((h) => !lower.includes(h.toLowerCase())));
    setCatalog((prev) => {
      const next = new Set(prev);
      tags.forEach((t) => next.add(t));
      return Array.from(next);
    });
  }

  function addTags(incoming: string[]) {
    const next = [...value];
    const added: string[] = [];
    for (const raw of incoming) {
      const t = raw.trim();
      if (!t || next.some((v) => v.toLowerCase() === t.toLowerCase())) continue;
      next.push(t);
      added.push(t);
    }
    if (!added.length) return;
    remember(added);
    onChange(next);
  }

  function addTag(tag: string) {
    addTags([tag]);
    setInput("");
  }

  function removeTag(tag: string) {
    onChange(value.filter((t) => t !== tag));
  }

  function toggleTag(tag: string) {
    if (value.some((t) => t.toLowerCase() === tag.toLowerCase())) removeTag(tag);
    else addTag(tag);
  }

  function removeFromCatalog(tag: string) {
    setHidden((prev) => (prev.includes(tag) ? prev : [...prev, tag]));
    setCatalog((prev) => prev.filter((t) => t.toLowerCase() !== tag.toLowerCase()));
    if (value.some((t) => t.toLowerCase() === tag.toLowerCase())) removeTag(tag);
  }

  function commitRemainder() {
    const t = input.trim();
    if (t) addTag(t);
    else setInput("");
  }

  function onInputChange(raw: string) {
    const { tags, remainder } = parseTokens(raw);
    if (tags.length) {
      addTags(tags);
      setInput(remainder.replace(/^\s+/, ""));
      return;
    }
    setInput(raw);
  }

  function shouldCommitOnSpace() {
    const typed = input.trim();
    if (!typed) return false;
    const prefix = `${typed} `.toLowerCase();
    return !allKnown.some((s) => s.toLowerCase().startsWith(prefix));
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === "Tab" || e.key === ",") {
      if (input.trim()) {
        e.preventDefault();
        commitRemainder();
      }
      return;
    }
    if (e.key === " " && shouldCommitOnSpace()) {
      e.preventDefault();
      commitRemainder();
      return;
    }
    if (e.key === "Backspace" && !input && value.length) {
      removeTag(value[value.length - 1]);
    }
    if (e.key === "Escape") setOpen(false);
  }

  function onPaste(e: React.ClipboardEvent<HTMLInputElement>) {
    const text = e.clipboardData.getData("text");
    if (SPLIT.test(text)) {
      e.preventDefault();
      addTags(text.split(SPLIT).map((t) => t.trim()).filter(Boolean));
      setInput("");
      return;
    }
    const words = text.trim().split(/\s+/).filter(Boolean);
    if (words.length > 1) {
      e.preventDefault();
      addTags(words);
      setInput("");
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <div
        onClick={() => {
          setOpen(true);
          inputRef.current?.focus();
        }}
        className="w-full flex items-start gap-2 bg-[#0A1929] border border-white/[0.1] rounded-xl px-3 py-2.5 text-left focus-within:border-[#1B6FE8]/60 transition-colors cursor-text"
      >
        <div className="flex-1 flex flex-wrap items-center gap-1.5 min-w-0">
          {value.length === 0 && !input ? (
            <span className="text-sm text-white/30 py-0.5">{placeholder}</span>
          ) : null}
          {value.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-full bg-[#1B6FE8]/15 border border-[#1B6FE8]/25 text-[#9ec2ff] text-xs px-2.5 py-1"
            >
              {tag}
              <span
                role="button"
                tabIndex={0}
                onClick={(ev) => {
                  ev.stopPropagation();
                  removeTag(tag);
                }}
                onKeyDown={(ev) => {
                  if (ev.key === "Enter" || ev.key === " ") {
                    ev.preventDefault();
                    ev.stopPropagation();
                    removeTag(tag);
                  }
                }}
                className="text-white/35 hover:text-red-400"
              >
                <X className="w-3 h-3" />
              </span>
            </span>
          ))}
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={onKeyDown}
            onPaste={onPaste}
            onFocus={() => setOpen(true)}
            onClick={(e) => e.stopPropagation()}
            placeholder={value.length ? "Add another…" : ""}
            className="flex-1 min-w-[140px] bg-transparent text-sm text-white py-0.5 focus:outline-none placeholder-white/25"
          />
        </div>
        <ChevronDown className={`w-4 h-4 text-white/35 mt-1 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </div>

      {open && (
        <div className="absolute z-20 mt-1 w-full max-h-64 overflow-y-auto bg-[#0A1929] border border-white/[0.12] rounded-xl shadow-xl py-1">
          {filtered.map((opt) => {
            const selected = value.some((t) => t.toLowerCase() === opt.toLowerCase());
            return (
              <div key={opt} className="flex items-center group">
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => toggleTag(opt)}
                  className="flex-1 flex items-center gap-2 text-left px-3 py-2 text-sm text-white/75 hover:bg-white/[0.06]"
                >
                  <span
                    className={`w-4 h-4 rounded border flex items-center justify-center ${
                      selected ? "bg-[#1B6FE8] border-[#1B6FE8]" : "border-white/25"
                    }`}
                  >
                    {selected ? <Check className="w-3 h-3 text-white" /> : null}
                  </span>
                  {opt}
                </button>
                <button
                  type="button"
                  title="Remove from list"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => removeFromCatalog(opt)}
                  className="px-3 py-2 text-white/20 hover:text-red-400 opacity-0 group-hover:opacity-100"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
          {canCreate && (
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => addTag(input)}
              className="w-full flex items-center gap-1.5 text-left px-3 py-2 text-sm text-[#1B6FE8] hover:bg-white/[0.06]"
            >
              <Plus className="w-3.5 h-3.5" /> Add “{input.trim()}” to the list
            </button>
          )}
          {filtered.length === 0 && !canCreate && (
            <p className="px-3 py-2 text-sm text-white/30">No matching tags. Type a name and press Enter.</p>
          )}
        </div>
      )}

      <p className="mt-2 text-[11px] text-white/30" style={{ fontFamily: "Inter, sans-serif" }}>
        Pick tags from the list, or type new ones. Comma, space, or Enter separates tags. Click a tag
        again — or the × — to remove it.
      </p>
    </div>
  );
}
