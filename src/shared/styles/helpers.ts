/**
 * Style Helpers - Tekrarlayan CSS işlemlerini sadeleştirmek için
 * componentStyles.ts ve styleHelpers.ts'den konsolide edilmiş
 */

import { 
  colors, 
  shadows, 
  spacing, 
  radius,
  backgrounds,
  borderColors,
  gradients,
} from './tokens';
import { hexToRgba } from './colorUtils';

/* ===========================
   UTILITY TYPES
   =========================== */

type PillStyle = { bg: string; text: string; border?: string };
type LabelMeta = { label: string; color: string };

const createPillStyle = (hex: string, alpha: number = 0.12): PillStyle => ({
  bg: hexToRgba(hex, alpha),
  text: hex,
  border: hexToRgba(hex, Math.min(alpha + 0.1, 0.4)),
});

const createStatusStyle = (color: string, bg?: string, borderAlpha = 0.35) => ({
  bg: bg ?? hexToRgba(color, 0.15),
  text: color,
  border: hexToRgba(color, borderAlpha),
});

/* ===========================
   ROLE & STATUS STYLES
   =========================== */

const roleStyles: Record<string, PillStyle> = {
  admin: createPillStyle(colors.orange, 0.18),
  manager: createPillStyle(colors.info, 0.15),
  user: createPillStyle(colors.green, 0.15),
  customer: createPillStyle(colors.accent, 0.15),
  support: createPillStyle(colors.warning, 0.18),
};

const teamStatusStyleMap: Record<string, PillStyle> = {
  'Aktif': createPillStyle(colors.success, 0.18),
  'Beklemede': createPillStyle(colors.textSecondary, 0.18),
};

const assignmentStatusMetaMap: Record<string, LabelMeta> = {
  'active': { label: 'Devam Ediyor', color: colors.primary },
  'completed': { label: 'Tamamlandı', color: colors.success },
  'overdue': { label: 'Gecikmiş', color: colors.error },
  'pending': { label: 'Beklemede', color: colors.warning },
};

const assignmentPriorityMetaMap: Record<string, LabelMeta> = {
  'high': { label: 'Yüksek', color: colors.error },
  'medium': { label: 'Orta', color: colors.warning },
  'low': { label: 'Düşük', color: colors.primary },
};

const statusMap: Record<string, { bg: string; text: string; border: string }> = {
  "Açık": createStatusStyle(colors.info, backgrounds.infoBg),
  "Yeni İstek": createStatusStyle(colors.info, backgrounds.infoBg),
  "İşlemde": createStatusStyle(colors.accent, hexToRgba(colors.accent, 0.12)),
  "Atanan": createStatusStyle(colors.accent, hexToRgba(colors.accent, 0.12)),
  "Çözüldü": createStatusStyle(colors.success, backgrounds.successBg),
  "Çözümlenen": createStatusStyle(colors.success, backgrounds.successBg),
  "Kapalı": createStatusStyle(colors.textSecondary, backgrounds.neutral100),
  "Open": createStatusStyle(colors.info, backgrounds.infoBg),
  "In Progress": createStatusStyle(colors.primary, backgrounds.hover),
  "Review": createStatusStyle(colors.accent, hexToRgba(colors.accent, 0.12)),
  "Done": createStatusStyle(colors.success, backgrounds.successBg),
  "Closed": createStatusStyle(colors.textSecondary, backgrounds.neutral100),
  "Todo": createStatusStyle(colors.textSecondary, hexToRgba(colors.textSecondary, 0.1), 0.3),
};

