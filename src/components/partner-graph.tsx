"use client";

import { useEffect, useRef, useState } from "react";
import { treddyPartners } from "@/content/partners";

type Partner = (typeof treddyPartners)[number];

const round = (value: number) => Math.round(value * 100) / 100;

// Node centres in percent of the box, on an ellipse that starts at the top and runs clockwise.
const nodes = treddyPartners.map((partner, index) => {
  const angle = -Math.PI / 2 + (index / treddyPartners.length) * Math.PI * 2;
  return { ...partner, x: round(50 + Math.cos(angle) * 36), y: round(50 + Math.sin(angle) * 38) };
});

type Node = (typeof nodes)[number];

const reducedMotion = "(prefers-reduced-motion: reduce)";
const idleCaption = "The product calls one API. Partners send events back as webhooks.";

/** Sends one lilac dot between a partner and the API: a request out, or a webhook back in. */
function pulse(layer: HTMLElement, node: Node, inbound = Math.random() > 0.5) {
  if (document.hidden || matchMedia(reducedMotion).matches) return;
  const { width, height } = layer.getBoundingClientRect();
  const at = ({ x, y }: { x: number; y: number }) => `translate(${(x / 100) * width}px, ${(y / 100) * height}px)`;
  const [from, to] = inbound ? [node, { x: 50, y: 50 }] : [{ x: 50, y: 50 }, node];
  const dot = document.createElement("span");
  dot.className = "absolute -top-[3px] -left-[3px] size-1.5 rounded-full bg-lilac";
  layer.append(dot);
  const animation = dot.animate(
    [
      { transform: at(from), opacity: 0 },
      { opacity: 1, offset: 0.15 },
      { transform: at(to), opacity: 0 },
    ],
    { duration: 1100, easing: "cubic-bezier(.45, 0, .2, 1)" },
  );
  animation.onfinish = animation.oncancel = () => dot.remove();
}

/**
 * The Treddy partner API with its partners on an ellipse around it. Hovering or focusing a partner
 * lights its edge and names its role below. While on screen, a dot travels a random edge every
 * 700ms. Labels are HTML, so they keep their size at any width. No dots under reduced motion.
 */
export function PartnerGraph() {
  const [active, setActive] = useState<Partner["label"] | null>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const activeNode = nodes.find(({ label }) => label === active);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    const motion = matchMedia(reducedMotion);
    let onScreen = false;
    let timer: number | undefined;

    // Runs only while the graph is visible, the tab is in front and motion is allowed.
    const sync = () => {
      const run = onScreen && !document.hidden && !motion.matches;
      if (run && timer === undefined) {
        timer = window.setInterval(() => {
          const node = nodes[Math.floor(Math.random() * nodes.length)];
          if (node) pulse(layer, node);
        }, 700);
      } else if (!run && timer !== undefined) {
        window.clearInterval(timer);
        timer = undefined;
        layer.getAnimations({ subtree: true }).forEach((animation) => animation.cancel());
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry?.isIntersecting ?? false;
      sync();
    });
    observer.observe(layer);
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", sync);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", sync);
      window.clearInterval(timer);
    };
  }, []);

  const enter = (node: Node) => {
    setActive(node.label);
    if (layerRef.current) pulse(layerRef.current, node, true);
  };
  const leave = () => setActive(null);

  return (
    <div className="space-y-4">
      <div className="relative aspect-[16/10] w-full">
        <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible">
          {nodes.map(({ label, x, y }) => (
            <line
              key={label}
              x1={50}
              y1={50}
              x2={x}
              y2={y}
              vectorEffect="non-scaling-stroke"
              className={`transition-[stroke] duration-250 ease-out ${active === label ? "stroke-lilac" : "stroke-line"}`}
            />
          ))}
        </svg>
        <div ref={layerRef} aria-hidden className="absolute inset-0" />
        <ul aria-label="Treddy partners" className="contents">
          {nodes.map((node) => (
            <li
              key={node.label}
              tabIndex={0}
              onPointerEnter={() => enter(node)}
              onPointerLeave={leave}
              onFocus={() => enter(node)}
              onBlur={leave}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              className={`absolute -translate-1/2 cursor-default rounded-sm border bg-plum-3 px-2.5 py-1 font-mono text-[0.75rem] font-medium whitespace-nowrap transition-colors duration-250 ease-out ${active === node.label ? "border-lilac text-ink" : "border-line text-muted"}`}
            >
              {node.label}
              <span className="sr-only">: {node.role}</span>
            </li>
          ))}
        </ul>
        <span className="absolute top-1/2 left-1/2 -translate-1/2 rounded-full bg-lilac px-4 py-2 text-sm font-semibold whitespace-nowrap text-plum">
          Treddy API
        </span>
      </div>
      <p aria-hidden className="min-h-[3lh] text-sm text-muted sm:min-h-[2lh]">
        {activeNode ? `${activeNode.label}. ${activeNode.role}` : idleCaption}
      </p>
    </div>
  );
}
