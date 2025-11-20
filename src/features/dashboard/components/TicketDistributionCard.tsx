import React from "react";
import { Typography } from "antd";

const { Text } = Typography;

export interface DistributionItem {
  label: string;
  value: number;
  color: string;
}

interface TicketDistributionCardProps {
  items: DistributionItem[];
}

export const TicketDistributionCard: React.FC<TicketDistributionCardProps> = ({
  items,
}) => {
  const total = items.reduce((sum, item) => sum + item.value, 0) || 1;

  const gradientStops = items.reduce(
    (acc, item) => {
      const start = acc.angle;
      const angle = (item.value / total) * 360;
      const end = start + angle;
      return {
        angle: end,
        stops: [...acc.stops, `${item.color} ${start}deg ${end}deg`],
      };
    },
    { angle: 0, stops: [] as string[] }
  );

  const gradient = gradientStops.stops.join(", ");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 16,
        gap: 48,
      }}
    >
      <div
        style={{
          width: 160,
          height: 160,
          borderRadius: "50%",
          background: `conic-gradient(${gradient})`,
          position: "relative",
          boxShadow: "0 8px 18px rgba(15, 23, 42, 0.12)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 22,
            borderRadius: "50%",
            background: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            color: "#0f172a",
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: 700 }}>{total}</Text>
          <span
            style={{
              fontSize: 10,
              color: "#94a3b8",
              textTransform: "uppercase",
              letterSpacing: 0.45,
            }}
          >
            Toplam Bilet
          </span>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {items.map((item) => (
          <div
            key={item.label}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "8px 10px",
              borderRadius: 6,
              border: "1px solid #edf2ff",
              background: "#fdfdff",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: item.color,
                  display: "inline-block",
                }}
              />
              <Text style={{ fontWeight: 600, color: "#0f172a" }}>
                {item.label}
              </Text>
            </div>
            <Text style={{ fontWeight: 600, color: "#334155" }}>
              {item.value}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
};
