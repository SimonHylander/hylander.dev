import { ImageResponse } from "next/og";

export const ogImageSize = { width: 1200, height: 630 };

/** Plain text Open Graph image. Placeholder layout until the design direction lands. */
export function renderOgImage({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 24,
          padding: 80,
          background: "#110f1d",
          color: "#ffffff",
        }}
      >
        <div style={{ fontSize: 32, opacity: 0.7 }}>{eyebrow}</div>
        <div style={{ fontSize: 72, fontWeight: 700 }}>{title}</div>
        <div style={{ fontSize: 36, opacity: 0.85 }}>{description}</div>
      </div>
    ),
    ogImageSize,
  );
}
