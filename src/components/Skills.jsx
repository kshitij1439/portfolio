import React from "react";
import { skill } from "./Data";

function Skills() {
  const skills=skill
  console.log(skill); // Debugging: Ensure skills is imported correctly
  
  return (
    <section id="skills" className="skills">
      <h2>Technologies, Skills & Achievements</h2>
      <div className="skills-container">
        {skills.map((skill, index) => (
          <div key={index} className="skill-item">
            <img src={skill.badge} alt={skill.name} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
