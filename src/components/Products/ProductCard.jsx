"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Package } from "lucide-react";

const ProductCard = ({ product, onClick }) => {
  console.log("product", product);
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

  const getProductImage = (product) => {
    const image = product.image;

    const isValidUrl =
      typeof image === "string" &&
      (image.startsWith("http://") || image.startsWith("https://")) &&
      !image.includes("res.cloudinary.com/xxx");

    if (isValidUrl) {
      return image;
    }

    const fallbackMap = {
      panel: "/images/solar-fallback.png",
      battery: "/images/battery-fallback.png",
      inverter: "/images/inverter-fallback.png",
    };

    return fallbackMap[product.category] || "/images/solar-fallback.png";
  };


  // Check stock status
  const isInStock = product.stock > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="group relative cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-card/60 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/20"
      onClick={onClick}
    >
      {/* Background Decorative Element */}
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/5 blur-3xl transition-all duration-500 group-hover:bg-primary/10" />

      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={getProductImage(product)}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-70" />

        {/* glassmorphism Badges */}
        <div className="absolute left-4 top-4 overflow-hidden rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
          {getCategoryDisplay(product.category)}
        </div>

        {isInStock ? (
          <div className="absolute right-4 top-4 overflow-hidden rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-green-400 backdrop-blur-md">
            In Stock
          </div>
        ) : (
          <div className="absolute right-4 top-4 overflow-hidden rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-red-400 backdrop-blur-md">
            Out of Stock
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative p-6">
        {/* Brand */}
        {product.brand && (
          <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-tighter text-primary/80">
            <span className="h-px w-4 bg-primary/30" />
            <span>{product.brand}</span>
          </div>
        )}

        {/* Product Name */}
        <h3 className="mb-3 line-clamp-1 text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
          {product.name}
        </h3>

        {/* Specs Preview - More modern pill style */}
        <div className="mb-6 flex flex-wrap gap-1.5">
          {product.watt && (
            <span className="rounded-lg border border-border/50 bg-muted/30 px-2.5 py-1 text-[11px] font-medium transition-colors group-hover:bg-muted/50">
              {product.watt}W
            </span>
          )}
          {product.systemType && (
            <span className="rounded-lg border border-border/50 bg-muted/30 px-2.5 py-1 text-[11px] font-medium capitalize transition-colors group-hover:bg-muted/50">
              {product.systemType}
            </span>
          )}
          {product.Ah && (
            <span className="rounded-lg border border-border/50 bg-muted/30 px-2.5 py-1 text-[11px] font-medium transition-colors group-hover:bg-muted/50">
              {product.Ah}Ah
            </span>
          )}
        </div>

        {/* Price and CTA */}
        <div className="flex items-end justify-between border-t border-border/40 pt-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Price starting at</span>
            <div className="text-2xl font-black tracking-tight text-primary">
              {formatPrice(product.price)}
            </div>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/30">
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
