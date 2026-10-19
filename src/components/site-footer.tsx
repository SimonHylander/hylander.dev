import { profile } from "@/content/profile";
import { CopyEmailButton } from "./copy-email";

/** Contact: the email with a copy button, then the socials. */
export function SiteFooter() {
  return (
    <footer className="mt-24 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-line py-8 text-sm print:hidden">
      <p className="flex items-center gap-2.5">
        <a href={`mailto:${profile.email}`} className="link">
          {profile.email}
        </a>
        <CopyEmailButton />
      </p>
      <ul className="flex gap-5">
        {profile.socials.map(({ label, href }) => (
          <li key={label}>
            <a href={href} rel="me" className="text-muted transition-colors duration-200 ease-out hover:text-ink">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
