import { SiteShell } from "~/components/site-shell";

import Projects from "../(core)/projects";

export default function ProjectsPage() {
  return (
    <SiteShell>
      <div className="flex flex-col gap-4 pb-16">
        <Projects />
      </div>
    </SiteShell>
  );
}
