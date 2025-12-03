"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // ⭐ ADD THIS
import { motion } from "framer-motion";
import {
  LogOut,
  LayoutDashboard,
  Package,
  BarChart3,
  Settings,
} from "lucide-react";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const hideSidebar = pathname === "/admin/login"; // ⭐ LOGIN PAGE → NO SIDEBAR

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    { icon: Package, label: "Products", href: "/admin/products" },
    { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
  ];

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/logout", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        console.log("Logout failed");
        return;
      }

      window.location.href = "/admin/login";
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* ⭐ HIDE SIDEBAR ON LOGIN PAGE */}
      {!hideSidebar && (
        <motion.aside
          initial={{ x: -250 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.4 }}
          className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col"
        >
          {/* Logo */}
          <div className="p-6 border-b border-sidebar-border">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <div className="">
                <Link href="/" className="flex items-center gap-2">
                  <img
                    src="/images/logo.png"
                    alt="Zeeshan & Brothers logo"
                    className="h-8 w-auto rounded-sm ring-1 ring-border transition-transform duration-300 hover:scale-[1.03]"
                  />
                  <span className="text-sm font-semibold">
                    Zeeshan &amp; Brothers
                  </span>
                </Link>
              </div>
              {/* <div>
                <h1 className="font-bold text-lg text-foreground">Zeeshan</h1>
                <p className="text-xs text-muted-foreground">Admin Panel</p>
              </div> */}
            </motion.div>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * (i + 1) }}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-sidebar-primary/10 transition-colors group"
                >
                  <item.icon className="w-5 h-5 text-sidebar-accent group-hover:text-accent transition-colors" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Logout */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="p-4 border-t border-sidebar-border"
          >
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-destructive/10 hover:bg-destructive/20 transition-colors text-destructive"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </motion.div>
        </motion.aside>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
