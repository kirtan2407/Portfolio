"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { CountUp } from "./CountUp";
import { ShoppingBag, Building, LineChart } from "lucide-react";

const iconMap = {
  "shopping-bag": ShoppingBag,
  "building": Building,
  "chart": LineChart,
};

interface ProjectCardProps {
  project: any;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const Icon = iconMap[project.icon as keyof typeof iconMap] || Building;

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Helper to render stats with counters if applicable
  const renderStat = (statText: string) => {
    if (!statText) return null;
    
    // Check if it matches our specific stat string to inject counters
    if (statText === "40+ modules · 600+ residents · 7-member team") {
      return (
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-violet/10 border border-accent-violet/20 text-accent-cyan font-medium text-sm md:text-base">
          <CountUp to={40} suffix="+" /> modules · <CountUp to={600} suffix="+" /> residents · <CountUp to={7} suffix="-member" /> team
        </div>
      );
    }
    
    return (
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-violet/10 border border-accent-violet/20 text-accent-cyan font-medium text-sm md:text-base">
        {statText}
      </div>
    );
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="glass p-8 flex flex-col md:flex-row gap-8 items-start group relative"
    >
      {/* Glow effect following cursor - optional polish */}
      
      <div 
        className="w-16 h-16 shrink-0 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-accent-violet/50 transition-colors relative z-10"
        style={{ transform: "translateZ(30px)" }}
      >
        <Icon className="w-8 h-8 text-accent-cyan" />
      </div>
      
      <div className="flex-1 relative z-10" style={{ transform: "translateZ(20px)" }}>
        <h3 className="text-2xl font-semibold text-text-primary mb-3">
          {project.title}
        </h3>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag: string, tIdx: number) => (
            <span key={tIdx} className="px-3 py-1 rounded-full bg-white/5 text-sm text-text-secondary border border-white/5">
              {tag}
            </span>
          ))}
        </div>
        
        <p className="text-text-secondary text-lg leading-relaxed mb-6">
          {project.description}
        </p>
        
        {renderStat(project.stat)}
      </div>
    </motion.div>
  );
}
