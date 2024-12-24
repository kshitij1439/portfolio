import React from "react";

function Skills() {
  const skills = [
    { name: "MongoDB", badge: "https://img.shields.io/badge/-MongoDB-4caf50?logo=mongodb&logoColor=white" },
    { name: "Express.js", badge: "https://img.shields.io/badge/-Express.js-000000?logo=express&logoColor=white" },
    { name: "React", badge: "https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=black" },
    { name: "Node.js", badge: "https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white" },
    { name: "Socket.IO", badge: "https://img.shields.io/badge/-Socket.IO-010101?logo=socket.io&logoColor=white" },
    { name: "CORS", badge: "https://img.shields.io/badge/-CORS-35495E?logo=webcomponents.org&logoColor=white" },
    { name: "Java", badge: "https://img.shields.io/badge/-Java-007396?logo=java&logoColor=white" },
    { name: "LeetCode", badge: "https://img.shields.io/badge/-LeetCode-FFA116?logo=leetcode&logoColor=black" },
    { name: "SIH 2023", badge: "https://img.shields.io/badge/-SIH%202023-00bcd4" },
    { name: "CRUD", badge: "https://img.shields.io/badge/-CRUD-FFA500" },
    { name: "REST API", badge: "https://img.shields.io/badge/-REST%20API-0d6efd?logo=postman&logoColor=white" },
    { name: "Git", badge: "https://img.shields.io/badge/-Git-F05032?logo=git&logoColor=white" },
    { name: "GitHub", badge: "https://img.shields.io/badge/-GitHub-181717?logo=github&logoColor=white" },
    { name: "Redux", badge: "https://img.shields.io/badge/-Redux-764ABC?logo=redux&logoColor=white" },
    { name: "MVC Frameworks", badge: "https://img.shields.io/badge/-MVC%20Frameworks-7952B3?logo=spring&logoColor=white" },
    { name: "JWT", badge: "https://img.shields.io/badge/-JWT%20Auth-000000?logo=jsonwebtokens&logoColor=white" },
    { name: "Wireframing", badge: "https://img.shields.io/badge/-Wireframing-00897B?logo=figma&logoColor=white" },
    { name: "Tailwind CSS", badge: "https://img.shields.io/badge/-Tailwind%20CSS-06B6D4?logo=tailwind-css&logoColor=white" },
    { name: "HTML", badge: "https://img.shields.io/badge/-HTML-E34F26?logo=html5&logoColor=white" },
    { name: "CSS", badge: "https://img.shields.io/badge/-CSS-1572B6?logo=css3&logoColor=white" },
    { name: "JavaScript", badge: "https://img.shields.io/badge/-JavaScript-F7DF1E?logo=javascript&logoColor=black" },
    { name: "EJS", badge: "https://img.shields.io/badge/-EJS-888888?logo=ejs&logoColor=white" },
    { name: "SQL", badge: "https://img.shields.io/badge/-SQL-4479A1?logo=postgresql&logoColor=white" },
    { name: "JEST", badge: "https://img.shields.io/badge/-JEST-C21325?logo=jest&logoColor=white" },
    { name: "DSA", badge: "https://img.shields.io/badge/-DSA-2b3137?logo=hackerrank&logoColor=white" },
    { name: "Material UI", badge: "https://img.shields.io/badge/-Material%20UI-0081CB?logo=mui&logoColor=white" },
  ];

  return (
    <section id="skills" className="skills">
      <h2>Technologies & Skills</h2>
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
