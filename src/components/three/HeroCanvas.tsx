"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, Edges, Float } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

// The central 3D Model: Low-Poly Flat-Shaded Icosahedron
function MainModel() {
  const { theme } = useTheme();
  const isDark = theme === "dark" || !theme;
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    meshRef.current.rotation.y += 0.003;
    meshRef.current.rotation.x += 0.001;
    
    const targetX = (state.pointer.x * Math.PI) / 4;
    const targetY = (state.pointer.y * Math.PI) / 4;
    
    meshRef.current.rotation.z += 0.05 * (targetX - meshRef.current.rotation.z);
    meshRef.current.rotation.x += 0.05 * (targetY - meshRef.current.rotation.x);
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Icosahedron ref={meshRef} args={[1.5, 1]} position={[1.5, 0, 0]}>
        {/* Flat shading gives that classic low-poly aesthetic */}
        <meshStandardMaterial 
          color={isDark ? "#0a0a0a" : "#ffffff"} 
          flatShading={true} 
          roughness={0.2}
          metalness={0.8}
        />
        {/* Accent edges for a tech/hologram look */}
        <Edges color={isDark ? "#38bdf8" : "#171717"} threshold={15} />
      </Icosahedron>
    </Float>
  );
}

// The Background: Constellation / Node Network
function NodeNetwork() {
  const { theme } = useTheme();
  const isDark = theme === "dark" || !theme;
  const groupRef = useRef<THREE.Group>(null);

  const { points, lines } = useMemo(() => {
    const pts = [];
    const count = 150;
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 15;
      const y = (Math.random() - 0.5) * 15;
      const z = (Math.random() - 0.5) * 10 - 5;
      pts.push(new THREE.Vector3(x, y, z));
    }

    const lns = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        if (pts[i].distanceTo(pts[j]) < 2.5) {
          lns.push(pts[i], pts[j]);
        }
      }
    }
    
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(lns);
    const pointGeometry = new THREE.BufferGeometry().setFromPoints(pts);
    
    return { points: pointGeometry, lines: lineGeometry };
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.03;
    
    const targetX = (state.pointer.x * Math.PI) / 10;
    const targetY = (state.pointer.y * Math.PI) / 10;
    groupRef.current.position.x += 0.02 * (targetX - groupRef.current.position.x);
    groupRef.current.position.y += 0.02 * (targetY - groupRef.current.position.y);
  });

  return (
    <group ref={groupRef}>
      <points geometry={points}>
        <pointsMaterial 
          color={isDark ? "#71717a" : "#a3a3a3"} 
          size={0.06} 
          transparent 
          opacity={0.8} 
        />
      </points>
      <lineSegments geometry={lines}>
        <lineBasicMaterial 
          color={isDark ? "#3f3f46" : "#e5e5e5"} 
          transparent 
          opacity={0.4} 
        />
      </lineSegments>
    </group>
  );
}

function Scene() {
  const { theme } = useTheme();
  const isDark = theme === "dark" || !theme;
  return (
    <>
      <fog attach="fog" args={[isDark ? "#000000" : "#fafafa", 3, 15]} />
      <ambientLight intensity={isDark ? 0.3 : 0.8} />
      <directionalLight position={[10, 10, 5]} intensity={isDark ? 1 : 1.5} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color={isDark ? "#38bdf8" : "#0284c7"} />
      
      <NodeNetwork />
      <MainModel />
    </>
  );
}

export default function HeroCanvas() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
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
    return <div className="w-full h-full bg-bg-radial-glow transition-colors duration-500" />;
  }

  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 1.5]}>
        <Scene />
      </Canvas>
      <div className="absolute inset-0 bg-bg-radial-glow -z-10 transition-colors duration-500" />
    </div>
  );
}
