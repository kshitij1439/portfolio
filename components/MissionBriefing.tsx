"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function MissionBriefing() {
    const boxRef = useRef(null);

    useEffect(() => {
        gsap.from(boxRef.current, {
            opacity: 0,
            x: -120,
            delay: 1.2,
            duration: 1.2,
            ease: "power2.out",
        });

        gsap.from(".brief-line", {
            opacity: 0,
            y: 8,
            stagger: 0.08,
            delay: 1.6,
            duration: 0.8,
            ease: "power2.out",
        });
    }, []);

    return (
        <div ref={boxRef} className="text-gray-300 hud-mono">
            <div className="text-orange-400 text-4xl font-bold tracking-widest">
                KSHITIJ GAIKWAD
            </div>
            <div className="mt-3 text-lg text-gray-200">
                Full-Stack Developer / GenAI
            </div>

            <div className="mt-6 space-y-2">
                <div className="brief-line">• JavaScript / Node / React</div>
                <div className="brief-line">• Three.js / WebGL / R3F</div>
                <div className="brief-line">• DevOps · Model Deployment</div>
            </div>

            <div className="mt-6">
                <a
                    className="inline-block px-5 py-2 border border-orange-500 rounded hover:bg-orange-500/10 transition"
                    href="#projects"
                >
                    VIEW PROJECTS
                </a>
            </div>
        </div>
    );
}
