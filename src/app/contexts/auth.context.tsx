"use client";
import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";

type AuthContextType = {
  user: Session["user"] | null;
  loading: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  console.log("SESSION: ", session);

  const login = () => signIn("google",{ callbackUrl: 'http://localhost:3000/jobs' });
  const logout = () => {
    signOut({ callbackUrl: "/" })
      .then(() => {
        sessionStorage.clear();
        localStorage.clear();
        document.cookie = "JSESSIONID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "XSRF-TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      });
  };

  useEffect(() => {
    if (status === "authenticated" && session?.expires) {
      const checkSessionExpiry = () => {
        const sessionExpiryTime = new Date(session.expires).getTime();
        const currentTime = new Date().getTime();
  
        if (currentTime >= sessionExpiryTime) {
          console.log("Session expired, logging out...");
          logout();
        } else {
          console.log("Session is still valid");
        }
      };
  
      // Check every minute (60000 ms)
      const intervalId = setInterval(checkSessionExpiry, 60000);
      
      // Run an initial check immediately
      checkSessionExpiry();
  
      return () => clearInterval(intervalId);
    }
  }, [status, session, logout]);

  const value = {
    user: session?.user ?? null,
    loading: status === "loading",
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
