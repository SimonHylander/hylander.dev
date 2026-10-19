"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { boxHeight, type Diagram, type DiagramNode } from "@/content/diagrams";

// Stepping needs room for the sticky diagram and a reader who is fine with motion.
const steppingQuery = "(min-width: 48rem) and (prefers-reduced-motion: no-preference)";

function subscribe(onChange: () => void) {
  const query = matchMedia(steppingQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/** False on the server and before hydration, so the HTML always holds the full diagram. */
function useStepping() {
  return useSyncExternalStore(
    subscribe,
    () => matchMedia(steppingQuery).matches,
    () => false,
  );
}

type PartState = "hidden" | "active" | "built";

/**
 * MDX: an architecture diagram that builds up as the reader scrolls through its steps.
 * Each <DiagramStep> child is one step, in order; parts of `diagram` with that `step` appear when
 * the step's text crosses the middle of the viewport, and the newest parts turn lilac.
 * On small screens, under reduced motion and without JavaScript, the full diagram sits above the text.
 */
export function BuildDiagram({ diagram, children }: { diagram: Diagram; children: ReactNode }) {
  const stepping = useStepping();
  const [active, setActive] = useState(1);
  const stepsRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!stepping || !stepsRef.current) return;
    const steps = [...stepsRef.current.querySelectorAll("[data-diagram-step]")];
    const passed = steps.map(() => false);

    // The root is the top half of the viewport. A step has passed once its top is above the middle.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const middle = entry.rootBounds?.bottom ?? innerHeight / 2;
          passed[steps.indexOf(entry.target)] = entry.boundingClientRect.top < middle;
        }
        setActive(Math.max(1, passed.lastIndexOf(true) + 1));
      },
      { rootMargin: "0px 0px -50% 0px" },
    );
    for (const step of steps) observer.observe(step);
    return () => observer.disconnect();
  }, [stepping]);

  const stateOf = (step: number): PartState =>
    !stepping || step < active ? "built" : step === active ? "active" : "hidden";

  return (
    <div
      data-stepping={stepping || undefined}
      className="group/diagram my-10 md:grid md:w-[41rem] md:grid-cols-[minmax(0,1fr)_20rem] md:items-start md:gap-8"
    >
      <figure className="max-w-[20rem] md:sticky md:top-[max(1.5rem,calc(50vh-12rem))] md:order-last">
        <svg
          role="img"
          aria-labelledby={titleId}
          viewBox={`-1 -1 ${diagram.width + 2} ${diagram.height + 2}`}
          className="h-auto w-full overflow-visible"
        >
          <title id={titleId}>{diagram.title}</title>
          {diagram.edges.map((edge) => {
            const points = edge.points ?? straightEdge(diagram.nodes[edge.from], diagram.nodes[edge.to]);
            const label = edge.label && labelPosition(points);
            return (
              <g key={`${edge.from}-${edge.to}`} data-state={stateOf(edge.step)} className={partClass}>
                <polyline
                  points={points.map(([x, y]) => `${x},${y}`).join(" ")}
                  fill="none"
                  vectorEffect="non-scaling-stroke"
                  className="stroke-line transition-colors duration-500 ease-out group-data-[state=active]:stroke-lilac"
                />
                {label && (
                  <text {...label} className="fill-muted font-mono text-[10px]">
                    {edge.label}
                  </text>
                )}
              </g>
            );
          })}
          {Object.entries(diagram.nodes).map(([id, node]) => (
            <g key={id} data-state={stateOf(node.step)} className={partClass}>
              <DiagramPart node={node} />
            </g>
          ))}
        </svg>
      </figure>
      <div ref={stepsRef} className="mt-8 [counter-reset:diagram-step] md:mt-0">
        {children}
      </div>
    </div>
  );
}

/** MDX: one step of a <BuildDiagram>. Its number comes from its position. */
export function DiagramStep({ children }: { children: ReactNode }) {
  return (
    <div
      data-diagram-step
      className="diagram-step group-data-stepping/diagram:min-h-[45vh] group-data-stepping/diagram:last:min-h-0"
    >
      {children}
    </div>
  );
}

// Hidden parts fade out and sit 4 units low; they rise into place when their step arrives.
const partClass =
  "group transition-[opacity,translate] duration-500 ease-out data-[state=hidden]:translate-y-1 data-[state=hidden]:opacity-0";

function DiagramPart({ node }: { node: DiagramNode }) {
  if ("caption" in node) {
    return (
      <text
        x={node.x}
        y={node.y + 10}
        className="fill-muted text-[12px] transition-colors duration-500 ease-out group-data-[state=active]:fill-lilac"
      >
        {node.caption}
      </text>
    );
  }
  return (
    <>
      <rect
        x={node.x}
        y={node.y}
        width={node.w}
        height={boxHeight(node)}
        rx={6}
        vectorEffect="non-scaling-stroke"
        className="fill-plum-2 stroke-line transition-colors duration-500 ease-out group-data-[state=active]:stroke-lilac"
      />
      <text x={node.x + 10} y={node.y + 20} className="fill-ink font-mono text-[11px]">
        {node.label}
      </text>
      {node.detail && (
        <text x={node.x + 10} y={node.y + 35} className="fill-muted font-mono text-[10px]">
          {node.detail}
        </text>
      )}
    </>
  );
}

type Point = readonly [x: number, y: number];
type Bounds = { x: number; y: number; w: number; h: number };

function boundsOf(node: DiagramNode): Bounds {
  return "caption" in node
    ? { x: node.x, y: node.y, w: node.caption.length * 6.5, h: 14 }
    : { x: node.x, y: node.y, w: node.w, h: boxHeight(node) };
}

/** A straight line between the facing sides of two nodes that overlap on one axis. */
function straightEdge(fromNode: DiagramNode | undefined, toNode: DiagramNode | undefined): Point[] {
  if (!fromNode || !toNode) return [];
  const a = boundsOf(fromNode);
  const b = boundsOf(toNode);
  const overlapLeft = Math.max(a.x, b.x);
  const overlapRight = Math.min(a.x + a.w, b.x + b.w);

  if (overlapLeft < overlapRight) {
    const x = (overlapLeft + overlapRight) / 2;
    return a.y < b.y
      ? [
          [x, a.y + a.h],
          [x, b.y],
        ]
      : [
          [x, a.y],
          [x, b.y + b.h],
        ];
  }

  const y = (Math.max(a.y, b.y) + Math.min(a.y + a.h, b.y + b.h)) / 2;
  return a.x < b.x
    ? [
        [a.x + a.w, y],
        [b.x, y],
      ]
    : [
        [a.x, y],
        [b.x + b.w, y],
      ];
}

/** Beside the middle of the first segment: to the right of a vertical one, above a horizontal one. */
function labelPosition([start, end]: readonly Point[]) {
  if (!start || !end) return undefined;
  const vertical = start[0] === end[0];
  const midX = (start[0] + end[0]) / 2;
  const midY = (start[1] + end[1]) / 2;
  return vertical
    ? ({ x: midX + 6, y: midY + 3.5, textAnchor: "start" } as const)
    : ({ x: midX, y: midY - 5, textAnchor: "middle" } as const);
}
