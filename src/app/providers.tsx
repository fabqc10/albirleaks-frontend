"use client";
import { AuthProvider } from "@/contexts/auth.context";
import { JobProvider } from "@/contexts/jobs.context";
import { NextUIProvider } from "@nextui-org/react";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      <JobProvider>
        <NextUIProvider>{children}</NextUIProvider>
      </JobProvider>
    </AuthProvider>
  );
}
