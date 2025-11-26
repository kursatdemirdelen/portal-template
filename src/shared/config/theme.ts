import type { ThemeConfig } from 'antd';
// TODO: colorPalette ve spacing gibi sabitleri styleConstants.ts üzerinden alıp tekrar eden hex değerlerini temizle.

export const themeConfig: ThemeConfig = {
  token: {
    // Background Colors - Light & Minimal
    colorBgBase: '#ffffff',
    colorBgContainer: '#f8f9fa',
    colorBgElevated: '#ffffff',
    colorBgLayout: '#f8f9fa',
    colorBgMask: 'rgba(0, 0, 0, 0.1)',

    // Text Colors - Professional Dark Grays
    colorTextBase: '#2c3e50',
    colorTextSecondary: '#7f8c8d',
    colorTextTertiary: '#95a5a6',
    colorTextQuaternary: '#bdc3c7',

    // Border Colors - Blue Pastels
    colorBorder: '#e8eefb',
    colorBorderBg: '#f0f3f7',
    colorBorderSecondary: '#d0ddf7',

    // Primary & Accent Colors - Mavi Pastel
    colorPrimary: '#5b7aed',
    colorPrimaryBg: 'rgba(91, 122, 237, 0.08)',
    colorPrimaryBorder: 'rgba(91, 122, 237, 0.3)',
    colorPrimaryText: '#5b7aed',

    // Success, Warning, Error, Info
    colorSuccess: '#27ae60',
    colorSuccessBg: 'rgba(39, 174, 96, 0.08)',
    colorSuccessBorder: 'rgba(39, 174, 96, 0.3)',
    colorSuccessText: '#27ae60',

    colorWarning: '#f39c12',
    colorWarningBg: 'rgba(243, 156, 18, 0.08)',
    colorWarningBorder: 'rgba(243, 156, 18, 0.3)',
    colorWarningText: '#f39c12',

    colorError: '#e74c3c',
    colorErrorBg: 'rgba(231, 76, 60, 0.08)',
    colorErrorBorder: 'rgba(231, 76, 60, 0.3)',
    colorErrorText: '#e74c3c',

    colorInfo: '#3498db',
    colorInfoBg: 'rgba(52, 152, 219, 0.08)',
    colorInfoBorder: 'rgba(52, 152, 219, 0.3)',
    colorInfoText: '#3498db',

    // Link Colors
    colorLink: '#5b7aed',
    colorLinkHover: '#7b96f5',
    colorLinkActive: '#5b7aed',

    fontSize: 14,
    fontSizeHeading1: 32,
    fontSizeHeading2: 28,
    fontSizeHeading3: 24,
    fontSizeHeading4: 20,
    fontSizeHeading5: 16,
    fontSizeLG: 16,
    fontSizeSM: 12,

    fontFamily: `
      system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text',
      'Segoe UI', 'Helvetica Neue', sans-serif
    `,
    fontFamilyCode: `
      'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono',
      Consolas, 'Courier New', monospace
    `,

    fontWeightStrong: 600,
    lineHeight: 1.5,
    lineHeightHeading1: 1.2,
    lineHeightHeading2: 1.35,

    margin: 16,
    marginXS: 4,
    marginXXS: 2,
    marginSM: 8,
    marginLG: 24,
    marginXL: 32,
    marginXXL: 48,

    padding: 16,
    paddingXS: 4,
    paddingXXS: 2,
    paddingSM: 8,
    paddingLG: 24,
    paddingXL: 32,

    borderRadius: 8,
    borderRadiusLG: 12,
    borderRadiusSM: 6,
    borderRadiusXS: 4,

    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',

    controlHeight: 32,
    controlHeightLG: 40,
    controlHeightSM: 24,
    controlHeightXS: 16,

    screenXS: 480,
    screenSM: 576,
    screenMD: 768,
    screenLG: 992,
    screenXL: 1200,
    screenXXL: 1600,
  },

  components: {
    Layout: {
      headerBg: '#ffffff',
      headerColor: '#2c3e50',
      headerHeight: 56,
      bodyBg: '#f8f9fa',
      siderBg: '#2c3e50',
      triggerBg: 'rgba(91, 122, 237, 0.08)',
      triggerHeight: 56,
    },

    Menu: {
      darkItemBg: '#2c3e50',
      darkItemHoverBg: '#2e3a51', // daha yumuşak hover
      darkItemSelectedBg: 'rgba(91, 122, 237, 0.12)', // seçili için daha düşük opaklık
      horizontalItemSelectedBg: 'rgba(91, 122, 237, 0.12)',
      darkSubMenuItemBg: '#273347',
      itemHoverBg: 'rgba(91, 122, 237, 0.05)',
      itemBorderRadius: 10,
      itemHeight: 38,
      itemPaddingInline: 12,
    },

    Card: {
      colorBgContainer: '#ffffff',
      colorBorder: '#e8eefb',
      borderRadiusLG: 12,
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
    },

    Input: {
      colorBgContainer: '#f8f9fa',
      colorBorder: '#e8eefb',
      colorTextPlaceholder: '#95a5a6',
      colorPrimaryBorder: 'rgba(91, 122, 237, 0.5)',
      borderRadius: 8,
      controlHeight: 32,
    },

    Select: {
      colorBgContainer: '#f8f9fa',
      colorBorder: '#e8eefb',
      colorPrimaryBorder: 'rgba(91, 122, 237, 0.5)',
      colorBgElevated: '#ffffff',
      borderRadius: 8,
      controlHeight: 32,
    },

    Button: {
      colorBgContainer: '#f0f3f7',
      colorBorder: '#d0ddf7',
      colorText: '#2c3e50',
      colorPrimary: '#5b7aed',
      colorPrimaryBg: 'rgba(91, 122, 237, 0.08)',
      colorPrimaryBorder: 'rgba(91, 122, 237, 0.5)',
      colorPrimaryText: '#5b7aed',
      borderRadius: 8,
      controlHeight: 32,
    },

    Table: {
      colorBgContainer: '#ffffff',
      colorBorder: '#e8eefb',
      colorBgElevated: '#f8f9fa',
      rowHoverBg: '#ffffff',
      headerBg: '#f0f3f7',
      headerColor: '#2c3e50',
    },

    Modal: {
      colorBgElevated: '#ffffff',
      colorBgMask: 'rgba(0, 0, 0, 0.1)',
      borderRadiusLG: 12,
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
      titleFontSize: 18,
    },

    Dropdown: {
      colorBgElevated: '#ffffff',
      borderRadiusLG: 8,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },

    Tooltip: {
      borderRadiusSM: 6,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      colorBgSpotlight: 'rgba(44, 62, 80, 0.95)',
    },

    Tag: {
      colorBgContainer: 'rgba(91, 122, 237, 0.12)',
      borderRadiusSM: 6,
      colorText: '#5b7aed',
    },

    Badge: {
      colorBgContainer: '#e74c3c',
    },

    Progress: {
      colorPrimary: '#5b7aed',
    },

    Spin: {
      colorPrimary: '#5b7aed',
    },

    Alert: {
      colorBgContainer: 'rgba(91, 122, 237, 0.08)',
      colorBgElevated: 'rgba(91, 122, 237, 0.12)',
      colorBorder: 'rgba(91, 122, 237, 0.3)',
      colorText: '#2c3e50',
      colorIcon: '#5b7aed',
      borderRadius: 8,
    },

    Tabs: {
      colorBgContainer: '#f8f9fa',
      colorBorder: '#e8eefb',
      itemSelectedColor: '#5b7aed',
    },

    Divider: {
      colorBgContainer: '#e8eefb',
    },
  },
};
