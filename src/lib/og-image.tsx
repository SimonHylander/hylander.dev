import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const ogImageSize = { width: 1200, height: 630 };

// Satori does not parse OKLCH. These are the sRGB values of the tokens in globals.css.
const colors = { plum: "#0f0c1d", ink: "#ede2fb", muted: "#a99fba", lilac: "#d9b5fe", line: "#3b324f" };

/** Fetches a Familjen Grotesk subset with only the glyphs in `text`, as TrueType for Satori. */
async function loadFont(weight: 500 | 700, text: string) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=Familjen+Grotesk:wght@${weight}&text=${encodeURIComponent(text)}`,
  ).then((response) => response.text());
  const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
  if (!url) throw new Error(`No TrueType source for Familjen Grotesk ${weight}`);
  return fetch(url).then((response) => response.arrayBuffer());
}

/** Open Graph image in the site palette: the SH mark, a muted eyebrow, the title and a description. */
export async function renderOgImage({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  const host = new URL(profile.url).host;
  const text = `SH${eyebrow}${title}${description}${host}`;
  const [medium, bold] = await Promise.all([loadFont(500, text), loadFont(700, text)]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: colors.plum,
          color: colors.ink,
          fontFamily: "Familjen Grotesk",
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: colors.lilac,
            color: colors.plum,
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          SH
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 28, fontWeight: 500, color: colors.muted }}>{eyebrow}</div>
          <div style={{ fontSize: 64, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1 }}>{title}</div>
          <div style={{ fontSize: 30, fontWeight: 500, color: colors.muted, lineHeight: 1.4 }}>{description}</div>
        </div>
        <div style={{ display: "flex", borderTop: `1px solid ${colors.line}`, paddingTop: 24, fontSize: 24, color: colors.muted }}>
          {host}
        </div>
      </div>
    ),
    {
      ...ogImageSize,
      fonts: [
        { name: "Familjen Grotesk", data: medium, weight: 500, style: "normal" },
        { name: "Familjen Grotesk", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}
