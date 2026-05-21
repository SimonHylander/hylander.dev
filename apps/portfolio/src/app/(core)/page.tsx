import { SiteShell } from "~/components/site-shell";

import HomeLanding from "./home-landing";

export default function Home() {
  return (
    <SiteShell chrome="none">
      <HomeLanding />
    </SiteShell>
  );
}
