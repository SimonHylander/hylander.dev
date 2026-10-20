import Link from "next/link";
import { profile } from "@/content/profile";
import { getCommands } from "@/lib/commands";
import { CommandPalette } from "./command-palette";

const linkClass =
  "rounded-md px-2.5 py-1.5 text-sm font-medium text-muted transition-colors duration-200 ease-out hover:bg-plum-2 hover:text-ink";

/**
 * Sticky top bar: the round "SH" mark links home, then Work, CV, Contact and the palette trigger.
 * Work and CV hide below `sm`, where the palette covers them.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 -mx-5 flex h-16 items-center justify-between bg-plum/90 px-5 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12 print:hidden">
      <Link
        href="/"
        aria-label={`${profile.name}, home`}
        className="grid size-8 place-items-center rounded-full bg-lilac text-[0.6875rem] font-bold tracking-[0.02em] text-plum transition-transform duration-300 ease-out hover:scale-105"
      >
        SH
      </Link>
      <nav aria-label="Main" className="flex items-center gap-1">
        <Link href="/#work" className={`${linkClass} max-sm:hidden`}>
          Work
        </Link>
        <Link href="/cv" className={`${linkClass} max-sm:hidden`}>
          CV
        </Link>
        {/* The contact footer is on every page, so the hash never needs a route change. */}
        <a href="#contact" className={linkClass}>
          Contact
        </a>
        <CommandPalette commands={getCommands()} />
      </nav>
    </header>
  );
}
