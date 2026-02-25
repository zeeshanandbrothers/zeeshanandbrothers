"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import RevealOnScroll from "../Layout/Reveal_on_scroll";
import ProductCard from "../Products/ProductCard";
import ProductDialog from "../Products/ProductDialog";
import { ArrowRight } from "lucide-react";
import { useLoading } from "../../context/LoadingContext";

const ProductsPreview = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { setIsProductsLoaded } = useLoading();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/products");
                const data = await res.json();
                if (Array.isArray(data)) {
                    setProducts(data);
                }
            } catch (error) {
                console.error("Failed to load products", error);
            } finally {
                setLoading(false);
                setIsProductsLoaded(true);
            }
        };
        fetchProducts();
    }, []);

    // Show only first 6 featured products
    const featuredProducts = products.slice(0, 6);

    if (loading)
        return <div className="py-24 text-center">Loading Products...</div>;

    if (products.length === 0) return null;

    return (
        <section className="relative overflow-hidden bg-background py-24 md:py-32">
            {/* Artistic Background Mesh & Patterns */}
            <div className="absolute inset-0 bg-grid-primary opacity-80 mask-linear-v pointer-events-none" />
            <div className="absolute inset-0 bg-mesh opacity-40 pointer-events-none" />
            <div className="absolute top-1/2 left-0 -translate-y-1/2 -rotate-12 w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent pointer-events-none" />

            <div className="mx-auto max-w-6xl px-4 relative z-10">
                {/* Header */}
                <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
                    <RevealOnScroll className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="h-px w-12 bg-accent/60" />
                            <span className="text-sm font-bold uppercase tracking-[0.3em] text-accent/80">Premium Hardware</span>
                        </div>
                        <h2 className="text-4xl font-black leading-tight tracking-tighter md:text-5xl lg:text-6xl text-gradient-primary">
                            Our Products
                        </h2>
                        <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
                            Browse our premium selection of solar panels, inverters, batteries,
                            and accessories for your solar energy needs.
                        </p>
                    </RevealOnScroll>

                    <RevealOnScroll delay={0.2}>
                        <Link
                            href="/products"
                            className="group hidden items-center gap-3 rounded-2xl border border-primary/20 bg-background px-8 py-4 text-sm font-bold text-primary transition-all duration-300 hover:bg-primary hover:text-white hover:scale-105 active:scale-95 shadow-xl shadow-primary/5 md:inline-flex"
                        >
                            View All Products
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </RevealOnScroll>
                </div>

                {/* Products Grid */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {featuredProducts.map((product, index) => (
                        <RevealOnScroll key={product._id || product.id} delay={index * 0.1}>
                            <ProductCard
                                product={product}
                                onClick={() => setSelectedProduct(product)}
                            />
                        </RevealOnScroll>
                    ))}
                </div>

                {/* Mobile View All Button */}
                <div className="mt-12 text-center md:hidden">
                    <Link
                        href="/products"
                        className="inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-primary/20 bg-background px-8 py-4 text-sm font-bold text-primary shadow-xl shadow-primary/5"
                    >
                        Browse Inventory
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>

            {/* Detail Dialog */}
            <ProductDialog
                product={selectedProduct}
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />
        </section>
    );
};

export default ProductsPreview;
