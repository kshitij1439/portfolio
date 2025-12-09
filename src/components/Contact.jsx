import React,{ useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, ExternalLink } from "lucide-react";

const Contact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="contact" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                        Get In Touch
                    </h2>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 text-center"
                    >
                        <p className="text-lg text-gray-300 mb-6">
                            Feel free to reach out to me for collaborations or
                            opportunities
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.a
                                href="mailto:kshitijgaikwad142004@gmail.com"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold shadow-lg shadow-purple-500/50"
                            >
                                <Mail size={20} />
                                Email Me
                            </motion.a>

                            <motion.a
                                href="https://drive.google.com/drive/folders/1JUp7bNK8kMkDbtiGAu0sO6W7LJmN0DMj"
                                target="_blank"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-purple-500 rounded-full text-white font-semibold hover:bg-purple-500/10"
                            >
                                <ExternalLink size={20} />
                                View Resume
                            </motion.a>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};
export default Contact;
