/**
 * Style Utility Helpers
 * Tekrarlayan CSS işlemlerini sadeleştirmek için
 */

import { colorPalette, shadows } from './styleConstants';

type PillStyle = { bg: string; text: string; border?: string };
type LabelMeta = { label: string; color: string };

const hexToRgba = (hex: string, alpha: number): string => {
  const normalized = hex.replace('#', '');
  const bigint =
    normalized.length === 3
      ? parseInt(
          normalized
            .split('')
            .map((char) => `${char}${char}`)
            .join(''),
          16,
        )
      : parseInt(normalized, 16);

  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const createPillStyle = (hex: string, alpha: number = 0.12): PillStyle => ({
  bg: hexToRgba(hex, alpha),
  text: hex,
  border: hexToRgba(hex, Math.min(alpha + 0.1, 0.4)),
});

const roleStyles: Record<string, PillStyle> = {
  admin: createPillStyle(colorPalette.orange, 0.18),
  manager: createPillStyle(colorPalette.info, 0.15),
  user: createPillStyle(colorPalette.green, 0.15),
  customer: createPillStyle(colorPalette.accent, 0.15),
  support: createPillStyle(colorPalette.warning, 0.18),
};

const requestTypeStyleMap: Record<string, PillStyle> = {
  'Technical Support': createPillStyle(colorPalette.info, 0.18),
  'Suggest Improvement': createPillStyle(colorPalette.accent, 0.18),
  'Report a BUG': createPillStyle(colorPalette.error, 0.18),
  'Suggest a New Feature': createPillStyle(colorPalette.success, 0.18),
};

const teamStatusStyleMap: Record<string, PillStyle> = {
  'Aktif': createPillStyle(colorPalette.success, 0.18),
  'Beklemede': createPillStyle(colorPalette.textSecondary, 0.18),
};

const assignmentStatusMetaMap: Record<string, LabelMeta> = {
  'active': { label: 'Devam Ediyor', color: colorPalette.primary },
  'completed': { label: 'Tamamlandı', color: colorPalette.success },
  'overdue': { label: 'Gecikmiş', color: colorPalette.error },
  'pending': { label: 'Beklemede', color: colorPalette.warning },
};

const assignmentPriorityMetaMap: Record<string, LabelMeta> = {
  'high': { label: 'Yüksek', color: colorPalette.error },
  'medium': { label: 'Orta', color: colorPalette.warning },
  'low': { label: 'Düşük', color: colorPalette.primary },
};

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

export const getRoleStyle = (role: string): PillStyle => {
  const normalized = role.toLowerCase();
  return roleStyles[normalized] || createPillStyle(colorPalette.textSecondary, 0.15);
};

export const getStatusStyle = (status: string) => {
  return statusMap[status] || statusMap["Todo"];
};

export const getRequestTypeStyle = (type: string): PillStyle => {
  return requestTypeStyleMap[type] || createPillStyle(colorPalette.textSecondary, 0.15);
};

export const getTeamStatusStyle = (status: string): PillStyle => {
  return teamStatusStyleMap[status] || createPillStyle(colorPalette.textSecondary, 0.12);
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

export const getAssignmentStatusMeta = (status: string): LabelMeta => {
  return assignmentStatusMetaMap[status] || { label: status, color: colorPalette.textSecondary };
};

export const getAssignmentPriorityMeta = (priority: string): LabelMeta => {
  return assignmentPriorityMetaMap[priority] || { label: priority, color: colorPalette.textSecondary };
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
