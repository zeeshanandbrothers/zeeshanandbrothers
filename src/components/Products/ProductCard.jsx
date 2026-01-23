"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Package } from "lucide-react";

const ProductCard = ({ product, onClick }) => {
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

  // Check stock status
  const isInStock = product.stock > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border/40 bg-card shadow-sm hover:shadow-md"
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-muted/20">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />

        {/* Category Badge */}
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-black backdrop-blur-sm">
          {getCategoryDisplay(product.category)}
        </div>

        {/* Stock Status Badge */}
        {!isInStock && (
          <div className="absolute right-4 top-4 rounded-full bg-red-500/90 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            Out of Stock
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Brand */}
        {product.brand && (
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <Package className="h-3.5 w-3.5" />
            <span>{product.brand}</span>
          </div>
        )}

        {/* Product Name */}
        <h3 className="mb-2 text-lg font-bold leading-tight text-foreground group-hover:text-primary">
          {product.name}
        </h3>

        {/* Specs Preview */}
        <div className="mb-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
          {product.watt && (
            <span className="rounded-md bg-muted px-2 py-1">
              {product.watt}W
            </span>
          )}
          {product.systemType && (
            <span className="rounded-md bg-muted px-2 py-1 capitalize">
              {product.systemType}
            </span>
          )}
          {product.phase && (
            <span className="rounded-md bg-muted px-2 py-1 capitalize">
              {product.phase} Phase
            </span>
          )}
          {product.Ah && (
            <span className="rounded-md bg-muted px-2 py-1">
              {product.Ah}Ah
            </span>
          )}
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-primary">
              {formatPrice(product.price)}
            </div>
            {isInStock && (
              <div className="text-xs text-muted-foreground">
                {product.stock} in stock
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-primary">
            View
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
