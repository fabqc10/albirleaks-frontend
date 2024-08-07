"use client";
import React, { createContext, useContext, ReactNode } from "react";
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

  const login = () => signIn("google");
  const logout = () => {
    signOut();
    sessionStorage.clear();
    localStorage.clear();
  };

  const value = {
    user: session?.user ?? null,
    loading: status === "loading",
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
