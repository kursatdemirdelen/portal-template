/**
 * Tickets Mock Data
 * ==================
 * 
 * Merkezi bilet mock verileri.
 * Kullanıcı ve proje verileriyle tutarlıdır.
 * 
 * @module shared/data/mocks/tickets.mock
 */

import type { 
  Ticket, 
  TicketRecord, 
  TicketStatusMeta,
  TicketDetail
} from '@/shared/types';
import { TICKET_STATUS_DATA } from '@/shared/config/constants';
import { mockUsers } from './users.mock';

// =============================================================================
// BİLET DURUM META BİLGİLERİ
// =============================================================================

// Merkezi TICKET_STATUS_DATA'dan import edilir
// @see @/shared/config/constants - TICKET_STATUS_DATA

// Backward compatibility için TicketStatusMeta[] array olarak export et
export const TICKET_STATUS_META: TicketStatusMeta[] = TICKET_STATUS_DATA;
// BİLETLER (Dashboard/Sidebar için - Basit format)
// =============================================================================

export const mockTickets: Ticket[] = [
  // Portal Squad biletleri (Ahmet, Can, Fatih)
  {
    id: "TCK-1243",
    title: "Dashboard yükleme sorunu",
    customer: "Acme Corp",
    requestType: "Hata",
    status: "Açık",
    assignee: "Ahmet Yılmaz",
    avatar: "AY",
    project: "Portal Intellium",
    createdAt: "2025-11-20T10:30:00Z",
  },
  {
    id: "TCK-1242",
    title: "Sidebar responsive sorunu",
    customer: "TechStart",
    requestType: "Hata",
    status: "İşlemde",
    assignee: "Can Şimşek",
    avatar: "CŞ",
    project: "Portal Intellium",
    createdAt: "2025-11-19T14:20:00Z",
  },
  {
    id: "TCK-1241",
    title: "Kullanıcı profil sayfası eksik",
    customer: "InnovateCo",
    requestType: "Özellik",
    status: "Açık",
    assignee: "Fatih Aksu",
    avatar: "FA",
    project: "Portal Intellium",
    createdAt: "2025-11-18T09:15:00Z",
  },
  {
    id: "TCK-1240",
    title: "Tablo pagination hatası",
    customer: "Digital Solutions",
    requestType: "Hata",
    status: "Çözüldü",
    assignee: "Can Şimşek",
    avatar: "CŞ",
    project: "Portal Support",
    createdAt: "2025-11-17T11:45:00Z",
  },
  {
    id: "TCK-1239",
    title: "Dark mode implementasyonu",
    customer: "Cloud Systems",
    requestType: "Özellik",
    status: "İşlemde",
    assignee: "Ahmet Yılmaz",
    avatar: "AY",
    project: "Portal Intellium",
    createdAt: "2025-11-16T08:30:00Z",
  },
  // API Squad biletleri (Zeynep, Mehmet)
  {
    id: "TCK-1238",
    title: "API rate limiting gerekli",
    customer: "Acme Corp",
    requestType: "Güvenlik",
    status: "İşlemde",
    assignee: "Zeynep Ünal",
    avatar: "ZÜ",
    project: "API Gateway",
    createdAt: "2025-11-15T16:20:00Z",
  },
  {
    id: "TCK-1237",
    title: "Endpoint dokümantasyonu eksik",
    customer: "TechStart",
    requestType: "Dokümantasyon",
    status: "Açık",
    assignee: "Mehmet Can",
    avatar: "MC",
    project: "API Gateway",
    createdAt: "2025-11-14T13:10:00Z",
  },
  {
    id: "TCK-1236",
    title: "GraphQL schema güncelleme",
    customer: "InnovateCo",
    requestType: "Özellik",
    status: "Çözüldü",
    assignee: "Zeynep Ünal",
    avatar: "ZÜ",
    project: "API Gateway",
    createdAt: "2025-11-13T10:00:00Z",
  },
  // Product Team biletleri (Ayşe)
  {
    id: "TCK-1235",
    title: "Yeni özellik roadmap planlaması",
    customer: "Digital Solutions",
    requestType: "Özellik",
    status: "İşlemde",
    assignee: "Ayşe Demir",
    avatar: "AD",
    project: "Portal Intellium",
    createdAt: "2025-11-12T09:00:00Z",
  },
  // Design Team biletleri (Burak)
  {
    id: "TCK-1234",
    title: "UI/UX iyileştirme önerileri",
    customer: "Cloud Systems",
    requestType: "Tasarım",
    status: "Açık",
    assignee: "Burak Kaya",
    avatar: "BK",
    project: "Portal Intellium",
    createdAt: "2025-11-11T14:30:00Z",
  },
  // Quality Team biletleri (Elif, Melis)
  {
    id: "TCK-1233",
    title: "E2E test senaryoları yazılmalı",
    customer: "Acme Corp",
    requestType: "Performans",
    status: "İşlemde",
    assignee: "Elif Yıldız",
    avatar: "EY",
    project: "Portal Intellium",
    createdAt: "2025-11-10T11:00:00Z",
  },
  {
    id: "TCK-1232",
    title: "Regresyon test raporu",
    customer: "TechStart",
    requestType: "Dokümantasyon",
    status: "Çözüldü",
    assignee: "Melis Kara",
    avatar: "MK",
    project: "Portal Support",
    createdAt: "2025-11-09T15:45:00Z",
  },
];

// =============================================================================
// İSTEK TİPİ DÖNÜŞÜM MAPPING
// =============================================================================

const REQUEST_TYPE_MAP: Record<string, string> = {
  'Hata': 'Report a BUG',
  'Özellik': 'Suggest a New Feature',
  'Dokümantasyon': 'Technical Support',
  'Performans': 'Suggest Improvement',
  'Güvenlik': 'Technical Support',
  'Tasarım': 'Suggest Improvement',
};

