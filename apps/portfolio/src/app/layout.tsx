import "../styles/globals.css";

import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Simon Hylander - Senior Software Engineer",
  description:
    "Simon Hylander - Leading Client Side Engineering at Byggdagboken",
  icons: "/favicon/favicon.ico",
};

import React from "react";
import OpenGraph from "./_components/opengraph/open-graph";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <OpenGraph />

        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body className="bg-background text-foreground">
        <img
          src="https://hylander.dev/simonhylander.png"
          className="hidden"
          loading="lazy"
        />
        <div className="relative z-0 bg-[#110f1d]">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
