/**
 * Style Constants - Merkezileştirilmiş stil konfigürasyonları
 * TODO: Kullanılmayan sabitleri temizle, tema mappingini (AntD tokenları) bu kaynaktan türet.
 */

/* ===========================
   RENK PALETLERI
   =========================== */

export const colorPalette = {
  // Primary - Mavi pastel
  primary: '#5b7aed', // Main blue
  primaryLight: '#7b96f5', // Light blue for hover
  primaryLighter: '#e8eefb', // Very light for backgrounds

  // Complementary - Minimal use
  secondary: '#f0ad4e', // Warm accent (minimal)
  accent: '#6c5ce7', // Purple accent (minimal)

  // Status Colors - Unified and used across the app
  success: '#10b981',      // Green (Notification, Status)
  successLight: '#d1fae5', // Light green
  warning: '#f59e0b',      // Amber (Notification, Status)
  warningLight: '#fef3c7', // Light amber
  error: '#ef4444',        // Red (Notification, Status)
  errorLight: '#fee2e2',   // Light red
  info: '#3b82f6',         // Blue (Notification, Status) - Note: different from primary
  infoLight: '#dbeafe',    // Light blue

  // Semantic (aliased from above for clarity)
  cyan: '#3b82f6',
  green: '#10b981',
  orange: '#f59e0b',
  red: '#ef4444',

  // Text
  textPrimary: '#2c3e50', // Main text
  textSecondary: '#7f8c8d', // Secondary text
  textTertiary: '#95a5a6', // Tertiary text
  textMuted: '#bdc3c7', // Muted text
} as const;

export const backgrounds = {
  page: '#f8f9fa', // Main page background
  card: '#ffffff', // Card background
  cardAlt: '#f0f3f7', // Alternative card (light blue tint)
  sidebar: '#1e2a3a', // Sidebar dark (modern deep blue)
  sidebarGradient: 'linear-gradient(180deg, #1e2a3a 0%, #0f1722 100%)', // Sidebar gradient
  topbar: '#ffffff', // Topbar white
  hover: '#e8eefb', // Hover state
  input: '#f8f9fa', // Input field
  overlay: 'rgba(0, 0, 0, 0.1)',
  // Sidebar specific
  sidebarMenuHover: 'rgba(91, 122, 237, 0.12)',
  sidebarMenuActive: 'rgba(91, 122, 237, 0.2)',
  sidebarDivider: 'rgba(255, 255, 255, 0.08)',
  // Status backgrounds
  successBg: 'rgba(16, 185, 129, 0.12)',    // Success background
  warningBg: 'rgba(245, 158, 11, 0.12)',    // Warning background
  errorBg: 'rgba(239, 68, 68, 0.12)',       // Error background
  infoBg: 'rgba(59, 130, 246, 0.12)',       // Info background
  // Light neutral backgrounds for UI elements
  neutral50: '#f9fafb',
  neutral100: '#f3f4f6',
  neutral200: '#e5e7eb',
} as const;

export const borderColors = {
  light: '#e8eefb', // Light blue border
  medium: '#d0ddf7', // Medium blue border
  strong: '#c0cef5', // Strong blue border
  gray: '#ecf0f1', // Neutral border
  // Neutral borders (used in lists, tables, etc.)
  neutral: '#e2e8f0',
  light_neutral: 'rgba(226, 232, 240, 0.8)',
} as const;

/* ===========================
   GRADYENTLER
   =========================== */

export const gradients = {
  // Subtle light gradients
  bgPrimary: `linear-gradient(135deg, #f8f9fa 0%, #f0f3f7 100%)`,
  bgCard: `linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)`,
  bgElevated: `linear-gradient(135deg, #f0f3f7 0%, #e8eefb 100%)`,
  bgSubtle: `linear-gradient(135deg, #ffffff 0%, #ffffff 100%)`,

  // Sidebar gradients
  sidebarBg: `linear-gradient(180deg, #1e2a3a 0%, #0f1722 100%)`,
  sidebarLogo: `linear-gradient(135deg, #5b7aed 0%, #6c5ce7 100%)`,
  sidebarActiveItem: `linear-gradient(90deg, rgba(91, 122, 237, 0.25) 0%, rgba(91, 122, 237, 0.05) 100%)`,

  // Color-specific gradients for stat cards (updated with new color palette)
  colorBlue: `linear-gradient(135deg, rgba(91, 122, 237, 0.08) 0%, rgba(123, 150, 245, 0.05) 100%)`,
  colorGreen: `linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(52, 211, 153, 0.05) 100%)`,
  colorOrange: `linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(251, 191, 36, 0.05) 100%)`,
  colorPurple: `linear-gradient(135deg, rgba(108, 92, 231, 0.08) 0%, rgba(155, 89, 182, 0.05) 100%)`,
  colorRed: `linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, rgba(252, 165, 165, 0.05) 100%)`,
  colorCyan: `linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(147, 197, 253, 0.05) 100%)`,

  // Avatar gradient
  avatarPrimary: `linear-gradient(135deg, #5b7aed 0%, #6c5ce7 100%)`,
} as const;

/* ===========================
   SHADOW'LAR
   =========================== */

export const shadows = {
  xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px rgba(0, 0, 0, 0.08)',
  md: '0 4px 6px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px rgba(0, 0, 0, 0.12)',
  xl: '0 20px 25px rgba(0, 0, 0, 0.15)',
  hover: '0 12px 24px rgba(91, 122, 237, 0.15)',
  cardHover: (color: string) => `0 12px 24px ${color}20`,
} as const;

/* ===========================
   SPACING
   =========================== */

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
} as const;

/* ===========================
   BORDER RADIUS
   =========================== */

export const radius = {
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  full: 999,
} as const;

/* ===========================
   TYPOGRAPHY
   =========================== */

export const typography = {
  fontFamily: `system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", "Helvetica Neue", sans-serif`,
  fontFamilyMono: `"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace`,

  fontSize: {
    xs: 12,
    sm: 13,
    base: 14,
    lg: 16,
    xl: 18,
    '2xl': 20,
    '3xl': 24,
    '4xl': 32,
  },

  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

/* ===========================
   TRANSITIONS
   =========================== */

export const transitions = {
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  base: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

/* ===========================
   BREAKPOINTS
   =========================== */

export const breakpoints = {
  xs: 480,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  '2xl': 1600,
} as const;

/* ===========================
   Z-INDEX SCALE
   =========================== */

export const zIndex = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  notification: 1080,
} as const;
