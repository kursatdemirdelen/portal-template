import type { Role } from '@/shared/config/roles';

interface User {
  id: string;
  name: string;
  role: Role;
}

export const useAuth = () => {
  // TODO: Bunu backend'e bağlayacağız
  const user: User | null = {
    id: '1',
    name: 'Kürşat (Admin)',
    role: 'admin',
  };

  const isLoading = false;
  const isAuthenticated = !!user;

  return {
    user,
    isLoading,
    isAuthenticated,
  };
};
