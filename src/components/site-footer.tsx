import { profile } from "@/content/profile";
import { CopyEmailButton } from "./copy-email";

/** Contact on every page: the prompt, the email with a copy button, then the location and socials. */
export function SiteFooter() {
  return (
    <footer id="contact" aria-labelledby="contact-heading" className="scroll-mt-16 border-t border-line pt-16 pb-10 sm:pt-24 print:hidden">
      <h2 id="contact-heading" className="max-w-[18ch] text-display font-semibold tracking-[-0.03em] text-balance">
        {profile.contactPrompt}
      </h2>
      <p className="mt-8 flex flex-wrap items-center gap-3">
        <a href={`mailto:${profile.email}`} className="link text-lg sm:text-xl">
          {profile.email}
        </a>
        <CopyEmailButton />
      </p>
      <div className="mt-16 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 text-sm text-muted sm:mt-20">
        <p>{profile.location}</p>
        <ul className="flex gap-5">
          {profile.socials.map(({ label, href }) => (
            <li key={label}>
              <a href={href} rel="me" className="transition-colors duration-200 ease-out hover:text-ink">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
