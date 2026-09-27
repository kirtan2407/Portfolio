"use client";

import React, { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MagneticLink } from "../ui/MagneticButton";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const { scrollY, scrollYProgress } = useScroll();
  const [activeSection, setActiveSection] = useState("");

  // Ramps up blur and background opacity as user scrolls past 60px
  const bgOpacity = useTransform(scrollY, [0, 60], [0, 0.04]);
  const blurValue = useTransform(scrollY, [0, 60], [0, 20]);
  const borderColor = useTransform(scrollY, [0, 60], ["rgba(255,255,255,0)", "rgba(255,255,255,0.09)"]);

  useEffect(() => {
    const handleScroll = () => {
      // Find the current active section
      const sections = navLinks.map(link => document.querySelector(link.href) as HTMLElement).filter(Boolean);
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      let current = "";
      for (const section of sections) {
        if (section.offsetTop <= scrollPosition) {
          current = section.id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex flex-col items-center pt-0 pointer-events-none">
      {/* Scroll Progress Bar */}
      <motion.div
        className="h-1 w-full bg-accent-gradient origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      
      <motion.nav 
        className="pointer-events-auto px-6 py-3 rounded-full flex items-center gap-8 shadow-ambient mt-6"
        style={{
          backgroundColor: useTransform(bgOpacity, v => `rgba(255, 255, 255, ${v})`),
          backdropFilter: useTransform(blurValue, v => `blur(${v}px) saturate(160%)`),
          border: useTransform(borderColor, v => `1px solid ${v}`),
        }}
      >
        <MagneticLink href="#" className="text-xl font-bold font-display tracking-tight text-text-primary">
          KK
        </MagneticLink>
        
        <ul className="hidden md:flex items-center gap-6 relative">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <li key={link.name} className="relative">
                <MagneticLink
                  href={link.href}
                  className={`text-sm font-medium transition-colors px-1 py-0.5 ${isActive ? "text-text-primary" : "text-text-secondary hover:text-text-primary"}`}
                >
                  {link.name}
                </MagneticLink>
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-accent-gradient rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </li>
            );
          })}
        </ul>
        
        <MagneticLink
          href="/resume-kirtan-kankotiya.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 text-sm font-medium text-text-primary px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          title="Download Résumé"
        >
          <Download className="w-4 h-4" />
          <span>Resume</span>
        </MagneticLink>
      </motion.nav>
    </header>
  );
}
