/**
 * Style Utility Helpers
 * Tekrarlayan CSS işlemlerini sadeleştirmek için
 */

import { colorPalette, shadows } from './styleConstants';

/* ===========================
   RENK HELPER'LARI
   =========================== */

const statusMap: Record<string, { bg: string; text: string; border: string }> = {
  "Yeni İstek": { bg: "rgba(52, 152, 219, 0.15)", text: colorPalette.primary, border: "rgba(52, 152, 219, 0.3)" },
  "Atanan": { bg: "rgba(155, 89, 182, 0.15)", text: "#8e44ad", border: "rgba(155, 89, 182, 0.3)" },
  "Çözümlenen": { bg: "rgba(39, 174, 96, 0.15)", text: colorPalette.success, border: "rgba(39, 174, 96, 0.3)" },
  "In Progress": { bg: "rgba(59, 130, 246, 0.1)", text: colorPalette.primary, border: "rgba(59, 130, 246, 0.3)" },
  Review: { bg: "rgba(168, 85, 247, 0.1)", text: "#8e44ad", border: "rgba(168, 85, 247, 0.3)" },
  Done: { bg: "rgba(34, 197, 94, 0.1)", text: colorPalette.success, border: "rgba(34, 197, 94, 0.3)" },
  Todo: { bg: "rgba(148, 163, 184, 0.1)", text: colorPalette.textSecondary, border: "rgba(148, 163, 184, 0.3)" },
};

export const getStatusStyle = (status: string) => {
  return statusMap[status] || statusMap["Todo"];
};

export const getPriorityColor = (priority: string): string => {
  const priorityMap: Record<string, string> = {
    'High': colorPalette.error,
    'Medium': colorPalette.warning,
    'Low': colorPalette.success,
  };
  return priorityMap[priority] || colorPalette.textMuted;
};

export const getProjectStatusStyle = (status: string) => {
  const projectMap: Record<string, { bg: string; text: string }> = {
    'On Track': {
      bg: 'rgba(34, 197, 94, 0.1)',
      text: colorPalette.success,
    },
    'At Risk': {
      bg: 'rgba(239, 68, 68, 0.1)',
      text: colorPalette.error,
    },
    'Planning': {
      bg: 'rgba(59, 130, 246, 0.1)',
      text: colorPalette.primary,
    },
  };
  return projectMap[status] || projectMap['Planning'];
};

export const getTrendColor = (trend: 'up' | 'down' | 'neutral'): string => {
  switch (trend) {
    case 'up':
      return colorPalette.success;
    case 'down':
      return colorPalette.error;
    case 'neutral':
    default:
      return colorPalette.textMuted;
  }
};

/* ===========================
   SHADOW HELPER'LARI
   =========================== */

export const getCardShadow = (isHovered: boolean, accentColor?: string): string => {
  if (!isHovered) {
    return shadows.md;
  }
  return accentColor ? `0 12px 24px ${accentColor}20` : shadows.hover;
};

/* ===========================
   GRID VE LAYOUT HELPER'LARI
   =========================== */

export const flexCenterStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
} as const;

export const flexBetweenStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
} as const;

export const flexColumnStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
} as const;

/* ===========================
   TRUNCATE VE TEXT HELPER'LARI
   =========================== */

export const ellipsisStyle = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap' as const,
} as const;

export const multiLineEllipsisStyle = (lines: number = 2) => ({
  display: '-webkit-box',
  WebkitLineClamp: lines,
  WebkitBoxOrient: 'vertical' as const,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
} as const);

/* ===========================
   BORDER VE BOX HELPER'LARI
   =========================== */

export const createBorderStyle = (color: string, opacity: number = 1) => {
  return `1px solid ${color.includes('rgba') ? color : `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`}`;
};

export const createHoverTransition = (property: string = 'all') => {
  return `${property} 0.3s cubic-bezier(0.4, 0, 0.2, 1)`;
};
