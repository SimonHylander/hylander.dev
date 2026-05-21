import Link from "next/link";

const currentFocus = [
  {
    label: "Growth Team",
    org: "Proposales",
    href: "https://proposales.com/",
    accent: "text-secondary hover:underline",
  },
  {
    label: "Led client-side engineering",
    org: "Byggdagboken",
    href: "https://byggdagboken.se/",
    accent: "text-[#EAAA3D] hover:underline",
  },
  {
    label: "Architected and built",
    org: "Treddy",
    href: "https://www.linkedin.com/company/treddyse/posts/?feedView=all",
    accent: "text-teal-400 hover:underline",
  },
] as const;

const socialLinks = [
  {
    href: "https://github.com/SimonHylander",
    title: "GitHub",
    iconClass: "devicon-github-original",
  },
  {
    href: "https://www.linkedin.com/in/simonhylander",
    title: "LinkedIn",
    iconClass: "devicon-linkedin-plain",
  },
] as const;

export default function HomeLanding() {
  return (
    <main className="mx-auto max-w-7xl px-6 pb-24 pt-6 sm:px-16 md:pt-12">
      <header className="max-w-[42rem] border-b border-secondary/40 pb-10 sm:pb-12">
        <div className="flex gap-5 sm:gap-6">
          <Link href="/" aria-label="Home" className="shrink-0">
            <img
              src="/logo.svg"
              alt=""
              className="h-12 w-12 object-contain"
            />
          </Link>
          <div className="min-w-0 flex-1">
            <p className="font-mono text-sm tracking-wide text-secondary/80">
              Stockholm · senior software engineer
            </p>
            <h1 className="mt-3 text-[clamp(2.5rem,5vw,3.5rem)] font-bold leading-[1.1] text-secondary">
              Simon Hylander
            </h1>
            <p className="mt-5 max-w-[65ch] text-[1.0625rem] leading-relaxed text-foreground">
              I build things.
            </p>
            <nav
              aria-label="Social profiles"
              className="mt-6 flex gap-1 sm:mt-7"
            >
              <ul className="flex list-none gap-1">
                {socialLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      title={link.title}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grid min-h-11 min-w-11 place-items-center rounded-md text-secondary transition-colors duration-200 ease-out hover:bg-secondary/15 hover:text-secondary focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                    >
                      <i
                        className={`${link.iconClass} text-2xl`}
                        aria-hidden
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <section
        aria-labelledby="now-heading"
        className="mt-10 max-w-[42rem] sm:mt-14"
      >
        <h2
          id="now-heading"
          className="font-mono text-sm font-medium tracking-wide text-secondary/90"
        >
          Now
        </h2>
        <ul className="mt-4 flex flex-col gap-4 divide-y divide-secondary/25 border-t border-secondary/25 pt-4">
          {currentFocus.map((item) => (
            <li
              key={item.org}
              className="text-[1.0625rem] leading-snug first:pt-0 [&:not(:first-child)]:pt-4"
            >
              <span className="text-foreground/90">{item.label} </span>
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className={`font-semibold ${item.accent}`}
              >
                @{item.org}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
