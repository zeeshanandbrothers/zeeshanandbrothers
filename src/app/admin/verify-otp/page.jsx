import { Suspense } from "react";
import VerifyOtpClient from "./VerifyOtpClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <VerifyOtpClient />
    </Suspense>
  );
}