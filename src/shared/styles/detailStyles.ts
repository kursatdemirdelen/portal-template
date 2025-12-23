import { CSSProperties } from "react";
import { theme, hexToRgba, colors, backgrounds, shadows } from "./index";

/**
 * Shared Detail Page Styles
 * =========================
 * Hem Ticket hem Project detay sayfaları için ortak stil sistemi.
 * Kod tekrarını önler ve tutarlı tasarım sağlar.
 * 
 * @module shared/styles/detailStyles
 */

// ============================================================================
// META CARD STYLES (Sağ kolon bilgi kartları)
// ============================================================================

export const metaCardStyles = {
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
    rowGap: 10,
  } as CSSProperties,

  item: {
    display: "flex",
    gap: 8,
    alignItems: "flex-start",
  } as CSSProperties,

  itemFullWidth: {
    gridColumn: "1 / -1",
  } as CSSProperties,

  iconBox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    background: hexToRgba(colors.primary, 0.08),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "all 0.15s ease",
  } as CSSProperties,

  iconBoxHover: {
    background: "rgba(91, 122, 237, 0.15)",
    transform: "scale(1.05)",
  } as CSSProperties,

  content: {
    flex: 1,
    minWidth: 0,
  } as CSSProperties,

  label: {
    fontSize: 9,
    display: "block",
    marginBottom: 2,
    textTransform: "uppercase" as const,
    fontWeight: 600,
    letterSpacing: 0.5,
    opacity: 0.6,
  } as CSSProperties,

  value: {
    fontSize: 12,
    fontWeight: 500,
    lineHeight: 1.3,
  } as CSSProperties,

  divider: {
    gridColumn: "1 / -1",
    height: 1,
    background: theme.colors.border.subtle,
    margin: "3px 0",
  } as CSSProperties,

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
  } as CSSProperties,

  statusTag: {
    fontSize: 11,
    fontWeight: 600,
    padding: "2px 8px",
    borderRadius: 4,
    margin: 0,
  } as CSSProperties,
};

// ============================================================================
// DESCRIPTION STYLES (Sol kolon açıklama kartları)
// ============================================================================

export const descriptionStyles = {
  header: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  } as CSSProperties,

  avatar: {
    flexShrink: 0,
  } as CSSProperties,

  info: {
    flex: 1,
    minWidth: 0,
  } as CSSProperties,

  name: {
    fontSize: 14,
    fontWeight: 600,
    color: theme.colors.text.primary,
    display: "block",
  } as CSSProperties,

  date: {
    fontSize: 11,
    color: theme.colors.text.secondary,
    display: "block",
    marginTop: 2,
  } as CSSProperties,

  tag: {
    fontSize: 10,
    fontWeight: 600,
    padding: "2px 8px",
    borderRadius: 4,
  } as CSSProperties,

  content: {
    background: theme.colors.surface.soft,
    border: `1px solid ${theme.colors.border.subtle}`,
    borderRadius: 6,
    padding: "12px 14px",
    fontSize: 13,
    lineHeight: 1.6,
    color: theme.colors.text.primary,
  } as CSSProperties,
};

// ============================================================================
// LIST ITEM STYLES (Ticket, Attachment, vb. liste öğeleri)
// ============================================================================

