"use client";

import { motion } from "framer-motion";

import { styles } from "~/styles";

import { staggerContainer, textVariant } from "~/utils/motion";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "~/styles/timeline.css";

import { Project } from "~/data/project";

import { ChevronRight } from "lucide-react";
import { useState } from "react";

const Projects = ({ projects }: { projects: Project[] }) => {
  const [end, setEnd] = useState(5);

  return (
    <motion.section
      variants={staggerContainer()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className={`${styles.padding} relative z-0 mx-auto max-w-7xl`}
    >
      <span className="hash-span" id={"projects"}>
        &nbsp;
      </span>

      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          What have I worked on?
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>Projects</h2>
      </motion.div>

      <div className="mt-10 flex flex-col">
        <VerticalTimeline>
          {projects.slice(0, end).map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </VerticalTimeline>
      </div>

      {end < projects.length && (
        <div className="my-4 flex justify-center text-red-200">
          <button
            type="button"
            title="Load more"
            className="my-4 flex items-center justify-center gap-1 text-red-200"
            onClick={() => setEnd(end + 5)}
          >
            More
            <ChevronRight color="#f7d0d3" size={14} />
          </button>
        </div>
      )}
    </motion.section>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#2f2035",
        backgroundImage: "linear-gradient(to right, #2f2035, #37253d)",
        color: "#f7d0d3",
      }}
      contentArrowStyle={{ borderRight: "7px solid  #37253d" }}
      date={project.isPresent ? "Present" : ""}
      iconStyle={{ background: project.iconBg }}
      icon={
        <div className="flex h-full w-full items-center justify-center">
          {project.date}
        </div>
      }
    >
      <div className="mb-4">
        <h3 className="text-[18px] font-bold text-red-200">{project.title}</h3>
        <p className="text-secondary font-semibold" style={{ margin: 0 }}>
          {project.technologies}
        </p>
      </div>

      <ul className="list-disc space-y-1 px-4">
        {project.points.map((point, index) => (
          <li
            key={index}
            className="text-red-100-100 pl-1 text-[12px] tracking-wider"
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

export default Projects;
