import Image from "next/image";
import Link from "next/link";

import { Card, CardContent } from "@hylanderdev/ui/components/card";
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
      className={`relative z-0 mx-auto flex flex-col gap-4 px-8 mt-16 md:mt-64`}
    >
      <div className="flex flex-col gap-16">
        <SectionHeader title="Featured Projects" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <Card key={i} className="relative p-0 h-full">
              <CardContent className="p-0 h-full">
                <div className="bg-secondary w-full flex items-center justify-center  z-10">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-primary">
                      {project.name}
                    </h2>
                  </div>
                </div>

                <Link
                  href={project.link}
                  className="hover:opacity-50 transition-all duration-200 w-full h-full object-cover block"
                >
                  <Image
                    src={project.image}
                    alt={project.name}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover object-left"
                  />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
