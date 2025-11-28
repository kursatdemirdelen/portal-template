import React from "react";
import { Typography } from "antd";
import { spacing, radius } from "@/shared/styles";

interface SettingsCardHeaderProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  color?: string;
  bgColor?: string;
  children?: React.ReactNode;
}

export const SettingsCardHeader: React.FC<SettingsCardHeaderProps> = ({
  icon,
  title,
  subtitle,
  color = "#5B7AED",
  bgColor,
  children,
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        background: bgColor || `${color}05`,
        borderRadius: radius.lg,
        padding: `${spacing.md}px ${spacing.lg}px`,
        marginBottom: spacing.lg,
        position: "relative",
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: radius.lg,
          background: `${color}15`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 2px 8px 0 ${color}10`,
        }}
      >
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <Typography.Title
          level={5}
          style={{ margin: 0, fontWeight: 700, letterSpacing: 0.2 }}
        >
          {title}
        </Typography.Title>
        {subtitle && (
          <Typography.Text type="secondary" style={{ fontSize: 13 }}>
            {subtitle}
          </Typography.Text>
        )}
      </div>
      {children}
    </div>
  );
};
