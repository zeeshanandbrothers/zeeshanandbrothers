"use client";

import { usePathname } from "next/navigation";
import logo from "../../../public/images/logo.png";
import React from "react";
const Footer = () => {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="py-12 border-t border-border/40 bg-background/50 backdrop-blur-md relative overflow-hidden">
      {/* Decorative gradient background */}
      <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 blur-[100px] rounded-full -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 blur-[100px] rounded-full translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center">
          {/* Logo & Brand Section */}
          <div className="flex flex-col items-center gap-4 group">
            <div className="relative p-1 rounded-xl bg-gradient-to-tr from-primary/20 to-transparent ring-1 ring-border shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:shadow-primary/5">
              <img
                src="/images/logo.png"
                alt="Zeeshan & Brothers logo"
                className="h-16 w-auto rounded-lg object-contain"
              />
            </div>
            <div className="text-center space-y-1">
              <h2 className="text-2xl font-black tracking-tight text-gray-900 dark:text-gray-100 uppercase">
                Zeeshan <span className="text-primary">&</span> Brothers
              </h2>
              <p className="text-sm font-medium text-gray-500/80 dark:text-gray-400/80 uppercase tracking-[0.2em]">
                Solar Energy Solutions
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-border to-transparent my-10" />

          {/* Copyright Section */}
          <div className="flex flex-col items-center gap-3">
            <p className="text-sm text-gray-500 text-center dark:text-gray-500 font-medium tracking-wide">
              &copy; {new Date().getFullYear()} Zeeshan & Brothers. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-primary/50" />
              <p className="text-[10px] text-gray-400 dark:text-gray-600 uppercase tracking-widest font-bold">
                Premium Renewable Energy
              </p>
              <div className="h-1 w-1 rounded-full bg-primary/50" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
