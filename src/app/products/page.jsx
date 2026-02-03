"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/Products/ProductCard";
import ProductDialog from "@/components/Products/ProductDialog";
import SearchBar from "@/components/ui/SearchBar";
import { Filter } from "lucide-react";

const ProductsPage = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const params = new URLSearchParams();
                if (selectedCategory !== "all") params.append("category", selectedCategory);
                if (searchQuery) params.append("search", searchQuery);
                
                const url = `/api/products?${params.toString()}`;
                const res = await fetch(url);
                const data = await res.json();
                if (Array.isArray(data)) {
                    setProducts(data);
                }
            } catch (error) {
                console.error("Failed to load products", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [selectedCategory, searchQuery]);

    const categories = [
        { id: "all", label: "All Products" },
        { id: "panel", label: "Solar Panels" },
        { id: "inverter", label: "Inverters" },
        { id: "battery", label: "Batteries" },
        { id: "accessory", label: "Accessories" },
    ];

    return (
        <div className="min-h-screen bg-background py-12 pt-25">
            <div className="mx-auto max-w-7xl px-4">
                {/* Page Header */}
                <div className="mb-12 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }} className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                        Our Products

                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }} className="mx-auto max-w-2xl text-lg text-muted-foreground">
                        Explore our complete range of premium solar energy products.
                        Quality components for your solar installation needs.
                    </motion.p>
                </div>

                <SearchBar onSearch={setSearchQuery} />

                {/* Category Filter */}
                <motion.div initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }} className="mb-8 flex flex-wrap items-center justify-center gap-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <Filter className="h-4 w-4" />
                        <span>Filter:</span>
                    </div>
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${selectedCategory === category.id
                                ? "bg-primary text-primary-foreground shadow-md"
                                : "border border-border bg-card text-foreground hover:border-primary hover:text-primary"
                                }`}
                        >
                            {category.label}
                        </button>
                    ))}
                </motion.div>

                {/* Loading State */}
                {loading && (
                    <div className="py-24 text-center">
                        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                        <p className="mt-4 text-muted-foreground">Loading products...</p>
                    </div>
                )}

                {/* Products Grid */}
                {!loading && products.length > 0 && (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {products.map((product) => (
                            <ProductCard
                                key={product._id || product.id}
                                product={product}
                                onClick={() => setSelectedProduct(product)}
                            />
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && products.length === 0 && (
                    <div className="py-24 text-center">
                        <p className="text-lg text-muted-foreground">
                            No products found in this category.
                        </p>
                    </div>
                )}

                {/* Product Count */}
                {!loading && products.length > 0 && (
                    <div className="mt-8 text-center text-sm text-muted-foreground">
                        Showing {products.length} {products.length === 1 ? "product" : "products"}
                    </div>
                )}
            </div>

            {/* Detail Dialog */}
            <ProductDialog
                product={selectedProduct}
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />
        </div >
    );
};

export default ProductsPage;
