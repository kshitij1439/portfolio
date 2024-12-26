import React from "react";
import { skill } from "./Data";
function Projects() {
  let skills=skill
  const projects = [
    // {
    //   title: "Finance Clone",
    //   description: "A full-stack trading platform for portfolio management, data visualization, and secure user interactions.",
    //   link: "https://finance-clone.vercel.app",
    //   tech: ["MongoDB", "Express.js", "React", "Node.js", "Material UI", "REST API", "JWT"],
    // },
    {
      title: "Gemini Wrapper",
      description: "A dynamic web application generating AI-based responses to user queries in real-time.",
      link: "https://gemini-wrapper.vercel.app",
      tech: ["React", "Vite", "Axios", "Custom CSS", "API Integration"],
    },
    {
      title: "Weather App",
      description: "A React-based application displaying real-time weather details with a responsive interface.",
      link: "https://city-weather-api.onrender.com",
      tech: ["React", "Material UI", "Vite", "Emotion.js", "JavaScript"],
    },
    {
      title: "CloudBnB (Airbnb Clone)",
      description: "A secure lodging and review management system with cloud-based media storage.",
      link: "https://hotelproject-h8tx.onrender.com/",
      tech: ["MongoDB", "Express.js", "Node.js", "EJS", "Cloudinary", "JWT", "Joi"],
    },
  ];

  return (
    <section id="projects" className="projects">
      <h2>Projects</h2>
      <div className="projects-container">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <div className="iframe-container">
              <iframe
                src={project.link}
                title={`${project.title} Preview`}
                className="iframe-preview"
                scrolling="no"
              ></iframe>
            </div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <h4>Tech Used: </h4>
            <div className="tech-badges">
              {project.tech.map((techItem, i) => {
                      const skill = skills.find(skill => skill.name === techItem);

                      if (skill) {
                        return (
                          <img
                            key={i}
                            src={skill.badge}
                            alt={`${techItem} Badge`}
                            className="tech-badge"
                          />
                        );
                      }
                      return null;
              })}
                </div>
                <a href={project.link} className="btn" target="_blank" rel="noopener noreferrer">
                  View Project
                </a>
              </div>
            ))}
      </div>
      <a href="https://github.com/kshitij1439" className="btn" id="more-projects">
        More Projects
      </a>
    </section>
  );
}

export default Projects;
