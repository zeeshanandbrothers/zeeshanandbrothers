"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LogOut,
  LayoutDashboard,
  Package,
  BarChart3,
  Settings,
  Menu,
  X,
} from "lucide-react";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const hideUI =
    pathname === "/admin/login" ||
    pathname === "/admin/forgot-password" ||
    pathname === "/admin/reset-password" ||
    pathname === "/admin/verify-otp"; // hide navbar + sidebar on login page
  const [openSidebar, setOpenSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const SIDEBAR_WIDTH = 256;

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setOpenSidebar(!mobile); // Desktop = open, Mobile = closed
    };

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const menuItems = [
    { icon: LayoutDashboard, label: "Products", href: "/admin" },
    { icon: Package, label: "Add Products", href: "/admin/add-products" },
    { icon: Settings, label: "Profile", href: "/admin/profile" },
  ];

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
      });

      window.location.href = "/admin/login";
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* NAVBAR */}
      {!hideUI && (
        <header className="fixed top-0 left-0 w-full z-40 bg-white border-b shadow-sm px-4 py-3 flex items-center justify-between">
          {/* Left side logo + mobile menu button */}
          <div className="flex items-center gap-3">
            {/* Mobile toggle button */}
            <button
              className="md:hidden p-2 rounded hover:bg-gray-100"
              onClick={() => setOpenSidebar(true)}
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo */}
            <Link href="/admin" className="flex items-center gap-2">
              <img
                src="/images/logo.png"
                alt="Logo"
                className="h-8 w-auto rounded"
              />
              <span className="font-semibold text-sm">Admin Panel</span>
            </Link>
          </div>

          {/* Right side logout */}
          <button
            onClick={handleLogout}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </header>
      )}

      {/* ⭐ SIDEBAR (DESKTOP + MOBILE) */}
      {!hideUI && (
        <>
          {/* Overlay for mobile */}
          {isMobile && openSidebar && (
            <div
              className="fixed inset-0 bg-black/40 z-30 md:hidden"
              onClick={() => setOpenSidebar(false)}
            ></div>
          )}

          {/* Sidebar */}

          <motion.aside
            initial={isMobile ? { x: -SIDEBAR_WIDTH } : { x: 0 }}
            animate={
              isMobile ? { x: openSidebar ? 0 : -SIDEBAR_WIDTH } : { x: 0 }
            }
            transition={{ duration: 0.3 }}
            className="
    fixed md:relative
    top-0 md:top-15
    left-0
    h-full md:h-[calc(100vh-60px)]
    w-64
    bg-sidebar border-r border-sidebar-border
    z-50
  "
          >
            {/* ⭐ Logo — ONLY MOBILE */}
            <div className="p-6 border-b border-sidebar-border md:hidden flex justify-between items-center gap-3">
              <Link href="/" className="flex items-center gap-2">
                <img
                  src="/images/logo.png"
                  alt="Logo"
                  className="h-8 w-auto rounded-sm"
                />
                <span className="text-sm font-semibold">
                  Zeeshan & Brothers
                </span>
              </Link>
              <button
                className="cursor-pointer"
                onClick={() => setOpenSidebar(false)}
              >
                <X className="w-6 h-6 " />
              </button>
            </div>

            {/* Sidebar menu */}
            <nav className="flex-1 p-4 space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-sidebar-primary/10"
                >
                  <item.icon className="w-5 h-5 text-sidebar-accent" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Logout — only mobile sidebar */}
            <div className="md:hidden p-4 border-t border-sidebar-border">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500/20 text-red-600 hover:bg-red-500/30"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </motion.aside>
        </>
      )}

      {/* MAIN CONTENT */}
      <main className={`flex-1 overflow-auto ${hideUI ? "" : "pt-16 "}`}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
