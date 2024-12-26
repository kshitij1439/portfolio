import React from "react";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        {/* <h1 className="logo">Kshitij's Portfolio</h1> */}
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="https://docs.google.com/document/d/1LX_6HSDn-qbBcI7oTWEk9N_J1mIZjxPZc4panc1y9Jk/edit?usp=drive_link" target="_blank">Resume</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
