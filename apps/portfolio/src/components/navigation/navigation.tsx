"use client";

import Link from "next/link";

export default function LogoChrome() {
  return (
    <nav
      aria-label="Home"
      className="mx-auto mt-4 max-w-fit border border-secondary bg-white text-foreground shadow-[5px_5px_0_rgb(38_26_42),10px_10px_0_rgb(218_178_255)]"
    >
      <Link
        href="/"
        className="grid place-items-center bg-background p-4 transition-colors duration-200 ease-out hover:bg-secondary focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
      >
        <img
          src="/logo.svg"
          alt="Home"
          className="h-12 w-12 object-contain"
        />
      </Link>
    </nav>
  );
}
