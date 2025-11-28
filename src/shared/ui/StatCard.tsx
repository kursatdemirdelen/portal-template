import React, { type ReactNode } from "react";
import { Typography } from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import { colors, gradients, avatarColors, hexToRgba } from "@/shared/styles";

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

const createColorVariant = (gradient: string, accent: string) => ({
  gradient,
  accent,
  border: hexToRgba(accent, 0.3),
  icon: hexToRgba(accent, 0.6),
  hover: hexToRgba(accent, 0.18),
});

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
  blue: createColorVariant(gradients.colorBlue, colors.info),
  purple: createColorVariant(gradients.colorPurple, colors.accent),
  green: createColorVariant(gradients.colorGreen, colors.success),
  orange: createColorVariant(gradients.colorOrange, colors.warning),
  red: createColorVariant(gradients.colorRed, colors.error),
  cyan: createColorVariant(gradients.colorCyan, avatarColors.cyan),
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
    trend === "up"
      ? colors.success
      : trend === "down"
      ? colors.error
      : colors.textTertiary;

  const iconSurface = {
    background: hexToRgba(config.accent, 0.08),
    border: `1px solid ${hexToRgba(config.accent, 0.2)}`,
  };

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
              background: iconSurface.background,
              border: iconSurface.border,
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
              color: colors.textPrimary,
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
