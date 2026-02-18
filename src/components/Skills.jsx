import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Cpu, Layout, Cloud, BrainCircuit, Server } from "lucide-react";

const skillCategories = [
    {
        id: "UI_INTERFACE_MOD",
        title: "Frontend Architecture",
        icon: Layout,
        skills: ["Next.js 15", "TypeScript", "React", "Mapbox GL", "Tailwind CSS", "Redux", "Framer Motion", "Material UI"],
        color: "text-orange-400",
        border: "group-hover:border-orange-500/40",
        bg: "group-hover:bg-orange-500/8",
        hoverText: "hover:text-orange-400",
    },
    {
        id: "SERVER_CORE_SYS",
        title: "Backend & Data Streams",
        icon: Server,
        skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Redis", "Kafka", "Java", "Socket.IO", "WebRTC"],
        color: "text-red-400",
        border: "group-hover:border-red-500/40",
        bg: "group-hover:bg-red-500/8",
        hoverText: "hover:text-red-400",
    },
    {
        id: "INFRA_OPS_SEC",
        title: "Cloud & DevOps (Beginner)",
        icon: Cloud,
        skills: ["AWS (EC2/S3/EKS)", "Docker", "Kubernetes", "Nginx", "CI/CD", "Prometheus", "Grafana"],
        color: "text-white/60",
        border: "group-hover:border-white/20",
        bg: "group-hover:bg-white/[0.04]",
        hoverText: "hover:text-white",
    },
    {
        id: "NEURAL_ENGINE",
        title: "AI & Vector Compute",
        icon: BrainCircuit,
        skills: ["LangChain", "LangGraph", "Python", "QdrantDB", "Mem0", "Neo4j", "RAG Pipelines", "Generative AI"],
        color: "text-orange-300",
        border: "group-hover:border-orange-400/40",
        bg: "group-hover:bg-orange-400/8",
        hoverText: "hover:text-orange-300",
    },
];

const Skills = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const containerVariants = {
        hidden:  { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
    };
    const categoryVariants = {
        hidden:  { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
    };

    return (
        <section id="skills" ref={ref} className="py-24 bg-black relative overflow-hidden">
            {/* Ambient glows */}
            <div className="absolute right-0 top-1/4 w-1/3 h-1/2 bg-gradient-to-b from-orange-900/8 to-transparent blur-[100px] pointer-events-none" />
            <div className="absolute left-0 bottom-1/4 w-1/3 h-1/2 bg-gradient-to-t from-red-900/8 to-transparent blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-white/[0.03] border border-white/8 rounded-full">
                        <Cpu className="w-4 h-4 text-orange-400" />
                        <span className="text-xs font-mono text-white/40">SYSTEM_CAPABILITIES</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white">
                        Tech{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-300 to-white">
                            Stack
                        </span>
                    </h2>
                </motion.div>

                {/* Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid md:grid-cols-2 gap-8 lg:gap-10"
                >
                    {skillCategories.map((category, index) => (
                        <motion.div
                            key={index}
                            variants={categoryVariants}
                            className="group relative bg-white/[0.02] backdrop-blur-sm border border-white/6 rounded-2xl p-6 hover:border-white/12 transition-colors duration-300 h-full"
                        >
                            {/* Card Header */}
                            <div className="flex items-center gap-3 mb-6 border-b border-white/6 pb-4">
                                <div className={`p-2 rounded-lg bg-black border border-white/8 ${category.color}`}>
                                    <category.icon size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white/70">{category.title}</h3>
                                    <p className="text-[10px] font-mono text-white/40">{category.id} // ONLINE</p>
                                </div>
                            </div>

                            {/* Skills — each is a clickable Google search link */}
                            <div className="flex flex-wrap gap-2">
                                {category.skills.map((skill, i) => (
                                    <motion.a
                                        key={i}
                                        href={`https://www.google.com/search?q=${encodeURIComponent(skill)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.08, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`
                                            px-3 py-1.5 rounded text-xs font-mono text-white/40 bg-black
                                            border border-white/8 transition-all duration-200
                                            cursor-pointer select-none
                                            ${category.border} ${category.bg} ${category.hoverText}
                                            hover:border-opacity-100 hover:shadow-[0_0_12px_rgba(0,0,0,0.5)]
                                        `}
                                    >
                                        {skill}
                                    </motion.a>
                                ))}
                            </div>

                            {/* Corner accent */}
                            <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden pointer-events-none">
                                <div className={`absolute top-0 right-0 w-2 h-2 rounded-bl-full ${category.color.replace("text-", "bg-").replace("/60","").replace("400","500").replace("300","400")} opacity-10 group-hover:opacity-80 transition-opacity duration-300`} />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;