const requestTypeStyleMap: Record<string, PillStyle> = {
  "Teknik Destek": createPillStyle(colors.info, 0.15),
  "İyileştirme Önerisi": createPillStyle(colors.success, 0.15),
  "Yeni Özellik Önerisi": createPillStyle(colors.accent, 0.15),
  "Hata Bildirimi": createPillStyle(colors.error, 0.15),
  "Kritik Hata": createPillStyle(colors.error, 0.2),
  "Acil Destek": createPillStyle(colors.warning, 0.18),
  "Hata": createPillStyle(colors.error, 0.15),
  "Özellik": createPillStyle(colors.accent, 0.15),
  "Dokümantasyon": createPillStyle(colors.info, 0.15),
  "Performans": createPillStyle(colors.warning, 0.15),
  "Güvenlik": createPillStyle(colors.error, 0.15),
  "Tasarım": createPillStyle(colors.accent, 0.15),
  "Destek": createPillStyle(colors.info, 0.15),
  "Technical Support": createPillStyle(colors.info, 0.15),
  "Suggest Improvement": createPillStyle(colors.success, 0.15),
  "Suggest a New Feature": createPillStyle(colors.accent, 0.15),
  "Report a BUG": createPillStyle(colors.error, 0.15),
  "Bug": createPillStyle(colors.error, 0.15),
  "Feature": createPillStyle(colors.accent, 0.15),
  "Documentation": createPillStyle(colors.info, 0.15),
  "Performance": createPillStyle(colors.warning, 0.15),
  "Security": createPillStyle(colors.error, 0.15),
  "Design": createPillStyle(colors.accent, 0.15),
  "Support": createPillStyle(colors.info, 0.15),
};

/* ===========================
   GETTER FUNCTIONS - ROLE & STATUS
   =========================== */

export const getRoleStyle = (role: string): PillStyle => {
  const normalized = role.toLowerCase();
  return roleStyles[normalized] || createPillStyle(colors.textSecondary, 0.15);
};

export const getStatusStyle = (status: string) => {
  return statusMap[status] || statusMap["Todo"];
};

export const getRequestTypeStyle = (type: string): PillStyle => {
  return requestTypeStyleMap[type] || createPillStyle(colors.textSecondary, 0.15);
};

export const getTeamStatusStyle = (status: string): PillStyle => {
  return teamStatusStyleMap[status] || createPillStyle(colors.textSecondary, 0.12);
};

export const getProjectStatusStyle = (status: string) => {
  const projectMap: Record<string, { bg: string; text: string }> = {
    'On Track': {
      bg: 'rgba(16, 185, 129, 0.1)',
      text: colors.success,
    },
    'At Risk': {
      bg: 'rgba(239, 68, 68, 0.1)',
      text: colors.error,
    },
    'Planning': {
      bg: 'rgba(91, 122, 237, 0.1)',
      text: colors.primary,
    },
  };
  return projectMap[status] || projectMap['Planning'];
};

export const getPriorityColor = (priority: string): string => {
  const priorityMap: Record<string, string> = {
    'High': colors.error,
    'Medium': colors.warning,
    'Low': colors.success,
  };
  return priorityMap[priority] || colors.textMuted;
};

export const getTrendColor = (trend: 'up' | 'down' | 'neutral'): string => {
  switch (trend) {
    case 'up':
      return colors.success;
    case 'down':
      return colors.error;
    case 'neutral':
    default:
      return colors.textMuted;
  }
};

export const getAssignmentStatusMeta = (status: string): LabelMeta => {
  return assignmentStatusMetaMap[status] || { label: status, color: colors.textSecondary };
};

export const getAssignmentPriorityMeta = (priority: string): LabelMeta => {
  return assignmentPriorityMetaMap[priority] || { label: priority, color: colors.textSecondary };
};

/* ===========================
   SHADOW HELPERS
   =========================== */

export const getCardShadow = (isHovered: boolean, accentColor?: string): string => {
  if (!isHovered) {
    return shadows.md;
  }
  return accentColor ? `0 12px 24px ${accentColor}20` : shadows.hover;
};

/* ===========================
   FLEXBOX & LAYOUT HELPERS
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

export const flexStartStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
} as const;

/* ===========================
   TEXT & TRUNCATION HELPERS
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
   BORDER & BOX HELPERS
   =========================== */

export const createBorderStyle = (color: string, opacity: number = 1) => {
  return `1px solid ${color.includes('rgba') ? color : `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`}`;
};

export const createHoverTransition = (property: string = 'all') => {
  return `${property} 0.3s cubic-bezier(0.4, 0, 0.2, 1)`;
};

/* ===========================
   COMPONENT-SPECIFIC STYLE OBJECTS
   =========================== */

