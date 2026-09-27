"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

interface RevealProps {
  children: React.ReactNode;
  className?: string;
}

export function Reveal({ children, className }: RevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Check for reduced motion
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(containerRef.current, { opacity: 1 });
        gsap.set(containerRef.current?.children as HTMLCollection, { opacity: 1, y: 0 });
        return;
      }

      const elements = containerRef.current?.children;
      if (!elements) return;

      gsap.from(elements, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
