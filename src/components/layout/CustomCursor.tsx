"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Motion values for the dot (instant)
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  // Motion values for the ring (spring)
  const ringX = useSpring(dotX, { stiffness: 300, damping: 30 });
  const ringY = useSpring(dotY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    // Check if the device has a fine pointer (mouse) and no reduced motion
    const pointerQuery = window.matchMedia("(pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!pointerQuery.matches || motionQuery.matches) return;
    setIsPointer(true);

    const updateMousePosition = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if the target or any of its parents is a link or button or magnetic element
      const isInteractive = target.closest(
        'a, button, [role="button"], input, select, textarea, .magnetic-target'
      );
      setIsHovering(!!isInteractive);
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", () => setIsHovering(false));

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", () => setIsHovering(false));
    };
  }, [dotX, dotY, isVisible]);

  if (!isPointer) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: "body { cursor: none; }" }} />
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/50 pointer-events-none z-[9999]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          mixBlendMode: isHovering ? "difference" : "normal",
          backgroundColor: isHovering ? "white" : "transparent",
        }}
        animate={{
          scale: isHovering ? 2.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          scale: { type: "spring", stiffness: 300, damping: 30 },
        }}
      />
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible && !isHovering ? 1 : 0,
        }}
      />
    </>
  );
}
