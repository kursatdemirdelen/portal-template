/**
 * Application Theme
 * Centralized semantic theme object built on top of design tokens.
 * Components that require grouped style values can import from here.
 */

import {
  colors,
  spacing,
  radius,
  typography,
  transitions,
  backgrounds,
  shadows,
  borderColors,
} from "./tokens";
import { colorConfigs } from "./helpers";

export const theme = {
  colors: {
    primary: colors.primary,
    text: {
      primary: colors.textPrimary,
      secondary: colors.textSecondary,
      muted: colors.textMuted,
    },
    border: {
      subtle: borderColors.gray,
      strong: borderColors.medium,
    },
    surface: {
      base: backgrounds.card,
      alt: backgrounds.cardAlt,
      soft: backgrounds.neutral100,
    },
    status: {
      success: colors.success,
      warning: colors.warning,
      error: colors.error,
      info: colors.info,
    },
  },
  cardColors: {
    blue: {
      gradient:
        "linear-gradient(135deg, rgba(91, 122, 237, 0.08) 0%, rgba(123, 150, 245, 0.05) 100%)",
      accent: "#5b7aed",
      hover: "rgba(91, 122, 237, 0.08)",
    },
    purple: {
      gradient:
        "linear-gradient(135deg, rgba(108, 92, 231, 0.08) 0%, rgba(155, 89, 182, 0.05) 100%)",
      accent: "#6c5ce7",
      hover: "rgba(108, 92, 231, 0.08)",
    },
    green: {
      gradient:
        "linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(52, 211, 153, 0.05) 100%)",
      accent: "#10b981",
      hover: "rgba(16, 185, 129, 0.08)",
    },
    cyan: {
      gradient:
        "linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(147, 197, 253, 0.05) 100%)",
      accent: "#3b82f6",
      hover: "rgba(59, 130, 246, 0.08)",
    },
  },
  spacing,
  radius,
  typography,
  transitions,
  shadows,
  backgrounds,
  colorConfigs,
} as const;

export type AppTheme = typeof theme;
