import React from "react";
import { Typography, Tooltip } from "antd";
import { spacing, typography, colors } from "@/shared/styles";

const { Text } = Typography;

interface InfoItemProps {
  icon?: React.ReactNode;
  label?: string;
  value: React.ReactNode;
  compact?: boolean;
  tooltip?: string;
  align?: "start" | "center";
  gap?: number;
  style?: React.CSSProperties;
}

export const InfoItem: React.FC<InfoItemProps> = ({
  icon,
  label,
  value,
  compact = false,
  tooltip,
  align = "start",
  gap = compact ? spacing.xs : spacing.sm,
  style,
}) => {
  const content = (
    <div
      style={{
        display: "flex",
        alignItems: align === "center" ? "center" : "flex-start",
        gap,
        lineHeight: 1.3,
        ...style,
      }}
    >
      {icon && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: compact ? 16 : 18,
            height: compact ? 16 : 18,
            color: "inherit",
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: spacing.xs,
          minWidth: 0,
        }}
      >
        {label && (
          <Text
            type="secondary"
            style={{
              fontSize: compact ? 11 : 12,
              textTransform: "uppercase",
              letterSpacing: 0.5,
              margin: 0,
              lineHeight: 1.1,
              fontWeight: 500,
            }}
          >
            {label}
          </Text>
        )}
        <div
          style={{
            fontSize: compact ? 12 : typography.fontSize.base,
            fontWeight: 500,
            color: colors.textPrimary,
            display: "flex",
            alignItems: "center",
            gap: spacing.xs,
            minWidth: 0,
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );

  if (tooltip) {
    return <Tooltip title={tooltip}>{content}</Tooltip>;
  }
  return content;
};
