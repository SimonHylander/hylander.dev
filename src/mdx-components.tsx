import type { MDXComponents } from "mdx/types";
import { BuildDiagram, DiagramStep } from "@/components/build-diagram";
import { Figure } from "@/components/figure";

// Required by @next/mdx in the App Router. Components listed here are usable in every MDX file without an import.
const components = { BuildDiagram, DiagramStep, Figure } satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
