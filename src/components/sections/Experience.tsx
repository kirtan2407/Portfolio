"use client";

import React, { useRef } from "react";
import { experienceData } from "@/lib/data";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { motion, useScroll, useTransform } from "framer-motion";

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="py-24 px-6 md:px-16 max-w-7xl mx-auto w-full">
      <SectionHeading title="Experience" />
      
      <div ref={containerRef} className="relative ml-4 md:ml-0 flex flex-col gap-12 mt-12">
        {/* Animated Vertical Line */}
        <div className="absolute left-0 top-2 bottom-0 w-[1px] bg-white/10">
          <motion.div 
            className="absolute top-0 left-0 w-full bg-accent-gradient origin-top"
            style={{ height: lineHeight }}
          />
        </div>

        {experienceData.map((job, idx) => (
          <Reveal key={idx} className="relative pl-8">
            {/* Timeline dot */}
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
              className="absolute -left-[9.5px] top-1.5 w-5 h-5 rounded-full bg-bg-base border-2 border-accent-violet z-10" 
            />
            
            <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4 gap-2">
              <h3 className="text-2xl font-semibold text-text-primary">
                {job.title}
              </h3>
              <span className="text-accent-cyan font-medium whitespace-nowrap">
                {job.period}
              </span>
            </div>
            
            <p className="text-text-primary text-lg mb-4">{job.company}</p>
            
            <ul className="flex flex-col gap-2 list-disc list-outside ml-4 text-text-secondary">
              {job.points.map((point, pIdx) => (
                <li key={pIdx} className="pl-2">{point}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
