import { CSSProperties } from "react";
import { colors, spacing, radius, shadows } from "@/shared/styles";

/**
 * User Detail Styles
 * =================
 * Kullanıcı detay sayfası için merkezi stil sistemi
 * Tickets feature'ındaki yaklaşımla tutarlı
 * 
 * @module features/users/ui/shared/userDetailStyles
 */

// ============================================================================
// PROFILE HEADER STYLES
// ============================================================================

export const profileHeaderStyles = {
  gradientBackground: (roleColor: string) => ({
    background: `linear-gradient(135deg, ${roleColor} 0%, ${roleColor}cc 100%)`,
    padding: `${spacing.xl}px ${spacing.lg}px 50px`,
    position: "relative" as const,
    overflow: "hidden" as const,
  }),

  decorativeCircleLarge: {
    position: "absolute" as const,
    top: -30,
    right: -30,
    width: 100,
    height: 100,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.1)",
  } as CSSProperties,

  decorativeCircleSmall: {
    position: "absolute" as const,
    bottom: -20,
    left: -20,
    width: 80,
    height: 80,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.08)",
  } as CSSProperties,

  content: {
    position: "relative" as const,
    zIndex: 1,
    textAlign: "center" as const,
  } as CSSProperties,

  avatar: {
    border: "4px solid white",
    boxShadow: shadows.md,
    fontSize: 42,
  } as CSSProperties,

  avatarWithImage: {
    background: "transparent",
  } as CSSProperties,

  avatarWithoutImage: {
    background: "rgba(255,255,255,0.3)",
    color: "white",
  } as CSSProperties,

  badgeDot: {
    width: 16,
    height: 16,
  } as CSSProperties,

  title: {
    color: "white",
    margin: `${spacing.sm}px 0 ${spacing.xs}px`,
    fontSize: 17,
  } as CSSProperties,

  tagContainer: {
    justifyContent: "center",
  } as CSSProperties,

  tag: {
    fontSize: 12,
    padding: `${spacing.xs}px ${spacing.sm}px`,
    borderRadius: radius.md,
    fontWeight: 600,
    backdropFilter: "blur(10px)",
  } as CSSProperties,

  roleTag: {
    background: "rgba(255,255,255,0.25)",
    border: "1px solid rgba(255,255,255,0.4)",
    color: "white",
  } as CSSProperties,

  statusTagActive: {
    background: "rgba(82, 196, 26, 0.3)",
    border: "1px solid rgba(82, 196, 26, 0.5)",
    color: "white",
  } as CSSProperties,

  statusTagInactive: {
    background: "rgba(0,0,0,0.2)",
    border: "1px solid rgba(255,255,255,0.3)",
    color: "white",
  } as CSSProperties,
};

// ============================================================================
// CONTACT CARDS STYLES
// ============================================================================

export const contactCardStyles = {
  container: {
    padding: `${spacing.md}px ${spacing.lg}px`,
    marginTop: -spacing.md,
    position: "relative" as const,
    zIndex: 2,
  } as CSSProperties,

  cardWrapper: {
    background: "#f8f9fa",
    borderRadius: radius.md,
    padding: spacing.md,
    display: "flex",
    alignItems: "center",
    gap: spacing.sm,
  } as CSSProperties,

  iconBox: (gradient: string) => ({
    width: 40,
    height: 40,
    borderRadius: radius.md,
    background: gradient,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  }),

  iconStyle: {
    fontSize: 18,
    color: "white",
  } as CSSProperties,

  content: {
    flex: 1,
    minWidth: 0,
  } as CSSProperties,

  label: {
    fontSize: 11,
    display: "block",
  } as CSSProperties,

  value: {
    fontSize: 13,
    display: "block",
    overflow: "hidden",
    textOverflow: "ellipsis",
  } as CSSProperties,

  divider: {
    margin: `${spacing.md}px 0`,
  } as CSSProperties,
};

// ============================================================================
// ORGANIZATION INFO STYLES
// ============================================================================

export const organizationStyles = {
  container: {
    width: "100%",
  } as CSSProperties,

  sectionLabel: {
    fontSize: 11,
    display: "block",
    marginBottom: spacing.xs,
  } as CSSProperties,

  fieldLabel: {
    fontSize: 10,
    display: "block",
  } as CSSProperties,

  fieldValue: {
    fontSize: 13,
  } as CSSProperties,

  systemInfoBox: {
    background: "#f5f5f5",
    padding: `${spacing.sm}px ${spacing.sm}px`,
    borderRadius: radius.sm,
    fontFamily: "monospace",
  } as CSSProperties,

  systemInfoLabel: {
    fontSize: 10,
  } as CSSProperties,

  systemInfoValue: {
    fontSize: 12,
  } as CSSProperties,
};

