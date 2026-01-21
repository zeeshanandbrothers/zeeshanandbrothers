"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";

const ProjectCard = ({ project, onClick }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border/40 bg-card shadow-sm hover:shadow-md"
            onClick={onClick}
        >
            {/* Image Container */}
            <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />

                {/* Type Badge */}
                <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-black backdrop-blur-sm">
                    {project.projectType}
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{project.city}</span>
                </div>

                <h3 className="mb-2 text-lg font-bold leading-tight text-foreground group-hover:text-primary">
                    {project.title}
                </h3>

                <p className="line-clamp-2 text-sm text-muted-foreground">
                    {project.shortDescription}
                </p>

                <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-primary">
                    View Details
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
