"use client";
import { useState } from "react";

export default function AddProduct() {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("panel");
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (!imagePreview) {
      alert("Please upload an image");
      setLoading(false);
      return;
    }
    const formData = new FormData(e.target);

    const res = await fetch("/api/products", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setLoading(false);
    console.log(data);
    alert("Product Added!");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className=" mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Add New Product
          </h1>
          <p className="text-gray-600 mt-2">
            Fill in the product details below
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="">
              <div className="flex items-center gap-4">
                <label htmlFor="imageInput" className="cursor-pointer">
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Product preview"
                        className="h-32 w-32 object-cover rounded-lg"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-5">
                      <img src="/images/upload_area.png" alt="" />
                      <p className="text-gray-600 font-semibold text-md max-w-[140px]">
                        Upload product picture
                      </p>
                    </div>
                  )}
                </label>

                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="imageInput"
                />
              </div>
            </div>
            {/* Product Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Name
              </label>
              <input
                name="name"
                placeholder="Enter product name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            {/* Description - Full width */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Description
              </label>
              <textarea
                name="description"
                placeholder="Write about your product"
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Brand */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Brand
                </label>
                <input
                  name="brand"
                  placeholder="Enter brand name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price
                </label>
                <input
                  name="price"
                  placeholder="Enter price"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Stock */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Stock
                </label>
                <input
                  name="stock"
                  placeholder="Enter stock quantity"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="panel">Solar Panel</option>
                  <option value="inverter">Inverter</option>
                  <option value="battery">Battery</option>
                  <option value="accessory">Accessory</option>
                </select>
              </div>
            </div>

            {category !== "accessory" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Watt
                  </label>
                  <input
                    name="watt"
                    placeholder="Enter watt"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Actual Watt
                  </label>
                  <input
                    name="actualWatt"
                    placeholder="Enter actual watt"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Inverter fields */}
            {category === "inverter" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    System Type
                  </label>
                  <select
                    name="systemType"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Select system type</option>
                    <option value="ongrid">OnGrid</option>
                    <option value="offgrid">OffGrid</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phase
                  </label>
                  <select
                    name="phase"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Select phase</option>
                    <option value="single">Single</option>
                    <option value="three">Three</option>
                  </select>
                </div>
              </div>
            )}

            {/* Battery fields */}
            {category === "battery" && (
              <div className="">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Battery AH
                </label>
                <input
                  name="Ah"
                  placeholder="Enter battery AH"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-blue-400"
            >
              {loading ? "Uploading..." : "Add Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
