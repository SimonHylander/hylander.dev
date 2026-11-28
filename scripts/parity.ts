// Parity check for the TanStack Start migration. `snapshot` records what a deployment serves for every
// public URL. `diff` compares two snapshots and exits 1 on any difference.
//
//   node scripts/parity.ts snapshot https://hylander.dev parity/next.json
//   node scripts/parity.ts diff parity/next.json parity/start.json
//
// Set VERCEL_BYPASS to a Protection Bypass for Automation secret to snapshot a protected preview.
import { readFile, writeFile } from "node:fs/promises";

type Page = {
  status: number;
  location: string | null;
  contentType: string;
  html?: {
    lang: string | null;
    title: string | null;
    meta: Record<string, string>;
    links: Record<string, string>;
    jsonLd: unknown[];
    headings: string[];
    text: string;
    hrefs: string[];
  };
  body?: string;
  png?: { width: number; height: number };
  bytes: number;
};

type Snapshot = { base: string; pages: Record<string, Page>; jsBytes: Record<string, number> };

const fixedPaths = [
  "/robots.txt",
  "/sitemap.xml",
  "/logo.svg",
  "/favicon/favicon.ico",
  "/does-not-exist",
  "/resume",
  "/work/treddy",
  "/projects",
  "/contact",
  "/skills",
  "/bragdoc",
];

const bypass = process.env.VERCEL_BYPASS;
const headers: Record<string, string> = bypass ? { "x-vercel-protection-bypass": bypass } : {};

const decode = (value: string) =>
  value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&nbsp;/g, " ");

const attr = (tag: string, name: string) => {
  const match = tag.match(new RegExp(`\\s${name}=(?:"([^"]*)"|'([^']*)')`, "i"));
  return match ? decode(match[1] ?? match[2] ?? "") : null;
};

const stripTags = (html: string) => decode(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

/** A URL on `base` as a path, and an absolute URL on any host as a path too, so two hosts compare equal. */
const toPath = (value: string, base: string) => {
  const url = new URL(value, base);
  return url.host === new URL(base).host || url.host === "hylander.dev" ? `${url.pathname}${url.hash}` : url.href;
};

/**
 * Image URLs differ by cache-busting query strings between frameworks, so those are dropped. Hosts
 * stay: a preview must still name https://hylander.dev as canonical.
 */
const normalizeMeta = (key: string, value: string) => (/^(og|twitter):image$/.test(key) ? value.replace(/\?.*$/, "") : value);

function parseHtml(html: string, base: string): NonNullable<Page["html"]> {
  const head = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? "";
  const body = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? html;

  const meta: Record<string, string> = {};
  for (const [tag] of head.matchAll(/<meta\b[^>]*>/gi)) {
    const key = attr(tag, "name") ?? attr(tag, "property");
    const content = attr(tag, "content");
    if (key && content !== null && key !== "next-size-adjust") meta[key] = normalizeMeta(key, content);
    const charset = attr(tag, "charset");
    if (charset) meta.charset = charset.toLowerCase();
  }

  const links: Record<string, string> = {};
  for (const [tag] of head.matchAll(/<link\b[^>]*>/gi)) {
    const rel = attr(tag, "rel");
    const href = attr(tag, "href");
    if (!rel || !href || /stylesheet|preload|modulepreload|preconnect|dns-prefetch/.test(rel)) continue;
    links[`${rel}${attr(tag, "type") ? ` ${attr(tag, "type")}` : ""}${attr(tag, "sizes") ? ` ${attr(tag, "sizes")}` : ""}`] =
      rel === "canonical" ? href : toPath(href, base).replace(/\?.*$/, "");
  }

  const jsonLd = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map(([, json]) =>
    JSON.parse(json ?? "null"),
  );

  const visible = body
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, "")
    .replace(/<template[\s\S]*?<\/template>/gi, "");

  return {
    lang: html.match(/<html[^>]*\slang="([^"]*)"/i)?.[1] ?? null,
    title: (() => {
      const title = head.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];
      return title === undefined ? null : stripTags(title);
    })(),
    meta,
    links,
    jsonLd,
    headings: [...visible.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map(([, level, inner]) => `h${level} ${stripTags(inner ?? "")}`),
    // The heatmap total is live GitHub data, so it changes between any two snapshots.
    text: stripTags(visible).replace(/[\d,]+ contributions in 12 months/, "N contributions in 12 months"),
    hrefs: [...new Set([...visible.matchAll(/<a\b[^>]*>/gi)].flatMap(([tag]) => attr(tag, "href") ?? []))]
      .map((href) => toPath(href, base))
      .sort(),
  };
}

const pngSize = (bytes: Uint8Array) => {
  const view = new DataView(bytes.buffer, bytes.byteOffset);
  return { width: view.getUint32(16), height: view.getUint32(20) };
};

