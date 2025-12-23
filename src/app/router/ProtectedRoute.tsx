import React, { type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Spin } from "antd";
import type { Role } from "@/shared/config/roles";
import { useAuth } from "@/features/auth";

interface ProtectedRouteProps {
  children: ReactNode;
  roles?: Role[];
}

const LoadingScreen: React.FC = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      background: "var(--bg-primary)",
    }}
  >
    <Spin size="large" />
  </div>
);

const UnauthorizedScreen: React.FC = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      background: "var(--bg-primary)",
      color: "var(--text-primary)",
      fontSize: "var(--font-size-lg)",
    }}
  >
    Yetkisiz erişim
  </div>
);

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  roles,
}) => {
  const { user, isLoading, isAuthenticated } = useAuth();
  const location = useLocation();

  // Show loading screen while checking authentication
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  // Check role authorization
  if (roles && user && !roles.includes(user.role)) {
    return <UnauthorizedScreen />;
  }

  return <>{children}</>;
};
