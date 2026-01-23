"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Package, Zap, Battery as BatteryIcon, Settings } from "lucide-react";
import { useEffect } from "react";

const ProductDialog = ({ product, isOpen, onClose }) => {
    // Prevent body scroll when dialog is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!product) return null;

    // Format price to currency
    const formatPrice = (price) => {
        return new Intl.NumberFormat("en-PK", {
            style: "currency",
            currency: "PKR",
            minimumFractionDigits: 0,
        }).format(price);
    };

    // Get category display name
    const getCategoryDisplay = (category) => {
        const categories = {
            panel: "Solar Panel",
            inverter: "Inverter",
            battery: "Battery",
            accessory: "Accessory",
        };
        return categories[category] || category;
    };

    const isInStock = product.stock > 0;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Dialog */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl border border-border bg-background shadow-2xl flex flex-col"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute right-4 top-4 z-20 rounded-full bg-black/20 p-2 text-white transition-colors hover:bg-black/40"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            {/* Scrollable Content Container */}
                            <div className="flex-1 overflow-y-auto">
                                <div className="grid gap-0 md:grid-cols-2 h-full">
                                    {/* Visual Side (Left/Top) */}
                                    <div className="bg-muted/30 p-6 md:p-8 flex-shrink-0">
                                        {/* Main Image */}
                                        <div className="relative aspect-square w-full overflow-hidden rounded-xl shadow-md">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                className="object-cover transition-all duration-300"
                                            />
                                        </div>

                                        {/* Category and Stock Badges */}
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            <div className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                                                {getCategoryDisplay(product.category)}
                                            </div>
                                            {!isInStock && (
                                                <div className="rounded-full bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-600 dark:text-red-400">
                                                    Out of Stock
                                                </div>
                                            )}
                                            {isInStock && (
                                                <div className="rounded-full bg-green-500/10 px-4 py-2 text-sm font-semibold text-green-600 dark:text-green-400">
                                                    {product.stock} in stock
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Content Side (Right/Bottom) */}
                                    <div className="flex flex-col p-6 md:p-8">
                                        {/* Brand */}
                                        {product.brand && (
                                            <div className="mb-1 flex items-center gap-2 text-sm font-medium text-primary">
                                                <Package className="h-4 w-4" />
                                                {product.brand}
                                            </div>
                                        )}

                                        {/* Product Name */}
                                        <h2 className="mb-4 text-2xl font-bold md:text-3xl text-foreground">
                                            {product.name}
                                        </h2>

                                        {/* Price */}
                                        <div className="mb-6 text-3xl font-bold text-primary">
                                            {formatPrice(product.price)}
                                        </div>

                                        {/* Description */}
                                        {product.description && (
                                            <p className="mb-6 text-base text-muted-foreground/90 leading-relaxed">
                                                {product.description}
                                            </p>
                                        )}

                                        {/* Specifications */}
                                        <div className="mt-auto rounded-xl border border-border/60 bg-card">
                                            <div className="p-4">
                                                <span className="font-semibold text-foreground">
                                                    Specifications
                                                </span>
                                            </div>
                                            <div className="grid gap-3 p-4 pt-0 text-sm">
                                                {/* Panel/Inverter/Battery Specs */}
                                                {product.watt && (
                                                    <InfoRow
                                                        icon={<Zap className="h-4 w-4" />}
                                                        label="Rated Power"
                                                        value={`${product.watt}W`}
                                                    />
                                                )}
                                                {product.actualWatt && (
                                                    <InfoRow
                                                        icon={<Zap className="h-4 w-4" />}
                                                        label="Actual Power"
                                                        value={`${product.actualWatt}W`}
                                                    />
                                                )}

                                                {/* Inverter Specific */}
                                                {product.systemType && (
                                                    <InfoRow
                                                        icon={<Settings className="h-4 w-4" />}
                                                        label="System Type"
                                                        value={product.systemType.charAt(0).toUpperCase() + product.systemType.slice(1)}
                                                    />
                                                )}
                                                {product.phase && (
                                                    <InfoRow
                                                        icon={<Settings className="h-4 w-4" />}
                                                        label="Phase"
                                                        value={`${product.phase.charAt(0).toUpperCase() + product.phase.slice(1)} Phase`}
                                                    />
                                                )}

                                                {/* Battery Specific */}
                                                {product.Ah && (
                                                    <InfoRow
                                                        icon={<BatteryIcon className="h-4 w-4" />}
                                                        label="Capacity"
                                                        value={`${product.Ah}Ah`}
                                                    />
                                                )}

                                                {/* SKU if available */}
                                                {product.sku && (
                                                    <InfoRow
                                                        icon={<Package className="h-4 w-4" />}
                                                        label="SKU"
                                                        value={product.sku}
                                                    />
                                                )}
                                            </div>
                                        </div>

                                        {/* CTA Button */}
                                        <div className="mt-6">
                                            <button
                                                className="w-full rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                                                disabled={!isInStock}
                                            >
                                                {isInStock ? "Contact for Order" : "Out of Stock"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

// Info Row Component (matching ProjectDialog style)
const InfoRow = ({ icon, label, value }) => (
    <div className="flex items-center gap-3 text-muted-foreground">
        <div className="flex-shrink-0 text-primary">{icon}</div>
        <div className="flex-1">
            <span className="mr-2 font-medium text-foreground">{label}:</span>
            {value || "N/A"}
        </div>
    </div>
);

export default ProductDialog;
