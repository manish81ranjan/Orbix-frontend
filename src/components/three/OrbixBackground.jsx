import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import OrbixParticles from "./OrbixParticles";
import OrbixBlob from "./OrbixBlob";

/**
 * OrbixBackground
 * - Three.js animated background
 * - Used ONLY on auth pages
 * - Performance-safe (no heavy lights or shadows)
 */
export default function OrbixBackground() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      dpr={[1, 1.5]}
    >
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />

      {/* Disable user interaction */}
      <OrbitControls enableZoom={false} enablePan={false} />

      <Suspense fallback={null}>
        {/* Soft floating blob */}
        <OrbixBlob />

        {/* Background particles */}
        <OrbixParticles />
      </Suspense>
    </Canvas>
  );
}
