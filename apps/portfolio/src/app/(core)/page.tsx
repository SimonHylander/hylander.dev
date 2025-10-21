import Navigation from "../../components/navigation/navigation";

import WorkExperience from "./expierience";
import About from "./about";
import Projects from "./projects";
import Skills from "./skills";
import Contact from "./contact";

export default function Home() {
  return (
    <>
      <div className="relative z-50 flex flex-col gap-4 w-full">
        <Navigation />
      </div>

      <div className="flex flex-col gap-4">
        <About />
        <WorkExperience />
        <Projects />
        <Skills />
        <Contact />
      </div>
    </>
  );
}