async function fetchPage(base: string, path: string): Promise<{ page: Page; raw: string }> {
  const response = await fetch(new URL(path, base), { redirect: "manual", headers });
  const type = response.headers.get("content-type")?.split(";")[0]?.trim() ?? "";
  const contentType = type === "image/x-icon" ? "image/vnd.microsoft.icon" : type;
  const bytes = new Uint8Array(await response.arrayBuffer());
  const raw = new TextDecoder().decode(bytes);
  const location = response.headers.get("location");
  const page: Page = { status: response.status, location: location && toPath(location, base), contentType, bytes: bytes.length };
  // A redirect's body and content type are never shown, so only the status and target compare.
  if (response.status >= 300 && response.status < 400) return { page: { ...page, contentType: "" }, raw };
  if (contentType === "text/html") page.html = parseHtml(raw, base);
  else if (contentType === "image/png") page.png = pngSize(bytes);
  else if (/xml|text\/plain/.test(contentType)) page.body = raw.replaceAll(new URL(base).origin, "https://hylander.dev").trim();
  return { page, raw };
}

/** Bytes of JavaScript a page loads before interaction: external module scripts plus inline scripts. */
async function jsBytes(base: string, raw: string) {
  const sources = [...raw.matchAll(/<script\b[^>]*\ssrc="([^"]+)"/gi), ...raw.matchAll(/<link\b[^>]*rel="modulepreload"[^>]*href="([^"]+)"/gi)]
    .map(([, src]) => new URL(src ?? "", base).href);
  const inline = [...raw.matchAll(/<script\b(?![^>]*\ssrc=)[^>]*>([\s\S]*?)<\/script>/gi)].reduce((sum, [, js]) => sum + (js?.length ?? 0), 0);
  const external = await Promise.all(
    [...new Set(sources)].map((src) => fetch(src, { headers }).then(async (response) => (await response.arrayBuffer()).byteLength)),
  );
  return inline + external.reduce((sum, size) => sum + size, 0);
}

async function snapshot(base: string, out: string) {
  const sitemap = await fetchPage(base, "/sitemap.xml");
  const pagePaths = [...sitemap.raw.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, loc]) => new URL(loc ?? "").pathname);
  const pages: Snapshot["pages"] = {};
  const js: Snapshot["jsBytes"] = {};

  for (const path of pagePaths) {
    const { page, raw } = await fetchPage(base, path);
    pages[path] = page;
    js[path] = await jsBytes(base, raw);
    // Every Open Graph image a page points at must serve a PNG.
    const image = page.html?.meta["og:image"] && new URL(page.html.meta["og:image"]).pathname;
    if (image && !pages[image]) pages[image] = (await fetchPage(base, image)).page;
  }
  for (const path of fixedPaths) pages[path] = (await fetchPage(base, path)).page;

  await writeFile(out, `${JSON.stringify({ base, pages, jsBytes: js } satisfies Snapshot, null, 2)}\n`);
  console.log(`${Object.keys(pages).length} URLs from ${base} -> ${out}`);
}

/** Fields a framework change may alter without changing what a visitor or crawler gets. */
const ignored = new Set(["bytes"]);

function compare(path: string, before: unknown, after: unknown, out: string[]) {
  if (JSON.stringify(before) === JSON.stringify(after)) return;
  if (before && after && typeof before === "object" && typeof after === "object" && !Array.isArray(before)) {
    const keys = new Set([...Object.keys(before), ...Object.keys(after)]);
    for (const key of keys) {
      if (ignored.has(key)) continue;
      compare(path ? `${path} ${key}` : key, (before as Record<string, unknown>)[key], (after as Record<string, unknown>)[key], out);
    }
    return;
  }
  if (typeof before === "string" && typeof after === "string" && before.length > 200) {
    // Long text: show where the two first differ instead of both copies.
    let start = 0;
    while (before[start] === after[start]) start++;
    const excerpt = (text: string) => JSON.stringify(text.slice(Math.max(0, start - 60), start + 100));
    out.push(`${path} (first difference at character ${start})\n  - ${excerpt(before)}\n  + ${excerpt(after)}`);
    return;
  }
  out.push(`${path}\n  - ${JSON.stringify(before)}\n  + ${JSON.stringify(after)}`);
}

async function diff(beforeFile: string, afterFile: string) {
  const [before, after] = await Promise.all(
    [beforeFile, afterFile].map(async (file) => JSON.parse(await readFile(file, "utf8")) as Snapshot),
  );
  if (!before || !after) throw new Error("Pass two snapshot files.");
  const out: string[] = [];
  compare("", before.pages, after.pages, out);

  console.log("JS bytes per page (before -> after):");
  for (const path of Object.keys(before.jsBytes)) {
    console.log(`  ${path}: ${before.jsBytes[path]} -> ${after.jsBytes[path] ?? "missing"}`);
  }
  if (out.length === 0) return console.log("\nNo differences.");
  console.log(`\n${out.length} differences:\n${out.join("\n")}`);
  process.exitCode = 1;
}

const [command, a, b] = process.argv.slice(2);
if (command === "snapshot" && a && b) await snapshot(a, b);
else if (command === "diff" && a && b) await diff(a, b);
else console.error("Usage: parity.ts snapshot <base-url> <out.json> | diff <before.json> <after.json>");
