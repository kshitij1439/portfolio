"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function EmberParticles() {
    const points = useRef<THREE.Points>(null!);

    const [positions] = useState<Float32Array>(() => {
        const count = 120;
        const arr = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            arr[i * 3]     = (Math.random() - 0.5) * 6;   // x
            arr[i * 3 + 1] = Math.random() * -2.5;        // y
            arr[i * 3 + 2] = (Math.random() - 0.5) * 3;   // z
        }
        return arr;
    });

    useFrame(() => {
        if (!points.current) return;

        const pos = points.current.geometry.attributes.position as THREE.BufferAttribute;
        const arr = pos.array as Float32Array;

        for (let i = 0; i < arr.length; i += 3) {
            arr[i + 1] += 0.008 + Math.random() * 0.01;

            if (arr[i + 1] > 2.4) {
                arr[i + 1] = -2.5 - Math.random() * 0.6;
            }
        }

        pos.needsUpdate = true;
    });

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>

            <pointsMaterial
                size={0.12}
                transparent
                opacity={0.9}
                color="#ff7a18"
                depthWrite={false}
            />
        </points>
    );
}

export default function ParticlesFire() {
    return (
        <Canvas 
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 5 }}
            camera={{ position: [0, 0, 5], fov: 75 }}
        >
            <ambientLight intensity={0.4} />
            <EmberParticles />
        </Canvas>
    );
}