import About from "../_components/about/about";
import Experience from "../_components/experience/experience";
import Contact from "../_components/contact/contact";

import { languages } from "~/data/about";
import { experiences } from "~/data/experience";

export default async function Home() {
  return (
    <>
      <About languages={languages} />
      <Experience experiences={experiences} />
      <Contact />
    </>
  );
}
