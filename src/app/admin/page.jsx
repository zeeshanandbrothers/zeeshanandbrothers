"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProductListing() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("panel"); // ⭐ DEFAULT SOLAR PANEL
  const [editProduct, setEditProduct] = useState(null);
  console.log("editProduct", editProduct);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [originalValues, setOriginalValues] = useState({});
  const [isDirty, setIsDirty] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchProducts(category);
  }, [category]);

  async function fetchProducts(cat) {
    const res = await fetch(`/api/products?category=${cat}`);
    const productsdata = await res.json();
    setProducts(productsdata);
  }

  async function handleUpdate(id, formData) {
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      body: formData,
    });

    const updatedData = await res.json();

    if (updatedData._id) {
      toast.success("Product Updated successfully!");
      fetchProducts(category);
      setEditProduct(null);
    } else {
      toast.error("Update failed: " + (updatedData.error || "Unknown error"));
    }
  }

  async function handleDelete(id) {
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    if (data.success) fetchProducts(category);
  }

  function handleChange(e) {
    const { name, value, type, files } = e.target;

    let newValue = value;

    if (type === "file" && files?.[0]) {
      newValue = "IMAGE_CHANGED"; // file compare trick
    }

    const updatedValues = {
      ...originalValues,
      [name]: newValue,
    };

    const hasChanged = Object.keys(originalValues).some(
      (key) => String(originalValues[key]) !== String(updatedValues[key])
    );

    setIsDirty(hasChanged);
  }

  // ----------- DYNAMIC COLUMNS BASED ON CATEGORY -----------

  const columns = {
    panel: ["Image", "Name", "Brand", "Price", "Stock", "Watt", "Actual Watt"],
    inverter: [
      "Image",
      "Name",
      "Brand",
      "Price",
      "Stock",
      "Watt",
      "Actual Watt",
      "System Type",
      "Phase",
    ],
    battery: [
      "Image",
      "Name",
      "Brand",
      "Price",
      "Stock",
      "Watt",
      "Actual Watt",
      "AH",
    ],
    accessory: ["Image", "Name", "Brand", "Price", "Stock"],
  };
  const fallbackImages = {
    panel: "/images/solar-fallback.png",
    inverter: "/images/inverter-fallback.png",
    battery: "/images/battery-fallback.png",
  };

  return (
    <div className="p-6">
      {/* CATEGORY DROPDOWN */}
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Products</h1>

        <select
          className="border px-3 py-2 rounded bg-white shadow"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="panel">Solar Panel</option>
          <option value="inverter">Inverter</option>
          <option value="battery">Battery</option>
          <option value="accessory">Accessory</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        {products.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No products found in <strong>{category}</strong> category.
          </div>
        ) : (
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                {columns[category].map((col, i) => (
                  <th key={i} className="p-2 border">
                    {col}
                  </th>
                ))}
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products?.map((p) => (
                <tr key={p._id} className="text-center border">
                  <td className="p-2 border">
                    <img
                      src={p.image || fallbackImages[category]}
                      onError={(e) => {
                        e.currentTarget.src = fallbackImages[category];
                      }}
                      className="h-12 mx-auto"
                      alt={p.name}
                    />
                  </td>

                  <td className="p-2 border">{p.name}</td>
                  <td className="p-2 border">{p.brand}</td>
                  <td className="p-2 border">{p.price}</td>
                  <td className="p-2 border">{p.stock}</td>

                  {category !== "accessory" && (
                    <>
                      <td className="p-2 border">{p.watt}</td>
                      <td className="p-2 border">{p.actualWatt}</td>
                    </>
                  )}

                  {category === "inverter" && (
                    <>
                      <td className="p-2 border">{p.systemType}</td>
                      <td className="p-2 border">{p.phase}</td>
                    </>
                  )}

                  {category === "battery" && (
                    <td className="p-2 border">{p.Ah}</td>
                  )}

                  {/* ACTIONS */}
                  <td className="p-2 border flex flex-col gap-2">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded cursor-pointer"
                      onClick={() => {
                        setEditProduct(p);
                        setImagePreview(p.image);

                        setOriginalValues({
                          name: p.name ?? "",
                          price: String(p.price ?? ""),
                          stock: String(p.stock ?? ""),
                          watt: String(p.watt ?? ""),
                          actualWatt: String(p.actualWatt ?? ""),
                          systemType: p.systemType ?? "",
                          phase: p.phase ?? "",
                          Ah: String(p.Ah ?? ""),
                          image: p.image ?? "",
                        });

                        setIsDirty(false);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer"
                      onClick={() => {
                        setDeleteId(p._id);
                        setShowDeleteModal(true);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* delete model */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-sm">
            <h3 className="text-lg font-bold mb-3">Confirm Delete</h3>
            <p className="mb-5">
              Are you sure you want to delete this product?
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

      {/* Edit Form Modal */}
      {editProduct && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="max-h-[500px] overflow-y-auto  bg-white p-6 w-full max-w-lg rounded relative">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>

            <button
              className="absolute top-2 right-3 cursor-pointer"
              onClick={() => setEditProduct(null)}
            >
              X
            </button>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setIsUpdating(true);
                const formData = new FormData(e.target);
                await handleUpdate(editProduct._id, formData);

                setIsUpdating(false);
              }}
              className="space-y-3"
            >
              {/* IMAGE PREVIEW */}
              <label className="block font-semibold">Image</label>
              <div
                className="w-32 h-32 border rounded overflow-hidden cursor-pointer"
                onClick={() => document.getElementById("imageInput").click()}
              >
                <img
                  src={imagePreview}
                  className="w-full h-full object-cover"
                />
              </div>

              <input
                type="file"
                id="imageInput"
                name="image"
                className="hidden"
                disabled={isUpdating}
                onChange={(e) => {
                  handleChange(e);

                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => setImagePreview(reader.result);
                    reader.readAsDataURL(file);
                  }
                }}
              />

              {/* NAME */}
              <label className="block font-semibold">Name</label>
              <input
                type="text"
                name="name"
                defaultValue={editProduct.name}
                className="border p-2 w-full"
                disabled={isUpdating}
                onChange={handleChange}
              />

              {/* PRICE */}
              <label className="block font-semibold">Price</label>
              <input
                type="number"
                name="price"
                defaultValue={editProduct.price}
                className="border p-2 w-full"
                disabled={isUpdating}
                onChange={handleChange}
              />

              {/* STOCK */}
              <label className="block font-semibold">Stock</label>
              <input
                type="number"
                name="stock"
                defaultValue={editProduct.stock}
                className="border p-2 w-full"
                disabled={isUpdating}
                onChange={handleChange}
              />

              {/* WATT + ACTUAL WATT */}
              {(editProduct.category === "panel" ||
                editProduct.category === "inverter" ||
                editProduct.category === "battery") && (
                <>
                  <label className="block font-semibold">Watt</label>
                  <input
                    type="number"
                    name="watt"
                    defaultValue={editProduct.watt || ""}
                    className="border p-2 w-full"
                    disabled={isUpdating}
                    onChange={handleChange}
                  />

                  <label className="block font-semibold">Actual Watt</label>
                  <input
                    type="number"
                    name="actualWatt"
                    defaultValue={editProduct.actualWatt || ""}
                    className="border p-2 w-full"
                    disabled={isUpdating}
                    onChange={handleChange}
                  />
                </>
              )}

              {/* INVERTER FIELDS */}
              {editProduct.category === "inverter" && (
                <>
                  <label className="block font-semibold">System Type</label>
                  <select
                    name="systemType"
                    defaultValue={editProduct.systemType || ""}
                    className="border p-2 w-full"
                    disabled={isUpdating}
                    onChange={handleChange}
                  >
                    <option value="">Select Type</option>
                    <option value="ongrid">OnGrid</option>
                    <option value="offgrid">OffGrid</option>
                    <option value="hybrid">Hybrid</option>
                  </select>

                  <label className="block font-semibold">Phase</label>
                  <select
                    name="phase"
                    defaultValue={editProduct.phase || ""}
                    className="border p-2 w-full"
                    disabled={isUpdating}
                    onChange={handleChange}
                  >
                    <option value="">Select Phase</option>
                    <option value="single">Single</option>
                    <option value="three">Three</option>
                  </select>
                </>
              )}

              {/* BATTERY FIELDS */}
              {editProduct.category === "battery" && (
                <>
                  <label className="block font-semibold">Battery AH</label>
                  <input
                    type="number"
                    name="Ah"
                    defaultValue={editProduct.Ah || ""}
                    className="border p-2 w-full"
                    disabled={isUpdating}
                    onChange={handleChange}
                  />
                </>
              )}

              {/* BUTTON */}
              <button
                type="submit"
                disabled={isUpdating || !isDirty}
                className={`w-full py-2 rounded mt-2 text-white cursor-pointer ${
                  isUpdating || !isDirty ? "bg-blue-200" : "bg-blue-600"
                }`}
              >
                {isUpdating ? "Updating..." : "Update"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
