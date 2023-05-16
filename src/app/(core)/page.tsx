import About from "../_components/about/about";
import Project from "../_components/project/project";
import Contact from "../_components/contact/contact";

import { languages } from "~/data/about";
import { projects } from "~/data/project";
import ContactForm from "../_components/contact/contact-form";

export default async function Home() {
  return (
    <>
      <About languages={languages} />
      <Project projects={projects} />
      <Contact>
        <ContactForm />
      </Contact>
    </>
  );
}
