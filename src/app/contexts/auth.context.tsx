"use client";
import React, { createContext, useContext, ReactNode, useEffect, useCallback, useState, useRef } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";
import paths from "@/paths";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

type AuthContextType = {
  user: Session["user"] | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const { isOpen: isExpiredModalOpen, onOpen: openExpiredModal, onClose: closeExpiredModal } = useDisclosure();

  const previousStatusRef = useRef<typeof status>(status);
  const causedByManualLogoutRef = useRef(false);

  useEffect(() => {
    console.log(`Auth Effect: Prev Status='${previousStatusRef.current}', Current Status='${status}', Manual Flag='${causedByManualLogoutRef.current}'`);

    if (status === "unauthenticated" && previousStatusRef.current === "authenticated") {
      console.log(`Transition auth -> unauth detected.`);
      if (!causedByManualLogoutRef.current) {
        console.log("Cause was NOT manual logout -> Opening expiration modal.");
        openExpiredModal();
      } else {
        console.log("Cause WAS manual logout. Resetting flag.");
        causedByManualLogoutRef.current = false;
      }
    } else if (status === "authenticated" && previousStatusRef.current !== "authenticated") {
       console.log("User authenticated, ensuring manual logout flag is false.");
       causedByManualLogoutRef.current = false;
    }

    previousStatusRef.current = status;

  }, [status, openExpiredModal]);

  const performLogout = useCallback(() => {
    console.log("Manual logout initiated...");
    causedByManualLogoutRef.current = true;
    signOut({ callbackUrl: paths.home() })
      .catch(error => {
          console.error("Error initiating sign out:", error);
          causedByManualLogoutRef.current = false;
      });
  }, []);

  const login = () => {
    causedByManualLogoutRef.current = false;
    signIn("google", { callbackUrl: paths.jobs() });
  }

  const handleRefresh = () => {
    closeExpiredModal();
    window.location.reload();
  };

  const isAuthenticated = status === "authenticated";

  const value = {
    user: session?.user ?? null,
    loading: status === "loading",
    isAuthenticated,
    login,
    logout: performLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}

      <Modal
        isOpen={isExpiredModalOpen}
        isDismissable={false}
        hideCloseButton={true}
        backdrop="blur"
        placement="center"
        onClose={() => console.log("Modal closed unexpectedly")}
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1 text-default-900">Sesión Expirada</ModalHeader>
            <ModalBody>
              <p className="text-default-700">
                Tu sesión ha finalizado o se ha vuelto inválida. Por favor, refresca la página para continuar.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={handleRefresh}>
                Refrescar Página
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
