/**
 * Notifications Mock Data
 * 
 * Kullanıcı isimleri merkezi mockData ile tutarlıdır.
 * @see @/shared/data/mockData.ts
 */

import { Notification } from "./types";

export const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Yeni İzin Talebi",
    message: "Ahmet Yılmaz yıllık izin talebinde bulundu.",
    type: "info",
    read: false,
    date: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    link: "/approvals",
  },
  {
    id: "2",
    title: "Proje Onayı",
    message: "CRM Projesi yöneticiniz tarafından onaylandı.",
    type: "success",
    read: false,
    date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    link: "/projects",
  },
  {
    id: "3",
    title: "Sistem Bakımı",
    message: "Bu gece 02:00 - 04:00 arasında bakım çalışması yapılacaktır.",
    type: "warning",
    read: true,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
  {
    id: "4",
    title: "Hata Raporu",
    message: "Otomatik yedekleme işlemi başarısız oldu.",
    type: "error",
    read: true,
    date: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    link: "/logs",
  },
  {
    id: "5",
    title: "Hoş Geldiniz",
    message: "Portala hoş geldiniz! Profilinizi tamamlamayı unutmayın.",
    type: "info",
    read: true,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
    link: "/profile",
  },
  {
    id: "6",
    title: "Yeni Bilet Atandı",
    message: "TCK-1243 numaralı bilet size atandı.",
    type: "info",
    read: false,
    date: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
    link: "/tickets/TCK-1243",
  },
];
