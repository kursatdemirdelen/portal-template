/**
 * Ant Design Theme Configuration
 * tokens.ts'ten değerler çekilerek Ant Design ConfigProvider için ThemeConfig oluşturur
 */

import type { ThemeConfig } from 'antd';
import { colors, backgrounds, borderColors, typography, shadows, spacing, radius } from './tokens';

export const antdTheme: ThemeConfig = {
  token: {
    // Background Colors
    colorBgBase: backgrounds.card,
    colorBgContainer: backgrounds.page,
    colorBgElevated: backgrounds.card,
    colorBgLayout: backgrounds.page,
    colorBgMask: backgrounds.overlay,

    // Text Colors
    colorTextBase: colors.textPrimary,
    colorTextSecondary: colors.textSecondary,
    colorTextTertiary: colors.textTertiary,
    colorTextQuaternary: colors.textMuted,

    // Border Colors
    colorBorder: borderColors.light,
    colorBorderBg: backgrounds.cardAlt,
    colorBorderSecondary: borderColors.medium,

    // Primary Color & Variants
    colorPrimary: colors.primary,
    colorPrimaryBg: 'rgba(91, 122, 237, 0.08)',
    colorPrimaryBorder: 'rgba(91, 122, 237, 0.3)',
    colorPrimaryText: colors.primary,

    // Success
    colorSuccess: colors.success,
    colorSuccessBg: 'rgba(16, 185, 129, 0.08)',
    colorSuccessBorder: 'rgba(16, 185, 129, 0.3)',
    colorSuccessText: colors.success,

    // Warning
    colorWarning: colors.warning,
    colorWarningBg: 'rgba(245, 158, 11, 0.08)',
    colorWarningBorder: 'rgba(245, 158, 11, 0.3)',
    colorWarningText: colors.warning,

    // Error
    colorError: colors.error,
    colorErrorBg: 'rgba(239, 68, 68, 0.08)',
    colorErrorBorder: 'rgba(239, 68, 68, 0.3)',
    colorErrorText: colors.error,

    // Info
    colorInfo: colors.info,
    colorInfoBg: 'rgba(59, 130, 246, 0.08)',
    colorInfoBorder: 'rgba(59, 130, 246, 0.3)',
    colorInfoText: colors.info,

    // Link Colors
    colorLink: colors.primary,
    colorLinkHover: colors.primaryLight,
    colorLinkActive: colors.primary,

    // Typography
    fontSize: typography.fontSize.base,
    fontSizeHeading1: typography.fontSize['4xl'],
    fontSizeHeading2: typography.fontSize['3xl'],
    fontSizeHeading3: typography.fontSize['2xl'],
    fontSizeHeading4: typography.fontSize.xl,
    fontSizeHeading5: typography.fontSize.lg,
    fontSizeLG: typography.fontSize.lg,
    fontSizeSM: typography.fontSize.xs,

    fontFamily: typography.fontFamily,
    fontFamilyCode: typography.fontFamilyMono,

    fontWeightStrong: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.normal,
    lineHeightHeading1: typography.lineHeight.tight,
    lineHeightHeading2: 1.35,

    // Spacing
    margin: spacing.lg,
    marginXS: spacing.xs,
    marginXXS: 2,
    marginSM: spacing.sm,
    marginLG: spacing['2xl'],
    marginXL: spacing['3xl'],
    marginXXL: spacing['4xl'],

    padding: spacing.lg,
    paddingXS: spacing.xs,
    paddingXXS: 2,
    paddingSM: spacing.sm,
    paddingLG: spacing['2xl'],
    paddingXL: spacing['3xl'],

    // Border Radius
    borderRadius: radius.md,
    borderRadiusLG: radius.lg,
    borderRadiusSM: radius.sm,
    borderRadiusXS: 4,

    // Shadows
    boxShadow: shadows.sm,

    // Control sizing
    controlHeight: 32,
    controlHeightLG: 40,
    controlHeightSM: 24,
    controlHeightXS: 16,

    // Screen sizes
    screenXS: 480,
    screenSM: 576,
    screenMD: 768,
    screenLG: 992,
    screenXL: 1200,
    screenXXL: 1600,
  },

  components: {
    Layout: {
      headerBg: backgrounds.card,
      headerColor: colors.textPrimary,
      headerHeight: 56,
      bodyBg: backgrounds.page,
      siderBg: backgrounds.sidebar,
      triggerBg: 'rgba(91, 122, 237, 0.08)',
      triggerHeight: 56,
    },

    Menu: {
      darkItemBg: backgrounds.sidebar,
      darkItemHoverBg: '#2e3a51',
      darkItemSelectedBg: backgrounds.sidebarMenuActive,
      horizontalItemSelectedBg: backgrounds.sidebarMenuActive,
      darkSubMenuItemBg: '#273347',
      itemHoverBg: backgrounds.sidebarMenuHover,
      itemBorderRadius: radius.lg,
      itemHeight: 38,
      itemPaddingInline: spacing.md,
    },

    Card: {
      colorBgContainer: backgrounds.card,
      colorBorder: borderColors.light,
      borderRadiusLG: radius.lg,
      boxShadow: shadows.sm,
    },

    Input: {
      colorBgContainer: backgrounds.input,
      colorBorder: borderColors.light,
      colorTextPlaceholder: colors.textTertiary,
      colorPrimaryBorder: 'rgba(91, 122, 237, 0.5)',
      borderRadius: radius.md,
      controlHeight: 32,
    },

    Select: {
      colorBgContainer: backgrounds.input,
      colorBorder: borderColors.light,
      colorPrimaryBorder: 'rgba(91, 122, 237, 0.5)',
      colorBgElevated: backgrounds.card,
      borderRadius: radius.md,
      controlHeight: 32,
    },

    Button: {
      colorBgContainer: backgrounds.cardAlt,
      colorBorder: borderColors.medium,
      colorText: colors.textPrimary,
      colorPrimary: colors.primary,
      colorPrimaryBg: 'rgba(91, 122, 237, 0.08)',
      colorPrimaryBorder: 'rgba(91, 122, 237, 0.5)',
      colorPrimaryText: colors.primary,
      borderRadius: radius.md,
      controlHeight: 32,
    },

    Table: {
      colorBgContainer: backgrounds.card,
      colorBorder: borderColors.light,
      colorBgElevated: backgrounds.page,
      rowHoverBg: backgrounds.card,
      headerBg: backgrounds.cardAlt,
      headerColor: colors.textPrimary,
    },

    Modal: {
      colorBgElevated: backgrounds.card,
      colorBgMask: backgrounds.overlay,
      borderRadiusLG: radius.lg,
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
      titleFontSize: typography.fontSize.xl,
    },

    Dropdown: {
      colorBgElevated: backgrounds.card,
      borderRadiusLG: radius.md,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },

    Tooltip: {
      borderRadiusSM: radius.sm,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      colorBgSpotlight: 'rgba(44, 62, 80, 0.95)',
    },

    Tag: {
      colorBgContainer: 'rgba(91, 122, 237, 0.12)',
      borderRadiusSM: radius.sm,
      colorText: colors.primary,
    },

    Badge: {
      colorBgContainer: colors.error,
    },

    Progress: {
      colorPrimary: colors.primary,
    },

    Spin: {
      colorPrimary: colors.primary,
    },

    Alert: {
      colorBgContainer: 'rgba(91, 122, 237, 0.08)',
      colorBgElevated: 'rgba(91, 122, 237, 0.12)',
      colorBorder: 'rgba(91, 122, 237, 0.3)',
      colorText: colors.textPrimary,
      colorIcon: colors.primary,
      borderRadius: radius.md,
    },

    Tabs: {
      colorBgContainer: backgrounds.page,
      colorBorder: borderColors.light,
      itemSelectedColor: colors.primary,
    },

    Divider: {
      colorBgContainer: borderColors.light,
    },
  },
};
