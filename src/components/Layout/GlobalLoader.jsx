"use client";

import React from "react";
import Image from "next/image";
import { useLoading } from "../../context/LoadingContext";
import { motion, AnimatePresence } from "framer-motion";

const GlobalLoader = () => {
    const { showLoader } = useLoading();

    return (
        <AnimatePresence>
            {showLoader && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
                >
                    <div className="relative flex flex-col items-center gap-8">
                        {/* Logo container with float animation */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                                y: [0, -10, 0]
                            }}
                            transition={{
                                scale: { duration: 0.5 },
                                opacity: { duration: 0.5 },
                                y: {
                                    repeat: Infinity,
                                    duration: 2,
                                    ease: "easeInOut"
                                }
                            }}
                            className="relative h-32 w-48"
                        >
                            <Image
                                src="/images/logo.png"
                                alt="Zeeshan and Brothers"
                                fill
                                className="object-contain"
                                priority
                            />
                        </motion.div>

                        {/* Custom Modern Loader */}
                        <div className="flex flex-col items-center gap-4">
                            <div className="relative h-1 w-48 overflow-hidden rounded-full bg-muted">
                                <motion.div
                                    initial={{ left: "-100%" }}
                                    animate={{ left: "100%" }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 1.5,
                                        ease: "easeInOut",
                                    }}
                                    className="absolute top-0 h-full w-full bg-primary"
                                />
                            </div>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0.4, 1, 0.4] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="text-sm font-medium tracking-widest text-muted-foreground uppercase"
                            >
                                Initializing Experience
                            </motion.p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default GlobalLoader;
