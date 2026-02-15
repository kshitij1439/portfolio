"use client";
import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const fogShader = {
    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float uTime;
        varying vec2 vUv;
        
        // Improved noise function
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

        float snoise(vec2 v) {
            const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
            vec2 i  = floor(v + dot(v, C.yy));
            vec2 x0 = v -   i + dot(i, C.xx);
            vec2 i1;
            i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
            vec4 x12 = x0.xyxy + C.xxzz;
            x12.xy -= i1;
            i = mod289(i);
            vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
            vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
            m = m*m;
            m = m*m;
            vec3 x = 2.0 * fract(p * C.www) - 1.0;
            vec3 h = abs(x) - 0.5;
            vec3 ox = floor(x + 0.5);
            vec3 a0 = x - ox;
            m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
            vec3 g;
            g.x  = a0.x  * x0.x  + h.x  * x0.y;
            g.yz = a0.yz * x12.xz + h.yz * x12.yw;
            return 130.0 * dot(m, g);
        }

        float fbm(vec2 p) {
            float value = 0.0;
            float amplitude = 0.5;
            float frequency = 1.0;
            
            for(int i = 0; i < 5; i++) {
                value += amplitude * snoise(p * frequency);
                frequency *= 2.0;
                amplitude *= 0.5;
            }
            return value;
        }

        void main() {
            vec2 uv = vUv;
            
            // Multiple fog layers with different speeds
            float fog1 = fbm(uv * 2.0 + vec2(uTime * 0.03, uTime * 0.02));
            float fog2 = fbm(uv * 3.0 - vec2(uTime * 0.02, uTime * 0.025));
            float fog3 = fbm(uv * 1.5 + vec2(uTime * 0.015, -uTime * 0.01));
            float fog4 = fbm(uv * 2.5 + vec2(uTime * 0.025, -uTime * 0.015));
            float fog5 = fbm(uv * 4.0 - vec2(uTime * 0.018, uTime * 0.022));
            // Combine layers
            float fog = (fog1 + fog2 * 0.9 + fog3 * 0.9 + fog4 * 0.9 + fog5 * 0.9) / 3.2;
            // Add vertical gradient (more fog at bottom)
            float gradient = smoothstep(0.0, 0.7, 1.0 - uv.y);
            fog *= gradient;
            
            // Normalize and adjust
            fog = smoothstep(0.2, 0.8, fog);
            
            // Smoky gray color with slight warmth
            vec3 fogColor = vec3(1.0, 1.0, 1.0);
            
            gl_FragColor = vec4(fogColor, fog * 1.0);
        }
    `
};

function FogPlane() {
    const meshRef = useRef<THREE.Mesh>(null!);
    const materialRef = useRef<THREE.ShaderMaterial>(null!);

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
        }
    });

    return (
        // <mesh ref={meshRef} position={[0, 0, -1]} scale={[16, 8, 1]}>
        <mesh ref={meshRef} position={[0, 0, -1]} scale={[20, 12, 1]}>
        <planeGeometry args={[1, 1, 32, 32]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={fogShader.vertexShader}
                fragmentShader={fogShader.fragmentShader}
                uniforms={{
                    uTime: { value: 0 }
                }}
                transparent
                depthWrite={false}
                blending={THREE.NormalBlending}
            />
        </mesh>
    );
}

export default function FogScene() {
    return (
        <Canvas
            className="fixed inset-0 -z-10"
            camera={{ position: [0, 0, 5] }}
        >
            <ambientLight intensity={0.4} />
            <Suspense fallback={null}>
                <FogPlane />
            </Suspense>
        </Canvas>
    );
}