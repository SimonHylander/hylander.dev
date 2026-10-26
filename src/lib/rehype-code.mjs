// Rehype plugin for MDX code blocks: Shiki highlighting plus Twoslash type hovers, both at build time.
// next.config.ts registers this file by path, because Turbopack only accepts serializable MDX options.
import rehypeShiki from "@shikijs/rehype";
import { transformerTwoslash } from "@shikijs/twoslash";
import { createCssVariablesTheme } from "shiki";

// Token colors are CSS variables, set from the DESIGN.md tokens in src/app/code.css.
const theme = createCssVariablesTheme({ name: "hylander", variablePrefix: "--shiki-" });

/**
 * Adds a filename caption to blocks with a `title="..."` meta string, and makes Twoslash hover
 * targets focusable so their type popups also open from the keyboard.
 * @type {import("shiki").ShikiTransformer}
 */
const codeChrome = {
  name: "hylander:code-chrome",
  root(root) {
    visit(root, (node) => {
      if (classList(node).includes("twoslash-hover")) node.properties.tabindex = 0;
    });

    const title = this.options.meta?.__raw?.match(/title="([^"]+)"/)?.[1];
    if (!title) return;
    root.children = [
      {
        type: "element",
        tagName: "figure",
        properties: { className: ["code-figure"] },
        children: [
          {
            type: "element",
            tagName: "figcaption",
            properties: { className: ["code-title"] },
            children: [{ type: "text", value: title }],
          },
          ...root.children,
        ],
      },
    ];
  },
};

/**
 * Shiki writes `class`, rehype writes `className`, so read both.
 * @param {import("hast").Element} node
 */
function classList(node) {
  const value = node.properties?.className ?? node.properties?.class;
  return Array.isArray(value) ? value : typeof value === "string" ? value.split(" ") : [];
}

/**
 * Depth-first walk over hast elements.
 * @param {import("hast").Root | import("hast").Element} node
 * @param {(element: import("hast").Element) => void} fn
 */
function visit(node, fn) {
  for (const child of node.children) {
    if (child.type !== "element") continue;
    fn(child);
    visit(child, fn);
  }
}

/** @this {import("unified").Processor} */
export default function rehypeCode() {
  return rehypeShiki.call(this, {
    theme,
    langs: ["ts", "tsx", "js", "json", "sh"],
    lazy: true,
    transformers: [
      // Only ```ts twoslash blocks run the compiler. `throws` fails the build on a type error.
      transformerTwoslash({
        explicitTrigger: true,
        throws: true,
        // `// ^?` queries render as an in-flow line, so the scrolling <pre> cannot clip them.
        // JSDoc is left out: it arrives as raw markdown, and the popup is there for the type.
        rendererRich: { queryRendering: "line", jsdoc: false },
        // ESNext module and target, Bundler resolution, strict.
        twoslashOptions: { compilerOptions: { module: 99, moduleResolution: 100, target: 99, strict: true } },
      }),
      codeChrome,
    ],
  });
}
