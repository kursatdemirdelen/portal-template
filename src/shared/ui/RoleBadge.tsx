import React from "react";
import { Tag } from "antd";
import { getRoleStyle } from "@/shared/styles";

type RoleVariant =
  | "admin"
  | "manager"
  | "user"
  | "customer"
  | "support"
  | string;

interface RoleBadgeProps {
  role: RoleVariant;
  uppercase?: boolean;
}

export const RoleBadge: React.FC<RoleBadgeProps> = ({ role, uppercase }) => {
  const style = getRoleStyle(role);

  return (
    <Tag
      style={{
        borderRadius: 999,
        border: style.border ?? "none",
        color: style.text,
        background: style.bg,
        fontWeight: 600,
        textTransform: uppercase ? "uppercase" : "capitalize",
      }}
    >
      {role}
    </Tag>
  );
};
