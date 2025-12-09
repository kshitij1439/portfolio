import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
    Cpu,
    Layout,
    Cloud,
    BrainCircuit,
    Server,
} from "lucide-react";

// Categorized for "System Architecture" organization
const skillCategories = [
    {
        id: "UI_INTERFACE_MOD",
        title: "Frontend Architecture",
        icon: Layout,
        // Included Next.js 15, Mapbox, and key UI libs
        skills: [
            "Next.js 15",
            "TypeScript",
            "React",
            "Mapbox GL",
            "Tailwind CSS",
            "Redux",
            "Framer Motion",
            "Material UI",
        ],
        color: "text-cyan-400",
        border: "group-hover:border-cyan-500/50",
        bg: "group-hover:bg-cyan-500/10",
    },
    {
        id: "SERVER_CORE_SYS",
        title: "Backend & Data Streams",
        icon: Server,
        // Added Kafka, Redis, SQL/NoSQL mix
        skills: [
            "Node.js",
            "Express",
            "PostgreSQL",
            "MongoDB",
            "Redis",
            "Kafka",
            "Java",
            "Socket.IO",
            "WebRTC",
        ],
        color: "text-purple-400",
        border: "group-hover:border-purple-500/50",
        bg: "group-hover:bg-purple-500/10",
    },
    {
        id: "INFRA_OPS_SEC",
        title: "Cloud & DevOps (Beginner)",
        icon: Cloud,
        // Heavy focus on AWS, K8s, Docker
        skills: [
            "AWS (EC2/S3/EKS)",
            "Docker",
            "Kubernetes",
            "Nginx",
            "CI/CD",
            "Prometheus",
            "Grafana",
        ],
        color: "text-blue-400",
        border: "group-hover:border-blue-500/50",
        bg: "group-hover:bg-blue-500/10",
    },
    {
        id: "NEURAL_ENGINE",
        title: "AI & Vector Compute",
        icon: BrainCircuit,
        // The new AI stack
        skills: [
            "LangChain",
            "LangGraph",
            "Python",
            "QdrantDB",
            "Mem0",
            "Neo4j",
            "RAG Pipelines",
            "Generative AI",
        ],
        color: "text-emerald-400",
        border: "group-hover:border-emerald-500/50",
        bg: "group-hover:bg-emerald-500/10",
    },
];

const Skills = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
        },
    };

    const categoryVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    };

    return (
        <section
            id="skills"
            ref={ref}
            className="py-24 bg-slate-950 relative overflow-hidden"
        >
            {/* Abstract Background Trace */}
            <div className="absolute right-0 top-1/4 w-1/3 h-1/2 bg-gradient-to-b from-purple-500/10 to-transparent blur-[100px] pointer-events-none" />
            <div className="absolute left-0 bottom-1/4 w-1/3 h-1/2 bg-gradient-to-t from-cyan-500/10 to-transparent blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-slate-900 border border-slate-700 rounded-full">
                        <Cpu className="w-4 h-4 text-purple-400" />
                        <span className="text-xs font-mono text-slate-300">
                            SYSTEM_CAPABILITIES
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white">
                        Tech{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                            Stack
                        </span>
                    </h2>
                </motion.div>

                {/* Categories Grid - Changed to 2 columns for better balance with 4 items */}
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
                            className="group relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:border-slate-600 transition-colors duration-300 h-full"
                        >
                            {/* Category Header */}
                            <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                                <div
                                    className={`p-2 rounded-lg bg-slate-950 border border-slate-800 ${category.color}`}
                                >
                                    <category.icon size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-200">
                                        {category.title}
                                    </h3>
                                    <p className="text-[10px] font-mono text-slate-500">
                                        {category.id} // ONLINE
                                    </p>
                                </div>
                            </div>

                            {/* Skills Grid */}
                            <div className="flex flex-wrap gap-2">
                                {category.skills.map((skill, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ scale: 1.05 }}
                                        className={`px-3 py-1.5 rounded text-xs font-mono text-slate-300 bg-slate-950 border border-slate-800 transition-all duration-300 cursor-default ${category.border} ${category.bg} hover:text-white hover:shadow-[0_0_15px_rgba(168,85,247,0.15)]`}
                                    >
                                        {skill}
                                    </motion.div>
                                ))}
                            </div>

                            {/* Decorative Corner */}
                            <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden pointer-events-none">
                                <div
                                    className={`absolute top-0 right-0 w-2 h-2 rounded-bl-full transition-colors duration-300 ${category.color
                                        .replace("text-", "bg-")
                                        .replace(
                                            "400",
                                            "500"
                                        )} opacity-20 group-hover:opacity-100`}
                                />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
