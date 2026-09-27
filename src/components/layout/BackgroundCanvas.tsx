"use client";

import React from "react";
import dynamic from "next/dynamic";

const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), { ssr: false });

export function BackgroundCanvas() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      <HeroCanvas />
    </div>
  );
}
