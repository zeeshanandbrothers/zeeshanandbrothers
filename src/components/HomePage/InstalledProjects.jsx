"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import RevealOnScroll from "../Layout/Reveal_on_scroll";
import ProjectCard from "../Projects/ProjectCard";
import ProjectDialog from "../Projects/ProjectDialog";
import { ArrowRight } from "lucide-react";
import { useLoading } from "../../context/LoadingContext";

const InstalledProjects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setIsProjectsLoaded } = useLoading();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        if (Array.isArray(data)) {
          setProjects(data);
        }
      } catch (error) {
        console.error("Failed to load projects", error);
      } finally {
        setLoading(false);
        setIsProjectsLoaded(true);
      }
    };
    fetchProjects();
  }, []);

  // Show only first 3 featured projects
  const featuredProjects = projects.slice(0, 3);

  if (loading)
    return <div className="py-24 text-center">Loading Projects...</div>;

  return (
    <section className="relative overflow-hidden bg-muted/5 py-24 md:py-32">
      {/* Decorative Background Elements */}
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-dot-primary opacity-100 mask-radial pointer-events-none" />
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-6xl px-4 relative z-10">
        {/* Header */}
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <RevealOnScroll className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-12 bg-primary/40" />
              <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary/60">Success Stories</span>
            </div>
            <h2 className="text-4xl font-black leading-tight tracking-tighter md:text-5xl lg:text-6xl text-gradient-primary">
              Installed Projects
            </h2>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
              Explore our portfolio of premium solar installations across
              residential and commercial sectors.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <Link
              href="/projects"
              className="group hidden items-center gap-3 rounded-2xl bg-primary px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-primary/90 hover:scale-105 active:scale-95 shadow-xl shadow-primary/20 md:inline-flex"
            >
              View Portfolio
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </RevealOnScroll>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <RevealOnScroll key={project._id || project.id} delay={index * 0.15}>
              <ProjectCard
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            </RevealOnScroll>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-12 text-center md:hidden">
          <Link
            href="/projects"
            className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-primary px-8 py-4 text-sm font-bold text-white shadow-xl shadow-primary/20"
          >
            Explore Projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Detail Dialog */}
      <ProjectDialog
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default InstalledProjects;
