/**
 * Component Style Configurations
 */

import { colorPalette, gradients, spacing, radius, transitions, backgrounds, shadows } from './styleConstants';

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
    headerBackground: '#ffffff',
    headerBorder: '1px solid #e5e7eb',
    bodyBackground: '#f5f7fb',
    headerShadow: '0 2px 6px rgba(15, 23, 42, 0.06)',
    title: {
      fontSize: 20,
      fontWeight: 600,
      color: colorPalette.textPrimary,
      letterSpacing: '-0.5px',
    },
    subtitle: {
      fontSize: 12,
      color: colorPalette.textSecondary,
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
