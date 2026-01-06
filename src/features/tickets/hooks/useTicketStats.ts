import { useMemo } from "react";
import type { TicketRecord } from "../model/types";
import { TICKET_STATUS_META } from "../model/status";
import { TICKET_STATUS } from "../model/constants";

export interface UseTicketStatsOptions {
  tickets: TicketRecord[];
  filteredTickets: TicketRecord[];
  currentUser: string;
}

export function useTicketStats({ tickets, filteredTickets, currentUser }: UseTicketStatsOptions) {
  const stats = useMemo(() => {
    const myTicketsCount = tickets.filter((t) => t.assignee === currentUser).length;
    
    // Yeni Biletler = "Yeni İstek" durumunda olanlar
    const openTicketsCount = tickets.filter((t) => 
      t.status === TICKET_STATUS.NEW
    ).length;
    
    // Atanan = "Atanan" durumunda olanlar  
    const inProgressCount = tickets.filter((t) => 
      t.status === TICKET_STATUS.ASSIGNED
    ).length;
    
    // Çözümlenen = "Çözümlenen" durumunda olanlar
    const closedCount = tickets.filter((t) => 
      t.status === TICKET_STATUS.RESOLVED
    ).length;

    // Geriye dönük uyumluluk için
    const pendingTicketsCount = inProgressCount;
    const resolvedThisWeek = closedCount;

    const ticketStatusSummary = TICKET_STATUS_META.map((meta) => ({
      ...meta,
      count: filteredTickets.filter((ticket) => ticket.status === meta.key).length,
    }));

    return { 
      myTicketsCount, 
      openTicketsCount, 
      inProgressCount,
      closedCount,
      pendingTicketsCount,
      resolvedThisWeek,
      ticketStatusSummary 
    };
  }, [tickets, filteredTickets, currentUser]);

  return stats;
}
