import React, { useRef } from "react";
import AnimatedBeam from "./AnimatedBeam"; // No need to export this again

export default function Brainworking() {
  const containerRef = useRef(null);
  const fromRef = useRef(null);
  const toRef = useRef(null);

  return (
    <div ref={containerRef}>
      <h3>Brainworking</h3>
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={fromRef}
        toRef={toRef}
      />
    </div>
  );
}
