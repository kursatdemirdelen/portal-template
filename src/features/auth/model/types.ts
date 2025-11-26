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

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
