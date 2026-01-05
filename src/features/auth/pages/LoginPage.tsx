import React, { useState } from "react";
import { Form } from "antd";
import { useAuth } from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { useNotification } from "@/shared/hooks";
import LoginForm from "../ui/LoginForm";
import LoginBranding from "../ui/LoginBranding";
import { spacing, radius } from "@/shared/styles";

/* ===========================
   STYLES
   =========================== */

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex" as const,
    justifyContent: "center" as const,
    alignItems: "center" as const,
    background:
      "linear-gradient(135deg, #1e2a3a 0%, #0f1722 50%, #1a1a2e 100%)",
    padding: spacing["2xl"],
    position: "relative" as const,
    overflow: "hidden" as const,
  },
  decorativeCircle: (
    top: string,
    left: string,
    right: string,
    bottom: string,
    size: number,
    color: string,
    blur: number
  ) => ({
    position: "absolute" as const,
    top,
    left,
    right,
    bottom,
    width: size,
    height: size,
    borderRadius: "50%",
    background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
    filter: `blur(${blur}px)`,
    pointerEvents: "none" as const,
  }),
  container: {
    width: "100%",
    maxWidth: 1100,
    minHeight: 620,
    display: "flex" as const,
    background: "#ffffff",
    borderRadius: radius["2xl"] + 4,
    boxShadow: "0 25px 80px rgba(0,0,0,0.25), 0 10px 30px rgba(0,0,0,0.15)",
    overflow: "hidden" as const,
    position: "relative" as const,
    zIndex: 1,
  },
  formPanel: {
    flex: 1,
    padding: `${spacing["4xl"] + spacing.sm}px ${
      spacing["4xl"] + spacing.lg
    }px`,
    display: "flex" as const,
    flexDirection: "column" as const,
    justifyContent: "center" as const,
    background: "#ffffff",
    minWidth: 0,
  },
} as const;

/* ===========================
   COMPONENT
   =========================== */

const LoginPage: React.FC = () => {
  const [form] = Form.useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation() as { state?: { from?: string } };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { success, error: showError } = useNotification();

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      setLoading(true);
      setError(null);

      const { user, token } = await authService.login(values);
      login(user, token);
      form.resetFields();

      success("Hoş geldiniz", `${user.name} olarak sisteme giriş yaptınız`);

      let to = location?.state?.from || "/dashboard";
      if (to === "/logout" || to === "/login") {
        to = "/dashboard";
      }
      navigate(to, { replace: true });
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Giriş başarısız oldu";
      showError("Giriş Hatası", errorMsg);
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      {/* Background decorative elements */}
      <div
        style={styles.decorativeCircle(
          "10%",
          "5%",
          "auto",
          "auto",
          400,
          "rgba(91, 122, 237, 0.15)",
          60
        )}
      />
      <div
        style={styles.decorativeCircle(
          "auto",
          "auto",
          "10%",
          "10%",
          350,
          "rgba(108, 92, 231, 0.12)",
          60
        )}
      />
      <div
        style={styles.decorativeCircle(
          "60%",
          "50%",
          "auto",
          "auto",
          300,
          "rgba(118, 75, 162, 0.1)",
          50
        )}
      />

      {/* Main Login Container */}
      <div style={styles.container}>
        {/* Left Panel - Branding (hidden on mobile via CSS) */}
        <LoginBranding />

        {/* Right Panel - Form */}
        <div style={styles.formPanel}>
          <LoginForm
            form={form}
            loading={loading}
            error={error}
            onSubmit={handleSubmit}
            onErrorClose={() => setError(null)}
          />
        </div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 900px) {
          [data-login-branding] {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
