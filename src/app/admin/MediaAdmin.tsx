import { PhotoLibrary } from "./MediaLibrary";

export function MediaAdmin() {
  return (
    <div>
      <div className="px-6 py-5 border-b border-white/[0.05]">
        <h1 className="text-base font-bold text-white/80" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Photo library
        </h1>
        <p className="text-xs text-white/30 mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
          Upload, browse, and reuse photos for blog posts and guides. This is the site image storage.
        </p>
      </div>
      <div className="p-6">
        <PhotoLibrary uploadFolder="library" />
      </div>
    </div>
  );
}
