import React from "react";

function Projects() {
  const projects = [
    {
      title: "Zerodha Clone",
      description: "A real-time communication app using WebRTC.",
      link: "#",
    },
    {
      title: "Weather App",
      description: "My personal portfolio built using React.",
      link: "#",
    },
  ];

  return (
    <section id="projects" className="projects">
      <h2>Projects</h2>
      <div className="projects-container">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <a href={project.link} className="btn" target="_blank">
              View Project
            </a>
          </div>
        ))}
      </div>
        <a href="https://github.com/kshitij1439">More</a>
    </section>
  );
}

export default Projects;
