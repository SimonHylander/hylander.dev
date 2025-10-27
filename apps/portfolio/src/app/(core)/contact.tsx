"use client";

import { Button } from "@hylanderdev/ui/components/button";
import { ExternalLink, Github, Linkedin } from "lucide-react";

export default function Contact() {
  return (
    <>
      <section
        className={`relative z-0 mx-auto px-8 mt-16 md:mt-64 py-32 flex flex-col gap-8`}
      >
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Let's Get In Touch!
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Interested in collaboration or just want to say hi? Feel free to
              reach out through any of these channels.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                variant="outline"
                asChild
                className="flex bg-primary text-primary-foreground w-full py-4 shadow-md"
              >
                <a
                  href="https://www.linkedin.com/in/simonhylander"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="mr-2 h-5 w-5" />
                  LinkedIn
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>

              <Button
                variant="outline"
                size="lg"
                asChild
                className="flex w-full shadow-md py-4"
              >
                <a
                  href="https://github.com/SimonHylander"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-5 w-5" />
                  GitHub
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
