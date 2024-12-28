import './App.css'
import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import './styles/tailwind.css';  
// import Working from './components/Working.jsx';
function App() {

  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      {/* <Working/> */}
      <Contact />
      <Footer />
    </div>
  )
}

export default App
