import React from "react";
import { aboutData } from "@/lib/data";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";

export function About() {
  return (
    <section id="about" className="py-24 px-6 md:px-16 max-w-7xl mx-auto w-full">
      <SectionHeading title="About" />
      <Reveal className="glass p-8 md:p-12 w-full">
        <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-[65ch]">
          {aboutData.text}
        </p>
      </Reveal>
    </section>
  );
}
