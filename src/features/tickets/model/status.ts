export interface TicketStatusMeta {
  key: string;
  label: string;
  color: string;
  bg: string;
}

export const TICKET_STATUS_META: TicketStatusMeta[] = [
  {
    key: "Yeni İstek",
    label: "Yeni İstek",
    color: "#3498db",
    bg: "rgba(52, 152, 219, 0.12)",
  }, 
  {
    key: "Atanan",
    label: "Atanan",
    color: "#8e44ad",
    bg: "rgba(142, 68, 173, 0.12)",
  }, 
  {
    key: "Çözümlenen",
    label: "Çözümlenen",
    color: "#27ae60",
    bg: "rgba(39, 174, 96, 0.12)",
  },  
];
