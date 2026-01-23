"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import RevealOnScroll from "../Layout/Reveal_on_scroll";
import ProjectCard from "../Projects/ProjectCard";
import ProjectDialog from "../Projects/ProjectDialog";
import { ArrowRight } from "lucide-react";

const InstalledProjects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

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
      }
    };
    fetchProjects();
  }, []);

  // Show only first 3 featured projects
  const featuredProjects = projects.slice(0, 3);

  if (loading)
    return <div className="py-24 text-center">Loading Projects...</div>;

  return (
    <section className="bg-muted/10 py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <RevealOnScroll>
            <h2 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl">
              Installed Projects
            </h2>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
              Explore our portfolio of premium solar installations across
              residential and commercial sectors.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <Link
              href="/projects"
              className="hidden items-center gap-2 rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground md:inline-flex"
            >
              View All Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </RevealOnScroll>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <RevealOnScroll key={project._id || project.id} delay={index * 0.1}>
              <ProjectCard
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            </RevealOnScroll>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            View All Projects
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
