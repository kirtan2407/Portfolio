import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({ title, subtitle, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 md:mb-16", className)}>
      <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-text-primary mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-text-secondary text-lg max-w-[65ch]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
