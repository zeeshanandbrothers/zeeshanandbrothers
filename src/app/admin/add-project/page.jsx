"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AddProject() {
    const [loading, setLoading] = useState(false);
    const [coverPreview, setCoverPreview] = useState(null);
    const [galleryPreviews, setGalleryPreviews] = useState([]);

    const handleCoverChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCoverPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGalleryChange = (e) => {
        const files = Array.from(e.target.files || []);
        const newPreviews = [];

        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setGalleryPreviews(prev => [...prev, reader.result]);
            };
            reader.readAsDataURL(file);
        });
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        if (!coverPreview) {
            toast.error("Please upload a cover image");
            setLoading(false);
            return;
        }

        const formData = new FormData(e.target);

        // Explicitly handle file inputs if needed, but FormData usually catches them
        // Testing will confirm.

        const res = await fetch("/api/projects", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        setLoading(false);

        if (data.success) {
            toast.success("Project Added Successfully!");
            e.target.reset();
            setCoverPreview(null);
            setGalleryPreviews([]);
        } else {
            toast.error(data.error || "Something went wrong");
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
            <div className="mx-auto max-w-4xl">
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                        Add New Project
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Fill in the project details below
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-8">
                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* Cover Image */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image</label>
                            <div className="flex items-center gap-4">
                                <label htmlFor="coverInput" className="cursor-pointer">
                                    {coverPreview ? (
                                        <div className="relative">
                                            <img
                                                src={coverPreview}
                                                alt="Cover preview"
                                                className="h-32 w-48 object-cover rounded-lg"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-5 border-2 border-dashed border-gray-300 p-4 rounded-lg">
                                            <img src="/images/upload_area.png" alt="" className="w-10 h-10 opacity-50" />
                                            <p className="text-gray-600 font-semibold text-md">
                                                Upload cover picture
                                            </p>
                                        </div>
                                    )}
                                </label>
                                <input
                                    type="file"
                                    name="coverImage"
                                    accept="image/*"
                                    onChange={handleCoverChange}
                                    className="hidden"
                                    id="coverInput"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Project Title</label>
                                <input
                                    name="title"
                                    placeholder="Enter project title"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            {/* City */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                                <input
                                    name="city"
                                    placeholder="Enter city"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            {/* Project Type */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Project Type</label>
                                <select
                                    name="projectType"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    required
                                >
                                    <option value="Residential">Residential</option>
                                    <option value="Commercial">Commercial</option>
                                    <option value="Agricultural">Agricultural</option>
                                    <option value="Industrial">Industrial</option>
                                </select>
                            </div>

                            {/* System Type */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">System Type</label>
                                <input
                                    name="systemType"
                                    placeholder="e.g. Hybrid (On-grid + Battery)"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* Descriptions */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Short Description</label>
                            <textarea
                                name="shortDescription"
                                placeholder="Brief summary"
                                rows="2"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Description</label>
                            <textarea
                                name="fullDescription"
                                placeholder="Detailed description"
                                rows="4"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {/* System Info */}
                        <h3 className="text-xl font-bold text-gray-800 pt-4 border-t">System Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Inverter</label>
                                <input
                                    name="inverter"
                                    placeholder="e.g. Huawei Sun2000"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Batteries</label>
                                <input
                                    name="batteries"
                                    placeholder="e.g. Narada Lithium-Ion"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Panels</label>
                                <input
                                    name="panels"
                                    placeholder="e.g. Longi Hi-MO 6"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* Gallery Images */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Gallery Images</label>
                            <div className="flex flex-col gap-4">
                                <label htmlFor="galleryInput" className="cursor-pointer w-fit">
                                    <div className="flex items-center gap-5 border-2 border-dashed border-gray-300 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
                                        <span className="text-blue-600 font-semibold">+ Add Images</span>
                                    </div>
                                </label>
                                <input
                                    type="file"
                                    name="galleryImages"
                                    accept="image/*"
                                    multiple
                                    onChange={handleGalleryChange}
                                    className="hidden"
                                    id="galleryInput"
                                />

                                {/* Previews */}
                                <div className="flex flex-wrap gap-4 mt-2">
                                    {galleryPreviews.map((src, index) => (
                                        <div key={index} className="relative">
                                            <img src={src} alt={`Gallery ${index}`} className="h-20 w-20 object-cover rounded-lg border" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-blue-400"
                        >
                            {loading ? "Uploading..." : "Add Project"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
