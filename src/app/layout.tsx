import "./globals.css";

export const metadata = {
  title: "Simon Hylander - Fullstack Developer",
  description: "Simon Hylander - Fullstack Developer at skoglit.se",
  icons: "/favicon.svg",
};

import React from "react";
import OpenGraph from "./_components/opengraph/open-graph";
import Script from "next/script";

import { env } from "~/env.mjs";

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

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WBTPR74ZS2"
          strategy="afterInteractive"
        />

        <Script
          id="google-analytics"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${env.NEXT_PUBLIC_GA_TAG_ID}');
        `,
          }}
        />
      </head>
      <body>
        <img src="https://hylander.dev/simonhylander.png" className="hidden" />
        <div className="relative z-0 bg-[#110f1d]">{children}</div>
      </body>
    </html>
  );
}
