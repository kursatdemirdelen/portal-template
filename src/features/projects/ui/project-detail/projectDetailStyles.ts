/**
 * Project Detail Styles
 * Shared detailStyles'dan türetilmiş - kod tekrarı önlendi
 */

import { CSSProperties } from "react";
import {
  detailStyles,
  getMetaIconBoxStyle,
  getListItemStyle,
} from "@/shared/styles/detailStyles";
import { theme, colors } from "@/shared/styles";

// Re-export shared styles with project-specific alias
export const projectDetailStyles = {
  // ============ Meta Card - shared'dan ============
  metaContainer: detailStyles.metaCard.container,
  metaItem: detailStyles.metaCard.item,
  metaIconBox: detailStyles.metaCard.iconBox,
  metaContent: detailStyles.metaCard.content,
  metaLabel: detailStyles.metaCard.label,
  metaValue: detailStyles.metaCard.value,
  metaDivider: detailStyles.metaCard.divider,

  // ============ Description - shared'dan ============
  descriptionHeader: detailStyles.description.header,
  descriptionAvatar: detailStyles.description.avatar,
  descriptionInfo: detailStyles.description.info,
  descriptionName: detailStyles.description.name,
  descriptionDate: detailStyles.description.date,
  descriptionTag: detailStyles.description.tag,
  descriptionContent: detailStyles.description.content,

  // ============ Team Card - shared listItem'dan ============
  teamCard: detailStyles.listItem.container,
  teamCardHover: detailStyles.listItem.containerHover,
  teamIconBox: detailStyles.listItem.iconBox,
  teamInfo: detailStyles.listItem.content,
  teamName: detailStyles.listItem.title,
  teamRole: detailStyles.listItem.subtitle,

  // ============ Ticket Item - shared listItem'dan ============
  ticketItem: {
    padding: "10px 12px",
    marginBottom: 8,
    background: theme.colors.surface.base,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: theme.colors.border.subtle,
    display: "flex",
    alignItems: "center",
    gap: 12,
    borderRadius: 6,
    transition: "all 0.2s ease",
    cursor: "pointer",
  } as CSSProperties,
  ticketItemHover: {
    background: theme.colors.surface.soft,
    borderColor: theme.colors.primary,
    transform: "translateX(2px)",
  } as CSSProperties,
  ticketIconBox: {
    width: 32,
    height: 32,
    borderRadius: 6,
    background: theme.colors.surface.soft,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: theme.colors.border.subtle,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  } as CSSProperties,
  ticketInfo: detailStyles.listItem.content,
  ticketId: {
    fontSize: 11,
    fontWeight: 600,
    color: colors.primary,
    display: "block",
  } as CSSProperties,
  ticketTitle: {
    fontSize: 12,
    fontWeight: 500,
    color: theme.colors.text.primary,
    display: "block",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap" as const,
    marginTop: 2,
  } as CSSProperties,

  // ============ Timeline - shared'dan ============
  timelineItem: detailStyles.timeline.item,
  timelineDot: detailStyles.timeline.dot,
  timelineLine: detailStyles.timeline.line,
  timelineContent: detailStyles.timeline.content,
  timelineTitle: detailStyles.timeline.user,
  timelineDate: detailStyles.timeline.date,

  // ============ Progress - shared'dan ============
  progressContainer: detailStyles.progress.container,
  progressHeader: detailStyles.progress.header,
  progressLabel: detailStyles.progress.label,
  progressValue: detailStyles.progress.value,

  // ============ Stat Box - shared'dan ============
  statBox: detailStyles.statBox.container,
  statValue: detailStyles.statBox.value,
  statLabel: detailStyles.statBox.label,
};

// Re-export helper functions
export { getMetaIconBoxStyle, getListItemStyle };
