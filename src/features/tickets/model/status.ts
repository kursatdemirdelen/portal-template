import { colors, backgrounds, hexToRgba } from "@/shared/styles";

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
    color: colors.info,
    bg: backgrounds.infoBg,
  }, 
  {
    key: "Atanan",
    label: "Atanan",
    color: colors.accent,
    bg: hexToRgba(colors.accent, 0.12),
  }, 
  {
    key: "Çözümlenen",
    label: "Çözümlenen",
    color: colors.success,
    bg: backgrounds.successBg,
  },  
];
