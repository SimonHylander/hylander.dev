"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore, type KeyboardEvent } from "react";
import type { Command } from "@/lib/commands";
import { copyEmail } from "./copy-email";

const subscribeNever = () => () => {};
const isApple = () => /Mac|iPhone|iPad/.test(navigator.userAgent);

/** Words in the query must all appear in the label or the group, in any order. */
function matches(command: Command, query: string) {
  const haystack = `${command.label} ${command.group}`.toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .every((word) => haystack.includes(word));
}

/** Results grouped in first-seen order, with each command's index in the flat result list. */
function groupResults(results: Command[]) {
  const groups = new Map<string, { command: Command; index: number }[]>();
  results.forEach((command, index) => {
    groups.set(command.group, [...(groups.get(command.group) ?? []), { command, index }]);
  });
  return [...groups];
}

/**
 * The header's "Jump to" button and the ⌘K palette it opens. A native modal <dialog> traps focus,
 * Escape closes it, and focus returns to whatever was focused before it opened.
 */
export function CommandPalette({ commands }: { commands: Command[] }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const id = useId();
  const apple = useSyncExternalStore(subscribeNever, isApple, () => true);

  const results = commands.filter((command) => matches(command, query.trim()));
  const activeCommand = results[active];
  const optionId = (command: Command) => `${id}-${command.id}`;

  const open = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setQuery("");
    setActive(0);
    dialog.showModal();
  }, []);

  const close = () => dialogRef.current?.close();

  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key.toLowerCase() !== "k" || !(event.metaKey || event.ctrlKey)) return;
      event.preventDefault();
      if (dialogRef.current?.open) close();
      else open();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (activeCommand) document.getElementById(optionId(activeCommand))?.scrollIntoView({ block: "nearest" });
  });

  const run = (command: Command) => {
    close();
    switch (command.kind) {
      case "copy-email":
        return void copyEmail();
      case "route":
        return router.push(command.href);
      case "external":
        return window.location.assign(command.href);
      case "focus": {
        // The dialog's close handler restores focus, so point it at the target instead of the trigger.
        const target = document.getElementById(command.target);
        if (target) returnFocusRef.current = target;
        else router.push(command.href);
        return;
      }
    }
  };

  const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const count = results.length;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (count > 0) setActive((active + (event.key === "ArrowDown" ? 1 : count - 1)) % count);
    } else if (event.key === "Enter" && activeCommand) {
      event.preventDefault();
      run(activeCommand);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={open}
        data-requires-js
        aria-haspopup="dialog"
        aria-keyshortcuts={apple ? "Meta+K" : "Control+K"}
        className="group flex items-center gap-2 rounded-md py-1 pr-1 pl-2.5 text-sm text-muted transition-colors duration-200 ease-out hover:bg-plum-2 hover:text-ink"
      >
        Jump to
        <kbd className="kbd max-sm:hidden" aria-hidden>
          {apple ? "⌘K" : "Ctrl K"}
        </kbd>
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Jump to"
        onClose={() => returnFocusRef.current?.focus()}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        className="fixed inset-x-0 top-[12vh] mx-auto my-0 w-[min(34rem,calc(100vw-2rem))] overflow-hidden rounded-lg border border-line bg-plum-2 p-0 text-ink backdrop:bg-plum/75 open:[animation:palette-in_200ms_var(--ease)] open:backdrop:[animation:fade-in_200ms_var(--ease)]"
      >
        <input
          type="text"
          role="combobox"
          aria-expanded="true"
          aria-controls={`${id}-list`}
          aria-activedescendant={activeCommand ? optionId(activeCommand) : undefined}
          aria-autocomplete="list"
          aria-label="Search commands"
          placeholder="Type a command or search"
          autoComplete="off"
          spellCheck={false}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(0);
          }}
          onKeyDown={onInputKeyDown}
          className="w-full border-b border-line bg-transparent px-4 py-3.5 text-base text-ink placeholder:text-muted focus-visible:outline-none"
        />

        <div id={`${id}-list`} role="listbox" aria-label="Commands" className="max-h-[min(22rem,60vh)] overflow-y-auto p-1.5">
          {results.length === 0 && <p className="px-3 py-6 text-center text-sm text-muted">No matches</p>}
          {groupResults(results).map(([group, items], groupIndex) => (
            <div key={group} role="group" aria-labelledby={`${id}-group-${groupIndex}`} className="pb-1">
              <div id={`${id}-group-${groupIndex}`} className="px-2.5 pt-2.5 pb-1 text-meta text-muted">
                {group}
              </div>
              {items.map(({ command, index }) => (
                <div
                  key={command.id}
                  id={optionId(command)}
                  role="option"
                  aria-selected={index === active}
                  onMouseMove={() => setActive(index)}
                  onClick={() => run(command)}
                  className="flex cursor-pointer items-center justify-between gap-4 rounded-sm px-2.5 py-2 text-[0.9375rem] aria-selected:bg-plum-3"
                >
                  {command.label}
                  {command.kind === "external" && (
                    <span aria-hidden className="text-muted">
                      ↗
                    </span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="flex gap-4 border-t border-line px-4 py-2 text-meta text-muted max-sm:hidden" aria-hidden>
          <span>
            <kbd className="kbd">↑</kbd> <kbd className="kbd">↓</kbd> to move
          </span>
          <span>
            <kbd className="kbd">↵</kbd> to open
          </span>
          <span>
            <kbd className="kbd">esc</kbd> to close
          </span>
        </div>
      </dialog>
    </>
  );
}
