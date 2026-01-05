/**
 * Auth Service - Authentication Business Logic
 * ==============================================
 * 
 * Login, logout, token handling'i merkezi bir yerde yapıyor.
 * Mock implementation şu an, API gelince kolayca swap edilebilir.
 */

import { tokenService } from '@/shared/api/tokenService';
import type { AuthUser } from '../model/types';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: AuthUser;
  token: string;
}

/**
 * Mock users - Backend'ten gelecek
 */
const MOCK_USERS = [
  { id: '1', name: 'Admin User', email: 'admin@example.com', password: 'admin123', role: 'admin' as const },
  { id: '2', name: 'Worker User', email: 'worker@example.com', password: 'worker123', role: 'worker' as const },
  { id: '3', name: 'Regular User', email: 'user@example.com', password: 'user123', role: 'user' as const },
];

/**
 * Generate mock JWT token
 * Backend'den gelecek, bunu kaldıracağız
 */
function generateMockToken(user: AuthUser): string {
  const payload = {
    sub: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 saat
  };

  return `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify(payload))}.mock-signature`;
}

// ============================================================
// Public API
// ============================================================

export const authService = {
  /**
   * Login - email & password ile kullanıcı authenticate et
   * 
   * @param credentials - email ve password
   * @returns Promise<{user, token}>
   * 
   * @example
   * const { user, token } = await authService.login({
   *   email: 'admin@example.com',
   *   password: 'password'
   * })
   */
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const { email, password } = credentials;

    // Mock: Email + password doğrulaması
    const mockUser = MOCK_USERS.find(u => u.email === email);
    if (!mockUser) {
      throw new Error('E-posta adresi bulunamadı');
    }

    // Password validation
    if (mockUser.password !== password) {
      throw new Error('Şifre yanlış');
    }

    const user: AuthUser = {
      id: mockUser.id,
      name: mockUser.name,
      email: mockUser.email,
      role: mockUser.role,
    };

    // Generate mock token
    const token = generateMockToken(user);

    // Token'ı secure storage'a kaydet
    tokenService.setToken(token);

    return { user, token };
  },

  /**
   * Logout - Token'ı temizle
   */
  logout(): void {
    tokenService.removeToken();
  },

  /**
   * Get current user from token
   * @returns AuthUser | null
   */
  getCurrentUser(): AuthUser | null {
    return tokenService.getUserFromToken();
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return tokenService.isTokenValid();
  },
};

export default authService;
