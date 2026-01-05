/**
 * Token Service - Secure Token Management
 * ==========================================
 * 
 * secure-ls kullanarak encrypted token storage
 * JWT token'ı parse eder ve user bilgilerini çıkarır
 */

import SecureLS from 'secure-ls';
import type { JwtPayload, AuthUser } from '@/features/auth/model/types';
import type { Role } from '@/shared/config/roles';

// Encrypted storage
const ls = new SecureLS({ encodingType: 'des', encryptionNamespace: 'portal' });

const TOKEN_KEY = 'accessToken';

/**
 * JWT payload'ı decode et (header.payload.signature'dan payload kısmını)
 * Not: Signature'ı doğrulamıyoruz (backend does that) - sadece payload'ı okuyoruz
 */
function decodeJwt(token: string): JwtPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const decoded = JSON.parse(atob(parts[1]));
    return decoded as JwtPayload;
  } catch {
    return null;
  }
}

/**
 * JWT'den AuthUser çıkar
 */
function jwtToAuthUser(payload: JwtPayload): AuthUser {
  return {
    id: payload.sub,
    name: payload.name,
    email: payload.email,
    role: payload.role as Role,
  };
}

/**
 * Token expired mi?
 */
function isTokenExpired(payload: JwtPayload): boolean {
  const expiresAt = payload.exp * 1000; // seconds -> ms
  return Date.now() >= expiresAt;
}

// ============================================================
// Public API
// ============================================================

export const tokenService = {
  /**
   * Token'ı secure storage'a kaydet
   */
  setToken(token: string): void {
    ls.set(TOKEN_KEY, token);
  },

  /**
   * Token'ı storage'dan al
   */
  getToken(): string | null {
    try {
      return ls.get(TOKEN_KEY) as string | null;
    } catch {
      return null;
    }
  },

  /**
   * Token'ı storage'dan sil
   */
  removeToken(): void {
    try {
      ls.remove(TOKEN_KEY);
    } catch {
      // ignore
    }
  },

  /**
   * Token'dan user info çıkar ve validate et
   * - Geçerli bir JWT mi?
   * - Expire olmuş mu?
   */
  getUserFromToken(): AuthUser | null {
    const token = this.getToken();
    if (!token) return null;

    const payload = decodeJwt(token);
    if (!payload) return null;

    // Token expire olmuşsa temizle ve null dön
    if (isTokenExpired(payload)) {
      this.removeToken();
      return null;
    }

    return jwtToAuthUser(payload);
  },

  /**
   * Token geçerli mi?
   */
  isTokenValid(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const payload = decodeJwt(token);
    if (!payload) return false;

    return !isTokenExpired(payload);
  },

  /**
   * Token ne zaman expire olacak? (millisecond)
   */
  getTokenExpiresIn(): number | null {
    const token = this.getToken();
    if (!token) return null;

    const payload = decodeJwt(token);
    if (!payload) return null;

    const expiresAt = payload.exp * 1000; // seconds -> ms
    return expiresAt - Date.now();
  },
};

export default tokenService;
