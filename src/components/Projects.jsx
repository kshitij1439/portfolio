import React,{ useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Github, Code2, Folder, Terminal, ExternalLink } from "lucide-react";

const projects = [
    {
        id: "AI_CORE_02",
        title: "AI-Xi Flame",
        category: "GenAI / Semantic Memory",
        description:
            "Production-ready Gemini clone with persistent context via Mem0 & Qdrant Vector DB. Features Google OAuth, multimodal inputs, and edge-optimized streaming responses.",
        link: "https://ai-xi-flame.vercel.app/",
        githubLink: "https://github.com/kshitij1439/geminiq",
        tech: ["Next.js", "Gemini 2.5", "Mem0", "Qdrant", "OAuth"],
    },
    {
        id: "DEV_IDE_05",
        title: "Coding-for-Us",
        category: "Web IDE / Infrastructure",
        description:
            "Browser-based development environment utilizing WebContainer API. Features an integrated Xterm.js terminal, live web app previews, and a custom token reduction pipeline.",
        link: "https://coding-for-us-web.vercel.app/",
        githubLink: "https://github.com/kshitij1439",
        tech: ["WebContainer", "Next.js", "Xterm.js", "TypeScript"],
    },
    {
        id: "SYS_01",
        title: "TrackStock Platform",
        category: "FinTech / Data Viz",
        description:
            "Full-stack trading environment. Visualizes portfolio metrics and executes user transactions in real-time.",
        link: "https://financefrontend-gdci.onrender.com/",
        githubLink: "https://github.com/kshitij1439/financefrontend",
        tech: ["MongoDB", "Express", "React", "Node", "MUI"],
    },
    {
        id: "AI_CORE_02",
        title: "Gemini AI Wrapper",
        category: "Artificial Intelligence",
        description:
            "Dynamic interface bridging user queries with LLM responses. Features real-time generation and context handling.",
        link: "https://gemini-wrapper.vercel.app",
        githubLink: "https://github.com/kshitij1439/geminiq",
        tech: ["React", "Vite", "Generative AI"],
    },
    {
        id: "ENV_03",
        title: "ClimaView System",
        category: "API Integration",
        description:
            "Responsive meteorological dashboard aggregating real-time weather data with location-based services.",
        link: "https://city-weather-api.onrender.com",
        githubLink: "https://github.com/kshitij1439/clima-view",
        tech: ["React", "REST API", "Vite"],
    },
    {
        id: "HST_04",
        title: "CloudBnB System",
        category: "Marketplace Architecture",
        description:
            "Secure lodging management system. Handles review aggregation, media storage, and JWT authentication.",
        link: "https://hotelproject-h8tx.onrender.com/listings",
        githubLink: "https://github.com/kshitij1439/hotelproject",
        tech: ["MERN Stack", "JWT", "Cloudinary"],
    },
];

const Projects = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
        },
    };

    const cardVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    return (
        <section
            id="projects"
            ref={ref}
            className="py-24 bg-slate-950 relative overflow-hidden"
        >
            {/* Background Grid Elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(128,90,213,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(128,90,213,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="flex flex-col items-center mb-16"
                >
                    <div className="flex items-center gap-2 mb-4 px-4 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
                        <Folder className="w-4 h-4 text-purple-400" />
                        <span className="text-xs font-mono text-purple-300 tracking-widest">
                            /PROJECT_ARCHIVE
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">
                        Deployed{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                            Projects
                        </span>
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-transparent rounded-full" />
                </motion.div>

                {/* Projects Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
                >
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover={{ y: -5 }}
                            className="group relative bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-purple-500/40 transition-all duration-300 shadow-lg hover:shadow-purple-500/10"
                        >
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute inset-0 z-0 cursor-pointer"
                                aria-label={`View ${project.title}`}
                            >
                                <span className="sr-only">View Project</span>
                            </a>
                            <div className="bg-slate-950 border-b border-slate-800 p-3 flex items-center justify-between relative z-10 pointer-events-none">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 group-hover:bg-red-500 transition-colors" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 group-hover:bg-yellow-500 transition-colors" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 group-hover:bg-green-500 transition-colors" />
                                </div>
                                <div className="text-[10px] font-mono text-slate-500 flex items-center gap-2">
                                    <span className="hidden sm:inline">
                                        User@System:~/deployments
                                    </span>
                                    <span className="text-purple-500">
                                        {project.id}
                                    </span>
                                </div>
                            </div>

                            {/* Iframe / Preview Area (Interactive Z-10) */}
                            <div
                                className="relative w-full bg-slate-950 overflow-hidden group-hover:shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] border-b border-slate-800 z-10"
                                style={{ aspectRatio: "16/9" }}
                            >
                                <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
                                    <iframe
                                        src={project.link}
                                        title={project.title}
                                        loading="lazy"
                                        // Hide Scrollbars style
                                        style={{
                                            border: "none",
                                            scrollbarWidth: "none",
                                            msOverflowStyle: "none",
                                        }}
                                        className="w-full h-full opacity-50 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0 [&::-webkit-scrollbar]:hidden"
                                        tabIndex="-1"
                                    />
                                </div>
                                {/* Gradient: Pointer events none so clicks go to iframe */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80 pointer-events-none" />

                                <div className="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur border border-purple-500/30 px-3 py-1 rounded text-xs font-mono text-purple-300 pointer-events-none">
                                    STATUS: ACTIVE
                                </div>
                            </div>

                            <div className="p-6 relative pointer-events-none">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-100 group-hover:text-purple-400 transition-colors flex items-center gap-2">
                                            {project.title}
                                            <ExternalLink
                                                size={14}
                                                className="opacity-0 group-hover:opacity-100 transition-opacity text-purple-400"
                                            />
                                        </h3>
                                        <p className="text-xs font-mono text-slate-500 mt-1">
                                            {project.category}
                                        </p>
                                    </div>
                                    <Code2 className="w-6 h-6 text-slate-600 group-hover:text-white transition-colors" />
                                </div>

                                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tech.map((tech, i) => (
                                        <span
                                            key={i}
                                            className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-cyan-300 bg-cyan-950/30 border border-cyan-900/50 rounded"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Footer Actions */}
                                <div className="flex items-center justify-between pt-4 border-t border-slate-800 relative z-20">
                                    {/* Status Indicator */}
                                    <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        <span>System Operational</span>
                                    </div>

                                    <a
                                        href={project.githubLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-colors border border-slate-700 pointer-events-auto"
                                    >
                                        <Github size={14} />
                                        <span>Code</span>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom Call to Action */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 }}
                    className="flex justify-center mt-16"
                >
                    <a
                        href="https://github.com/kshitij1439"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative px-6 py-3 bg-slate-900 border border-slate-700 rounded-lg overflow-hidden"
                    >
                        <div className="absolute inset-0 w-full h-full bg-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                        <span className="flex items-center gap-3 text-slate-300 group-hover:text-white transition-colors">
                            <Terminal size={18} />
                            <span className="font-mono text-sm">
                                git checkout --all-projects
                            </span>
                        </span>
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
