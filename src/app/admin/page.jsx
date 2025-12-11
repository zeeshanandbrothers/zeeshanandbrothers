"use client";

import { useEffect, useState } from "react";

export default function ProductListing() {
  const [products, setProducts] = useState([]);
  console.log("products", products);
  const [loading, setLoading] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  }

  async function handleUpdate(id, formData) {
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT", // ya PATCH agar server me PATCH hai
      body: formData,
    });

    const data = await res.json();

    if (data._id) {
      alert("Updated successfully!");
      fetchProducts(); // refresh list
      setEditProduct(null); // close modal
    } else {
      alert("Update failed: " + (data.error || "Unknown error"));
    }
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this product?")) return;
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) fetchProducts();
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="text-center border">
                <td className="p-2 border">
                  <img src={p.image} className="h-12 mx-auto" />
                </td>
                <td className="p-2 border">{p.name}</td>
                <td className="p-2 border">{p.category}</td>
                <td className="p-2 border">{p.price}</td>
                <td className="p-2 border flex justify-center gap-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => setEditProduct(p)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(p._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Form Modal */}
      {editProduct && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 w-full max-w-lg rounded relative">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
            <button
              className="absolute top-2 right-2"
              onClick={() => setEditProduct(null)}
            >
              X
            </button>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                handleUpdate(editProduct._id, formData); // ✅ direct call like delete
              }}
              className="space-y-2"
            >
              <input
                type="text"
                name="name"
                defaultValue={editProduct.name}
                className="border p-2 w-full"
              />
              <input
                type="number"
                name="price"
                defaultValue={editProduct.price}
                className="border p-2 w-full"
              />
              <input type="file" name="image" className="border p-2 w-full" />
              {(editProduct.category === "panel" ||
                editProduct.category === "inverter" ||
                editProduct.category === "battery") && (
                <>
                  <input
                    type="number"
                    name="watt"
                    defaultValue={editProduct.watt || ""}
                    className="border p-2 w-full"
                    placeholder="Watt"
                  />
                  <input
                    type="number"
                    name="actualWatt"
                    defaultValue={editProduct.actualWatt || ""}
                    className="border p-2 w-full"
                    placeholder="Actual Watt"
                  />
                </>
              )}
              {editProduct.category === "inverter" && (
                <>
                  <select
                    name="systemType"
                    defaultValue={editProduct.systemType || ""}
                    className="border p-2 w-full"
                  >
                    <option value="">System Type</option>
                    <option value="ongrid">OnGrid</option>
                    <option value="offgrid">OffGrid</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                  <select
                    name="phase"
                    defaultValue={editProduct.phase || ""}
                    className="border p-2 w-full"
                  >
                    <option value="">Phase</option>
                    <option value="single">Single</option>
                    <option value="three">Three</option>
                  </select>
                </>
              )}
              {editProduct.category === "battery" && (
                <input
                  type="number"
                  name="Ah"
                  defaultValue={editProduct.Ah || ""}
                  className="border p-2 w-full"
                  placeholder="Battery AH"
                />
              )}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded mt-2"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
