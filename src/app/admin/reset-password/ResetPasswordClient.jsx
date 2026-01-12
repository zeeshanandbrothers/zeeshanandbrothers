"use client";

import { Eye, EyeOff } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ResetPasswordClient() {
  const params = useSearchParams();
  const email = params.get("email");
  const otp = params.get("otp");
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/admin/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        otp,
        newPassword: password,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      toast.success(data.message);
      router.push("/admin/login");
    } else {
      toast.error(data.error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Reset Password
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="border p-2 w-full flex items-center justify-between gap-1 ">
            <input
              type={isShowPassword ? "text" : "password"}
              placeholder="New password"
              className="w-full outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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

          <button
            disabled={loading}
            className="bg-blue-600 text-white w-full py-2 disabled:opacity-60"
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
