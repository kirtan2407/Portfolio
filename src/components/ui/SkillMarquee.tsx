"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SkillMarqueeProps {
  items: { name: string; icon: any }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
}

export function SkillMarquee({ items, direction = "left", speed = "normal" }: SkillMarqueeProps) {
  const duration = speed === "fast" ? "20s" : speed === "slow" ? "40s" : "30s";
  
  return (
    <div className="flex overflow-hidden w-full group mask-image-fade">
      <div 
        className={cn(
          "flex w-max min-w-full items-center gap-8 py-4",
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        )}
        style={{ animationDuration: duration }}
      >
        {/* Double the items to make the infinite scroll seamless */}
        {[...items, ...items].map((skill, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.1 }}
            className="flex items-center gap-3 px-6 py-3 glass whitespace-nowrap shrink-0 group-hover:[animation-play-state:paused]"
          >
            {skill.icon && <skill.icon className="w-6 h-6 text-accent-cyan" />}
            <span className="text-text-primary font-medium">{skill.name}</span>
          </motion.div>
        ))}
      </div>
      
      {/* We need custom Tailwind keyframes for the marquee, we'll add them to globals.css */}
    </div>
  );
}
