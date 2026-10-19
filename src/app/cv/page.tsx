import { career } from "@/content/career";
import { profile } from "@/content/profile";
import { formatPeriod } from "@/lib/format";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "CV",
  description: `Career history of ${profile.name}.`,
  path: "/cv",
});

// Full career history. Print-friendly: the layout hides nav and footer when printing.
export default function CvPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-1">
        <h1 className="text-3xl">{profile.name}</h1>
        <p>{profile.positioning}</p>
        <p>
          {profile.location} · <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </p>
      </header>

      {career.map((job) => (
        <section key={`${job.company}-${job.start}`} className="space-y-2 break-inside-avoid">
          <h2>
            {job.role}, {job.company}
          </h2>
          <p>
            {formatPeriod(job)}
            {job.team && ` · ${job.team}`}
          </p>
          {job.summary && <p>{job.summary}</p>}
          {job.highlights.length > 0 && (
            <ul className="list-disc space-y-1 pl-5">
              {job.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          )}
          {job.stack.length > 0 && <p>Stack: {job.stack.join(", ")}</p>}
        </section>
      ))}
    </article>
  );
}