const STATUS_MAP: Record<string, string> = {
  'Açık': 'Yeni İstek',
  'İşlemde': 'Atanan',
  'Çözüldü': 'Çözümlenen',
  'Kapatıldı': 'Kapatılan',
};

// =============================================================================
// DETAYLI BİLETLER (TicketsPage için)
// =============================================================================

export const mockTicketRecords: TicketRecord[] = mockTickets.map((ticket) => {
  const assigneeUser = mockUsers.find((u) => u.name === ticket.assignee);
  const assigneeDepartment = assigneeUser?.department || "Portal Squad";

  return {
    ...ticket,
    requestType: REQUEST_TYPE_MAP[ticket.requestType] || 'Technical Support',
    status: STATUS_MAP[ticket.status] || ticket.status,
    accessibleDepartments: [
      assigneeDepartment,
      "Product Team", // Product team her şeyi görebilir
    ].filter((d, i, arr) => arr.indexOf(d) === i),
  };
});

// =============================================================================
// YARDIMCI FONKSİYONLAR
// =============================================================================

/**
 * Departmana göre biletleri getir
 */
export const getTicketsByDepartment = (department: string): TicketRecord[] => {
  if (department === "Product Team") {
    return [...mockTicketRecords];
  }
  return mockTicketRecords.filter((ticket) =>
    ticket.accessibleDepartments.includes(department)
  );
};

/**
 * Son biletleri getir
 */
export const getRecentTickets = (count: number = 5): Ticket[] => {
  return mockTickets.slice(0, count);
};

/**
 * Departmana göre son biletleri getir
 */
export const getRecentTicketsForDepartment = (
  department: string,
  limit = 6
): Ticket[] => {
  const normalizeString = (str: string): string => str.normalize("NFC").toLowerCase();
  const departmentUsers = mockUsers.filter((u) => u.department === department);
  const userNames = departmentUsers.map((u) => normalizeString(u.name));
  
  return mockTickets
    .filter((ticket) => userNames.includes(normalizeString(ticket.assignee)))
    .slice(0, limit);
};

/**
 * Bilet ID'sine göre bilet getir
 */
export const getTicketById = (id: string): Ticket | undefined => {
  return mockTickets.find((t) => t.id === id);
};

/**
 * Bilet istatistikleri
 */
export const getTicketStats = () => {
  return {
    total: mockTickets.length,
    open: mockTickets.filter((t) => t.status === "Açık").length,
    inProgress: mockTickets.filter((t) => t.status === "İşlemde").length,
    resolved: mockTickets.filter((t) => t.status === "Çözüldü").length,
    byProject: mockTickets.reduce((acc, t) => {
      acc[t.project] = (acc[t.project] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
  };
};

// =============================================================================
// ÖRNEK BİLET DETAYI (TicketDetail sayfası için)
// =============================================================================

export const mockTicketDetail: TicketDetail = {
  id: "TCK-1243",
  title: "Dashboard yükleme sorunu",
  description: "Dashboard sayfası açılırken 5 saniyeden fazla bekliyor. Performans iyileştirmesi gerekli.",
  customer: "Acme Corp",
  requestType: "Hata",
  status: "Açık",
  assignee: "Ahmet Yılmaz",
  avatar: "AY",
  project: "Portal Intellium",
  createdAt: "2025-11-20T10:30:00Z",
  createdBy: "Nur Çelik",
  createdByAvatar: "NÇ",
  assignedDate: "2025-11-20T11:00:00Z",
  resolved: false,
  efforts: [
    {
      id: "EFF-001",
      date: "2025-11-21",
      time: "09:00",
      description: "Performans analizi yapıldı",
      hours: 2,
      user: "Ahmet Yılmaz",
      userAvatar: "AY",
    },
    {
      id: "EFF-002",
      date: "2025-11-22",
      time: "14:00",
      description: "API çağrıları optimize edildi",
      hours: 3,
      user: "Ahmet Yılmaz",
      userAvatar: "AY",
    },
  ],
  comments: [
    {
      id: "CMT-001",
      user: "Nur Çelik",
      userAvatar: "NÇ",
      content: "Bu sorun müşteri tarafından acil olarak bildirildi.",
      createdAt: "2025-11-20T10:35:00Z",
      isInternal: false,
    },
    {
      id: "CMT-002",
      user: "Ahmet Yılmaz",
      userAvatar: "AY",
      content: "Sorunu inceliyorum, muhtemelen API yanıt süresiyle ilgili.",
      createdAt: "2025-11-20T11:15:00Z",
      isInternal: true,
    },
  ],
  history: [
    {
      id: "HST-001",
      user: "Sistem",
      action: "Bilet oluşturuldu",
      timestamp: "2025-11-20T10:30:00Z",
    },
    {
      id: "HST-002",
      user: "Zeynep Ünal",
      userAvatar: "ZÜ",
      action: "Atandı",
      field: "assignee",
      oldValue: "-",
      newValue: "Ahmet Yılmaz",
      timestamp: "2025-11-20T11:00:00Z",
    },
  ],
  attachments: [
    {
      id: "ATT-001",
      name: "screenshot.png",
      size: "245 KB",
      uploadedBy: "Nur Çelik",
      uploadedAt: "2025-11-20T10:32:00Z",
      url: "/attachments/screenshot.png",
    },
  ],
  projectInfo: {
    projectId: "PRJ-001",
    projectName: "Portal Intellium",
    projectStatus: "active",
    progress: 76,
    teamSize: 5,
    endDate: "2026-03-31",
  },
};
