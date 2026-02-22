import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * OrbixParticles
 * - Lightweight particle field
 * - Smooth rotation animation
 */
export default function OrbixParticles({ count = 800 }) {
  const pointsRef = useRef();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      arr[i3] = (Math.random() - 0.5) * 18;
      arr[i3 + 1] = (Math.random() - 0.5) * 10;
      arr[i3 + 2] = (Math.random() - 0.5) * 18;
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.03;
    pointsRef.current.rotation.x = t * 0.01;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.035}
        color={new THREE.Color("#a5b4fc")}
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </points>
  );
}
