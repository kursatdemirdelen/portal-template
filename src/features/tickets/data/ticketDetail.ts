import type { TicketDetail } from "../model/types";

export const mockTicketDetail: TicketDetail = {
  id: "TCK-2051",
  title: "Ticket Efforts 'Postgre Exception'",
  customer: "Portal Intellium",
  requestType: "Report a BUG",
  status: "Atanan",
  assignee: "Ahmet Yılmaz",
  avatar: "AY",
  project: "Portal İşletme Platformu Müşteri Destek, Çağrı ve Talep Yönetimi",
  createdAt: "2025-11-15T11:10:00Z",
  assignedDate: "2025-11-18T11:27:00Z",
  createdBy: "Kürşat Demirdelen",
  createdByAvatar: "KD",
  description: "Ticket 207 için get efforts API'sinde hata bulunuyor.",
  resolved: false,
  accessibleDepartments: ["Portal Squad", "Portal Support"],
  projectInfo: {
    projectId: "PRJ-001",
    projectName: "Portal İşletme Platformu",
    projectStatus: "active",
    progress: 68,
    teamSize: 8,
    endDate: "2025-12-31",
  },
  
  efforts: [
    {
      id: "EFF001",
      date: "18.11.2025",
      time: "11:20",
      description: "Database table",
      hours: 120,
      user: "Ahmet Yılmaz",
      userAvatar: "AY",
    },
  ],
  
  comments: [
    {
      id: "CMT001",
      user: "Kürşat Demirdelen",
      userAvatar: "KD",
      content: "Genel olarak '/api/tickets/efforts/getalltickets/' apısinde 500 hatası veriyoruz.",
      createdAt: "2025-11-15T08:00:00Z",
      isInternal: false,
      replies: [
        {
          id: "CMT001-R1",
          user: "Sistem Bot",
          userAvatar: "SB",
          content: "Log'larda bağlantı hatası görünüyor. İncelemeye alındı.",
          createdAt: "2025-11-15T08:10:00Z",
          isInternal: false,
        },
      ],
    },
    {
      id: "CMT002",
      user: "Ahmet Yılmaz",
      userAvatar: "AY",
      content: "Bilet eklerken 1 tane error_message.png eklemeye rağmen 4 tane ekleniyor bulunuyor (duplicate olmuş durumda).",
      createdAt: "2025-11-16T09:00:00Z",
      isInternal: false,
    },
  ],
  
  history: [
    {
      id: "HIST001",
      user: "Sistem",
      action: "Bilet oluşturuldu",
      timestamp: "2025-11-15T11:10:00Z",
    },
    {
      id: "HIST002",
      user: "Mehmet Can",
      userAvatar: "MC",
      action: "Durum değiştirildi",
      field: "status",
      oldValue: "Yeni",
      newValue: "Atanan",
      timestamp: "2025-11-18T11:27:00Z",
    },
    {
      id: "HIST003",
      user: "Ahmet Yılmaz",
      userAvatar: "AY",
      action: "Yorum eklendi",
      timestamp: "2025-11-16T09:00:00Z",
    },
  ],
  
  attachments: [
    {
      id: "ATT001",
      name: "error_message.png",
      size: "245 KB",
      uploadedBy: "Kürşat Demirdelen",
      uploadedAt: "2025-11-15T11:10:00Z",
      url: "#",
    }, 
    {
      id: "ATT004",
      name: "error_2.png",
      size: "180 KB",
      uploadedBy: "Kürşat Demirdelen",
      uploadedAt: "2025-11-15T11:12:00Z",
      url: "#",
    },
  ],
};