// ============================================================================
// ACTIVITY TIMELINE STYLES
// ============================================================================

export const activityStyles = {

  cardHeader: {
    borderBottom: "1px solid #f0f0f0", 
  } as CSSProperties,

  cardBody: {
    padding: spacing.lg,
  } as CSSProperties,

  iconBox: (gradient: string, shadowColor: string) => ({
    width: 36,
    height: 36,
    borderRadius: radius.md,
    background: gradient,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: `0 4px 12px ${shadowColor}30`,
  }),

  iconStyle: {
    fontSize: 18,
    color: "white",
  } as CSSProperties,

  card: {
    borderRadius: radius.lg,
    boxShadow: shadows.sm,
    border: "1px solid #f0f0f0",  
    background: "#fff",
  } as CSSProperties,

  timelineDotIcon: {
    
    fontSize: 16,
    color: "white",
  } as CSSProperties,

  timelineContent: {
    marginTop: spacing.xs,
  } as CSSProperties,

  timelineTitle: { 
    
    marginLeft: spacing.sm,
    fontSize: 14,
    display: "block",
  } as CSSProperties,

  subtitle: { 
    marginLeft: spacing.sm,
    color: colors.textSecondary,
    fontSize: 13,  
    fontWeight: 400,
    display: "block",
  } as CSSProperties,

  timelineDate: {
    
    marginLeft: spacing.sm,
    fontSize: 11,
  } as CSSProperties,
};

// ============================================================================
// ROLE PERMISSIONS STYLES
// ============================================================================

export const rolePermissionsStyles = {
  card: {
    borderRadius: radius.lg,
    boxShadow: shadows.sm,
    border: "1px solid #f0f0f0",
    overflow: "hidden" as const,
  } as CSSProperties,

  header: (roleColor: string) => ({
    background: `linear-gradient(135deg, ${roleColor}15 0%, ${roleColor}05 100%)`,
    padding: `${spacing.md}px ${spacing.lg}px`,
    borderBottom: `2px solid ${roleColor}`,
  }),

  headerIconBox: (roleColor: string, shadowColor: string) => ({
    width: 48,
    height: 48,
    borderRadius: radius.sm,
    background: `linear-gradient(135deg, ${roleColor} 0%, ${roleColor}cc 100%)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: `0 6px 16px ${shadowColor}40`,
  }),

  headerIcon: {
    fontSize: 24,
    color: "white",
  } as CSSProperties,

  headerContent: {
    flex: 1,
  } as CSSProperties,

  headerSubtitle: {
    display: "block",
    fontSize: 12,
  } as CSSProperties,

  headerTitle: (roleColor: string) => ({
    margin: 0,
    color: roleColor,
    fontSize: 16,
  }),

  body: {
    padding: spacing.lg,
  } as CSSProperties,

  description: {
    marginBottom: spacing.md,
    fontSize: 13,
  } as CSSProperties,

  statsCard: (bgColor: string, borderColor: string) => ({
    background: `linear-gradient(135deg, ${bgColor}10 0%, ${bgColor}05 100%)`,
    border: `1px solid ${borderColor}30`,
    borderRadius: radius.md,
  }),

  statsTitle: {
    fontSize: 11,
  } as CSSProperties,

  statsValue: (color: string) => ({
    fontSize: 14,
    color: color,
    fontWeight: 600,
  }),

  button: (shadowColor: string) => ({
    height: 40,
    borderRadius: radius.md,
    fontSize: 14,
    fontWeight: 500,
    background: `linear-gradient(135deg, ${colors.primary} 0%, #667eea 100%)`,
    border: "none",
    boxShadow: `0 4px 16px ${shadowColor}40`,
  }),
};

// ============================================================================
// PAGE ACTIONS STYLES
// ============================================================================

export const pageActionStyles = {
  editButton: {
    background: `linear-gradient(135deg, ${colors.primary} 0%, #667eea 100%)`,
    border: "none",
    boxShadow: "0 4px 15px rgba(99, 102, 241, 0.3)",
  } as CSSProperties,

  loadingContainer: {
    textAlign: "center" as const,
    padding: 50,
  } as CSSProperties,
};

// ============================================================================
// MAIN CARD STYLES
// ============================================================================

export const mainCardStyles = {
  card: {
    borderRadius: radius.lg,
    boxShadow: shadows.sm,
    border: "none",
    overflow: "hidden" as const,
    background: "white",
  } as CSSProperties,

  cardBody: {
    padding: 0,
  } as CSSProperties,
};
