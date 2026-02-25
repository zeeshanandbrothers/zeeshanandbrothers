"use client";
import Hero from "../HomePage/Hero";
import InstalledProjects from "../HomePage/InstalledProjects";
import ProductsPreview from "../HomePage/ProductsPreview";
import React from "react";

const HomePage = () => {
    return (
        <div>
            <Hero />
            <InstalledProjects />
            <ProductsPreview />
        </div>
    );
};

export default HomePage;
