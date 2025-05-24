"use client";

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "./contexts/auth.context";
import { JobsProvider } from "./contexts/jobs.context";
import { ChatProvider } from './contexts/chat.context';
import { Toaster } from 'react-hot-toast';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <NextUIProvider>
        <AuthProvider>
          <JobsProvider>
            <ChatProvider>
              {children}
              <Toaster position="bottom-center" />
            </ChatProvider>
          </JobsProvider>
        </AuthProvider>
      </NextUIProvider>
    </SessionProvider>
  );
}
