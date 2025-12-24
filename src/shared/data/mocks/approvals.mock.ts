/**
 * Onay Süreçleri - Mock Data
 * Merkezi onay iş akışı verileri
 */

// =============================================================================
// TİPLER
// =============================================================================

export type ApprovalStatus = 'pending' | 'approved' | 'rejected';
export type ApprovalType = 'leave' | 'expense' | 'overtime' | 'project';

export interface ApprovalRequest {
  id: string;
  type: ApprovalType;
  title: string;
  requesterName: string;
  requesterAvatar?: string;
  requestDate: string;
  status: ApprovalStatus;
  amount?: number; // For expenses
  description?: string;
}

// =============================================================================
// ONAY TALEPLERİ
// =============================================================================

export const mockApprovals: ApprovalRequest[] = [
  {
    id: '1',
    type: 'leave',
    title: 'Yıllık İzin Talebi',
    requesterName: 'Ahmet Yılmaz',
    requestDate: '2023-11-20',
    status: 'pending',
    description: '24-28 Kasım arası yıllık izin kullanmak istiyorum.',
  },
  {
    id: '2',
    type: 'expense',
    title: 'Müşteri Yemeği',
    requesterName: 'Ayşe Demir',
    requestDate: '2023-11-19',
    status: 'pending',
    amount: 1500,
    description: 'ABC Ltd. Şti. ile proje toplantısı yemeği.',
  },
  {
    id: '3',
    type: 'project',
    title: 'Yeni Proje Başlatma',
    requesterName: 'Mehmet Öz',
    requestDate: '2023-11-18',
    status: 'approved',
    description: 'Mobil uygulama projesi için kaynak onayı.',
  },
  {
    id: '4',
    type: 'overtime',
    title: 'Haftasonu Çalışması',
    requesterName: 'Zeynep Kaya',
    requestDate: '2023-11-15',
    status: 'rejected',
    description: 'Acil bug fix için cumartesi çalışması.',
  },
  {
    id: '5',
    type: 'leave',
    title: 'Hastalık İzni',
    requesterName: 'Can Vural',
    requestDate: '2023-11-21',
    status: 'pending',
    description: 'Rapor ektedir.',
  },
];

// =============================================================================
// YARDIMCI FONKSİYONLAR
// =============================================================================

export const getApprovalsByStatus = (status: ApprovalStatus): ApprovalRequest[] => {
  return mockApprovals.filter((a) => a.status === status);
};

export const getApprovalsByType = (type: ApprovalType): ApprovalRequest[] => {
  return mockApprovals.filter((a) => a.type === type);
};

export const getPendingApprovalsCount = (): number => {
  return mockApprovals.filter((a) => a.status === 'pending').length;
};
