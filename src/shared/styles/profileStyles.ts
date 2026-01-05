import { CSSProperties } from "react";
import {
  colors,
  backgrounds,
  shadows,
  spacing,
  radius,
  hexToRgba,
  theme,
} from "./index";

/**
 * Profile Page Styles
 * ===================
 * Profil sayfası için merkezi stil sistemi.
 * Proje genelindeki detailStyles.ts ile tutarlı.
 *
 * @module shared/styles/profileStyles
 */

// ============================================================================
// PROFILE HEADER STYLES
// ============================================================================

export const profileHeaderStyles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column" as const,
    gap: spacing.xl,
    padding: spacing.lg,
    background: `linear-gradient(135deg, ${hexToRgba(colors.primary, 0.03)} 0%, ${hexToRgba(colors.primary, 0.08)} 100%)`,
    borderRadius: radius.lg,
    border: `1px solid ${hexToRgba(colors.primary, 0.1)}`,
  } as CSSProperties,

  leftSection: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: spacing.xl,
    width: "100%",
  } as CSSProperties,

  avatar: {
    minWidth: 100,
    maxWidth: 100,
    minHeight: 100,
    maxHeight: 100,
    width: 100,
    height: 100,
    borderRadius: "50%",
    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryLight} 100%)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 36,
    fontWeight: 600,
    color: "#fff",
    boxShadow: `0 4px 14px ${hexToRgba(colors.primary, 0.3)}`,
    border: `3px solid ${backgrounds.card}`,
    flexShrink: 0,
  } as CSSProperties,

  info: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    textAlign: "center" as const,
    gap: spacing.xs,
  } as CSSProperties,

  name: {
    fontSize: 24,
    fontWeight: 700,
    color: theme.colors.text.primary,
    marginBottom: 0,
    lineHeight: 1.2,
  } as CSSProperties,

  title: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    marginBottom: spacing.xs,
  } as CSSProperties,

  badges: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: spacing.xs,
    marginTop: spacing.xs,
  } as CSSProperties,

  roleBadge: {
    fontWeight: 600,
    fontSize: 11,
    padding: `${spacing.xs}px ${spacing.sm}px`,
    borderRadius: radius.full,
  } as CSSProperties,
};

// ============================================================================
// CARD STYLES (Tab içerikleri için)
// ============================================================================

export const profileCardStyles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: spacing.lg,
  } as CSSProperties,

  item: {
    padding: spacing.lg,
    background: backgrounds.card,
    borderRadius: radius.md,
    border: `1px solid ${theme.colors.border.subtle}`,
    transition: "all 0.2s ease",
  } as CSSProperties,

  itemHover: {
    borderColor: hexToRgba(colors.primary, 0.3),
    boxShadow: shadows.sm,
    transform: "translateY(-2px)",
  } as CSSProperties,

  itemHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: spacing.md,
  } as CSSProperties,

  itemTitle: {
    fontSize: 15,
    fontWeight: 600,
    color: theme.colors.text.primary,
    marginBottom: 2,
  } as CSSProperties,

  itemSubtitle: {
    fontSize: 13,
    color: theme.colors.text.secondary,
  } as CSSProperties,

  itemContent: {
    display: "flex",
    flexDirection: "column" as const,
    gap: spacing.xs,
  } as CSSProperties,

  itemMeta: {
    fontSize: 12,
    color: theme.colors.text.muted,
    display: "flex",
    alignItems: "center",
    gap: spacing.xs,
  } as CSSProperties,
};

// ============================================================================
// LANGUAGE CARD STYLES
// ============================================================================

export const languageCardStyles = {
  card: {
    padding: spacing.lg,
    background: backgrounds.card,
    borderRadius: radius.md,
    border: `1px solid ${theme.colors.border.subtle}`,
    transition: "all 0.2s ease",
  } as CSSProperties,

  cardHover: {
    borderColor: hexToRgba(colors.primary, 0.3),
    boxShadow: shadows.sm,
  } as CSSProperties,

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  } as CSSProperties,

  languageName: {
    display: "flex",
    alignItems: "center",
    gap: spacing.sm,
  } as CSSProperties,

  icon: {
    width: 32,
    height: 32,
    borderRadius: radius.sm,
    background: hexToRgba(colors.primary, 0.1),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: colors.primary,
    fontSize: 16,
  } as CSSProperties,

  skillGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: spacing.sm,
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTop: `1px solid ${theme.colors.border.subtle}`,
  } as CSSProperties,

  skillItem: {
    display: "flex",
    flexDirection: "column" as const,
    gap: spacing.xs,
  } as CSSProperties,

  skillLabel: {
    fontSize: 11,
    color: theme.colors.text.muted,
    textTransform: "uppercase" as const,
    letterSpacing: 0.5,
  } as CSSProperties,
};

// ============================================================================
// CERTIFICATION CARD STYLES
// ============================================================================

