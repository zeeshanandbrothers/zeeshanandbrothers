"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { projects } from "../../data/projects";
import ProjectCard from "../../components/Projects/ProjectCard";
import ProjectDialog from "../../components/Projects/ProjectDialog";

export default function ProjectsPage() {
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <main className="min-h-screen bg-background pb-20 pt-24 md:pt-32">
            <div className="mx-auto max-w-7xl px-4 md:px-6">
                {/* Header */}
                <div className="mb-12 md:mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl font-bold tracking-tight md:text-5xl"
                    >
                        Our Installed Projects
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mt-4 max-w-2xl text-lg text-muted-foreground"
                    >
                        Discover our portfolio of successful solar installations. From residential rooftops to large-scale industrial systems, we deliver excellence in every project.
                    </motion.p>
                </div>

                {/* Projects Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <ProjectCard
                                project={project}
                                onClick={() => setSelectedProject(project)}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Detail Dialog */}
            <ProjectDialog
                project={selectedProject}
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </main>
    );
}
