import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = join(root, "dist");
const serverEntry = pathToFileURL(join(root, "dist-ssr", "entry-server.js")).href;

function escapeAttr(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function replaceAttr(html, attr, key, content) {
  const pattern = new RegExp(`<meta\\s+${attr}="${key}"\\s+content="[^"]*"\\s*\\/?>`, "i");
  const tag = `<meta ${attr}="${key}" content="${escapeAttr(content)}" />`;
  if (pattern.test(html)) return html.replace(pattern, tag);
  return html.replace("</head>", `    ${tag}\n  </head>`);
}

function applyMeta(template, page) {
  let html = template.replace('<div id="root"></div>', `<div id="root">${page.html}</div>`);
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(page.title)}</title>`);
  html = replaceAttr(html, "name", "description", page.description);
  html = replaceAttr(html, "name", "robots", page.robots);
  html = replaceAttr(html, "property", "og:title", page.title);
  html = replaceAttr(html, "property", "og:description", page.description);
  html = replaceAttr(html, "property", "og:url", page.canonical);
  html = replaceAttr(html, "name", "twitter:title", page.title);
  html = replaceAttr(html, "name", "twitter:description", page.description);
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${escapeAttr(page.canonical)}" />`
  );
  return html;
}

const { render, PRERENDER_PATHS } = await import(serverEntry);
const template = readFileSync(join(distDir, "index.html"), "utf8");

for (const url of PRERENDER_PATHS) {
  const page = render(url);
  const html = applyMeta(template, page);
  const filePath = url === "/" ? join(distDir, "index.html") : join(distDir, url.slice(1), "index.html");
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, html);
  console.log(`prerender ${url} → ${filePath.replace(root + "/", "")} (${page.html.length} chars)`);
}
