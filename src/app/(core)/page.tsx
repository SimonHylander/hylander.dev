import About from "../_components/about/about";
import Experience from "../_components/experience/experience";
import Contact from "../_components/contact/contact";

import { languages } from "~/data/about";
import { experiences } from "~/data/experience";
import ContactForm from "../_components/contact/contact-form";

export default async function Home() {
  return (
    <>
      <About languages={languages} />
      <Experience experiences={experiences} />
      <Contact>
        <ContactForm />
      </Contact>
    </>
  );
}
