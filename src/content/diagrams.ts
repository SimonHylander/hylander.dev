/*
 * Architecture diagrams for <BuildDiagram> in the case studies. Coordinates are SVG user units on a
 * 320-wide canvas, drawn at 1:1 on every screen. Every part names the step that adds it.
 * Box widths follow the label: about 6.6 units per character at 11px mono, plus 20 of padding.
 */

type Part = { step: number };

/** A bordered box. With `detail`, a second muted line makes it 46 high instead of 32. */
type DiagramBox = Part & { label: string; detail?: string; x: number; y: number; w: number };

/** A plain text label, used to name a group of boxes. `y` is the top of the text. */
type DiagramCaption = Part & { caption: string; x: number; y: number };

export type DiagramNode = DiagramBox | DiagramCaption;

/**
 * A hairline between two nodes. Without `points` it is drawn straight between the facing sides,
 * so the nodes must overlap horizontally or vertically. With `points` it follows them exactly.
 */
type DiagramEdge<Id extends string> = Part & {
  from: Id;
  to: Id;
  label?: string;
  points?: ReadonlyArray<readonly [x: number, y: number]>;
};

export type Diagram = {
  /** Accessible name of the whole diagram. The prose beside it carries the detail. */
  title: string;
  width: number;
  height: number;
  nodes: Record<string, DiagramNode>;
  edges: ReadonlyArray<DiagramEdge<string>>;
};

/** Checks that every edge points at a node that exists. */
function defineDiagram<const Id extends string>(diagram: {
  title: string;
  width: number;
  height: number;
  nodes: Record<Id, DiagramNode>;
  edges: ReadonlyArray<DiagramEdge<NoInfer<Id>>>;
}) {
  return diagram satisfies Diagram;
}

export const boxHeight = (node: DiagramBox) => (node.detail ? 46 : 32);

const left = { x: 0, w: 140 };
const right = { x: 175, w: 145 };

/** Byggdagboken: the monolith, route-level canaries, the BFF, then sign-in. */
export const byggdagbokenDiagram = defineDiagram({
  title: "Byggdagboken architecture, built up in four steps: legacy monolith, canary routing, backend-for-frontend, sign-in.",
  width: 320,
  height: 380,
  nodes: {
    browser: { step: 1, label: "Browser", ...left, y: 0 },
    cloudfront: { step: 1, label: "CloudFront", ...left, y: 64 },
    legacy: { step: 1, label: "Legacy monolith", detail: "PHP · Angular.js", ...left, y: 128 },
    edgeFunction: { step: 2, label: "CloudFront Function", ...right, y: 64 },
    nextjs: { step: 2, label: "Next.js web client", detail: "strangler fig", ...right, y: 128 },
    apps: { step: 3, label: "Native apps", ...left, y: 206 },
    bff: { step: 3, label: "Node.js BFF", ...right, y: 206 },
    services: { step: 3, label: "Microservices", ...right, y: 270 },
    auth: { step: 4, label: "OAuth2 / OpenID", detail: "Code flow + PKCE", ...left, y: 334 },
    redis: { step: 4, label: "Redis", detail: "short-lived tokens", ...right, y: 334 },
  },
  edges: [
    { step: 1, from: "browser", to: "cloudfront" },
    { step: 1, from: "cloudfront", to: "legacy" },
    { step: 2, from: "cloudfront", to: "edgeFunction" },
    { step: 2, from: "edgeFunction", to: "nextjs", label: "% per route" },
    { step: 3, from: "apps", to: "bff" },
    { step: 3, from: "bff", to: "services" },
    { step: 4, from: "apps", to: "auth" },
    { step: 4, from: "auth", to: "redis" },
  ],
});

/** A branch off the trunk at x 14, ending at a caption whose text starts at x 30. */
const branch = (captionY: number) => [[14, 46], [14, captionY + 7], [24, captionY + 7]] as const;

/** Treddy: the marketplace core, then identity, payments, shipping and the partner API. */
export const treddyDiagram = defineDiagram({
  title: "Treddy platform, built up in five steps: marketplace core, identity, payments, shipping, partner API.",
  width: 320,
  height: 356,
  nodes: {
    core: { step: 1, label: "Treddy core", detail: "fraud reduction", x: 0, y: 0, w: 140 },
    identity: { step: 2, caption: "Identity", x: 30, y: 72 },
    bankId: { step: 2, label: "BankID", x: 30, y: 92, w: 60 },
    ftn: { step: 2, label: "Finnish Trust Network", x: 98, y: 92, w: 160 },
    payments: { step: 3, caption: "Payments", x: 30, y: 148 },
    stripe: { step: 3, label: "Stripe", x: 30, y: 168, w: 60 },
    swish: { step: 3, label: "Swish", x: 98, y: 168, w: 54 },
    ping: { step: 3, label: "Ping Payments", x: 160, y: 168, w: 106 },
    shipping: { step: 4, caption: "Shipping", x: 30, y: 224 },
    nShift: { step: 4, label: "nShift", x: 30, y: 244, w: 60 },
    schenker: { step: 4, label: "Schenker", x: 98, y: 244, w: 74 },
    partnerApi: { step: 5, caption: "Partner API, 6 partner integrations", x: 30, y: 300 },
    oauth: { step: 5, label: "OAuth", x: 30, y: 320, w: 54 },
    rest: { step: 5, label: "REST", x: 92, y: 320, w: 47 },
    webhooks: { step: 5, label: "Webhook events", x: 147, y: 320, w: 112 },
  },
  edges: [
    { step: 2, from: "core", to: "identity", points: branch(72) },
    { step: 3, from: "core", to: "payments", points: branch(148) },
    { step: 4, from: "core", to: "shipping", points: branch(224) },
    { step: 5, from: "core", to: "partnerApi", points: branch(300) },
  ],
});
