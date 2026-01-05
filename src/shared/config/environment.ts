/**
 * Environment Configuration
 * ==========================
 * 
 * Tüm env variables'ları merkezi bir noktadan access et
 * Type-safe ve validated
 */

/**
 * Application config
 */
export const config = {
  // API
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:7000/api',
  secureKeyLs: import.meta.env.VITE_SECURE_LS_KEY || 'portal_secret',

  // App
  appName: import.meta.env.VITE_APP_NAME || 'Portal',
  appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',

  // Feature flags
  enableMock: import.meta.env.VITE_ENABLE_MOCK === 'true',
  debug: import.meta.env.VITE_DEBUG === 'true',

  // Computed
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
} as const;

export default config;
