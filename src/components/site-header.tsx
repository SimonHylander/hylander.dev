import Link from "next/link";
import { profile } from "@/content/profile";
import { getCommands } from "@/lib/commands";
import { CommandPalette } from "./command-palette";

/** Top bar: the round "SH" mark links home, the palette trigger sits on the right. */
export function SiteHeader() {
  return (
    <header className="flex items-center justify-between py-6 print:hidden">
      <Link
        href="/"
        aria-label={`${profile.name}, home`}
        className="grid size-8 place-items-center rounded-full bg-lilac text-[0.6875rem] font-bold tracking-[0.02em] text-plum transition-transform duration-300 ease-out hover:scale-105"
      >
        SH
      </Link>
      <CommandPalette commands={getCommands()} />
    </header>
  );
}
