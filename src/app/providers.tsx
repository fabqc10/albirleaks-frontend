"use client";

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "./contexts/auth.context";
import { JobsProvider } from "./contexts/jobs.context";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <NextUIProvider>
        <AuthProvider>
          <JobsProvider>
            {children}
          </JobsProvider>
        </AuthProvider>
      </NextUIProvider>
    </SessionProvider>
  );
}
