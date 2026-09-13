import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "@/app/App";
import { canonicalForPath, metaForPath, PRERENDER_PATHS } from "@/app/pageMeta";

export { PRERENDER_PATHS };

export function render(url: string) {
  const html = renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
  const meta = metaForPath(url);
  return {
    html,
    title: meta.title,
    description: meta.description,
    robots: meta.robots ?? "index, follow",
    canonical: canonicalForPath(url),
  };
}
