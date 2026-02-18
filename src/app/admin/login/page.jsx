"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import Loader from "@/components/ui/Loader";

export default function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
      }

      if (!res.ok) {
        toast.error(data.error || "login failed");
        setLoading(false);
        return;
      }

      window.location.href = "/admin"; // redirect
    } catch (error) {
      toast.error(error || "login failed");
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Admin Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full mt-2 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="text-gray-700 font-medium">Password</label>
            <div className="flex items-center justify-between mt-2 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500">
              <input
                type={isShowPassword ? "text" : "password"}
                name="password"
                required
                className="w-full outline-none"
                placeholder="Enter password"
              />
              {isShowPassword ? (
                <Eye
                  className="cursor-pointer"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                />
              ) : (
                <EyeOff
                  className="cursor-pointer"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                />
              )}
            </div>
          </div>
          <p
            className="text-blue-500 text-right cursor-pointer"
            onClick={() => router.push("/admin/forgot-password")}
          >
            Forgot Password?
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-200"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
