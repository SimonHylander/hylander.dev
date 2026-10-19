import path from "node:path";
import createMDX from "@next/mdx";
import type { NextConfig } from "next";

// Old routes from the previous site. /resume became /cv, the rest folded into the home page.
const retiredRoutes = ["/projects", "/contact", "/skills", "/bragdoc"];

const nextConfig: NextConfig = {
  typedRoutes: true,
  async redirects() {
    return [
      { source: "/resume", destination: "/cv", permanent: true },
      ...retiredRoutes.map((source) => ({ source, destination: "/", permanent: true })),
    ];
  },
};

// Turbopack only accepts serializable MDX options, so the rehype plugin is passed as a file path.
const withMDX = createMDX({
  options: { rehypePlugins: [path.resolve("./src/lib/rehype-code.mjs")] },
});

export default withMDX(nextConfig);
