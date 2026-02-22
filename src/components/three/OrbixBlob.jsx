import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

/**
 * OrbixBlob
 * - Soft floating blob using a simple sphere + distortion animation
 * - Lightweight & smooth
 */
export default function OrbixBlob() {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (!meshRef.current) return;

    // Slow floating movement
    meshRef.current.position.y = Math.sin(t * 0.6) * 0.35;
    meshRef.current.rotation.y = t * 0.15;
    meshRef.current.rotation.x = t * 0.08;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[1.7, 64, 64]} />
      <meshStandardMaterial
        color="#6366f1"
        roughness={0.35}
        metalness={0.25}
        emissive="#1e1b4b"
        emissiveIntensity={0.6}
      />
    </mesh>
  );
}
