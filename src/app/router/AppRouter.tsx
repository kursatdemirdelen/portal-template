import React, { Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { AppLayout } from "@/shared/layout/AppLayout";
import { AuthLayout } from "@/shared/layout/AuthLayout";
import { appRoutes } from "@/shared/config/routes";
import { ProtectedRoute } from "./ProtectedRoute";
import { PageLoader } from "@/shared/ui/Loaders";
import { useGlobalErrorHandler } from "@/shared/hooks/useGlobalErrorHandler";
import { NotFoundPage, ServerErrorPage } from "@/shared/ui/ErrorPages";

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <RouterContent />
    </BrowserRouter>
  );
};

/**
 * Error pages wrapper - Router context'i içinde
 */
const ErrorPageWrapper: React.FC<{ type: "404" | "500" }> = ({ type }) => {
  const navigate = useNavigate();

  if (type === "404") {
    return (
      <NotFoundPage onHome={() => navigate("/dashboard", { replace: true })} />
    );
  }

  return (
    <ServerErrorPage
      errorCode={500}
      title="Sunucu Hatası"
      description="Bir şeyler yanlış gitti. Lütfen daha sonra tekrar deneyiniz."
      onRetry={() => window.location.reload()}
      onHome={() => navigate("/dashboard", { replace: true })}
    />
  );
};

/**
 * Inner component - Router context'i içinde, hook'lar burada çalışır
 */
const RouterContent: React.FC = () => {
  useGlobalErrorHandler();

  return (
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
          return <Route key={route.path} path={route.path} element={element} />;
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

      {/* Error pages */}
      <Route path="/500" element={<ErrorPageWrapper type="500" />} />

      {/* 404 fallback for unmatched routes */}
      <Route path="*" element={<ErrorPageWrapper type="404" />} />
    </Routes>
  );
};
