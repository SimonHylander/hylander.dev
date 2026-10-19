import "./globals.css";

import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import Link from "next/link";
import { ContactLinks } from "@/components/contact-links";
import { profile } from "@/content/profile";

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

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/#work" },
  { label: "Writing", href: "/#writing" },
  { label: "CV", href: "/cv" },
] as const;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="mx-auto max-w-2xl space-y-12 px-4 py-8">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
        <header className="print:hidden">
          <nav aria-label="Main">
            <ul className="flex gap-4">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="border-t border-border pt-4 print:hidden">
          <ContactLinks />
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
