"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function EditProject({ params }) {
  const router = useRouter();
  const { id } = use(params);

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Data State
  const [formData, setFormData] = useState({
    title: "",
    city: "",
    projectType: "Residential",
    shortDescription: "",
    fullDescription: "",
    inverter: "",
    batteries: "",
    panels: "",
    systemType: "",
  });

  const [coverPreview, setCoverPreview] = useState(null);
  const [existingCover, setExistingCover] = useState(null); // The URL of the existing cover
  const [newCoverFile, setNewCoverFile] = useState(null); // The file object for new cover

  const [galleryPreviews, setGalleryPreviews] = useState([]); // { type: 'url'|'file', src: string, file?: File }

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${id}`);
        const data = await res.json();

        if (data.error) {
          toast.error(data.error);
          return;
        }

        setFormData({
          title: data.title || "",
          city: data.city || "",
          projectType: data.projectType || "Residential",
          shortDescription: data.shortDescription || "",
          fullDescription: data.fullDescription || "",
          inverter: data.systemInfo?.inverter || "",
          batteries: data.systemInfo?.batteries || "",
          panels: data.systemInfo?.panels || "",
          systemType: data.systemInfo?.systemType || "",
        });

        if (data.coverImage) {
          setExistingCover(data.coverImage);
          setCoverPreview(data.coverImage);
        }

        if (data.galleryImages && Array.isArray(data.galleryImages)) {
          setGalleryPreviews(
            data.galleryImages.map((url) => ({ type: "url", src: url })),
          );
        }
      } catch (error) {
        console.error("Failed to fetch project", error);
        toast.error("Failed to load project details");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCoverChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewCoverFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files || []);

    if (galleryPreviews.length + files.length > 4) {
      toast.error("You can maintain maximum 4 images in gallery");
      e.target.value = "";
      return;
    }

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGalleryPreviews((prev) => [
          ...prev,
          { type: "file", src: reader.result, file },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeGalleryImage = (index) => {
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setUpdating(true);

    const submitData = new FormData();
    submitData.append("title", formData.title);
    submitData.append("city", formData.city);
    submitData.append("projectType", formData.projectType);
    submitData.append("shortDescription", formData.shortDescription);
    submitData.append("fullDescription", formData.fullDescription);
    submitData.append("inverter", formData.inverter);
    submitData.append("batteries", formData.batteries);
    submitData.append("panels", formData.panels);
    submitData.append("systemType", formData.systemType);

    // Context for Cover Image
    // If newCoverFile exists, send it as 'coverImage'.
    // If not, send 'existingCoverImage' with the URL.
    if (newCoverFile) {
      submitData.append("coverImage", newCoverFile);
    } else if (existingCover) {
      submitData.append("existingCoverImage", existingCover);
    }

    // Context for Gallery Images
    // galleryPreviews contains both existing URLs and new Files.
    // For existing URLs, append to 'existingGalleryImages'.
    // For new Files, append to 'galleryImages'.
    galleryPreviews.forEach((item) => {
      if (item.type === "url") {
        submitData.append("existingGalleryImages", item.src);
      } else if (item.type === "file") {
        submitData.append("galleryImages", item.file);
      }
    });

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        body: submitData,
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Project Updated Successfully!");
        router.push("/admin/projects");
        router.refresh();
      } else {
        toast.error(data.error || "Update failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setUpdating(false);
    }
  }

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Edit Project
          </h1>
          <p className="text-gray-600 mt-2">Update the project details</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Cover Image */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Cover Image
              </label>
              <div className="flex items-center gap-4">
                <label htmlFor="coverInput" className="cursor-pointer">
                  {coverPreview ? (
                    <div className="relative group">
                      <img
                        src={coverPreview}
                        alt="Cover preview"
                        className="h-32 w-48 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition rounded-lg text-white font-medium">
                        Change
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-5 border-2 border-dashed border-gray-300 p-4 rounded-lg">
                      <img
                        src="/images/upload_area.png"
                        alt=""
                        className="w-10 h-10 opacity-50"
                      />
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Project Title
                </label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter project title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  City
                </label>
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Enter city"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Project Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Project Type
                </label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  System Type
                </label>
                <input
                  name="systemType"
                  value={formData.systemType}
                  onChange={handleInputChange}
                  placeholder="e.g. Hybrid (On-grid + Battery)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Descriptions */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Short Description
              </label>
              <textarea
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleInputChange}
                placeholder="Brief summary"
                rows="2"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Description
              </label>
              <textarea
                name="fullDescription"
                value={formData.fullDescription}
                onChange={handleInputChange}
                placeholder="Detailed description"
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            {/* System Info */}
            <h3 className="text-xl font-bold text-gray-800 pt-4 border-t">
              System Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Inverter
                </label>
                <input
                  name="inverter"
                  value={formData.inverter}
                  onChange={handleInputChange}
                  placeholder="e.g. Huawei Sun2000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Batteries
                </label>
                <input
                  name="batteries"
                  value={formData.batteries}
                  onChange={handleInputChange}
                  placeholder="e.g. Narada Lithium-Ion"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Panels
                </label>
                <input
                  name="panels"
                  value={formData.panels}
                  onChange={handleInputChange}
                  placeholder="e.g. Longi Hi-MO 6"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Gallery Images */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Gallery Images
              </label>
              <div className="flex flex-col gap-4">
                <label htmlFor="galleryInput" className="cursor-pointer w-fit">
                  <div className="flex items-center gap-5 border-2 border-dashed border-gray-300 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
                    <span className="text-blue-600 font-semibold">
                      + Add Images
                    </span>
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
                  {galleryPreviews.map((item, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={item.src}
                        alt={`Gallery ${index}`}
                        className="h-20 w-20 object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={updating}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-blue-400"
            >
              {updating ? "Updating..." : "Update Project"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
