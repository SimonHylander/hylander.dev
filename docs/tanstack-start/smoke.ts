// Browser smoke test for the migration: hydration errors, client navigation, the ⌘K palette,
// fonts and the home loader on a client-side visit. Uses the system Chrome through playwright-core.
//
// Node resolves ESM imports from the script's own directory, so run a copy from a directory that has
// the dependency installed:
//   mkdir -p /tmp/harness && cp docs/tanstack-start/*.ts /tmp/harness && cd /tmp/harness
//   npm i playwright-core@1.65.1 pngjs@7.0.0 pixelmatch@7.1.0
//   node smoke.ts http://localhost:3000
// Set VERCEL_BYPASS to a Protection Bypass for Automation secret to test a protected preview.
import { chromium } from "playwright-core";

const base = process.argv[2] ?? "http://localhost:3000";
const browser = await chromium.launch({ executablePath: process.env.CHROME ?? "/run/current-system/sw/bin/google-chrome-stable" });
const bypass = process.env.VERCEL_BYPASS;
const page = await browser.newPage({
  extraHTTPHeaders: bypass ? { "x-vercel-protection-bypass": bypass, "x-vercel-set-bypass-cookie": "true" } : {},
});
const errors: string[] = [];
page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
page.on("console", (message) => {
  // Failed requests are reported with their URL by the response listener below.
  if (message.text().startsWith("Failed to load resource")) return;
  if (message.type() === "error" || /hydrat/i.test(message.text())) errors.push(`console: ${message.text()}`);
});
// Vercel Analytics only exists on Vercel, and /does-not-exist is the deliberate 404.
const expected404 = /\/_vercel\/|\/does-not-exist$/;
page.on("response", (response) => {
  if (response.status() >= 400 && !expected404.test(response.url())) errors.push(`${response.status()} ${response.url()}`);
});

const results: [string, boolean, string?][] = [];
const check = (name: string, ok: boolean, detail?: string) => results.push([name, ok, detail]);

for (const path of ["/", "/cv", "/work/treddy-se", "/does-not-exist"]) {
  await page.goto(new URL(path, base).href, { waitUntil: "networkidle" });
}
check("no hydration or runtime errors on full loads", errors.length === 0, errors.join(" | "));

await page.goto(base, { waitUntil: "networkidle" });
check("heatmap rendered on the server", (await page.locator("#shipping-heading").count()) === 1);
check("Familjen Grotesk loaded", await page.evaluate(async () => (await document.fonts.ready, [...document.fonts].some((f) => f.family.includes("Familjen") && f.status === "loaded"))));
check("Geist Mono loaded", await page.evaluate(async () => (await document.fonts.ready, [...document.fonts].some((f) => /Geist Mono/.test(f.family) && f.status === "loaded"))));

// The header's CV link navigates on the client: the document is not reloaded.
await page.evaluate(() => ((window as unknown as { marker: boolean }).marker = true));
await page.locator('header a[href="/cv"]').click();
await page.waitForURL("**/cv");
await page.waitForFunction(() => document.title.startsWith("CV"));
check("header link is a client navigation", await page.evaluate(() => (window as unknown as { marker?: boolean }).marker === true));
check("title updates on client navigation", (await page.title()) === "CV | Simon Hylander", await page.title());

// ⌘K palette: open it, pick a case study.
await page.keyboard.press("Control+k");
await page.keyboard.type("Treddy");
await page.keyboard.press("Enter");
await page.waitForURL("**/work/treddy-se");
check("palette navigates to a case study", new URL(page.url()).pathname === "/work/treddy-se", page.url());
check("palette navigation keeps the document", await page.evaluate(() => (window as unknown as { marker?: boolean }).marker === true));

// Back to the home page on the client: its loader runs through a server function.
await page.locator('header a[href="/"]').first().click();
await page.waitForURL(base.replace(/\/$/, "") + "/");
await page.locator("#shipping-heading").waitFor({ timeout: 5000 }).catch(() => undefined);
check("heatmap renders after a client navigation to /", (await page.locator("#shipping-heading").count()) === 1);
check("no errors after client navigation", errors.length === 0, errors.join(" | "));

await browser.close();
for (const [name, ok, detail] of results) console.log(`${ok ? "PASS" : "FAIL"}  ${name}${!ok && detail ? `  (${detail})` : ""}`);
if (results.some(([, ok]) => !ok)) process.exitCode = 1;
