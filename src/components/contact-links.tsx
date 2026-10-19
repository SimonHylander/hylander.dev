import { profile } from "@/content/profile";

/** Email and social links. Used by the home page contact section and the footer. */
export function ContactLinks() {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1">
      <li>
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
      </li>
      {profile.socials.map(({ label, href }) => (
        <li key={label}>
          <a href={href} rel="me">
            {label}
          </a>
        </li>
      ))}
    </ul>
  );
}
