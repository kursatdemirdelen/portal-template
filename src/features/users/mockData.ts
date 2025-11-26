/**
 * Users Mock Data - For UsersPage temporary usage
 * TODO: Convert UsersPage to use userService API directly
 */

import type { User } from './model';

export const mockUsers: User[] = [
  {
    id: 'USER001',
    name: 'Ahmet Yılmaz',
    email: 'ahmet.yilmaz@company.com',
    phone: '+90 532 123 4567',
    role: 'admin',
    status: 'active',
    department: 'IT',
    createdAt: '2024-01-15',
    updatedAt: '2025-01-20',
    lastLogin: '2025-01-20 14:30',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 'USER002',
    name: 'Zeynep Demir',
    email: 'zeynep.demir@company.com',
    phone: '+90 532 234 5678',
    role: 'manager',
    status: 'active',
    department: 'Project Management',
    createdAt: '2024-02-10',
    updatedAt: '2025-01-19',
    lastLogin: '2025-01-20 10:15',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: 'USER003',
    name: 'Can Şimşek',
    email: 'can.simsek@company.com',
    phone: '+90 532 345 6789',
    role: 'worker',
    status: 'active',
    department: 'Development',
    createdAt: '2024-03-05',
    updatedAt: '2025-01-20',
    lastLogin: '2025-01-20 09:45',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: 'USER004',
    name: 'Melis Kara',
    email: 'melis.kara@company.com',
    phone: '+90 532 456 7890',
    role: 'worker',
    status: 'active',
    department: 'QA',
    createdAt: '2024-04-20',
    updatedAt: '2025-01-18',
    lastLogin: '2025-01-19 16:20',
    avatar: 'https://i.pravatar.cc/150?img=4',
  },
  {
    id: 'USER005',
    name: 'Fatih Aksu',
    email: 'fatih.aksu@company.com',
    phone: '+90 532 567 8901',
    role: 'worker',
    status: 'inactive',
    department: 'Development',
    createdAt: '2024-05-12',
    updatedAt: '2025-01-10',
    lastLogin: '2024-12-15 11:30',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: 'USER006',
    name: 'Nur Çelik',
    email: 'nur.celik@company.com',
    phone: '+90 532 678 9012',
    role: 'user',
    status: 'active',
    department: 'Sales',
    createdAt: '2024-06-08',
    updatedAt: '2025-01-17',
    lastLogin: '2025-01-20 13:00',
    avatar: 'https://i.pravatar.cc/150?img=6',
  },
];

export const getUserStats = () => {
  return {
    total: mockUsers.length,
    active: mockUsers.filter((u) => u.status === 'active').length,
    inactive: mockUsers.filter((u) => u.status === 'inactive').length,
    suspended: mockUsers.filter((u) => u.status === 'suspended').length,
    byRole: {
      admin: mockUsers.filter((u) => u.role === 'admin').length,
      manager: mockUsers.filter((u) => u.role === 'manager').length,
      worker: mockUsers.filter((u) => u.role === 'worker').length,
      user: mockUsers.filter((u) => u.role === 'user').length,
    },
  };
};

export const getUsersByRole = (role: string): User[] => {
  return mockUsers.filter((u) => u.role === role);
};

export const getUsersByStatus = (status: string): User[] => {
  return mockUsers.filter((u) => u.status === status);
};
