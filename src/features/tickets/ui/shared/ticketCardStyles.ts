import { CSSProperties } from "react";
import { theme } from "@/shared/styles/styleConstants";

/**
 * Ticket Detail Sidebar Card Styles
 * Merkezi stil yönetimi - inline CSS yerine reusable style objects
 */

export const ticketCardStyles = {
  // Meta Card Styles
  metaContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
    rowGap: 10,
  } as CSSProperties,

  metaItem: {
    display: "flex",
    gap: 8,
    alignItems: "flex-start",
  } as CSSProperties,

  metaIconBox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    background: "rgba(91, 122, 237, 0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "all 0.15s ease",
  } as CSSProperties,

  metaContent: {
    flex: 1,
    minWidth: 0,
  } as CSSProperties,

  metaLabel: {
    fontSize: 9,
    display: "block",
    marginBottom: 2,
    textTransform: "uppercase" as const,
    fontWeight: 600,
    letterSpacing: 0.5,
    opacity: 0.6,
  } as CSSProperties,

  metaValue: {
    fontSize: 12,
    fontWeight: 500,
    lineHeight: 1.3,
  } as CSSProperties,

  metaDivider: {
    gridColumn: "1 / -1",
    height: 1,
    background: theme.colors.border.subtle,
    margin: "3px 0",
  } as CSSProperties,

  // Project Card Styles
  projectHeader: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: 10,
    background: "linear-gradient(135deg, rgba(91, 122, 237, 0.05) 0%, rgba(91, 122, 237, 0.02) 100%)",
    borderRadius: 8,
    border: "1px solid rgba(91, 122, 237, 0.12)",
    marginBottom: 10,
    transition: "all 0.15s ease",
    cursor: "pointer",
  } as CSSProperties,

  projectHeaderHover: {
    background: "linear-gradient(135deg, rgba(91, 122, 237, 0.08) 0%, rgba(91, 122, 237, 0.04) 100%)",
    borderColor: "rgba(91, 122, 237, 0.2)",
    transform: "translateY(-1px)",
  } as CSSProperties,

  projectIconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    background: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid rgba(91, 122, 237, 0.15)",
    boxShadow: "0 2px 4px rgba(91, 122, 237, 0.08)",
  } as CSSProperties,

  projectInfo: {
    flex: 1,
    minWidth: 0,
  } as CSSProperties,

  projectName: {
    fontSize: 13,
    fontWeight: 600,
    display: "block",
    marginBottom: 3,
    color: theme.colors.text.primary,
  } as CSSProperties,

  progressContainer: {
    marginBottom: 10,
  } as CSSProperties,

  progressHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 4,
    alignItems: "center",
  } as CSSProperties,

  progressLabel: {
    fontSize: 10,
    color: theme.colors.text.secondary,
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: 0.5,
  } as CSSProperties,

  progressValue: {
    fontSize: 12,
    fontWeight: 700,
    color: theme.colors.primary,
  } as CSSProperties,

  infoRow: {
    display: "flex",
    gap: 12,
    padding: "8px 0",
    borderTop: `1px solid ${theme.colors.border.subtle}`,
    marginBottom: 10,
  } as CSSProperties,

  infoItem: {
    display: "flex",
    alignItems: "center",
    gap: 5,
  } as CSSProperties,

  infoText: {
    fontSize: 11,
    color: theme.colors.text.primary,
    fontWeight: 500,
  } as CSSProperties,

  // Timeline Styles
  timelineContainer: {
    position: "relative" as const,
    paddingLeft: 42,
  } as CSSProperties,

  timelineLine: {
    position: "absolute" as const,
    left: 17,
    top: 8,
    bottom: 8,
    width: 2,
    background: theme.colors.border.subtle,
    opacity: 0.5,
  } as CSSProperties,

  timelineItem: {
    position: "relative" as const,
  } as CSSProperties,

  timelineAvatar: {
    position: "absolute" as const,
    left: -42,
    top: 0,
    width: 36,
    height: 36,
    borderRadius: "50%",
    background: "#ffffff",
    border: `2px solid ${theme.colors.border.subtle}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  } as CSSProperties,

  timelineContent: {
    background: "transparent",
    padding: "4px 0",
    borderRadius: 0,
    border: "none",
    marginBottom: 16,
    transition: "all 0.15s ease",
  } as CSSProperties,

  timelineContentHover: {
    background: "transparent",
    borderColor: "transparent",
    transform: "none",
  } as CSSProperties,

  timelineHeader: {
    marginBottom: 4,
  } as CSSProperties,

  timelineUser: {
    fontSize: 13,
    fontWeight: 600,
    marginRight: 6,
    color: theme.colors.text.primary,
  } as CSSProperties,

  timelineAction: {
    fontSize: 13,
    color: theme.colors.text.secondary,
    fontWeight: 400,
  } as CSSProperties,

  timelineChangeBadge: {
    display: "inline-flex" as const,
    alignItems: "center",
    gap: 4,
    padding: "3px 8px",
    background: theme.colors.surface.soft,
    borderRadius: 4,
    fontSize: 11,
    marginBottom: 4,
    border: `1px solid ${theme.colors.border.subtle}`,
    fontFamily: "monospace",
  } as CSSProperties,

  timelineDate: {
    fontSize: 11,
    display: "block",
    opacity: 0.5,
  } as CSSProperties,

  // Status Tag Styles
  statusTag: {
    fontSize: 10,
    fontWeight: 600,
    padding: "2px 8px",
    borderRadius: 10,
    margin: 0,
    display: "inline-block",
    lineHeight: 1.4,
  } as CSSProperties,

  // Avatar with name
  avatarGroup: {
    display: "flex",
    alignItems: "center",
    gap: 6,
  } as CSSProperties,

  avatarName: {
    fontSize: 12,
    fontWeight: 500,
  } as CSSProperties,

  // Status dot
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    display: "inline-block",
  } as CSSProperties,
};

// Helper function for dynamic styles
export const getMetaIconBoxStyle = (isHovered: boolean): CSSProperties => ({
  ...ticketCardStyles.metaIconBox,
  ...(isHovered && {
    background: "rgba(91, 122, 237, 0.15)",
    transform: "scale(1.05)",
  }),
});

export const getProjectHeaderStyle = (isHovered: boolean): CSSProperties => ({
  ...ticketCardStyles.projectHeader,
  ...(isHovered && ticketCardStyles.projectHeaderHover),
});

export const getTimelineContentStyle = (isHovered: boolean): CSSProperties => ({
  ...ticketCardStyles.timelineContent,
  ...(isHovered && ticketCardStyles.timelineContentHover),
});
