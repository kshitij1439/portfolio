"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 150;

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function Sparks() {
  const pointsRef = useRef<THREE.Points>(null!);

  const { positions, speeds, phases, lifes, maxLife } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const speeds    = new Float32Array(COUNT);
    const phases    = new Float32Array(COUNT);
    const lifes     = new Float32Array(COUNT);
    const maxLife   = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = 0;

      speeds[i]  = 0.003 + Math.random() * 0.005;
      phases[i]  = Math.random() * Math.PI * 2;
      lifes[i]   = Math.random() * 200;
      maxLife[i] = 120 + Math.random() * 180;
    }
    return { positions, speeds, phases, lifes, maxLife };
  }, []);

  const colors = useMemo(() => {
    const c = new Float32Array(COUNT * 4);
    for (let i = 0; i < COUNT; i++) {
      c[i * 4] = 1.0; c[i * 4 + 1] = 0.8; c[i * 4 + 2] = 0.5; c[i * 4 + 3] = 1.0;
    }
    return c;
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const geo     = pointsRef.current.geometry;
    const posAttr = geo.attributes.position as THREE.BufferAttribute;
    const colAttr = geo.attributes.color    as THREE.BufferAttribute;
    const arr     = posAttr.array as Float32Array;
    const cols    = colAttr.array as Float32Array;
    const t       = clock.elapsedTime;

    for (let i = 0; i < COUNT; i++) {
      lifes[i]++;

      arr[i * 3 + 1] += speeds[i];
      arr[i * 3]     += Math.sin(t * 2 + phases[i]) * 0.0008;

      const p = lifes[i] / maxLife[i];

      // Only start fading in the last 15% of life  (was 40%)
      const alpha = p < 0.08
        ? p / 0.08                          // quick fade in
        : 1.0 - smoothstep(0.85, 1.0, p);  // hold bright, fade only at very end

      // Color: white-hot → orange → red, but stretch it over full life
      const r = 1.0;
      const g = p < 0.4 ? 0.9 - p * 1.2 : Math.max(0.0, 0.42 - (p - 0.4) * 0.6);
      const b = p < 0.2 ? 0.7 - p * 3.5  : 0.0;

      cols[i * 4]     = r * alpha;
      cols[i * 4 + 1] = g * alpha;
      cols[i * 4 + 2] = b * alpha;
      cols[i * 4 + 3] = alpha;

      if (lifes[i] >= maxLife[i]) {
        arr[i * 3]     = (Math.random() - 0.5) * 12;
        arr[i * 3 + 1] = -4.5;
        arr[i * 3 + 2] = 0;
        lifes[i]       = 0;
        maxLife[i]     = 120 + Math.random() * 180;
        speeds[i]      = 0.003 + Math.random() * 0.005;
      }
    }

    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 4]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        vertexColors
        transparent
        opacity={1}
        depthWrite={false}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ParticlesFire() {
  return (
    <Canvas
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 20,
      }}
      camera={{ position: [0, 0, 5], fov: 75 }}
      gl={{ alpha: true, premultipliedAlpha: false }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <Sparks />
    </Canvas>
  );
}