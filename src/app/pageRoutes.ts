export const ROUTED_PAGES = [
  "solutions",
  "about",
  "industries",
  "resources",
  "blog",
  "partners",
  "contact",
  "admin",
  "visualiq",
  "deepsenseiq",
  "careiq",
  "cyberiq",
  "vellumguard",
  "lexso",
] as const;

export function pageToPath(page: string): string {
  if (!page || page === "home") return "/";
  if (page === "blog-composer") return "/admin";
  if (page.startsWith("article-")) {
    return `/blog/${encodeURIComponent(page.slice("article-".length))}`;
  }
  return `/${page}`;
}

export function pathToPage(pathname: string): string {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (path === "/") return "home";
  const article = path.match(/^\/blog\/([^/]+)$/);
  if (article) return `article-${decodeURIComponent(article[1])}`;
  const slug = path.slice(1);
  if ((ROUTED_PAGES as readonly string[]).includes(slug)) return slug;
  return "not-found";
}
