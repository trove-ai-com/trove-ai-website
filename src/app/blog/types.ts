export type BlogArticle = {
  id: number;
  slug: string;
  title: string;
  product: string;
  productColor: string;
  image: string;
  excerpt: string;
  body: string;
  date: string;
  readTime: string;
  tags: string[];
  published: boolean;
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
