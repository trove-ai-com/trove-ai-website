import { useEffect, useRef, useState, type TextareaHTMLAttributes } from "react";
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Link2,
  List,
  ListOrdered,
  Quote,
  CornerDownLeft,
  ImagePlus,
  Loader2,
  Maximize2,
  Minimize2,
  Eye,
  EyeOff,
} from "lucide-react";
import { ArticleBody } from "@/app/blog/ArticleBody";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeightClass?: string;
  onImageUpload?: (file: File) => Promise<string>;
};

type WrapOpts = { prefix: string; suffix?: string; placeholder?: string; block?: boolean };

export function MarkdownEditor({
  value,
  onChange,
  placeholder,
  minHeightClass = "h-[min(72vh,760px)]",
  onImageUpload,
}: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const savedSelection = useRef({ start: 0, end: 0 });
  const [preview, setPreview] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!expanded) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [expanded]);

  const heightClass = expanded ? "flex-1 min-h-0" : minHeightClass;

  function applyWrap({ prefix, suffix = prefix, placeholder = "text", block = false }: WrapOpts) {
    const el = ref.current;
    if (!el) {
      onChange(value + prefix + placeholder + suffix);
      return;
    }
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = value.slice(start, end) || placeholder;
    const before = value.slice(0, start);
    const after = value.slice(end);

    let next: string;
    let cursorStart: number;
    let cursorEnd: number;

    if (block) {
      const needsLeading = before.length > 0 && !before.endsWith("\n\n");
      const lead = needsLeading ? (before.endsWith("\n") ? "\n" : "\n\n") : "";
      const insertion = `${lead}${prefix}${selected}${suffix}`;
      next = before + insertion + after;
      cursorStart = before.length + lead.length + prefix.length;
      cursorEnd = cursorStart + selected.length;
    } else {
      next = before + prefix + selected + suffix + after;
      cursorStart = start + prefix.length;
      cursorEnd = cursorStart + selected.length;
    }

    onChange(next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(cursorStart, cursorEnd);
    });
  }

  function applyToSelectedLines(transform: (lines: string[]) => string[]) {
    const el = ref.current;
    if (!el) {
      onChange(transform([value || ""]).join("\n"));
      return;
    }
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const from = value.lastIndexOf("\n", start - 1) + 1;
    const newlineAfter = value.indexOf("\n", end);
    const to = newlineAfter === -1 ? value.length : newlineAfter;
    const nextBlock = transform(value.slice(from, to).split("\n")).join("\n");
    onChange(value.slice(0, from) + nextBlock + value.slice(to));
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(from, from + nextBlock.length);
    });
  }

  function applyHeading(level: 1 | 2 | 3 | 4) {
    const prefix = `${"#".repeat(level)} `;
    applyToSelectedLines((lines) =>
      lines.map((line) => {
        const stripped = line.replace(/^#{1,6}\s+/, "").replace(/^[-*]\s+/, "").replace(/^\d+\.\s+/, "");
        return prefix + (stripped || "Heading");
      })
    );
  }

  function toggleBullet() {
    applyToSelectedLines((lines) => {
      const allBullets = lines.every((line) => !line.trim() || /^[-*]\s/.test(line));
      if (allBullets) return lines.map((line) => line.replace(/^[-*]\s+/, ""));
      return lines.map((line) => {
        if (!line.trim()) return line;
        return `- ${line.replace(/^#{1,6}\s+/, "").replace(/^\d+\.\s+/, "").replace(/^[-*]\s+/, "")}`;
      });
    });
  }

  function toggleNumbered() {
    applyToSelectedLines((lines) => {
      const allNumbered = lines.every((line) => !line.trim() || /^\d+\.\s/.test(line));
      if (allNumbered) return lines.map((line) => line.replace(/^\d+\.\s+/, ""));
      let n = 1;
      return lines.map((line) => {
        if (!line.trim()) return line;
        const text = line.replace(/^#{1,6}\s+/, "").replace(/^\d+\.\s+/, "").replace(/^[-*]\s+/, "");
        return `${n++}. ${text}`;
      });
    });
  }

  function insertLineBreak() {
    const el = ref.current;
    if (!el) {
      onChange(`${value}\n`);
      return;
    }
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const next = `${value.slice(0, start)}\n${value.slice(end)}`;
    onChange(next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + 1, start + 1);
    });
  }

  function continueListOnEnter(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    const el = ref.current;
    if (!el) return false;
    const start = el.selectionStart;
    const lineStart = value.lastIndexOf("\n", start - 1) + 1;
    const line = value.slice(lineStart, start);
    const emptyItem = /^(?:[-*]\s+|\d+\.\s+)$/.test(line);
    if (emptyItem) {
      e.preventDefault();
      const next = value.slice(0, lineStart) + value.slice(start);
      onChange(next);
      requestAnimationFrame(() => {
        el.focus();
        el.setSelectionRange(lineStart, lineStart);
      });
      return true;
    }
    const numbered = line.match(/^(\d+)\.\s+/);
    if (numbered) {
      e.preventDefault();
      const nextPrefix = `\n${Number(numbered[1]) + 1}. `;
      const next = value.slice(0, start) + nextPrefix + value.slice(el.selectionEnd);
      onChange(next);
      requestAnimationFrame(() => {
        el.focus();
        const pos = start + nextPrefix.length;
        el.setSelectionRange(pos, pos);
      });
      return true;
    }
    if (/^[-*]\s+/.test(line)) {
      e.preventDefault();
      const next = `${value.slice(0, start)}\n- ${value.slice(el.selectionEnd)}`;
      onChange(next);
      requestAnimationFrame(() => {
        el.focus();
        el.setSelectionRange(start + 3, start + 3);
      });
      return true;
    }
    return false;
  }

  const tools: { label: string; title: string; Icon: typeof Bold; action: () => void }[] = [
    {
      label: "Bold",
      title: "Bold (Ctrl/Cmd+B)",
      Icon: Bold,
      action: () => applyWrap({ prefix: "**", placeholder: "bold text" }),
    },
    {
      label: "Italic",
      title: "Italic (Ctrl/Cmd+I)",
      Icon: Italic,
      action: () => applyWrap({ prefix: "*", placeholder: "italic text" }),
    },
    {
      label: "H1",
      title: "Title",
      Icon: Heading1,
      action: () => applyHeading(1),
    },
    {
      label: "H2",
      title: "Heading",
      Icon: Heading2,
      action: () => applyHeading(2),
    },
    {
      label: "H3",
      title: "Subheading",
      Icon: Heading3,
      action: () => applyHeading(3),
    },
    {
      label: "H4",
      title: "Small heading",
      Icon: Heading4,
      action: () => applyHeading(4),
    },
    {
      label: "Link",
      title: "Link",
      Icon: Link2,
      action: () => applyWrap({ prefix: "[", suffix: "](https://)", placeholder: "link text" }),
    },
    {
      label: "List",
      title: "Bullet list — select several lines to convert them all",
      Icon: List,
      action: toggleBullet,
    },
    {
      label: "Numbered",
      title: "Numbered list — select several lines to number them 1, 2, 3",
      Icon: ListOrdered,
      action: toggleNumbered,
    },
    {
      label: "Quote",
      title: "Quote",
      Icon: Quote,
      action: () =>
        applyToSelectedLines((lines) =>
          lines.map((line) => (line.startsWith("> ") ? line.slice(2) : `> ${line || "quote"}`))
        ),
    },
    {
      label: "Break",
      title: "Insert a line break",
      Icon: CornerDownLeft,
      action: insertLineBreak,
    },
    {
      label: "Image",
      title: onImageUpload ? "Upload image" : "Image markdown",
      Icon: uploading ? Loader2 : ImagePlus,
      action: handleImageClick,
    },
  ];

  function handleImageClick() {
    const el = ref.current;
    if (el) savedSelection.current = { start: el.selectionStart, end: el.selectionEnd };
    if (onImageUpload) {
      fileInputRef.current?.click();
      return;
    }
    applyWrap({ prefix: "![", suffix: "](/blog/image.jpg)", placeholder: "alt text", block: true });
  }

  async function handleFileSelected(file: File | undefined) {
    if (!file || !onImageUpload) return;
    setUploading(true);
    try {
      const url = await onImageUpload(file);
      const { start, end } = savedSelection.current;
      const selected = value.slice(start, end) || "image";
      const before = value.slice(0, start);
      const after = value.slice(end);
      const needsLeading = before.length > 0 && !before.endsWith("\n\n");
      const lead = needsLeading ? (before.endsWith("\n") ? "\n" : "\n\n") : "";
      onChange(`${before}${lead}![${selected}](${url})${after}`);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey && !e.metaKey && !e.ctrlKey) {
      if (continueListOnEnter(e)) return;
    }
    const mod = e.metaKey || e.ctrlKey;
    if (!mod) return;
    if (e.key.toLowerCase() === "b") {
      e.preventDefault();
      applyWrap({ prefix: "**", placeholder: "bold text" });
    } else if (e.key.toLowerCase() === "i") {
      e.preventDefault();
      applyWrap({ prefix: "*", placeholder: "italic text" });
    }
  }

  const textareaProps: TextareaHTMLAttributes<HTMLTextAreaElement> = {
    ref,
    value,
    onChange: (e) => onChange(e.target.value),
    onKeyDown,
    placeholder:
      placeholder ||
      "Write the article here. Use the toolbar for headings, lists, and line breaks.\n\nEnter starts a new line. Enter twice starts a new paragraph. In a list, Enter adds the next item.",
    className: `w-full rounded-b-xl bg-[#071528] border border-t-0 border-white/[0.08] px-5 py-4 text-[15px] leading-7 text-white/85 placeholder:text-white/25 focus:outline-none focus:border-[#1B6FE8]/50 font-mono ${
      expanded ? "resize-none overflow-y-auto" : "resize-y"
    } ${heightClass}`,
    style: { fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" },
  };

  return (
    <div
      className={
        expanded
          ? "fixed inset-0 z-[80] flex flex-col bg-[#03080F] p-4 sm:p-6"
          : "flex flex-col"
      }
    >
      {expanded && (
        <p className="mb-2 text-xs text-white/40" style={{ fontFamily: "Inter, sans-serif" }}>
          Full-screen writing — press Esc or Exit to return
        </p>
      )}
      <div className="flex flex-wrap items-center gap-1 rounded-t-xl border border-white/[0.08] bg-[#040D1A] px-2 py-1.5">
        {tools.map(({ label, title, Icon, action }) => (
          <button
            key={label}
            type="button"
            title={title}
            disabled={label === "Image" && uploading}
            onClick={action}
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] text-white/50 hover:text-white hover:bg-white/[0.06] transition-colors disabled:opacity-50"
          >
            <Icon className={`w-3.5 h-3.5 ${label === "Image" && uploading ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">{label === "Image" && uploading ? "Uploading…" : label}</span>
          </button>
        ))}
        {onImageUpload && (
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFileSelected(e.target.files?.[0])}
          />
        )}
        <div className="flex-1" />
        <button
          type="button"
          title={expanded ? "Exit full screen (Esc)" : "Write in full screen"}
          onClick={() => setExpanded((p) => !p)}
          className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] transition-colors ${
            expanded ? "text-[#1B6FE8] bg-[#1B6FE8]/10" : "text-white/50 hover:text-white hover:bg-white/[0.06]"
          }`}
        >
          {expanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">{expanded ? "Exit" : "Full screen"}</span>
        </button>
        <button
          type="button"
          title={preview ? "Edit" : "Preview"}
          onClick={() => setPreview((p) => !p)}
          className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] transition-colors ${
            preview ? "text-[#10B981] bg-[#10B981]/10" : "text-white/50 hover:text-white hover:bg-white/[0.06]"
          }`}
        >
          {preview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          {preview ? "Edit" : "Preview"}
        </button>
      </div>

      {preview ? (
        <div className={`rounded-b-xl border border-t-0 border-white/[0.08] bg-[#071528] px-6 py-5 overflow-y-auto ${heightClass}`}>
          {value.trim() ? (
            <ArticleBody body={value} />
          ) : (
            <p className="text-sm text-white/30">Nothing to preview yet.</p>
          )}
        </div>
      ) : (
        <textarea {...textareaProps} />
      )}

      <p className="mt-2 text-[11px] text-white/30" style={{ fontFamily: "Inter, sans-serif" }}>
        Headings: H1–H4. Select several lines, then Numbered, to make 1 / 2 / 3. Enter adds a visible
        line break; Enter again starts a new paragraph. Enter in a list continues 2, 3, 4…
      </p>
    </div>
  );
}
