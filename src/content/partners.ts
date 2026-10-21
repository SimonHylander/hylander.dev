/** A system behind the Treddy partner API. `role` is what it does for the platform. */
type Partner = { label: string; role: string };

/**
 * Systems behind the Treddy partner API, clockwise from the top of the graph. Source: the Treddy rows
 * of the proof inventory in PRODUCT.md.
 */
// TODO(simon): seven systems are named, but the claim is 6 partner integrations. Name the six.
export const treddyPartners = [
  { label: "BankID", role: "Swedish e-ID." },
  { label: "FTN", role: "Finnish e-ID through the Finnish Trust Network." },
  { label: "Stripe", role: "Card payments." },
  { label: "Swish", role: "Swedish mobile payments." },
  { label: "Ping Payments", role: "Marketplace payments." },
  { label: "nShift", role: "Shipping." },
  { label: "Schenker", role: "Freight." },
] as const satisfies readonly Partner[];
