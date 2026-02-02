"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { X, Battery, Zap, Sun, Server, MapPin } from "lucide-react";

const ProjectDialog = ({ project, isOpen, onClose }) => {
    const [activeImage, setActiveImage] = useState(null);

    // Set the initial active image when project opens
    useEffect(() => {
        if (project) setActiveImage(project.coverImage);
    }, [project]);

    // Prevent body scroll when dialog is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Dialog */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl border border-border bg-background shadow-2xl flex flex-col"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute right-4 top-4 z-20 rounded-full bg-black/20 p-2 text-white transition-colors hover:bg-black/40"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            {/* Scrollable Content */}
                            <div className="flex-1 overflow-y-auto">
                                <div className="grid gap-0 md:grid-cols-2 h-full">
                                    {/* Visual Side */}
                                    <div className="bg-muted/30 p-6 md:p-8 flex-shrink-0">
                                        {/* Main Image */}
                                        <div className="relative aspect-square w-full max-h-[300px] overflow-hidden rounded-xl shadow-md">
                                            <Image
                                                src={activeImage || project.coverImage}
                                                alt={project.title}
                                                fill
                                                className="object-cover transition-transform duration-500 "
                                            />
                                        </div>

                                        {/* Gallery */}
                                        {project.galleryImages?.length > 0 && (
                                            <div className="mt-4 grid grid-cols-4 gap-2">
                                                {project.galleryImages.map((img, idx) => (
                                                    <div
                                                        key={idx}
                                                        onClick={() => setActiveImage(img)}
                                                        className={`relative aspect-square overflow-hidden rounded-lg border cursor-pointer transition-all ${activeImage === img
                                                            ? "ring-2 ring-primary border-primary"
                                                            : "border-border/50 hover:opacity-80"
                                                            }`}
                                                    >
                                                        <Image
                                                            src={img}
                                                            alt={`Gallery ${idx}`}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Content Side */}
                                    <div className="flex flex-col p-6 md:p-8">
                                        {/* Location & Type */}
                                        <div className="mb-1 flex items-center gap-2 text-sm font-medium text-primary">
                                            <MapPin className="h-4 w-4" />
                                            {project.city} • {project.projectType}
                                        </div>

                                        {/* Project Title */}
                                        <h2 className="mb-4 text-2xl font-bold md:text-3xl text-foreground">
                                            {project.title}
                                        </h2>

                                        {/* Description */}
                                        <p className="mb-6 text-base text-muted-foreground/90 leading-relaxed">
                                            {project.fullDescription}
                                        </p>

                                        {/* System Specifications */}
                                        {project.systemInfo && (
                                            <div className="mt-auto rounded-xl border border-border/60 bg-card">
                                                <div className="p-4">
                                                    <span className="font-semibold text-foreground">
                                                        System Specifications
                                                    </span>
                                                </div>
                                                <div className="grid gap-3 p-4 pt-0 text-sm">
                                                    {project.systemInfo.inverter && (
                                                        <InfoRow
                                                            icon={<Zap className="h-4 w-4" />}
                                                            label="Inverter"
                                                            value={project.systemInfo.inverter}
                                                        />
                                                    )}
                                                    {project.systemInfo.batteries && (
                                                        <InfoRow
                                                            icon={<Battery className="h-4 w-4" />}
                                                            label="Battery"
                                                            value={project.systemInfo.batteries}
                                                        />
                                                    )}
                                                    {project.systemInfo.panels && (
                                                        <InfoRow
                                                            icon={<Sun className="h-4 w-4" />}
                                                            label="Panels"
                                                            value={project.systemInfo.panels}
                                                        />
                                                    )}
                                                    {project.systemInfo.systemType && (
                                                        <InfoRow
                                                            icon={<Server className="h-4 w-4" />}
                                                            label="Type"
                                                            value={project.systemInfo.systemType}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

// Info Row Component
const InfoRow = ({ icon, label, value }) => (
    <div className="flex items-center gap-3 text-muted-foreground">
        <div className="flex-shrink-0 text-primary">{icon}</div>
        <div className="flex-1">
            <span className="mr-2 font-medium text-foreground">{label}:</span>
            {value || "N/A"}
        </div>
    </div>
);

export default ProjectDialog;
