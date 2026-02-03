"use client";

import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SearchBar = ({ onSearch, placeholder = "Search products..." }) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  return (
    <div className="w-full max-w-md mx-auto mb-8 relative z-20">
      <motion.div
        animate={{
          scale: isFocused ? 1.02 : 1,
          boxShadow: isFocused
            ? "0 10px 30px -10px rgba(0,0,0,0.1)"
            : "0 0 0 0 rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.2 }}
        className={`relative flex items-center w-full h-12 rounded-2xl border ${
          isFocused
            ? "border-primary bg-background ring-2 ring-primary/20"
            : "border-border bg-card/50 hover:border-primary/50"
        } transition-all duration-300`}
      >
        <div className="pl-4 text-muted-foreground">
          <Search className={`w-5 h-5 ${isFocused ? "text-primary" : ""}`} />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full h-full bg-transparent px-4 text-sm outline-none placeholder:text-muted-foreground/70"
        />
        <AnimatePresence>
          {query && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setQuery("")}
              className="absolute right-3 p-1 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default SearchBar;
