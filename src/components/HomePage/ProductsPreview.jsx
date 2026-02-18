"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import RevealOnScroll from "../Layout/Reveal_on_scroll";
import ProductCard from "../Products/ProductCard";
import ProductDialog from "../Products/ProductDialog";
import { ArrowRight } from "lucide-react";

const ProductsPreview = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

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
        <section className="bg-background py-12 md:py-16">
            <div className="mx-auto max-w-6xl px-4">
                {/* Header */}
                <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
                    <RevealOnScroll>
                        <h2 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl">
                            Our Products
                        </h2>
                        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
                            Browse our premium selection of solar panels, inverters, batteries,
                            and accessories for your solar energy needs.
                        </p>
                    </RevealOnScroll>

                    <RevealOnScroll delay={0.1}>
                        <Link
                            href="/products"
                            className="hidden items-center gap-2 rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground md:inline-flex"
                        >
                            View All Products
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </RevealOnScroll>
                </div>

                {/* Products Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                <div className="mt-8 text-center md:hidden">
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                        View All Products
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
