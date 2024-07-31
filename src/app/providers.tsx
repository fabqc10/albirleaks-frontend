"use client";

import { NextUIProvider } from "@nextui-org/react";
import SessionWrapper from "./SessionWrapper";
import { AuthProvider } from "./contexts/auth.context";
import { JobsProvider } from "./contexts/jobs.context";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionWrapper>
      <AuthProvider>
        <JobsProvider>
          <NextUIProvider>{children}</NextUIProvider>
        </JobsProvider>
      </AuthProvider>
    </SessionWrapper>
  );
}
