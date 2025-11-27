import type { TicketRecord } from "../model/types";

export function useTicketExport() {
  const exportToCSV = (rows: TicketRecord[]) => {
    const headers = [
      "ID",
      "Başlık",
      "Proje",
      "İstek Tipi",
      "Durum",
      "Atanan",
      "Tarih",
    ];

    const dataRows = rows.map((t) => [
      t.id,
      t.title,
      t.project,
      t.requestType,
      t.status,
      t.assignee,
      new Date(t.createdAt).toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    ]);

    const csv = [headers, ...dataRows].map((r) => r.join(",")).join("\n");
    const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `biletler_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  return { exportToCSV };
}
