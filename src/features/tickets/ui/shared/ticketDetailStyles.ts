import { CSSProperties } from "react";
import { theme } from "@/shared/styles";

/**
 * Ticket Detail Sol Kolon Kartları için Merkezi Stil Sistemi
 * Description, Attachments, Efforts, Comments komponentleri için
 */
export const ticketDetailStyles = {
  // ============ Description Styles ============
  descriptionHeader: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  } as CSSProperties,

  descriptionAvatar: {
    flexShrink: 0,
  } as CSSProperties,

  descriptionInfo: {
    flex: 1,
    minWidth: 0, // Overflow için
  } as CSSProperties,

  descriptionName: {
    fontSize: 14,
    fontWeight: 600,
    color: theme.colors.text.primary,
    display: "block",
  } as CSSProperties,

  descriptionDate: {
    fontSize: 11,
    color: theme.colors.text.secondary,
    display: "block",
    marginTop: 2,
  } as CSSProperties,

  descriptionTag: {
    fontSize: 10,
    fontWeight: 600,
    padding: "2px 8px",
    borderRadius: 4,
  } as CSSProperties,

  descriptionContent: {
    background: theme.colors.surface.soft,
    border: `1px solid ${theme.colors.border.subtle}`,
    borderRadius: 6,
    padding: "12px 14px",
    fontSize: 13,
    lineHeight: 1.6,
    color: theme.colors.text.primary,
  } as CSSProperties,

  // ============ Attachments Styles ============
  attachmentItem: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "10px 12px",
    background: theme.colors.surface.base,
    border: `1px solid ${theme.colors.border.subtle}`,
    borderRadius: 6,
    marginBottom: 8,
    transition: "all 0.2s ease",
    cursor: "pointer",
  } as CSSProperties,

  attachmentItemHover: {
    background: theme.colors.surface.soft,
    borderColor: theme.colors.primary,
    transform: "translateX(2px)",
  } as CSSProperties,

  attachmentIconBox: {
    width: 40,
    height: 40,
    borderRadius: 6,
    background: theme.colors.surface.soft,
    border: `1px solid ${theme.colors.border.subtle}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  } as CSSProperties,

  attachmentInfo: {
    flex: 1,
    minWidth: 0,
  } as CSSProperties,

  attachmentName: {
    fontSize: 13,
    fontWeight: 500,
    color: theme.colors.text.primary,
    display: "block",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap" as const,
  } as CSSProperties,

  attachmentSize: {
    fontSize: 11,
    color: theme.colors.text.secondary,
    display: "block",
    marginTop: 2,
  } as CSSProperties,

  attachmentActions: {
    display: "flex",
    gap: 4,
  } as CSSProperties,

  // ============ Efforts Styles ============
  effortForm: {
    marginBottom: 16,
    padding: 14,
    background: theme.colors.surface.soft,
    border: `1px solid ${theme.colors.border.subtle}`,
    borderRadius: 6,
  } as CSSProperties,

  effortFormLabel: {
    fontSize: 11,
    fontWeight: 600,
    marginBottom: 6,
    display: "block",
    color: theme.colors.text.secondary,
  } as CSSProperties,

  effortFormRow: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap" as const,
    marginBottom: 10,
  } as CSSProperties,

  effortFormField: {
    flex: 1,
    minWidth: 120,
  } as CSSProperties,

  effortFormActions: {
    display: "flex",
    gap: 8,
    justifyContent: "flex-end",
    marginTop: 10,
  } as CSSProperties,

  effortItem: {
    border: `1px solid ${theme.colors.border.subtle}`,
    borderRadius: 6,
    padding: "10px 12px",
    marginBottom: 8,
    background: theme.colors.surface.base,
    transition: "all 0.15s ease",
  } as CSSProperties,

  effortItemHover: {
    borderColor: theme.colors.primary,
    boxShadow: "0 2px 6px rgba(91, 122, 237, 0.08)",
  } as CSSProperties,

  effortHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  } as CSSProperties,

  effortTime: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 12,
    color: theme.colors.text.primary,
  } as CSSProperties,

  effortDuration: {
    fontSize: 10,
    fontWeight: 600,
    padding: "2px 8px",
    borderRadius: 4,
  } as CSSProperties,

  effortDescription: {
    fontSize: 12,
    color: theme.colors.text.secondary,
    lineHeight: 1.5,
    marginBottom: 6,
  } as CSSProperties,

  effortFooter: {
    display: "flex",
    justifyContent: "flex-end",
  } as CSSProperties,

  effortTotal: {
    fontSize: 10,
    fontWeight: 600,
    padding: "3px 10px",
    borderRadius: 4,
  } as CSSProperties,

  // ============ Comments Styles ============
  commentItem: {
    marginBottom: 16,
    padding: "12px 14px",
    background: theme.colors.surface.base,
    border: `1px solid ${theme.colors.border.subtle}`,
    borderRadius: 6,
    transition: "all 0.15s ease",
  } as CSSProperties,

  commentItemHover: {
    background: theme.colors.surface.soft,
    borderColor: theme.colors.border.strong,
  } as CSSProperties,

  commentHeader: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  } as CSSProperties,

  commentAvatar: {
    flexShrink: 0,
  } as CSSProperties,

  commentAuthorInfo: {
    flex: 1,
    minWidth: 0,
  } as CSSProperties,

  commentAuthor: {
    fontSize: 13,
    fontWeight: 600,
    color: theme.colors.text.primary,
    display: "block",
  } as CSSProperties,

  commentDate: {
    fontSize: 10,
    color: theme.colors.text.secondary,
    display: "block",
    marginTop: 2,
  } as CSSProperties,

  commentContent: {
    fontSize: 13,
    lineHeight: 1.6,
    color: theme.colors.text.primary,
    marginBottom: 8,
  } as CSSProperties,

  commentFooter: {
    display: "flex",
    gap: 8,
    alignItems: "center",
  } as CSSProperties,

  commentReplyButton: {
    fontSize: 11,
    padding: "2px 8px",
    height: 24,
    cursor: "pointer",
  } as CSSProperties,

  commentForm: {
    marginTop: 16,
    paddingTop: 16,
    borderTop: `1px solid ${theme.colors.border.subtle}`,
  } as CSSProperties,

  commentFormReplyBanner: {
    marginBottom: 10,
    padding: "8px 12px",
    background: theme.colors.surface.soft,
    borderRadius: 6,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  } as CSSProperties,

  commentFormReplyText: {
    fontSize: 11,
    color: theme.colors.text.secondary,
  } as CSSProperties,

  commentFormActions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    gap: 8,
  } as CSSProperties,

  commentFormCounter: {
    fontSize: 11,
    color: theme.colors.text.secondary,
  } as CSSProperties,

  commentFormCounterWarning: {
    fontSize: 11,
    color: theme.colors.status.warning,
  } as CSSProperties,

  // ============ Empty States ============
  emptyState: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    padding: "32px 16px",
    gap: 12,
    textAlign: "center" as const,
  } as CSSProperties,

  emptyStateIcon: {
    width: 56,
    height: 56,
    borderRadius: 8,
    background: theme.colors.surface.soft,
    border: `1px solid ${theme.colors.border.subtle}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } as CSSProperties,

  emptyStateText: {
    fontSize: 12,
    color: theme.colors.text.secondary,
  } as CSSProperties,

  // ============ Common Utilities ============
  divider: {
    margin: "12px 0",
    borderColor: theme.colors.border.subtle,
  } as CSSProperties,

  badge: {
    fontSize: 10,
    fontWeight: 600,
    padding: "2px 8px",
    borderRadius: 4,
    display: "inline-block",
  } as CSSProperties,

  iconButton: {
    width: 28,
    height: 28,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    border: `1px solid ${theme.colors.border.subtle}`,
    background: "transparent",
    cursor: "pointer",
    transition: "all 0.15s ease",
  } as CSSProperties,

  iconButtonHover: {
    background: theme.colors.surface.soft,
    borderColor: theme.colors.primary,
  } as CSSProperties,
};

export default ticketDetailStyles;
