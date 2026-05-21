import Image from "next/image";
import Link from "next/link";

import { SectionHeader } from "~/components/ui/section-header";

const projects = [
  {
    name: "Uppgraderingspaket.se",
    image: "/projects/uppgraderingspaket.png",
    link: "/projects/uppgraderingspaket",
  },
  {
    name: "I18N",
    image: "/projects/i18n.png",
    link: "/projects/i18n",
  },
  {
    name: "Treddy.se",
    image: "/projects/treddy.png",
    link: "/projects/treddy",
  },
];

export default function Projects() {
  return (
    <section
      className={`relative z-0 mx-auto mt-16 flex flex-col gap-4 px-8 md:mt-64`}
    >
      <div className="flex flex-col gap-12 md:gap-16">
        <SectionHeader title="Featured Projects" />

        <ul className="flex list-none flex-col gap-0 border border-secondary">
          {projects.map((project, index) => (
            <li
              key={project.name}
              className={
                index > 0 ? "border-t border-secondary" : undefined
              }
            >
              <Link
                href={project.link}
                className="group grid grid-cols-1 transition-opacity duration-200 ease-out hover:opacity-90 md:grid-cols-[minmax(12rem,1fr)_1.4fr]"
              >
                <div className="flex items-end bg-secondary px-6 py-8 md:px-10 md:py-12">
                  <h3 className="text-xl font-bold text-primary md:text-2xl">
                    {project.name}
                  </h3>
                </div>
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-background">
                  <Image
                    src={project.image}
                    alt={project.name}
                    width={500}
                    height={500}
                    className="h-full w-full object-cover object-left"
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
