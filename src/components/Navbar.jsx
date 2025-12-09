import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal, FileText, Download } from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = ["About", "Projects", "Experience", "Skills"];

    // --- SMOOTH SCROLL FUNCTION ---
    const handleScroll = (e, id) => {
        e.preventDefault();
        setIsOpen(false); // Close mobile menu first

        // Mapping: "About" -> "Hero" section
        const targetId = id === "about" ? "hero" : id;

        const element = document.getElementById(targetId);
        if (element) {
            // Small timeout to allow mobile menu to close before calculating scroll
            setTimeout(() => {
                const yOffset = -80; // Navbar height offset
                const y =
                    element.getBoundingClientRect().top +
                    window.pageYOffset +
                    yOffset;
                window.scrollTo({ top: y, behavior: "smooth" });
            }, 100);
        }
    };

    // Animation variants
    const menuVariants = {
        closed: {
            opacity: 0,
            height: 0,
            transition: { duration: 0.3, ease: "easeInOut" },
        },
        open: {
            opacity: 1,
            height: "auto",
            transition: { duration: 0.3, ease: "easeInOut" },
        },
    };

    const linkVariants = {
        hover: { scale: 1.05, color: "#a855f7" },
        tap: { scale: 0.95 },
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
                scrolled
                    ? "bg-slate-950/80 backdrop-blur-md border-purple-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
                    : "bg-transparent border-transparent"
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo / System ID */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={(e) => handleScroll(e, "hero")}
                    >
                        <div className="p-1.5 bg-purple-500/10 rounded border border-purple-500/30">
                            <Terminal className="w-5 h-5 text-purple-400" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-white font-bold tracking-wider text-sm font-mono">
                                KSHITIJ
                                <span className="text-purple-500">.DEV</span>
                            </span>
                            <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                                <span className="relative flex h-1.5 w-1.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                                </span>
                                SYSTEM ONLINE
                            </span>
                        </div>
                    </motion.div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <motion.a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                onClick={(e) =>
                                    handleScroll(e, item.toLowerCase())
                                }
                                variants={linkVariants}
                                whileHover="hover"
                                whileTap="tap"
                                className="text-slate-400 text-sm font-mono hover:text-white transition-colors relative group cursor-pointer"
                            >
                                <span className="text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity absolute -left-3">
                                    /
                                </span>
                                {item}
                            </motion.a>
                        ))}

                        <motion.a
                            href="https://drive.google.com/drive/folders/1JUp7bNK8kMkDbtiGAu0sO6W7LJmN0DMj"
                            target="_blank"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group flex items-center gap-2 px-4 py-2 bg-slate-900 border border-purple-500/30 rounded text-xs font-mono text-purple-300 hover:bg-purple-500/10 hover:border-purple-500 transition-all duration-300"
                        >
                            <FileText className="w-3 h-3 group-hover:text-white transition-colors" />
                            <span>RESUME.PDF</span>
                            <Download className="w-3 h-3 group-hover:translate-y-0.5 transition-transform" />
                        </motion.a>
                    </div>
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </motion.button>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        className="md:hidden bg-slate-950 border-b border-purple-500/20 overflow-hidden"
                    >
                        <div className="px-4 py-6 space-y-4">
                            {navItems.map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    onClick={(e) =>
                                        handleScroll(e, item.toLowerCase())
                                    }
                                    className="block p-3 rounded-lg hover:bg-slate-900 text-slate-300 hover:text-purple-400 font-mono transition-colors border border-transparent hover:border-purple-500/20"
                                >
                                    <span className="text-purple-500 mr-2">
                                        0{navItems.indexOf(item) + 1}.
                                    </span>
                                    {item.toUpperCase()}
                                </a>
                            ))}

                            <div className="h-px bg-slate-800 my-4" />

                            <a
                                href="https://drive.google.com/drive/folders/1JUp7bNK8kMkDbtiGAu0sO6W7LJmN0DMj"
                                target="_blank"
                                className="flex items-center justify-center gap-2 w-full p-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded text-white font-mono text-sm shadow-lg shadow-purple-500/20"
                            >
                                <Download className="w-4 h-4" />
                                DOWNLOAD_RESUME
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
