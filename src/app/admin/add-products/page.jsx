"use client";

import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddProductsPage() {
  const router = useRouter();
  const [products] = useState([
    {
      id: 1,
      name: "Solar Panel 400W",
      price: 45000,
      stock: 12,
      status: "Active",
      image: "🔆",
    },
    {
      id: 2,
      name: "Inverter 5KW",
      price: 75000,
      stock: 8,
      status: "Active",
      image: "⚡",
    },
    {
      id: 3,
      name: "Battery 200Ah",
      price: 120000,
      stock: 0,
      status: "Out of Stock",
      image: "🔋",
    },
  ]);

  return (
    <div className="p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-4xl font-bold">Products</h1>
          <p className="text-muted-foreground mt-2">
            Manage your solar products
          </p>
        </div>
        <motion.button
          onClick={() => router.push("/admin/add-product")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </motion.button>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative mb-6"
      >
        <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search products..."
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </motion.div>

      {/* Products Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card border border-border rounded-xl overflow-hidden"
      >
        <table className="w-full">
          <thead className="bg-muted/30 border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Product
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Price
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Stock
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="border-b border-border hover:bg-muted/20 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-lg">
                      {product.image}
                    </div>
                    <span className="font-medium">{product.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">
                  PKR {product.price.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm">{product.stock} units</td>
                <td className="px-6 py-4">
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      product.stock > 0
                        ? "bg-green-500/20 text-green-500"
                        : "bg-red-500/20 text-red-500"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 rounded-lg bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
