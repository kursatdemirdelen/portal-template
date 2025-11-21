import React from "react";
import { Tag } from "antd";

type RoleVariant = "admin" | "manager" | "user" | "customer" | "support" | string;

const ROLE_STYLES: Record<string, { color: string; background: string }> = {
  admin: { color: "#f97316", background: "rgba(249, 115, 22, 0.12)" },
  manager: { color: "#0ea5e9", background: "rgba(14, 165, 233, 0.12)" },
  user: { color: "#16a34a", background: "rgba(22, 163, 74, 0.12)" },
  customer: { color: "#a855f7", background: "rgba(168, 85, 247, 0.12)" },
  support: { color: "#facc15", background: "rgba(250, 204, 21, 0.15)" },
};

interface RoleBadgeProps {
  role: RoleVariant;
  uppercase?: boolean;
}

export const RoleBadge: React.FC<RoleBadgeProps> = ({ role, uppercase }) => {
  const style = ROLE_STYLES[role.toLowerCase()] ?? {
    color: "#475569",
    background: "rgba(71, 85, 105, 0.12)",
  };

  return (
    <Tag
      style={{
        borderRadius: 999,
        border: "none",
        color: style.color,
        background: style.background,
        fontWeight: 600,
        textTransform: uppercase ? "uppercase" : "capitalize",
      }}
    >
      {role}
    </Tag>
  );
};
