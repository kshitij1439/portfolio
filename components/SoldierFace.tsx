"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function SoldierFace() {
    const faceRef = useRef(null);

    useEffect(() => {
        const el = faceRef.current;

        gsap.set(el, { x: 600, opacity: 0, rotateY: 20 });

        const tl = gsap.timeline();
        tl.to(el, {
            x: 0,
            opacity: 1,
            rotateY: 0,
            duration: 1.8,
            ease: "power3.out",
        }).to(el, { rotation: 0, duration: 0.6 }, ">-0.2");
    }, []);

    return (
        <div className="flex items-center justify-center">
            <img
                ref={faceRef}
                src="/assets/soldiergibli.png"
                alt="soldier half face"
                className="w-[28vw] min-w-[280px] max-w-[420px] object-cover drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                style={{ imageRendering: 'high-quality' }}
            />
        </div>
    );
}
