import type { Metadata } from "next";
import Link from "next/link";
import { ContactLinks } from "@/components/contact-links";
import { career, currentJob } from "@/content/career";
import { profile } from "@/content/profile";
import { work } from "@/content/work";
import { writing } from "@/content/writing";
import { formatDate, formatPartialDate, formatPeriod } from "@/lib/format";

export const metadata: Metadata = { alternates: { canonical: "/" } };

// Section order follows the content map in PRODUCT.md.
export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="space-y-2">
        <h1 className="text-3xl">{profile.name}</h1>
        <p>{profile.positioning}</p>
      </section>

      <section id="now" className="space-y-2">
        <h2>Now</h2>
        <p>
          {currentJob.role}, {currentJob.team}, at {currentJob.company} since{" "}
          {formatPartialDate(currentJob.start)}.
        </p>
        <p>{currentJob.summary}</p>
      </section>

      <section id="work" className="space-y-2">
        <h2>Selected work</h2>
        <ul className="space-y-4">
          {work.entries.map((entry) => (
            <li key={entry.slug}>
              <Link href={`/work/${entry.slug}`}>{entry.title}</Link>
              <p>{entry.summary}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="writing" className="space-y-2">
        <h2>Writing</h2>
        {writing.entries.length > 0 ? (
          <ul className="space-y-4">
            {writing.entries.map((entry) => (
              <li key={entry.slug}>
                <Link href={`/writing/${entry.slug}`}>{entry.title}</Link>{" "}
                <time dateTime={entry.date}>{formatDate(entry.date)}</time>
              </li>
            ))}
          </ul>
        ) : (
          <p>No posts yet.</p>
        )}
      </section>

      <section id="career" className="space-y-2">
        <h2>Career</h2>
        <ul>
          {career.map((job) => (
            <li key={`${job.company}-${job.start}`}>
              {job.role}, {job.company}, {formatPeriod(job)}
            </li>
          ))}
        </ul>
        <p>
          <Link href="/cv">Full CV</Link>
        </p>
      </section>

      <section id="contact" className="space-y-2">
        <h2>Contact</h2>
        <ContactLinks />
      </section>
    </div>
  );
}
