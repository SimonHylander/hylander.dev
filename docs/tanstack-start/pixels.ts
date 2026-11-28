// Pixel diff between two deployments: full-page screenshots at desktop and phone width, reduced motion,
// compared with pixelmatch. Writes a diff PNG per page into <out-dir>.
//
// Run a copy from a directory with the dependencies installed, as described in smoke.ts:
//   node pixels.ts <before> <after> <out-dir>
import { mkdir, writeFile } from "node:fs/promises";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";
import { chromium } from "playwright-core";

const [before, after, out = "pixels"] = process.argv.slice(2);
if (!before || !after) throw new Error("Usage: pixels.ts <before-url> <after-url> [out-dir]");

const paths = ["/", "/cv", "/work/treddy-se", "/work/byggdagboken-migration", "/does-not-exist"];
const widths = [1280, 390];
const browser = await chromium.launch({ executablePath: process.env.CHROME ?? "/run/current-system/sw/bin/google-chrome-stable" });
await mkdir(out, { recursive: true });

const bypass = process.env.VERCEL_BYPASS;
const extraHTTPHeaders: Record<string, string> = bypass
  ? { "x-vercel-protection-bypass": bypass, "x-vercel-set-bypass-cookie": "true" }
  : {};

async function shot(base: string, path: string, width: number) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: "reduce", extraHTTPHeaders });
  await page.goto(new URL(path, base).href, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  // Lazy images only load near the viewport, so scroll through the page before the capture.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForLoadState("networkidle");
  const png = PNG.sync.read(await page.screenshot({ fullPage: true, animations: "disabled" }));
  await page.close();
  return png;
}

let failed = false;
for (const path of paths) {
  for (const width of widths) {
    const [a, b] = [await shot(before, path, width), await shot(after, path, width)];
    const name = `${path.replace(/\W+/g, "_") || "home"}-${width}`;
    if (a.height !== b.height) {
      console.log(`DIFF  ${path} @${width}: page height ${a.height} -> ${b.height}`);
      failed = true;
    }
    const height = Math.min(a.height, b.height);
    const crop = (png: PNG) => {
      const cropped = new PNG({ width: png.width, height });
      PNG.bitblt(png, cropped, 0, 0, png.width, height, 0, 0);
      return cropped;
    };
    const diff = new PNG({ width: a.width, height });
    const changed = pixelmatch(crop(a).data, crop(b).data, diff.data, a.width, height, { threshold: 0.1 });
    const share = changed / (a.width * height);
    await writeFile(`${out}/${name}.png`, PNG.sync.write(diff));
    console.log(`${share < 0.001 ? "SAME " : "DIFF "} ${path} @${width}: ${changed} px (${(share * 100).toFixed(3)}%)`);
    if (share >= 0.001) failed = true;
  }
}
// Open Graph images are PNGs already: compare them directly. The renderer changed between frameworks.
const ogImages = ["/opengraph-image", "/work/treddy-se/opengraph-image", "/work/ai-code-review/opengraph-image"];
for (const path of ogImages) {
  const [a, b] = await Promise.all(
    [before, after].map(async (base) =>
      PNG.sync.read(Buffer.from(await (await fetch(new URL(path, base), { headers: extraHTTPHeaders })).arrayBuffer())),
    ),
  );
  if (!a || !b || a.width !== b.width || a.height !== b.height) {
    console.log(`DIFF  ${path}: size ${a?.width}x${a?.height} -> ${b?.width}x${b?.height}`);
    failed = true;
    continue;
  }
  const diff = new PNG({ width: a.width, height: a.height });
  const changed = pixelmatch(a.data, b.data, diff.data, a.width, a.height, { threshold: 0.1 });
  const share = changed / (a.width * a.height);
  await writeFile(`${out}/og${path.replace(/\W+/g, "_")}.png`, PNG.sync.write(diff));
  console.log(`${share < 0.001 ? "SAME " : "DIFF "} ${path}: ${changed} px (${(share * 100).toFixed(3)}%)`);
  if (share >= 0.001) failed = true;
}

await browser.close();
if (failed) process.exitCode = 1;
