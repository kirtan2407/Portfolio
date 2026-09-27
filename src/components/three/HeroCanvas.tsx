"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

function ParticleField(props: any) {
  const ref = useRef<any>();
  // generate a sphere of points
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }) as Float32Array);

  useFrame((state, delta) => {
    if (!ref.current) return;
    // slow idle rotation
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
    
    // subtle parallax toward cursor
    const targetX = (state.pointer.x * Math.PI) / 10;
    const targetY = (state.pointer.y * Math.PI) / 10;
    
    ref.current.rotation.x += 0.05 * (targetY - ref.current.rotation.x);
    ref.current.rotation.y += 0.05 * (targetX - ref.current.rotation.y);
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#7c5cff"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function HeroCanvas() {
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    // Detect mobile or low end to disable WebGL
    const checkMobile = () => {
      const isCoarse = window.matchMedia("(pointer: coarse)").matches;
      const isLowMemory = (navigator as any).deviceMemory && (navigator as any).deviceMemory < 4;
      setIsMobile(isCoarse || isLowMemory);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="absolute inset-0 z-0 bg-bg-radial-glow opacity-60" />
    );
  }

  return (
    <div className="absolute inset-0 z-0 opacity-40">
      <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 1.5]}>
        <ParticleField />
      </Canvas>
      {/* Fallback ambient gradient behind canvas */}
      <div className="absolute inset-0 bg-bg-radial-glow -z-10" />
    </div>
  );
}
