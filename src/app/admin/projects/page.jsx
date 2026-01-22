"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Trash2, Plus, Eye } from "lucide-react";

export default function AdminProjects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProjects = async () => {
        try {
            const res = await fetch("/api/projects");
            const data = await res.json();
            if (Array.isArray(data)) {
                setProjects(data);
            }
        } catch (error) {
            console.error("Failed to fetch projects", error);
            toast.error("Failed to load projects");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this project?")) return;

        try {
            const res = await fetch(`/api/projects/${id}`, {
                method: "DELETE",
            });
            const data = await res.json();

            if (data.success) {
                toast.success("Project deleted successfully");
                fetchProjects(); // Refresh list
            } else {
                toast.error(data.error || "Failed to delete");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error deleting project");
        }
    };

    if (loading) return <div className="p-8 text-center">Loading projects...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mx-auto max-w-6xl">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                            Projects
                        </h1>
                        <p className="text-gray-600 mt-1">Manage your installed projects</p>
                    </div>
                    <Link
                        href="/admin/add-project"
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        <Plus className="w-5 h-5" />
                        Add Project
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100 border-b">
                                <th className="p-4 font-semibold text-gray-600">Image</th>
                                <th className="p-4 font-semibold text-gray-600">Title</th>
                                <th className="p-4 font-semibold text-gray-600">Type</th>
                                <th className="p-4 font-semibold text-gray-600">City</th>
                                <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-gray-500">
                                        No projects found.
                                    </td>
                                </tr>
                            ) : (
                                projects.map((project) => (
                                    <tr key={project._id} className="border-b hover:bg-gray-50">
                                        <td className="p-4">
                                            <img
                                                src={project.coverImage}
                                                alt={project.title}
                                                className="w-16 h-12 object-cover rounded"
                                            />
                                        </td>
                                        <td className="p-4 font-medium text-gray-800">{project.title}</td>
                                        <td className="p-4 text-gray-600">{project.projectType}</td>
                                        <td className="p-4 text-gray-600">{project.city}</td>
                                        <td className="p-4 text-right">
                                            <Link
                                                href={`/admin/edit-project/${project._id}`}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition inline-block mr-2"
                                                title="Edit"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(project._id)}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition inline-block"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
