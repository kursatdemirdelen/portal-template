import { CSSProperties } from "react";
import { colors as colorPalette, backgrounds } from "@/shared/styles";

export const notificationStyles = {
  container: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "16px",
    borderRadius: 8,
    cursor: "pointer",
    transition: "all 0.2s ease",
    borderBottom: `1px solid ${colorPalette.primaryLighter}`,
  } as CSSProperties,

  containerUnread: {
    background: backgrounds.infoBg,
  } as CSSProperties,

  containerHover: {
    background: backgrounds.neutral100,
  } as CSSProperties,

  iconWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 8,
    background: backgrounds.neutral50,
    flexShrink: 0,
  } as CSSProperties,

  content: {
    flex: 1,
    minWidth: 0,
  } as CSSProperties,

  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
    gap: 8,
  } as CSSProperties,

  title: {
    fontSize: 14,
    fontWeight: 500,
    color: colorPalette.textPrimary,
    margin: 0,
  } as CSSProperties,

  titleUnread: {
    fontWeight: 600,
  } as CSSProperties,

  message: {
    fontSize: 13,
    color: colorPalette.textSecondary,
    margin: 0,
    lineHeight: 1.4,
  } as CSSProperties,

  footer: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    fontSize: 12,
    color: colorPalette.textTertiary,
    marginTop: 6,
  } as CSSProperties,

  badge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: 20,
    paddingX: "6px",
    borderRadius: 4,
    fontSize: 11,
    fontWeight: 600,
    background: colorPalette.primary,
    color: backgrounds.card,
  } as CSSProperties,

  emptyState: {
    padding: "40px 20px",
    textAlign: "center" as const,
  } as CSSProperties,

  filterTab: {
    padding: "8px 16px",
    borderRadius: 6,
    border: "1px solid transparent",
    background: "transparent",
    color: colorPalette.textSecondary,
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontSize: 13,
    fontWeight: 500,
  } as CSSProperties,

  filterTabActive: {
    background: colorPalette.primaryLighter,
    color: colorPalette.primary,
    borderColor: colorPalette.primary,
  } as CSSProperties,
};

export const getNotificationColor = (type: "info" | "success" | "warning" | "error") => {
  const colorMap = {
    success: colorPalette.success,
    warning: colorPalette.warning,
    error: colorPalette.error,
    info: colorPalette.info,
  };
  return colorMap[type];
};
