import { useMemo } from "react";
import type { TicketRecord } from "../model/types";
import { TICKET_STATUS_META } from "../model/status";

export interface FilterOption {
  label: string;
  value: string;
}

export interface UseTicketFilterOptionsReturn {
  statusOptions: FilterOption[];
  requestTypeOptions: FilterOption[];
  assigneeOptions: FilterOption[];
  projectOptions: FilterOption[];
}

/**
 * Ticket verilerinden filter seçeneklerini türeten hook
 * Tüm unique değerleri alıp select componentleri için hazırlar
 */
export function useTicketFilterOptions(
  tickets: TicketRecord[]
): UseTicketFilterOptionsReturn {
  const statusOptions = useMemo(
    () =>
      TICKET_STATUS_META.map((item) => ({
        label: item.label,
        value: item.key,
      })),
    []
  );

  const requestTypeOptions = useMemo(
    () =>
      Array.from(new Set(tickets.map((ticket) => ticket.requestType)))
        .filter(Boolean)
        .sort()
        .map((type) => ({ label: type, value: type })),
    [tickets]
  );

  const assigneeOptions = useMemo(
    () =>
      Array.from(new Set(tickets.map((ticket) => ticket.assignee)))
        .filter(Boolean)
        .sort()
        .map((assignee) => ({ label: assignee, value: assignee })),
    [tickets]
  );

  const projectOptions = useMemo(
    () =>
      Array.from(new Set(tickets.map((ticket) => ticket.project)))
        .filter(Boolean)
        .sort()
        .map((project) => ({ label: project, value: project })),
    [tickets]
  );

  return {
    statusOptions,
    requestTypeOptions,
    assigneeOptions,
    projectOptions,
  };
}
