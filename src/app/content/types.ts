export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  product: string;
  product_color: string;
  image_url: string;
  excerpt: string;
  body: string;
  date_label: string;
  read_time: string;
  tags: string[];
  published: boolean;
  created_at?: string;
  updated_at?: string;
};

export type ResourceGuide = {
  id: string;
  type: string;
  title: string;
  excerpt: string;
  body: string;
  product: string;
  product_color: string;
  date_label: string;
  read_time: string;
  tags: string[];
  icon_key: string;
  published: boolean;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
};

export type ResourcesPageCopy = {
  id: number;
  hero_eyebrow: string;
  hero_title: string;
  hero_subtitle: string;
  hero_note: string;
  about_label: string;
  about_body: string;
  cta_eyebrow: string;
  cta_title: string;
  cta_body: string;
  updated_at?: string;
};

export type ResourceFaq = {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
  published: boolean;
  created_at?: string;
  updated_at?: string;
};

export const PRODUCT_COLORS: Record<string, string> = {
  DeepSense: "#1B6FE8",
  DeepSenseIQ: "#10B981",
  VisualIQ: "#0EA5E9",
  CareIQ: "#8B5CF6",
  CyberIQ: "#F97316",
  VellumGuard: "#14B8A6",
  LEXSO: "#0EA5E9",
};

export const PRODUCT_OPTIONS = Object.keys(PRODUCT_COLORS);

export const GUIDE_ICON_OPTIONS = ["Camera", "Radio", "Shield", "Lock", "Brain", "Layers"] as const;

export function slugify(title: string): string {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 80) || "untitled"
  );
}
