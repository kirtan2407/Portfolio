"use client";

import React from "react";
import { heroData } from "@/lib/data";
import { motion } from "framer-motion";
import { MagneticLink } from "../ui/MagneticButton";
export function Hero() {
  const words = heroData.headline.split(" ");
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 40,
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-20 px-6 md:px-16 max-w-7xl mx-auto w-full pointer-events-none">
      
      <div className="relative z-10 max-w-3xl pointer-events-auto">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-accent-cyan font-medium tracking-wide text-sm md:text-base uppercase mb-4"
        >
          {heroData.eyebrow}
        </motion.p>
        
        <motion.h1 
          className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter text-text-primary leading-[1.1] mb-6 overflow-hidden flex flex-wrap gap-x-4"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {words.map((word, index) => (
            <motion.span variants={child} key={index} className="inline-block">
              {word}
            </motion.span>
          ))}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-text-secondary text-lg md:text-xl max-w-[65ch] leading-relaxed mb-10"
        >
          {heroData.subheadline}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-wrap items-center gap-6"
        >
          <MagneticLink
            href="#projects"
            className="px-8 py-4 rounded-full bg-accent-gradient text-white font-medium hover:scale-105 transition-transform"
          >
            View Work
          </MagneticLink>
          
          <MagneticLink
            href="#contact"
            className="px-8 py-4 rounded-full glass text-text-primary font-medium hover:bg-white/10 transition-colors"
          >
            Get in Touch
          </MagneticLink>
          
          <MagneticLink
            href="/resume-kirtan-kankotiya.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-text-primary transition-colors text-sm md:text-base font-medium flex items-center gap-2"
          >
            Download Résumé &rarr;
          </MagneticLink>
        </motion.div>
      </div>
    </section>
  );
}
