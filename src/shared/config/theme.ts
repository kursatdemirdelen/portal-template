/**
 * DEPRECATED: Use @/shared/styles instead
 * 
 * This file is maintained for backward compatibility only.
 * All theme configuration has been moved to src/shared/styles/theme.ts
 * 
 * Migration:
 * OLD: import { themeConfig } from "@/shared/config/theme";
 * NEW: import { antdTheme } from "@/shared/styles";
 */

import { antdTheme } from '@/shared/styles';

/**
 * @deprecated Use antdTheme from @/shared/styles instead
 */
export const themeConfig = antdTheme;

