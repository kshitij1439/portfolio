import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Working from "./components/Working";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import FireSpark from "./components/FireSpark";

function App() {
    return (
        <div className="bg-black min-h-screen text-white antialiased selection:bg-orange-500/30">
            <FireSpark/>
            <Navbar />

            <main>
                <Hero />
                <Projects />
                <Working />
                <Skills />
                <Contact />
            </main>

            <Footer />
        </div>
    );
}

export default App;