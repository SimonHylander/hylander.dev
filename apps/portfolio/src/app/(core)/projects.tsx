import Image from "next/image";
import Link from "next/link";

import { Card, CardContent } from "@hylanderdev/ui/components/card";
import { SectionHeader } from "~/components/ui/section-header";

export default function Projects() {
  return (
    <section className={`relative z-0 mx-auto flex flex-col gap-4 px-8 mt-64`}>
      <div className="flex flex-col gap-16">
        <SectionHeader title="Featured Projects" />

        <div className="grid grid-cols-3 gap-4">
          <Card className="relative p-0 h-full">
            <CardContent className="p-0 h-full">
              <div className="bg-secondary absolute -top-4 left-[10%] w-96 flex items-center justify-center  z-10">
                <div>
                  <h2 className="text-2xl font-bold text-primary">Uppgraderingspaket.se</h2>
                </div>
              </div>

              <Link href="/projects/i18n" className="hover:opacity-50 transition-all duration-200 w-full h-full object-cover block">
                <Image src="/projects/uppgraderingspaket.png" alt="Uppgraderingspaket.se" width={500} height={500} className="w-full h-full object-cover object-left" />
              </Link>
            </CardContent>
          </Card>

          <Card className="relative p-0 h-full">
            <CardContent className="p-0 h-full">
              <div className="bg-secondary absolute -top-4 left-[10%] w-96 flex items-center justify-center  z-10">
                <div>
                  <h2 className="text-2xl font-bold text-primary">I18N</h2>
                </div>
              </div>

              <Link href="/projects/i18n" className="hover:opacity-50 transition-all duration-200 w-full h-full object-cover block">
                <Image src="/projects/i18n.png" alt="I18N" width={500} height={500} className="w-full h-full object-cover object-left" />
              </Link>
            </CardContent>
          </Card>

          <Card className="relative p-0 h-full">
            <CardContent className="p-0 h-full">
              <div className="bg-secondary absolute -top-4 left-[10%] w-96 flex items-center justify-center z-10">
                <div>
                  <h2 className="text-2xl font-bold text-primary">Treddy.se</h2>
                </div>
              </div>

              <Link href="/projects/treddy" className="hover:opacity-50 transition-all duration-200 w-full h-full object-cover block">
                <Image src="/projects/treddy.png" alt="Treddy.se" width={500} height={500} className="w-full h-full object-cover object-left" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
