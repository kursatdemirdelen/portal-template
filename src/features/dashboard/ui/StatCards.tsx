/**
 * Dashboard Stat Cards - Compact layout
 */

import React, { useState } from "react";
import { Row, Col, Typography } from "antd";
import { colorConfigs } from "@/shared/styles/componentStyles";
import { colorPalette, shadows } from "@/shared/styles/styleConstants";

const { Text } = Typography;

interface Stat {
  key: string;
  title: string;
  value: number | string;
  trend: "up" | "down" | "neutral";
  trendValue: number;
  icon: React.ReactNode;
  color: keyof typeof colorConfigs.cardColors;
}

interface DashboardStatCardsProps {
  stats: Stat[];
}

export const DashboardStatCards: React.FC<DashboardStatCardsProps> = ({
  stats,
}) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const getTrendStyle = (trend: "up" | "down" | "neutral") => {
    if (trend === "up")
      return {
        color: colorPalette.success,
        bg: `${colorPalette.successLight}30`,
      };
    if (trend === "down")
      return { color: colorPalette.error, bg: `${colorPalette.errorLight}30` };
    return { color: colorPalette.textTertiary, bg: "transparent" };
  };

  return (
    <Row gutter={[12, 12]} style={{ marginBottom: 0 }}>
      {stats.map((stat) => {
        const isHovered = hoveredCard === stat.key;
        const colorScheme = colorConfigs.cardColors[stat.color];
        const trendStyle = getTrendStyle(stat.trend);

        return (
          <Col key={stat.key} xs={12} sm={12} md={12} lg={12} xl={6}>
            <div
              style={{
                background: isHovered ? colorScheme.gradient : "#ffffff",
                border: `1px solid ${
                  isHovered
                    ? colorScheme.accent + "40"
                    : colorPalette.primaryLighter
                }`,
                borderRadius: 12,
                padding: 12,
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                boxShadow: isHovered ? `${shadows.hover}` : shadows.sm,
                minHeight: 120,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              onMouseEnter={() => setHoveredCard(stat.key)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 6,
                }}
              >
                <Text
                  type="secondary"
                  style={{
                    fontSize: 10,
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.3px",
                    color: "#7f8c8d",
                  }}
                >
                  {stat.title}
                </Text>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 6,
                    background: `${colorScheme.accent}15`,
                    border: `1px solid ${colorScheme.accent}40`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                    color: colorScheme.accent,
                    transition: "all 0.3s ease",
                    transform: isHovered ? "scale(1.1)" : "scale(1)",
                  }}
                >
                  {stat.icon}
                </div>
              </div>

              {/* Value */}
              <div>
                <span
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: "#2c3e50",
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </span>
              </div>

              {/* Trend */}
              {stat.trend !== "neutral" && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 12,
                    fontWeight: 600,
                    color: trendStyle.color,
                    padding: "4px 10px",
                    background: trendStyle.bg,
                    borderRadius: 6,
                    width: "fit-content",
                  }}
                >
                  <span>{stat.trend === "up" ? "+" : "-"}</span>
                  <span>%{stat.trendValue}</span>
                </div>
              )}
            </div>
          </Col>
        );
      })}
    </Row>
  );
};
