import { useRef, useState, type TextareaHTMLAttributes } from "react";
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  Link2,
  List,
  ImagePlus,
  Eye,
  EyeOff,
} from "lucide-react";
import { ArticleBody } from "@/app/blog/ArticleBody";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeightClass?: string;
};

type WrapOpts = { prefix: string; suffix?: string; placeholder?: string; block?: boolean };

export function MarkdownEditor({
  value,
  onChange,
  placeholder,
  minHeightClass = "min-h-[220px]",
}: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [preview, setPreview] = useState(false);

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

  function insertLinePrefix(prefix: string) {
    const el = ref.current;
    if (!el) {
      onChange(`${value}${value.endsWith("\n") || !value ? "" : "\n"}${prefix}`);
      return;
    }
    const start = el.selectionStart;
    const lineStart = value.lastIndexOf("\n", start - 1) + 1;
    const before = value.slice(0, lineStart);
    const after = value.slice(lineStart);
    const next = before + prefix + after;
    onChange(next);
    requestAnimationFrame(() => {
      el.focus();
      const pos = lineStart + prefix.length;
      el.setSelectionRange(pos, pos);
    });
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
      label: "H2",
      title: "Heading",
      Icon: Heading2,
      action: () => applyWrap({ prefix: "## ", suffix: "", placeholder: "Heading", block: true }),
    },
    {
      label: "H3",
      title: "Subheading",
      Icon: Heading3,
      action: () => applyWrap({ prefix: "### ", suffix: "", placeholder: "Subheading", block: true }),
    },
    {
      label: "Link",
      title: "Link",
      Icon: Link2,
      action: () => applyWrap({ prefix: "[", suffix: "](https://)", placeholder: "link text" }),
    },
    {
      label: "List",
      title: "Bullet list",
      Icon: List,
      action: () => insertLinePrefix("- "),
    },
    {
      label: "Image",
      title: "Image markdown",
      Icon: ImagePlus,
      action: () =>
        applyWrap({
          prefix: "![",
          suffix: "](/blog/image.jpg)",
          placeholder: "alt text",
          block: true,
        }),
    },
  ];

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
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
      "Write with markdown. Use the toolbar for bold, italic, headings, links, and lists.\n\nSeparate paragraphs with a blank line.",
    className: `w-full rounded-b-xl bg-[#071528] border border-t-0 border-white/[0.08] px-4 py-3 text-sm text-white/85 placeholder:text-white/25 focus:outline-none focus:border-[#1B6FE8]/50 resize-y font-mono ${minHeightClass}`,
    style: { fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" },
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-1 rounded-t-xl border border-white/[0.08] bg-[#040D1A] px-2 py-1.5">
        {tools.map(({ label, title, Icon, action }) => (
          <button
            key={label}
            type="button"
            title={title}
            onClick={action}
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] text-white/50 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            <Icon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
        <div className="flex-1" />
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
        <div className={`rounded-b-xl border border-t-0 border-white/[0.08] bg-[#071528] px-5 py-4 ${minHeightClass}`}>
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
        Formatting uses markdown: <code className="text-white/45">**bold**</code>,{" "}
        <code className="text-white/45">*italic*</code>, <code className="text-white/45">## heading</code>,{" "}
        <code className="text-white/45">[link](url)</code>, <code className="text-white/45">- list</code>
      </p>
    </div>
  );
}
