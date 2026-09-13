import { useEffect, useRef, useState } from "react";
import { Check, FolderOpen, ImageOff, ImagePlus, Loader2, Trash2, X } from "lucide-react";
import { inputClass, labelClass } from "./adminUi";
import {
  adminDeleteContentImage,
  adminListContentImages,
  uploadContentImage,
  type ContentImage,
} from "@/app/content/api";

type PickerProps = {
  open: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  uploadFolder?: string;
};

export function MediaPicker({ open, onClose, onSelect, uploadFolder = "library" }: PickerProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/70">
      <div className="w-full max-w-4xl max-h-[86vh] flex flex-col rounded-2xl border border-white/[0.1] bg-[#071528] shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
          <div>
            <h2 className="text-sm font-bold text-white/85" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Photo library
            </h2>
            <p className="text-xs text-white/35 mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
              Upload a photo or choose one already stored
            </p>
          </div>
          <button type="button" onClick={onClose} className="text-white/40 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          <PhotoLibrary
            uploadFolder={uploadFolder}
            onSelect={(url) => {
              onSelect(url);
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
}

type LibraryProps = {
  uploadFolder?: string;
  onSelect?: (url: string) => void;
  allowDelete?: boolean;
};

export function PhotoLibrary({ uploadFolder = "library", onSelect, allowDelete = true }: LibraryProps) {
  const [images, setImages] = useState<ContentImage[]>([]);
  const [status, setStatus] = useState("");
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function load() {
    try {
      setImages(await adminListContentImages());
      setError(false);
      setStatus("");
    } catch (e) {
      setError(true);
      setStatus(e instanceof Error ? e.message : "Failed to load photos");
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function onFiles(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true);
    setError(false);
    try {
      let lastUrl = "";
      for (const file of Array.from(files)) {
        lastUrl = await uploadContentImage(file, uploadFolder);
      }
      await load();
      setStatus(files.length > 1 ? `${files.length} photos uploaded.` : "Photo uploaded.");
      if (onSelect && lastUrl && files.length === 1) onSelect(lastUrl);
    } catch (e) {
      setError(true);
      setStatus(e instanceof Error ? e.message : "Upload failed");
    }
    setBusy(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  async function remove(image: ContentImage) {
    if (!confirm("Remove this photo from the library? Posts that still use it will show a broken image.")) return;
    try {
      await adminDeleteContentImage(image);
      setImages((prev) => prev.filter((img) => img.url !== image.url));
      setStatus("Photo removed.");
      setError(false);
    } catch (e) {
      setError(true);
      setStatus(e instanceof Error ? e.message : "Delete failed");
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <label className="inline-flex items-center gap-2 rounded-xl bg-[#1B6FE8] hover:bg-[#1558C8] text-white text-sm font-semibold px-4 py-2.5 cursor-pointer">
          {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImagePlus className="w-4 h-4" />}
          {busy ? "Uploading…" : "Upload photos"}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            disabled={busy}
            onChange={(e) => void onFiles(e.target.files)}
          />
        </label>
        <p className="text-xs text-white/35" style={{ fontFamily: "Inter, sans-serif" }}>
          Stored in the connected photo library. JPG, PNG, WebP, or GIF.
        </p>
      </div>
      {status && (
        <p className={`text-sm mb-4 ${error ? "text-red-400" : "text-[#10B981]"}`} style={{ fontFamily: "Inter, sans-serif" }}>
          {status}
        </p>
      )}
      {images.length === 0 && !error ? (
        <div className="py-14 text-center border border-dashed border-white/[0.08] rounded-2xl">
          <ImageOff className="w-7 h-7 text-white/15 mx-auto mb-3" />
          <p className="text-sm text-white/40" style={{ fontFamily: "Inter, sans-serif" }}>
            No photos yet. Upload from here, or from a post, and they all land in this library.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {images.map((img) => (
            <div
              key={img.url}
              className="group relative aspect-square rounded-xl overflow-hidden border border-white/[0.08] bg-[#040D1A]"
            >
              <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                {onSelect ? (
                  <button
                    type="button"
                    onClick={() => onSelect(img.url)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#1B6FE8] text-white text-xs font-semibold px-3 py-1.5"
                  >
                    <Check className="w-3.5 h-3.5" /> Use photo
                  </button>
                ) : null}
                {allowDelete ? (
                  <button
                    type="button"
                    onClick={() => void remove(img)}
                    className="inline-flex items-center gap-1.5 rounded-lg text-red-300 text-xs px-2 py-1 hover:bg-red-500/15"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

type FieldProps = {
  url: string;
  onChange: (url: string) => void;
  uploadFolder?: string;
  label?: string;
};

export function FeaturedImageField({ url, onChange, uploadFolder = "blog", label = "Featured image" }: FieldProps) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [showUrl, setShowUrl] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function onFile(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      onChange(await uploadContentImage(file, uploadFolder));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    }
    setBusy(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div>
      <label className={labelClass} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        {label}
      </label>
      <div className="flex flex-wrap items-center gap-2">
        <label className="inline-flex items-center gap-2 rounded-xl bg-[#1B6FE8] hover:bg-[#1558C8] text-white text-sm font-semibold px-4 py-2.5 cursor-pointer">
          {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImagePlus className="w-4 h-4" />}
          {busy ? "Uploading…" : "Upload from computer"}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            disabled={busy}
            onChange={(e) => void onFile(e.target.files?.[0])}
          />
        </label>
        <button
          type="button"
          onClick={() => setPickerOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl border border-white/[0.12] text-white/70 hover:text-white text-sm font-semibold px-4 py-2.5"
        >
          <FolderOpen className="w-4 h-4" /> Choose from library
        </button>
        {url ? (
          <button type="button" onClick={() => onChange("")} className="text-xs text-white/35 hover:text-red-400">
            Remove
          </button>
        ) : null}
      </div>
      <p className="mt-2 text-[11px] text-white/30" style={{ fontFamily: "Inter, sans-serif" }}>
        No image URL needed. Photos are saved to the Photo library in the left nav.
      </p>
      {error ? <p className="mt-2 text-sm text-red-400">{error}</p> : null}
      {url ? (
        <img src={url} alt="Featured" className="mt-3 w-full max-h-48 object-cover rounded-xl border border-white/[0.08]" />
      ) : null}
      <button
        type="button"
        onClick={() => setShowUrl((v) => !v)}
        className="mt-2 text-[11px] text-white/30 hover:text-white/55 underline underline-offset-2"
      >
        {showUrl ? "Hide image URL" : "Use an image URL instead"}
      </button>
      {showUrl ? (
        <input
          className={`${inputClass} mt-2`}
          placeholder="https://"
          value={url}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : null}
      <MediaPicker open={pickerOpen} onClose={() => setPickerOpen(false)} onSelect={onChange} uploadFolder={uploadFolder} />
    </div>
  );
}
