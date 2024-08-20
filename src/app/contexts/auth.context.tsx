"use client";
import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";
import { sendTokenToBackend } from "@/utils/authUtils";

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

  const login = () => signIn("google").then(response => console.log("login: " + response?.url));
  const logout = () => {
    signOut();
    sessionStorage.clear();
    localStorage.clear();
    document.cookie =
      "JSESSIONID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "XSRF-TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  // useEffect(() => {
  //   const authenticateAndSendToken = async () => {
  //     if (session && session.idToken) {
  //       const isAuthenticated = await sendTokenToBackend(session.idToken);
  //       if (isAuthenticated) {
  //         console.log("Token sent to backend successfully");
  //       } else {
  //         console.error("Failed to send token to backend");
  //       }
  //     }
  //   };

  //   authenticateAndSendToken();
  // }, [session]); // This effect runs when session changes

  const value = {
    user: session?.user ?? null,
    loading: status === "loading",
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