export const listItemStyles = {
  item: {
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

  itemHover: {
    background: theme.colors.surface.soft,
    borderColor: theme.colors.primary,
    transform: "translateX(2px)",
  } as CSSProperties,

  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 6,
    background: theme.colors.surface.soft,
    border: `1px solid ${theme.colors.border.subtle}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  } as CSSProperties,

  iconBoxLarge: {
    width: 40,
    height: 40,
  } as CSSProperties,

  info: {
    flex: 1,
    minWidth: 0,
  } as CSSProperties,

  title: {
    fontSize: 12,
    fontWeight: 500,
    color: theme.colors.text.primary,
    display: "block",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap" as const,
  } as CSSProperties,

  subtitle: {
    fontSize: 11,
    fontWeight: 600,
    color: colors.primary,
    display: "block",
  } as CSSProperties,

  meta: {
    fontSize: 11,
    color: theme.colors.text.secondary,
    display: "block",
    marginTop: 2,
  } as CSSProperties,
};

// ============================================================================
// CARD HEADER STYLES (Gradient kartlar - Project, Team vb.)
// ============================================================================

export const cardHeaderStyles = {
  container: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: 10,
    background: `linear-gradient(135deg, ${hexToRgba(colors.primary, 0.05)} 0%, ${hexToRgba(colors.primary, 0.02)} 100%)`,
    borderRadius: 8,
    border: `1px solid ${hexToRgba(colors.primary, 0.12)}`,
    marginBottom: 10,
    transition: "all 0.15s ease",
    cursor: "pointer",
  } as CSSProperties,

  containerHover: {
    background: `linear-gradient(135deg, ${hexToRgba(colors.primary, 0.08)} 0%, ${hexToRgba(colors.primary, 0.04)} 100%)`,
    borderColor: hexToRgba(colors.primary, 0.2),
    transform: "translateY(-1px)",
  } as CSSProperties,

  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    background: backgrounds.card,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: `1px solid ${hexToRgba(colors.primary, 0.15)}`,
    boxShadow: shadows.sm,
  } as CSSProperties,

  info: {
    flex: 1,
    minWidth: 0,
  } as CSSProperties,

  title: {
    fontSize: 13,
    fontWeight: 600,
    color: theme.colors.text.primary,
    display: "block",
  } as CSSProperties,

  subtitle: {
    fontSize: 11,
    color: theme.colors.text.secondary,
    display: "block",
    marginTop: 2,
  } as CSSProperties,
};

// ============================================================================
// TIMELINE STYLES
// ============================================================================

export const timelineStyles = {
  item: {
    display: "flex",
    gap: 12,
    position: "relative" as const,
    paddingBottom: 16,
  } as CSSProperties,

  itemLast: {
    paddingBottom: 0,
  } as CSSProperties,

  dot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: colors.primary,
    flexShrink: 0,
    marginTop: 4,
    zIndex: 1,
  } as CSSProperties,

  line: {
    position: "absolute" as const,
    left: 4,
    top: 14,
    bottom: 0,
    width: 2,
    background: theme.colors.border.subtle,
  } as CSSProperties,

  content: {
    flex: 1,
    minWidth: 0,
  } as CSSProperties,

  title: {
    fontSize: 12,
    fontWeight: 600,
    color: theme.colors.text.primary,
    display: "block",
  } as CSSProperties,

  date: {
    fontSize: 11,
    color: theme.colors.text.secondary,
    display: "block",
    marginTop: 2,
  } as CSSProperties,
};

// ============================================================================
// PROGRESS STYLES
// ============================================================================

export const progressStyles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 8,
  } as CSSProperties,

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  } as CSSProperties,

  label: {
    fontSize: 12,
    fontWeight: 500,
    color: theme.colors.text.secondary,
  } as CSSProperties,

  value: {
    fontSize: 14,
    fontWeight: 700,
    color: colors.primary,
  } as CSSProperties,
};

// ============================================================================
// STAT BOX STYLES
// ============================================================================

export const statBoxStyles = {
  container: {
    padding: 12,
    background: theme.colors.surface.soft,
    borderRadius: 8,
    border: `1px solid ${theme.colors.border.subtle}`,
    textAlign: "center" as const,
  } as CSSProperties,

  value: {
    fontSize: 24,
    fontWeight: 700,
    color: colors.primary,
    display: "block",
  } as CSSProperties,

  label: {
    fontSize: 11,
    color: theme.colors.text.secondary,
    display: "block",
    marginTop: 4,
    textTransform: "uppercase" as const,
    letterSpacing: 0.5,
  } as CSSProperties,
};

// ============================================================================
// SECTION HEADER STYLES
// ============================================================================

export const sectionHeaderStyles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  } as CSSProperties,

  titleGroup: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  } as CSSProperties,

  icon: {
    color: colors.primary,
  } as CSSProperties,

  title: {
    fontSize: 16,
    fontWeight: 600,
    color: theme.colors.text.primary,
    margin: 0,
  } as CSSProperties,

  badge: {
    fontSize: 11,
    margin: 0,
  } as CSSProperties,
};

// ============================================================================
// COMMON ELEMENT STYLES
// ============================================================================

export const statusTagStyle = {
  fontSize: 10,
  fontWeight: 600,
  padding: "2px 8px",
  borderRadius: 10,
  margin: 0,
  display: "inline-block",
  lineHeight: 1.4,
} as CSSProperties;

export const statusDotStyle = {
  width: 7,
  height: 7,
  borderRadius: "50%",
  display: "inline-block",
} as CSSProperties;

export const avatarGroupStyle = {
  display: "flex",
  alignItems: "center",
  gap: 6,
} as CSSProperties;

export const avatarNameStyle = {
  fontSize: 12,
  fontWeight: 500,
} as CSSProperties;

// ============================================================================
// COMBINED EXPORT (Kolay erişim için)
// ============================================================================

export const detailStyles = {
  metaCard: metaCardStyles,
  description: descriptionStyles,
  listItem: {
    ...listItemStyles,
    // Card header'ı da listItem altına ekleyelim
    container: cardHeaderStyles.container,
    containerHover: cardHeaderStyles.containerHover,
    iconBox: cardHeaderStyles.iconBox,
    content: cardHeaderStyles.info,
    title: cardHeaderStyles.title,
    subtitle: cardHeaderStyles.subtitle,
    // Info row stiller
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
  },
  cardHeader: cardHeaderStyles,
  timeline: {
    ...timelineStyles,
    // Timeline için ek stiller - ticket compatibility
    container: {
      position: "relative" as const,
      paddingLeft: 42,
    } as CSSProperties,
    avatar: {
      position: "absolute" as const,
      left: -42,
      top: 0,
      width: 36,
      height: 36,
      borderRadius: "50%",
      background: backgrounds.card,
      border: `2px solid ${theme.colors.border.subtle}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1,
    } as CSSProperties,
    header: {
      marginBottom: 4,
    } as CSSProperties,
    user: {
      fontSize: 13,
      fontWeight: 600,
      marginRight: 6,
      color: theme.colors.text.primary,
    } as CSSProperties,
    action: {
      fontSize: 13,
      color: theme.colors.text.secondary,
      fontWeight: 400,
    } as CSSProperties,
    changeBadge: {
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
    contentHover: {
      background: "transparent",
      borderColor: "transparent",
      transform: "none",
    } as CSSProperties,
  },
  progress: progressStyles,
  statBox: statBoxStyles,
  sectionHeader: sectionHeaderStyles,
  // Common elements
  statusTag: statusTagStyle,
  statusDot: statusDotStyle,
  avatar: {
    group: avatarGroupStyle,
    name: avatarNameStyle,
  },
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Meta icon box'ın hover state'ini döndürür
 */
export const getMetaIconBoxStyle = (isHovered: boolean): CSSProperties => ({
  ...metaCardStyles.iconBox,
  ...(isHovered && metaCardStyles.iconBoxHover),
});

/**
 * List item container'ın hover state'ini döndürür
 */
export const getListItemStyle = (isHovered: boolean): CSSProperties => ({
  ...cardHeaderStyles.container,
  ...(isHovered && cardHeaderStyles.containerHover),
});

/**
 * Card header'ın hover state'ini döndürür
 */
export const getCardHeaderStyle = (isHovered: boolean): CSSProperties => ({
  ...cardHeaderStyles.container,
  ...(isHovered && cardHeaderStyles.containerHover),
});

/**
 * Timeline content'in hover state'ini döndürür
 */
export const getTimelineContentStyle = (isHovered: boolean): CSSProperties => ({
  ...detailStyles.timeline.content,
  ...(isHovered && detailStyles.timeline.contentHover),
});
