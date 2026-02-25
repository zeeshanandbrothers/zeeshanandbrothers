"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProjectCard from "../../components/Projects/ProjectCard";
import ProjectDialog from "../../components/Projects/ProjectDialog";
import { Filter } from "lucide-react";
import { useLoading } from "../../context/LoadingContext";

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProjectType, setSelectedProjectType] = useState("all")
  const { setIsProjectsLoaded } = useLoading();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const url =
          selectedProjectType === "all"
            ? "/api/projects"
            : `/api/projects?projectType=${selectedProjectType}`;
        const res = await fetch(url);
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
  }, [selectedProjectType]);

  const projectstype = [
    { id: "all", label: "All Projects" },
    { id: "Agricultural", label: "Agricultural" },
    { id: "Industrial", label: "Industrial" },
    { id: "Residential", label: "Residential" },
    { id: "Commercial", label: "Commercial" },
  ];

  if (loading)
    return (
      <div className="min-h-screen bg-background p-6 text-center pt-32">
        Loading Projects...
      </div>
    );

  return (
    <main className="min-h-screen bg-background py-12 pt-25">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-10 md:mb-12 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
          >
            Our Installed Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto max-w-2xl text-lg text-muted-foreground"
          >
            Discover our portfolio of successful solar installations. From
            residential rooftops to large-scale industrial systems, we deliver
            excellence in every project.
          </motion.p>
        </div>

        {/* ProjectType Filter */}
        <motion.div initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }} className="mb-8 flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Filter className="h-4 w-4" />
            <span>Filter:</span>
          </div>
          {projectstype.map((projectType) => (
            <button
              key={projectType.id}
              onClick={() => setSelectedProjectType(projectType.id)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${selectedProjectType === projectType.id
                ? "bg-primary text-primary-foreground shadow-md"
                : "border border-border bg-card text-foreground hover:border-primary hover:text-primary"
                }`}
            >
              {projectType.label}
            </button>
          ))}
        </motion.div>


        {/* Projects Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map((project, index) => (
            <motion.div
              key={project._id || project.id}
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
