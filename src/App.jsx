import Navbar from "./components/Navbar";
import Hero from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Working from "./components/Working";
import Footer from "./components/Footer";
import Contact from "./components/Contact";

function App() {
    return (
        <div className="bg-slate-950 min-h-screen text-slate-200 antialiased selection:bg-purple-500/30">
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
