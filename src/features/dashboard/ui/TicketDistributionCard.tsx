import React, { memo, useMemo, type CSSProperties } from "react";
import { Typography } from "antd";
import {
  backgrounds,
  borderColors,
  colors,
  hexToRgba,
  shadows,
} from "@/shared/styles";

const { Text } = Typography;

export interface DistributionItem {
  label: string;
  value: number;
  color: string;
}

interface TicketDistributionCardProps {
  items: DistributionItem[];
}

/* ---- Styles ---- */

const containerStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: 16,
  gap: 64,
};

const chartWrapperStyle: CSSProperties = {
  marginTop: 16,
  width: 180,
  height: 180,
  borderRadius: "50%",
  position: "relative",
  boxShadow: shadows.lg,
};

const chartInnerStyle: CSSProperties = {
  position: "absolute",
  inset: 22,
  borderRadius: "50%",
  background: backgrounds.card,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 2,
  color: colors.textPrimary,
};

const totalLabelStyle: CSSProperties = {
  fontSize: 24,
  fontWeight: 700,
};

const totalSubtitleStyle: CSSProperties = {
  fontSize: 10,
  color: colors.textSecondary,
  textTransform: "uppercase",
  letterSpacing: 0.45,
};

const legendContainerStyle: CSSProperties = {
  width: "100%",
  padding: "0 16px",
  display: "flex",
  flexDirection: "column",
  gap: 16,
};

const legendItemStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "8px 10px",
  borderRadius: 6,
  border: `1px solid ${borderColors.light}`,
  background: backgrounds.cardAlt,
};

const legendLeftStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
};

const colorDotBaseStyle: CSSProperties = {
  width: 10,
  height: 10,
  borderRadius: "50%",
  display: "inline-block",
};

const labelTextStyle: CSSProperties = {
  fontWeight: 600,
  color: colors.textPrimary,
};

const valueTextStyle: CSSProperties = {
  fontWeight: 600,
  color: colors.textSecondary,
};

/* ---- Helper ---- */

function buildConicGradient(items: DistributionItem[]): string {
  const total = items.reduce((sum, item) => sum + item.value, 0);

  if (total === 0) {
    // fallback: tek renk hafif gri bir daire
    return `conic-gradient(${hexToRgba(
      colors.textSecondary,
      0.15
    )} 0deg 360deg)`;
  }

  const { stops } = items.reduce(
    (acc, item) => {
      const start = acc.angle;
      const angle = (item.value / total) * 360;
      const end = start + angle;

      acc.angle = end;
      acc.stops.push(`${item.color} ${start}deg ${end}deg`);
      return acc;
    },
    { angle: 0, stops: [] as string[] }
  );

  return `conic-gradient(${stops.join(", ")})`;
}

/* ---- Component ---- */

export const TicketDistributionCard: React.FC<TicketDistributionCardProps> =
  memo(({ items }) => {
    const total = useMemo(
      () => items.reduce((sum, item) => sum + item.value, 0),
      [items]
    );

    const gradientBackground = useMemo(
      () => buildConicGradient(items),
      [items]
    );

    return (
      <div style={containerStyle}>
        {/* Chart */}
        <div style={{ ...chartWrapperStyle, background: gradientBackground }}>
          <div style={chartInnerStyle}>
            <Text style={totalLabelStyle}>{total}</Text>
            <span style={totalSubtitleStyle}>Toplam Bilet</span>
          </div>
        </div>

        {/* Legend */}
        <div style={legendContainerStyle}>
          {items.map((item) => (
            <div key={item.label} style={legendItemStyle}>
              <div style={legendLeftStyle}>
                <span
                  style={{
                    ...colorDotBaseStyle,
                    background: item.color,
                  }}
                />
                <Text style={labelTextStyle}>{item.label}</Text>
              </div>
              <Text style={valueTextStyle}>{item.value}</Text>
            </div>
          ))}
        </div>
      </div>
    );
  });

TicketDistributionCard.displayName = "TicketDistributionCard";
