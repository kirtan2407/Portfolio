import React from "react";
import { educationData, certificationsData } from "@/lib/data";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";

export function Education() {
  return (
    <section id="education" className="py-24 px-6 md:px-16 max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <SectionHeading title="Education" />
          <div className="flex flex-col gap-8">
            {educationData.map((edu, idx) => (
              <Reveal key={idx} className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold text-text-primary">
                  {edu.degree}
                </h3>
                <p className="text-text-primary">{edu.institution}</p>
                <div className="flex justify-between items-center text-sm text-text-secondary">
                  <span>{edu.period}</span>
                  {edu.details && <span className="text-accent-cyan">{edu.details}</span>}
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div>
          <SectionHeading title="Certifications" />
          <div className="flex flex-col gap-8">
            {certificationsData.map((cert, idx) => (
              <Reveal key={idx} className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold text-text-primary">
                  {cert.title}
                </h3>
                <p className="text-accent-cyan font-medium">{cert.issuer}</p>
                <p className="text-text-secondary mt-2">
                  {cert.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
