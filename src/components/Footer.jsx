import React from "react";
import { Zap } from "lucide-react";

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Top border — orange ember glow instead of purple */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent shadow-[0_0_15px_rgba(249,115,22,0.2)]" />

            <div className="max-w-7xl mx-auto text-center relative z-10">
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-8">
                    <p className="text-white/40 text-sm font-mono">
                        &copy; {currentYear} KSHITIJ.DEV
                    </p>

                    <span className="hidden sm:block text-white/45 text-sm font-mono">
                        // STATUS: DEPLOYMENT_COMPLETE
                    </span>

                    <p className="text-white/60 font-semibold flex items-center gap-2">
                        <Zap className="w-4 h-4 text-orange-500" />
                        <span className="text-white/50">Thanks for visiting </span>
                        <span className="text-orange-400 font-mono">_SYSTEM_EXIT</span>
                    </p>
                </div>

            </div>
        </footer>
    );
}

export default Footer;