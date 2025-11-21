import React, { memo } from "react";
import type { TicketStatusMeta } from "../model/status";

interface TicketStatusChipsProps {
  summary: Array<TicketStatusMeta & { count: number }>;
}

const chipsContainerStyle: React.CSSProperties = {
  display: "flex",
  gap: 12,
  flexWrap: "wrap",
  justifyContent: "flex-end",
};

const chipBaseStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  padding: "4px 12px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 600,
};

const chipCountStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.6)",
  color: "#1f2933",
  borderRadius: 999,
  padding: "2px 8px",
  fontSize: 11,
};

export const TicketStatusChips: React.FC<TicketStatusChipsProps> = memo(
  ({ summary }) => (
    <div style={chipsContainerStyle}>
      {summary.map((item) => (
        <div
          key={item.key}
          style={{
            ...chipBaseStyle,
            background: item.bg,
            color: item.color,
          }}
        >
          <span>{item.label}</span>
          <span style={chipCountStyle}>{item.count}</span>
        </div>
      ))}
    </div>
  )
);

TicketStatusChips.displayName = "TicketStatusChips";
