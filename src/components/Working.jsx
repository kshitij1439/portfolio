import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Calendar, Building2 } from "lucide-react";

const experienceData = [
    {
        id: "LOG_01",
        role: "Full Stack Developer Intern",
        company: "AI Unika",
        duration: "2025.04 - 2025.10",
        description: "Developed production-grade modules for RastaAI (180°/360°) using Next.js 15 and TypeScript. Integrated Mapbox GL for geospatial visualizations and optimized rendering via clustering. Reduced API response times from 30s to ~1s using NodeCache. Implemented secure S3 storage pipelines for uploading and retrieving high-volume media assets.",
        stack: ["Next.js 15", "TypeScript", "Mapbox GL", "AWS S3", "Node.js"],
        status: "COMPLETED",
    },
    {
        id: "LOG_02",
        role: "Research Intern",
        company: "India Meteorological Dept. (IMD)",
        duration: "2024.04 - 2024.09",
        description: "Conducted in-depth research on data preprocessing, rainfall prediction, and cloudburst analysis. Processed complex Automatic Weather Station (AWS) datasets to develop reliable prediction models. Led the evaluation of technical resources, extracting key insights to drive meteorological data modeling advancements.",
        stack: ["Data Analysis", "Python", "Predictive Modeling", "AWS Datasets"],
        status: "COMPLETED",
    },
];

const ExperienceCard = ({ data, index }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
        viewport={{ once: true }}
        className="relative pl-8 md:pl-0"
    >
        {/* Timeline dot */}
        <div className="hidden md:flex flex-col items-center absolute left-[-9px] top-0 h-full">
            <div className={`w-4 h-4 rounded-full border-2 ${
                data.status === "ACTIVE"
                    ? "bg-orange-500 border-orange-300 shadow-[0_0_10px_rgba(249,115,22,0.6)]"
                    : "bg-black border-white/15"
            }`} />
            <div className="w-px h-full bg-white/6 my-2" />
        </div>

        {/* Card */}
        <div className="group relative bg-white/[0.02] border border-white/8 hover:border-orange-500/20 p-6 rounded-xl backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.03] hover:shadow-xl hover:shadow-orange-900/10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                <div>
                    <h3 className="text-xl font-bold text-white/75 flex items-center gap-2">
                        {data.role}
                        {data.status === "ACTIVE" && (
                            <span className="px-2 py-0.5 rounded text-[10px] bg-orange-500/15 text-orange-300 border border-orange-500/25 animate-pulse">
                                ACTIVE
                            </span>
                        )}
                    </h3>
                    <div className="flex items-center gap-2 text-white/30 mt-1 text-sm font-mono">
                        <Building2 size={14} />
                        <span>{data.company}</span>
                    </div>
                </div>
                {/* Duration badge — orange instead of cyan */}
                <div className="flex items-center gap-2 text-xs font-mono text-orange-300/60 bg-orange-950/20 px-3 py-1 rounded border border-orange-900/30">
                    <Calendar size={12} />
                    {data.duration}
                </div>
            </div>

            <p className="text-white/30 text-sm leading-relaxed mb-6 border-l-2 border-white/6 pl-4 text-justify">
                {data.description}
            </p>

            <div className="flex flex-wrap gap-2">
                {data.stack.map((tech, i) => (
                    <span
                        key={i}
                        className="px-2 py-1 text-[10px] font-mono uppercase text-white/35 bg-white/[0.02] rounded border border-white/8 group-hover:border-orange-500/20 transition-colors"
                    >
                        {tech}
                    </span>
                ))}
            </div>

            <div className="absolute bottom-4 right-4 text-[10px] font-mono text-white/40 pointer-events-none select-none group-hover:text-white/45 transition-colors">
                ID: {data.id}
            </div>
        </div>
    </motion.div>
);

const Working = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="experience" ref={ref} className="py-24 bg-black relative overflow-hidden">
            <div className="absolute left-[10%] top-0 h-full w-px bg-gradient-to-b from-transparent via-white/5 to-transparent hidden md:block" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="mb-16 md:pl-12"
                >
                    <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-white/[0.03] border border-white/8 rounded-full">
                        <Briefcase className="w-4 h-4 text-orange-400" />
                        <span className="text-xs font-mono text-white/40">CAREER_LOGS</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white">
                        Professional{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-300 to-white">
                            Experience
                        </span>
                    </h2>
                </motion.div>

                {/* List */}
                <div className="space-y-12 md:pl-12 border-l border-white/6 md:border-none ml-4 md:ml-0">
                    {experienceData.map((data, index) => (
                        <ExperienceCard key={index} data={data} index={index} />
                    ))}
                </div>

                {/* End of log */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 }}
                    className="mt-12 md:pl-12 flex items-center gap-2 text-white/75 font-mono text-xs"
                >
                    <div className="w-2 h-2 bg-white/10 rounded-full animate-pulse" />
                    <span>END_OF_LOGS...</span>
                </motion.div>
            </div>
        </section>
    );
};

export default Working;