export const certificationCardStyles = {
  card: {
    padding: spacing.lg,
    background: backgrounds.card,
    borderRadius: radius.md,
    border: `1px solid ${theme.colors.border.subtle}`,
    borderLeftWidth: 4,
    transition: "all 0.2s ease",
  } as CSSProperties,

  cardActive: {
    borderLeftColor: colors.success,
  } as CSSProperties,

  cardExpired: {
    borderLeftColor: colors.error,
  } as CSSProperties,

  cardExpiring: {
    borderLeftColor: colors.warning,
  } as CSSProperties,

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: spacing.md,
  } as CSSProperties,

  title: {
    fontSize: 14,
    fontWeight: 600,
    color: theme.colors.text.primary,
    marginBottom: 4,
    lineHeight: 1.3,
  } as CSSProperties,

  issuer: {
    fontSize: 13,
    color: theme.colors.text.secondary,
  } as CSSProperties,

  statusBadge: {
    fontSize: 11,
    fontWeight: 600,
    padding: `${spacing.xs}px ${spacing.sm}px`,
    borderRadius: radius.full,
    display: "flex",
    alignItems: "center",
    gap: 4,
    whiteSpace: "nowrap" as const,
  } as CSSProperties,

  meta: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: spacing.xs,
    marginTop: spacing.md,
  } as CSSProperties,

  footer: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTop: `1px solid ${theme.colors.border.subtle}`,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  } as CSSProperties,

  credentialId: {
    fontSize: 12,
    color: theme.colors.text.muted,
  } as CSSProperties,

  verifyLink: {
    fontSize: 12,
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    gap: 4,
  } as CSSProperties,
};

// ============================================================================
// FAMILY CARD STYLES
// ============================================================================

export const familyCardStyles = {
  card: {
    padding: spacing.lg,
    background: backgrounds.card,
    borderRadius: radius.md,
    border: `1px solid ${theme.colors.border.subtle}`,
    transition: "all 0.2s ease",
  } as CSSProperties,

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  } as CSSProperties,

  nameSection: {
    display: "flex",
    alignItems: "center",
    gap: spacing.sm,
  } as CSSProperties,

  genderIcon: {
    width: 28,
    height: 28,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
  } as CSSProperties,

  maleIcon: {
    background: hexToRgba(colors.info, 0.1),
    color: colors.info,
  } as CSSProperties,

  femaleIcon: {
    background: hexToRgba(colors.error, 0.1),
    color: colors.error,
  } as CSSProperties,

  name: {
    fontSize: 14,
    fontWeight: 600,
    color: theme.colors.text.primary,
  } as CSSProperties,

  badges: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 4,
    alignItems: "flex-end",
  } as CSSProperties,

  details: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTop: `1px solid ${theme.colors.border.subtle}`,
    display: "flex",
    flexDirection: "column" as const,
    gap: spacing.xs,
  } as CSSProperties,

  detailItem: {
    fontSize: 12,
    color: theme.colors.text.secondary,
    display: "flex",
    alignItems: "center",
    gap: spacing.xs,
  } as CSSProperties,
};

// ============================================================================
// TIMELINE STYLES
// ============================================================================

export const profileTimelineStyles = {
  item: {
    paddingBottom: spacing.lg,
  } as CSSProperties,

  content: {
    padding: spacing.md,
    background: backgrounds.card,
    borderRadius: radius.md,
    border: `1px solid ${theme.colors.border.subtle}`,
    marginLeft: spacing.sm,
  } as CSSProperties,

  title: {
    fontSize: 14,
    fontWeight: 600,
    color: theme.colors.text.primary,
    marginBottom: spacing.xs,
  } as CSSProperties,

  subtitle: {
    fontSize: 13,
    color: theme.colors.text.secondary,
  } as CSSProperties,

  meta: {
    fontSize: 12,
    color: theme.colors.text.muted,
    marginTop: spacing.xs,
    display: "flex",
    alignItems: "center",
    gap: spacing.xs,
  } as CSSProperties,
};

// ============================================================================
// SECTION TITLE STYLES
// ============================================================================

export const sectionTitleStyles = {
  container: {
    display: "flex",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.lg,
  } as CSSProperties,

  icon: {
    width: 32,
    height: 32,
    borderRadius: radius.sm,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
  } as CSSProperties,

  primaryIcon: {
    background: hexToRgba(colors.primary, 0.1),
    color: colors.primary,
  } as CSSProperties,

  infoIcon: {
    background: hexToRgba(colors.info, 0.1),
    color: colors.info,
  } as CSSProperties,

  warningIcon: {
    background: hexToRgba(colors.warning, 0.1),
    color: colors.warning,
  } as CSSProperties,

  errorIcon: {
    background: hexToRgba(colors.error, 0.1),
    color: colors.error,
  } as CSSProperties,

  successIcon: {
    background: hexToRgba(colors.success, 0.1),
    color: colors.success,
  } as CSSProperties,

  title: {
    fontSize: 16,
    fontWeight: 600,
    color: theme.colors.text.primary,
    margin: 0,
  } as CSSProperties,

  count: {
    marginLeft: spacing.xs,
  } as CSSProperties,
};
