"use client";

import { LoadingProvider } from "../context/LoadingContext";

export default function Providers({ children }) {
    return <LoadingProvider>{children}</LoadingProvider>;
}