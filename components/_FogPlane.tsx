"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function FogPlane() {
    const meshRef = useRef<THREE.Mesh>(null!);

    // Load fog texture
    const texture = new THREE.TextureLoader().load("/assets/fog.png");
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

    useFrame(() => {
        texture.offset.x += 0.0008;
        texture.offset.y += 0.0004;
    });

    return (
        <mesh
            ref={meshRef}
            position={[0, 0, -1]}
            scale={[12, 6, 1]}
        >
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial
                map={texture}
                transparent
                opacity={0.55}
                depthWrite={false}
            />
        </mesh>
    );
}
