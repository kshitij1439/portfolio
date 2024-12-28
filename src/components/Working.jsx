import React, { useRef, useState } from "react";
import AnimatedBeam from "./minor/AnimatedBeam";
import { FaHtml5, FaCss3Alt, FaReact, FaJs } from "react-icons/fa";

export default function Working() {
  // Refs for the icons and container
  const containerRef = useRef(null);
  const brainRef = useRef(null);
  const htmlRef = useRef(null);
  const cssRef = useRef(null);
  const jsRef = useRef(null);
  const reactRef = useRef(null);

  // Array of refs for each tech icon
  const techRefs = [htmlRef, cssRef, jsRef, reactRef];

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "500px",
        backgroundColor: "#f0f0f0",
        overflow: "hidden",
      }}
    >
      <h4>Working On</h4>
      
      {/* Center brain icon */}
      <div
        ref={brainRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "40px",
          color: "#333",
        }}
      >
        🧠 {/* Brain icon */}
      </div>

      {/* Surrounding tech icons */}
      {techRefs.map((ref, index) => (
        <div
          key={index}
          ref={ref}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) rotate(${index * 90}deg) translateY(-200px)`,
            fontSize: "30px",
            color: index === 0 ? "#e44d26" : index === 1 ? "#264de4" : index === 2 ? "#f7df1e" : "#61dafb",
          }}
        >
          {index === 0 && <FaHtml5 />}
          {index === 1 && <FaCss3Alt />}
          {index === 2 && <FaJs />}
          {index === 3 && <FaReact />}
        </div>
      ))}

      {/* Connect the brain with the tech icons using AnimatedBeam */}
      {techRefs.map((ref, index) => (
        <AnimatedBeam
          key={index}
          containerRef={containerRef}
          fromRef={brainRef}
          toRef={ref}
          curvature={50} // You can adjust curvature for the curve of the beam
          duration={2}
          delay={0}
          pathColor="gray"
          pathWidth={2}
          pathOpacity={0.2}
          gradientStartColor="#ffaa40"
          gradientStopColor="#9c40ff"
        />
      ))}
    </div>
  );
}
