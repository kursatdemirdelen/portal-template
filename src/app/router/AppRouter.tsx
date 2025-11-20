import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Spin } from "antd";
import { AppLayout } from "@/shared/layout/AppLayout";
import { AuthLayout } from "@/shared/layout/AuthLayout";
import { appRoutes } from "@/shared/config/routes";
import { ProtectedRoute } from "./ProtectedRoute";

// Loading fallback component
const PageLoader: React.FC = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "400px",
    }}
  >
    <Spin size="large" />
  </div>
);

// 404 Not Found page
const NotFoundPage: React.FC = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f8f9fa 0%, #f0f3f7 100%)",
      flexDirection: "column",
      gap: 20,
      color: "#2c3e50",
    }}
  >
    <div style={{ fontSize: 64, fontWeight: "bold", color: "#5b7aed" }}>404</div>
    <div style={{ fontSize: 20 }}>Sayfa bulunamadı</div>
    <a
      href="/dashboard"
      style={{
        marginTop: 20,
        padding: "10px 20px",
        background: "#5b7aed",
        color: "#fff",
        borderRadius: 8,
        textDecoration: "none",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#7b96f5";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "#5b7aed";
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
