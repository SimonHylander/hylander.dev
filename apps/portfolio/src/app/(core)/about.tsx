import { Card, CardContent } from "@hylanderdev/ui/components/card";
import { MapPinIcon } from "lucide-react";

import AboutBgImg from "../_components/about-bg-img";

export default function About() {
  return (
    <div className="relative flex h-screen flex-col text-foreground">
      <AboutBgImg />

      <section className={`relative z-0 mx-auto flex max-w-7xl flex-col gap-8 px-6 pt-10 sm:px-16 sm:pb-32`}>
        <span className="hash-span" id={"about"}>
          &nbsp;
        </span>

        <div className="relative z-10 flex gap-4">
          <div>
            <div className="flex flex-col gap-2">
              <h1 className="text-5xl font-bold">Simon Hylander</h1>

              <p className="text-lg">Senior Software Engineer / Lead Engineer</p>

              <p className="text-md leading-6">
                With <strong>11+ years</strong> as a fullstack dev I have a built up a diverse skillset across a large of number of different <strong>technologies</strong>.
                <br />
                Nowadays you will mostly find me in the <strong className="text-typescript">Typescript</strong> or <strong className="text-go">Golang</strong> ecosystems.
              </p>
            </div>

            <div>
              <p className="text-[17px] leading-6">
                I am currently leading client side engineering at{" "}
                <a href="https://byggdagboken.se/" target="_blank" rel="noreferrer" className="text-[#EAAA3D] hover:underline">
                  Byggdagboken
                </a>{" "}
                (<strong>web</strong> + <strong>app</strong>) and UX, where I'm driving technical direction. Obsessed with exceptional experiences and productive tooling.
              </p>
            </div>
          </div>

          <Card className="bg-background">
            <CardContent className="flex flex-col gap-4 px-4">
              <div className="flex gap-2">
                <MapPinIcon />
                <div>
                  <div>Location</div>
                  <div className="text-xs">Sweden</div>
                </div>
              </div>

              <div className="flex gap-2">
                <MapPinIcon />
                <div>
                  <div>Experience</div>
                  <div className="text-xs">11+ years</div>
                </div>
              </div>

              <div className="flex gap-2">
                <MapPinIcon />
                <div>
                  <div>Email</div>
                  <div className="text-xs">hylandersimon@gmail.com</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
