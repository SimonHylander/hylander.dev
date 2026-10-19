"use client";

import { useEffect, useMemo, useRef } from "react";
import { systems, type SystemId } from "@/content/systems";
import { graphFocus, useGraphFocus } from "@/lib/graph-focus";

const center = { x: 150, y: 115 };
const radius = { x: 112, y: 90 };
const round = (value: number) => Math.round(value * 100) / 100;

type PlacedNode = ReturnType<typeof place>[number];

/** Spreads the nodes evenly on an ellipse around the center, starting at the top. */
function place(only?: readonly SystemId[]) {
  const nodes = only ? systems.filter(({ id }) => only.includes(id)) : systems;
  return nodes.map(({ id, label }, index) => {
    const angle = -Math.PI / 2 + (index / nodes.length) * Math.PI * 2;
    return {
      id,
      label,
      x: round(center.x + Math.cos(angle) * radius.x),
      y: round(center.y + Math.sin(angle) * radius.y),
      // Fits the 10.5px mono label with 8px padding on each side.
      width: round(label.length * 6.6 + 16),
    };
  });
}

const reducedMotion = "(prefers-reduced-motion: reduce)";

/** Sends one lilac dot along a node's edge, toward the center or away from it. */
function pulse(layer: SVGGElement, node: PlacedNode, inbound = Math.random() > 0.5) {
  if (document.hidden || matchMedia(reducedMotion).matches) return;
  const [from, to] = inbound ? [node, center] : [center, node];
  const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  dot.setAttribute("r", "2.6");
  dot.setAttribute("class", "fill-lilac");
  layer.append(dot);
  const animation = dot.animate(
    [
      { transform: `translate(${from.x}px, ${from.y}px)`, opacity: 0 },
      { opacity: 1, offset: 0.15 },
      { transform: `translate(${to.x}px, ${to.y}px)`, opacity: 0 },
    ],
    { duration: 1100, easing: "cubic-bezier(.45, 0, .2, 1)" },
  );
  animation.onfinish = animation.oncancel = () => dot.remove();
}

type IntegrationGraphProps = {
  /** Accessible description of the whole graph. */
  label: string;
  /** Limit the graph to these systems. Defaults to all of them. */
  only?: readonly SystemId[];
};

/**
 * Systems Simon has integrated, as nodes around the SH mark. Hovering or focusing a node lights it
 * and the related work rows (through `graphFocus`); hovering a row lights its nodes. While idle and
 * on screen, a dot travels a random edge every 650ms. No dots under reduced motion.
 */
export function IntegrationGraph({ label, only }: IntegrationGraphProps) {
  const nodes = useMemo(() => place(only), [only]);
  // Crop the height to the nodes, so a graph of three partners has no empty band below it.
  const top = Math.floor(Math.min(center.y - 22, ...nodes.map(({ y }) => y - 11)) - 4);
  const bottom = Math.ceil(Math.max(center.y + 22, ...nodes.map(({ y }) => y + 11)) + 4);
  const svgRef = useRef<SVGSVGElement>(null);
  const layerRef = useRef<SVGGElement>(null);
  const focus = useGraphFocus();
  const isLit = (id: SystemId) => focus?.systems.includes(id) ?? false;

  useEffect(() => {
    const svg = svgRef.current;
    const layer = layerRef.current;
    if (!svg || !layer) return;
    const motion = matchMedia(reducedMotion);
    let onScreen = false;
    let timer: number | undefined;

    // Pulses stay on the focused nodes while something is focused.
    const tick = () => {
      const focused = graphFocus.get()?.systems;
      const pool = focused ? nodes.filter(({ id }) => focused.includes(id)) : nodes;
      const node = pool[Math.floor(Math.random() * pool.length)];
      if (node) pulse(layer, node);
    };

    // Runs only while the graph is visible, the tab is in front and motion is allowed.
    const sync = () => {
      const run = onScreen && !document.hidden && !motion.matches;
      if (run && timer === undefined) {
        timer = window.setInterval(tick, 650);
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
    observer.observe(svg);
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", sync);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", sync);
      window.clearInterval(timer);
    };
  }, [nodes]);

  const enter = (node: PlacedNode) => {
    graphFocus.system(node.id);
    if (layerRef.current) pulse(layerRef.current, node, true);
  };

  return (
    <svg ref={svgRef} viewBox={`0 ${top} 300 ${bottom - top}`} role="img" aria-label={label} className="block h-auto w-full overflow-visible">
      {nodes.map(({ id, x, y }) => (
        <line
          key={id}
          x1={center.x}
          y1={center.y}
          x2={x}
          y2={y}
          vectorEffect="non-scaling-stroke"
          className={`transition-[stroke] duration-250 ease-out ${isLit(id) ? "stroke-lilac" : "stroke-line"}`}
        />
      ))}
      <g ref={layerRef} />
      {nodes.map((node) => (
        <g
          key={node.id}
          tabIndex={0}
          aria-label={node.label}
          onPointerEnter={() => enter(node)}
          onPointerLeave={graphFocus.clear}
          onFocus={() => enter(node)}
          onBlur={graphFocus.clear}
          className="cursor-default"
        >
          <rect
            x={round(node.x - node.width / 2)}
            y={node.y - 11}
            width={node.width}
            height={22}
            rx={5}
            vectorEffect="non-scaling-stroke"
            className={`transition-[fill,stroke] duration-250 ease-out ${isLit(node.id) ? "fill-plum-3 stroke-lilac" : "fill-plum-2 stroke-line"}`}
          />
          <text
            x={node.x}
            y={round(node.y + 3.5)}
            textAnchor="middle"
            className={`pointer-events-none font-mono text-[10.5px] font-medium transition-[fill] duration-250 ease-out ${isLit(node.id) ? "fill-ink" : "fill-muted"}`}
          >
            {node.label}
          </text>
        </g>
      ))}
      <circle cx={center.x} cy={center.y} r={22} className="fill-lilac" />
      <text x={center.x} y={center.y + 4} textAnchor="middle" className="fill-plum font-sans text-[12px] font-bold">
        SH
      </text>
    </svg>
  );
}
