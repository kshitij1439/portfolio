"use client";

import FogScene from "@/components/FogScene";
import ParticlesFire from "@/components/ParticlesFire";
import SoldierFace from "@/components/SoldierFace";
import MissionBriefing from "@/components/MissionBriefing";

export default function Home() {
    return (
        // <div className="relative h-screen w-full overflow-hidden bg-black">
        <div className="relative h-screen w-full overflow-hidden">
            {/* Background layers */}
            <FogScene />
            <ParticlesFire />

            {/* Foreground */}
            <div className="absolute inset-0 flex items-center justify-between pl-20">
                <div className="max-w-lg">
                    <MissionBriefing />
                </div>

                <div className="fixed right-0 top-1/2 -translate-y-1/2">
                    <SoldierFace />
                </div>
            </div>

            {/* Bottom fade */}
            <div className="pointer-events-none absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black/80 to-transparent" />
        </div>
    );
}
