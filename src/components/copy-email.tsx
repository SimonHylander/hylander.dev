"use client";

import { profile } from "@/content/profile";
import { toast } from "./toast";

/** Copies the email address and confirms with a toast. Shared by the footer button and the ⌘K palette. */
export async function copyEmail() {
  try {
    await navigator.clipboard.writeText(profile.email);
    toast("Email copied");
  } catch {
    toast(`Copy failed. The address is ${profile.email}`);
  }
}

/** Small "Copy" button next to the mailto link. Hidden without JavaScript, where it could not work. */
export function CopyEmailButton() {
  return (
    <button
      type="button"
      onClick={copyEmail}
      data-requires-js
      aria-label="Copy email address"
      className="rounded-sm border border-line px-1.5 font-mono text-meta leading-5 text-muted transition-colors duration-200 ease-out hover:border-lilac hover:text-lilac"
    >
      Copy
    </button>
  );
}
