import ReactMarkdown from "react-markdown";

/** Renders article body with markdown: headings, bold/italic, links, lists, images. */
export function ArticleBody({ body }: { body: string }) {
  return (
    <div
      className="article-body space-y-5 text-white/62 text-base leading-[1.85]"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <ReactMarkdown
        components={{
          h2: ({ children }) => (
            <h2 className="text-2xl font-bold text-white pt-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold text-white/90 pt-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {children}
            </h3>
          ),
          p: ({ children }) => <p className="text-white/62 leading-[1.85]">{children}</p>,
          strong: ({ children }) => <strong className="font-semibold text-white/85">{children}</strong>,
          em: ({ children }) => <em className="italic text-white/70">{children}</em>,
          a: ({ href, children }) => (
            <a href={href} className="text-[#10B981] underline underline-offset-2 hover:text-[#34d399]" target="_blank" rel="noreferrer">
              {children}
            </a>
          ),
          ul: ({ children }) => <ul className="list-disc pl-5 space-y-2 text-white/62">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-5 space-y-2 text-white/62">{children}</ol>,
          li: ({ children }) => <li className="leading-[1.7]">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-[#1B6FE8]/50 pl-4 text-white/50 italic">{children}</blockquote>
          ),
          code: ({ children }) => (
            <code className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[0.9em] text-[#10B981]/90" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              {children}
            </code>
          ),
          img: ({ src, alt }) => (
            <figure className="my-8">
              <div className="rounded-2xl overflow-hidden border border-white/[0.07]">
                <img src={src || ""} alt={alt || ""} className="w-full max-h-[480px] object-cover" />
              </div>
              {alt ? (
                <figcaption className="mt-3 text-center text-[12px] text-white/38">{alt}</figcaption>
              ) : null}
            </figure>
          ),
          hr: () => <hr className="border-white/[0.08] my-8" />,
        }}
      >
        {body}
      </ReactMarkdown>
    </div>
  );
}
