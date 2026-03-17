import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal, FileText, Download } from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = ["About", "Projects", "Experience", "Skills"];

    const handleNavScroll = (e, id) => {
        e.preventDefault();
        setIsOpen(false);
        const targetId = id === "about" ? "hero" : id;
        const element = document.getElementById(targetId);
        if (element) {
            setTimeout(() => {
                const y =
                    element.getBoundingClientRect().top +
                    window.pageYOffset -
                    80;
                window.scrollTo({ top: y, behavior: "smooth" });
            }, 100);
        }
    };

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

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
                scrolled
                    ? "bg-black/80 backdrop-blur-md border-white/8 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
                    : "bg-transparent border-transparent"
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={(e) => handleNavScroll(e, "hero")}
                    >
                        <div className="p-1.5 bg-orange-500/10 rounded border border-orange-500/20">
                            <Terminal className="w-5 h-5 text-orange-400" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-white font-bold tracking-wider text-sm font-mono">
                                KSHITIJ
                                <span className="text-orange-500">.DEV</span>
                            </span>
                            <span className="text-[10px] text-white/40 flex items-center gap-1 font-mono">
                                <span className="relative flex h-1.5 w-1.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-orange-500" />
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
                                    handleNavScroll(e, item.toLowerCase())
                                }
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="text-white/40 text-sm font-mono hover:text-white transition-colors relative group cursor-pointer"
                            >
                                <span className="text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity absolute -left-3">
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
                            className="group flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/10 rounded text-xs font-mono text-white/40 hover:bg-orange-500/10 hover:border-orange-500/30 hover:text-orange-300 transition-all duration-300"
                        >
                            <FileText className="w-3 h-3" />
                            <span>RESUME.PDF</span>
                            <Download className="w-3 h-3 group-hover:translate-y-0.5 transition-transform" />
                        </motion.a>
                    </div>

                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-md transition-colors"
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
                        className="md:hidden bg-black border-b border-white/6 overflow-hidden"
                    >
                        <div className="px-4 py-6 space-y-4">
                            {navItems.map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    onClick={(e) =>
                                        handleNavScroll(e, item.toLowerCase())
                                    }
                                    className="block p-3 rounded-lg hover:bg-white/[0.03] text-white/40 hover:text-orange-400 font-mono transition-colors border border-transparent hover:border-white/8"
                                >
                                    <span className="text-orange-500 mr-2">
                                        0{navItems.indexOf(item) + 1}.
                                    </span>
                                    {item.toUpperCase()}
                                </a>
                            ))}

                            <div className="h-px bg-white/6 my-4" />

                            <a
                                href="https://drive.google.com/drive/folders/1JUp7bNK8kMkDbtiGAu0sO6W7LJmN0DMj"
                                target="_blank"
                                className="flex items-center justify-center gap-2 w-full p-3 bg-gradient-to-r from-orange-600 to-red-600 rounded text-white font-mono text-sm shadow-lg shadow-orange-500/20"
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
