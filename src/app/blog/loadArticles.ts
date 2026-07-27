import { PRODUCT_COLORS, type BlogArticle } from "./types";

const modules = import.meta.glob("../../content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function slugFromPath(path: string): string {
  const file = path.split("/").pop() ?? path;
  return file.replace(/\.md$/, "").replace(/^_/, "");
}

function unquote(value: string): string {
  const t = value.trim();
  if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) {
    return t.slice(1, -1);
  }
  return t;
}

function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  if (!raw.startsWith("---")) return { data: {}, content: raw };

  const end = raw.indexOf("\n---", 3);
  if (end === -1) return { data: {}, content: raw };

  const fmBlock = raw.slice(3, end).replace(/^\r?\n/, "");
  const content = raw.slice(end + 4).replace(/^\r?\n/, "");
  const data: Record<string, unknown> = {};
  const lines = fmBlock.split(/\r?\n/);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim() || line.trimStart().startsWith("#")) continue;

    const listKey = line.match(/^([A-Za-z0-9_-]+):\s*$/);
    if (listKey) {
      const key = listKey[1];
      const items: string[] = [];
      while (i + 1 < lines.length && /^\s+-\s+/.test(lines[i + 1])) {
        i++;
        items.push(unquote(lines[i].replace(/^\s+-\s+/, "")));
      }
      data[key] = items;
      continue;
    }

    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!kv) continue;
    const [, key, rawVal] = kv;
    const val = rawVal.trim();

    if (val === "true") data[key] = true;
    else if (val === "false") data[key] = false;
    else if (/^\[.*\]$/.test(val)) {
      data[key] = val
        .slice(1, -1)
        .split(",")
        .map((s) => unquote(s))
        .filter(Boolean);
    } else if (val !== "") {
      data[key] = unquote(val);
    } else {
      data[key] = "";
    }
  }

  return { data, content };
}

function asStringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === "string") {
    return value
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }
  return [];
}

function parseArticle(path: string, raw: string, index: number): BlogArticle | null {
  const fileName = path.split("/").pop() ?? "";
  if (fileName.startsWith("_") || fileName.toLowerCase() === "readme.md") return null;

  const { data, content } = parseFrontmatter(raw);
  if (data.published === false) return null;

  const product = String(data.product ?? "DeepSense");
  const productColor =
    String(data.productColor ?? "") ||
    PRODUCT_COLORS[product] ||
    "#1B6FE8";

  const slug = String(data.slug ?? slugFromPath(path));
  const id = typeof data.id === "number" ? data.id : index;

  return {
    id,
    slug,
    title: String(data.title ?? slug),
    product,
    productColor,
    image: String(data.image ?? ""),
    excerpt: String(data.excerpt ?? ""),
    body: content.trim(),
    date: String(data.date ?? ""),
    readTime: String(data.readTime ?? "5 min"),
    tags: asStringArray(data.tags),
    published: data.published !== false,
  };
}

function parseDateSortKey(date: string): number {
  const t = Date.parse(date);
  if (!Number.isNaN(t)) return t;
  const loose = Date.parse(`1 ${date}`);
  return Number.isNaN(loose) ? 0 : loose;
}

export const allInsights: BlogArticle[] = Object.entries(modules)
  .map(([path, raw], i) => parseArticle(path, raw, i))
  .filter((a): a is BlogArticle => a !== null)
  .sort((a, b) => parseDateSortKey(b.date) - parseDateSortKey(a.date))
  .map((article, i) => ({ ...article, id: i }));

export function getArticleById(id: number): BlogArticle | undefined {
  return allInsights.find((a) => a.id === id);
}
