import assert from "node:assert/strict";
import { test } from "node:test";
import { askInputSchema, parseAnswer, type SourceId } from "./ask.ts";

const known: SourceId[] = ["/", "/cv", "/work/treddy", "/work/ai-code-review"];

test("parseAnswer splits the prose from the cited pages, in site order", () => {
  const answer = parseAnswer("Simon cut review time by 80%.\nSources: /cv, /work/ai-code-review", known);
  assert.deepEqual(answer, { body: "Simon cut review time by 80%.", sources: ["/cv", "/work/ai-code-review"] });
});

test("parseAnswer drops ids that are not real pages", () => {
  assert.deepEqual(parseAnswer("A.\nSources: /work/made-up, /cv", known).sources, ["/cv"]);
});

test("parseAnswer leaves an answer without a Sources line intact", () => {
  assert.deepEqual(parseAnswer("The sources do not say.\n", known), { body: "The sources do not say.", sources: [] });
});

test("parseAnswer hides a Sources line that is still streaming in", () => {
  assert.deepEqual(parseAnswer("Simon led it.\nSour", known), { body: "Simon led it.", sources: [] });
});

test("askInputSchema trims the question and enforces 3 to 300 characters", () => {
  assert.equal(askInputSchema.parse({ question: "  Biggest migration?  " }).question, "Biggest migration?");
  assert.equal(askInputSchema.safeParse({ question: "  hi " }).success, false);
  assert.equal(askInputSchema.safeParse({ question: "x".repeat(301) }).success, false);
  assert.equal(askInputSchema.safeParse({}).success, false);
});
