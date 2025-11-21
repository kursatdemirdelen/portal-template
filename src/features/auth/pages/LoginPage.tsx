import React from "react";
import { LoginForm } from "../ui/LoginForm";
import { useAuth } from "../hooks/useAuth";

const LoginPage: React.FC = () => {
  const { isLoading } = useAuth();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #eef2ff 0%, #fdf2f8 100%)",
        padding: 24,
      }}
    >
      <LoginForm loading={isLoading} />
    </div>
  );
};

export default LoginPage;
