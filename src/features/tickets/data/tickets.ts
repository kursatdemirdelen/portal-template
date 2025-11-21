import type { TicketRecord } from "../model/types";

const TICKETS: TicketRecord[] = [
  {
    id: "TCK-2051",
    title: "Portal ana sayfa filtre hatası",
    customer: "Client Portal",
    requestType: "Technical Support",
    status: "Atanan",
    assignee: "Ahmet Demir",
    avatar: "AD",
    project: "Portal Intellium",
    createdAt: "2025-11-28T09:24:00Z",
    accessibleDepartments: ["Portal Squad", "Portal Support"],
  },
  {
    id: "TCK-2047",
    title: "Zimmet raporu export süresi",
    customer: "Portal Intellium",
    requestType: "Suggest Improvement",
    status: "Çözümlenen",
    assignee: "Zeynep Ünlü",
    avatar: "ZU",
    project: "Portal Intellium",
    createdAt: "2025-11-26T14:40:00Z",
    accessibleDepartments: ["Portal Squad", "FinOps"],
  },
  {
    id: "TCK-2042",
    title: "Bildirim maili çift gidiyor",
    customer: "Notification Service",
    requestType: "Report a BUG",
    status: "Yeni İstek",
    assignee: "Kürşat Demirdelen",
    avatar: "KD",
    project: "Portal Support",
    createdAt: "2025-11-25T08:15:00Z",
    accessibleDepartments: ["Portal Squad"],
  },
  {
    id: "TCK-2039",
    title: "Scrumboard sürükle bırak iyileştirmesi",
    customer: "Portal Intellium",
    requestType: "Suggest a New Feature",
    status: "Çözümlenen",
    assignee: "Mehmet Can",
    avatar: "MC",
    project: "Scrumboard Revamp",
    createdAt: "2025-11-22T10:30:00Z",
    accessibleDepartments: ["Portal Squad", "Scrum Ops"],
  },
  {
    id: "TCK-2034",
    title: "Mobil uygulama performans alarmı",
    customer: "Mobile App",
    requestType: "Technical Support",
    status: "Atanan",
    assignee: "Selin Ak",
    avatar: "SA",
    project: "Mobile Core",
    createdAt: "2025-11-21T13:05:00Z",
    accessibleDepartments: ["Mobile Guild", "Portal Squad"],
  },
  {
    id: "TCK-2028",
    title: "API gecikme probleminin analizi",
    customer: "Portal Support",
    requestType: "Report a BUG",
    status: "Atanan",
    assignee: "Onur Aydın",
    avatar: "OA",
    project: "API Gateway",
    createdAt: "2025-11-20T07:45:00Z",
    accessibleDepartments: ["Portal Squad", "Integration"],
  },
  {
    id: "TCK-2021",
    title: "Zimmet raporuna filtre eklenmesi",
    customer: "Reporting Suite",
    requestType: "Suggest Improvement",
    status: "Çözümlenen",
    assignee: "Nisa Turan",
    avatar: "NT",
    project: "Analytics Hub",
    createdAt: "2025-11-18T11:25:00Z",
    accessibleDepartments: ["Reporting", "Portal Squad"],
  },
  {
    id: "TCK-2018",
    title: "Bildirim maili tasarım revizesi",
    customer: "Notification Service",
    requestType: "Suggest a New Feature",
    status: "Atanan",
    assignee: "Zeynep Ünlü",
    avatar: "ZU",
    project: "Portal Support",
    createdAt: "2025-11-16T09:10:00Z",
    accessibleDepartments: ["Portal Squad"],
  },
  {
    id: "TCK-2011",
    title: "Sprint raporu grafik hatası",
    customer: "Scrumboard",
    requestType: "Report a BUG",
    status: "Çözümlenen",
    assignee: "Mehmet Can",
    avatar: "MC",
    project: "Scrumboard Revamp",
    createdAt: "2025-11-14T15:20:00Z",
    accessibleDepartments: ["Scrum Ops", "Portal Squad"],
  },
  {
    id: "TCK-2006",
    title: "Login sayfasının güncellenmesi",
    customer: "Portal Intellium",
    requestType: "Technical Support",
    status: "Yeni İstek",
    assignee: "Ahmet Yılmaz",
    avatar: "AY",
    project: "Client Portal",
    createdAt: "2025-11-13T10:00:00Z",
    accessibleDepartments: ["Portal Squad", "Client Success"],
  },
];

export const allTickets: TicketRecord[] = TICKETS;

const turkishDateFormatter = new Intl.DateTimeFormat("tr-TR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export const formatTicketDate = (date: string) => {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) {
    return date;
  }
  return turkishDateFormatter.format(parsed);
};

export const getTicketsByDepartment = (department?: string) => {
  if (!department) {
    return [...TICKETS];
  }
  return TICKETS.filter((ticket) =>
    ticket.accessibleDepartments.includes(department)
  );
};

export const getRecentTicketsForDepartment = (
  department: string,
  limit = 6
) => {
  return getTicketsByDepartment(department)
    .slice()
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, limit);
};
