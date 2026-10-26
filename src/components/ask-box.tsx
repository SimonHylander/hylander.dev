"use client";

import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import { askErrorSchema, askInputSchema, parseAnswer, type SourceId } from "@/lib/ask";

const suggestions = ["What has he integrated?", "How does he use AI?", "Biggest migration?"];

type AskState =
  | { status: "idle" }
  | { status: "streaming" | "done"; text: string }
  | { status: "error"; reason: string };

/**
 * The question form, suggestion chips and streamed answer of "Ask about my work". POSTs to
 * /api/ask and renders the plain-text stream as it arrives. `sources` are the pages the answer
 * may link to; any other path the model cites is dropped.
 */
export function AskBox({ sources }: { sources: SourceId[] }) {
  const [question, setQuestion] = useState("");
  const [state, setState] = useState<AskState>({ status: "idle" });
  const abortRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const streaming = state.status === "streaming";

  // The ⌘K "Ask about my work" command lands on /#ask from other pages.
  useEffect(() => {
    if (window.location.hash === "#ask") inputRef.current?.focus();
    return () => abortRef.current?.abort();
  }, []);

  async function ask(text: string) {
    const input = askInputSchema.safeParse({ question: text });
    if (!input.success) {
      return setState({ status: "error", reason: input.error.issues[0]?.message ?? "Ask a question first." });
    }

    const controller = new AbortController();
    abortRef.current = controller;
    setState({ status: "streaming", text: "" });
    let answer = "";

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input.data),
        signal: controller.signal,
      });
      if (!response.ok || !response.body) {
        const body = askErrorSchema.safeParse(await response.json().catch(() => null));
        return setState({ status: "error", reason: body.success ? body.data.error : "Something went wrong. Try again." });
      }

      const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
      for (let chunk = await reader.read(); !chunk.done; chunk = await reader.read()) {
        answer += chunk.value;
        setState({ status: "streaming", text: answer });
      }
      setState(
        answer.trim()
          ? { status: "done", text: answer }
          : { status: "error", reason: "No answer came back. Try again, or email Simon." },
      );
    } catch {
      if (!controller.signal.aborted) return setState({ status: "error", reason: "The connection dropped. Try again." });
      setState(answer.trim() ? { status: "done", text: answer } : { status: "idle" });
    }
  }

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (!streaming) void ask(question);
        }}
        className="flex items-center gap-3 border-y border-line"
      >
        <label htmlFor="ask-input" className="sr-only">
          Your question
        </label>
        <input
          ref={inputRef}
          id="ask-input"
          type="text"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          maxLength={300}
          autoComplete="off"
          placeholder="What do you want to know about Simon's work?"
          className="min-w-0 flex-1 bg-transparent py-3.5 text-ink placeholder:text-muted"
        />
        {/*
          One button, so focus stays put when Ask turns into Stop. Stop prevents the default action:
          the abort settles before the click finishes, and the button would otherwise submit again.
        */}
        <button
          type="submit"
          onClick={(event) => {
            if (!streaming) return;
            event.preventDefault();
            abortRef.current?.abort();
          }}
          className="shrink-0 rounded-sm border border-line px-2 font-mono text-meta leading-6 text-muted transition-colors duration-200 ease-out hover:border-lilac hover:text-lilac"
        >
          {streaming ? "Stop" : "Ask"}
        </button>
      </form>

      <ul aria-label="Suggested questions" className="mt-3 flex flex-wrap gap-2">
        {suggestions.map((suggestion) => (
          <li key={suggestion}>
            <button
              type="button"
              disabled={streaming}
              onClick={() => {
                setQuestion(suggestion);
                void ask(suggestion);
              }}
              className="rounded-sm border border-line bg-plum-2 px-2 py-0.5 text-sm text-muted transition-colors duration-200 ease-out enabled:hover:border-lilac enabled:hover:text-ink disabled:opacity-60"
            >
              {suggestion}
            </button>
          </li>
        ))}
      </ul>

      <div aria-live="polite" aria-busy={streaming} className="mt-5 min-h-32">
        {state.status === "idle" && (
          <p className="text-sm text-muted">Answers come only from the projects and CV on this site.</p>
        )}
        {state.status === "error" && <p className="text-sm text-muted">{state.reason}</p>}
        {(state.status === "streaming" || state.status === "done") && (
          <Answer text={state.text} sources={sources} streaming={streaming} />
        )}
      </div>
    </>
  );
}

/** The answer prose with a lilac block caret while it streams, then the cited pages as links. */
function Answer({ text, sources, streaming }: { text: string; sources: SourceId[]; streaming: boolean }) {
  const { body, sources: cited } = parseAnswer(text, sources);

  return (
    <>
      <p className="max-w-[65ch] whitespace-pre-line">
        {body}
        {streaming && (
          <span aria-hidden className="caret ml-0.5 inline-block h-[1.1em] w-[0.5em] translate-y-[0.2em] bg-lilac" />
        )}
      </p>
      {cited.length > 0 && (
        <p className="mt-3 font-mono text-meta text-muted">
          Sources:{" "}
          {cited.map((id, index) => (
            <Fragment key={id}>
              {index > 0 && ", "}
              <Link href={id} className="link">
                {id}
              </Link>
            </Fragment>
          ))}
        </p>
      )}
    </>
  );
}
