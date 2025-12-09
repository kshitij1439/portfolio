import React from "react";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Calendar, Building2 } from "lucide-react";

const experienceData = [
    {
        id: "LOG_01",
        role: "Full Stack Developer Intern",
        company: "AI Unika",
        duration: "2025.04 - 2025.10",
        description:
            "Developed production-grade modules for RastaAI (180°/360°) using Next.js 15 and TypeScript. Integrated Mapbox GL for geospatial visualizations and optimized rendering via clustering. Reduced API response times from 30s to ~1s using NodeCache. Implemented secure S3 storage pipelines for uploading and retrieving high-volume media assets.",
        stack: ["Next.js 15", "TypeScript", "Mapbox GL", "AWS S3", "Node.js"],
        status: "COMPLETED",
    },
    {
        id: "LOG_02",
        role: "Research Intern",
        company: "India Meteorological Dept. (IMD)",
        duration: "2024.04 - 2024.09",
        description:
            "Conducted in-depth research on data preprocessing, rainfall prediction, and cloudburst analysis. Processed complex Automatic Weather Station (AWS) datasets to develop reliable prediction models. Led the evaluation of technical resources, extracting key insights to drive meteorological data modeling advancements.",
        stack: [
            "Data Analysis",
            "Python",
            "Predictive Modeling",
            "AWS Datasets",
        ],
        status: "COMPLETED",
    },
];

const ExperienceCard = ({ data, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="relative pl-8 md:pl-0"
        >
            {/* Timeline Line & Dot */}
            <div className="hidden md:flex flex-col items-center absolute left-[-9px] top-0 h-full">
                <div
                    className={`w-4 h-4 rounded-full border-2 ${
                        data.status === "ACTIVE"
                            ? "bg-purple-500 border-purple-300 shadow-[0_0_10px_#a855f7]"
                            : "bg-slate-900 border-slate-600"
                    }`}
                />
                <div className="w-px h-full bg-slate-800 my-2" />
            </div>

            {/* The Card */}
            <div className="group relative bg-slate-900/50 border border-slate-800 hover:border-purple-500/30 p-6 rounded-xl backdrop-blur-sm transition-all duration-300 hover:bg-slate-900/80 hover:shadow-xl hover:shadow-purple-900/10">
                {/* Header: Role & Company */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                    <div>
                        <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                            {data.role}
                            {data.status === "ACTIVE" && (
                                <span className="px-2 py-0.5 rounded text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 animate-pulse">
                                    ACTIVE
                                </span>
                            )}
                        </h3>
                        <div className="flex items-center gap-2 text-slate-400 mt-1 text-sm font-mono">
                            <Building2 size={14} />
                            <span>{data.company}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-950/30 px-3 py-1 rounded border border-cyan-900/50">
                        <Calendar size={12} />
                        {data.duration}
                    </div>
                </div>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed mb-6 border-l-2 border-slate-800 pl-4 text-justify">
                    {data.description}
                </p>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2">
                    {data.stack.map((tech, i) => (
                        <span
                            key={i}
                            className="px-2 py-1 text-[10px] font-mono uppercase text-slate-300 bg-slate-800 rounded border border-slate-700 group-hover:border-purple-500/30 transition-colors"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* ID Watermark */}
                <div className="absolute bottom-4 right-4 text-[10px] font-mono text-slate-800 pointer-events-none select-none group-hover:text-slate-700 transition-colors">
                    ID: {data.id}
                </div>
            </div>
        </motion.div>
    );
};

const Working = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            id="experience"
            ref={ref}
            className="py-24 bg-slate-950 relative overflow-hidden"
        >
            {/* Background Grid Lines */}
            <div className="absolute left-[10%] top-0 h-full w-px bg-gradient-to-b from-transparent via-slate-800 to-transparent hidden md:block" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="mb-16 md:pl-12"
                >
                    <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-slate-900 border border-slate-700 rounded-full">
                        <Briefcase className="w-4 h-4 text-purple-400" />
                        <span className="text-xs font-mono text-slate-300">
                            CAREER_LOGS
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white">
                        Professional{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                            Experience
                        </span>
                    </h2>
                </motion.div>

                {/* Experience List */}
                <div className="space-y-12 md:pl-12 border-l border-slate-800 md:border-none ml-4 md:ml-0">
                    {experienceData.map((data, index) => (
                        <ExperienceCard key={index} data={data} index={index} />
                    ))}
                </div>

                {/* Bottom Decorative End-of-Log */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 }}
                    className="mt-12 md:pl-12 flex items-center gap-2 text-slate-600 font-mono text-xs"
                >
                    <div className="w-2 h-2 bg-slate-800 rounded-full animate-pulse" />
                    <span>END_OF_LOGS...</span>
                </motion.div>
            </div>
        </section>
    );
};

export default Working;
