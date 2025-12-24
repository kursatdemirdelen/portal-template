/**
 * Team Detail Styles
 * Shared detailStyles'dan türetilmiş - kod tekrarı önlendi
 */

import { CSSProperties } from "react";
import { detailStyles } from "@/shared/styles/detailStyles";
import {
  colors,
  spacing,
  radius,
  shadows,
  backgrounds,
  borderColors,
} from "@/shared/styles";

export const teamDetailStyles = {
  // ============ Card Styles ============
  card: {
    borderRadius: radius.lg,
    border: `1px solid ${borderColors.light}`,
  } as CSSProperties,

  cardWithMargin: {
    borderRadius: radius.lg,
    border: `1px solid ${borderColors.light}`,
    marginBottom: spacing.lg,
  } as CSSProperties,

  // ============ Info Header ============
  infoBlock: {
    marginBottom: spacing.lg,
  } as CSSProperties,

  projectName: {
    fontSize: 13,
    color: colors.textSecondary,
    display: "block",
    marginBottom: spacing.xs,
  } as CSSProperties,

  description: {
    fontSize: 14,
    color: colors.textPrimary,
    lineHeight: 1.6,
  } as CSSProperties,

  // ============ Quick Stats - shared'dan türetilmiş ============
  statsContainer: {
    display: "flex",
    gap: spacing.lg,
    flexWrap: "wrap" as const,
  } as CSSProperties,

  statItem: {
    display: "flex",
    alignItems: "center",
    gap: 6,
  } as CSSProperties,

  statDot: {
    ...detailStyles.statusDot,
    width: 8,
    height: 8,
    background: colors.primary,
  } as CSSProperties,

  statText: {
    fontSize: 13,
    color: colors.textSecondary,
  } as CSSProperties,

  statValue: {
    color: colors.textPrimary,
    fontWeight: 600,
  } as CSSProperties,

  // ============ Leader Card - shared avatar'dan türetilmiş ============
  leaderCard: {
    background: backgrounds.neutral100,
    borderRadius: radius.md,
    padding: 16,
  } as CSSProperties,

  leaderContent: {
    ...detailStyles.avatar.group,
    gap: 12,
  } as CSSProperties,

  leaderInfo: {
    flex: 1,
  } as CSSProperties,

  leaderNameRow: {
    display: "flex",
    alignItems: "center",
    gap: 6,
  } as CSSProperties,

  leaderName: {
    fontWeight: 600,
    fontSize: 14,
    color: colors.textPrimary,
  } as CSSProperties,

  leaderRole: {
    fontSize: 12,
    color: colors.textSecondary,
  } as CSSProperties,

  // ============ Section Header - shared'dan türetilmiş ============
  sectionHeader: {
    ...detailStyles.sectionHeader.container,
    marginBottom: spacing.md,
  } as CSSProperties,

  sectionTitleGroup: detailStyles.sectionHeader.titleGroup,

  sectionTitle: {
    fontSize: 15,
    fontWeight: 600,
    color: colors.textPrimary,
  } as CSSProperties,

  sectionCount: {
    fontSize: 13,
    color: colors.textSecondary,
  } as CSSProperties,

  // ============ Member Card ============
  memberCard: {
    borderRadius: radius.lg,
    border: `1px solid ${borderColors.light}`,
    height: "100%",
    transition: "all 0.2s ease",
  } as CSSProperties,

  memberCardHover: {
    transform: "translateY(-2px)",
    boxShadow: shadows.sm,
  } as CSSProperties,

  memberCardDefault: {
    transform: "translateY(0)",
    boxShadow: "none",
  } as CSSProperties,

  memberAvatarWrapper: {
    position: "relative" as const,
    display: "inline-block",
  } as CSSProperties,

  leaderBadge: {
    position: "absolute" as const,
    bottom: -2,
    right: -2,
    background: colors.warning,
    borderRadius: "50%",
    width: 20,
    height: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: `2px solid ${backgrounds.card}`,
  } as CSSProperties,

  memberName: {
    fontWeight: 600,
    display: "block",
    marginTop: 10,
    marginBottom: 2,
    color: colors.textPrimary,
    fontSize: 13,
  } as CSSProperties,

  memberRole: {
    fontSize: 11,
    color: colors.textSecondary,
  } as CSSProperties,

  // ============ Empty State ============
  emptyState: {
    textAlign: "center" as const,
    padding: spacing.xl,
  } as CSSProperties,

  emptyStateButton: {
    marginTop: spacing.lg,
  } as CSSProperties,

  // ============ Actions ============
  actionsContainer: {
    display: "flex",
    gap: spacing.sm,
  } as CSSProperties,
};
