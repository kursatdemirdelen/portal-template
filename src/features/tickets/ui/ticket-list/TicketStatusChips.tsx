import React, { memo } from "react";
import {
  colors,
  spacing,
  radius,
  typography,
  backgrounds,
} from "@/shared/styles";

interface StatusChipItem {
  key: string;
  label: string;
  count: number;
  color?: string;
  bg?: string;
}

interface TicketStatusChipsProps {
  summary: StatusChipItem[];
}

const chipsContainerStyle: React.CSSProperties = {
  display: "flex",
  gap: spacing.md,
  flexWrap: "wrap",
  justifyContent: "flex-end",
};

const chipBaseStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: spacing.xs,
  padding: `${spacing.xs}px ${spacing.md}px`,
  borderRadius: radius.full,
  fontSize: typography.fontSize.xs,
  fontWeight: typography.fontWeight.semibold,
};

const chipCountStyle: React.CSSProperties = {
  background: backgrounds.card,
  color: colors.textPrimary,
  borderRadius: radius.full,
  padding: `2px ${spacing.xs}px`,
  fontSize: typography.fontSize.xxs,
  fontWeight: typography.fontWeight.bold,
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
