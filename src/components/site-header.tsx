import { Link } from "@tanstack/react-router";
import { profile } from "@/content/profile";
import type { Command } from "@/lib/commands";
import { CommandPalette } from "./command-palette";

const linkClass =
  "rounded-md px-2.5 py-1.5 text-sm font-medium text-muted transition-colors duration-200 ease-out hover:bg-plum-2 hover:text-ink";

/**
 * Sticky top bar: the "SH" logo links home, then Work, CV, Contact and the palette trigger.
 * Work and CV hide below `sm`, where the palette covers them.
 */
export function SiteHeader({ commands }: { commands: Command[] }) {
  return (
    <header className="sticky top-0 z-10 -mx-5 flex h-16 items-center justify-between bg-plum px-5 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12 print:hidden">
      <Link
        to="/"
        aria-label={`${profile.name}, home`}
        className="transition-[filter] duration-200 ease-out hover:brightness-110"
      >
        <img src="/logo.svg" alt="" width={32} height={32} fetchPriority="high" />
      </Link>
      <nav aria-label="Main" className="flex items-center gap-1">
        <Link to="/" hash="work" className={`${linkClass} max-sm:hidden`}>
          Work
        </Link>
        <Link to="/cv" className={`${linkClass} max-sm:hidden`}>
          CV
        </Link>
        {/* The contact footer is on every page, so the hash never needs a route change. */}
        <a href="#contact" className={linkClass}>
          Contact
        </a>
        <CommandPalette commands={commands} />
      </nav>
    </header>
  );
}
