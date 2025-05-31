import { Analytics } from "@vercel/analytics/react";

import "../styles/globals.css";

export const metadata = {
  title: "Simon Hylander - Senior Software Engineer",
  description: "Simon Hylander - Senior Software Engineer at byggdagboken",
  icons: "/favicon/favicon.svg",
};

import React from "react";
import OpenGraph from "./_components/opengraph/open-graph";
import Script from "next/script";

import { env } from "~/env.js";

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
      <body>
        <img src="https://hylander.dev/simonhylander.png" className="hidden" />
        <div className="relative z-0 bg-[#110f1d]">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
