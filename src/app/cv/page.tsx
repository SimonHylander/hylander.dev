import { career } from "@/content/career";
import { profile } from "@/content/profile";
import { formatPeriod } from "@/lib/format";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "CV",
  description: `Career history of ${profile.name}.`,
  path: "/cv",
});

// Full career history. It replaces a PDF: the print styles in globals.css drop the site chrome.
export default function CvPage() {
  return (
    <article className="pt-10 sm:pt-14 print:pt-0">
      <header className="space-y-2 border-b border-line pb-8 print:pb-5">
        <h1 className="text-hero font-bold tracking-[-0.02em] sm:text-hero-lg print:text-[20pt]">{profile.name}</h1>
        <p className="max-w-[60ch] text-balance">{profile.positioning}</p>
        <p className="text-sm text-muted">
          {profile.location} · <a href={`mailto:${profile.email}`} className="link">{profile.email}</a>
          {profile.socials.map(({ label, href }) => (
            <span key={label}>
              {" · "}
              <a href={href} className="link">
                {label}
              </a>
            </span>
          ))}
        </p>
      </header>

      <ol>
        {career.map((job) => (
          <li
            key={`${job.company}-${job.start}`}
            className="space-y-3 border-b border-line py-8 last:border-b-0 print:break-inside-avoid print:py-4"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h2 className="text-title font-semibold">
                {job.company}
                <span className="font-normal text-muted"> · {job.role}</span>
              </h2>
              <p className="font-mono text-meta text-muted tabular-nums">{formatPeriod(job)}</p>
            </div>
            {job.team && <p className="text-sm text-muted">{job.team}</p>}
            {job.summary && <p>{job.summary}</p>}
            {job.highlights.length > 0 && (
              <ul className="max-w-[65ch] list-disc space-y-1.5 pl-5 marker:text-muted print:space-y-1">
                {job.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            )}
            {job.stack.length > 0 && (
              <p className="font-mono text-meta text-muted">
                <span className="sr-only">Stack: </span>
                {job.stack.join(" · ")}
              </p>
            )}
          </li>
        ))}
      </ol>
    </article>
  );
}
