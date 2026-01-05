import type { Role } from "@/shared/config/roles";

export interface AuthUser {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  role: Role;
  email?: string;
  avatar?: string;
}

/**
 * JWT Token Payload (.NET'ten gelen)
 * 'sub' ve 'role' claim'leri JWT'de bulunacak
 */
export interface JwtPayload {
  sub: string;          // User ID
  name: string;
  email: string;
  role: Role;
  exp: number;          // Expiration timestamp
  iat: number;          // Issued at
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
