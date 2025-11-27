import { useMemo } from "react";
import type { TicketRecord } from "../model/types";
import { TICKET_STATUS_META } from "../model/status";
import { TICKET_STATUS, URGENT_REQUEST_TYPES } from "../model/constants";

export interface UseTicketStatsOptions {
  tickets: TicketRecord[];
  filteredTickets: TicketRecord[];
  currentUser: string;
}

export function useTicketStats({ tickets, filteredTickets, currentUser }: UseTicketStatsOptions) {
  const stats = useMemo(() => {
    const myTicketsCount = tickets.filter((t) => t.assignee === currentUser).length;
    const openTicketsCount = tickets.filter((t) => t.status === TICKET_STATUS.OPEN).length;
    const pendingTicketsCount = tickets.filter((t) => 
      t.status === TICKET_STATUS.OPEN || t.status === TICKET_STATUS.IN_PROGRESS
    ).length;

    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const resolvedThisWeek = tickets.filter(
      (t) =>
        (t.status === TICKET_STATUS.CLOSED || t.status === TICKET_STATUS.RESOLVED) &&
        new Date(t.createdAt) > weekAgo
    ).length;

    const ticketStatusSummary = TICKET_STATUS_META.map((meta) => ({
      ...meta,
      count: filteredTickets.filter((ticket) => ticket.status === meta.key).length,
    }));

    return { myTicketsCount, openTicketsCount, pendingTicketsCount, resolvedThisWeek, ticketStatusSummary };
  }, [tickets, filteredTickets, currentUser]);

  return stats;
}
