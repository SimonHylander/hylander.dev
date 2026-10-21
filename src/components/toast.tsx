"use client";

import { useSyncExternalStore } from "react";

type Toast = { id: number; message: string };

let current: Toast | null = null;
let timer: ReturnType<typeof setTimeout> | undefined;
const listeners = new Set<() => void>();

function emit(next: Toast | null) {
  current = next;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Shows a short message in the page's one toast. A new message replaces the current one. */
export function toast(message: string) {
  clearTimeout(timer);
  emit({ id: (current?.id ?? 0) + 1, message });
  timer = setTimeout(() => emit(null), 2400);
}

/** The toast region. Mounted once in the root layout; the live region exists even when empty. */
export function Toaster() {
  const active = useSyncExternalStore(
    subscribe,
    () => current,
    () => null,
  );

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4 print:hidden"
    >
      {active && (
        <p
          key={active.id}
          className="rounded-md border border-line bg-plum-2 px-3.5 py-2 text-sm text-ink [animation:toast-in_240ms_var(--ease)]"
        >
          {active.message}
        </p>
      )}
    </div>
  );
}