export const cardStyles = {
  statCard: {
    container: {
      borderRadius: radius.lg,
      padding: spacing.lg,
      cursor: 'pointer',
      transition: `all 300ms cubic-bezier(0.4, 0, 0.2, 1)`,
      position: 'relative' as const,
      overflow: 'hidden' as const,
    },
    icon: {
      width: 36,
      height: 36,
      borderRadius: radius.md,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 18,
      marginLeft: spacing.lg,
      transition: `all 300ms cubic-bezier(0.4, 0, 0.2, 1)`,
    },
    decoration: {
      position: 'absolute' as const,
      top: -40,
      right: -40,
      width: 120,
      height: 120,
      borderRadius: '50%',
      opacity: 0.08,
      pointerEvents: 'none' as const,
    },
    value: {
      fontSize: 32,
      fontWeight: 700,
      color: colors.textPrimary,
      lineHeight: 1,
      letterSpacing: '-1px',
    },
    trend: {
      display: 'flex',
      alignItems: 'center',
      gap: spacing.sm,
      fontSize: 12,
      fontWeight: 600,
      padding: `${spacing.sm}px ${spacing.lg}px`,
      borderRadius: radius.md,
      whiteSpace: 'nowrap' as const,
      width: 'fit-content',
    },
  },

  sectionCard: {
    container: {
      borderRadius: radius.lg,
      transition: `all 300ms cubic-bezier(0.4, 0, 0.2, 1)`,
      overflow: 'hidden',
      position: 'relative' as const,
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: spacing.lg,
    },
    title: {
      margin: 0,
      fontSize: 16,
      fontWeight: 600,
      color: colors.textPrimary,
      letterSpacing: '-0.3px',
    },
  },
} as const;

export const listStyles = {
  teamList: {
    container: {
      border: `1px solid ${colors.primaryLighter}`,
      borderRadius: radius.lg,
      overflow: 'hidden',
    },
    headerRow: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr 1fr',
      padding: `${spacing.md}px ${spacing.lg}px`,
      fontSize: 11,
      textTransform: 'uppercase' as const,
      letterSpacing: 0.4,
      fontWeight: 600,
      color: colors.textSecondary,
      background: backgrounds.neutral50,
    },
    row: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr 1fr',
      padding: `${spacing.md + 2}px ${spacing.lg}px`,
      alignItems: 'center',
      borderTop: `1px solid ${colors.primaryLighter}`,
    },
    name: {
      fontWeight: 600,
      color: colors.textPrimary,
    },
    project: {
      color: colors.textSecondary,
      fontWeight: 500,
    },
    infoColumn: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: spacing.xs,
    },
    metaRow: {
      display: 'flex',
      alignItems: 'center',
      gap: spacing.sm,
    },
    avatarRow: {
      display: 'flex',
      alignItems: 'center',
      gap: spacing.md,
    },
    statusTag: {
      borderRadius: radius.full,
      fontWeight: 600,
      padding: `${spacing.xs}px ${spacing.sm + 2}px`,
      display: 'inline-flex',
      alignItems: 'center',
      gap: spacing.xs,
    },
  },
} as const;

export const tableStyles = {
  ticketTable: {
    outer: {
      width: '100%',
      overflowX: 'auto' as const,
    },
    inner: {
      minWidth: 720,
    },
    headerRow: {
      display: 'grid',
      gridTemplateColumns: '80px 1.6fr 1.1fr 1fr 1fr 1fr',
      padding: `${spacing.sm}px ${spacing.lg}px`,
      fontSize: 11,
      fontWeight: 600,
      textTransform: 'uppercase' as const,
      letterSpacing: 0.3,
      color: colors.textSecondary,
      borderBottom: `1px solid ${colors.primaryLighter}`,
      background: backgrounds.neutral50,
      borderRadius: radius.md,
      marginBottom: spacing.sm,
    },
    row: {
      display: 'grid',
      gridTemplateColumns: '80px 1.6fr 1.1fr 1fr 1fr 1fr',
      padding: `${spacing.md + 2}px ${spacing.lg}px`,
      alignItems: 'center',
      borderRadius: radius.md,
      border: `1px solid ${colors.primaryLighter}`,
      marginBottom: spacing.sm,
    },
    idCell: {
      fontWeight: 600,
      color: colors.textPrimary,
    },
    title: {
      color: colors.textPrimary,
      fontWeight: 600,
    },
    project: {
      color: colors.textSecondary,
      fontWeight: 500,
    },
    chip: {
      padding: `${spacing.xs}px ${spacing.sm + 2}px`,
      fontSize: 11,
      fontWeight: 600,
      borderRadius: radius.sm,
      width: 'fit-content',
    },
  },
} as const;

