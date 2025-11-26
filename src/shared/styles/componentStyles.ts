/**
 * Component Style Configurations
 */

import { colorPalette, gradients, spacing, radius, transitions, backgrounds, shadows, borderColors } from './styleConstants';

/* ===========================
   CARD CONFIGURATIONS
   =========================== */

export const cardStyles = {
  statCard: {
    container: {
      borderRadius: radius.lg,
      padding: spacing.lg,
      cursor: 'pointer',
      transition: `all ${transitions.base}`,
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
      transition: `all ${transitions.base}`,
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
      color: colorPalette.textPrimary,
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
      transition: `all ${transitions.base}`,
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
      color: colorPalette.textPrimary,
      letterSpacing: '-0.3px',
    },
  },
} as const;

/* ===========================
   LAYOUT CONFIGURATIONS
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
        color: '#ecf0f1',
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
      paddingInline: 20,
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      gap: 16,
      boxShadow: shadows.sm,
      borderBottom: `1px solid ${backgrounds.hover}`,
    },
    content: {
      margin: 16,
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
    bodyBackground: '#f5f7fb',
    headerContainer: {
      borderRadius: radius.lg,
      boxShadow: '0 2px 6px rgba(15, 23, 42, 0.06)',
      marginBottom: spacing.md,
    },
    breadcrumb: {
      fontSize: 12,
      color: colorPalette.textSecondary,
      marginBottom: spacing.sm,
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
      color: colorPalette.primary,
      display: 'flex',
      alignItems: 'center',
    },
    actions: {
      display: 'flex',
      alignItems: 'center',
      gap: spacing.sm,
    },
    title: {
      fontSize: 18,
      fontWeight: 600,
      color: colorPalette.textPrimary,
      letterSpacing: '-0.5px',
      margin: 0,
      wordBreak: 'break-word' as const,
    },
    subtitle: {
      fontSize: 12,
      color: colorPalette.textSecondary,
      wordBreak: 'break-word' as const,
    },
  },
} as const;

/* ===========================
   LIST / TABLE STYLES
   =========================== */

export const listStyles = {
  teamList: {
    container: {
      border: `1px solid ${colorPalette.primaryLighter}`,
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
      color: colorPalette.textSecondary,
      background: '#f8fafc',
    },
    row: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr 1fr',
      padding: `${spacing.md + 2}px ${spacing.lg}px`,
      alignItems: 'center',
      borderTop: `1px solid ${colorPalette.primaryLighter}`,
    },
    name: {
      fontWeight: 600,
      color: colorPalette.textPrimary,
    },
    project: {
      color: '#475569',
      fontWeight: 500,
    },
    infoColumn: {
      display: 'flex',
      flexDirection: 'column',
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
    avatar: {
      fontSize: 13,
      fontWeight: 600,
    },
    remainingTag: {
      borderRadius: radius.full,
      padding: `${spacing.xs}px ${spacing.sm}px`,
    },
    statusTag: {
      borderRadius: radius.full,
      fontWeight: 600,
      padding: `${spacing.xs}px ${spacing.sm + 2}px`,
      display: 'inline-flex',
      alignItems: 'center',
      gap: spacing.xs,
    },
    rowBackgrounds: {
      even: '#ffffff',
      odd: '#fbfcff',
    },
  },
} as const;


export const tableStyles = {
  ticketTable: {
    outer: {
      width: '100%',
      overflowX: 'auto',
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
      color: colorPalette.textSecondary,
      borderBottom: `1px solid ${colorPalette.primaryLighter}`,
      background: '#f8fafc',
      borderRadius: radius.md,
      marginBottom: spacing.sm,
    },
    row: {
      display: 'grid',
      gridTemplateColumns: '80px 1.6fr 1.1fr 1fr 1fr 1fr',
      padding: `${spacing.md + 2}px ${spacing.lg}px`,
      alignItems: 'center',
      borderRadius: radius.md,
      border: `1px solid ${colorPalette.primaryLighter}`,
      marginBottom: spacing.sm,
    },
    idCell: {
      fontWeight: 600,
      color: colorPalette.textPrimary,
    },
    title: {
      color: colorPalette.textPrimary,
      fontWeight: 600,
    },
    project: {
      color: colorPalette.textSecondary,
      fontWeight: 500,
    },
    meta: {
      fontSize: 12,
      color: colorPalette.textSecondary,
    },
    chip: {
      padding: `${spacing.xs}px ${spacing.sm + 2}px`,
      fontSize: 11,
      fontWeight: 600,
      borderRadius: radius.sm,
      width: 'fit-content',
    },
    avatar: {
      fontSize: 13,
      fontWeight: 600,
    },
    rowBackgrounds: {
      even: backgrounds.card,
      odd: '#fdfdff',
    },
  },
} as const;

export const toolbarStyles = {
  filter: {
    container: {
      display: 'flex',
      flexWrap: 'wrap',
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
   COLOR-SPECIFIC CONFIGS
   =========================== */

export const colorConfigs = {
  // Status colors with full config - Light theme
  status: {
    'In Progress': {
      bg: 'rgba(91, 122, 237, 0.12)',
      text: '#5b7aed',
      border: 'rgba(91, 122, 237, 0.3)',
    },
    'Review': {
      bg: 'rgba(108, 92, 231, 0.12)',
      text: '#6c5ce7',
      border: 'rgba(108, 92, 231, 0.3)',
    },
    'Done': {
      bg: 'rgba(39, 174, 96, 0.12)',
      text: '#27ae60',
      border: 'rgba(39, 174, 96, 0.3)',
    },
    'Todo': {
      bg: 'rgba(149, 165, 166, 0.12)',
      text: '#7f8c8d',
      border: 'rgba(149, 165, 166, 0.3)',
    },
  },

  // Priority colors
  priority: {
    'High': '#e74c3c',
    'Medium': '#f39c12',
    'Low': '#27ae60',
  },

  // Project status colors
  projectStatus: {
    'On Track': {
      bg: 'rgba(39, 174, 96, 0.12)',
      text: '#27ae60',
    },
    'At Risk': {
      bg: 'rgba(231, 76, 60, 0.12)',
      text: '#e74c3c',
    },
    'Planning': {
      bg: 'rgba(91, 122, 237, 0.12)',
      text: '#5b7aed',
    },
  },

  // Card colors by type - Light theme with pastels
  cardColors: {
    blue: {
      gradient: gradients.colorBlue,
      accent: '#5b7aed',
      hover: 'rgba(91, 122, 237, 0.08)',
    },
    purple: {
      gradient: gradients.colorPurple,
      accent: '#6c5ce7',
      hover: 'rgba(108, 92, 231, 0.08)',
    },
    green: {
      gradient: gradients.colorGreen,
      accent: '#27ae60',
      hover: 'rgba(39, 174, 96, 0.08)',
    },
    cyan: {
      gradient: gradients.colorCyan,
      accent: '#3498db',
      hover: 'rgba(52, 152, 219, 0.08)',
    },
  },
} as const;

/* ===========================
   ANIMATION & HOVER EFFECTS
   =========================== */

export const hoverEffects = {
  cardLift: {
    transform: 'translateY(-6px)',
  },
  cardSlight: {
    transform: 'translateY(-4px)',
  },
  iconScale: {
    transform: 'scale(1.1) rotate(5deg)',
  },
  iconNormal: {
    transform: 'scale(1) rotate(0deg)',
  },
} as const;
