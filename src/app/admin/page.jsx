"use client";

import { motion } from "framer-motion";
import { TrendingUp, Package, ShoppingCart, DollarSign } from "lucide-react";
import Link from "next/link";

const StatCard = ({ icon: Icon, label, value, trend, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ translateY: -4 }}
    className="bg-card border border-border rounded-xl p-6 cursor-pointer"
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="text-muted-foreground text-sm font-medium">{label}</p>
        <h3 className="text-3xl font-bold mt-2">{value}</h3>
        {trend && (
          <p className="text-xs mt-2 text-green-500">
            {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}% from last month
          </p>
        )}
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  </motion.div>
);

export default function AdminDashboard() {
  const stats = [
    {
      label: "Total Products",
      value: "24",
      icon: Package,
      trend: 12,
      color: "bg-primary/10 text-primary",
    },
    {
      label: "Total Orders",
      value: "1,234",
      icon: ShoppingCart,
      trend: 23,
      color: "bg-accent/10 text-accent",
    },
    {
      label: "Revenue",
      value: "PKR 5.2M",
      icon: DollarSign,
      trend: 18,
      color: "bg-secondary/10 text-secondary",
    },
    {
      label: "Growth Rate",
      value: "24.5%",
      icon: TrendingUp,
      trend: 5,
      color: "bg-green-500/10 text-green-500",
    },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back! Here's your business overview.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Recent Products */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Recent Products</h2>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-center justify-between p-3 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent" />
                  <div>
                    <p className="font-medium">Solar Panel Pro {i}</p>
                    <p className="text-xs text-muted-foreground">PKR 45,000</p>
                  </div>
                </div>
                <span className="text-xs px-2 py-1 bg-green-500/20 text-green-500 rounded">
                  In Stock
                </span>
              </motion.div>
            ))}
          </div>
          <Link
            href="/admin/products"
            className="mt-4 block text-center py-2 px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
          >
            View All Products
          </Link>
        </div>

        {/* Quick Start */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-6"
        >
          <h3 className="text-lg font-bold mb-4">Quick Start</h3>
          <div className="space-y-2">
            <Link
              href="/admin/products"
              className="block p-3 rounded-lg bg-background hover:bg-muted transition-colors text-sm font-medium"
            >
              ➕ Add New Product
            </Link>
            <button className="w-full p-3 rounded-lg bg-background hover:bg-muted transition-colors text-sm font-medium text-left">
              📊 View Analytics
            </button>
            <button className="w-full p-3 rounded-lg bg-background hover:bg-muted transition-colors text-sm font-medium text-left">
              ⚙️ Settings
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
