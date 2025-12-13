"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function VerifyOtp() {
  const params = useSearchParams();
  const email = params.get("email");
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleVerify(e) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/admin/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      toast.success(data.message);
      router.push(`/admin/reset-password?email=${email}&otp=${otp}`);
    } else {
      toast.error(data.error || "Invalid OTP");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Verify OTP</h1>

        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            placeholder="Enter OTP"
            className="border p-2 w-full"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <button
            disabled={loading}
            className="bg-blue-600 text-white w-full py-2 rounded"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}
