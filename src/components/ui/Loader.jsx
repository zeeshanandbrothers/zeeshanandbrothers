"use client";

import { motion } from "framer-motion";

/**
 * Global Loader Component
 * @param {string} variant - 'page' (full-screen), 'block' (centered in parent), 'inline' (small spinner)
 * @param {string} text - Optional loading text
 * @param {string} size - 'sm', 'md', 'lg'
 * @param {string} color - Tailwind color class for the spinner (default: primary)
 */
const Loader = ({
    variant = "block",
    text = "",
    size = "md",
    color = "text-primary"
}) => {
    const sizeClasses = {
        sm: "h-5 w-5 border-2",
        md: "h-8 w-8 border-4",
        lg: "h-12 w-12 border-4",
    };

    const spinner = (
        <motion.div
            animate={{ rotate: 360 }}
            transition={{
                repeat: Infinity,
                duration: 1,
                ease: "linear"
            }}
            className={`${sizeClasses[size]} rounded-full border-current border-t-transparent ${color}`}
        />
    );

    const content = (
        <div className="flex flex-col items-center justify-center gap-4">
            {spinner}
            {text && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm font-medium text-muted-foreground animate-pulse"
                >
                    {text}
                </motion.p>
            )}
        </div>
    );

    if (variant === "page") {
        return (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-sm">
                {content}
            </div>
        );
    }

    if (variant === "block") {
        return (
            <div className="flex min-h-[200px] w-full items-center justify-center py-12">
                {content}
            </div>
        );
    }

    return spinner;
};

export default Loader;
