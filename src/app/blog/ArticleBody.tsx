/** Renders article body: paragraphs, images, and simple headings. */
export function ArticleBody({ body }: { body: string }) {
  const blocks = body.split(/\n\n+/).filter(Boolean);

  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        const trimmed = block.trim();

        // Markdown image: ![alt](url)
        const imgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)(?:\n?(.*))?$/s);
        if (imgMatch) {
          const [, alt, src, caption] = imgMatch;
          return (
            <figure key={i} className="my-8">
              <div className="rounded-2xl overflow-hidden border border-white/[0.07]">
                <img src={src.trim()} alt={alt || ""} className="w-full max-h-[480px] object-cover" />
              </div>
              {caption?.trim() && (
                <figcaption
                  className="mt-3 text-center text-[12px] text-white/38"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {caption.trim()}
                </figcaption>
              )}
            </figure>
          );
        }

        // Heading: ## Title
        const h2 = trimmed.match(/^##\s+(.+)$/);
        if (h2) {
          return (
            <h2
              key={i}
              className="text-2xl font-bold text-white pt-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {h2[1]}
            </h2>
          );
        }

        const h3 = trimmed.match(/^###\s+(.+)$/);
        if (h3) {
          return (
            <h3
              key={i}
              className="text-xl font-semibold text-white/90 pt-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {h3[1]}
            </h3>
          );
        }

        return (
          <p
            key={i}
            className="text-white/62 text-base leading-[1.85] whitespace-pre-line"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {trimmed}
          </p>
        );
      })}
    </div>
  );
}
