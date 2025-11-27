import React, { type ReactNode } from "react";
import { Typography } from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  MinusOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

type Trend = "up" | "down" | "neutral";
type CardColor = "blue" | "purple" | "green" | "orange" | "red" | "cyan";

interface StatCardProps {
  title: string;
  value: number | string;
  suffix?: string;
  description?: string;
  trend?: Trend;
  trendLabel?: string;
  trendValue?: number;
  icon?: ReactNode;
  color?: CardColor;
  style?: React.CSSProperties;
}

const colorConfig: Record<
  CardColor,
  {
    gradient: string;
    border: string;
    icon: string;
    accent: string;
    hover: string;
  }
> = {
  blue: {
    gradient:
      "linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(99, 102, 241, 0.08) 100%)",
    border: "rgba(59, 130, 246, 0.3)",
    icon: "rgba(59, 130, 246, 0.6)",
    accent: "#3b82f6",
    hover: "rgba(59, 130, 246, 0.18)",
  },
  purple: {
    gradient:
      "linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(168, 85, 247, 0.08) 100%)",
    border: "rgba(139, 92, 246, 0.3)",
    icon: "rgba(139, 92, 246, 0.6)",
    accent: "#8b5cf6",
    hover: "rgba(139, 92, 246, 0.18)",
  },
  green: {
    gradient:
      "linear-gradient(135deg, rgba(34, 197, 94, 0.12) 0%, rgba(74, 222, 128, 0.08) 100%)",
    border: "rgba(34, 197, 94, 0.3)",
    icon: "rgba(34, 197, 94, 0.6)",
    accent: "#22c55e",
    hover: "rgba(34, 197, 94, 0.18)",
  },
  orange: {
    gradient:
      "linear-gradient(135deg, rgba(249, 115, 22, 0.12) 0%, rgba(251, 146, 60, 0.08) 100%)",
    border: "rgba(249, 115, 22, 0.3)",
    icon: "rgba(249, 115, 22, 0.6)",
    accent: "#f97316",
    hover: "rgba(249, 115, 22, 0.18)",
  },
  red: {
    gradient:
      "linear-gradient(135deg, rgba(239, 68, 68, 0.12) 0%, rgba(248, 113, 113, 0.08) 100%)",
    border: "rgba(239, 68, 68, 0.3)",
    icon: "rgba(239, 68, 68, 0.6)",
    accent: "#ef4444",
    hover: "rgba(239, 68, 68, 0.18)",
  },
  cyan: {
    gradient:
      "linear-gradient(135deg, rgba(34, 211, 238, 0.12) 0%, rgba(165, 243, 252, 0.08) 100%)",
    border: "rgba(34, 211, 238, 0.3)",
    icon: "rgba(34, 211, 238, 0.6)",
    accent: "#22d3ee",
    hover: "rgba(34, 211, 238, 0.18)",
  },
};

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  suffix,
  description,
  trend = "neutral",
  trendLabel,
  trendValue,
  icon,
  color = "blue",
  style,
}) => {
  const config = colorConfig[color];

  const trendColor =
    trend === "up" ? "#22c55e" : trend === "down" ? "#ef4444" : "#9ca3af";

  const trendIcon =
    trend === "up" ? (
      <ArrowUpOutlined style={{ fontSize: 10 }} />
    ) : trend === "down" ? (
      <ArrowDownOutlined style={{ fontSize: 10 }} />
    ) : (
      <MinusOutlined style={{ fontSize: 10 }} />
    );

  return (
    <div
      style={{
        background: config.gradient,
        border: `1px solid ${config.border}`,
        borderRadius: 10,
        padding: "16px 18px",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.04)",
        transition: "all 0.2s ease",
        cursor: "pointer",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        ...style,
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: "absolute",
          top: -30,
          right: -30,
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: config.accent,
          opacity: 0.06,
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 12,
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <Text
            type="secondary"
            style={{
              fontSize: 11,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              display: "block",
            }}
          >
            {title}
          </Text>
        </div>
        {icon && (
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: `${config.accent}15`,
              border: `1px solid ${config.accent}30`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              marginLeft: 8,
              color: config.accent,
              flexShrink: 0,
            }}
          >
            {icon}
          </div>
        )}
      </div>

      {/* Value section */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          marginBottom: 12,
          flex: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
          <span
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#374151",
              lineHeight: 1,
              letterSpacing: "-0.5px",
            }}
          >
            {value}
          </span>
          {suffix && (
            <Text
              type="secondary"
              style={{
                fontSize: 12,
                fontWeight: 500,
              }}
            >
              {suffix}
            </Text>
          )}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
          gap: 6,
          flexWrap: "wrap",
        }}
      >
        {description && (
          <Text
            type="secondary"
            style={{
              fontSize: 11,
              flex: 1,
              minWidth: 0,
            }}
          >
            {description}
          </Text>
        )}

        {(trendLabel || trendValue !== undefined) && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              fontSize: 10,
              fontWeight: 600,
              color: trendColor,
              padding: "3px 8px",
              background: `${trendColor}15`,
              border: `1px solid ${trendColor}30`,
              borderRadius: 5,
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {trendIcon}
            <span>
              {trendValue !== undefined ? `%${trendValue}` : trendLabel}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
