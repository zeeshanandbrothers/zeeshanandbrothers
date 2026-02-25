"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
    const [isProjectsLoaded, setIsProjectsLoaded] = useState(false);
    const [isProductsLoaded, setIsProductsLoaded] = useState(false);
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        if (isProjectsLoaded && isProductsLoaded) {
            // Small delay for smooth transition
            const timer = setTimeout(() => {
                setShowLoader(false);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isProjectsLoaded, isProductsLoaded]);

    return (
        <LoadingContext.Provider
            value={{
                isProjectsLoaded,
                setIsProjectsLoaded,
                isProductsLoaded,
                setIsProductsLoaded,
                showLoader,
            }}
        >
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error("useLoading must be used within a LoadingProvider");
    }
    return context;
};
