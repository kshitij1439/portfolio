import { Zap } from "lucide-react";

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-950 py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Top Border with AI Glow Effect */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent shadow-[0_0_15px_rgba(168,85,247,0.3)]"></div>

            <div className="max-w-7xl mx-auto text-center relative z-10">
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-8">
                    {/* Copyright/Year */}
                    <p className="text-slate-500 text-sm font-mono">
                        &copy; {currentYear} KSHITIJ.DEV
                    </p>

                    {/* Separator / AI status */}
                    <span className="hidden sm:block text-purple-600 text-sm font-mono">
                        // STATUS: DEPLOYMENT_COMPLETE
                    </span>

                    {/* Main Thank You Message */}
                    <p className="text-cyan-400 font-semibold flex items-center gap-2">
                        <Zap className="w-4 h-4 text-pink-500" />
                        <span className="text-slate-200">
                            Thanks for visiting{" "}
                        </span>
                        <span className="text-purple-400 font-mono">
                            _SYSTEM_EXIT
                        </span>
                    </p>
                </div>

                <p className="mt-4 text-xs text-slate-600">
                    Engineered with React, Tailwind, and Framer Motion.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
