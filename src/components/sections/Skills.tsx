"use client";

import React from "react";
import { skillsData } from "@/lib/data";
import { SectionHeading } from "../ui/SectionHeading";
import { SkillMarquee } from "../ui/SkillMarquee";
import { Reveal } from "../ui/Reveal";

export function Skills() {
  // Split into two groups for two marquees moving in opposite directions
  const row1 = [...skillsData[0].items, ...skillsData[1].items];
  const row2 = [...skillsData[2].items, ...skillsData[3].items];

  return (
    <section id="skills" className="py-24 max-w-7xl mx-auto w-full overflow-hidden">
      <div className="px-6 md:px-16 mb-12">
        <SectionHeading title="Skills & Technologies" />
      </div>
      
      <Reveal className="flex flex-col gap-6 w-full">
        <SkillMarquee items={row1} direction="left" speed="normal" />
        <SkillMarquee items={row2} direction="right" speed="slow" />
      </Reveal>
    </section>
  );
}
