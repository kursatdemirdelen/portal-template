import React from "react";
import { gradients } from "@/shared/styles";
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
        background: gradients.bgElevated,
        padding: 24,
      }}
    >
      <LoginForm loading={isLoading} />
    </div>
  );
};

export default LoginPage;
