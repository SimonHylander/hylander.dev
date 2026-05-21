import { SiteShell } from "~/components/site-shell";

import Skills from "../(core)/skills";

export default function SkillsPage() {
  return (
    <SiteShell>
      <div className="flex flex-col gap-4 pb-16">
        <Skills />
      </div>
    </SiteShell>
  );
}
