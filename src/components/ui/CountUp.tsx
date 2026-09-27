"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useSpring, useMotionValue } from "framer-motion";

interface CountUpProps {
  to: number;
  suffix?: string;
  className?: string;
}

export function CountUp({ to, suffix = "", className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  
  const count = useMotionValue(0);
  const rounded = useSpring(count, { duration: 2000, bounce: 0 });
  
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) {
      count.set(to);
    }
  }, [inView, count, to]);

  useEffect(() => {
    return rounded.on("change", (latest) => {
      setDisplay(Math.round(latest));
    });
  }, [rounded]);

  return (
    <span ref={ref} className={className}>
      {display}{suffix}
    </span>
  );
}
