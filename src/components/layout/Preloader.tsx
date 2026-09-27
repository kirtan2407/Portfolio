"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if already visited in this session
    if (sessionStorage.getItem("portfolio-visited")) {
      setIsLoading(false);
      return;
    }

    // Fake progress loading
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            sessionStorage.setItem("portfolio-visited", "true");
          }, 500); // Wait half a sec at 100%
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  const name = "Kirtan Kankotiya";
  const nameVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] bg-bg-base flex flex-col items-center justify-center pointer-events-auto"
        >
          <motion.div
            variants={nameVariants}
            initial="hidden"
            animate="visible"
            className="flex overflow-hidden text-3xl md:text-5xl font-display font-bold text-text-primary mb-8"
          >
            {name.split("").map((char, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className={char === " " ? "w-3 md:w-5" : "inline-block"}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>

          <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden relative">
            <motion.div
              className="absolute top-0 left-0 bottom-0 bg-accent-gradient"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: 0.2 }}
            />
          </div>
          
          <div className="mt-4 text-text-secondary font-mono text-sm font-medium">
            {Math.min(progress, 100)}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
