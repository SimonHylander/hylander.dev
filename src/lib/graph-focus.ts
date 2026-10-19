import { useSyncExternalStore } from "react";
import { systems, type SystemId } from "@/content/systems";
import type { CaseStudySlug } from "@/content/work";

/** What the pointer or keyboard is on: the graph nodes and work rows to highlight. */
export type GraphFocus = {
  systems: readonly SystemId[];
  slugs: readonly CaseStudySlug[];
} | null;

let current: GraphFocus = null;
const listeners = new Set<() => void>();

function set(next: GraphFocus) {
  current = next;
  listeners.forEach((listener) => listener());
}

/**
 * Shared hover state between the integration graph and the work rows. A module-level store,
 * so the two can sit anywhere in the tree without a provider.
 */
export const graphFocus = {
  get: () => current,
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  /** A node is hovered or focused: light it and the rows of its case studies. */
  system(id: SystemId) {
    const system = systems.find((entry) => entry.id === id);
    set({ systems: [id], slugs: system?.work ?? [] });
  },
  /** A work row is hovered or focused: light its title and its nodes. */
  work(slug: CaseStudySlug) {
    set({ systems: systems.filter(({ work }) => work.includes(slug)).map(({ id }) => id), slugs: [slug] });
  },
  clear: () => set(null),
};

/** Current focus in a client component. Always null on the server. */
export function useGraphFocus() {
  return useSyncExternalStore(graphFocus.subscribe, graphFocus.get, () => null);
}
