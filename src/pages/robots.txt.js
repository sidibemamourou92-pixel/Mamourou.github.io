import { site } from "../data/site.js";

export function GET() {
  const base = site.url.replace(/\/$/, "");
  return new Response(
    `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
}
