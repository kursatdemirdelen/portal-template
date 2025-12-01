import React from "react";
import { gradients } from "@/shared/styles";
import { LoginForm } from "../ui/LoginForm";
import { useAuth } from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const { isLoading, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation() as { state?: { from?: string } };

  const handleSubmit = (values: { email: string; password: string }) => {
    // Basit mock: e-posta'ya göre rol atayalım
    const role = values.email.includes("admin")
      ? "admin"
      : values.email.includes("worker")
      ? "worker"
      : "user";
    login({
      id: "mock-user",
      name: values.email.split("@")[0] ?? "Kullanıcı",
      email: values.email,
      role,
    });
    const to = location?.state?.from || "/dashboard";
    navigate(to, { replace: true });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: gradients.bgElevated,
        padding: 24,
      }}
    >
      <LoginForm loading={isLoading} onSubmit={handleSubmit} />
    </div>
  );
};

export default LoginPage;
