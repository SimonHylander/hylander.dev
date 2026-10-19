import type { MDXComponents } from "mdx/types";

// Required by @next/mdx in the App Router. Map MDX elements to styled components here.
const components: MDXComponents = {};

export function useMDXComponents(): MDXComponents {
  return components;
}
