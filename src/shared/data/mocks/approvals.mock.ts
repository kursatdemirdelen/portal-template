/**
 * Onay Süreçleri - Mock Data
 * Merkezi onay iş akışı verileri
 */

// Onay adımları
export const mockApprovalSteps = [
  { title: "Talep" },
  { title: "Yönetici Onayı" },
  { title: "Destek" },
  { title: "Kapanış" },
];

// Örnek onay kuralları
export const mockApprovalRules = [
  "Belirli kategorilerde otomatik yönetici onayı",
  "SLA ihlallerinde uyarı",
  "Çoklu onay adımı",
  "Acil talepler için bypass kuralı",
  "Bütçe limiti aşımında ek onay",
];
