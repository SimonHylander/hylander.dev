import mdx from "@mdx-js/rollup";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { imagetools } from "vite-imagetools";
import rehypeCode from "./src/lib/rehype-code.mjs";

// Old routes from the previous site. /resume became /cv, the rest folded into the home page.
const retiredRoutes = ["/projects", "/contact", "/skills", "/bragdoc"];
const permanent = (to: string) => ({ redirect: { to, status: 308 } });

const mdxPlugin = mdx({ rehypePlugins: [rehypeCode], providerImportSource: "/src/mdx-components.tsx" });

export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    {
      ...mdxPlugin,
      enforce: "pre",
      // @mdx-js/rollup drops the query before matching, so it would compile the `?raw` imports in src/lib/ask-sources.ts too.
      async transform(code, id) {
        if (id.endsWith("?raw")) return null;
        const result = await mdxPlugin.transform.call(this, code, id);
        // Rollup and Rolldown type source map objects differently. Both accept the JSON string.
        return result && { code: result.code, map: JSON.stringify(result.map) };
      },
    },
    // Content screenshots become WebP at twice the 44rem column width, imported as { src, width, height }.
    imagetools({
      defaultDirectives: (url) =>
        url.pathname.includes("/src/content/") && /\.png$/.test(url.pathname)
          ? new URLSearchParams({ w: "1408", withoutEnlargement: "", format: "webp", as: "metadata" })
          : new URLSearchParams(),
    }),
    tailwindcss(),
    tanstackStart(),
    nitro({
      routeRules: {
        // Vercel ISR: the CDN keeps each page until the next deploy. The home page's GitHub heatmap
        // refreshes once a day. Requests that run code on every call opt out.
        "/**": { isr: true },
        "/": { isr: 60 * 60 * 24 },
        "/api/ask": { isr: false },
        "/_serverFn/**": { isr: false },
        // BotID's challenge script and its API, proxied through the site. Copied from the botid Nuxt module.
        "/149e9513-01fa-4fb0-aad4-566afd725d1b/2d206a39-8ed7-437e-a3be-862e0f06eea3/a-4-a/c.js": {
          proxy: "https://api.vercel.com/bot-protection/v1/challenge",
        },
        "/149e9513-01fa-4fb0-aad4-566afd725d1b/2d206a39-8ed7-437e-a3be-862e0f06eea3/**": {
          proxy: "https://api.vercel.com/bot-protection/v1/proxy/**",
          headers: { "X-Frame-Options": "SAMEORIGIN" },
        },
        "/resume": permanent("/cv"),
        "/work/treddy": permanent("/work/treddy-se"),
        ...Object.fromEntries(retiredRoutes.map((path) => [path, permanent("/")])),
      },
      // /api/ask streams for up to 30 seconds. One limit for every function: per-route functionRules
      // are routed after the ISR rules above, so /api/ask would never reach its own function.
      vercel: { functions: { maxDuration: 30 } },
    }),
    viteReact({ include: /\.(mdx|jsx|tsx|js|ts)$/ }),
  ],
});
