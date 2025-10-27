"use client";

import Link from "next/link";

const LeftNavigation = () => {
  return (
    <nav
      className={`max-w-[280px] mt-4 text-foreground border border-secondary grid grid-cols-[auto_1fr] bg-white mx-auto shadow-[5px_5px_0_rgb(38_26_42),10px_10px_0_rgb(218_178_255)]`}
    >
      <div className="grid justify-center items-center bg-background">
        <Link href="/" className="relative p-4">
          <img
            src="/logo.svg"
            alt="logo"
            className="h-12 w-12 object-contain"
          />
        </Link>
      </div>

      <ul className="flex flex-wrap gap-[2px] list-none border border-left-2 border-secondary bg-secondary">
        <NavigationItem href="/" title="Resume">
          <span className="text-xl">Resume</span>
        </NavigationItem>

        <NavigationItem href="/" title="Projects">
          <span className="text-xl">Projects</span>
        </NavigationItem>

        <NavigationItem href="/" title="BragDoc">
          <span className="text-xl">Brag Doc</span>
        </NavigationItem>

        <NavigationItem href="/" title="Tech stack">
          <span className="text-xl">Tech Stack</span>
        </NavigationItem>

        <NavigationItem href="/" title="Contact">
          <span className="text-xl">Contact Me</span>
        </NavigationItem>

        <NavigationItem href="/" title="Contact">
          <i className="devicon-github-original text-2xl px-4"></i>
        </NavigationItem>

        <NavigationItem href="/" title="Contact">
          <i className="devicon-linkedin-plain text-2xl px-4"></i>
        </NavigationItem>
      </ul>
    </nav>
  );
};

export default LeftNavigation;

function NavigationItem({
  href,
  title,
  children,
}: {
  href: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="grid grid-cols-[1fr] items-center content-center gap-2 flex-1 flex-grow bg-background hover:bg-secondary hover:text-primary">
      <Link href={href} title={title} className="p-4 flex flex-col">
        {children}
      </Link>
    </li>
  );
}
