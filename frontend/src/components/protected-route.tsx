import { decryptKey } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useCallback } from "react";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export function ProtectedRoute({
  children,
  adminOnly = false,
}: ProtectedRouteProps) {
  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();

  const verifyAuth = useCallback(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    verifyAuth();
  }, [verifyAuth]);

  if (isCheckingAuth) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (user && !user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  if (adminOnly) {
    const decryptedPasskey = getEncryptedPasskey();

    const isAdminValid =
      user?.email === import.meta.env.VITE_APP_ADMIN_EMAIL &&
      decryptedPasskey === import.meta.env.VITE_APP_PASSKEY;

    if (!isAdminValid) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
}

function getEncryptedPasskey() {
  if (typeof window !== "undefined") {
    const encryptedPasskey = window.localStorage.getItem("accessKey");
    return encryptedPasskey ? decryptKey(encryptedPasskey) : null;
  }
  return null;
}
