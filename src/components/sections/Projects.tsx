import React from "react";
import { projectsData } from "@/lib/data";
import { SectionHeading } from "../ui/SectionHeading";
import { ProjectCard } from "../ui/ProjectCard";
import { Reveal } from "../ui/Reveal";

export function Projects() {
  return (
    <section id="projects" className="py-24 px-6 md:px-16 max-w-7xl mx-auto w-full" style={{ perspective: "1000px" }}>
      <SectionHeading title="Selected Projects" />
      
      <div className="flex flex-col gap-8">
        {projectsData.map((project, idx) => (
          <Reveal key={idx} className="w-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
