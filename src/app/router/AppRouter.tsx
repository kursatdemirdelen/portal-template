import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "@/shared/layout/AppLayout";
import { AuthLayout } from "@/shared/layout/AuthLayout";
import { appRoutes } from "@/shared/config/routes";
import { ProtectedRoute } from "./ProtectedRoute";
import { PageLoader } from "@/shared/ui/Loaders";
import { spacing, radius, colors, gradients } from "@/shared/styles";

// 404 Not Found page
const NotFoundPage: React.FC = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      background: gradients.bgCard,
      flexDirection: "column",
      gap: spacing.xl,
      color: colors.textPrimary,
    }}
  >
    <div style={{ fontSize: 64, fontWeight: "bold", color: colors.primary }}>
      404
    </div>
    <div style={{ fontSize: 20 }}>Sayfa bulunamadı</div>
    <a
      href="/dashboard"
      style={{
        marginTop: spacing.xl,
        padding: `${spacing.sm}px ${spacing.xl}px`,
        background: colors.primary,
        color: "#fff",
        borderRadius: radius.md,
        textDecoration: "none",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = colors.primary;
        e.currentTarget.style.opacity = "0.9";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = colors.primary;
        e.currentTarget.style.opacity = "1";
      }}
    >
      Dashboard'a Dön
    </a>
  </div>
);

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root redirect to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Dynamic route mapping */}
        {appRoutes.map((route) => {
          const LayoutComp = route.layout === "auth" ? AuthLayout : AppLayout;
          const PageComp = route.component;

          const element = (
            <LayoutComp>
              <Suspense fallback={<PageLoader />}>
                <PageComp />
              </Suspense>
            </LayoutComp>
          );

          // Auth routes don't need protection
          if (route.layout === "auth") {
            return (
              <Route key={route.path} path={route.path} element={element} />
            );
          }

          // Protected app routes with role-based access
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <ProtectedRoute roles={route.roles}>{element}</ProtectedRoute>
              }
            />
          );
        })}

        {/* 404 fallback for unmatched routes */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
