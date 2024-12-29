import React from "react";
import { skill } from "./Data";
import Button from "./minor/Githubbtn.";
import LiveButton from "./minor/LiveButton";
function Projects() {
  let skills=skill
  const projects = [
    {
      title: "TrackStock - Zerodha Clone",
      description: "A full-stack trading platform for portfolio management, data visualization, and user interactions.",
      link: "https://financefrontend-gdci.onrender.com/",
      githubLink: "https://github.com/kshitij1439/financefrontend",
      tech: ["MongoDB", "Express.js", "React", "Node.js", "Bootstrap", "Material UI"],
    },
    {
      title: "Gemini Wrapper",
      description: "A dynamic web application generating AI-based responses to user queries in real-time.",
      link: "https://gemini-wrapper.vercel.app",
      githubLink: "https://github.com/kshitij1439/geminiq",
      tech: ["React", "Vite", "Axios", "Custom CSS", "API Integration"],
    },
    {
      title: "Weather App",
      description: "A React-based application displaying real-time weather details with a responsive interface.",
      link: "https://city-weather-api.onrender.com",
      githubLink: "https://github.com/kshitij1439/clima-view",
      tech: ["React", "Material UI", "Vite", "Emotion.js", "JavaScript"],
    },
    {
      title: "CloudBnB (Airbnb Clone)",
      description: "A secure lodging and review management system with cloud-based media storage.",
      link: "https://hotelproject-h8tx.onrender.com/listings",
      githubLink: "https://github.com/kshitij1439/hotelproject",
      tech: ["MongoDB", "Express.js", "Node.js", "EJS", "Cloudinary", "JWT", "Joi"],
    },
  ];
  
  return (
    <section id="projects" className="projects">
      <h2 className="text-my-extra-large font-bold">Projects</h2>
      <div className="projects-container">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
<div className="iframe-container">
  <iframe
    src={project.link}
    title={`${project.title} Preview`}
    className="iframe-preview"
    scrolling="no"
    sandbox="allow-scripts allow-same-origin allow-popups"
  ></iframe>
</div>


            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <h4 className="pt-2">Tech Used: </h4>
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


                <LiveButton link={project.link} label="View Now"/>

                <Button link={project.githubLink}/>
              </div>
            ))}
      </div>
      <div className="text-my-extra-large font-bold pt-5">
      Explore My Ongoing Projects on 
      </div>
        <Button link={"https://github.com/kshitij1439"} add={"Github"}/>

    </section>
  );
}

export default Projects;
