import React, { useEffect } from "react";
import { gradients } from "@/shared/styles";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { PageLoader } from "@/shared/ui/Loaders";

const LogoutPage: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    const id = setTimeout(() => navigate("/login", { replace: true }), 300);
    return () => clearTimeout(id);
  }, [logout, navigate]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: gradients.bgPrimary,
        padding: 24,
      }}
    >
      <PageLoader />
    </div>
  );
};

export default LogoutPage;
