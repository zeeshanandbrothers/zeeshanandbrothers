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
            whileHover={{ y: -8 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="group relative cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-card/60 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/20"
            onClick={onClick}
        >
            {/* Image Container with Zoom */}
            <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Dynamic Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 transition-all duration-500 group-hover:opacity-80" />

                {/* Type Badge - Glassmorphism */}
                <div className="absolute left-4 top-4 overflow-hidden rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
                    {project.projectType}
                </div>

                {/* City Badge - Floating */}
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white/90">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{project.city}</span>
                </div>
            </div>

            {/* Content */}
            <div className="relative p-6">
                <h3 className="mb-3 text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                    {project.title}
                </h3>

                <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {project.shortDescription}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-border/40 pt-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary/80">View Case Study</span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/30">
                        <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
