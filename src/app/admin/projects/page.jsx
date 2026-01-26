"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Trash2, Plus, Eye, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/Loader";

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

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

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Projects
            </h1>
            <p className="text-gray-600 mt-1">Manage your installed projects</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                className="pl-10 pr-4 py-2 w-full border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Link
              href="/admin/add-project"
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-sm whitespace-nowrap"
            >
              <Plus className="w-5 h-5" />
              Add Project
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border">
                <th className="p-4 font-semibold text-gray-600 border">
                  Image
                </th>
                <th className="p-4 font-semibold text-gray-600 border">
                  Title
                </th>
                <th className="p-4 font-semibold text-gray-600 border">Type</th>
                <th className="p-4 font-semibold text-gray-600 border">City</th>
                <th className="p-4 font-semibold text-gray-600 border">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">
                    No projects found.
                  </td>
                </tr>
              ) : projects.filter((p) => p.title.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">
                    No projects matching "{searchTerm}" found.
                  </td>
                </tr>
              ) : (
                projects
                  .filter((project) =>
                    project.title.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((project) => (
                    <tr key={project._id} className="border hover:bg-gray-50">
                      <td className="p-2 border">
                        <img
                          src={project.coverImage}
                          alt={project.title}
                          className="w-16 h-12 object-cover rounded"
                        />
                      </td>
                      <td className="p-2 font-medium text-gray-800 border">
                        {project.title}
                      </td>
                      <td className="p-2 text-gray-600 border">
                        {project.projectType}
                      </td>
                      <td className="p-2 text-gray-600 border">{project.city}</td>
                      <td className="p-2 border flex flex-col gap-2">
                        <button
                          className="bg-blue-500 text-white px-2 py-1 rounded cursor-pointer"
                          onClick={() => {
                            router.push(`/admin/edit-project/${project._id}`);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer"
                          onClick={() => {
                            setDeleteId(project._id);
                            setShowDeleteModal(true);
                          }}
                          title="Delete"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
          {/* delete model */}
          {showDeleteModal && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded w-full max-w-sm">
                <h3 className="text-lg font-bold mb-3">Confirm Delete</h3>
                <p className="mb-5">
                  Are you sure you want to delete this project?
                </p>

                <div className="flex justify-end gap-3">
                  <button
                    className="px-4 py-2 bg-gray-300 rounded cursor-pointer"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Cancel
                  </button>

                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded cursor-pointer"
                    onClick={() => {
                      handleDelete(deleteId);
                      setShowDeleteModal(false);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
