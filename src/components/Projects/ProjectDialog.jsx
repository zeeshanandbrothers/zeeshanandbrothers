"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Battery, Zap, Sun, Server, MapPin, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useMediaQuery } from "../../hooks/use-media-query";

const ProjectDialog = ({ project, isOpen, onClose }) => {
    const [isSystemInfoOpen, setIsSystemInfoOpen] = useState(false);
    const [activeImage, setActiveImage] = useState(null);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    // Set the initial active image when project opens
    useEffect(() => {
        if (project) {
            setActiveImage(project.coverImage);
        }
    }, [project]);

    // Prevent background scrolling when modal is open
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

                    {/* Modal / Sheet Container */}
                    <div className="fixed inset-0 z-50 flex flex-col items-center justify-end md:justify-center pointer-events-none">
                        <motion.div
                            initial={isDesktop ? { opacity: 0, scale: 0.95, y: 20 } : { y: "100%" }}
                            animate={isDesktop ? { opacity: 1, scale: 1, y: 0 } : { y: 0 }}
                            exit={isDesktop ? { opacity: 0, scale: 0.95, y: 20 } : { y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className={`
                pointer-events-auto w-full overflow-hidden bg-background shadow-2xl flex flex-col
                ${isDesktop
                                    ? "max-w-4xl rounded-3xl h-auto max-h-[90vh]"
                                    : "h-[90vh] rounded-t-[24px]"
                                }
              `}
                        >
                            {/* Mobile Drag Handle */}
                            {!isDesktop && (
                                <div className="flex justify-center pt-3 pb-1 flex-shrink-0" onClick={onClose}>
                                    <div className="h-1.5 w-12 rounded-full bg-muted-foreground/20" />
                                </div>
                            )}

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className={`
                  absolute z-20 rounded-full bg-black/20 p-2 text-white transition-colors hover:bg-black/40
                  ${isDesktop ? "right-4 top-4" : "right-4 top-4"}
                `}
                            >
                                <X className="h-5 w-5" />
                            </button>

                            {/* Scrollable Content Container */}
                            <div className="flex-1 overflow-y-auto">
                                <div className="grid gap-0 md:grid-cols-2 h-full">
                                    {/* Visual Side (Left/Top) */}
                                    <div className="bg-muted/30 p-6 md:p-8 flex-shrink-0">
                                        {/* Main Image */}
                                        <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-md cursor-pointer">
                                            <Image
                                                src={activeImage || project.coverImage}
                                                alt={project.title}
                                                fill
                                                className="object-cover transition-all duration-300"
                                            />
                                        </div>

                                        {/* Gallery (Thumbnail Grid) */}
                                        <div className="mt-4 grid grid-cols-4 gap-2">
                                            {project.galleryImages?.map((img, idx) => (
                                                <div
                                                    key={idx}
                                                    onClick={() => setActiveImage(img)}
                                                    className={`relative aspect-square overflow-hidden rounded-lg border cursor-pointer transition-all ${activeImage === img ? "ring-2 ring-primary border-primary" : "border-border/50 hover:opacity-80"
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
                                    </div>

                                    {/* Content Side (Right/Bottom) */}
                                    <div className="flex flex-col p-6 md:p-8">
                                        <div className="mb-1 flex items-center gap-2 text-sm font-medium text-primary">
                                            <MapPin className="h-4 w-4" />
                                            {project.city} • {project.projectType}
                                        </div>

                                        <h2 className="mb-4 text-2xl font-bold md:text-3xl text-foreground">
                                            {project.title}
                                        </h2>

                                        <p className="mb-6 text-base text-muted-foreground/90 leading-relaxed">
                                            {project.fullDescription}
                                        </p>

                                        {/* Expandable System Info */}
                                        <div className="mt-auto rounded-xl border border-border/60 bg-card">
                                            <button
                                                onClick={() => setIsSystemInfoOpen(!isSystemInfoOpen)}
                                                className="flex w-full items-center justify-between p-4 text-left"
                                            >
                                                <span className="font-semibold text-foreground">
                                                    System Specifications
                                                </span>
                                                <ChevronDown
                                                    className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${isSystemInfoOpen ? "rotate-180" : ""}`}
                                                />
                                            </button>

                                            <AnimatePresence>
                                                {isSystemInfoOpen && project.systemInfo && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="grid gap-3 p-4 pt-0 text-sm">
                                                            <InfoRow
                                                                icon={<Zap className="h-4 w-4" />}
                                                                label="Inverter"
                                                                value={project.systemInfo.inverter}
                                                            />
                                                            <InfoRow
                                                                icon={<Battery className="h-4 w-4" />}
                                                                label="Battery"
                                                                value={project.systemInfo.batteries}
                                                            />
                                                            <InfoRow
                                                                icon={<Sun className="h-4 w-4" />}
                                                                label="Panels"
                                                                value={project.systemInfo.panels}
                                                            />
                                                            <InfoRow
                                                                icon={<Server className="h-4 w-4" />}
                                                                label="Type"
                                                                value={project.systemInfo.systemType}
                                                            />
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
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

const InfoRow = ({ icon, label, value }) => (
    <div className="flex items-center gap-3 text-muted-foreground">
        <div className="flex-shrink-0 text-primary">{icon}</div>
        <div className="flex-1">
            <span className="mr-2 font-medium text-foreground">{label}:</span>
            {value}
        </div>
    </div>
);

export default ProjectDialog;
