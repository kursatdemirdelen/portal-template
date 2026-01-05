/**
 * Shared Styles - Barrel Export
 * Merkezileştirilmiş stil ve tema kaynakları
 */

// Design Tokens
export * from './tokens';
export { antdTheme } from './theme';

// Semantic theme object built on tokens
export { theme } from './appTheme';
export type { AppTheme } from './appTheme';

// Reusable style helpers
export * from './helpers';

// Utility helpers
export { hexToRgba } from './colorUtils';

// Detail Page Styles (shared across ticket, project, etc.)
export * from './detailStyles';

// Profile Page Styles
export * from './profileStyles';
