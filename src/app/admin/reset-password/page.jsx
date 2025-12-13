"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const params = useSearchParams();
  const email = params.get("email");
  const otp = params.get("otp");
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4">
          <input
            type="password"
            placeholder="New password"
            className="border p-2 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="bg-blue-600 text-white w-full py-2">
            {loading ? "Updating..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
