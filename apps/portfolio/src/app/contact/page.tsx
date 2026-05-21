import { SiteShell } from "~/components/site-shell";

import Contact from "../(core)/contact";

export default function ContactPage() {
  return (
    <SiteShell>
      <div className="flex flex-col gap-4 pb-16">
        <Contact />
      </div>
    </SiteShell>
  );
}
