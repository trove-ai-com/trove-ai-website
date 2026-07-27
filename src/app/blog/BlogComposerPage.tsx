import { useMemo, useState, type ChangeEvent } from "react";
import { ArrowRight, ChevronRight, Download, ImagePlus, FileText } from "lucide-react";
import { PRODUCT_COLORS, PRODUCT_OPTIONS } from "./types";

function slugify(title: string): string {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 80) || "new-article"
  );
}

function downloadBlob(filename: string, blob: Blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function escapeYaml(value: string): string {
  if (/[:#{}[\],&*?|>!%@`]/.test(value) || value.includes("\n") || value.includes('"')) {
    return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
  }
  return value;
}

type Props = { onNavigate: (page: string) => void };

export function BlogComposerPage({ onNavigate }: Props) {
  const [title, setTitle] = useState("");
  const [product, setProduct] = useState(PRODUCT_OPTIONS[0]);
  const [excerpt, setExcerpt] = useState("");
  const [date, setDate] = useState(() =>
    new Date().toLocaleString("en-US", { month: "short", year: "numeric" })
  );
  const [readTime, setReadTime] = useState("5 min");
  const [tags, setTags] = useState("");
  const [body, setBody] = useState("");
  const [coverName, setCoverName] = useState("");
  const [coverPreview, setCoverPreview] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [inlineFiles, setInlineFiles] = useState<File[]>([]);
  const [status, setStatus] = useState("");

  const slug = useMemo(() => slugify(title || "new-article"), [title]);
  const imagePath = coverName ? `/blog/${coverName}` : "";

  function onCoverChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase();
    setCoverFile(file);
    setCoverName(safe);
    setCoverPreview(URL.createObjectURL(file));
  }

  function onInlineChange(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setInlineFiles((prev) => [...prev, ...files]);
  }

  function insertInlineMarkdown(file: File) {
    const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase();
    const snippet = `\n\n![${file.name}](/blog/${safe})\n\n`;
    setBody((prev) => prev + snippet);
  }

  function buildMarkdown(): string {
    const tagList = tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const tagYaml =
      tagList.length === 0
        ? "tags: []"
        : `tags:\n${tagList.map((t) => `  - ${escapeYaml(t)}`).join("\n")}`;

    return `---
title: ${escapeYaml(title || "Untitled")}
product: ${product}
image: ${escapeYaml(imagePath || "https://images.unsplash.com/...")}
excerpt: ${escapeYaml(excerpt || "")}
date: ${escapeYaml(date)}
readTime: ${escapeYaml(readTime)}
${tagYaml}
published: true
---

${body.trim()}
`;
  }

  function handleDownload() {
    if (!title.trim()) {
      setStatus("Add a title before downloading.");
      return;
    }
    downloadBlob(`${slug}.md`, new Blob([buildMarkdown()], { type: "text/markdown" }));
    if (coverFile) downloadBlob(coverName, coverFile);
    for (const file of inlineFiles) {
      const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase();
      downloadBlob(safe, file);
    }
    setStatus(
      `Downloaded ${slug}.md` +
        (coverFile || inlineFiles.length ? " and image file(s)" : "") +
        `. Put the .md in src/content/blog/ and images in public/blog/, then refresh.`
    );
  }

  const inputClass =
    "w-full rounded-xl bg-[#071528] border border-white/[0.08] px-4 py-3 text-sm text-white/85 placeholder:text-white/25 focus:outline-none focus:border-[#1B6FE8]/50";
  const labelClass = "block text-[11px] font-bold tracking-[0.16em] uppercase text-white/42 mb-2";

  return (
    <div className="min-h-screen pt-16 bg-[#040D1A]">
      <section className="border-b border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <button
            onClick={() => onNavigate("blog")}
            className="inline-flex items-center gap-1.5 text-[11px] font-medium text-white/42 hover:text-white/55 transition-colors mb-7"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <ChevronRight className="w-3 h-3 rotate-180" /> Insights
          </button>
          <p
            className="text-[10px] font-bold tracking-[0.28em] uppercase text-[#10B981] mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Blog composer
          </p>
          <h1
            className="text-4xl font-bold text-white leading-tight mb-3"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Write a new article
          </h1>
          <p className="text-white/45 text-base leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
            Fill in the form, attach images, then download. Drop the markdown file into{" "}
            <code className="text-[#10B981]/80">src/content/blog/</code> and images into{" "}
            <code className="text-[#10B981]/80">public/blog/</code>.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-3xl mx-auto px-6 space-y-6">
          <div className="space-y-5 rounded-2xl border border-white/[0.07] bg-[#071528]/60 p-6 md:p-8">
            <div>
              <label className={labelClass} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Title
              </label>
              <input
                className={inputClass}
                style={{ fontFamily: "Inter, sans-serif" }}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Why Government AI Needs Explainability…"
              />
              <p className="mt-2 text-[11px] text-white/30" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                File: {slug}.md
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Product
                </label>
                <select
                  className={inputClass}
                  style={{ fontFamily: "Inter, sans-serif", color: PRODUCT_COLORS[product] }}
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                >
                  {PRODUCT_OPTIONS.map((p) => (
                    <option key={p} value={p} className="bg-[#071528]">
                      {p}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Date
                </label>
                <input
                  className={inputClass}
                  style={{ fontFamily: "Inter, sans-serif" }}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="Jul 2026"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Read time
                </label>
                <input
                  className={inputClass}
                  style={{ fontFamily: "Inter, sans-serif" }}
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  placeholder="5 min"
                />
              </div>
              <div>
                <label className={labelClass} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Tags (comma-separated)
                </label>
                <input
                  className={inputClass}
                  style={{ fontFamily: "Inter, sans-serif" }}
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Government, Explainability"
                />
              </div>
            </div>

            <div>
              <label className={labelClass} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Excerpt
              </label>
              <textarea
                className={`${inputClass} min-h-[88px] resize-y`}
                style={{ fontFamily: "Inter, sans-serif" }}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="One or two sentences for the blog card…"
              />
            </div>

            <div>
              <label className={labelClass} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Cover image
              </label>
              <label className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/[0.12] bg-[#040D1A]/80 px-4 py-8 cursor-pointer hover:border-[#1B6FE8]/40 transition-colors">
                <ImagePlus className="w-6 h-6 text-white/35" />
                <span className="text-sm text-white/45" style={{ fontFamily: "Inter, sans-serif" }}>
                  {coverName || "Click to upload cover image"}
                </span>
                <input type="file" accept="image/*" className="hidden" onChange={onCoverChange} />
              </label>
              {coverPreview && (
                <div className="mt-4 rounded-xl overflow-hidden border border-white/[0.08] h-48">
                  <img src={coverPreview} alt="Cover preview" className="w-full h-full object-cover" />
                </div>
              )}
              {imagePath && (
                <p className="mt-2 text-[11px] text-white/30" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  Saves to public{imagePath}
                </p>
              )}
            </div>

            <div>
              <label className={labelClass} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Article body
              </label>
              <textarea
                className={`${inputClass} min-h-[240px] resize-y`}
                style={{ fontFamily: "Inter, sans-serif" }}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder={"Paragraph one.\n\n## Section heading\n\nParagraph two.\n\n![Alt text](/blog/inline.jpg)"}
              />
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <label className="inline-flex items-center gap-2 text-[12px] text-white/45 border border-white/[0.08] rounded-full px-3 py-1.5 cursor-pointer hover:border-white/20 transition-colors">
                  <ImagePlus className="w-3.5 h-3.5" />
                  Add inline image
                  <input type="file" accept="image/*" className="hidden" onChange={onInlineChange} />
                </label>
                {inlineFiles.map((file) => (
                  <button
                    key={file.name}
                    type="button"
                    onClick={() => insertInlineMarkdown(file)}
                    className="text-[11px] text-[#10B981] hover:underline"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    Insert {file.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1B6FE8] hover:bg-[#1558c0] text-white text-sm font-semibold px-5 py-3 transition-colors"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <Download className="w-4 h-4" />
                Download article + images
              </button>
              <button
                type="button"
                onClick={() => onNavigate("blog")}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.1] text-white/55 hover:text-white text-sm font-medium px-5 py-3 transition-colors"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <FileText className="w-4 h-4" />
                Back to blog
              </button>
            </div>

            {status && (
              <p className="text-sm text-[#10B981]/90 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                {status}
              </p>
            )}
          </div>

          <div
            className="rounded-2xl border border-white/[0.06] px-5 py-4 text-sm text-white/40 leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <p className="font-semibold text-white/55 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              After download
            </p>
            <ol className="list-decimal pl-5 space-y-1.5">
              <li>
                Move <code className="text-white/55">{slug}.md</code> into{" "}
                <code className="text-white/55">src/content/blog/</code>
              </li>
              <li>
                Move image files into <code className="text-white/55">public/blog/</code>
              </li>
              <li>Refresh the site — the article appears under Resources → Blog</li>
            </ol>
            <button
              onClick={() => onNavigate("blog")}
              className="mt-4 inline-flex items-center gap-2 text-[#10B981] hover:gap-3 transition-all text-sm font-medium"
            >
              View Insights <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
