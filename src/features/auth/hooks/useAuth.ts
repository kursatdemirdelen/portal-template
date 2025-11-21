import type { AuthState } from "@/features/auth/model";

export const useAuth = (): AuthState => {
  // TODO: Bu kısım backend entegrasyonu ile güncellenecek
  return {
    user: {
      id: "1",
      name: "Kürşat (Admin)",
      role: "admin",
      email: "kursat@example.com",
    },
    isAuthenticated: true,
    isLoading: false,
  };
};
