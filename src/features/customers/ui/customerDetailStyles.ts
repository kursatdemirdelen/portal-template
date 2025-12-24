/**
 * Customer Detail Styles
 * Shared detailStyles'dan türetilmiş customer-specific stiller
 */

import { CSSProperties } from "react";
import {
  colors,
  shadows,
  backgrounds,
  borderColors,
  hexToRgba,
  spacing,
  radius,
} from "@/shared/styles";

export const customerDetailStyles = {
  // ============ Card Base - Tüm kartlar için ortak ============
  card: {
    borderRadius: radius.lg,
    boxShadow: shadows.sm,
  } as CSSProperties,

  cardFullHeight: {
    borderRadius: radius.lg,
    boxShadow: shadows.sm,
    height: "100%",
  } as CSSProperties,

  cardBody: {
    padding: `${spacing.lg}px ${spacing.xl}px`,
  } as CSSProperties,

  // ============ Hero Card ============
  heroAvatar: {
    backgroundColor: hexToRgba(backgrounds.card, 0.2),
    fontSize: 22,
    fontWeight: 600,
    border: `2px solid ${hexToRgba(backgrounds.card, 0.3)}`,
  } as CSSProperties,

  heroTitle: {
    color: backgrounds.card,
    margin: 0,
    fontSize: 18,
  } as CSSProperties,

  heroSubtitle: {
    color: hexToRgba(backgrounds.card, 0.85),
    fontSize: 13,
  } as CSSProperties,

  heroTagContainer: {
    marginTop: spacing.sm,
  } as CSSProperties,

  heroTag: {
    borderRadius: radius.lg,
    padding: `${spacing.xs}px ${spacing.md}px`,
    fontSize: 12,
    margin: 0,
  } as CSSProperties,

  heroIdBox: {
    background: hexToRgba(backgrounds.card, 0.15),
    borderRadius: radius.lg,
    padding: `${spacing.md}px ${spacing.lg}px`,
    backdropFilter: "blur(10px)",
    textAlign: "center" as const,
  } as CSSProperties,

  heroIdLabel: {
    color: hexToRgba(backgrounds.card, 0.9),
    fontSize: 12,
  } as CSSProperties,

  heroIdValue: {
    color: backgrounds.card,
    margin: `${spacing.xs}px 0 0 0`,
    fontSize: 20,
  } as CSSProperties,

  // ============ Info Card / Descriptions ============
  descriptionLabel: {
    fontWeight: 500,
    color: colors.textSecondary,
    padding: `${spacing.xs}px ${spacing.sm}px`,
  } as CSSProperties,

  descriptionContent: {
    color: colors.textPrimary,
    padding: `${spacing.xs}px ${spacing.sm}px`,
  } as CSSProperties,

  // ============ Inner Cards ============
  innerCard: {
    borderRadius: radius.md,
    height: "100%",
  } as CSSProperties,

  innerCardBody: {
    padding: 12,
  } as CSSProperties,

  // ============ License Card ============
  licenseTagLarge: {
    fontSize: 15,
    padding: "8px 24px",
    borderRadius: 20,
  } as CSSProperties,

  licenseDateBox: (type: "success" | "error"): CSSProperties => ({
    background: type === "success" ? backgrounds.successBg : backgrounds.errorBg,
    borderRadius: 8,
    padding: 12,
    textAlign: "center" as const,
  }),

  licenseDateLabel: {
    fontSize: 12,
    display: "block",
    marginTop: 4,
  } as CSSProperties,

  licenseDateValue: {
    fontSize: 14,
  } as CSSProperties,

  licenseKeyBox: {
    background: backgrounds.neutral50,
    borderRadius: 8,
    padding: "12px 14px",
    border: `1px solid ${borderColors.neutral}`,
  } as CSSProperties,

  licenseKeyLabel: {
    fontSize: 12,
    display: "block",
    marginBottom: 6,
  } as CSSProperties,

  // ============ Empty State ============
  emptyState: {
    textAlign: "center" as const,
    padding: 40,
  } as CSSProperties,

  emptyIcon: {
    fontSize: 48,
    color: colors.textMuted,
  } as CSSProperties,

  emptyText: {
    marginTop: 16,
  } as CSSProperties,

  emptyButton: {
    marginTop: 16,
  } as CSSProperties,

  // ============ Text Sizes ============
  textXs: { fontSize: 11 } as CSSProperties,
  textSm: { fontSize: 12 } as CSSProperties,
  textBase: { fontSize: 13 } as CSSProperties,
  textMd: { fontSize: 14 } as CSSProperties,

  // ============ Copy Button ============
  copyButton: {
    cursor: "pointer",
    color: colors.info,
    fontSize: 12,
  } as CSSProperties,
};
