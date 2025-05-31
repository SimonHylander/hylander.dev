import About from "../_components/about/about";

import { languages } from "~/data/about";
import { jobs } from "~/data/experience";
import JobSlider from "../_components/experience/expierience";

export default async function Home() {
  return (
    <>
      <About languages={languages} />

      <JobSlider jobs={jobs} />

      <section
        className={`relative z-0 mx-auto max-w-7xl px-6 py-10 sm:px-16 sm:py-16 sm:pt-0`}
      >
      </section>
    </>
  );
}
