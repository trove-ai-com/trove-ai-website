import { useEffect, useState } from "react";
import { Check, Copy, ImageOff } from "lucide-react";
import { StatusBanner } from "./adminUi";
import { adminListContentImages, type ContentImage } from "@/app/content/api";

export function MediaAdmin() {
  const [images, setImages] = useState<ContentImage[]>([]);
  const [status, setStatus] = useState("");
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    adminListContentImages()
      .then(setImages)
      .catch((e) => {
        setError(true);
        setStatus(e instanceof Error ? e.message : "Failed to load images");
      });
  }, []);

  async function copyUrl(url: string) {
    await navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div>
      <div className="px-6 py-5 border-b border-white/[0.05]">
        <h1 className="text-base font-bold text-white/80" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Media
        </h1>
        <p className="text-xs text-white/30 mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
          {images.length} images uploaded from Blog and Guide posts
        </p>
      </div>
      <div className="p-6">
        <StatusBanner message={status} error={error} />
        {images.length === 0 ? (
          <div className="py-16 text-center">
            <ImageOff className="w-7 h-7 text-white/15 mx-auto mb-3" />
            <p className="text-sm text-white/25" style={{ fontFamily: "Inter, sans-serif" }}>
              No images uploaded yet. Upload one from a post's editor to see it here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {images.map((img) => (
              <button
                key={img.url}
                onClick={() => copyUrl(img.url)}
                title="Copy URL"
                className="group relative aspect-square rounded-xl overflow-hidden border border-white/[0.08] hover:border-[#1B6FE8]/50 transition-colors"
              >
                <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-1.5 transition-opacity text-white text-xs">
                  {copied === img.url ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy URL
                    </>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