export const toolbarStyles = {
  filter: {
    container: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap: spacing.md,
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: spacing.lg,
    },
    inputs: {
      flex: 1,
      minWidth: 220,
    },
    actions: {
      display: 'flex',
      alignItems: 'center',
      gap: spacing.sm,
    },
  },
} as const;

/* ===========================
   COLOR CONFIGS FOR COMPONENTS
   =========================== */

export const colorConfigs = {
  status: {
    'In Progress': {
      bg: hexToRgba(colors.primary, 0.12),
      text: colors.primary,
      border: hexToRgba(colors.primary, 0.3),
    },
    'Review': {
      bg: hexToRgba(colors.accent, 0.12),
      text: colors.accent,
      border: hexToRgba(colors.accent, 0.3),
    },
    'Done': {
      bg: backgrounds.successBg,
      text: colors.success,
      border: hexToRgba(colors.success, 0.3),
    },
    'Todo': {
      bg: hexToRgba(colors.textSecondary, 0.12),
      text: colors.textSecondary,
      border: hexToRgba(colors.textSecondary, 0.3),
    },
  },

  priority: {
    'High': colors.error,
    'Medium': colors.warning,
    'Low': colors.success,
  },

  projectStatus: {
    'On Track': {
      bg: 'rgba(16, 185, 129, 0.12)',
      text: colors.success,
    },
    'At Risk': {
      bg: 'rgba(239, 68, 68, 0.12)',
      text: colors.error,
    },
    'Planning': {
      bg: 'rgba(91, 122, 237, 0.12)',
      text: colors.primary,
    },
  },

  cardColors: {
    blue: {
      gradient: gradients.colorBlue,
      accent: colors.primary,
      hover: hexToRgba(colors.primary, 0.08),
    },
    purple: {
      gradient: gradients.colorPurple,
      accent: colors.accent,
      hover: hexToRgba(colors.accent, 0.08),
    },
    green: {
      gradient: gradients.colorGreen,
      accent: colors.success,
      hover: hexToRgba(colors.success, 0.08),
    },
    cyan: {
      gradient: gradients.colorCyan,
      accent: colors.info,
      hover: hexToRgba(colors.info, 0.08),
    },
  },
} as const;

/* ===========================
   LAYOUT STYLES
   =========================== */

export const layoutStyles = {
  appLayout: {
    container: {
      minHeight: '100vh',
      background: backgrounds.page,
    },
    sider: {
      logo: {
        height: 56,
        margin: spacing.lg,
        color: borderColors.gray,
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',
        fontSize: 18,
        letterSpacing: 0.6,
        paddingInline: 4,
        borderRadius: radius.lg,
        background: 'rgba(255,255,255,0.06)',
      },
    },
    header: {
      background: backgrounds.topbar,
      paddingInline: spacing.xl,
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      gap: spacing.md,
      boxShadow: shadows.sm,
      borderBottom: `1px solid ${backgrounds.hover}`,
    },
    content: {
      margin: spacing.md,
      padding: 0,
      background: backgrounds.page,
    },
  },

  pageContainer: {
    root: {
      background: backgrounds.page,
      minHeight: '100%',
    },
    headerBackground: backgrounds.card,
    headerBorder: `1px solid ${borderColors.gray}`,
    bodyBackground: backgrounds.cardAlt,
    headerContainer: {
      borderRadius: radius.lg,
      boxShadow: '0 2px 6px rgba(15, 23, 42, 0.06)',
      marginBottom: spacing.md,
    },
    breadcrumb: {
      fontSize: 12,
      color: colors.textSecondary,
      marginBottom: spacing.md,

    },
    titleRow: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: spacing.md,
    },
    icon: {
      fontSize: 28,
      color: colors.primary,
      display: 'flex',
      alignItems: 'center',
    },
    actions: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: spacing.sm,
    },
    title: {
      fontSize: 18,
      fontWeight: 600,
      color: colors.textPrimary, 
      margin: 0,
      wordBreak: 'break-word' as const,
    },
    subtitle: {
      fontSize: 12,
      color: colors.textSecondary,
      wordBreak: 'break-word' as const,
    },
  },
} as const;

