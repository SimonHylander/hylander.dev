/// <reference types="vite/client" />
import familjenLatin from "@fontsource-variable/familjen-grotesk/files/familjen-grotesk-latin-wght-normal.woff2?url";
import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { Analytics } from "@vercel/analytics/react";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Toaster } from "@/components/toast";
import { profile } from "@/content/profile";
import { askSourceIds } from "@/lib/ask-sources";
import { getCommands } from "@/lib/commands";
import { env } from "@/lib/env";
import { pageHead } from "@/lib/metadata";
import css from "../globals.css?url";

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

/** "Ask about my work" runs only when ANTHROPIC_API_KEY is set. Null hides the section and its ⌘K command. */
const getAskSources = createServerFn().handler(() => (env.ANTHROPIC_API_KEY ? askSourceIds : null));

export const Route = createRootRoute({
  loader: () => getAskSources(),
  // The answer only changes with a deploy, so client navigations never refetch it.
  staleTime: Infinity,
  // Pages override these tags. The 404 page and pages without their own image keep the site's.
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0f0c1d" },
      { name: "color-scheme", content: "dark" },
      ...pageHead({
        description: profile.positioning,
        path: "/",
        image: { path: "/opengraph-image", alt: profile.name },
      }).meta,
    ],
    links: [
      { rel: "stylesheet", href: css },
      { rel: "preload", href: familjenLatin, as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "icon", href: "/logo.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon/favicon.ico", sizes: "any" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }],
  }),
  shellComponent: RootDocument,
  component: RootLayout,
});

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <noscript dangerouslySetInnerHTML={{ __html: noScriptStyles }} />
      </head>
      <body>
        {children}
        <Toaster />
        <Analytics />
        <Scripts />
      </body>
    </html>
  );
}

function RootLayout() {
  const askSources = Route.useLoaderData();

  return (
    // The home page uses the full width. Articles narrow themselves with the `reading` class.
    <div className="mx-auto flex min-h-dvh w-full max-w-[72.5rem] flex-col px-5 sm:px-8 lg:px-12">
      <SiteHeader commands={getCommands(askSources !== null)} />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
