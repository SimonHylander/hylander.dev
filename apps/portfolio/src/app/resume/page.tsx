import { SiteShell } from "~/components/site-shell";

import WorkExperience from "../(core)/expierience";

export default function ResumePage() {
  return (
    <SiteShell>
      <div className="flex flex-col gap-4 pb-16">
        <WorkExperience />
      </div>
    </SiteShell>
  );
}
