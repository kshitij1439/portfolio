import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronDown, Terminal, Cpu } from "lucide-react";

// 1. Enhanced Background with Grid + Particles
const BackgroundEffects = () => {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden bg-slate-950">
            {/* CSS Grid Overlay for that "Blueprint" look */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            {/* Glowing center spot */}
            <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-purple-500/10 blur-[100px] mx-auto"></div>

            {/* Floating Particles */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{
                        x: [
                            Math.random() * window.innerWidth,
                            Math.random() * window.innerWidth,
                        ],
                        y: [
                            Math.random() * window.innerHeight,
                            Math.random() * window.innerHeight,
                        ],
                        opacity: [0.2, 0.8, 0.2],
                        scale: [0.5, 1.5, 0.5],
                    }}
                    transition={{
                        duration: Math.random() * 10 + 15,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            ))}
        </div>
    );
};

const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    // Staggered animation for text
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100 },
        },
    };

    return (
        <section
            id="hero"
            ref={ref}
            className="min-h-screen flex items-center justify-center relative overflow-hidden text-white font-sans selection:bg-purple-500/30"
        >
            <BackgroundEffects />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="text-center lg:text-left lg:flex lg:items-center lg:justify-between"
                >
                    {/* Main Text Content */}
                    <div className="lg:w-2/3">
                        <motion.div
                            variants={itemVariants}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 mb-6"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                            </span>
                            <span className="text-xs font-mono text-purple-300">
                                SYSTEM ONLINE
                            </span>
                        </motion.div>

                        <motion.h1
                            variants={itemVariants}
                            className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
                        >
                            <span className="block text-slate-400 text-2xl md:text-3xl font-mono mb-2">
                                Hello_World, I am
                            </span>
                            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent filter drop-shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                                Kshitij
                            </span>
                        </motion.h1>

                        <motion.div
                            variants={itemVariants}
                            className="h-px w-32 bg-gradient-to-r from-purple-500 to-transparent mb-8 mx-auto lg:mx-0"
                        />

                        <motion.p
                            variants={itemVariants}
                            className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed"
                        >
                            <span className="text-cyan-400 font-mono">
                                &lt;Developer /&gt;
                            </span>{" "}
                            focusing on MERN Stack architecture and intuitive
                            Frontend Design. I compile complex requirements into
                            executable, elegant solutions.
                        </motion.p>

                        <motion.div
                            variants={itemVariants}
                            className="flex flex-wrap gap-4 justify-center lg:justify-start"
                        >
                            <motion.a
                                href="#contact"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group relative px-8 py-3 bg-white text-black font-semibold rounded-lg overflow-hidden"
                            >
                                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-300 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <span className="relative flex items-center gap-2">
                                    <Terminal className="w-4 h-4" />
                                    Initialize Contact
                                </span>
                            </motion.a>

                            <motion.a
                                href="#projects"
                                whileHover={{
                                    scale: 1.05,
                                    backgroundColor: "rgba(168, 85, 247, 0.1)",
                                }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 border border-slate-700 text-slate-300 rounded-lg font-mono text-sm flex items-center gap-2 hover:border-purple-500/50 transition-colors"
                            >
                                <Cpu className="w-4 h-4" />
                                PROJECTS
                            </motion.a>
                        </motion.div>
                    </div>

                    {/* Abstract AI Visual Element (Right Side) */}
                    <div className="hidden lg:block lg:w-1/3">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 blur-[80px] opacity-20" />
                            <div className="relative border border-slate-800 bg-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border-t-purple-500/20">
                                <div className="flex gap-2 mb-4">
                                    <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                                </div>
                                <div className="space-y-2 font-mono text-xs text-slate-400">
                                    <p>
                                        <span className="text-pink-500">
                                            const
                                        </span>{" "}
                                        <span className="text-blue-400">
                                            developer
                                        </span>{" "}
                                        ={" "}
                                        <span className="text-yellow-300">
                                            {"{"}
                                        </span>
                                    </p>
                                    <p className="pl-4">
                                        name:{" "}
                                        <span className="text-green-400">
                                            "Kshitij"
                                        </span>
                                        ,
                                    </p>
                                    <p className="pl-4">
                                        role:{" "}
                                        <span className="text-green-400">
                                            "Full Stack"
                                        </span>
                                        ,
                                    </p>
                                    <p className="pl-4">
                                        status:{" "}
                                        <span className="text-green-400">
                                            "Ready to work"
                                        </span>
                                    </p>
                                    <p>
                                        <span className="text-yellow-300">
                                            {"}"}
                                        </span>
                                        ;
                                    </p>
                                    <p className="animate-pulse">_</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="flex flex-col items-center gap-2"
                    >
                        <span className="text-[10px] font-mono text-slate-500 tracking-widest uppercase">
                            Scroll
                        </span>
                        <ChevronDown className="w-5 h-5 text-purple-500" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
