import "./globals.css";

import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Familjen_Grotesk, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Toaster } from "@/components/toast";
import { profile } from "@/content/profile";

const sans = Familjen_Grotesk({ subsets: ["latin"], variable: "--font-familjen", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(profile.url),
  title: { default: profile.name, template: `%s | ${profile.name}` },
  description: profile.positioning,
  openGraph: {
    type: "website",
    siteName: profile.name,
    title: profile.name,
    description: profile.positioning,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon.ico", sizes: "any" },
    ],
  },
};

export const viewport: Viewport = { themeColor: "#0f0c1d", colorScheme: "dark" };

// The site's one canonical identity. Search engines link the socials to this Person.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: profile.url,
  email: `mailto:${profile.email}`,
  jobTitle: profile.currentJob.role,
  worksFor: { "@type": "Organization", name: profile.currentJob.company },
  address: { "@type": "PostalAddress", addressLocality: profile.location },
  sameAs: profile.socials.map(({ href }) => href),
};

// Without JavaScript: hide controls that need it.
const noScriptStyles = "<style>[data-requires-js]{display:none!important}</style>";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <head>
        <noscript dangerouslySetInnerHTML={{ __html: noScriptStyles }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
        {/* The home page uses the full width. Articles narrow themselves with the `reading` class. */}
        <div className="mx-auto flex min-h-dvh w-full max-w-[72.5rem] flex-col px-5 sm:px-8 lg:px-12">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
