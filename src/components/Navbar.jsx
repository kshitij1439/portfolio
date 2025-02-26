import React from "react";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container ">
        {/* <h1 className="logo">Kshitij's Portfolio</h1> */}
        <ul className="nav-links">
          <li><a href="#about ">About</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="https://drive.google.com/drive/folders/1JUp7bNK8kMkDbtiGAu0sO6W7LJmN0DMj" target="_blank">Resume</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
