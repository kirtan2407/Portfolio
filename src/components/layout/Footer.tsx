"use client";

import React from "react";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="py-12 flex flex-col items-center justify-center border-t border-white/5 overflow-hidden">
      {/* Large wordmark */}
      <motion.div 
        className="text-[15vw] font-display font-bold leading-none text-transparent mb-8 cursor-default pointer-events-auto"
        style={{ WebkitTextStroke: "1px rgba(255,255,255,0.1)" }}
        whileHover={{
          WebkitTextStroke: "1px rgba(255,255,255,0.3)",
          scale: 1.02,
          textShadow: "0 0 40px rgba(124, 92, 255, 0.4)",
        } as any}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        KIRTAN
      </motion.div>
      
      <p className="text-sm text-text-muted">
        © {new Date().getFullYear()} Kirtan Kankotiya. All rights reserved.
      </p>
    </footer>
  );
}
