/**
 * Ticket Card Styles
 * Shared detailStyles'dan türetilmiş ticket-specific styles
 */

import { CSSProperties } from "react";
import {
  detailStyles,
  getMetaIconBoxStyle as sharedGetMetaIconBoxStyle,
  getListItemStyle as sharedGetListItemStyle,
} from "@/shared/styles/detailStyles";
import { colors, hexToRgba } from "@/shared/styles";

// Re-export shared styles with ticket-specific alias
export const ticketCardStyles = {
  // Meta Card - shared'dan
  metaContainer: detailStyles.metaCard.container,
  metaItem: detailStyles.metaCard.item,
  metaIconBox: detailStyles.metaCard.iconBox,
  metaContent: detailStyles.metaCard.content,
  metaLabel: detailStyles.metaCard.label,
  metaValue: detailStyles.metaCard.value,
  metaDivider: detailStyles.metaCard.divider,

  // List Item Styles - shared'dan
  projectHeader: detailStyles.listItem.container,
  projectHeaderHover: detailStyles.listItem.containerHover,
  projectIconBox: detailStyles.listItem.iconBox,
  projectInfo: detailStyles.listItem.content,
  projectName: detailStyles.listItem.title,

  // Progress Styles - shared'dan
  progressContainer: detailStyles.progress.container,
  progressHeader: detailStyles.progress.header,
  progressLabel: detailStyles.progress.label,
  progressValue: detailStyles.progress.value,

  // Info Row - shared'dan
  infoRow: detailStyles.listItem.infoRow,
  infoItem: detailStyles.listItem.infoItem,
  infoText: detailStyles.listItem.infoText,

  // Timeline Styles - shared'dan
  timelineContainer: detailStyles.timeline.container,
  timelineLine: detailStyles.timeline.line,
  timelineItem: detailStyles.timeline.item,
  timelineAvatar: detailStyles.timeline.avatar,
  timelineContent: detailStyles.timeline.content,
  timelineContentHover: detailStyles.timeline.contentHover,
  timelineHeader: detailStyles.timeline.header,
  timelineUser: detailStyles.timeline.user,
  timelineAction: detailStyles.timeline.action,
  timelineChangeBadge: detailStyles.timeline.changeBadge,
  timelineDate: detailStyles.timeline.date,

  // Status & Avatar - shared'dan
  statusTag: detailStyles.statusTag,
  avatarGroup: detailStyles.avatar.group,
  avatarName: detailStyles.avatar.name,
  statusDot: detailStyles.statusDot,
};

// Helper functions - shared'dan türetilmiş
export const getMetaIconBoxStyle = (isHovered: boolean): CSSProperties =>
  sharedGetMetaIconBoxStyle(isHovered);

export const getProjectHeaderStyle = (isHovered: boolean): CSSProperties =>
  sharedGetListItemStyle(isHovered);

export const getTimelineContentStyle = (isHovered: boolean): CSSProperties => ({
  ...ticketCardStyles.timelineContent,
  ...(isHovered && ticketCardStyles.timelineContentHover),
});
