import React, { memo } from "react";
import { theme } from "@/shared/styles/styleConstants";
import type { TicketStatusMeta } from "../model/status";

interface TicketStatusChipsProps {
  summary: Array<TicketStatusMeta & { count: number }>;
}

const chipsContainerStyle: React.CSSProperties = {
  display: "flex",
  gap: theme.spacing.md,
  flexWrap: "wrap",
  justifyContent: "flex-end",
};

const chipBaseStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: theme.spacing.xs,
  padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
  borderRadius: theme.radius.full,
  fontSize: theme.typography.fontSize.xs,
  fontWeight: theme.typography.fontWeight.semibold,
};

const chipCountStyle: React.CSSProperties = {
  background: theme.colors.surface.base,
  color: theme.colors.text.primary,
  borderRadius: theme.radius.full,
  padding: `2px ${theme.spacing.xs}px`,
  fontSize: theme.typography.fontSize.xxs,
  fontWeight: theme.typography.fontWeight.bold,
  opacity: 0.95,
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
